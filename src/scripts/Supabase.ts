// Initialize Supabase client
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabaseUrl = SUPABASE_URL as string;
const supabaseAnonKey =SUPABASE_ANON_KEY as string;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
