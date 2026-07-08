import { z } from "zod";

export const leadFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters.")
    .max(200, "Name must be under 200 characters."),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address."),
  business_name: z
    .string()
    .trim()
    .min(1, "Business name is required.")
    .max(300, "Business name must be under 300 characters."),
  industry: z
    .string()
    .trim()
    .min(1, "Industry is required.")
    .max(200, "Industry must be under 200 characters."),
  website: z
    .string()
    .trim()
    .url("Please enter a valid URL.")
    .optional()
    .or(z.literal("")),
  current_challenge: z
    .string()
    .trim()
    .min(1, "Current challenge is required.")
    .max(2000, "Challenge must be under 2000 characters."),
  project_goal: z
    .string()
    .trim()
    .min(1, "Project goal is required.")
    .max(2000, "Project goal must be under 2000 characters."),
  budget: z
    .string()
    .trim()
    .max(200, "Budget must be under 200 characters.")
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters.")
    .max(5000, "Message must be under 5000 characters."),
  source_page: z.string().trim().optional().or(z.literal("")),
});

export type LeadFormSchema = z.infer<typeof leadFormSchema>;
