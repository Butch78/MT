import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/models';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
// TODO Implement supabase client with types
// export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
export const supabase = createClient(supabaseUrl, supabaseKey);

//  Create a function that will u