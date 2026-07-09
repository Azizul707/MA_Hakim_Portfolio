"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Save, Loader2, Check, AlertCircle, ArrowLeft, Plus, ShieldAlert } from "lucide-react";
import type { Project, ProjectFormData, ProjectStatus } from "@/types/project";
import { PROJECT_STATUS_VALUES, PROJECT_STATUS_LABELS } from "@/types/project";
import { updateProject, createProject } from "@/lib/actions/projects";
import { cn } from "@/lib/utils";

const FLAGSHIP_SLUGS = new Set([
  "hvac-lead-intelligence",
  "whatsapp-customer-hub",
  "document-intelligence-system",
]);

interface ProjectFormProps {
  project?: Project | null;
  isNew?: boolean;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-")
    .trim()
    .replace(/^-|-$/g, "");
}

export function ProjectForm({ project, isNew }: ProjectFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [title, setTitle] = useState(project?.title || "");
  const [slug, setSlug] = useState(project?.slug || "");
  const [slugEdited, setSlugEdited] = useState(false);
  const [category, setCategory] = useState(project?.category || "");
  const [shortDescription, setShortDescription] = useState(
    project?.short_description || ""
  );
  const [coverImage, setCoverImage] = useState(project?.cover_image || "");
  const [heroImage, setHeroImage] = useState(project?.hero_image || "");
  const [galleryImagesStr, setGalleryImagesStr] = useState(
    project?.gallery_images?.length ? JSON.stringify(project.gallery_images) : "[]"
  );
  const [githubUrl, setGithubUrl] = useState(project?.github_url || "");
  const [liveDemoUrl, setLiveDemoUrl] = useState(project?.live_demo_url || "");
  const [featured, setFeatured] = useState(project?.featured || false);
  const [displayOrder, setDisplayOrder] = useState(project?.display_order || 0);
  const [status, setStatus] = useState<ProjectStatus>(
    project?.status || "draft"
  );
  const isFlagship = !isNew && project && FLAGSHIP_SLUGS.has(project.slug);

  const [flash, setFlash] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!slugEdited) {
      setSlug(slugify(value));
    }
  };

  const handleSave = () => {
    if (!title.trim()) {
      setFlash({ type: "error", message: "Title is required." });
      return;
    }
    if (!slug.trim()) {
      setFlash({ type: "error", message: "Slug is required." });
      return;
    }
    if (!shortDescription.trim()) {
      setFlash({
        type: "error",
        message: "Short description is required.",
      });
      return;
    }

    if (isFlagship) {
      setFlash({ type: "error", message: "Flagship projects cannot be modified through the CMS." });
      return;
    }

    // Validate gallery_images JSON
    try {
      JSON.parse(galleryImagesStr);
    } catch {
      setFlash({ type: "error", message: "Gallery images must be valid JSON." });
      return;
    }

    const formData = {
      title: title.trim(),
      slug: slug.trim(),
      category: category.trim(),
      short_description: shortDescription.trim(),
      cover_image: coverImage.trim(),
      hero_image: heroImage.trim(),
      gallery_images: galleryImagesStr,
      github_url: githubUrl.trim(),
      live_demo_url: liveDemoUrl.trim(),
      featured,
      display_order: displayOrder,
      status,
    };

    startTransition(async () => {
      const result = isNew
        ? await createProject(formData as ProjectFormData)
        : await updateProject(project!.id, formData);

      if (result.success) {
        setFlash({ type: "success", message: isNew ? "Project created." : "Project saved." });
        router.refresh();
        if (isNew && result.project) {
          router.push(`/admin/content/projects/${result.project.id}`);
        }
      } else {
        setFlash({ type: "error", message: result.message });
      }
    });
  };

  return (
    <div className="space-y-8">
      {/* Back link */}
      <Link
        href="/admin/content/projects"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to projects
      </Link>

      {/* Flagship warning */}
      {isFlagship && (
        <div className="flex items-start gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4">
          <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
          <div>
            <p className="text-sm font-medium text-amber-500">
              Protected Flagship Project
            </p>
            <p className="mt-1 text-xs leading-relaxed text-amber-500/80">
              This is a handcrafted flagship project. Its content cannot be modified
              through the CMS. Only future (non-flagship) projects added via the CMS
              appear in the &ldquo;More Projects&rdquo; section on the public projects page.
            </p>
          </div>
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main form */}
        <div className="space-y-6 lg:col-span-2">
          {/* Details */}
          <div className="rounded-xl border border-border bg-surface p-6">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Details
            </h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="mb-1.5 block text-sm font-medium">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  id="title"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-accent/50 focus:ring-1 focus:ring-accent/30"
                  placeholder="HVAC Lead Intelligence"
                />
              </div>

              <div>
                <label htmlFor="slug" className="mb-1.5 block text-sm font-medium">
                  Slug <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">/</span>
                  <input
                    id="slug"
                    value={slug}
                    onChange={(e) => {
                      setSlug(e.target.value);
                      setSlugEdited(true);
                    }}
                    className="flex-1 rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-accent/50 focus:ring-1 focus:ring-accent/30 font-mono"
                    placeholder="hvac-lead-intelligence"
                  />
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  Auto-generated from title. Edit manually if needed.
                </p>
              </div>

              <div>
                <label htmlFor="shortDescription" className="mb-1.5 block text-sm font-medium">
                  Short Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="shortDescription"
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  rows={3}
                  className="w-full resize-y rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-accent/50 focus:ring-1 focus:ring-accent/30"
                  placeholder="An AI-powered lead management system..."
                />
              </div>

              <div>
                <label htmlFor="category" className="mb-1.5 block text-sm font-medium">
                  Category
                </label>
                <input
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-accent/50 focus:ring-1 focus:ring-accent/30"
                  placeholder="HVAC, SaaS, Enterprise..."
                />
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="rounded-xl border border-border bg-surface p-6">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Links
            </h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="coverImage" className="mb-1.5 block text-sm font-medium">
                  Cover Image
                </label>
                <input
                  id="coverImage"
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-accent/50 focus:ring-1 focus:ring-accent/30 font-mono text-xs"
                  placeholder="hvac-dashboard.webp"
                />
                <p className="mt-1 text-xs text-muted-foreground">
                  Enter the filename. The app will use /projects/{"{filename}"}
                </p>
              </div>

              <div>
                <label htmlFor="heroImage" className="mb-1.5 block text-sm font-medium">
                  Hero Image
                </label>
                <input
                  id="heroImage"
                  value={heroImage}
                  onChange={(e) => setHeroImage(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-accent/50 focus:ring-1 focus:ring-accent/30 font-mono text-xs"
                  placeholder="hvac-hero.webp"
                />
                <p className="mt-1 text-xs text-muted-foreground">
                  Large hero image for the project detail page. Uses /projects/{"{filename}"}
                </p>
              </div>

              <div>
                <label htmlFor="galleryImages" className="mb-1.5 block text-sm font-medium">
                  Gallery Images (JSON array)
                </label>
                <textarea
                  id="galleryImages"
                  value={galleryImagesStr}
                  onChange={(e) => setGalleryImagesStr(e.target.value)}
                  rows={3}
                  className="w-full resize-y rounded-lg border border-border bg-background px-3 py-2.5 font-mono text-xs outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-accent/50 focus:ring-1 focus:ring-accent/30"
                  placeholder='["dashboard-screenshot.webp", "workflow-diagram.webp", "report-view.webp"]'
                />
                <p className="mt-1 text-xs text-muted-foreground">
                  Array of filenames. Each resolves to {"/projects/{filename}"}. Enter valid JSON.
                </p>
                <details className="mt-2">
                  <summary className="cursor-pointer text-xs font-medium text-muted-foreground hover:text-foreground">
                    Show copy-paste examples
                  </summary>
                  <div className="mt-2 space-y-2 rounded-lg border border-border bg-background p-3">
                    <div>
                      <p className="mb-1 text-xs font-medium text-foreground">Single image:</p>
                      <code className="block rounded bg-surface px-2 py-1 text-xs text-muted-foreground select-all">
                        ["dashboard-overview.webp"]
                      </code>
                    </div>
                    <div>
                      <p className="mb-1 text-xs font-medium text-foreground">Multiple images:</p>
                      <code className="block rounded bg-surface px-2 py-1 text-xs text-muted-foreground select-all">
                        ["dashboard-overview.png","workflow-diagram.png","analytics-report.png","mobile-view.png"]
                      </code>
                    </div>
                    <div>
                      <p className="mb-1 text-xs font-medium text-foreground">Mixed formats:</p>
                      <code className="block rounded bg-surface px-2 py-1 text-xs text-muted-foreground select-all">
                        ["hero-screenshot.webp","pipeline-flow.png","email-template.jpg"]
                      </code>
                    </div>
                    <div>
                      <p className="mb-1 text-xs font-medium text-foreground">Empty (no gallery):</p>
                      <code className="block rounded bg-surface px-2 py-1 text-xs text-muted-foreground select-all">
                        []
                      </code>
                    </div>
                  </div>
                </details>
              </div>

              <div>
                <label htmlFor="githubUrl" className="mb-1.5 block text-sm font-medium">
                  GitHub URL
                </label>
                <input
                  id="githubUrl"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-accent/50 focus:ring-1 focus:ring-accent/30"
                  placeholder="https://github.com/..."
                />
              </div>

              <div>
                <label htmlFor="liveDemoUrl" className="mb-1.5 block text-sm font-medium">
                  Live Demo URL
                </label>
                <input
                  id="liveDemoUrl"
                  value={liveDemoUrl}
                  onChange={(e) => setLiveDemoUrl(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-accent/50 focus:ring-1 focus:ring-accent/30"
                  placeholder="https://demo.example.com"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Publishing */}
          <div className="rounded-xl border border-border bg-surface p-6">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Publishing
            </h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="status" className="mb-1.5 block text-sm font-medium">
                  Status
                </label>
                <select
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value as ProjectStatus)}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-accent/50 focus:ring-1 focus:ring-accent/30"
                >
                  {PROJECT_STATUS_VALUES.map((s) => (
                    <option key={s} value={s}>
                      {PROJECT_STATUS_LABELS[s]}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="displayOrder" className="mb-1.5 block text-sm font-medium">
                  Display Order
                </label>
                <input
                  id="displayOrder"
                  type="number"
                  value={displayOrder}
                  onChange={(e) => setDisplayOrder(parseInt(e.target.value) || 0)}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-accent/50 focus:ring-1 focus:ring-accent/30 font-mono"
                  min={0}
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  id="featured"
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="h-4 w-4 rounded border-border bg-surface text-accent focus:ring-accent/30"
                />
                <label htmlFor="featured" className="text-sm font-medium">
                  Featured project
                </label>
              </div>
            </div>
          </div>

          {/* Solution breakdown link (edit mode only) */}
          {!isNew && project && (
            <div className="rounded-xl border border-border bg-surface p-6">
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Solution Breakdown
              </h2>
              <p className="mb-4 text-xs text-muted-foreground">
                Create or edit the detailed solution breakdown page.
              </p>
              <Link
                href={`/admin/content/solutions/${project.id}`}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent/50 hover:bg-surface/80"
              >
                Edit Solution Breakdown
              </Link>
            </div>
          )}

          {/* Save */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleSave}
              disabled={isPending}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90 disabled:opacity-50"
            >
              {isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  {isNew ? <Plus className="h-4 w-4" /> : <Save className="h-4 w-4" />}
                  {isNew ? "Create Project" : "Save Changes"}
                </>
              )}
            </button>
          </div>

          {flash && (
            <div
              className={cn(
                "flex items-center gap-2 rounded-lg border px-4 py-3 text-sm",
                flash.type === "success"
                  ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-500"
                  : "border-red-500/30 bg-red-500/10 text-red-500"
              )}
              role="status"
            >
              {flash.type === "success" ? (
                <Check className="h-4 w-4" />
              ) : (
                <AlertCircle className="h-4 w-4" />
              )}
              {flash.message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
