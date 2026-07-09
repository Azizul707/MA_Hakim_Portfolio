import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Container, Section } from "@/components/ui/container";
import { Badge } from "@/components/ui/typography";
import { Tag } from "@/components/ui/tag";
import { Button } from "@/components/ui/button";
import { caseStudies } from "@/content/case-studies";
import { projects } from "@/content/projects";
import {
  ArrowLeft,
  ArrowRight,
  TrendingUp,
  Clock,
  DollarSign,
  Star,
  Users,
} from "lucide-react";

const metricIconMap: Record<string, React.ReactNode> = {
  "Lead Conversion": <TrendingUp className="h-3.5 w-3.5" />,
  "Response Time": <Clock className="h-3.5 w-3.5" />,
  "Monthly Revenue Lift": <DollarSign className="h-3.5 w-3.5" />,
  "Rating Recovery": <Star className="h-3.5 w-3.5" />,
  "Review Volume": <Users className="h-3.5 w-3.5" />,
  "After-Hours Bookings": <Clock className="h-3.5 w-3.5" />,
  "No-Show Rate": <TrendingUp className="h-3.5 w-3.5" />,
  "CSAT Improvement": <TrendingUp className="h-3.5 w-3.5" />,
};

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies.find((cs) => cs.slug === slug);
  if (!study) return { title: "Case Study Not Found" };
  return { title: study.title, description: study.problem.slice(0, 155) };
}

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = caseStudies.find((cs) => cs.slug === slug);
  if (!study) notFound();

  const relatedProject = projects.find((p) => p.slug === study.relatedProject);

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
              <Badge className="mb-4">{study.industry}</Badge>
              <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                {study.title}
              </h1>
            </div>

            {study.metrics && (
              <div className="mx-auto mt-10 grid max-w-2xl grid-cols-3 gap-4 rounded-xl border border-border bg-surface p-6">
                {study.metrics.map((metric) => (
                  <div key={metric.label} className="text-center">
                    <div className="flex items-center justify-center gap-1.5 text-accent">
                      {metricIconMap[metric.label] || (
                        <TrendingUp className="h-3.5 w-3.5" />
                      )}
                      <span className="font-display text-lg font-semibold sm:text-xl">
                        {metric.value}
                      </span>
                    </div>
                    <p className="mt-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                      {metric.label}
                    </p>
                  </div>
                ))}
              </div>
            )}

            <div className="mx-auto mt-16 max-w-3xl space-y-12">
              <div>
                <h2 className="font-display text-xl font-semibold tracking-tight">
                  The Problem
                </h2>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  {study.problem}
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl font-semibold tracking-tight">
                  Our Analysis
                </h2>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  {study.analysis}
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl font-semibold tracking-tight">
                  The Solution
                </h2>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  {study.solution}
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl font-semibold tracking-tight">
                  The Outcome
                </h2>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  {study.outcome}
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl font-semibold tracking-tight">
                  Stack
                </h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {study.technologies.map((tech) => (
                    <Tag key={tech}>{tech}</Tag>
                  ))}
                </div>
              </div>
            </div>

            {relatedProject && (
              <div className="mx-auto mt-16 max-w-3xl">
                <Link
                  href={`/projects/${relatedProject.slug}`}
                  className="group flex items-center justify-between rounded-xl border border-border bg-surface p-6 transition-all duration-300 hover:border-accent/30 sm:p-8"
                >
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Related Project
                    </p>
                    <h3 className="mt-1 font-display text-lg font-semibold tracking-tight transition-colors group-hover:text-accent">
                      {relatedProject.title}
                    </h3>
                  </div>
                  <ArrowRight className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            )}

            <div className="mx-auto mt-16 max-w-3xl text-center">
              <Button asChild>
                <Link href="/contact">
                  Get Results Like This
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
