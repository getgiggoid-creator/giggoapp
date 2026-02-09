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
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      admin_logs: {
        Row: {
          action_type: string
          admin_id: string
          created_at: string
          details: Json | null
          id: string
          ip_address: string | null
          target_id: string | null
          target_table: string | null
        }
        Insert: {
          action_type: string
          admin_id: string
          created_at?: string
          details?: Json | null
          id?: string
          ip_address?: string | null
          target_id?: string | null
          target_table?: string | null
        }
        Update: {
          action_type?: string
          admin_id?: string
          created_at?: string
          details?: Json | null
          id?: string
          ip_address?: string | null
          target_id?: string | null
          target_table?: string | null
        }
        Relationships: []
      }
      applications: {
        Row: {
          applied_at: string
          campaign_id: string
          completed_at: string | null
          courier_name: string | null
          created_at: string
          creator_id: string
          deadline_at: string | null
          delivered_at: string | null
          hired_at: string | null
          id: string
          notes: string | null
          shipped_at: string | null
          shipping_address_snapshot: Json | null
          shipping_status: Database["public"]["Enums"]["shipping_status"] | null
          status: Database["public"]["Enums"]["application_status"]
          tracking_number: string | null
          updated_at: string
        }
        Insert: {
          applied_at?: string
          campaign_id: string
          completed_at?: string | null
          courier_name?: string | null
          created_at?: string
          creator_id: string
          deadline_at?: string | null
          delivered_at?: string | null
          hired_at?: string | null
          id?: string
          notes?: string | null
          shipped_at?: string | null
          shipping_address_snapshot?: Json | null
          shipping_status?:
            | Database["public"]["Enums"]["shipping_status"]
            | null
          status?: Database["public"]["Enums"]["application_status"]
          tracking_number?: string | null
          updated_at?: string
        }
        Update: {
          applied_at?: string
          campaign_id?: string
          completed_at?: string | null
          courier_name?: string | null
          created_at?: string
          creator_id?: string
          deadline_at?: string | null
          delivered_at?: string | null
          hired_at?: string | null
          id?: string
          notes?: string | null
          shipped_at?: string | null
          shipping_address_snapshot?: Json | null
          shipping_status?:
            | Database["public"]["Enums"]["shipping_status"]
            | null
          status?: Database["public"]["Enums"]["application_status"]
          tracking_number?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "applications_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "applications_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "public_campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      brand_profiles: {
        Row: {
          company_logo: string | null
          company_name: string
          created_at: string
          goals: string[] | null
          id: string
          industry: string | null
          monthly_budget: string | null
          target_age_ranges: string[] | null
          target_regions: string[] | null
          updated_at: string
          user_id: string
        }
        Insert: {
          company_logo?: string | null
          company_name: string
          created_at?: string
          goals?: string[] | null
          id?: string
          industry?: string | null
          monthly_budget?: string | null
          target_age_ranges?: string[] | null
          target_regions?: string[] | null
          updated_at?: string
          user_id: string
        }
        Update: {
          company_logo?: string | null
          company_name?: string
          created_at?: string
          goals?: string[] | null
          id?: string
          industry?: string | null
          monthly_budget?: string | null
          target_age_ranges?: string[] | null
          target_regions?: string[] | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      campaigns: {
        Row: {
          assets: Json | null
          brand_id: string | null
          brief: string | null
          brief_structure: Json | null
          budget: number
          category: string
          cover_image: string | null
          created_at: string
          description: string
          end_date: string
          id: string
          platform_requirements: string[] | null
          prize_breakdown: Json | null
          product_type: Database["public"]["Enums"]["product_type"] | null
          product_url: string | null
          required_hashtags: string[] | null
          rules: string[] | null
          start_date: string
          status: Database["public"]["Enums"]["campaign_status"]
          submission_count: number
          suggested_script: string | null
          title: string
          type: Database["public"]["Enums"]["campaign_type"]
          updated_at: string
          usage_rights: Json | null
          view_count: number
        }
        Insert: {
          assets?: Json | null
          brand_id?: string | null
          brief?: string | null
          brief_structure?: Json | null
          budget?: number
          category: string
          cover_image?: string | null
          created_at?: string
          description: string
          end_date: string
          id?: string
          platform_requirements?: string[] | null
          prize_breakdown?: Json | null
          product_type?: Database["public"]["Enums"]["product_type"] | null
          product_url?: string | null
          required_hashtags?: string[] | null
          rules?: string[] | null
          start_date?: string
          status?: Database["public"]["Enums"]["campaign_status"]
          submission_count?: number
          suggested_script?: string | null
          title: string
          type?: Database["public"]["Enums"]["campaign_type"]
          updated_at?: string
          usage_rights?: Json | null
          view_count?: number
        }
        Update: {
          assets?: Json | null
          brand_id?: string | null
          brief?: string | null
          brief_structure?: Json | null
          budget?: number
          category?: string
          cover_image?: string | null
          created_at?: string
          description?: string
          end_date?: string
          id?: string
          platform_requirements?: string[] | null
          prize_breakdown?: Json | null
          product_type?: Database["public"]["Enums"]["product_type"] | null
          product_url?: string | null
          required_hashtags?: string[] | null
          rules?: string[] | null
          start_date?: string
          status?: Database["public"]["Enums"]["campaign_status"]
          submission_count?: number
          suggested_script?: string | null
          title?: string
          type?: Database["public"]["Enums"]["campaign_type"]
          updated_at?: string
          usage_rights?: Json | null
          view_count?: number
        }
        Relationships: []
      }
      creator_profiles: {
        Row: {
          categories: string[] | null
          created_at: string
          id: string
          is_public: boolean
          portfolio_items: Json
          social_connections: Json | null
          updated_at: string
          user_id: string
        }
        Insert: {
          categories?: string[] | null
          created_at?: string
          id?: string
          is_public?: boolean
          portfolio_items?: Json
          social_connections?: Json | null
          updated_at?: string
          user_id: string
        }
        Update: {
          categories?: string[] | null
          created_at?: string
          id?: string
          is_public?: boolean
          portfolio_items?: Json
          social_connections?: Json | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          full_name: string | null
          id: string
          updated_at: string
          user_id: string
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          updated_at?: string
          user_id: string
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          updated_at?: string
          user_id?: string
          username?: string | null
          website?: string | null
        }
        Relationships: []
      }
      submission_feedback: {
        Row: {
          content: string
          created_at: string
          id: string
          is_resolved: boolean
          submission_id: string
          timestamp_seconds: number
          updated_at: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          is_resolved?: boolean
          submission_id: string
          timestamp_seconds?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          is_resolved?: boolean
          submission_id?: string
          timestamp_seconds?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "submission_feedback_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      submissions: {
        Row: {
          brand_feedback: string | null
          campaign_id: string
          caption: string | null
          created_at: string
          creator_id: string
          decline_reason: string | null
          feedback_timestamp: string | null
          hashtags: string[] | null
          id: string
          platform_url: string | null
          redo_count: number
          reviewed_at: string | null
          status: Database["public"]["Enums"]["submission_status"]
          submitted_at: string
          updated_at: string
          video_url: string | null
        }
        Insert: {
          brand_feedback?: string | null
          campaign_id: string
          caption?: string | null
          created_at?: string
          creator_id: string
          decline_reason?: string | null
          feedback_timestamp?: string | null
          hashtags?: string[] | null
          id?: string
          platform_url?: string | null
          redo_count?: number
          reviewed_at?: string | null
          status?: Database["public"]["Enums"]["submission_status"]
          submitted_at?: string
          updated_at?: string
          video_url?: string | null
        }
        Update: {
          brand_feedback?: string | null
          campaign_id?: string
          caption?: string | null
          created_at?: string
          creator_id?: string
          decline_reason?: string | null
          feedback_timestamp?: string | null
          hashtags?: string[] | null
          id?: string
          platform_url?: string | null
          redo_count?: number
          reviewed_at?: string | null
          status?: Database["public"]["Enums"]["submission_status"]
          submitted_at?: string
          updated_at?: string
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "submissions_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "submissions_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "public_campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      transactions: {
        Row: {
          account_number: string | null
          amount: number
          bank_name: string | null
          created_at: string
          description: string | null
          id: string
          reference_id: string | null
          status: Database["public"]["Enums"]["transaction_status"]
          type: Database["public"]["Enums"]["transaction_type"]
          updated_at: string
          wallet_id: string
        }
        Insert: {
          account_number?: string | null
          amount: number
          bank_name?: string | null
          created_at?: string
          description?: string | null
          id?: string
          reference_id?: string | null
          status?: Database["public"]["Enums"]["transaction_status"]
          type: Database["public"]["Enums"]["transaction_type"]
          updated_at?: string
          wallet_id: string
        }
        Update: {
          account_number?: string | null
          amount?: number
          bank_name?: string | null
          created_at?: string
          description?: string | null
          id?: string
          reference_id?: string | null
          status?: Database["public"]["Enums"]["transaction_status"]
          type?: Database["public"]["Enums"]["transaction_type"]
          updated_at?: string
          wallet_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "transactions_wallet_id_fkey"
            columns: ["wallet_id"]
            isOneToOne: false
            referencedRelation: "wallets"
            referencedColumns: ["id"]
          },
        ]
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
          role: Database["public"]["Enums"]["app_role"]
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
      wallets: {
        Row: {
          balance: number
          created_at: string
          id: string
          pending_balance: number
          updated_at: string
          user_id: string
        }
        Insert: {
          balance?: number
          created_at?: string
          id?: string
          pending_balance?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          balance?: number
          created_at?: string
          id?: string
          pending_balance?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      public_campaigns: {
        Row: {
          brand_logo: string | null
          brand_name: string | null
          category: string | null
          cover_image: string | null
          created_at: string | null
          description: string | null
          end_date: string | null
          id: string | null
          start_date: string | null
          status: Database["public"]["Enums"]["campaign_status"] | null
          title: string | null
          type: Database["public"]["Enums"]["campaign_type"] | null
          updated_at: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      ensure_wallet_exists: { Args: { _user_id: string }; Returns: string }
      get_user_role: {
        Args: { _user_id: string }
        Returns: Database["public"]["Enums"]["app_role"]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      hold_escrow_for_campaign: {
        Args: { _amount: number; _brand_id: string; _campaign_id: string }
        Returns: boolean
      }
      is_admin: { Args: { _user_id: string }; Returns: boolean }
      release_escrow_to_creator: {
        Args: {
          _amount: number
          _brand_id: string
          _campaign_id: string
          _creator_id: string
          _description: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "brand" | "creator" | "admin"
      application_status:
        | "applied"
        | "shortlisted"
        | "hired"
        | "rejected"
        | "completed"
      campaign_status: "draft" | "live" | "judging" | "completed" | "cancelled"
      campaign_type: "contest" | "deal"
      product_type: "physical" | "digital"
      shipping_status:
        | "needs_address"
        | "processing"
        | "shipped"
        | "delivered"
        | "issue"
      submission_status:
        | "submitted"
        | "redo_requested"
        | "approved"
        | "declined"
      transaction_status: "pending" | "success" | "failed"
      transaction_type:
        | "deposit"
        | "withdrawal"
        | "earning"
        | "escrow_hold"
        | "escrow_release"
        | "refund"
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
      app_role: ["brand", "creator", "admin"],
      application_status: [
        "applied",
        "shortlisted",
        "hired",
        "rejected",
        "completed",
      ],
      campaign_status: ["draft", "live", "judging", "completed", "cancelled"],
      campaign_type: ["contest", "deal"],
      product_type: ["physical", "digital"],
      shipping_status: [
        "needs_address",
        "processing",
        "shipped",
        "delivered",
        "issue",
      ],
      submission_status: [
        "submitted",
        "redo_requested",
        "approved",
        "declined",
      ],
      transaction_status: ["pending", "success", "failed"],
      transaction_type: [
        "deposit",
        "withdrawal",
        "earning",
        "escrow_hold",
        "escrow_release",
        "refund",
      ],
    },
  },
} as const
