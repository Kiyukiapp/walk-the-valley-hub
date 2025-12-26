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
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      contact_messages: {
        Row: {
          created_at: string
          email: string
          id: string
          is_read: boolean
          message: string
          name: string
          subject: string | null
          type: number | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          is_read?: boolean
          message: string
          name: string
          subject?: string | null
          type?: number | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          is_read?: boolean
          message?: string
          name?: string
          subject?: string | null
          type?: number | null
        }
        Relationships: []
      }
      page_passwords: {
        Row: {
          created_at: string
          id: string
          page_name: string
          password_hash: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          page_name: string
          password_hash: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          page_name?: string
          password_hash?: string
          updated_at?: string
        }
        Relationships: []
      }
      prospects: {
        Row: {
          company: string | null
          company_website: string | null
          created_at: string
          email: string
          id: string
          linkedin: string | null
          location: string | null
          name: string
          notes: string | null
          publish_date: string | null
          season: number
          stage: Database["public"]["Enums"]["prospect_stage"]
          surname: string
          type: Database["public"]["Enums"]["prospect_type"]
          updated_at: string
        }
        Insert: {
          company?: string | null
          company_website?: string | null
          created_at?: string
          email: string
          id?: string
          linkedin?: string | null
          location?: string | null
          name: string
          notes?: string | null
          publish_date?: string | null
          season?: number
          stage?: Database["public"]["Enums"]["prospect_stage"]
          surname: string
          type: Database["public"]["Enums"]["prospect_type"]
          updated_at?: string
        }
        Update: {
          company?: string | null
          company_website?: string | null
          created_at?: string
          email?: string
          id?: string
          linkedin?: string | null
          location?: string | null
          name?: string
          notes?: string | null
          publish_date?: string | null
          season?: number
          stage?: Database["public"]["Enums"]["prospect_stage"]
          surname?: string
          type?: Database["public"]["Enums"]["prospect_type"]
          updated_at?: string
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          email: string
          id: string
          is_active: boolean
          name: string | null
          source: string
          subscribed_at: string
        }
        Insert: {
          email: string
          id?: string
          is_active?: boolean
          name?: string | null
          source: string
          subscribed_at?: string
        }
        Update: {
          email?: string
          id?: string
          is_active?: boolean
          name?: string | null
          source?: string
          subscribed_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_prospect_for_crm:
        | {
            Args: {
              p_company?: string
              p_company_website?: string
              p_email: string
              p_linkedin?: string
              p_location?: string
              p_name: string
              p_notes?: string
              p_season?: number
              p_stage?: Database["public"]["Enums"]["prospect_stage"]
              p_surname: string
              p_type: Database["public"]["Enums"]["prospect_type"]
            }
            Returns: string
          }
        | {
            Args: {
              p_company?: string
              p_company_website?: string
              p_email: string
              p_linkedin?: string
              p_location?: string
              p_name: string
              p_notes?: string
              p_publish_date?: string
              p_season?: number
              p_stage?: Database["public"]["Enums"]["prospect_stage"]
              p_surname: string
              p_type: Database["public"]["Enums"]["prospect_type"]
            }
            Returns: string
          }
      delete_contact_message_for_crm: {
        Args: { message_id: string }
        Returns: boolean
      }
      delete_prospect_for_crm: { Args: { p_id: string }; Returns: boolean }
      get_contact_messages_for_crm: {
        Args: never
        Returns: {
          created_at: string
          email: string
          id: string
          is_read: boolean
          message: string
          name: string
          subject: string
          type: number
        }[]
      }
      get_prospects_for_crm: {
        Args: never
        Returns: {
          company: string
          company_website: string
          created_at: string
          email: string
          id: string
          linkedin: string
          location: string
          name: string
          notes: string
          publish_date: string
          season: number
          stage: Database["public"]["Enums"]["prospect_stage"]
          surname: string
          type: Database["public"]["Enums"]["prospect_type"]
          updated_at: string
        }[]
      }
      get_subscribers_for_crm: {
        Args: never
        Returns: {
          email: string
          id: string
          is_active: boolean
          name: string
          source: string
          subscribed_at: string
        }[]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_current_user_admin: { Args: never; Returns: boolean }
      mark_contact_message_read_for_crm: {
        Args: { message_id: string }
        Returns: boolean
      }
      update_prospect_for_crm:
        | {
            Args: {
              p_company?: string
              p_company_website?: string
              p_email: string
              p_id: string
              p_linkedin?: string
              p_location?: string
              p_name: string
              p_notes?: string
              p_season?: number
              p_stage?: Database["public"]["Enums"]["prospect_stage"]
              p_surname: string
              p_type: Database["public"]["Enums"]["prospect_type"]
            }
            Returns: boolean
          }
        | {
            Args: {
              p_company?: string
              p_company_website?: string
              p_email: string
              p_id: string
              p_linkedin?: string
              p_location?: string
              p_name: string
              p_notes?: string
              p_publish_date?: string
              p_season?: number
              p_stage?: Database["public"]["Enums"]["prospect_stage"]
              p_surname: string
              p_type: Database["public"]["Enums"]["prospect_type"]
            }
            Returns: boolean
          }
      update_subscriber_status: {
        Args: { new_status: boolean; subscriber_id: string }
        Returns: boolean
      }
      validate_page_password: {
        Args: { p_page_name: string; p_password: string }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
      prospect_stage:
        | "prospect"
        | "contacted"
        | "booked"
        | "recorded"
        | "edited"
        | "published"
      prospect_type: "interview" | "partner" | "sponsor"
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
    Enums: {
      app_role: ["admin", "user"],
      prospect_stage: [
        "prospect",
        "contacted",
        "booked",
        "recorded",
        "edited",
        "published",
      ],
      prospect_type: ["interview", "partner", "sponsor"],
    },
  },
} as const
