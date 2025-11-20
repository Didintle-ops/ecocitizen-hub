import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { QrCode, Loader2, ArrowLeft, Sparkles } from "lucide-react";
import { MunicipalityHeader } from "@/components/MunicipalityHeader";
import { motion } from "framer-motion";

const materialRewards = {
  plastic: { rate: 0.50, xp: 10, carbon: 2.5 },
  glass: { rate: 0.30, xp: 8, carbon: 1.5 },
  metal: { rate: 0.80, xp: 15, carbon: 3.0 },
  paper: { rate: 0.20, xp: 5, carbon: 1.0 },
  organic: { rate: 0.10, xp: 3, carbon: 0.5 },
};

const Deposit = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [binCode, setBinCode] = useState("");
  const [materialType, setMaterialType] = useState("");
  const [weight, setWeight] = useState("");
  const [success, setSuccess] = useState(false);
  const [rewardAmount, setRewardAmount] = useState(0);
  const [xpEarned, setXpEarned] = useState(0);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
      }
    };
    checkAuth();
  }, [navigate]);

  const handleDeposit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("Not authenticated");

      const weightKg = parseFloat(weight);
      const material = materialRewards[materialType as keyof typeof materialRewards];
      
      const calculatedReward = weightKg * material.rate;
      const calculatedXp = Math.floor(weightKg * material.xp);
      const carbonOffset = weightKg * material.carbon;

      // Find bin
      const { data: bin } = await supabase
        .from("bins")
        .select("id")
        .eq("bin_code", binCode)
        .single();

      if (!bin) {
        toast.error("Bin not found. Please check the bin code.");
        setLoading(false);
        return;
      }

      // Create deposit
      const { error: depositError } = await supabase
        .from("deposits")
        .insert({
          user_id: session.user.id,
          bin_id: bin.id,
          material_type: materialType,
          weight_kg: weightKg,
          reward_amount: calculatedReward,
          xp_earned: calculatedXp,
          carbon_offset_kg: carbonOffset,
        });

      if (depositError) throw depositError;

      // Update user profile
      const { data: profile } = await supabase
        .from("profiles")
        .select("wallet_balance, xp_points")
        .eq("id", session.user.id)
        .single();

      if (profile) {
        const { error: updateError } = await supabase
          .from("profiles")
          .update({
            wallet_balance: profile.wallet_balance + calculatedReward,
            xp_points: profile.xp_points + calculatedXp,
          })
          .eq("id", session.user.id);

        if (updateError) throw updateError;
      }

      setRewardAmount(calculatedReward);
      setXpEarned(calculatedXp);
      setSuccess(true);
      toast.success("Deposit recorded successfully!");
    } catch (error: any) {
      toast.error(error.message || "Failed to process deposit");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen p-4 md:p-8 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full"
        >
          <Card className="glass-strong text-center">
            <CardHeader>
              <div className="mx-auto mb-4 h-20 w-20 rounded-full eco-gradient flex items-center justify-center animate-glow-pulse">
                <Sparkles className="h-10 w-10 text-white" />
              </div>
              <CardTitle className="text-2xl">Deposit Successful!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-3xl font-bold text-gradient">${rewardAmount.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground">added to your wallet</p>
              </div>
              
              <div className="space-y-2">
                <p className="text-2xl font-bold text-accent">+{xpEarned} XP</p>
                <p className="text-sm text-muted-foreground">Keep it up!</p>
              </div>

              <div className="pt-4 space-y-2">
                <Button onClick={() => navigate("/dashboard")} className="w-full">
                  Back to Dashboard
                </Button>
                <Button 
                  onClick={() => {
                    setSuccess(false);
                    setBinCode("");
                    setMaterialType("");
                    setWeight("");
                  }} 
                  variant="outline" 
                  className="w-full"
                >
                  Make Another Deposit
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate("/dashboard")}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>

        <MunicipalityHeader />

        <Card className="glass-strong">
          <CardHeader>
            <div className="flex items-center gap-3">
              <QrCode className="h-6 w-6 text-primary" />
              <CardTitle>Make a Deposit</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleDeposit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="bin-code">Bin Code *</Label>
                <Input
                  id="bin-code"
                  placeholder="e.g., BIN-0001"
                  value={binCode}
                  onChange={(e) => setBinCode(e.target.value)}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Scan the QR code on the bin or enter the code manually
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="material">Material Type *</Label>
                <Select value={materialType} onValueChange={setMaterialType} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select material type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="plastic">Plastic</SelectItem>
                    <SelectItem value="glass">Glass</SelectItem>
                    <SelectItem value="metal">Metal</SelectItem>
                    <SelectItem value="paper">Paper</SelectItem>
                    <SelectItem value="organic">Organic</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg) *</Label>
                <Input
                  id="weight"
                  type="number"
                  step="0.1"
                  min="0.1"
                  placeholder="e.g., 2.5"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  required
                />
              </div>

              {materialType && weight && (
                <div className="glass p-4 rounded-xl space-y-2">
                  <h4 className="font-semibold">Estimated Reward</h4>
                  <div className="flex justify-between">
                    <span>Cash:</span>
                    <span className="font-bold text-primary">
                      ${(parseFloat(weight || "0") * materialRewards[materialType as keyof typeof materialRewards].rate).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>XP:</span>
                    <span className="font-bold text-accent">
                      +{Math.floor(parseFloat(weight || "0") * materialRewards[materialType as keyof typeof materialRewards].xp)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Carbon Offset:</span>
                    <span className="font-bold text-green-600">
                      {(parseFloat(weight || "0") * materialRewards[materialType as keyof typeof materialRewards].carbon).toFixed(2)} kg CO₂
                    </span>
                  </div>
                </div>
              )}

              <Button type="submit" className="w-full eco-gradient" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Submit Deposit"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Deposit;
