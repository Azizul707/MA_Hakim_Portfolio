import { createSessionSupabaseClient } from "@/lib/supabase/session";

export async function getUser() {
  const supabase = await createSessionSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user ?? null;
}

export async function requireAuth() {
  const user = await getUser();
  if (!user) {
    return { user: null, redirectTo: "/login" };
  }
  return { user, redirectTo: null };
}