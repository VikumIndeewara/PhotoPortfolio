// src/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

// Replace these placeholders with your actual Supabase project credentials
console.log("Loading Supabase environment variables...");
console.log("VITE_SUPABASE_URL:", import.meta.env.VITE_SUPABASE_URL);
console.log("VITE_SUPABASE_ANON_KEY:", import.meta.env.VITE_SUPABASE_ANON_KEY ? "Loaded" : "Not Loaded");
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Supabase URL or Anon Key is missing in environment variables.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);