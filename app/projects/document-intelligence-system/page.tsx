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
  const src = `/projects/document-intelligence-system/${filename}`;
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

// ─── Stat card for Business Scenario ───────────────────────────────────

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

// ─── Feature card for Feature Showcase ─────────────────────────────────

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

// ─── Benefit card for Expected Operational Benefits & Why This Matters ─

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

// ─── Issue card for Why This Matters ───────────────────────────────────

function IssueCard({
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
        <span className="h-2 w-2 rounded-full bg-accent/70" />
      </div>
      <p className="text-sm leading-relaxed text-muted-foreground">{text}</p>
    </motion.div>
  );
}

// ─── Industry card for Target Industries ───────────────────────────────

function IndustryCard({
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

export default function DocumentIntelligenceSystemPage() {
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
                alt="Document Intelligence System dashboard overview"
                aspect="16/9"
                className="mb-10"
              />
            </AnimatedSection>

            <div className="mx-auto max-w-4xl">
              <AnimatedSection delay={0.1}>
                <Badge className="mb-4">Enterprise</Badge>
                <h1 className="font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
                  Document Intelligence System
                </h1>
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <p className="mt-5 text-lg leading-relaxed text-muted-foreground sm:text-xl">
                  An AI-powered document processing platform that automatically
                  extracts information, validates business rules, detects
                  financial risks, and routes documents through intelligent
                  approval workflows.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.3}>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button asChild size="lg">
                    <Link href="https://document-intelligence-demo.vercel.app" target="_blank" rel="noopener noreferrer">
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
                  filename="hero-dashboard.webp"
                  alt="Document processing challenges overview"
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
                    Growing businesses process hundreds of invoices, purchase
                    orders, contracts, receipts, and supplier documents every
                    month.
                  </p>
                  <p>
                    Most organizations still rely on manual review, repetitive
                    data entry, and disconnected approval processes.
                  </p>
                  <p>
                    As document volume increases, teams spend more time
                    reviewing paperwork than making business decisions.
                  </p>
                  <p className="font-medium text-foreground">
                    The result is slower operations, higher administrative
                    costs, approval delays, and an increased risk of costly
                    human errors.
                  </p>
                </div>
              </AnimatedSection>
            </div>
          </Container>
        </Section>

        {/* ─── Section 3: Why This Matters ───────────────────────── */}
        <Section className="bg-surface/20">
          <Container>
            <div className="mx-auto max-w-5xl">
              <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
                <AnimatedSection>
                  <ProjectImage
                    filename="business-impact.webp"
                    alt="Operational cost of manual document processing"
                    aspect="4/3"
                  />
                </AnimatedSection>

                <AnimatedSection delay={0.15}>
                  <Badge className="mb-4">Why It Matters</Badge>
                  <h2 className="font-display text-2xl font-semibold leading-tight tracking-tight sm:text-3xl md:text-4xl">
                    Why This Matters
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    Manual document processing creates hidden operational costs
                    that compound as a business grows. Every paper-based
                    approval, manually entered invoice, and unchecked data point
                    introduces delay and risk into the financial workflow.
                  </p>
                </AnimatedSection>
              </div>

              <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <IssueCard text="Manual administrative workload" index={0} />
                <IssueCard text="Approval delays" index={1} />
                <IssueCard text="Duplicate payments" index={2} />
                <IssueCard text="Compliance risks" index={3} />
                <IssueCard text="Limited operational visibility" index={4} />
              </div>

              <p className="mt-6 text-center text-xs text-muted-foreground">
                Intelligent document processing is designed to reduce these
                risks. Actual improvements depend on document complexity,
                team adoption, and existing business processes.
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
                  filename="workflow-overview.webp"
                  alt="End-to-end document intelligence workflow diagram"
                  aspect="4/3"
                />
              </AnimatedSection>

              <AnimatedSection delay={0.15}>
                <Badge className="mb-4">Solution</Badge>
                <h2 className="font-display text-2xl font-semibold leading-tight tracking-tight sm:text-3xl md:text-4xl">
                  Solution Overview
                </h2>
                <p className="mt-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  This is not just OCR software. The platform understands
                  documents, applies business logic, identifies exceptions, and
                  automates approvals from a single workspace.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {[
                    "AI",
                    "OCR",
                    "Business Rule Validation",
                    "Risk Detection",
                    "Workflow Automation",
                    "ERP Integration",
                    "Analytics",
                  ].map((item) => (
                    <Tag key={item}>{item}</Tag>
                  ))}
                </div>
              </AnimatedSection>
            </div>
          </Container>
        </Section>

        {/* ─── Section 5: Platform Walkthrough ───────────────────── */}
        <Section className="bg-surface/20">
          <Container>
            <div className="mx-auto max-w-4xl">
              <SectionHeading
                eyebrow="Platform"
                title="Platform Walkthrough"
                description="Eight connected stages that transform incoming documents from unstructured data into approved, synced business records."
              />

              <div className="space-y-10 md:space-y-14">
                {[
                  {
                    step: "01",
                    title: "Document Intake",
                    body: "Documents arrive through email, uploads, cloud storage, ERP integrations, or APIs.",
                    filename: "document-intake.webp",
                  },
                  {
                    step: "02",
                    title: "OCR & AI Extraction",
                    body: "AI extracts structured information including vendors, invoice numbers, dates, payment terms, tax values, totals, and line items.",
                    filename: "ocr-extraction.webp",
                  },
                  {
                    step: "03",
                    title: "Document Classification",
                    body: "The system automatically identifies document types such as invoices, purchase orders, contracts, receipts, quotations, and delivery notes.",
                    filename: "classification.webp",
                  },
                  {
                    step: "04",
                    title: "Business Rule Validation",
                    body: "Every document is automatically validated against predefined business rules, including duplicate detection, purchase order matching, tax validation, vendor verification, and approval policies.",
                    filename: "validation-engine.webp",
                  },
                  {
                    step: "05",
                    title: "AI Risk Analysis",
                    body: "Documents receive a risk score based on financial, operational, and compliance indicators. Low-risk documents continue automatically. High-risk documents are routed for human review.",
                    filename: "risk-analysis.webp",
                  },
                  {
                    step: "06",
                    title: "Approval Workflow",
                    body: "Approval routing is fully automated according to company policies, approval limits, and document risk levels.",
                    filename: "approval-workflow.webp",
                  },
                  {
                    step: "07",
                    title: "ERP Integration",
                    body: "Approved documents synchronize automatically with accounting and ERP systems, reducing manual data entry.",
                    filename: "erp-integration.webp",
                  },
                  {
                    step: "08",
                    title: "Executive Dashboard",
                    body: "Management gains visibility into document volume, processing performance, approval bottlenecks, AI accuracy, vendor analytics, and operational trends.",
                    filename: "analytics-dashboard.webp",
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
                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                          {step.body}
                        </p>
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
              description="Every capability works together to turn documents into actionable, approved business records."
            />

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                title="AI Data Extraction"
                filename="feature-ocr.webp"
                index={0}
              />
              <FeatureCard
                title="Business Rule Validation"
                filename="feature-validation.webp"
                index={1}
              />
              <FeatureCard
                title="AI Risk Detection"
                filename="feature-risk.webp"
                index={2}
              />
              <FeatureCard
                title="Approval Automation"
                filename="feature-approval.webp"
                index={3}
              />
              <FeatureCard
                title="Executive Dashboard"
                filename="feature-dashboard.webp"
                index={4}
              />
            </div>
          </Container>
        </Section>

        {/* ─── Section 7: Expected Operational Benefits ──────────── */}
        <Section className="bg-surface/20">
          <Container>
            <div className="mx-auto max-w-5xl">
              <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
                <AnimatedSection>
                  <ProjectImage
                    filename="business-impact.webp"
                    alt="Expected operational improvements from document automation"
                    aspect="4/3"
                  />
                </AnimatedSection>

                <AnimatedSection delay={0.15}>
                  <Badge className="mb-4">Impact</Badge>
                  <h2 className="font-display text-2xl font-semibold leading-tight tracking-tight sm:text-3xl md:text-4xl">
                    Expected Operational Benefits
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    The platform is designed to support measurable improvements
                    in document processing operations. Actual results depend on
                    document complexity, team adoption, and existing business
                    processes.
                  </p>
                </AnimatedSection>
              </div>

              <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <BenefitCard
                  text="Reduce repetitive document processing"
                  index={0}
                />
                <BenefitCard
                  text="Accelerate approval workflows"
                  index={1}
                />
                <BenefitCard
                  text="Detect duplicate invoices earlier"
                  index={2}
                />
                <BenefitCard
                  text="Improve financial compliance"
                  index={3}
                />
                <BenefitCard
                  text="Reduce manual data entry"
                  index={4}
                />
                <BenefitCard
                  text="Increase operational visibility"
                  index={5}
                />
                <BenefitCard
                  text="Support business growth without proportional administrative overhead"
                  index={6}
                />
              </div>
            </div>
          </Container>
        </Section>

        {/* ─── Section 8: Business Scenario ──────────────────────── */}
        <Section>
          <Container>
            <div className="mx-auto max-w-4xl">
              <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
                <AnimatedSection>
                  <ProjectImage
                    filename="business-impact.webp"
                    alt="Document processing impact scenario"
                    aspect="4/3"
                  />
                </AnimatedSection>

                <AnimatedSection delay={0.15}>
                  <Badge className="mb-4">Scenario</Badge>
                  <h2 className="font-display text-2xl font-semibold leading-tight tracking-tight sm:text-3xl md:text-4xl">
                    Example Operational Impact
                  </h2>
                </AnimatedSection>
              </div>

              <div className="mt-8 space-y-4">
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
                  <StatCard label="Monthly Documents" value="1,000" delay={0} />
                  <StatCard label="Manual Processing" value="Several min" delay={0.05} />
                  <StatCard label="AI Processing" value="Automatic" delay={0.1} />
                  <StatCard label="Employee Review" value="Exceptions only" delay={0.15} />
                  <StatCard label="Outcome" value="Faster ops" delay={0.2} />
                </div>
              </div>

              <p className="mt-6 text-center text-xs text-muted-foreground">
                This is an illustrative example. Actual outcomes depend on
                business processes, document complexity, team adoption, and
                implementation scope. This is not a guaranteed result.
              </p>
            </div>
          </Container>
        </Section>

        {/* ─── Section 9: Target Industries ──────────────────────── */}
        <Section className="bg-surface/20">
          <Container>
            <div className="mx-auto max-w-4xl">
              <SectionHeading
                eyebrow="Industries"
                title="Target Industries"
                description="Any organization that processes high volumes of supplier documents, financial paperwork, or operational records."
              />

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {[
                  "Manufacturing",
                  "Construction",
                  "HVAC",
                  "Healthcare",
                  "Logistics",
                  "Wholesale Distribution",
                  "Engineering",
                  "Retail",
                  "Property Management",
                  "Professional Services",
                ].map((industry, i) => (
                  <IndustryCard key={industry} name={industry} index={i} />
                ))}
              </div>
            </div>
          </Container>
        </Section>

        {/* ─── Section 10: Technology Stack ──────────────────────── */}
        <Section>
          <Container>
            <div className="mx-auto max-w-3xl text-center">
              <SectionHeading
                eyebrow="Built With"
                title="Technology Stack"
                description="A modern AI-driven stack selected for accuracy, reliability, and enterprise-grade document processing."
              />

              <div className="flex flex-wrap justify-center gap-2">
                {[
                  "Next.js",
                  "TypeScript",
                  "Tailwind CSS",
                  "n8n",
                  "OpenAI",
                  "Claude",
                  "Supabase",
                  "PostgreSQL",
                  "Google Document AI",
                  "Azure AI Document Intelligence",
                  "Mistral OCR",
                  "REST APIs",
                ].map((tech) => (
                  <Tag key={tech}>{tech}</Tag>
                ))}
              </div>
            </div>
          </Container>
        </Section>

        {/* ─── Section 11: Final CTA ─────────────────────────────── */}
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
                  Still Processing Documents Manually?
                </h2>
                <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
                  Let&apos;s explore how AI-powered document automation can help
                  your business reduce repetitive work, improve accuracy, and
                  accelerate approval workflows.
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
