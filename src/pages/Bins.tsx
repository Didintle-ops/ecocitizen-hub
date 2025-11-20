import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, MapPin, Activity } from "lucide-react";
import { motion } from "framer-motion";

interface Bin {
  id: string;
  bin_code: string;
  location: string;
  status: string;
  fill_level: number;
}

const Bins = () => {
  const navigate = useNavigate();
  const [bins, setBins] = useState<Bin[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBins = async () => {
      const { data } = await supabase
        .from("bins")
        .select("*")
        .order("location");

      if (data) {
        setBins(data);
      }
      setLoading(false);
    };

    fetchBins();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-500";
      case "full":
        return "bg-red-500";
      case "offline":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "available":
        return <Badge className="bg-green-500">Available</Badge>;
      case "full":
        return <Badge className="bg-red-500">Full</Badge>;
      case "offline":
        return <Badge variant="secondary">Offline</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
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
      <div className="max-w-6xl mx-auto">
        <Button variant="ghost" onClick={() => navigate("/dashboard")} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>

        <Card className="glass-strong mb-6">
          <CardHeader>
            <div className="flex items-center gap-3">
              <MapPin className="h-6 w-6 text-primary" />
              <CardTitle>Nearby Smart Bins</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {bins.map((bin, index) => (
                <motion.div
                  key={bin.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="glass">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-semibold">{bin.location}</h3>
                          <p className="text-sm text-muted-foreground">{bin.bin_code}</p>
                        </div>
                        {getStatusBadge(bin.status)}
                      </div>

                      <div className="space-y-3">
                        <div>
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span className="text-muted-foreground">Fill Level</span>
                            <span className="font-medium">{bin.fill_level}%</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className={`h-full transition-all ${
                                bin.fill_level > 80
                                  ? "bg-red-500"
                                  : bin.fill_level > 50
                                  ? "bg-yellow-500"
                                  : "bg-green-500"
                              }`}
                              style={{ width: `${bin.fill_level}%` }}
                            />
                          </div>
                        </div>

                        {bin.status === "available" && (
                          <Button
                            className="w-full"
                            size="sm"
                            variant="outline"
                            onClick={() => navigate(`/deposit?bin=${bin.bin_code}`)}
                          >
                            Use This Bin
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-4">
          <Card className="glass">
            <CardContent className="pt-6">
              <Activity className="h-8 w-8 text-primary mb-2" />
              <p className="text-sm text-muted-foreground">Available Bins</p>
              <p className="text-2xl font-bold">
                {bins.filter((b) => b.status === "available").length}
              </p>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardContent className="pt-6">
              <Activity className="h-8 w-8 text-red-500 mb-2" />
              <p className="text-sm text-muted-foreground">Full Bins</p>
              <p className="text-2xl font-bold">
                {bins.filter((b) => b.status === "full").length}
              </p>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardContent className="pt-6">
              <Activity className="h-8 w-8 text-gray-500 mb-2" />
              <p className="text-sm text-muted-foreground">Total Bins</p>
              <p className="text-2xl font-bold">{bins.length}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Bins;
