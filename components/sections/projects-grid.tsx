"use client";

import { useState, useMemo } from "react";
import { projects } from "@/content/projects";
import { ProjectCard } from "@/components/sections/project-card";

const filterOptions = [
  { label: "All", value: "all" },
  { label: "HVAC", value: "HVAC" },
  { label: "Local Services", value: "Local Services" },
  { label: "Lead Management", value: "Lead Management" },
  { label: "Customer Communication", value: "Customer Communication" },
  { label: "AI Automation", value: "AI Automation" },
  { label: "Workflow Automation", value: "Workflow Automation" },
];

export function ProjectsGrid() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered = useMemo(() => {
    if (activeFilter === "all") return projects;
    return projects.filter((p) => {
      if (p.industry === activeFilter) return true;
      if (p.tags?.includes(activeFilter)) return true;
      return false;
    });
  }, [activeFilter]);

  return (
    <>
      <div className="mb-10 flex flex-wrap justify-center gap-2">
        {filterOptions.map((filter) => (
          <button
            key={filter.value}
            onClick={() => setActiveFilter(filter.value)}
            className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-all duration-300 ${
              activeFilter === filter.value
                ? "border-accent bg-accent text-accent-foreground"
                : "border-border bg-surface text-muted-foreground hover:border-accent/40 hover:text-foreground"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

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
