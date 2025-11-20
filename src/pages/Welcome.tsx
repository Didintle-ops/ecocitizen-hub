import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Recycle, Leaf, TrendingUp, Users, Award, Globe } from "lucide-react";
import { motion } from "framer-motion";

const Welcome = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
        <div className="absolute inset-0 eco-gradient opacity-10" />
        
        <div className="container relative z-10 max-w-6xl mx-auto text-center">
          <motion.div {...fadeIn}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
              <Leaf className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Smart Recycling for a Sustainable Future</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Turn Your <span className="text-gradient">Recycling</span><br />
              Into Rewards
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Smart Municipal Recycling Deposit & Incentive System. 
              Earn rewards while saving the planet. Track your impact in real-time.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link to="/auth">
                <Button size="lg" className="eco-gradient text-white hover:opacity-90 transition-smooth w-full sm:w-auto">
                  Get Started Free
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Learn More
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Feature Cards */}
          <motion.div 
            className="grid md:grid-cols-3 gap-6 mt-16"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="glass p-6 rounded-2xl text-left">
              <Recycle className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">Smart Deposits</h3>
              <p className="text-muted-foreground">
                Scan QR codes, deposit recyclables, and earn instant rewards
              </p>
            </div>
            
            <div className="glass p-6 rounded-2xl text-left">
              <TrendingUp className="h-10 w-10 text-accent mb-4" />
              <h3 className="text-lg font-semibold mb-2">XP & Levels</h3>
              <p className="text-muted-foreground">
                Level up from Eco Rookie to Planet Protector with every action
              </p>
            </div>
            
            <div className="glass p-6 rounded-2xl text-left">
              <Globe className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">Real Impact</h3>
              <p className="text-muted-foreground">
                Visualize your carbon offset and environmental contribution
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SDGs Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Supporting UN <span className="text-gradient">Sustainable Goals</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our platform directly contributes to achieving multiple United Nations Sustainable Development Goals
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { num: 1, name: "No Poverty", color: "bg-red-500" },
              { num: 8, name: "Decent Work", color: "bg-rose-700" },
              { num: 11, name: "Sustainable Cities", color: "bg-orange-500" },
              { num: 12, name: "Responsible Consumption", color: "bg-amber-500" },
              { num: 13, name: "Climate Action", color: "bg-green-600" },
              { num: 14, name: "Life Below Water", color: "bg-blue-500" },
              { num: 15, name: "Life On Land", color: "bg-lime-600" },
            ].map((sdg, i) => (
              <motion.div
                key={sdg.num}
                className="glass p-6 rounded-2xl text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className={`w-16 h-16 mx-auto mb-3 rounded-full ${sdg.color} flex items-center justify-center text-white font-bold text-2xl`}>
                  {sdg.num}
                </div>
                <p className="text-sm font-medium">{sdg.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-20 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="glass-strong p-8 md:p-12 rounded-3xl text-center">
            <Users className="h-16 w-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Join the <span className="text-gradient">Eco Revolution</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Be part of a growing community of eco-warriors making a real difference. 
              Compete in challenges, earn badges, and become a certified Waste Collector.
            </p>
            <Link to="/auth">
              <Button size="lg" className="eco-gradient text-white">
                Start Your Journey
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="container max-w-6xl mx-auto text-center text-sm text-muted-foreground">
          <p>&copy; 2024 EcoRecycle Platform. Making sustainability rewarding.</p>
        </div>
      </footer>
    </div>
  );
};

export default Welcome;
