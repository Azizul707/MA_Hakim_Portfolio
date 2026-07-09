import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Container, Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { ProjectsGrid } from "@/components/sections/projects-grid";
import { MoreProjectsGrid } from "@/components/sections/more-projects-grid";
import { getProjectsForPublic } from "@/lib/actions/projects";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Automation Projects | MA Hakim",
  description:
    "Explore AI-powered automation projects designed to help HVAC and local service businesses improve lead management, customer communication, and operational efficiency.",
};

export default async function ProjectsPage() {
  let dbProjects: Array<{
    title: string;
    slug: string;
    category: string;
    short_description: string;
    cover_image: string | null;
    live_demo_url: string | null;
    technology_stack: string[];
    featured: boolean;
  }> = [];
  try {
    const raw = await getProjectsForPublic();
    dbProjects = (raw ?? []).map((p: any) => ({
      title: p.title,
      slug: p.slug,
      category: p.category || "",
      short_description: p.short_description,
      cover_image: p.cover_image,
      live_demo_url: p.live_demo_url,
      technology_stack: (p.solution?.technology_stack as string[]) || [],
      featured: p.featured,
    }));
  } catch {
    // Projects table may not exist yet — render without DB projects
  }

  return (
    <>
      <Navbar />
      <main>
        <Section className="pt-28">
          <Container>
            <SectionHeading
              eyebrow="Projects"
              title="Automation Projects"
              description="Real automation systems built to solve business problems, reduce repetitive work, and improve operational efficiency."
            />

            <div className="mx-auto mb-16 max-w-2xl text-center">
              <p className="text-sm leading-relaxed text-muted-foreground">
                Every project on this page started with a business
                challenge&mdash;not a technology choice. My goal is always to
                understand how a business operates, identify inefficient
                processes, and build practical automation that creates measurable
                improvements.
              </p>
            </div>

            <ProjectsGrid />

            {/* More Projects — database-driven */}
            <MoreProjectsGrid dbProjects={dbProjects} />
          </Container>
        </Section>

        <Section className="bg-surface/20">
          <Container>
            <div className="mx-auto max-w-lg text-center">
              <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                Looking for Something Similar?
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Every business has unique processes. Let&apos;s discuss how
                automation can simplify your workflow and improve efficiency.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button asChild size="lg">
                  <Link href="/contact">
                    Tell Me About Your Business
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="secondary" size="lg">
                  <Link href="/contact">Contact Me</Link>
                </Button>
              </div>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}