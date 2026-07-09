import { Container } from "@/components/ui/container";

export default function LeadsLoading() {
  return (
    <Container>
      <div className="space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-7 w-20 animate-pulse rounded bg-surface" />
            <div className="h-5 w-8 animate-pulse rounded-full bg-surface" />
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex gap-3">
          <div className="h-8 w-48 animate-pulse rounded-lg bg-surface" />
          <div className="h-8 w-28 animate-pulse rounded-lg bg-surface" />
          <div className="h-8 w-28 animate-pulse rounded-lg bg-surface" />
          <div className="h-8 w-28 animate-pulse rounded-lg bg-surface" />
        </div>

        {/* Table skeleton */}
        <div className="overflow-hidden rounded-xl border border-border bg-surface">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className={`flex h-[52px] items-center border-b border-border px-4 last:border-0 ${
                i === 0 ? "bg-surface/80" : ""
              }`}
            >
              {i === 0 ? (
                <div className="flex w-full gap-4">
                  <div className="h-3 w-24 animate-pulse rounded bg-muted-foreground/10" />
                  <div className="h-3 w-20 animate-pulse rounded bg-muted-foreground/10" />
                  <div className="h-3 w-16 animate-pulse rounded bg-muted-foreground/10" />
                  <div className="h-3 w-16 animate-pulse rounded bg-muted-foreground/10" />
                  <div className="h-3 w-14 animate-pulse rounded bg-muted-foreground/10" />
                  <div className="h-3 w-20 animate-pulse rounded bg-muted-foreground/10" />
                </div>
              ) : (
                <div className="flex w-full items-center gap-3">
                  <div className="h-8 w-8 shrink-0 animate-pulse rounded-full bg-surface" />
                  <div className="flex-1 space-y-1.5">
                    <div className="h-3.5 w-36 animate-pulse rounded bg-muted-foreground/10" />
                    <div className="h-3 w-48 animate-pulse rounded bg-muted-foreground/10" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}