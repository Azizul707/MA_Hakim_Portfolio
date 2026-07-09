import { createClient } from "@supabase/supabase-js";

/**
 * Create a Supabase client using the service role key.
 * Bypasses RLS — for server-only admin/data operations.
 * Do NOT use in browser contexts or for auth (use session.ts instead).
 */
export async function createServerSupabaseClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
    }
  );
}
