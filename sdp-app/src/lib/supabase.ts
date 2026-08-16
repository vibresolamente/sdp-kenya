import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://qoojebetenzsgiyobvxs.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFvb2plYmV0ZW56c2dpeW9idnhzIiwibm9uY2UiOiJzdXBhYmFzZSIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzgzMjMyMDM1LCJleHAiOjIwOTg4MDgwMzV9.-_Zb7oEAmx6uw4ogtc2YA-ZM7QfaFGt8ibSdJ1gAh2A";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Note: store URL and anon key in env vars for production
