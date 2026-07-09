"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/typography";
import { Tag } from "@/components/ui/tag";
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

const FLAGSHIP_SLUGS = new Set([
  "hvac-lead-intelligence",
  "whatsapp-customer-hub",
  "document-intelligence-system",
]);

interface MoreProject {
  title: string;
  slug: string;
  category: string;
  short_description: string;
  cover_image: string | null;
  live_demo_url: string | null;
  technology_stack: string[];
  featured: boolean;
}

interface MoreProjectsGridProps {
  dbProjects?: MoreProject[];
}

function CardCover({ src, alt }: { src?: string | null; alt: string }) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);
  const imageSrc = src ? `/projects/${src.replace(/^\//, "")}` : undefined;

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-t-xl bg-surface">
      {imageSrc && !errored ? (
        <img
          src={imageSrc}
          alt={alt}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setErrored(true)}
          className={cn(
            "h-full w-full object-cover transition-all duration-500 group-hover:scale-105",
            loaded ? "opacity-100" : "opacity-0"
          )}
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-1 p-4 text-center text-xs text-muted-foreground">
          <span className="font-medium opacity-60">{alt}</span>
        </div>
      )}
    </div>
  );
}

function DbProjectCard({ project, index = 0 }: { project: MoreProject; index?: number }) {
  const maxTags = 4;
  const visibleTags = project.technology_stack.slice(0, maxTags);
  const extraCount = project.technology_stack.length - maxTags;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <div className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface transition-all duration-300 hover:border-accent/30 hover:shadow-sm">
        <Link
          href={`/projects/${project.slug}`}
          className="flex flex-1 flex-col"
        >
          <CardCover src={project.cover_image} alt={`${project.title} cover`} />

          <div className="flex flex-1 flex-col p-5 sm:p-6">
            {project.category && (
              <Badge className="mb-2 w-fit">{project.category}</Badge>
            )}
            <h3 className="font-display text-lg font-semibold tracking-tight transition-colors group-hover:text-accent line-clamp-2">
              {project.title}
            </h3>
            <p className="mt-1.5 text-sm leading-snug text-muted-foreground line-clamp-2">
              {project.short_description}
            </p>
            <div className="flex-1" />
            {visibleTags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-1.5">
                {visibleTags.map((tech) => (
                  <Tag key={tech}>{tech}</Tag>
                ))}
                {extraCount > 0 && <Tag>+{extraCount}</Tag>}
              </div>
            )}
          </div>
        </Link>

        <div className="flex items-center gap-2 border-t border-border px-5 py-3 sm:px-6">
          <Button asChild size="sm" className="flex-1">
            <Link href={`/projects/${project.slug}`}>
              Explore Solution
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Button>

          {project.live_demo_url && (
            <Button
              asChild
              variant="secondary"
              size="sm"
              className="flex-1"
            >
              <a
                href={project.live_demo_url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Live Demo
              </a>
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function MoreProjectsGrid({ dbProjects = [] }: MoreProjectsGridProps) {
  const moreProjects = useMemo(
    () => dbProjects.filter((p) => !FLAGSHIP_SLUGS.has(p.slug)),
    [dbProjects]
  );

  const categories = useMemo(() => {
    const cats = new Set(moreProjects.map((p) => p.category).filter(Boolean));
    return Array.from(cats);
  }, [moreProjects]);

  const [activeFilter, setActiveFilter] = useState("all");

  const filtered = useMemo(() => {
    if (activeFilter === "all") return moreProjects;
    return moreProjects.filter((p) => p.category === activeFilter);
  }, [activeFilter, moreProjects]);

  if (moreProjects.length === 0) return null;

  return (
    <div className="mt-20">
      <div className="mb-8 border-t border-border pt-8">
        <h2 className="font-display text-2xl font-semibold tracking-tight">
          More Projects
        </h2>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
          Additional automation systems and workflow solutions.
        </p>
      </div>

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
            <DbProjectCard key={project.slug} project={project} index={i} />
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
    </div>
  );
}