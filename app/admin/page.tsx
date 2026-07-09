import { getLeadStats, getRecentLeads } from "@/lib/actions/leads";
import { Badge, SectionHeading } from "@/components/ui/typography";
import { ArrowUpRight, Mail, CheckCircle2, Trophy, XCircle, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { formatDate } from "@/lib/format";

const statCards = [
  {
    key: "new",
    label: "New Leads",
    icon: Mail,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    key: "contacted",
    label: "Contacted",
    icon: CheckCircle2,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  {
    key: "qualified",
    label: "Qualified",
    icon: Trophy,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    key: "won",
    label: "Won",
    icon: ArrowUpRight,
    color: "text-emerald-600",
    bg: "bg-emerald-600/10",
  },
  {
    key: "lost",
    label: "Lost",
    icon: XCircle,
    color: "text-red-500",
    bg: "bg-red-500/10",
  },
  {
    key: "total",
    label: "Total Leads",
    icon: TrendingUp,
    color: "text-accent",
    bg: "bg-accent/10",
  },
] as const;

export default async function DashboardPage() {
  const stats = await getLeadStats();
  const recentLeads = await getRecentLeads(5);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-semibold tracking-tight">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Overview of your leads pipeline
        </p>
      </div>

        {/* Stat Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {statCards.map((card) => (
            <Link
              key={card.key}
              href="/admin/leads"
              className={cn(
                "group rounded-xl border border-border bg-surface p-5 transition-colors hover:border-accent/30 hover:bg-surface/80"
              )}
            >
              <div className="flex items-center justify-between">
                <div className={cn(card.bg, "flex h-10 w-10 items-center justify-center rounded-lg", card.color)}>
                  <card.icon className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-4">
                <p className="font-display text-2xl font-bold tabular-nums">
                  {stats[card.key as keyof typeof stats]}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {card.label}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="rounded-xl border border-border bg-surface">
          <div className="flex items-center justify-between border-b border-border px-6 py-4">
            <SectionHeading
              eyebrow="Activity"
              title="Recent Leads"
              align="left"
            />
            <Link
              href="/admin/leads"
              className="text-sm font-medium text-accent hover:underline flex items-center gap-1"
            >
              View all
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {recentLeads.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
              <Mail className="h-12 w-12 text-muted-foreground/30" />
              <h3 className="mt-4 font-display text-lg font-semibold">
                No leads yet
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                New form submissions will appear here automatically.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {recentLeads.map((lead) => (
                <Link
                  key={lead.id}
                  href={`/admin/leads/${lead.id}`}
                  className="flex items-center justify-between px-6 py-4 transition-colors hover:bg-surface/50"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium truncate">{lead.name}</p>
                      <p className="text-sm text-muted-foreground truncate">
                        {lead.business_name} • {lead.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <Badge className="text-xs">{lead.status}</Badge>
                    <span className="text-muted-foreground whitespace-nowrap">
                      {formatDate(lead.created_at)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
  );
}