"use client";

import { useState, useCallback, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Search,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Inbox,
} from "lucide-react";
import type { LeadListParams, PortfolioLead, LeadStatus, LeadPriority } from "@/types/portfolio-lead";
import {
  STATUS_VALUES,
  PRIORITY_VALUES,
  STATUS_LABELS,
  PRIORITY_LABELS,
  STATUS_VARIANTS,
  PRIORITY_VARIANTS,
} from "@/lib/lead-meta";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/typography";
import { formatDate } from "@/lib/format";

interface LeadsTableClientProps {
  initialLeads: PortfolioLead[];
  initialParams: LeadListParams;
  total: number;
  totalPages: number;
  industries: string[];
}

const SORTABLE_COLUMNS = ["name", "status", "priority", "created_at"] as const;
type SortColumn = (typeof SORTABLE_COLUMNS)[number];

export function LeadsTableClient({
  initialLeads,
  initialParams,
  total,
  totalPages,
  industries,
}: LeadsTableClientProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [search, setSearch] = useState(initialParams.search || "");
  const [status, setStatus] = useState(initialParams.status || "ALL");
  const [priority, setPriority] = useState(initialParams.priority || "ALL");
  const [industry, setIndustry] = useState(initialParams.industry || "ALL");
  const [sortBy, setSortBy] = useState<string>(initialParams.sortBy || "created_at");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">(
    initialParams.sortOrder || "desc"
  );
  const [page, setPage] = useState(initialParams.page || 1);

  // ── Stat counts from all leads to show summary ──
  const statCounts = {
    new: initialLeads.filter((l) => l.status === "NEW").length,
    contacted: initialLeads.filter((l) => l.status === "CONTACTED").length,
    won: initialLeads.filter((l) => l.status === "WON").length,
  };

  const buildQuery = useCallback(
    (overrides: Partial<LeadListParams> = {}) => {
      const params = new URLSearchParams();
      const final = {
        page,
        pageSize: initialParams.pageSize || 10,
        search,
        status,
        priority,
        industry,
        sortBy,
        sortOrder,
        ...overrides,
      };

      if (final.page > 1) params.set("page", String(final.page));
      if (final.search) params.set("search", final.search);
      if (final.status !== "ALL") params.set("status", final.status);
      if (final.priority !== "ALL") params.set("priority", final.priority);
      if (final.industry !== "ALL") params.set("industry", final.industry);
      if (final.sortBy !== "created_at") params.set("sortBy", final.sortBy);
      if (final.sortOrder !== "desc") params.set("sortOrder", final.sortOrder);

      return params.toString();
    },
    [page, search, status, priority, industry, sortBy, sortOrder, initialParams.pageSize]
  );

  const navigate = useCallback(
    (overrides: Partial<LeadListParams> = {}) => {
      const query = buildQuery(overrides);
      startTransition(() => {
        router.push(query ? `/admin/leads?${query}` : "/admin/leads");
      });
    },
    [buildQuery, router]
  );

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    navigate({ page: 1, search });
  };

  const handleFilterChange = (key: string, value: string) => {
    if (key === "status") setStatus(value as LeadStatus | "ALL");
    if (key === "priority") setPriority(value as LeadPriority | "ALL");
    if (key === "industry") setIndustry(value as string);
    setPage(1);
    navigate({ page: 1, [key]: value });
  };

  const toggleSort = (column: SortColumn) => {
    const newOrder =
      sortBy === column && sortOrder === "asc" ? "desc" : "asc";
    setSortBy(column);
    setSortOrder(newOrder);
    navigate({ sortBy: column, sortOrder: newOrder });
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    navigate({ page: newPage });
  };

  const hasActiveFilters =
    search || status !== "ALL" || priority !== "ALL" || industry !== "ALL";

  // Generate visible page numbers
  const getPageNumbers = () => {
    const pages: (number | "ellipsis")[] = [];
    const maxVisible = 5;
    if (totalPages <= maxVisible + 2) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      const start = Math.max(2, page - 1);
      const end = Math.min(totalPages - 1, page + 1);
      if (start > 2) pages.push("ellipsis");
      for (let i = start; i <= end; i++) pages.push(i);
      if (end < totalPages - 1) pages.push("ellipsis");
      pages.push(totalPages);
    }
    return pages;
  };

  const from = (page - 1) * (initialParams.pageSize || 10) + 1;
  const to = Math.min(page * (initialParams.pageSize || 10), total);

  return (
    <div className="space-y-5">
      {/* ── Header ── */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <h1 className="font-display text-2xl font-semibold tracking-tight">
            Leads
          </h1>
          {total > 0 && (
            <span className="inline-flex items-center rounded-full border border-border bg-surface px-2.5 py-0.5 text-xs font-medium text-muted-foreground tabular-nums">
              {total}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          {statCounts.new > 0 && (
            <span>New <span className="font-medium text-foreground">{statCounts.new}</span></span>
          )}
          {statCounts.contacted > 0 && (
            <span>· Contacted <span className="font-medium text-foreground">{statCounts.contacted}</span></span>
          )}
          {statCounts.won > 0 && (
            <span>· Won <span className="font-medium text-foreground">{statCounts.won}</span></span>
          )}
        </div>
      </div>

      {/* ── Toolbar (always visible) ── */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <form
          onSubmit={handleSearchSubmit}
          className="relative flex-1 sm:max-w-xs"
        >
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, company..."
            className="h-8 w-full rounded-lg border border-border bg-background pl-8 pr-3 text-xs outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-accent/50 focus:ring-1 focus:ring-accent/30"
            aria-label="Search leads"
          />
        </form>

        <div className="flex items-center gap-2">
          <select
            value={status}
            onChange={(e) => handleFilterChange("status", e.target.value)}
            className="h-8 rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs outline-none transition-colors focus:border-accent/50 focus:ring-1 focus:ring-accent/30"
            aria-label="Filter by status"
          >
            <option value="ALL">All statuses</option>
            {STATUS_VALUES.map((s) => (
              <option key={s} value={s}>
                {STATUS_LABELS[s]}
              </option>
            ))}
          </select>

          <select
            value={priority}
            onChange={(e) => handleFilterChange("priority", e.target.value)}
            className="h-8 rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs outline-none transition-colors focus:border-accent/50 focus:ring-1 focus:ring-accent/30"
            aria-label="Filter by priority"
          >
            <option value="ALL">All priorities</option>
            {PRIORITY_VALUES.map((p) => (
              <option key={p} value={p}>
                {PRIORITY_LABELS[p]}
              </option>
            ))}
          </select>

          <select
            value={industry}
            onChange={(e) => handleFilterChange("industry", e.target.value)}
            className="h-8 rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs outline-none transition-colors focus:border-accent/50 focus:ring-1 focus:ring-accent/30"
            aria-label="Filter by industry"
          >
            <option value="ALL">All industries</option>
            {industries.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>

          {hasActiveFilters && (
            <button
              onClick={() => {
                setSearch("");
                setStatus("ALL");
                setPriority("ALL");
                setIndustry("ALL");
                setPage(1);
                startTransition(() => router.push("/admin/leads"));
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
                <SortableTh
                  label="Name"
                  column="name"
                  sortBy={sortBy}
                  sortOrder={sortOrder}
                  onSort={toggleSort}
                />
                <Th label="Business" />
                <SortableTh
                  label="Status"
                  column="status"
                  sortBy={sortBy}
                  sortOrder={sortOrder}
                  onSort={toggleSort}
                />
                <SortableTh
                  label="Priority"
                  column="priority"
                  sortBy={sortBy}
                  sortOrder={sortOrder}
                  onSort={toggleSort}
                />
                <Th label="Budget" />
                <SortableTh
                  label="Created"
                  column="created_at"
                  sortBy={sortBy}
                  sortOrder={sortOrder}
                  onSort={toggleSort}
                />
                <Th label="" className="w-12" />
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {initialLeads.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface">
                        <Inbox className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <p className="mt-3 font-display text-base font-semibold">
                        No leads found
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {hasActiveFilters
                          ? "Try adjusting your filters to find what you're looking for."
                          : "New form submissions will appear here automatically."}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                initialLeads.map((lead) => (
                  <tr
                    key={lead.id}
                    className="group cursor-pointer h-[52px] transition-colors hover:bg-muted/30"
                  >
                    <td className="px-4 py-2">
                      <Link
                        href={`/admin/leads/${lead.id}`}
                        className="flex items-center gap-3"
                        tabIndex={-1}
                      >
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-semibold text-accent">
                          {lead.name
                            .split(" ")
                            .map((n) => n[0])
                            .slice(0, 2)
                            .join("")}
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium leading-tight">
                            {lead.name}
                          </p>
                          <p className="truncate text-xs text-muted-foreground leading-tight">
                            {lead.email}
                          </p>
                        </div>
                      </Link>
                    </td>
                    <td className="px-4 py-2">
                      <span className="block max-w-[160px] truncate text-sm text-muted-foreground">
                        {lead.business_name}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      <StatusBadge status={lead.status} />
                    </td>
                    <td className="px-4 py-2">
                      <PriorityBadge priority={lead.priority} />
                    </td>
                    <td className="px-4 py-2">
                      <span className="font-mono text-xs tabular-nums text-muted-foreground">
                        {lead.budget ? `$${lead.budget}` : "—"}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-xs text-muted-foreground">
                      {formatDate(lead.created_at)}
                    </td>
                    <td className="px-4 py-2">
                      <Link
                        href={`/admin/leads/${lead.id}`}
                        className="flex h-8 w-8 items-center justify-center rounded-lg opacity-0 transition-all group-hover:opacity-100 hover:bg-muted"
                        aria-label="View lead details"
                      >
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Pagination ── */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground tabular-nums">
            Showing {from}–{to} of {total}
          </p>
          <div className="flex items-center gap-1">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => handlePageChange(page - 1)}
              disabled={page <= 1 || isPending}
              aria-label="Previous page"
              className="h-8 w-8 p-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {getPageNumbers().map((p, i) =>
              p === "ellipsis" ? (
                <span
                  key={`e-${i}`}
                  className="flex h-8 w-8 items-center justify-center text-xs text-muted-foreground"
                >
                  …
                </span>
              ) : (
                <button
                  key={p}
                  onClick={() => handlePageChange(p)}
                  disabled={isPending}
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-lg text-xs font-medium transition-colors",
                    p === page
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:bg-surface hover:text-foreground"
                  )}
                  aria-label={`Page ${p}`}
                  aria-current={p === page ? "page" : undefined}
                >
                  {p}
                </button>
              )
            )}

            <Button
              variant="secondary"
              size="sm"
              onClick={() => handlePageChange(page + 1)}
              disabled={page >= totalPages || isPending}
              aria-label="Next page"
              className="h-8 w-8 p-0"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Header cell helpers ──

function Th({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <th
      className={cn(
        "px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground",
        className
      )}
    >
      {label}
    </th>
  );
}

function SortableTh({
  label,
  column,
  sortBy,
  sortOrder,
  onSort,
}: {
  label: string;
  column: SortColumn;
  sortBy: string;
  sortOrder: "asc" | "desc";
  onSort: (column: SortColumn) => void;
}) {
  const isActive = sortBy === column;
  return (
    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
      <button
        onClick={() => onSort(column)}
        className={cn(
          "inline-flex items-center gap-1 transition-colors hover:text-foreground",
          isActive && "text-foreground"
        )}
        aria-label={`Sort by ${label}`}
      >
        {label}
        {isActive && (
          sortOrder === "asc" ? (
            <ChevronUp className="h-3 w-3" />
          ) : (
            <ChevronDown className="h-3 w-3" />
          )
        )}
      </button>
    </th>
  );
}

// ── Badge helpers ──

function StatusBadge({ status }: { status: PortfolioLead["status"] }) {
  const variant = STATUS_VARIANTS[status];
  const classes = cn(
    "capitalize",
    variant === "accent" && "border-accent/30 bg-accent/10 text-accent",
    variant === "destructive" && "border-red-500/30 bg-red-500/10 text-red-500",
    variant === "default" && "border-emerald-500/30 bg-emerald-500/10 text-emerald-500",
    variant === "secondary" && "border-blue-500/30 bg-blue-500/10 text-blue-500",
    variant === "outline" && "border-amber-500/30 bg-amber-500/10 text-amber-500"
  );
  return <Badge className={classes}>{STATUS_LABELS[status]}</Badge>;
}

function PriorityBadge({ priority }: { priority: PortfolioLead["priority"] }) {
  const variant = PRIORITY_VARIANTS[priority];
  const classes = cn(
    "capitalize",
    variant === "destructive" && "border-red-500/30 bg-red-500/10 text-red-500",
    variant === "outline" && "border-amber-500/30 bg-amber-500/10 text-amber-500",
    variant === "secondary" && "border-muted-foreground/30 bg-muted-foreground/10 text-muted-foreground",
    variant === "default" && "border-border bg-surface text-foreground"
  );
  return <Badge className={classes}>{PRIORITY_LABELS[priority]}</Badge>;
}
