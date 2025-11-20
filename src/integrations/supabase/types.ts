export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      alerts: {
        Row: {
          alert_type: string | null
          created_at: string | null
          id: string
          message: string
          municipality_id: string | null
          title: string
        }
        Insert: {
          alert_type?: string | null
          created_at?: string | null
          id?: string
          message: string
          municipality_id?: string | null
          title: string
        }
        Update: {
          alert_type?: string | null
          created_at?: string | null
          id?: string
          message?: string
          municipality_id?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "alerts_municipality_id_fkey"
            columns: ["municipality_id"]
            isOneToOne: false
            referencedRelation: "municipalities"
            referencedColumns: ["id"]
          },
        ]
      }
      bin_requests: {
        Row: {
          created_at: string | null
          id: string
          image_url: string | null
          latitude: number | null
          location: string
          longitude: number | null
          name: string
          reason: string
          status: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          image_url?: string | null
          latitude?: number | null
          location: string
          longitude?: number | null
          name: string
          reason: string
          status?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          image_url?: string | null
          latitude?: number | null
          location?: string
          longitude?: number | null
          name?: string
          reason?: string
          status?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      bins: {
        Row: {
          bin_code: string
          created_at: string | null
          fill_level: number | null
          id: string
          last_collection: string | null
          latitude: number | null
          location: string
          longitude: number | null
          municipality_id: string | null
          status: string | null
        }
        Insert: {
          bin_code: string
          created_at?: string | null
          fill_level?: number | null
          id?: string
          last_collection?: string | null
          latitude?: number | null
          location: string
          longitude?: number | null
          municipality_id?: string | null
          status?: string | null
        }
        Update: {
          bin_code?: string
          created_at?: string | null
          fill_level?: number | null
          id?: string
          last_collection?: string | null
          latitude?: number | null
          location?: string
          longitude?: number | null
          municipality_id?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bins_municipality_id_fkey"
            columns: ["municipality_id"]
            isOneToOne: false
            referencedRelation: "municipalities"
            referencedColumns: ["id"]
          },
        ]
      }
      challenges: {
        Row: {
          challenge_type: string | null
          created_at: string | null
          description: string | null
          end_date: string | null
          id: string
          reward_cash: number | null
          reward_xp: number | null
          start_date: string | null
          target_value: number
          title: string
        }
        Insert: {
          challenge_type?: string | null
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          reward_cash?: number | null
          reward_xp?: number | null
          start_date?: string | null
          target_value: number
          title: string
        }
        Update: {
          challenge_type?: string | null
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          reward_cash?: number | null
          reward_xp?: number | null
          start_date?: string | null
          target_value?: number
          title?: string
        }
        Relationships: []
      }
      contact_requests: {
        Row: {
          created_at: string | null
          email: string
          id: string
          is_urgent: boolean | null
          message: string
          municipality_id: string | null
          name: string
          status: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          is_urgent?: boolean | null
          message: string
          municipality_id?: string | null
          name: string
          status?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          is_urgent?: boolean | null
          message?: string
          municipality_id?: string | null
          name?: string
          status?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contact_requests_municipality_id_fkey"
            columns: ["municipality_id"]
            isOneToOne: false
            referencedRelation: "municipalities"
            referencedColumns: ["id"]
          },
        ]
      }
      deposits: {
        Row: {
          bin_id: string | null
          carbon_offset_kg: number | null
          created_at: string | null
          id: string
          material_type: string
          reward_amount: number
          user_id: string | null
          weight_kg: number
          xp_earned: number | null
        }
        Insert: {
          bin_id?: string | null
          carbon_offset_kg?: number | null
          created_at?: string | null
          id?: string
          material_type: string
          reward_amount: number
          user_id?: string | null
          weight_kg: number
          xp_earned?: number | null
        }
        Update: {
          bin_id?: string | null
          carbon_offset_kg?: number | null
          created_at?: string | null
          id?: string
          material_type?: string
          reward_amount?: number
          user_id?: string | null
          weight_kg?: number
          xp_earned?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "deposits_bin_id_fkey"
            columns: ["bin_id"]
            isOneToOne: false
            referencedRelation: "bins"
            referencedColumns: ["id"]
          },
        ]
      }
      incident_reports: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          image_url: string | null
          incident_type: string
          latitude: number | null
          location: string
          longitude: number | null
          status: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          incident_type: string
          latitude?: number | null
          location: string
          longitude?: number | null
          status?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          incident_type?: string
          latitude?: number | null
          location?: string
          longitude?: number | null
          status?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      municipalities: {
        Row: {
          address: string | null
          created_at: string | null
          email: string
          hotline: string
          id: string
          logo_url: string | null
          name: string
          registration_id: string
        }
        Insert: {
          address?: string | null
          created_at?: string | null
          email: string
          hotline: string
          id?: string
          logo_url?: string | null
          name: string
          registration_id: string
        }
        Update: {
          address?: string | null
          created_at?: string | null
          email?: string
          hotline?: string
          id?: string
          logo_url?: string | null
          name?: string
          registration_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          eco_level: string | null
          id: string
          is_collector: boolean | null
          municipality_id: string | null
          name: string
          phone: string | null
          updated_at: string | null
          wallet_balance: number | null
          xp_points: number | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          eco_level?: string | null
          id: string
          is_collector?: boolean | null
          municipality_id?: string | null
          name: string
          phone?: string | null
          updated_at?: string | null
          wallet_balance?: number | null
          xp_points?: number | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          eco_level?: string | null
          id?: string
          is_collector?: boolean | null
          municipality_id?: string | null
          name?: string
          phone?: string | null
          updated_at?: string | null
          wallet_balance?: number | null
          xp_points?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_municipality_id_fkey"
            columns: ["municipality_id"]
            isOneToOne: false
            referencedRelation: "municipalities"
            referencedColumns: ["id"]
          },
        ]
      }
      waste_collectors: {
        Row: {
          address: string
          approved_at: string | null
          collector_type: string | null
          created_at: string | null
          id: string
          id_document: string
          schedule: string | null
          status: string | null
          user_id: string | null
        }
        Insert: {
          address: string
          approved_at?: string | null
          collector_type?: string | null
          created_at?: string | null
          id?: string
          id_document: string
          schedule?: string | null
          status?: string | null
          user_id?: string | null
        }
        Update: {
          address?: string
          approved_at?: string | null
          collector_type?: string | null
          created_at?: string | null
          id?: string
          id_document?: string
          schedule?: string | null
          status?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
