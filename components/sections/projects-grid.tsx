"use client";

import { useState, useMemo } from "react";
import { ProjectCard, type ProjectCardData } from "@/components/sections/project-card";

interface ProjectsGridProps {
  projects: ProjectCardData[];
}

export function ProjectsGrid({ projects }: ProjectsGridProps) {
  const [activeFilter, setActiveFilter] = useState("all");

  // Build unique categories for filter buttons
  const categories = useMemo(() => {
    const cats = new Set(projects.map((p) => p.category).filter(Boolean));
    return Array.from(cats);
  }, [projects]);

  const filtered = useMemo(() => {
    if (activeFilter === "all") return projects;
    return projects.filter((p) => p.category === activeFilter);
  }, [activeFilter, projects]);

  return (
    <>
      {categories.length > 0 && (
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setActiveFilter("all")}
            className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-all duration-300 ${
              activeFilter === "all"
                ? "border-accent bg-accent text-accent-foreground"
                : "border-border bg-surface text-muted-foreground hover:border-accent/40 hover:text-foreground"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-all duration-300 ${
                activeFilter === cat
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-border bg-surface text-muted-foreground hover:border-accent/40 hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {filtered.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {filtered.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-surface p-12 text-center">
          <h3 className="font-display text-xl font-semibold tracking-tight">
            More Projects Coming Soon
          </h3>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
            I&apos;m continuously building automation systems and publishing
            detailed case studies. Check back soon for new projects and workflow
            demonstrations.
          </p>
        </div>
      )}
    </>
  );
}
