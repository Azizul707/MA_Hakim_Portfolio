"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container, Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/typography";
import { faq } from "@/content/shared";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Section className="bg-surface/20">
      <Container>
        <SectionHeading
          eyebrow="FAQ"
          title="Common Questions"
          description="Everything you need to know before we start."
        />

        <div className="mx-auto max-w-2xl space-y-3">
          {faq.map((item, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-xl border border-border transition-colors hover:border-accent/20"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between px-6 py-4 text-left text-sm font-medium transition-colors hover:text-accent sm:px-8 sm:py-5"
                aria-expanded={openIndex === i}
              >
                <span>{item.question}</span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300",
                    openIndex === i && "rotate-180"
                  )}
                />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="border-t border-border px-6 pb-5 pt-4 text-sm leading-relaxed text-muted-foreground sm:px-8">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
