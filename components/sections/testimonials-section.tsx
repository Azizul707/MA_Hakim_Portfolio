"use client";

import { motion } from "framer-motion";
import { Container, Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/typography";
import { testimonials } from "@/content/testimonials";
import { Quote } from "lucide-react";

export function TestimonialsSection() {
  return (
    <Section>
      <Container>
        <SectionHeading
          eyebrow="Testimonials"
          title="What Clients Say"
          description="Real feedback from business owners and operators who transformed their workflows."
        />

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.slice(0, 3).map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex flex-col rounded-xl border border-border bg-surface p-6 sm:p-8"
            >
              <Quote className="mb-4 h-6 w-6 text-accent/40" />
              <blockquote className="flex-1 text-sm leading-relaxed text-muted-foreground">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <div className="mt-5 border-t border-border pt-4">
                <p className="text-sm font-medium">{item.name}</p>
                <p className="text-xs text-muted-foreground">
                  {item.role}, {item.company}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
