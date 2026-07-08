"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/typography";

const metrics = [
  {
    value: "Lead Response",
    description: "Respond in seconds instead of hours.",
  },
  {
    value: "Manual Work",
    description: "Reduce repetitive administrative tasks.",
  },
  {
    value: "Custom Solutions",
    description: "Built specifically for your business.",
  },
];

export function TrustMetrics() {
  return (
    <section className="border-y border-border bg-surface/30">
      <Container className="py-16 md:py-20">
        <SectionHeading
          title="Trusted Automation. Built Around Real Business Needs."
          description="Every business operates differently. That's why I don't sell one-size-fits-all automation. I analyze your workflow, identify repetitive tasks, and design automation that fits how your business already works without disrupting your operations."
        />

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {metrics.map((metric, i) => (
            <motion.div
              key={metric.value}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <p className="font-display text-xl font-semibold tracking-tight sm:text-2xl">
                {metric.value}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {metric.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
