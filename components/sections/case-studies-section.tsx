"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Container, Section } from "@/components/ui/container";
import { SectionHeading, Badge } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { caseStudies } from "@/content/case-studies";
import { ArrowRight, TrendingUp, Clock, DollarSign } from "lucide-react";

const metricIconMap: Record<string, React.ReactNode> = {
  "Lead Conversion": <TrendingUp className="h-3.5 w-3.5" />,
  "Response Time": <Clock className="h-3.5 w-3.5" />,
  "Monthly Revenue Lift": <DollarSign className="h-3.5 w-3.5" />,
  "Rating Recovery": <TrendingUp className="h-3.5 w-3.5" />,
  "Review Volume": <TrendingUp className="h-3.5 w-3.5" />,
  "After-Hours Bookings": <Clock className="h-3.5 w-3.5" />,
  "No-Show Rate": <TrendingUp className="h-3.5 w-3.5" />,
  "CSAT Improvement": <TrendingUp className="h-3.5 w-3.5" />,
};

export function CaseStudiesSection() {
  const featured = caseStudies.slice(0, 2);

  return (
    <Section>
      <Container>
        <SectionHeading
          eyebrow="Case Studies"
          title="From Business Problem to Business Solution."
          description="Every project begins with understanding the challenge—not choosing the technology. Each case study clearly presents the business problem, research, automation strategy, implementation, and business outcome."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {featured.map((study, i) => (
            <motion.div
              key={study.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link
                href={`/case-studies/${study.slug}`}
                className="group block rounded-xl border border-border bg-surface p-6 transition-all duration-300 hover:border-accent/30 hover:shadow-sm sm:p-8"
              >
                <Badge className="mb-3">{study.industry}</Badge>
                <h3 className="font-display text-xl font-semibold tracking-tight transition-colors group-hover:text-accent">
                  {study.title}
                </h3>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                  {study.problem}
                </p>

                {study.metrics && (
                  <div className="mt-5 flex flex-wrap gap-4 border-t border-border pt-5">
                    {study.metrics.map((metric) => (
                      <div key={metric.label} className="flex items-center gap-2">
                        <span className="text-accent">
                          {metricIconMap[metric.label] || <TrendingUp className="h-3.5 w-3.5" />}
                        </span>
                        <div>
                          <span className="font-display text-sm font-semibold">
                            {metric.value}
                          </span>
                          <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                            {metric.label}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-4 flex items-center gap-1 text-sm font-medium text-accent opacity-0 transition-opacity group-hover:opacity-100">
                  Read case study
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button asChild variant="secondary">
            <Link href="/projects">
              View All Projects
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
