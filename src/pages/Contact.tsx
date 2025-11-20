import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ArrowLeft, Loader2, Mail, MapPin, AlertTriangle } from "lucide-react";
import { MunicipalityHeader } from "@/components/MunicipalityHeader";

const Contact = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState<any>(null);

  // Contact form
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [isUrgent, setIsUrgent] = useState(false);

  // Bin request form
  const [binName, setBinName] = useState("");
  const [binLocation, setBinLocation] = useState("");
  const [binReason, setBinReason] = useState("");

  // Incident report form
  const [incidentType, setIncidentType] = useState("");
  const [incidentLocation, setIncidentLocation] = useState("");
  const [incidentDescription, setIncidentDescription] = useState("");

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session: currentSession } } = await supabase.auth.getSession();
      setSession(currentSession);
      
      if (currentSession) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("name")
          .eq("id", currentSession.user.id)
          .single();
        
        if (profile) {
          setContactName(profile.name);
          setBinName(profile.name);
        }
        setContactEmail(currentSession.user.email || "");
      }
    };
    checkAuth();
  }, []);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from("contact_requests").insert({
        user_id: session?.user?.id || null,
        municipality_id: (await supabase.from("municipalities").select("id").limit(1).single()).data?.id,
        name: contactName,
        email: contactEmail,
        message: contactMessage,
        is_urgent: isUrgent,
      });

      if (error) throw error;

      toast.success("Message sent successfully!");
      setContactMessage("");
      setIsUrgent(false);
    } catch (error: any) {
      toast.error(error.message || "Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  const handleBinRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from("bin_requests").insert({
        user_id: session?.user?.id || null,
        name: binName,
        location: binLocation,
        reason: binReason,
      });

      if (error) throw error;

      toast.success("Bin request submitted successfully!");
      setBinLocation("");
      setBinReason("");
    } catch (error: any) {
      toast.error(error.message || "Failed to submit request");
    } finally {
      setLoading(false);
    }
  };

  const handleIncidentReport = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from("incident_reports").insert({
        user_id: session?.user?.id || null,
        incident_type: incidentType,
        location: incidentLocation,
        description: incidentDescription,
      });

      if (error) throw error;

      toast.success("Incident reported successfully!");
      setIncidentType("");
      setIncidentLocation("");
      setIncidentDescription("");
    } catch (error: any) {
      toast.error(error.message || "Failed to report incident");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Button variant="ghost" onClick={() => navigate("/dashboard")} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>

        <MunicipalityHeader />

        <Card className="glass-strong">
          <CardHeader>
            <CardTitle>Contact & Community Requests</CardTitle>
            <CardDescription>
              Get in touch with your municipality or report issues in your area
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="contact" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="contact">Contact</TabsTrigger>
                <TabsTrigger value="bin">Request Bin</TabsTrigger>
                <TabsTrigger value="incident">Report Issue</TabsTrigger>
              </TabsList>

              <TabsContent value="contact">
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="contact-name">Name *</Label>
                    <Input
                      id="contact-name"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact-email">Email *</Label>
                    <Input
                      id="contact-email"
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact-message">Message *</Label>
                    <Textarea
                      id="contact-message"
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      required
                      rows={5}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="urgent"
                      checked={isUrgent}
                      onCheckedChange={setIsUrgent}
                    />
                    <Label htmlFor="urgent">Mark as urgent waste issue</Label>
                  </div>

                  <Button type="submit" className="w-full eco-gradient" disabled={loading}>
                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Mail className="mr-2 h-4 w-4" />}
                    Send Message
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="bin">
                <form onSubmit={handleBinRequest} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="bin-name">Your Name *</Label>
                    <Input
                      id="bin-name"
                      value={binName}
                      onChange={(e) => setBinName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bin-location">Location *</Label>
                    <Input
                      id="bin-location"
                      placeholder="e.g., 123 Main St, near Park"
                      value={binLocation}
                      onChange={(e) => setBinLocation(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bin-reason">Why this area needs a bin *</Label>
                    <Textarea
                      id="bin-reason"
                      placeholder="Explain why this location would benefit from a smart recycling bin"
                      value={binReason}
                      onChange={(e) => setBinReason(e.target.value)}
                      required
                      rows={4}
                    />
                  </div>

                  <Button type="submit" className="w-full eco-gradient" disabled={loading}>
                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <MapPin className="mr-2 h-4 w-4" />}
                    Submit Request
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="incident">
                <form onSubmit={handleIncidentReport} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="incident-type">Incident Type *</Label>
                    <Input
                      id="incident-type"
                      placeholder="e.g., Illegal Dumping, Bin Overflow"
                      value={incidentType}
                      onChange={(e) => setIncidentType(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="incident-location">Location *</Label>
                    <Input
                      id="incident-location"
                      placeholder="Where is the issue?"
                      value={incidentLocation}
                      onChange={(e) => setIncidentLocation(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="incident-description">Description</Label>
                    <Textarea
                      id="incident-description"
                      placeholder="Provide details about the incident"
                      value={incidentDescription}
                      onChange={(e) => setIncidentDescription(e.target.value)}
                      rows={4}
                    />
                  </div>

                  <Button type="submit" className="w-full eco-gradient" disabled={loading}>
                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <AlertTriangle className="mr-2 h-4 w-4" />}
                    Report Incident
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Contact;
