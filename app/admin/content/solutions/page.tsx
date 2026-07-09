import { getProjects } from "@/lib/actions/projects";
import Link from "next/link";
import { Pencil, Plus, ArrowRight, FileText, Inbox } from "lucide-react";

export default async function AdminSolutionsPage() {
  const { projects, total } = await getProjects();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <h1 className="font-display text-2xl font-semibold tracking-tight">
            Solution Breakdowns
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
                  Solution Status
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {projects.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface">
                        <Inbox className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <p className="mt-3 font-display text-base font-semibold">
                        No projects yet
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Create a project first, then add a solution breakdown.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                projects.map((project) => (
                  <tr
                    key={project.id}
                    className="group cursor-pointer h-[52px] transition-colors hover:bg-muted/30"
                  >
                    <td className="px-4 py-2">
                      <Link
                        href={`/admin/content/solutions/${project.id}`}
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
                      <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                        <FileText className="h-3.5 w-3.5" />
                        Add solution breakdown
                      </span>
                    </td>
                    <td className="px-4 py-2 text-right">
                      <Link
                        href={`/admin/content/solutions/${project.id}`}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-accent/50 hover:bg-surface/80"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                        Edit
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
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

function StatusBadge({ status }: { status: string }) {
  const classes = {
    published: "border-emerald-500/30 bg-emerald-500/10 text-emerald-500",
    draft: "border-amber-500/30 bg-amber-500/10 text-amber-500",
    archived: "border-muted-foreground/30 bg-muted-foreground/10 text-muted-foreground",
  }[status] || "border-border bg-surface text-muted-foreground";

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium capitalize ${classes}`}
    >
      {status}
    </span>
  );
}
