"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Container, Section } from "@/components/ui/container";
import { Badge, SectionHeading } from "@/components/ui/typography";
import { Tag } from "@/components/ui/tag";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Reusable image placeholder ────────────────────────────────────────

function ProjectImage({
  filename,
  alt,
  aspect = "16/9",
  className,
}: {
  filename: string;
  alt: string;
  aspect?: string;
  className?: string;
}) {
  const src = `/projects/hvac-lead-intelligence/${filename}`;
  const [hasImage, setHasImage] = useState(true);

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-border bg-surface",
        className
      )}
      style={{ aspectRatio: aspect }}
    >
      {hasImage ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setHasImage(false)}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-1 p-4 text-center text-xs text-muted-foreground">
          <span className="font-medium opacity-60">{filename}</span>
          <span className="opacity-40">{alt}</span>
        </div>
      )}
    </div>
  );
}

// ─── Section wrapper with scroll animation ─────────────────────────────

function AnimatedSection({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className={className}>{children}</div>
    </motion.div>
  );
}

// ─── Stat card for Section 3 ────────────────────────────────────────────

function StatCard({
  label,
  value,
  delay = 0,
}: {
  label: string;
  value: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay }}
      className="rounded-xl border border-border bg-surface p-5 text-center sm:p-6"
    >
      <p className="font-display text-2xl font-bold tracking-tight text-accent sm:text-3xl">
        {value}
      </p>
      <p className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
    </motion.div>
  );
}

// ─── Feature card for Section 6 ────────────────────────────────────────

function FeatureCard({
  title,
  filename,
  index,
}: {
  title: string;
  filename: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group rounded-xl border border-border bg-surface p-6 transition-all duration-300 hover:border-accent/30 hover:shadow-sm sm:p-8"
    >
      <ProjectImage
        filename={filename}
        alt={title}
        aspect="4/3"
        className="mb-4"
      />
      <h3 className="font-display text-base font-semibold tracking-tight">
        {title}
      </h3>
    </motion.div>
  );
}

// ─── Benefit card for Section 7 ────────────────────────────────────────

function BenefitCard({
  text,
  index,
}: {
  text: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="flex items-start gap-3 rounded-xl border border-border bg-surface p-5 sm:p-6"
    >
      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
        <Check className="h-3.5 w-3.5" />
      </div>
      <p className="text-sm leading-relaxed text-muted-foreground">{text}</p>
    </motion.div>
  );
}

// ─── Ideal client card for Section 11 ──────────────────────────────────

