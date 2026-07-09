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

export type LeadStatus = "NEW" | "CONTACTED" | "QUALIFIED" | "PROPOSAL" | "WON" | "LOST";

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

// For admin dashboard
export interface LeadListParams {
  page: number;
  pageSize: number;
  search?: string;
  status?: LeadStatus | "ALL";
  priority?: LeadPriority | "ALL";
  industry?: string | "ALL";
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface LeadListResult {
  leads: PortfolioLead[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface LeadUpdatePayload {
  status?: LeadStatus;
  priority?: LeadPriority;
  notes?: string;
}