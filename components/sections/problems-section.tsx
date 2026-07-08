"use client";

import { motion } from "framer-motion";
import { Container, Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/typography";
import { Clock, FileText, AlertCircle, Unlink } from "lucide-react";

const problems = [
  {
    icon: <Clock className="h-5 w-5" />,
    title: "Slow Lead Response",
    description:
      "Potential customers expect immediate replies. Every minute you wait increases the chance they'll contact a competitor.",
  },
  {
    icon: <FileText className="h-5 w-5" />,
    title: "Repetitive Admin Work",
    description:
      "Your team spends valuable hours handling manual tasks that software can complete automatically.",
  },
  {
    icon: <AlertCircle className="h-5 w-5" />,
    title: "Missed Customer Opportunities",
    description:
      "Missed calls, forgotten follow-ups, and delayed responses quietly cost your business new revenue.",
  },
  {
    icon: <Unlink className="h-5 w-5" />,
    title: "Disconnected Systems",
    description:
      "Customer information scattered across different apps creates unnecessary work and increases mistakes.",
  },
];

export function ProblemsSection() {
  return (
    <Section>
      <Container>
        <SectionHeading
          eyebrow="Problems"
          title="Is Your Business Losing Time on Tasks That Should Be Automated?"
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {problems.map((problem, i) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group rounded-xl border border-border bg-surface p-6 transition-all duration-300 hover:border-accent/30 hover:shadow-sm sm:p-8"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                {problem.icon}
              </div>
              <h3 className="font-display text-lg font-semibold tracking-tight">
                {problem.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {problem.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
