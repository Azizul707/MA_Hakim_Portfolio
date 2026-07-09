"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import type {
  Project,
  ProjectFormData,
  ProjectListResult,
  ProjectActionResponse,
  SolutionBreakdown,
  SolutionBreakdownFormData,
  SolutionBreakdownActionResponse,
  WorkflowStep,
} from "@/types/project";

// ─── Validation Schemas ──────────────────────────────────────────────────

const projectSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  slug: z
    .string()
    .min(1, "Slug is required")
    .max(200)
    .regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens"),
  category: z.string().max(100).default(""),
  short_description: z.string().min(1, "Short description is required").max(500),
  cover_image: z.string().max(500).default(""),
  hero_image: z.string().max(500).default(""),
  gallery_images: z.string().max(10000).default("[]"),
  github_url: z.string().max(500).default(""),
  live_demo_url: z.string().max(500).default(""),
  featured: z.boolean().default(false),
  display_order: z.number().int().default(0),
  status: z.enum(["draft", "published", "archived"]).default("draft"),
});

const solutionSchema = z.object({
  hero_title: z.string().max(500).default(""),
  hero_subtitle: z.string().max(1000).default(""),
  hero_image: z.string().max(500).default(""),
  overview: z.string().max(10000).default(""),
  business_problem: z.string().max(10000).default(""),
  solution: z.string().max(10000).default(""),
  workflow: z.string().max(50000).default("[]"),
  business_benefits: z.string().max(10000).default(""),
  roi_example: z.string().max(10000).default(""),
  technology_stack: z.string().max(5000).default("[]"),
  ideal_for: z.string().max(5000).default(""),
  cta_title: z.string().max(500).default(""),
  cta_description: z.string().max(1000).default(""),
  status: z.enum(["draft", "published", "archived"]).default("draft"),
});

// ─── Slug Generation ─────────────────────────────────────────────────────

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-")
    .trim()
    .replace(/^-|-$/g, "");
}

// ─── Flagship Projects (handcrafted — CMS cannot modify) ────────────────

const FLAGSHIP_SLUGS = new Set([
  "hvac-lead-intelligence",
  "whatsapp-customer-hub",
  "document-intelligence-system",
]);

function isFlagship(slug: string): boolean {
  return FLAGSHIP_SLUGS.has(slug);
}

function isFlagshipById(projects: Project[], id: string): boolean {
  const project = projects.find((p) => p.id === id);
  return project ? isFlagship(project.slug) : false;
}

// ─── Projects CRUD ───────────────────────────────────────────────────────

export async function getProjects(): Promise<ProjectListResult> {
  const supabase = await createServerSupabaseClient();
  const { data, error, count } = await supabase
    .from("projects")
    .select("*", { count: "exact" })
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    if (error.message?.includes("Could not find the table")) {
      return { projects: [], total: 0 };
    }
    throw new Error(`Failed to load projects: ${error.message}`);
  }

  return {
    projects: (data ?? []) as Project[],
    total: count ?? 0,
  };
}

export async function getPublishedProjects(): Promise<ProjectListResult> {
  const supabase = await createServerSupabaseClient();
  const { data, error, count } = await supabase
    .from("projects")
    .select("*", { count: "exact" })
    .eq("status", "published")
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    if (error.message?.includes("Could not find the table")) {
      return { projects: [], total: 0 };
    }
    throw new Error(`Failed to load published projects: ${error.message}`);
  }

  return {
    projects: (data ?? []) as Project[],
    total: count ?? 0,
  };
}

export async function getProjectById(id: string): Promise<Project | null> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    if (error.message?.includes("Could not find the table")) {
      return null;
    }
    throw new Error(`Failed to load project: ${error.message}`);
  }

  return (data as Project) ?? null;
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    if (error.message?.includes("Could not find the table")) {
      return null;
    }
    throw new Error(`Failed to load project: ${error.message}`);
  }

  return (data as Project) ?? null;
}

export async function getPublishedProjectBySlug(
  slug: string
): Promise<Project | null> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error) {
    if (error.message?.includes("Could not find the table")) {
      return null;
    }
    throw new Error(`Failed to load project: ${error.message}`);
  }

  return (data as Project) ?? null;
}

