"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { z } from "zod";
import type {
  PortfolioLead,
  LeadListParams,
  LeadListResult,
  LeadStatus,
  LeadPriority,
  LeadUpdatePayload,
} from "@/types/portfolio-lead";
import { STATUS_VALUES, PRIORITY_VALUES } from "@/lib/lead-meta";

const updateSchema = z.object({
  status: z.enum(STATUS_VALUES).optional(),
  priority: z.enum(PRIORITY_VALUES).optional(),
  notes: z.string().max(5000).optional(),
});

export async function getLeads(params: LeadListParams): Promise<LeadListResult> {
  const supabase = await createServerSupabaseClient();
  const {
    page = 1,
    pageSize = 10,
    search = "",
    status = "ALL",
    priority = "ALL",
    industry = "ALL",
    sortBy = "created_at",
    sortOrder = "desc",
  } = params;

  let query = supabase.from("portfolio_leads").select("*", { count: "exact" });

  if (search.trim()) {
    const term = `%${search.trim()}%`;
    query = query.or(`name.ilike.${term},business_name.ilike.${term},email.ilike.${term}`);
  }
  if (status && status !== "ALL") {
    query = query.eq("status", status);
  }
  if (priority && priority !== "ALL") {
    query = query.eq("priority", priority);
  }
  if (industry && industry !== "ALL") {
    query = query.eq("industry", industry);
  }

  const sortColumn = sortBy || "created_at";
  const order = sortOrder === "asc" ? { ascending: true } : { ascending: false };
  query = query.order(sortColumn, order);

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  query = query.range(from, to);

  const { data, error, count } = await query;

  if (error) {
    throw new Error(`Failed to load leads: ${error.message}`);
  }

  const total = count ?? 0;
  const totalPages = Math.ceil(total / pageSize);

  return {
    leads: (data ?? []) as PortfolioLead[],
    total,
    page,
    pageSize,
    totalPages,
  };
}

export async function getLeadById(id: string): Promise<PortfolioLead | null> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("portfolio_leads")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to load lead: ${error.message}`);
  }

  return (data as PortfolioLead) ?? null;
}

export interface LeadStats {
  total: number;
  new: number;
  contacted: number;
  qualified: number;
  won: number;
  lost: number;
}

export async function getLeadStats(): Promise<LeadStats> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("portfolio_leads")
    .select("status");

  if (error) {
    throw new Error(`Failed to load stats: ${error.message}`);
  }

  const stats: LeadStats = {
    total: data.length,
    new: 0,
    contacted: 0,
    qualified: 0,
    won: 0,
    lost: 0,
  };

  for (const row of data) {
    if (row.status === "NEW") stats.new++;
    else if (row.status === "CONTACTED") stats.contacted++;
    else if (row.status === "QUALIFIED") stats.qualified++;
    else if (row.status === "WON") stats.won++;
    else if (row.status === "LOST") stats.lost++;
  }

  return stats;
}

export async function getRecentLeads(limit = 5): Promise<PortfolioLead[]> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("portfolio_leads")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    throw new Error(`Failed to load recent leads: ${error.message}`);
  }

  return (data ?? []) as PortfolioLead[];
}

export async function getIndustries(): Promise<string[]> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("portfolio_leads")
    .select("industry");

  if (error) {
    throw new Error(`Failed to load industries: ${error.message}`);
  }

  const unique = Array.from(new Set(data.map((d) => d.industry))).sort();
  return unique;
}

export interface LeadUpdateResult {
  success: boolean;
  message: string;
  lead?: PortfolioLead;
}

export async function updateLeadAction(
  id: string,
  payload: LeadUpdatePayload
): Promise<LeadUpdateResult> {
  const parsed = updateSchema.safeParse(payload);
  if (!parsed.success) {
    return {
      success: false,
      message: "Invalid update data. Please check your input.",
    };
  }

  const data = parsed.data as LeadUpdatePayload;

  // Auto-set last_contacted when moving to CONTACTED
  const setLastContacted =
    data.status === "CONTACTED" ? new Date().toISOString() : undefined;

  const update: Record<string, unknown> = {};
  if (data.status !== undefined) update.status = data.status;
  if (data.priority !== undefined) update.priority = data.priority;
  if (data.notes !== undefined) update.notes = data.notes;
  if (setLastContacted) update.last_contacted = setLastContacted;

  const supabase = await createServerSupabaseClient();
  const { data: updated, error } = await supabase
    .from("portfolio_leads")
    .update(update)
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    console.error("Update lead error:", error);
    return {
      success: false,
      message: "Failed to save changes. Please try again.",
    };
  }

  return {
    success: true,
    message: "Changes saved successfully.",
    lead: updated as PortfolioLead,
  };
}
