export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
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
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}

// Convenience types
export type User = Database['public']['Tables']['users']['Row']
export type Script = Database['public']['Tables']['scripts']['Row']
export type ScriptInsert = Database['public']['Tables']['scripts']['Insert']
export type ScriptUpdate = Database['public']['Tables']['scripts']['Update']

// API Response types
export interface ApiResponse<T> {
  data?: T
  error?: string
}
