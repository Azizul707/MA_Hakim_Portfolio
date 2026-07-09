"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { leadFormSchema } from "@/lib/validation/lead";
import type { LeadSubmitResult } from "@/types/portfolio-lead";

export async function submitPortfolioLead(
  _prevState: LeadSubmitResult,
  formData: FormData
): Promise<LeadSubmitResult> {
  try {
    // Parse and validate
    const raw = Object.fromEntries(formData.entries());
    const parsed = leadFormSchema.safeParse(raw);

    if (!parsed.success) {
      return {
        success: false,
        message: "Please fix the errors below and try again.",
        errors: parsed.error.flatten().fieldErrors,
      };
    }

    const data = parsed.data;

    // Insert into Supabase
    const supabase = await createServerSupabaseClient();

    const { data: lead, error } = await supabase
      .from("portfolio_leads")
      .insert({
        name: data.name,
        email: data.email,
        business_name: data.business_name,
        industry: data.industry,
        website: data.website || null,
        current_challenge: data.current_challenge,
        project_goal: data.project_goal,
        budget: data.budget || null,
        message: data.message,
        source_page: data.source_page || "/contact",
        status: "NEW",
        priority: "NORMAL",
        source: "Portfolio Website",
      })
      .select("id")
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      return {
        success: false,
        message: "Something went wrong saving your message. Please try again.",
      };
    }

    // Log the initial event
    const { error: eventError } = await supabase
      .from("lead_events")
      .insert({
        lead_id: lead.id,
        event_type: "lead_created",
        new_value: "Lead submitted via portfolio contact form",
        created_by: "system",
      });

    if (eventError) {
      console.error("Supabase event insert error:", eventError);
      // Lead saved, event is non-critical — don't fail the submission
    }

    return {
      success: true,
      message:
        "Thanks! I've received your message and will get back to you as soon as possible.",
    };
  } catch (err) {
    console.error("Unexpected error in submitPortfolioLead:", err);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    };
  }
}