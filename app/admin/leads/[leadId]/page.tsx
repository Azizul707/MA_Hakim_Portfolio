import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Mail, Globe, Building2, Briefcase, Target, MessageSquare } from "lucide-react";
import { getLeadById } from "@/lib/actions/leads";
import { Badge } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import {
  STATUS_VALUES,
  PRIORITY_VALUES,
  STATUS_LABELS,
  PRIORITY_LABELS,
  STATUS_VARIANTS,
  PRIORITY_VARIANTS,
} from "@/lib/lead-meta";
import { formatDateTime, formatDate } from "@/lib/format";
import { LeadDetailClient } from "./LeadDetailClient";

interface LeadDetailPageProps {
  params: Promise<{ leadId: string }>;
}

export default async function LeadDetailPage({ params }: LeadDetailPageProps) {
  const { leadId } = await params;
  const lead = await getLeadById(leadId);

  if (!lead) {
    notFound();
  }

  const statusVariant = STATUS_VARIANTS[lead.status];
  const priorityVariant = PRIORITY_VARIANTS[lead.priority];

  return (
    <div className="space-y-6">
        {/* Back link */}
        <Link
          href="/admin/leads"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to leads
        </Link>

        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent/10 text-lg font-semibold text-accent">
              {lead.name
                .split(" ")
                .map((n) => n[0])
                .slice(0, 2)
                .join("")}
            </div>
            <div>
              <h1 className="font-display text-2xl font-semibold tracking-tight">
                {lead.name}
              </h1>
              <p className="mt-0.5 text-sm text-muted-foreground">
                {lead.business_name} • Submitted {formatDate(lead.created_at)}
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <Badge
                  className={cn(
                    "capitalize",
                    statusVariant === "accent" && "border-accent/30 bg-accent/10 text-accent",
                    statusVariant === "destructive" && "border-red-500/30 bg-red-500/10 text-red-500",
                    statusVariant === "default" && "border-emerald-500/30 bg-emerald-500/10 text-emerald-500",
                    statusVariant === "secondary" && "border-blue-500/30 bg-blue-500/10 text-blue-500",
                    statusVariant === "outline" && "border-amber-500/30 bg-amber-500/10 text-amber-500"
                  )}
                >
                  {STATUS_LABELS[lead.status]}
                </Badge>
                <Badge
                  className={cn(
                    "capitalize",
                    priorityVariant === "destructive" && "border-red-500/30 bg-red-500/10 text-red-500",
                    priorityVariant === "outline" && "border-amber-500/30 bg-amber-500/10 text-amber-500",
                    priorityVariant === "secondary" && "border-muted-foreground/30 bg-muted-foreground/10 text-muted-foreground",
                    priorityVariant === "default" && "border-border bg-surface text-foreground"
                  )}
                >
                  {PRIORITY_LABELS[lead.priority]}
                </Badge>
              </div>
            </div>
          </div>

          <a
            href={`mailto:${lead.email}`}
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium transition-colors hover:border-accent/50 hover:bg-surface/80"
          >
            <Mail className="h-4 w-4" />
            Email lead
          </a>
        </div>

        {/* Info grid */}
        <div className="grid gap-4 lg:grid-cols-3">
          {/* Main content (left, 2 cols) */}
          <div className="space-y-4 lg:col-span-2">
            <InfoCard
              icon={MessageSquare}
              title="Current Challenge"
              body={lead.current_challenge}
            />
            <InfoCard
              icon={Target}
              title="Project Goal"
              body={lead.project_goal}
            />
            {lead.message && (
              <InfoCard
                icon={MessageSquare}
                title="Message"
                body={lead.message}
              />
            )}
            {lead.notes && (
              <InfoCard
                icon={MessageSquare}
                title="Internal Notes"
                body={lead.notes}
                muted
              />
            )}
          </div>

          {/* Sidebar (right, 1 col) */}
          <div className="space-y-4">
            <div className="rounded-xl border border-border bg-surface p-5">
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Details
              </h2>
              <dl className="space-y-3 text-sm">
                <DetailRow icon={Mail} label="Email" value={lead.email} />
                <DetailRow icon={Building2} label="Business" value={lead.business_name} />
                <DetailRow icon={Briefcase} label="Industry" value={lead.industry} />
                {lead.website && (
                  <DetailRow
                    icon={Globe}
                    label="Website"
                    value={
                      <a
                        href={lead.website!}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent hover:underline"
                      >
                        {lead.website}
                      </a>
                    }
                  />
                )}
                <DetailRow label="Budget" value={lead.budget || "Not specified"} />
                <DetailRow label="Source" value={lead.source} />
                <DetailRow label="Page" value={lead.source_page} />
                <DetailRow
                  label="Last Contacted"
                  value={lead.last_contacted ? formatDateTime(lead.last_contacted) : "—"}
                />
              </dl>
            </div>
          </div>
        </div>

        {/* Update form */}
        <LeadDetailClient leadId={lead.id} initialLead={lead} />
    </div>
  );
}

function InfoCard({
  icon: Icon,
  title,
  body,
  muted,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  body: string;
  muted?: boolean;
}) {
  return (
    <div className="rounded-xl border border-border bg-surface p-5">
      <div className="mb-3 flex items-center gap-2">
        <Icon className="h-4 w-4 text-accent" />
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          {title}
        </h2>
      </div>
      <p className={cn("whitespace-pre-wrap text-sm leading-relaxed", muted ? "text-muted-foreground" : "text-foreground")}>
        {body}
      </p>
    </div>
  );
}

function DetailRow({
  icon: Icon,
  label,
  value,
}: {
  icon?: React.ComponentType<{ className?: string }>;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      {Icon && <Icon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />}
      <div className="min-w-0 flex-1">
        <dt className="text-xs uppercase tracking-wide text-muted-foreground">
          {label}
        </dt>
        <dd className="mt-0.5 break-words font-medium">{value}</dd>
      </div>
    </div>
  );
}