export async function createProject(
  data: ProjectFormData
): Promise<ProjectActionResponse> {
  const parsed = projectSchema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues.map((e: any) => e.message).join(", "),
    };
  }

  if (isFlagship(parsed.data.slug)) {
    return {
      success: false,
      message: "Cannot create projects with reserved slugs.",
    };
  }

  const supabase = await createServerSupabaseClient();

  // Parse gallery_images JSON
  let gallery: string[] = [];
  try {
    gallery = JSON.parse(parsed.data.gallery_images || "[]");
  } catch {
    return { success: false, message: "Gallery images must be valid JSON." };
  }

  const insertData: Record<string, unknown> = {
    ...parsed.data,
    gallery_images: gallery,
    published_at:
      parsed.data.status === "published" ? new Date().toISOString() : null,
  };

  const { data: project, error } = await supabase
    .from("projects")
    .insert(insertData)
    .select("*")
    .single();

  if (error) {
    if (error.code === "23505") {
      return {
        success: false,
        message: "A project with this slug already exists.",
      };
    }
    return {
      success: false,
      message: `Failed to create project: ${error.message}`,
    };
  }

  revalidatePath("/admin/content/projects");
  revalidatePath("/projects");

  return {
    success: true,
    message: "Project created successfully.",
    project: project as Project,
  };
}

export async function updateProject(
  id: string,
  data: Partial<ProjectFormData>
): Promise<ProjectActionResponse> {
  const existing = await getProjectById(id);
  if (!existing) {
    return { success: false, message: "Project not found." };
  }

  if (isFlagship(existing.slug)) {
    return {
      success: false,
      message: "Flagship projects cannot be modified through the CMS.",
    };
  }

  const parsed = projectSchema.partial().safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues.map((e: any) => e.message).join(", "),
    };
  }

  if (parsed.data.slug && isFlagship(parsed.data.slug)) {
    return {
      success: false,
      message: "Cannot change a project slug to a reserved slug.",
    };
  }

  const updateData: Record<string, unknown> = { ...parsed.data };

  // Parse gallery_images JSON if provided
  if (typeof updateData.gallery_images === "string") {
    try {
      updateData.gallery_images = JSON.parse(updateData.gallery_images as string);
    } catch {
      return { success: false, message: "Gallery images must be valid JSON." };
    }
  }

  // Set published_at when publishing, clear when unpublishing
  if (updateData.status === "published") {
    // Only set published_at if it hasn't been set before
    const existing = await getProjectById(id);
    if (existing && !existing.published_at) {
      updateData.published_at = new Date().toISOString();
    }
  } else if (updateData.status !== undefined && updateData.status !== "published") {
    // Don't clear published_at — keep it as record of when it was first published
  }

  const supabase = await createServerSupabaseClient();
  const { data: project, error } = await supabase
    .from("projects")
    .update(updateData)
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    if (error.code === "23505") {
      return {
        success: false,
        message: "A project with this slug already exists.",
      };
    }
    return {
      success: false,
      message: `Failed to update project: ${error.message}`,
    };
  }

  revalidatePath("/admin/content/projects");
  revalidatePath("/projects");
  revalidatePath(`/projects/${project.slug}`);

  return {
    success: true,
    message: "Project updated successfully.",
    project: project as Project,
  };
}

export async function archiveProject(id: string): Promise<ProjectActionResponse> {
  const existing = await getProjectById(id);
  if (!existing) {
    return { success: false, message: "Project not found." };
  }

  if (isFlagship(existing.slug)) {
    return {
      success: false,
      message: "Flagship projects cannot be archived through the CMS.",
    };
  }

  const supabase = await createServerSupabaseClient();
  const { error } = await supabase
    .from("projects")
    .update({ status: "archived" })
    .eq("id", id);

  if (error) {
    return {
      success: false,
      message: `Failed to archive project: ${error.message}`,
    };
  }

  revalidatePath("/admin/content/projects");
  revalidatePath("/projects");

  return {
    success: true,
    message: "Project archived.",
  };
}

export async function duplicateProject(
  id: string
): Promise<ProjectActionResponse> {
  const original = await getProjectById(id);
  if (!original) {
    return { success: false, message: "Project not found." };
  }

  if (isFlagship(original.slug)) {
    return {
      success: false,
      message: "Flagship projects cannot be duplicated through the CMS.",
    };
  }

  const supabase = await createServerSupabaseClient();

  // Generate a unique slug
  const baseSlug = slugify(`${original.title}-copy`);
  let newSlug = baseSlug;
  let counter = 1;
  while (true) {
    const existing = await supabase
      .from("projects")
      .select("id")
      .eq("slug", newSlug)
      .maybeSingle();
    if (!existing.data) break;
    counter++;
    newSlug = `${baseSlug}-${counter}`;
  }

  const { data: project, error } = await supabase
    .from("projects")
    .insert({
      title: `${original.title} (Copy)`,
      slug: newSlug,
      category: original.category,
      short_description: original.short_description,
      cover_image: original.cover_image,
      hero_image: original.hero_image,
      gallery_images: original.gallery_images,
      github_url: original.github_url,
      live_demo_url: original.live_demo_url,
      featured: false,
      display_order: original.display_order + 1,
      status: "draft",
    })
    .select("*")
    .single();

  if (error) {
    return {
      success: false,
      message: `Failed to duplicate project: ${error.message}`,
    };
  }

  // Also duplicate the solution breakdown if it exists
  const solution = await getSolutionByProjectId(original.id);
  if (solution) {
    await supabase.from("solution_breakdowns").insert({
      project_id: project.id,
      hero_title: solution.hero_title,
      hero_subtitle: solution.hero_subtitle,
      hero_image: solution.hero_image,
      overview: solution.overview,
      business_problem: solution.business_problem,
      solution: solution.solution,
      workflow: solution.workflow,
      business_benefits: solution.business_benefits,
      roi_example: solution.roi_example,
      technology_stack: solution.technology_stack,
      ideal_for: solution.ideal_for,
      cta_title: solution.cta_title,
      cta_description: solution.cta_description,
      status: "draft",
    });
  }

  revalidatePath("/admin/content/projects");

  return {
    success: true,
    message: "Project duplicated.",
    project: project as Project,
  };
}

