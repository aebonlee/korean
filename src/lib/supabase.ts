import { createClient } from '@supabase/supabase-js';

const sbUrl = import.meta.env.VITE_SUPABASE_URL;
const sbAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = (sbUrl && sbAnonKey)
  ? createClient(sbUrl, sbAnonKey)
  : null;
