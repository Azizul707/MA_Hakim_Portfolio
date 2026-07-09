import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Container, Section } from "@/components/ui/container";
import { Badge } from "@/components/ui/typography";
import { Tag } from "@/components/ui/tag";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  getPublishedProjectBySlug,
  getPublishedSolutionByProjectId,
  getPublishedProjects,
} from "@/lib/actions/projects";
import type { WorkflowStep } from "@/types/project";

export async function generateStaticParams() {
  try {
    const { projects } = await getPublishedProjects();
    return projects.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getPublishedProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} | MA Hakim`,
    description: project.short_description,
    openGraph: {
      title: `${project.title} | MA Hakim`,
      description: project.short_description,
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getPublishedProjectBySlug(slug);
  if (!project) notFound();

  const solution = await getPublishedSolutionByProjectId(project.id);

  const workflowSteps: WorkflowStep[] = solution?.workflow
    ? Array.isArray(solution.workflow)
      ? solution.workflow
      : typeof solution.workflow === "string"
        ? JSON.parse(solution.workflow)
        : []
    : [];

  const techStack: string[] = solution?.technology_stack
    ? Array.isArray(solution.technology_stack)
      ? solution.technology_stack
      : typeof solution.technology_stack === "string"
        ? JSON.parse(solution.technology_stack)
        : []
    : [];

  if (!solution) {
    // Fallback: show basic project info even without a solution breakdown
    return (
      <>
        <Navbar />
        <main>
          <Section className="pt-28">
            <Container>
              <Link
                href="/projects"
                className="mb-8 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Projects
              </Link>

              <div className="mx-auto max-w-3xl text-center">
                {project.category && <Badge className="mb-4">{project.category}</Badge>}
                <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                  {project.title}
                </h1>
                <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                  {project.short_description}
                </p>
              </div>

              <div className="mx-auto mt-16 max-w-3xl text-center">
                <Button asChild>
                  <Link href="/contact">
                    Interested in This Solution?
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </Container>
          </Section>
        </main>
        <Footer />
      </>
    );
  }

  const coverSrc = project.cover_image
    ? `/projects/${project.cover_image.replace(/^\//, "")}`
    : null;

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <Section className="pt-28">
          <Container>
            <Link
              href="/projects"
              className="mb-8 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Projects
            </Link>

            {coverSrc && (
              <div className="mb-12 overflow-hidden rounded-xl border border-border">
                <img
                  src={coverSrc}
                  alt={`${project.title} cover`}
                  className="w-full object-cover"
                />
              </div>
            )}

            <div className="mx-auto max-w-3xl text-center">
              {project.category && <Badge className="mb-4">{project.category}</Badge>}
              <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                {solution.hero_title || project.title}
              </h1>
              {solution.hero_subtitle && (
                <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                  {solution.hero_subtitle}
                </p>
              )}
            </div>

            <div className="mx-auto mt-16 max-w-3xl space-y-12">
              {/* Overview */}
              {solution.overview && (
                <SectionBlock title="Overview">
                  {solution.overview}
                </SectionBlock>
              )}

              {/* Business Problem */}
              {solution.business_problem && (
                <SectionBlock title="Business Challenge">
                  {solution.business_problem}
                </SectionBlock>
              )}

              {/* Solution */}
              {solution.solution && (
                <SectionBlock title="Solution">
                  {solution.solution}
                </SectionBlock>
              )}

              {/* Workflow Timeline */}
              {workflowSteps.length > 0 && (
                <div>
                  <h2 className="font-display text-xl font-semibold tracking-tight">
                    How It Works
                  </h2>
                  <div className="mt-6 space-y-6">
                    {workflowSteps.map((step, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/10 text-xs font-semibold text-accent">
                            {i + 1}
                          </div>
                          {i < workflowSteps.length - 1 && (
                            <div className="mt-1 h-full w-px bg-border" />
                          )}
                        </div>
                        <div className="flex-1 pb-6">
                          <h3 className="font-display text-base font-semibold">
                            {step.title}
                          </h3>
                          {step.description && (
                            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                              {step.description}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Business Benefits */}
              {solution.business_benefits && (
                <SectionBlock title="Business Benefits">
                  {solution.business_benefits}
                </SectionBlock>
              )}

              {/* ROI Example */}
              {solution.roi_example && (
                <SectionBlock title="Return on Investment">
                  {solution.roi_example}
                </SectionBlock>
              )}

              {/* Technology Stack */}
              {techStack.length > 0 && (
                <div>
                  <h2 className="font-display text-xl font-semibold tracking-tight">
                    Technology Stack
                  </h2>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {techStack.map((tech) => (
                      <Tag key={tech}>{tech}</Tag>
                    ))}
                  </div>
                </div>
              )}

              {/* Ideal For */}
              {solution.ideal_for && (
                <SectionBlock title="Who This Is For">
                  {solution.ideal_for}
                </SectionBlock>
              )}
            </div>

            {/* CTA */}
            {(solution.cta_title || solution.cta_description) && (
              <div className="mx-auto mt-16 max-w-3xl rounded-xl border border-border bg-surface p-8 text-center sm:p-12">
                {solution.cta_title && (
                  <h2 className="font-display text-2xl font-semibold tracking-tight">
                    {solution.cta_title}
                  </h2>
                )}
                {solution.cta_description && (
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {solution.cta_description}
                  </p>
                )}
                <div className="mt-8">
                  <Button asChild>
                    <Link href="/contact">
                      Tell Me About Your Business
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            )}

            {!solution.cta_title && (
              <div className="mx-auto mt-16 max-w-3xl text-center">
                <Button asChild>
                  <Link href="/contact">
                    Tell Me About Your Business
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            )}
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}

function SectionBlock({
  title,
  children,
}: {
  title: string;
  children: string;
}) {
  return (
    <div>
      <h2 className="font-display text-xl font-semibold tracking-tight">
        {title}
      </h2>
      <div className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">
        {children}
      </div>
    </div>
  );
}
