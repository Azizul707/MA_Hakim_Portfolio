"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Container, Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { services } from "@/content/services";
import { ArrowRight, Zap, Workflow, MessageSquare, Star, BarChart3, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ReactNode> = {
  Zap: <Zap className="h-5 w-5" />,
  Workflow: <Workflow className="h-5 w-5" />,
  MessageSquare: <MessageSquare className="h-5 w-5" />,
  Star: <Star className="h-5 w-5" />,
  BarChart3: <BarChart3 className="h-5 w-5" />,
  Cpu: <Cpu className="h-5 w-5" />,
};

export function ServicesSection({
  featured,
}: {
  featured?: boolean;
}) {
  const items = featured ? services.slice(0, 3) : services;

  return (
    <Section>
      <Container>
        <SectionHeading
          eyebrow="Solutions"
          title="Automation Designed Around Your Business."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group rounded-xl border border-border bg-surface p-6 transition-all duration-300 hover:border-accent/30 hover:shadow-sm sm:p-8"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                {iconMap[service.icon] || <Zap className="h-5 w-5" />}
              </div>
              <h3 className="font-display text-lg font-semibold tracking-tight">
                {service.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {service.description}
              </p>
              <ul className="mt-4 space-y-2">
                {service.features.slice(0, 3).map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-xs text-muted-foreground"
                  >
                    <span className="mt-0.5 h-1 w-1 rounded-full bg-accent/60" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {featured && (
          <div className="mt-10 text-center">
            <Button asChild variant="secondary">
              <Link href="/services">
                View All Services
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        )}
      </Container>
    </Section>
  );
}
