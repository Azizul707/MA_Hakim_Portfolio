"use server";

import { createSessionSupabaseClient } from "@/lib/supabase/session";

export interface AuthResult {
  success: boolean;
  message: string;
}

export async function loginAction(
  _prevState: AuthResult,
  formData: FormData
): Promise<AuthResult> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return {
      success: false,
      message: "Please enter both your email and password.",
    };
  }

  const supabase = await createSessionSupabaseClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return {
      success: false,
      message: "Invalid email or password. Please try again.",
    };
  }

  return { success: true, message: "Signed in." };
}

export async function logoutAction() {
  const supabase = await createSessionSupabaseClient();
  await supabase.auth.signOut();
}
