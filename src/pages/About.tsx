import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Leaf, TrendingUp, Users, Globe, Target, Zap } from "lucide-react";
import { motion } from "framer-motion";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <Button variant="ghost" onClick={() => navigate("/")} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        {/* Hero */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              About <span className="text-gradient">EcoRecycle</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A revolutionary smart municipal recycling system that turns environmental action into tangible rewards
            </p>
          </motion.div>
        </div>

        {/* Mission */}
        <Card className="glass-strong mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Target className="h-6 w-6 text-primary" />
              Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent className="text-lg">
            <p className="mb-4">
              EcoRecycle is designed to make recycling rewarding, trackable, and impactful. We bridge the gap between 
              environmental responsibility and economic incentives, creating a sustainable ecosystem where everyone benefits.
            </p>
            <p>
              Through smart bins, real-time tracking, and a gamified experience, we're making sustainability accessible 
              and exciting for communities worldwide.
            </p>
          </CardContent>
        </Card>

        {/* Key Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="glass h-full">
              <CardContent className="pt-6">
                <Leaf className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Smart Deposits</h3>
                <p className="text-muted-foreground">
                  Scan QR codes on smart bins, deposit recyclables, and instantly earn rewards based on weight and material type
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <Card className="glass h-full">
              <CardContent className="pt-6">
                <TrendingUp className="h-12 w-12 text-accent mb-4" />
                <h3 className="text-xl font-semibold mb-2">XP & Leveling System</h3>
                <p className="text-muted-foreground">
                  Progress from Eco Rookie to Planet Protector. Earn XP with every action and unlock exclusive benefits
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Card className="glass h-full">
              <CardContent className="pt-6">
                <Globe className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Real Impact Tracking</h3>
                <p className="text-muted-foreground">
                  Visualize your carbon offset, waste diverted, and environmental contribution in real-time
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* UN SDGs */}
        <Card className="glass-strong mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Globe className="h-6 w-6 text-primary" />
              Supporting UN Sustainable Development Goals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-6 text-muted-foreground">
              Our platform directly contributes to achieving multiple United Nations Sustainable Development Goals:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { num: 1, name: "No Poverty", desc: "Income through recycling rewards", color: "bg-red-500" },
                { num: 8, name: "Decent Work", desc: "Waste collector job opportunities", color: "bg-rose-700" },
                { num: 11, name: "Sustainable Cities", desc: "Cleaner, smarter municipalities", color: "bg-orange-500" },
                { num: 12, name: "Responsible Consumption", desc: "Proper waste management", color: "bg-amber-500" },
                { num: 13, name: "Climate Action", desc: "Reduced carbon emissions", color: "bg-green-600" },
                { num: 14, name: "Life Below Water", desc: "Less plastic in oceans", color: "bg-blue-500" },
                { num: 15, name: "Life On Land", desc: "Reduced land pollution", color: "bg-lime-600" },
              ].map((sdg, i) => (
                <motion.div
                  key={sdg.num}
                  className="glass p-4 rounded-xl"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className={`w-12 h-12 mb-3 rounded-full ${sdg.color} flex items-center justify-center text-white font-bold text-xl`}>
                    {sdg.num}
                  </div>
                  <h4 className="font-semibold text-sm mb-1">{sdg.name}</h4>
                  <p className="text-xs text-muted-foreground">{sdg.desc}</p>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* How It Works */}
        <Card className="glass-strong mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Zap className="h-6 w-6 text-primary" />
              How It Works
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full eco-gradient flex items-center justify-center text-white font-bold">
                  1
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Sign Up & Verify</h4>
                  <p className="text-muted-foreground">Create your free account and get verified by your municipality</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full eco-gradient flex items-center justify-center text-white font-bold">
                  2
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Find Smart Bins</h4>
                  <p className="text-muted-foreground">Locate nearby smart recycling bins using our interactive map</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full eco-gradient flex items-center justify-center text-white font-bold">
                  3
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Scan & Deposit</h4>
                  <p className="text-muted-foreground">Scan the QR code, deposit your recyclables, and watch the magic happen</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full eco-gradient flex items-center justify-center text-white font-bold">
                  4
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Earn Rewards</h4>
                  <p className="text-muted-foreground">Receive instant cash rewards and XP. Level up and unlock achievements</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <Card className="glass-strong text-center">
          <CardContent className="pt-8 pb-8">
            <Users className="h-16 w-16 text-primary mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join thousands of eco-warriors already making an impact. Start earning rewards today.
            </p>
            <Link to="/auth">
              <Button size="lg" className="eco-gradient">
                Get Started Now
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;
