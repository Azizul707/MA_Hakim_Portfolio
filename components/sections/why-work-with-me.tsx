"use client";

import { motion } from "framer-motion";
import { Container, Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/typography";
import { Check } from "lucide-react";

const highlights = [
  "Solutions designed around your workflow",
  "AI-powered automation using modern tools",
  "Clear communication throughout every project",
  "Reliable, scalable automation built for long-term use",
];

export function WhyWorkWithMe() {
  return (
    <Section className="bg-surface/20">
      <Container>
        <SectionHeading
          eyebrow="Why Work With Me"
          title="Practical Automation. Real Business Impact."
          description="I don't build automation just because it's possible. Every workflow starts with understanding how your business operates, where time is being wasted, and how technology can remove unnecessary work. The goal isn't adding more software. The goal is making your business easier to run."
        />

        <div className="mx-auto max-w-2xl">
          {highlights.map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex items-start gap-4 py-3"
            >
              <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                <Check className="h-3.5 w-3.5" />
              </div>
              <p className="text-base leading-relaxed text-muted-foreground">
                {item}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
