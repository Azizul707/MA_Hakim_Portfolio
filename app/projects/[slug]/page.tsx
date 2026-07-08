import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Container, Section } from "@/components/ui/container";
import { Badge } from "@/components/ui/typography";
import { Tag } from "@/components/ui/tag";
import { Button } from "@/components/ui/button";
import { projects } from "@/content/projects";
import { caseStudies } from "@/content/case-studies";
import { ArrowLeft, ArrowRight, TrendingUp, Clock, Clock4 } from "lucide-react";

const metricIcons = {
  TrendingUp: <TrendingUp className="h-3.5 w-3.5" />,
  Clock: <Clock className="h-3.5 w-3.5" />,
  Clock4: <Clock4 className="h-3.5 w-3.5" />,
};

export function generateStaticParams() {
  return projects
    .filter(
      (p) =>
        p.slug !== "hvac-lead-intelligence" &&
        p.slug !== "whatsapp-customer-hub" &&
        p.slug !== "document-intelligence-system"
    )
    .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const relatedCaseStudy = caseStudies.find(
    (cs) => cs.relatedProject === project.slug
  );

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
              <Badge className="mb-4">{project.industry}</Badge>
              <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                {project.title}
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                {project.summary}
              </p>
            </div>

            <div className="mx-auto mt-16 max-w-3xl space-y-12">
              <div>
                <h2 className="font-display text-xl font-semibold tracking-tight">
                  Business Challenge
                </h2>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  {project.problem}
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl font-semibold tracking-tight">
                  Automation Strategy
                </h2>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  {project.solution}
                </p>
              </div>

              {project.implementation && (
                <div>
                  <h2 className="font-display text-xl font-semibold tracking-tight">
                    Implementation
                  </h2>
                  <p className="mt-3 leading-relaxed text-muted-foreground">
                    {project.implementation}
                  </p>
                </div>
              )}

              <div>
                <h2 className="font-display text-xl font-semibold tracking-tight">
                  Business Results
                </h2>
                {project.businessImpact && project.businessImpact.length > 0 ? (
                  <ul className="mt-3 space-y-2">
                    {project.businessImpact.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/60" />
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-3 leading-relaxed text-muted-foreground">
                    {project.result}
                  </p>
                )}
              </div>

              {project.gallery.length > 0 && (
                <div>
                  <h2 className="font-display text-xl font-semibold tracking-tight">
                    Gallery
                  </h2>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    {project.gallery.map((img, i) => (
                      <div
                        key={i}
                        className="aspect-[4/3] overflow-hidden rounded-xl border border-border bg-surface"
                      >
                        <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
                          {project.title} — Screenshot {i + 1}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h2 className="font-display text-xl font-semibold tracking-tight">
                  Technologies
                </h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Tag key={tech}>{tech}</Tag>
                  ))}
                </div>
              </div>
            </div>

            {relatedCaseStudy && (
              <div className="mx-auto mt-16 max-w-3xl">
                <Link
                  href={`/case-studies/${relatedCaseStudy.slug}`}
                  className="group flex items-center justify-between rounded-xl border border-border bg-surface p-6 transition-all duration-300 hover:border-accent/30 sm:p-8"
                >
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Related Case Study
                    </p>
                    <h3 className="mt-1 font-display text-lg font-semibold tracking-tight transition-colors group-hover:text-accent">
                      {relatedCaseStudy.title}
                    </h3>
                  </div>
                  <ArrowRight className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            )}

            <div className="mx-auto mt-16 max-w-3xl text-center">
              <Button asChild>
                <Link href="/contact">
                  Tell Me About Your Business
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
