export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      cards: {
        Row: {
          answer: string | null
          completed: boolean
          created_at: string | null
          deck_id: string | null
          dueDate: string | null
          easiness: number | null
          fruit: string | null
          id: string
          interval: number | null
          question: string | null
          ref_id: string | null
          repetition: number | null
          state: string | null
          updated_at: string | null
        }
        Insert: {
          answer?: string | null
          completed?: boolean
          created_at?: string | null
          deck_id?: string | null
          dueDate?: string | null
          easiness?: number | null
          fruit?: string | null
          id?: string
          interval?: number | null
          question?: string | null
          ref_id?: string | null
          repetition?: number | null
          state?: string | null
          updated_at?: string | null
        }
        Update: {
          answer?: string | null
          completed?: boolean
          created_at?: string | null
          deck_id?: string | null
          dueDate?: string | null
          easiness?: number | null
          fruit?: string | null
          id?: string
          interval?: number | null
          question?: string | null
          ref_id?: string | null
          repetition?: number | null
          state?: string | null
          updated_at?: string | null
        }
      }
      decks: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          lesson_id: string | null
          name: string | null
          ref_id: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          lesson_id?: string | null
          name?: string | null
          ref_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          lesson_id?: string | null
          name?: string | null
          ref_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
      }
      files: {
        Row: {
          bucket_url: string | null
          created_at: string | null
          id: string
          lesson_id: string | null
          name: string | null
          ref_id: string | null
          type: string | null
        }
        Insert: {
          bucket_url?: string | null
          created_at?: string | null
          id?: string
          lesson_id?: string | null
          name?: string | null
          ref_id?: string | null
          type?: string | null
        }
        Update: {
          bucket_url?: string | null
          created_at?: string | null
          id?: string
          lesson_id?: string | null
          name?: string | null
          ref_id?: string | null
          type?: string | null
        }
      }
      lessons: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string | null
          ref_id: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string | null
          ref_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string | null
          ref_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
      }
      output: {
        Row: {
          answer: string | null
          created_at: string | null
          id: string
          question: string | null
          user_id: string | null
        }
        Insert: {
          answer?: string | null
          created_at?: string | null
          id?: string
          question?: string | null
          user_id?: string | null
        }
        Update: {
          answer?: string | null
          created_at?: string | null
          id?: string
          question?: string | null
          user_id?: string | null
        }
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
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
