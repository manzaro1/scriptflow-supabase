export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string | null
          avatar_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          name?: string | null
          avatar_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          avatar_url?: string | null
          created_at?: string
        }
      }
      scripts: {
        Row: {
          id: string
          user_id: string
          title: string
          genre: string | null
          logline: string | null
          content: string | null
          version: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          genre?: string | null
          logline?: string | null
          content?: string | null
          version?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          genre?: string | null
          logline?: string | null
          content?: string | null
          version?: number
          updated_at?: string
        }
      }
      script_blocks: {
        Row: {
          id: string
          script_id: string
          block_type: string
          content: string
          scene_number: string | null
          order_index: number
          created_at: string
        }
        Insert: {
          id?: string
          script_id: string
          block_type: string
          content: string
          scene_number?: string | null
          order_index: number
          created_at?: string
        }
        Update: {
          id?: string
          script_id?: string
          block_type?: string
          content?: string
          scene_number?: string | null
          order_index?: number
        }
      }
      ai_rules: {
        Row: {
          id: string
          script_id: string
          user_id: string
          rule_type: string
          rule_content: Json
          created_at: string
        }
        Insert: {
          id?: string
          script_id: string
          user_id: string
          rule_type: string
          rule_content: Json
          created_at?: string
        }
        Update: {
          rule_content?: Json
        }
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          type: string
          message: string
          read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          type: string
          message: string
          read?: boolean
          created_at?: string
        }
        Update: {
          read?: boolean
        }
      }
    }
  }
}

export type User = Database['public']['Tables']['users']['Row']
export type Script = Database['public']['Tables']['scripts']['Row']
export type ScriptBlock = Database['public']['Tables']['script_blocks']['Row']
export type AiRule = Database['public']['Tables']['ai_rules']['Row']
export type Notification = Database['public']['Tables']['notifications']['Row']