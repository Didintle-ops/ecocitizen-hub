import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MunicipalityHeader } from "@/components/MunicipalityHeader";
import { 
  Wallet, TrendingUp, Award, Leaf, QrCode, 
  LogOut, Users, Bell, MapPin, User 
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface Profile {
  name: string;
  wallet_balance: number;
  xp_points: number;
  eco_level: string;
  is_collector: boolean;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/auth");
        return;
      }

      // Fetch profile
      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();

      if (profileData) {
        setProfile(profileData);
      }
      setLoading(false);
    };

    checkAuth();
  }, [navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast.success("Signed out successfully");
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">
              Welcome back, <span className="text-gradient">{profile?.name}</span>
            </h1>
            <p className="text-muted-foreground">Your eco-impact dashboard</p>
          </div>
          <Button variant="outline" size="icon" onClick={handleSignOut}>
            <LogOut className="h-4 w-4" />
          </Button>
        </div>

        <MunicipalityHeader />

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="glass">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Wallet Balance</CardTitle>
                <Wallet className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${profile?.wallet_balance.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">Available for withdrawal</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="glass">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">XP Points</CardTitle>
                <TrendingUp className="h-4 w-4 text-accent" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{profile?.xp_points}</div>
                <p className="text-xs text-muted-foreground">Keep climbing!</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="glass">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Eco Level</CardTitle>
                <Award className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{profile?.eco_level}</div>
                <p className="text-xs text-muted-foreground">Current rank</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card className="glass">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Status</CardTitle>
                <Leaf className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {profile?.is_collector ? "Collector" : "Member"}
                </div>
                <p className="text-xs text-muted-foreground">Account type</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <Card className="glass-strong mb-6">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <Link to="/deposit">
                <Button className="w-full eco-gradient h-20">
                  <QrCode className="mr-2 h-5 w-5" />
                  Make Deposit
                </Button>
              </Link>
              
              {!profile?.is_collector && (
                <Link to="/become-collector">
                  <Button variant="outline" className="w-full h-20">
                    <Users className="mr-2 h-5 w-5" />
                    Become Collector
                  </Button>
                </Link>
              )}
              
              <Link to="/contact">
                <Button variant="outline" className="w-full h-20">
                  <Bell className="mr-2 h-5 w-5" />
                  Contact & Requests
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Additional Navigation */}
        <div className="grid md:grid-cols-2 gap-4">
          <Link to="/leaderboard">
            <Card className="glass cursor-pointer hover:glow-primary transition-smooth">
              <CardHeader className="flex flex-row items-center gap-3">
                <Users className="h-6 w-6 text-primary" />
                <CardTitle>Community Leaderboard</CardTitle>
              </CardHeader>
            </Card>
          </Link>

          <Link to="/bins">
            <Card className="glass cursor-pointer hover:glow-primary transition-smooth">
              <CardHeader className="flex flex-row items-center gap-3">
                <MapPin className="h-6 w-6 text-accent" />
                <CardTitle>Find Nearby Bins</CardTitle>
              </CardHeader>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
