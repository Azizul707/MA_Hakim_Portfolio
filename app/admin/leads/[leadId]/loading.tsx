import { Container } from "@/components/ui/container";

export default function LeadDetailLoading() {
  return (
    <Container>
      <div className="space-y-6">
        <div className="h-4 w-24 animate-pulse rounded bg-surface" />

        <div className="flex items-center gap-4">
          <div className="h-14 w-14 animate-pulse rounded-xl bg-surface" />
          <div className="space-y-2">
            <div className="h-6 w-48 animate-pulse rounded bg-surface" />
            <div className="h-4 w-64 animate-pulse rounded bg-surface" />
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-32 animate-pulse rounded-xl border border-border bg-surface" />
            ))}
          </div>
          <div className="h-64 animate-pulse rounded-xl border border-border bg-surface" />
        </div>
      </div>
    </Container>
  );
}