"use client";

import Link from "next/link";
import { Container, Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { projects } from "@/content/projects";
import { ProjectCard } from "@/components/sections/project-card";
import { ArrowRight } from "lucide-react";

export function FeaturedProjects() {
  const featured = projects.filter((p) => p.featured);

  return (
    <Section className="bg-surface/20">
      <Container>
        <SectionHeading
          eyebrow="Projects"
          title="Selected Automation Projects"
          description="Real solutions built to solve operational challenges and improve business efficiency."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button asChild variant="secondary">
            <Link href="/projects">
              View All Projects
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
