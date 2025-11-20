import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Trophy, Medal, Award } from "lucide-react";
import { motion } from "framer-motion";

interface LeaderboardEntry {
  name: string;
  xp_points: number;
  eco_level: string;
  wallet_balance: number;
}

const Leaderboard = () => {
  const navigate = useNavigate();
  const [leaders, setLeaders] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const { data } = await supabase
        .from("profiles")
        .select("name, xp_points, eco_level, wallet_balance")
        .order("xp_points", { ascending: false })
        .limit(10);

      if (data) {
        setLeaders(data);
      }
      setLoading(false);
    };

    fetchLeaderboard();
  }, []);

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Trophy className="h-6 w-6 text-yellow-500" />;
      case 1:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 2:
        return <Award className="h-6 w-6 text-orange-600" />;
      default:
        return <span className="text-lg font-bold text-muted-foreground">#{index + 1}</span>;
    }
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
      <div className="max-w-4xl mx-auto">
        <Button variant="ghost" onClick={() => navigate("/dashboard")} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>

        <Card className="glass-strong">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Trophy className="h-6 w-6 text-primary" />
              <CardTitle>Community Leaderboard</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {leaders.map((leader, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`glass p-4 rounded-xl flex items-center gap-4 ${
                  index < 3 ? "glow-primary" : ""
                }`}
              >
                <div className="flex-shrink-0 w-12 flex justify-center">
                  {getRankIcon(index)}
                </div>

                <div className="flex-1">
                  <h3 className="font-semibold">{leader.name}</h3>
                  <p className="text-sm text-muted-foreground">{leader.eco_level}</p>
                </div>

                <div className="text-right">
                  <p className="text-lg font-bold text-gradient">{leader.xp_points} XP</p>
                  <p className="text-sm text-muted-foreground">${leader.wallet_balance.toFixed(2)}</p>
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>

        <Card className="glass mt-6">
          <CardHeader>
            <CardTitle>How to Climb the Ranks</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>• Deposit more recyclables to earn XP</p>
            <p>• Complete weekly and monthly challenges</p>
            <p>• Maintain a consistent recycling streak</p>
            <p>• Invite friends to join the platform</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Leaderboard;
