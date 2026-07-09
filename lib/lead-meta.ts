import type { LeadStatus, LeadPriority } from "@/types/portfolio-lead";

export const STATUS_VALUES = [
  "NEW",
  "CONTACTED",
  "QUALIFIED",
  "PROPOSAL",
  "WON",
  "LOST",
] as const;

export const PRIORITY_VALUES = [
  "LOW",
  "NORMAL",
  "HIGH",
  "URGENT",
] as const;

export const STATUS_ORDER: LeadStatus[] = [...STATUS_VALUES];

export const PRIORITY_ORDER: LeadPriority[] = [...PRIORITY_VALUES];

export const STATUS_LABELS: Record<LeadStatus, string> = {
  NEW: "New",
  CONTACTED: "Contacted",
  QUALIFIED: "Qualified",
  PROPOSAL: "Proposal",
  WON: "Won",
  LOST: "Lost",
};

export const PRIORITY_LABELS: Record<LeadPriority, string> = {
  LOW: "Low",
  NORMAL: "Normal",
  HIGH: "High",
  URGENT: "Urgent",
};

export const STATUS_VARIANTS: Record<LeadStatus, "default" | "secondary" | "outline" | "accent" | "destructive"> = {
  NEW: "secondary",
  CONTACTED: "default",
  QUALIFIED: "accent",
  PROPOSAL: "outline",
  WON: "default",
  LOST: "destructive",
};

export const PRIORITY_VARIANTS: Record<LeadPriority, "default" | "secondary" | "outline" | "accent" | "destructive"> = {
  LOW: "secondary",
  NORMAL: "default",
  HIGH: "outline",
  URGENT: "destructive",
};

export const STATUS_ICONS: Record<LeadStatus, string> = {
  NEW: "sparkles",
  CONTACTED: "mail",
  QUALIFIED: "check-circle-2",
  PROPOSAL: "file-text",
  WON: "trophy",
  LOST: "x-circle",
};

export const PRIORITY_ICONS: Record<LeadPriority, string> = {
  LOW: "arrow-down",
  NORMAL: "minus",
  HIGH: "arrow-up",
  URGENT: "alert-triangle",
};