export async function getProjectsForPublic(): Promise<
  (Project & {
    solution: Pick<SolutionBreakdown, "technology_stack" | "workflow"> | null;
  })[]
> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("projects")
    .select(
      `
      *,
      solution:solution_breakdowns(
        technology_stack,
        workflow
      )
    `
    )
    .eq("status", "published")
    .order("display_order", { ascending: true });

  if (error) {
    if (error.message?.includes("Could not find the table")) {
      return [];
    }
    throw new Error(`Failed to load projects: ${error.message}`);
  }

  return (data ?? []) as any;
}

// ─── Solution Breakdowns CRUD ────────────────────────────────────────────

export async function getSolutionByProjectId(
  projectId: string
): Promise<SolutionBreakdown | null> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("solution_breakdowns")
    .select("*")
    .eq("project_id", projectId)
    .maybeSingle();

  if (error) {
    if (error.message?.includes("Could not find the table")) {
      return null;
    }
    throw new Error(`Failed to load solution breakdown: ${error.message}`);
  }

  return (data as SolutionBreakdown) ?? null;
}

export async function getPublishedSolutionByProjectId(
  projectId: string
): Promise<SolutionBreakdown | null> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("solution_breakdowns")
    .select("*")
    .eq("project_id", projectId)
    .eq("status", "published")
    .maybeSingle();

  if (error) {
    if (error.message?.includes("Could not find the table")) {
      return null;
    }
    throw new Error(`Failed to load solution breakdown: ${error.message}`);
  }

  return (data as SolutionBreakdown) ?? null;
}

export async function upsertSolution(
  projectId: string,
  data: SolutionBreakdownFormData
): Promise<SolutionBreakdownActionResponse> {
  const parsed = solutionSchema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues.map((e: any) => e.message).join(", "),
    };
  }

  const supabase = await createServerSupabaseClient();

  // Parse JSON fields
  let workflow: WorkflowStep[] = [];
  let techStack: string[] = [];
  try {
    workflow = JSON.parse(parsed.data.workflow || "[]");
  } catch {
    return { success: false, message: "Workflow must be valid JSON." };
  }
  try {
    techStack = JSON.parse(parsed.data.technology_stack || "[]");
  } catch {
    return { success: false, message: "Technology stack must be valid JSON." };
  }

  // Check if a solution already exists for this project
  const existing = await getSolutionByProjectId(projectId);

  const upsertData: Record<string, unknown> = {
    project_id: projectId,
    hero_title: parsed.data.hero_title,
    hero_subtitle: parsed.data.hero_subtitle,
    hero_image: parsed.data.hero_image || null,
    overview: parsed.data.overview,
    business_problem: parsed.data.business_problem,
    solution: parsed.data.solution,
    workflow: workflow,
    business_benefits: parsed.data.business_benefits,
    roi_example: parsed.data.roi_example,
    technology_stack: techStack,
    ideal_for: parsed.data.ideal_for,
    cta_title: parsed.data.cta_title,
    cta_description: parsed.data.cta_description,
    status: parsed.data.status,
    published_at:
      parsed.data.status === "published" && !existing?.published_at
        ? new Date().toISOString()
        : existing?.published_at ?? null,
  };

  let result;
  if (existing) {
    result = await supabase
      .from("solution_breakdowns")
      .update(upsertData)
      .eq("project_id", projectId)
      .select("*")
      .single();
  } else {
    result = await supabase
      .from("solution_breakdowns")
      .insert(upsertData)
      .select("*")
      .single();
  }

  const { data: solution, error } = result;

  if (error) {
    return {
      success: false,
      message: `Failed to save solution breakdown: ${error.message}`,
    };
  }

  revalidatePath(`/admin/content/solutions/${projectId}`);
  revalidatePath(`/projects/${projectId}`);

  return {
    success: true,
    message: existing ? "Solution breakdown updated." : "Solution breakdown created.",
    solution: solution as SolutionBreakdown,
  };
}