function IdealClientCard({
  name,
  index,
}: {
  name: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className="rounded-xl border border-border bg-surface px-6 py-4 text-center text-sm font-medium text-foreground transition-all duration-300 hover:border-accent/30"
    >
      {name}
    </motion.div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────

export default function HvacLeadIntelligencePage() {
  return (
    <>
      <Navbar />
      <main>
        {/* ─── Section 1: Hero ───────────────────────────────────── */}
        <section className="relative flex min-h-[80vh] items-center overflow-hidden pt-24">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />

          <Container className="relative z-10 w-full py-12">
            <Link
              href="/projects"
              className="mb-10 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Projects
            </Link>

            <AnimatedSection>
              <ProjectImage
                filename="cover.webp"
                alt="HVAC Lead Intelligence dashboard overview"
                aspect="16/9"
                className="mb-10"
              />
            </AnimatedSection>

            <div className="mx-auto max-w-4xl">
              <AnimatedSection delay={0.1}>
                <Badge className="mb-4">HVAC</Badge>
                <h1 className="font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
                  HVAC Lead Intelligence
                </h1>
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <p className="mt-5 text-lg leading-relaxed text-muted-foreground sm:text-xl">
                  A private AI-powered Lead Management System built specifically
                  for HVAC and local service businesses to organize leads,
                  prioritize opportunities, and streamline dispatcher operations.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.3}>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button asChild size="lg">
                    <Link href="/contact">
                      Live Project
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </AnimatedSection>
            </div>
          </Container>
        </section>

        {/* ─── Section 2: Business Challenge ─────────────────────── */}
        <Section>
          <Container>
            <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-2 md:gap-16">
              <AnimatedSection>
                <ProjectImage
                  filename="problem-overview.webp"
                  alt="Illustration of manual lead workflow challenges"
                  aspect="4/3"
                />
              </AnimatedSection>

              <AnimatedSection delay={0.15}>
                <Badge className="mb-4">The Problem</Badge>
                <h2 className="font-display text-2xl font-semibold leading-tight tracking-tight sm:text-3xl md:text-4xl">
                  Business Challenge
                </h2>
                <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  <p>
                    Most HVAC companies invest heavily in marketing to generate
                    leads.
                  </p>
                  <p>
                    The real challenge begins after the lead arrives.
                  </p>
                  <p>
                    Without a structured operational workflow, inquiries can sit
                    unanswered, follow-ups are forgotten, customer information
                    becomes scattered, and managers lose visibility into the
                    sales pipeline.
                  </p>
                  <p className="font-medium text-foreground">
                    Marketing generates opportunities. Operations determine
                    whether those opportunities become revenue.
                  </p>
                </div>
              </AnimatedSection>
            </div>
          </Container>
        </Section>

        {/* ─── Section 3: Why This Problem Matters ───────────────── */}
        <Section className="bg-surface/20">
          <Container>
            <div className="mx-auto max-w-5xl">
              <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
                <AnimatedSection>
                  <ProjectImage
                    filename="lead-loss-statistics.webp"
                    alt="Industry benchmark data showing impact of poor lead handling"
                    aspect="4/3"
                  />
                </AnimatedSection>

                <AnimatedSection delay={0.15}>
                  <Badge className="mb-4">Why It Matters</Badge>
                  <h2 className="font-display text-2xl font-semibold leading-tight tracking-tight sm:text-3xl md:text-4xl">
                    Why This Problem Matters
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    Every lead that arrives without a structured response
                    process represents potential revenue left on the table. The
                    gap between marketing spend and operational follow-through
                    is where most service businesses lose opportunities.
                  </p>
                </AnimatedSection>
              </div>

              <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                <StatCard label="Marketing Spend" value="High" delay={0} />
                <StatCard label="Lead Response" value="Slow" delay={0.05} />
                <StatCard
                  label="Follow-up Consistency"
                  value="Low"
                  delay={0.1}
                />
                <StatCard
                  label="Dispatcher Productivity"
                  value="Strained"
                  delay={0.15}
                />
                <StatCard
                  label="Missed Opportunities"
                  value="Frequent"
                  delay={0.2}
                />
              </div>

              <p className="mt-6 text-center text-xs text-muted-foreground">
                Operational improvements depend on each company&apos;s specific
                processes and execution.
              </p>
            </div>
          </Container>
        </Section>

        {/* ─── Section 4: Solution Overview ──────────────────────── */}
        <Section>
          <Container>
            <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-2 md:gap-16">
              <AnimatedSection>
                <ProjectImage
                  filename="system-overview.webp"
                  alt="High-level system architecture diagram"
                  aspect="4/3"
                />
              </AnimatedSection>

              <AnimatedSection delay={0.15}>
                <Badge className="mb-4">Solution</Badge>
                <h2 className="font-display text-2xl font-semibold leading-tight tracking-tight sm:text-3xl md:text-4xl">
                  Solution Overview
                </h2>
                <p className="mt-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  This is not a traditional CRM. It combines AI, workflow
                  automation, dispatcher tools, analytics, and lead management
                  into one operational system designed to transform how service
                  businesses handle every stage of the customer journey.
                </p>
              </AnimatedSection>
            </div>
          </Container>
        </Section>

        {/* ─── Section 5: How the System Works ───────────────────── */}
        <Section className="bg-surface/20">
          <Container>
            <div className="mx-auto max-w-4xl">
              <SectionHeading
                eyebrow="Process"
                title="How the System Works"
                description="Six integrated stages that turn every inquiry into an organized, actionable opportunity."
              />

              <div className="space-y-10 md:space-y-14">
                {[
                  {
                    step: "01",
                    title: "Customer submits an inquiry.",
                    filename: "step-01-new-lead.webp",
                  },
                  {
                    step: "02",
                    title:
                      "AI evaluates the lead and generates score, priority, and recommended action.",
                    filename: "step-02-ai-analysis.webp",
                  },
                  {
                    step: "03",
                    title:
                      "Dispatcher immediately sees new leads inside the dashboard.",
                    filename: "step-03-dashboard.webp",
                  },
                  {
                    step: "04",
                    title:
                      "Office staff manages customer communication, notes, reminders, and appointments.",
                    filename: "step-04-workspace.webp",
                  },
                  {
                    step: "05",
                    title:
                      "Visual CRM pipeline tracks every lead from inquiry to completed job.",
                    filename: "step-05-pipeline.webp",
                  },
                  {
                    step: "06",
                    title:
                      "Management monitors trends, conversions, demand, and operational performance.",
                    filename: "step-06-analytics.webp",
                  },
                ].map((step, i) => (
                  <AnimatedSection key={step.step} delay={i * 0.08}>
                    <div className="grid items-center gap-6 md:grid-cols-2 md:gap-12">
                      <div className={i % 2 === 1 ? "md:order-2" : ""}>
                        <ProjectImage
                          filename={step.filename}
                          alt={step.title}
                          aspect="4/3"
                        />
                      </div>
                      <div className={i % 2 === 1 ? "md:order-1" : ""}>
                        <p className="font-display text-3xl font-bold text-accent/30 sm:text-4xl">
                          {step.step}
                        </p>
                        <h3 className="mt-2 font-display text-xl font-semibold tracking-tight sm:text-2xl">
                          {step.title}
                        </h3>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </Container>
        </Section>

        {/* ─── Section 6: Feature Showcase ───────────────────────── */}
        <Section>
          <Container>
            <SectionHeading
              eyebrow="Features"
              title="Feature Showcase"
              description="Every component designed to support your daily operations."
            />

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                title="AI Lead Qualification"
                filename="feature-ai-qualification.webp"
                index={0}
              />
              <FeatureCard
                title="Dispatcher Dashboard"
                filename="feature-dashboard.webp"
                index={1}
              />
              <FeatureCard
                title="CRM Pipeline"
                filename="feature-pipeline.webp"
                index={2}
              />
              <FeatureCard
                title="Appointment Management"
                filename="feature-appointments.webp"
                index={3}
              />
              <FeatureCard
                title="Analytics Dashboard"
                filename="feature-analytics.webp"
                index={4}
              />
              <FeatureCard
                title="Follow-up Reminders"
                filename="feature-followup.webp"
                index={5}
              />
            </div>
          </Container>
        </Section>

        {/* ─── Section 7: Expected Operational Benefits ──────────── */}
        <Section className="bg-surface/20">
          <Container>
            <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-2 md:gap-16">
              <AnimatedSection>
                <ProjectImage
                  filename="business-impact.webp"
                  alt="Operational benefits summary graphic"
                  aspect="4/3"
                />
              </AnimatedSection>

              <AnimatedSection delay={0.15}>
                <Badge className="mb-4">Impact</Badge>
                <h2 className="font-display text-2xl font-semibold leading-tight tracking-tight sm:text-3xl md:text-4xl">
                  Expected Operational Benefits
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  The system is designed to support measurable improvements in
                  daily operations. Actual results depend on each company&apos;s
                  processes, team adoption, and market conditions.
                </p>
              </AnimatedSection>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <BenefitCard
                text="Respond to inquiries faster"
                index={0}
              />
              <BenefitCard
                text="Reduce missed follow-ups"
                index={1}
              />
              <BenefitCard
                text="Keep every lead organized"
                index={2}
              />
              <BenefitCard
                text="Improve dispatcher efficiency"
                index={3}
              />
              <BenefitCard
                text="Increase operational visibility"
                index={4}
              />
              <BenefitCard
                text="Prioritize high-value opportunities"
                index={5}
              />
            </div>
          </Container>
        </Section>

        {/* ─── Section 8: Business Scenario ───────────────────────── */}
        <Section>
          <Container>
            <div className="mx-auto max-w-4xl">
              <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
                <AnimatedSection>
                  <ProjectImage
                    filename="revenue-example.webp"
                    alt="Revenue scenario calculation visual"
                    aspect="4/3"
                  />
                </AnimatedSection>

                <AnimatedSection delay={0.15}>
                  <Badge className="mb-4">Scenario</Badge>
                  <h2 className="font-display text-2xl font-semibold leading-tight tracking-tight sm:text-3xl md:text-4xl">
                    What Better Lead Management Could Mean
                  </h2>

                  <div className="mt-6 space-y-3">
                    <div className="flex items-center justify-between border-b border-border pb-2 text-sm">
                      <span className="text-muted-foreground">
                        Monthly leads
                      </span>
                      <span className="font-display font-semibold">150</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-border pb-2 text-sm">
                      <span className="text-muted-foreground">
                        Additional completed jobs
                      </span>
                      <span className="font-display font-semibold text-accent">
                        2
                      </span>
                    </div>
                    <div className="flex items-center justify-between border-b border-border pb-2 text-sm">
                      <span className="text-muted-foreground">
                        Average ticket
                      </span>
                      <span className="font-display font-semibold">
                        $1,500
                      </span>
                    </div>
                    <div className="flex items-center justify-between border-b border-border pb-2 text-sm">
                      <span className="text-muted-foreground">
                        Potential additional monthly revenue
                      </span>
                      <span className="font-display text-lg font-bold text-accent">
                        $3,000
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-1 text-sm">
                      <span className="font-medium text-foreground">
                        Potential annual opportunity
                      </span>
                      <span className="font-display text-xl font-bold text-accent">
                        $36,000
                      </span>
                    </div>
                  </div>

                  <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
                    This is an illustrative scenario based on typical service
                    business performance. Actual revenue impact depends on your
                    specific market, pricing, operations, and execution. This is
                    not a guaranteed result.
                  </p>
                </AnimatedSection>
              </div>
            </div>
          </Container>
        </Section>

        {/* ─── Section 9: Technology Stack ────────────────────────── */}
        <Section className="bg-surface/20">
          <Container>
            <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-2 md:gap-16">
              <AnimatedSection>
                <ProjectImage
                  filename="tech-stack.webp"
                  alt="Technology stack overview"
                  aspect="4/3"
                />
              </AnimatedSection>

              <AnimatedSection delay={0.15}>
                <Badge className="mb-4">Technology</Badge>
                <h2 className="font-display text-2xl font-semibold leading-tight tracking-tight sm:text-3xl md:text-4xl">
                  Technology Stack
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  The right tools selected for reliability, scalability, and
                  business value. Technology remains secondary to the operational
                  outcome.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {[
                    "Next.js",
                    "TypeScript",
                    "Tailwind",
                    "Supabase",
                    "n8n",
                    "OpenAI",
                    "ElevenLabs",
                  ].map((tech) => (
                    <Tag key={tech}>{tech}</Tag>
                  ))}
                </div>
              </AnimatedSection>
            </div>
          </Container>
        </Section>

        {/* ─── Section 10: Deployment Model ───────────────────────── */}
        <Section>
          <Container>
            <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-2 md:gap-16">
              <AnimatedSection>
                <ProjectImage
                  filename="private-deployment.webp"
                  alt="Private deployment architecture"
                  aspect="4/3"
                />
              </AnimatedSection>

              <AnimatedSection delay={0.15}>
                <Badge className="mb-4">Deployment</Badge>
                <h2 className="font-display text-2xl font-semibold leading-tight tracking-tight sm:text-3xl md:text-4xl">
                  Deployment Model
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  Every deployment is a private, client-owned infrastructure.
                  No shared environments. No vendor lock-in.
                </p>

                <ul className="mt-6 space-y-3">
                  {[
                    "Private Database",
                    "Private Server",
                    "Private AI Configuration",
                    "Private Automation",
                    "Client Ownership",
                  ].map((item, i) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.35, delay: i * 0.06 }}
                      className="flex items-center gap-3 text-sm text-muted-foreground"
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-semibold text-accent">
                        {i + 1}
                      </span>
                      {item}
                    </motion.li>
                  ))}
                </ul>

                <div className="mt-6 grid grid-cols-2 gap-2 rounded-xl border border-border bg-surface p-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent/60" />
                    No shared infrastructure
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent/60" />
                    No vendor lock-in
                  </span>
                </div>
              </AnimatedSection>
            </div>
          </Container>
        </Section>

        {/* ─── Section 11: Who This Solution Is For ───────────────── */}
        <Section className="bg-surface/20">
          <Container>
            <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-2 md:gap-16">
              <AnimatedSection>
                <ProjectImage
                  filename="ideal-client.webp"
                  alt="Ideal customer profile"
                  aspect="4/3"
                />
              </AnimatedSection>

              <AnimatedSection delay={0.15}>
                <Badge className="mb-4">Ideal Client</Badge>
                <h2 className="font-display text-2xl font-semibold leading-tight tracking-tight sm:text-3xl md:text-4xl">
                  Who This Solution Is For
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  Designed for local service businesses that manage high volumes
                  of customer inquiries and need a structured system to handle
                  leads, dispatch, and follow-through.
                </p>
              </AnimatedSection>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {[
                "HVAC",
                "Electrical",
                "Plumbing",
                "Cleaning",
                "Garage Doors",
                "Roofing",
              ].map((client, i) => (
                <IdealClientCard key={client} name={client} index={i} />
              ))}
            </div>

            <p className="mt-6 text-center text-xs text-muted-foreground">
              Plus other local service businesses with similar operational needs.
            </p>
          </Container>
        </Section>

        {/* ─── Section 12: Final CTA ──────────────────────────────── */}
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
                <ProjectImage
                  filename="contact-cta.webp"
                  alt="Contact CTA"
                  aspect="16/9"
                  className="mx-auto mb-8 max-w-md"
                />

                <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
                  Could a Similar System Improve Your Business?
                </h2>
                <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
                  Every business has different workflows. Let&apos;s discuss how
                  automation can help your team respond faster, reduce repetitive
                  work, and manage every opportunity more efficiently.
                </p>

                <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <Button asChild size="lg">
                    <Link href="/contact">
                      Tell Me About Your Business
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="secondary" size="lg">
                    <Link href="/projects">Explore More Projects</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
