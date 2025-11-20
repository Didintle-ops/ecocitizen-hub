import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ArrowLeft, Loader2, Users, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const BecomeCollector = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [idDocument, setIdDocument] = useState("");
  const [address, setAddress] = useState("");
  const [schedule, setSchedule] = useState("");
  const [collectorType, setCollectorType] = useState("");

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }

      // Check if already applied
      const { data: existing } = await supabase
        .from("waste_collectors")
        .select("*")
        .eq("user_id", session.user.id)
        .single();

      if (existing) {
        toast.info("You have already applied to become a collector");
        navigate("/dashboard");
      }
    };
    checkAuth();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("Not authenticated");

      const { error } = await supabase.from("waste_collectors").insert({
        user_id: session.user.id,
        id_document: idDocument,
        address,
        schedule,
        collector_type: collectorType,
      });

      if (error) throw error;

      setSuccess(true);
      toast.success("Application submitted successfully!");
    } catch (error: any) {
      toast.error(error.message || "Failed to submit application");
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
              <div className="mx-auto mb-4 h-20 w-20 rounded-full eco-gradient flex items-center justify-center">
                <CheckCircle className="h-10 w-10 text-white" />
              </div>
              <CardTitle className="text-2xl">Application Submitted!</CardTitle>
              <CardDescription>
                Your waste collector application is under review. We'll notify you once it's approved.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => navigate("/dashboard")} className="w-full">
                Back to Dashboard
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <Button variant="ghost" onClick={() => navigate("/dashboard")} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>

        <Card className="glass-strong">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Users className="h-6 w-6 text-primary" />
              <CardTitle>Become a Waste Collector</CardTitle>
            </div>
            <CardDescription>
              Join our network of certified waste collectors and earn income while helping the environment
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="id-document">ID/Passport Number *</Label>
                <Input
                  id="id-document"
                  placeholder="e.g., AB123456"
                  value={idDocument}
                  onChange={(e) => setIdDocument(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Full Address *</Label>
                <Textarea
                  id="address"
                  placeholder="Enter your complete address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="schedule">Preferred Schedule</Label>
                <Input
                  id="schedule"
                  placeholder="e.g., Monday-Friday, 8AM-5PM"
                  value={schedule}
                  onChange={(e) => setSchedule(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="collector-type">Collector Type *</Label>
                <Select value={collectorType} onValueChange={setCollectorType} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="individual">Individual</SelectItem>
                    <SelectItem value="company">Company</SelectItem>
                    <SelectItem value="municipality">Municipality</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="glass p-4 rounded-xl space-y-2 text-sm">
                <h4 className="font-semibold">Benefits</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>✓ Flexible working hours</li>
                  <li>✓ Competitive compensation</li>
                  <li>✓ Contribute to environmental sustainability</li>
                  <li>✓ Access to exclusive collector dashboard</li>
                </ul>
              </div>

              <Button type="submit" className="w-full eco-gradient" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Application"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BecomeCollector;
