import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Building2, Phone, Mail } from "lucide-react";
import { motion } from "framer-motion";

interface Municipality {
  id: string;
  name: string;
  logo_url: string | null;
  registration_id: string;
  hotline: string;
  email: string;
  address: string | null;
}

export const MunicipalityHeader = () => {
  const [municipality, setMunicipality] = useState<Municipality | null>(null);

  useEffect(() => {
    const fetchMunicipality = async () => {
      const { data } = await supabase
        .from("municipalities")
        .select("*")
        .limit(1)
        .single();
      
      if (data) {
        setMunicipality(data);
      }
    };

    fetchMunicipality();
  }, []);

  if (!municipality) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass p-4 rounded-2xl mb-6"
    >
      <div className="flex items-center gap-4">
        {municipality.logo_url && (
          <img
            src={municipality.logo_url}
            alt={municipality.name}
            className="h-12 w-12 rounded-full object-cover"
          />
        )}
        
        <div className="flex-1">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <Building2 className="h-3 w-3" />
            <span>Operating under:</span>
          </div>
          <h2 className="font-semibold">{municipality.name}</h2>
          <p className="text-xs text-muted-foreground">Reg. {municipality.registration_id}</p>
        </div>

        <div className="hidden md:flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Phone className="h-3 w-3" />
            <span>{municipality.hotline}</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Mail className="h-3 w-3" />
            <span>{municipality.email}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
