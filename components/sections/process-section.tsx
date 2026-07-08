"use client";

import { motion } from "framer-motion";
import { Container, Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/typography";
import { processSteps } from "@/content/shared";
import { cn } from "@/lib/utils";

export function ProcessSection() {
  return (
    <Section className="bg-surface/20">
      <Container>
        <SectionHeading
          eyebrow="Process"
          title="How We Work Together"
        />

        <div className="relative">
          <div className="absolute left-[19px] top-0 hidden h-full w-px bg-border md:block" />

          <div className="space-y-8 md:space-y-12">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative flex flex-col gap-4 md:flex-row md:gap-8"
              >
                <div className="flex items-start md:w-24 md:pt-0">
                  <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-xs font-semibold tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                </div>

                <div className="flex-1 rounded-xl border border-border bg-surface p-6 transition-all duration-300 hover:border-accent/20 sm:p-8">
                  <h3 className="font-display text-lg font-semibold tracking-tight">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
