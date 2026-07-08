export interface PortfolioLead {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  business_name: string;
  email: string;
  website: string | null;
  industry: string;
  current_challenge: string;
  project_goal: string;
  budget: string | null;
  message: string;
  status: LeadStatus;
  priority: LeadPriority;
  source: string;
  source_page: string;
  notes: string | null;
  last_contacted: string | null;
}

export type LeadStatus = "NEW" | "CONTACTED" | "QUALIFIED" | "CONVERTED" | "CLOSED";

export type LeadPriority = "LOW" | "NORMAL" | "HIGH" | "URGENT";

export interface LeadFormData {
  name: string;
  email: string;
  business_name: string;
  industry: string;
  website?: string;
  current_challenge: string;
  project_goal: string;
  budget?: string;
  message: string;
  source_page?: string;
}

export interface LeadSubmitResult {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
}
