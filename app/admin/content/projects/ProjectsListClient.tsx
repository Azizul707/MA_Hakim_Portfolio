"use client";

import { useState, useCallback, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Search,
  Plus,
  Eye,
  EyeOff,
  Archive,
  Copy,
  Pencil,
  ExternalLink,
  ChevronRight,
  Inbox,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import type { Project } from "@/types/project";
import {
  PROJECT_STATUS_LABELS,
  PROJECT_STATUS_VALUES,
} from "@/types/project";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/format";
import {
  updateProject,
  archiveProject,
  duplicateProject,
} from "@/lib/actions/projects";

interface ProjectsListClientProps {
  initialProjects: Project[];
  total: number;
}

export function ProjectsListClient({
  initialProjects,
  total,
}: ProjectsListClientProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filtered = initialProjects.filter((p) => {
    if (statusFilter !== "all" && p.status !== statusFilter) return false;
    if (!search.trim()) return true;
    const q = search.trim().toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.slug.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  });

  const hasActiveFilters = search.trim() || statusFilter !== "all";

  const handleAction = useCallback(
    (
      action: () => Promise<{ success: boolean; message: string }>,
      refresh = true
    ) => {
      startTransition(async () => {
        const result = await action();
        if (refresh) {
          router.refresh();
        }
        if (!result.success) {
          // Could show toast here
          console.error(result.message);
        }
      });
    },
    [router]
  );

  return (
    <div className="space-y-5">
      {/* ── Header ── */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <h1 className="font-display text-2xl font-semibold tracking-tight">
            Projects
          </h1>
          {total > 0 && (
            <span className="inline-flex items-center rounded-full border border-border bg-surface px-2.5 py-0.5 text-xs font-medium text-muted-foreground tabular-nums">
              {total}
            </span>
          )}
        </div>
        <Link
          href="/admin/content/projects/new"
          className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90"
        >
          <Plus className="h-4 w-4" />
          New Project
        </Link>
      </div>

      {/* ── Filters ── */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects..."
            className="h-8 w-full rounded-lg border border-border bg-background pl-8 pr-3 text-xs outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-accent/50 focus:ring-1 focus:ring-accent/30"
            aria-label="Search projects"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-8 rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs outline-none transition-colors focus:border-accent/50 focus:ring-1 focus:ring-accent/30"
            aria-label="Filter by status"
          >
            <option value="all">All statuses</option>
            <option value="draft">Drafts</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>

          {hasActiveFilters && (
            <button
              onClick={() => {
                setSearch("");
                setStatusFilter("all");
              }}
              className="h-8 whitespace-nowrap rounded-lg px-2.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* ── Table ── */}
      <div className="overflow-hidden rounded-xl border border-border bg-surface">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Project
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Featured
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Order
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Created
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface">
                        <Inbox className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <p className="mt-3 font-display text-base font-semibold">
                        {hasActiveFilters
                          ? "No projects match your filters"
                          : "No projects yet"}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {hasActiveFilters
                          ? "Try adjusting your filters."
                          : "Create your first project to get started."}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map((project) => (
                  <tr
                    key={project.id}
                    className="group cursor-pointer h-[52px] transition-colors hover:bg-muted/30"
                  >
                    <td className="px-4 py-2">
                      <Link
                        href={`/admin/content/projects/${project.id}`}
                        className="flex items-center gap-3"
                        tabIndex={-1}
                      >
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-xs font-semibold text-accent">
                          {project.title.charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium leading-tight">
                            {project.title}
                          </p>
                          <p className="truncate text-xs text-muted-foreground leading-tight">
                            /{project.slug}
                          </p>
                        </div>
                      </Link>
                    </td>
                    <td className="px-4 py-2">
                      <StatusBadge status={project.status} />
                    </td>
                    <td className="px-4 py-2">
                      {project.featured ? (
                        <span className="text-xs font-medium text-accent">
                          Featured
                        </span>
                      ) : (
                        <span className="text-xs text-muted-foreground">
                          —
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-2">
                      <span className="font-mono text-xs tabular-nums text-muted-foreground">
                        {project.display_order}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-xs text-muted-foreground">
                      {formatDate(project.created_at)}
                    </td>
                    <td className="px-4 py-2 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                        <Link
                          href={`/admin/content/projects/${project.id}`}
                          className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
                          aria-label="Edit project"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </Link>

                        {project.status !== "published" && (
                          <button
                            onClick={() =>
                              handleAction(() =>
                                updateProject(project.id, {
                                  status: "published",
                                } as any)
                              )
                            }
                            className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
                            aria-label="Publish"
                            disabled={isPending}
                          >
                            <Eye className="h-3.5 w-3.5" />
                          </button>
                        )}

                        {project.status === "published" && (
                          <button
                            onClick={() =>
                              handleAction(() =>
                                updateProject(project.id, {
                                  status: "draft",
                                } as any)
                              )
                            }
                            className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
                            aria-label="Unpublish"
                            disabled={isPending}
                          >
                            <EyeOff className="h-3.5 w-3.5" />
                          </button>
                        )}

                        <button
                          onClick={() =>
                            handleAction(() => duplicateProject(project.id))
                          }
                          className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
                          aria-label="Duplicate"
                          disabled={isPending}
                        >
                          <Copy className="h-3.5 w-3.5" />
                        </button>

                        {project.status !== "archived" && (
                          <button
                            onClick={() =>
                              handleAction(() => archiveProject(project.id))
                            }
                            className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
                            aria-label="Archive"
                            disabled={isPending}
                          >
                            <Archive className="h-3.5 w-3.5" />
                          </button>
                        )}

                        {project.status === "published" && (
                          <a
                            href={`/projects/${project.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
                            aria-label="View on site"
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: Project["status"] }) {
  const classes = cn(
    "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium capitalize",
    status === "published" &&
      "border-emerald-500/30 bg-emerald-500/10 text-emerald-500",
    status === "draft" &&
      "border-amber-500/30 bg-amber-500/10 text-amber-500",
    status === "archived" &&
      "border-muted-foreground/30 bg-muted-foreground/10 text-muted-foreground"
  );
  return <span className={classes}>{PROJECT_STATUS_LABELS[status]}</span>;
}
