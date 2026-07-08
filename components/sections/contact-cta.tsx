"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Container, Section } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageSquare, Mail } from "lucide-react";
import { LinkedInIcon } from "@/components/ui/linkedin-icon";

const contactOptions = [
  {
    icon: <Mail className="h-4 w-4" />,
    label: "Email",
    href: "mailto:arafinazizul@gmail.com",
  },
  {
    icon: <LinkedInIcon className="h-4 w-4" />,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/azizul-hakim-2ai-automation-expert/",
  },
];

export function ContactCTA() {
  return (
    <Section>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-surface to-background p-8 text-center sm:p-12 md:p-16"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)",
              backgroundSize: "30px 30px",
            }}
          />

          <div className="relative z-10">
            <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
              <MessageSquare className="h-6 w-6" />
            </div>

            <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
              Ready to Make Your Business Run More Efficiently?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
              Let&apos;s explore how AI automation can help you reduce repetitive work, improve response times, and create a better experience for your customers.
            </p>

            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg">
                <Link href="/contact">
                  Tell Me About Your Business
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>

              <div className="flex items-center gap-3">
                {contactOptions.map((option) => (
                  <Button
                    key={option.label}
                    asChild
                    variant="secondary"
                    size="sm"
                  >
                    <a
                      href={option.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {option.icon}
                      {option.label}
                    </a>
                  </Button>
                ))}
              </div>
            </div>

            <p className="mt-6 text-xs text-muted-foreground">
              No pressure. No obligation. Just a conversation about your business and how automation might help.
            </p>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
