"use client";

import { useState, useTransition, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Check, AlertCircle, Save } from "lucide-react";
import { updateLeadAction } from "@/lib/actions/leads";
import type { PortfolioLead, LeadStatus, LeadPriority } from "@/types/portfolio-lead";
import {
  STATUS_VALUES,
  PRIORITY_VALUES,
  STATUS_LABELS,
  PRIORITY_LABELS,
} from "@/lib/lead-meta";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LeadDetailClientProps {
  leadId: string;
  initialLead: PortfolioLead;
}

export function LeadDetailClient({ leadId, initialLead }: LeadDetailClientProps) {
  const [status, setStatus] = useState<LeadStatus>(initialLead.status);
  const [priority, setPriority] = useState<LeadPriority>(initialLead.priority);
  const [notes, setNotes] = useState(initialLead.notes || "");
  const [isPending, startTransition] = useTransition();
  const [flash, setFlash] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Clear flash after 3s
  useEffect(() => {
    if (!flash) return;
    const t = setTimeout(() => setFlash(null), 3000);
    return () => clearTimeout(t);
  }, [flash]);

  const handleSave = () => {
    startTransition(async () => {
      const result = await updateLeadAction(leadId, {
        status,
        priority,
        notes: notes.trim() || undefined,
      });

      if (result.success) {
        setFlash({ type: "success", message: "Changes saved successfully." });
      } else {
        setFlash({ type: "error", message: result.message });
      }
    });
  };

  const isDirty =
    status !== initialLead.status ||
    priority !== initialLead.priority ||
    notes.trim() !== (initialLead.notes || "").trim();

  return (
    <div className="rounded-xl border border-border bg-surface p-5">
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
        Update Lead
      </h2>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="status"
            className="mb-1.5 block text-sm font-medium"
          >
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value as LeadStatus)}
            className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-accent/50 focus:ring-1 focus:ring-accent/30"
          >
            {STATUS_VALUES.map((s) => (
              <option key={s} value={s}>
                {STATUS_LABELS[s]}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="priority"
            className="mb-1.5 block text-sm font-medium"
          >
            Priority
          </label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value as LeadPriority)}
            className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-accent/50 focus:ring-1 focus:ring-accent/30"
          >
            {PRIORITY_VALUES.map((p) => (
              <option key={p} value={p}>
                {PRIORITY_LABELS[p]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4">
        <label
          htmlFor="notes"
          className="mb-1.5 block text-sm font-medium"
        >
          Internal Notes
        </label>
        <textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={4}
          placeholder="Add private notes about this lead..."
          className="w-full resize-y rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-accent/50 focus:ring-1 focus:ring-accent/30"
        />
      </div>

      <div className="mt-4 flex items-center gap-3">
        <Button
          onClick={handleSave}
          disabled={isPending || !isDirty}
          size="sm"
        >
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              Save changes
            </>
          )}
        </Button>

        <AnimatePresence>
          {flash && (
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              className={cn(
                "flex items-center gap-1.5 text-sm",
                flash.type === "success" ? "text-emerald-500" : "text-red-500"
              )}
              role="status"
            >
              {flash.type === "success" ? (
                <Check className="h-4 w-4" />
              ) : (
                <AlertCircle className="h-4 w-4" />
              )}
              {flash.message}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}