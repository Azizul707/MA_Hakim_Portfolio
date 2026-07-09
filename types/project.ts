/** Project status values */
export type ProjectStatus = "draft" | "published" | "archived";

/** Solution breakdown status values */
export type SolutionStatus = "draft" | "published" | "archived";

// ─── Projects ────────────────────────────────────────────────────────────

export interface Project {
  id: string;
  created_at: string;
  updated_at: string;
  title: string;
  slug: string;
  category: string;
  short_description: string;
  cover_image: string | null;
  github_url: string | null;
  live_demo_url: string | null;
  featured: boolean;
  display_order: number;
  status: ProjectStatus;
  published_at: string | null;
}

export interface ProjectFormData {
  title: string;
  slug: string;
  category: string;
  short_description: string;
  cover_image: string;
  github_url: string;
  live_demo_url: string;
  featured: boolean;
  display_order: number;
  status: ProjectStatus;
}

export interface ProjectListResult {
  projects: Project[];
  total: number;
}

export interface ProjectActionResponse {
  success: boolean;
  message: string;
  project?: Project;
}

export const PROJECT_STATUS_VALUES = ["draft", "published", "archived"] as const;
export const PROJECT_STATUS_LABELS: Record<ProjectStatus, string> = {
  draft: "Draft",
  published: "Published",
  archived: "Archived",
};

// ─── Solution Breakdowns ─────────────────────────────────────────────────

export interface SolutionBreakdown {
  id: string;
  created_at: string;
  updated_at: string;
  project_id: string;
  hero_title: string;
  hero_subtitle: string;
  hero_image: string | null;
  overview: string;
  business_problem: string;
  solution: string;
  workflow: string[] | WorkflowStep[];
  business_benefits: string;
  roi_example: string;
  technology_stack: string[];
  ideal_for: string;
  cta_title: string;
  cta_description: string;
  status: SolutionStatus;
  published_at: string | null;
}

export interface SolutionBreakdownFormData {
  hero_title: string;
  hero_subtitle: string;
  hero_image: string;
  overview: string;
  business_problem: string;
  solution: string;
  workflow: string;
  business_benefits: string;
  roi_example: string;
  technology_stack: string;
  ideal_for: string;
  cta_title: string;
  cta_description: string;
  status: SolutionStatus;
}

export interface SolutionBreakdownActionResponse {
  success: boolean;
  message: string;
  solution?: SolutionBreakdown;
}

export interface WorkflowStep {
  title: string;
  description: string;
}

// ─── Public types (for the front-end) ─────────────────────────────────────

export interface PublicProject extends Project {
  solution?: PublicSolutionBreakdown | null;
}

export interface PublicSolutionBreakdown {
  hero_title: string;
  hero_subtitle: string;
  hero_image: string | null;
  overview: string;
  business_problem: string;
  solution: string;
  workflow: WorkflowStep[];
  business_benefits: string;
  roi_example: string;
  technology_stack: string[];
  ideal_for: string;
  cta_title: string;
  cta_description: string;
}
