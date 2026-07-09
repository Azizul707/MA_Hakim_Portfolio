"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Save,
  Loader2,
  Check,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";
import type {
  Project,
  SolutionBreakdown,
  SolutionBreakdownFormData,
  SolutionStatus,
} from "@/types/project";
import { upsertSolution } from "@/lib/actions/projects";
import { cn } from "@/lib/utils";

interface SolutionFormProps {
  project: Project;
  solution: SolutionBreakdown | null;
}

export function SolutionForm({ project, solution }: SolutionFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [heroTitle, setHeroTitle] = useState(solution?.hero_title || "");
  const [heroSubtitle, setHeroSubtitle] = useState(
    solution?.hero_subtitle || ""
  );
  const [heroImage, setHeroImage] = useState(solution?.hero_image || "");
  const [overview, setOverview] = useState(solution?.overview || "");
  const [businessProblem, setBusinessProblem] = useState(
    solution?.business_problem || ""
  );
  const [solutionText, setSolutionText] = useState(solution?.solution || "");
  const [workflow, setWorkflow] = useState(
    solution?.workflow
      ? JSON.stringify(solution.workflow, null, 2)
      : JSON.stringify(
          [
            { title: "Step 1", description: "Description of step 1" },
            { title: "Step 2", description: "Description of step 2" },
          ],
          null,
          2
        )
  );
  const [businessBenefits, setBusinessBenefits] = useState(
    solution?.business_benefits || ""
  );
  const [roiExample, setRoiExample] = useState(solution?.roi_example || "");
  const [technologyStack, setTechnologyStack] = useState(
    solution?.technology_stack
      ? JSON.stringify(solution.technology_stack, null, 2)
      : '["Next.js", "TypeScript", "Supabase"]'
  );
  const [idealFor, setIdealFor] = useState(solution?.ideal_for || "");
  const [ctaTitle, setCtaTitle] = useState(solution?.cta_title || "");
  const [ctaDescription, setCtaDescription] = useState(
    solution?.cta_description || ""
  );
  const [status, setStatus] = useState<SolutionStatus>(
    (solution?.status as SolutionStatus) || "draft"
  );
  const [flash, setFlash] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleSave = () => {
    // Validate JSON fields
    try {
      JSON.parse(workflow || "[]");
    } catch {
      setFlash({ type: "error", message: "Workflow must be valid JSON." });
      return;
    }
    try {
      JSON.parse(technologyStack || "[]");
    } catch {
      setFlash({ type: "error", message: "Technology stack must be valid JSON." });
      return;
    }

    const formData: SolutionBreakdownFormData = {
      hero_title: heroTitle.trim(),
      hero_subtitle: heroSubtitle.trim(),
      hero_image: heroImage.trim(),
      overview: overview.trim(),
      business_problem: businessProblem.trim(),
      solution: solutionText.trim(),
      workflow: workflow.trim(),
      business_benefits: businessBenefits.trim(),
      roi_example: roiExample.trim(),
      technology_stack: technologyStack.trim(),
      ideal_for: idealFor.trim(),
      cta_title: ctaTitle.trim(),
      cta_description: ctaDescription.trim(),
      status,
    };

    startTransition(async () => {
      const result = await upsertSolution(project.id, formData);
      if (result.success) {
        setFlash({ type: "success", message: "Solution breakdown saved." });
        router.refresh();
      } else {
        setFlash({ type: "error", message: result.message });
      }
    });
  };

  const fieldClasses =
    "w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-accent/50 focus:ring-1 focus:ring-accent/30";
  const textareaClasses =
    "w-full resize-y rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-accent/50 focus:ring-1 focus:ring-accent/30";
  const labelClasses = "mb-1.5 block text-sm font-medium";
  const hintClasses = "mt-1 text-xs text-muted-foreground";

  const Section = ({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) => (
    <div className="rounded-xl border border-border bg-surface p-6">
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
        {title}
      </h2>
      <div className="space-y-4">{children}</div>
    </div>
  );

  return (
    <div className="space-y-8">
      <Link
        href="/admin/content/solutions"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to solution breakdowns
      </Link>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {/* Hero */}
          <Section title="Hero">
            <div>
              <label htmlFor="heroTitle" className={labelClasses}>
                Hero Title
              </label>
              <input
                id="heroTitle"
                value={heroTitle}
                onChange={(e) => setHeroTitle(e.target.value)}
                className={fieldClasses}
                placeholder="Automated Lead Intelligence for HVAC"
              />
            </div>
            <div>
              <label htmlFor="heroSubtitle" className={labelClasses}>
                Hero Subtitle
              </label>
              <input
                id="heroSubtitle"
                value={heroSubtitle}
                onChange={(e) => setHeroSubtitle(e.target.value)}
                className={fieldClasses}
                placeholder="AI-powered lead management for service businesses"
              />
            </div>
            <div>
              <label htmlFor="heroImage" className={labelClasses}>
                Hero Image
              </label>
              <input
                id="heroImage"
                value={heroImage}
                onChange={(e) => setHeroImage(e.target.value)}
                className={`${fieldClasses} font-mono text-xs`}
                placeholder="hvac-hero.webp"
              />
              <p className={hintClasses}>
                Image filename. The app will use /projects/{"{filename}"}
              </p>
            </div>
          </Section>

          {/* Content Sections */}
          <Section title="Overview">
            <div>
              <label htmlFor="overview" className={labelClasses}>
                Overview
              </label>
              <textarea
                id="overview"
                value={overview}
                onChange={(e) => setOverview(e.target.value)}
                rows={6}
                className={textareaClasses}
                placeholder="A comprehensive overview of the project..."
              />
            </div>
          </Section>

          <Section title="Business Problem">
            <div>
              <label htmlFor="businessProblem" className={labelClasses}>
                Business Problem
              </label>
              <textarea
                id="businessProblem"
                value={businessProblem}
                onChange={(e) => setBusinessProblem(e.target.value)}
                rows={6}
                className={textareaClasses}
                placeholder="Describe the business challenge..."
              />
            </div>
          </Section>

          <Section title="Solution">
            <div>
              <label htmlFor="solutionText" className={labelClasses}>
                Solution
              </label>
              <textarea
                id="solutionText"
                value={solutionText}
                onChange={(e) => setSolutionText(e.target.value)}
                rows={6}
                className={textareaClasses}
                placeholder="Describe your solution..."
              />
            </div>
          </Section>

          <Section title="Workflow">
            <div>
              <label htmlFor="workflow" className={labelClasses}>
                Workflow Steps
              </label>
              <textarea
                id="workflow"
                value={workflow}
                onChange={(e) => setWorkflow(e.target.value)}
                rows={10}
                className={`${textareaClasses} font-mono text-xs`}
                placeholder='[{&quot;title&quot;: &quot;Step 1&quot;, &quot;description&quot;: &quot;...&quot;}]'
              />
              <p className={hintClasses}>
                JSON array of objects with &ldquo;title&rdquo; and
                &ldquo;description&rdquo; fields. Rendered as a timeline.
              </p>
            </div>
          </Section>

          <Section title="Business Benefits">
            <div>
              <label htmlFor="businessBenefits" className={labelClasses}>
                Business Benefits
              </label>
              <textarea
                id="businessBenefits"
                value={businessBenefits}
                onChange={(e) => setBusinessBenefits(e.target.value)}
                rows={6}
                className={textareaClasses}
                placeholder="Describe the benefits..."
              />
            </div>
          </Section>

          <Section title="ROI Example">
            <div>
              <label htmlFor="roiExample" className={labelClasses}>
                ROI Example
              </label>
              <textarea
                id="roiExample"
                value={roiExample}
                onChange={(e) => setRoiExample(e.target.value)}
                rows={6}
                className={textareaClasses}
                placeholder="Describe the return on investment..."
              />
            </div>
          </Section>

          <Section title="Technology Stack">
            <div>
              <label htmlFor="technologyStack" className={labelClasses}>
                Technology Stack
              </label>
              <textarea
                id="technologyStack"
                value={technologyStack}
                onChange={(e) => setTechnologyStack(e.target.value)}
                rows={6}
                className={`${textareaClasses} font-mono text-xs`}
                placeholder="[&quot;Next.js&quot;, &quot;TypeScript&quot;, &quot;Supabase&quot;]"
              />
              <p className={hintClasses}>
                JSON array of technology names. Rendered as badges.
              </p>
            </div>
          </Section>

          <Section title="Target Audience">
            <div>
              <label htmlFor="idealFor" className={labelClasses}>
                Ideal For
              </label>
              <textarea
                id="idealFor"
                value={idealFor}
                onChange={(e) => setIdealFor(e.target.value)}
                rows={4}
                className={textareaClasses}
                placeholder="Describe who this solution is for..."
              />
            </div>
          </Section>

          <Section title="Call to Action">
            <div>
              <label htmlFor="ctaTitle" className={labelClasses}>
                CTA Title
              </label>
              <input
                id="ctaTitle"
                value={ctaTitle}
                onChange={(e) => setCtaTitle(e.target.value)}
                className={fieldClasses}
                placeholder="Ready to build something similar?"
              />
            </div>
            <div>
              <label htmlFor="ctaDescription" className={labelClasses}>
                CTA Description
              </label>
              <textarea
                id="ctaDescription"
                value={ctaDescription}
                onChange={(e) => setCtaDescription(e.target.value)}
                rows={3}
                className={textareaClasses}
                placeholder="Let's discuss how automation can help your business..."
              />
            </div>
          </Section>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="rounded-xl border border-border bg-surface p-6">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Publishing
            </h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="solutionStatus" className={labelClasses}>
                  Status
                </label>
                <select
                  id="solutionStatus"
                  value={status}
                  onChange={(e) =>
                    setStatus(e.target.value as SolutionStatus)
                  }
                  className={fieldClasses}
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-surface p-6">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Project
            </h2>
            <div className="space-y-2 text-sm">
              <p>
                <span className="text-muted-foreground">Title:</span>{" "}
                {project.title}
              </p>
              <p>
                <span className="text-muted-foreground">Slug:</span> /{project.slug}
              </p>
              <Link
                href={`/admin/content/projects/${project.id}`}
                className="inline-flex items-center gap-1.5 text-accent hover:underline"
              >
                Edit project details
              </Link>
            </div>
          </div>

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
                  <Save className="h-4 w-4" />
                  {solution ? "Update Solution" : "Create Solution"}
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
