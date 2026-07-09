import { SectionHeading } from "@/components/ui/typography";
import { Settings } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow="Configure"
        title="Settings"
        description="Manage your dashboard preferences"
        align="left"
      />

      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-surface/50 py-16 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface">
          <Settings className="h-6 w-6 text-muted-foreground" />
        </div>
        <h2 className="mt-4 font-display text-lg font-semibold">
          Settings coming soon
        </h2>
        <p className="mt-1 max-w-sm text-sm text-muted-foreground">
          Notification preferences, team access, and branding options will live here.
        </p>
      </div>
    </div>
  );
}