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
  const src = `/projects/whatsapp-customer-hub/${filename}`;
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

// ─── Benefit card for Why This Matters ─────────────────────────────────

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

// ─── Ideal business card ────────────────────────────────────────────────

function IdealBusinessCard({
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

export default function WhatsappCustomerHubPage() {
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
                alt="WhatsApp Customer Hub dashboard overview"
                aspect="16/9"
                className="mb-10"
              />
            </AnimatedSection>

            <div className="mx-auto max-w-4xl">
              <AnimatedSection delay={0.1}>
                <Badge className="mb-4">SaaS</Badge>
                <h1 className="font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
                  WhatsApp Customer Hub
                </h1>
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <p className="mt-5 text-lg leading-relaxed text-muted-foreground sm:text-xl">
                  A private multi-tenant WhatsApp CRM that helps businesses
                  organize conversations, manage customer relationships, automate
                  repetitive communication, and collaborate as a team from one
                  centralized workspace.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.3}>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button asChild size="lg">
                    <Link href="https://amarchat.vercel.app" target="_blank" rel="noopener noreferrer">
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
                  alt="WhatsApp Customer Hub workspace overview"
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
                    As customer conversations move to WhatsApp, many growing
                    businesses struggle to manage them efficiently.
                  </p>
                  <p>
                    Messages become scattered across personal devices, follow-ups
                    depend on memory, and valuable customer history is difficult
                    to track.
                  </p>
                  <p>
                    Without a structured communication system, teams spend more
                    time searching for information than serving customers.
                  </p>
                  <p className="font-medium text-foreground">
                    A shared inbox and clear customer records turn scattered
                    chats into organized, accountable conversations.
                  </p>
                </div>
              </AnimatedSection>
            </div>
          </Container>
        </Section>

        {/* ─── Section 3: Why This Matters ───────────────────────── */}
        <Section className="bg-surface/20">
          <Container>
            <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-2 md:gap-16">
              <AnimatedSection>
                <ProjectImage
                  filename="business-impact.webp"
                  alt="Operational impact of unstructured WhatsApp communication"
                  aspect="4/3"
                />
              </AnimatedSection>

              <AnimatedSection delay={0.15}>
                <Badge className="mb-4">Why It Matters</Badge>
                <h2 className="font-display text-2xl font-semibold leading-tight tracking-tight sm:text-3xl md:text-4xl">
                  Why This Matters
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  Communication bottlenecks affect sales, customer support, and
                  team productivity at the same time. The cost is rarely a single
                  failed message&mdash;it is the steady loss of context, speed, and
                  trust across the whole customer relationship.
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  Businesses increasingly use WhatsApp CRM platforms to centralize
                  conversations, automate follow-ups, and improve collaboration.
                </p>
              </AnimatedSection>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <IssueCard text="Slow response times" index={0} />
              <IssueCard text="Lost customer context" index={1} />
              <IssueCard text="Duplicate replies" index={2} />
              <IssueCard text="Missed follow-ups" index={3} />
              <IssueCard text="No team visibility" index={4} />
            </div>
          </Container>
        </Section>

        {/* ─── Section 4: Solution Overview ──────────────────────── */}
        <Section>
          <Container>
            <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-2 md:gap-16">
              <AnimatedSection>
                <ProjectImage
                  filename="automation.webp"
                  alt="AmarChat platform combining WhatsApp communication and CRM"
                  aspect="4/3"
                />
              </AnimatedSection>

              <AnimatedSection delay={0.15}>
                <Badge className="mb-4">Solution</Badge>
                <h2 className="font-display text-2xl font-semibold leading-tight tracking-tight sm:text-3xl md:text-4xl">
                  Solution Overview
                </h2>
                <p className="mt-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  AmarChat combines the tools customer-facing teams rely on every
                  day into one centralized platform. This is not just another
                  messaging tool&mdash;it becomes the operational workspace for
                  customer communication.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {[
                    "WhatsApp",
                    "CRM",
                    "Automation",
                    "Customer History",
                    "Campaigns",
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
                description="Seven connected stages that turn everyday WhatsApp conversations into organized, trackable customer relationships."
              />

              <div className="space-y-10 md:space-y-14">
                {[
                  {
                    step: "01",
                    title: "Unified Team Inbox",
                    body: "All conversations appear inside one shared workspace.",
                    filename: "inbox.webp",
                  },
                  {
                    step: "02",
                    title: "Customer Profiles",
                    body: "Every customer has complete contact history, notes and metadata.",
                    filename: "contacts.webp",
                  },
                  {
                    step: "03",
                    title: "Customer CRM",
                    body: "Manage relationships instead of individual chats.",
                    filename: "crm.webp",
                  },
                  {
                    step: "04",
                    title: "Pipeline Management",
                    body: "Track customers from inquiry to completed sale.",
                    filename: "pipeline.webp",
                  },
                  {
                    step: "05",
                    title: "Automation",
                    body: "Automate repetitive communication and follow-up processes.",
                    filename: "automation.webp",
                  },
                  {
                    step: "06",
                    title: "Campaign Management",
                    body: "Broadcast promotions and updates to segmented audiences.",
                    filename: "campaigns.webp",
                  },
                  {
                    step: "07",
                    title: "Analytics Dashboard",
                    body: "Monitor customer engagement, campaign performance and operational activity.",
                    filename: "analytics.webp",
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
              description="Every capability works from the same workspace, so your team never switches tools to serve a customer."
            />

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                title="Shared Team Inbox"
                filename="feature-team-inbox.webp"
                index={0}
              />
              <FeatureCard
                title="Customer CRM"
                filename="feature-crm.webp"
                index={1}
              />
              <FeatureCard
                title="Workflow Automation"
                filename="feature-automation.webp"
                index={2}
              />
              <FeatureCard
                title="Broadcast Campaigns"
                filename="feature-campaigns.webp"
                index={3}
              />
              <FeatureCard
                title="Business Analytics"
                filename="feature-analytics.webp"
                index={4}
              />
            </div>
          </Container>
        </Section>

        {/* ─── Section 7: Multi-Tenant Architecture ──────────────── */}
        <Section className="bg-surface/20">
          <Container>
            <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-2 md:gap-16">
              <AnimatedSection>
                <ProjectImage
                  filename="tenant-management.webp"
                  alt="Multi-tenant architecture with isolated workspaces"
                  aspect="4/3"
                />
              </AnimatedSection>

              <AnimatedSection delay={0.15}>
                <Badge className="mb-4">Architecture</Badge>
                <h2 className="font-display text-2xl font-semibold leading-tight tracking-tight sm:text-3xl md:text-4xl">
                  Multi-Tenant Architecture
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  The platform supports multiple independent businesses from a
                  single deployment. Each workspace keeps its data, team, and
                  configuration fully isolated&mdash;so one system can securely
                  serve many organizations at once.
                </p>

                <ul className="mt-6 space-y-3">
                  {[
                    "Private data",
                    "Private customers",
                    "Private team",
                    "Private settings",
                    "Private automation",
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

                <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
                  One deployment, multiple organizations&mdash;business data stays
                  isolated and secure.
                </p>
              </AnimatedSection>
            </div>
          </Container>
        </Section>

        {/* ─── Section 8: Ideal Businesses ────────────────────────── */}
        <Section>
          <Container>
            <div className="mx-auto max-w-4xl">
              <SectionHeading
                eyebrow="Who It's For"
                title="Ideal Businesses"
                description="Any team that communicates with customers on WhatsApp and needs a shared, organized system to do it well."
              />

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {[
                  "Marketing Agencies",
                  "Local Businesses",
                  "Sales Teams",
                  "Customer Support Teams",
                  "Healthcare",
                  "Education",
                  "Real Estate",
                  "E-commerce",
                ].map((client, i) => (
                  <IdealBusinessCard key={client} name={client} index={i} />
                ))}
              </div>
            </div>
          </Container>
        </Section>

        {/* ─── Section 9: Technologies ────────────────────────────── */}
        <Section className="bg-surface/20">
          <Container>
            <div className="mx-auto max-w-3xl text-center">
              <SectionHeading
                eyebrow="Built With"
                title="Technologies"
                description="Reliable, scalable tools chosen to deliver a dependable customer communication platform."
              />

              <div className="flex flex-wrap justify-center gap-2">
                {[
                  "Next.js",
                  "TypeScript",
                  "Supabase",
                  "Tailwind",
                  "WhatsApp",
                  "n8n",
                  "OpenAI",
                ].map((tech) => (
                  <Tag key={tech}>{tech}</Tag>
                ))}
              </div>
            </div>
          </Container>
        </Section>

        {/* ─── Section 10: Final CTA ─────────────────────────────── */}
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
                  Want a Similar WhatsApp CRM for Your Business?
                </h2>
                <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
                  Whether you&apos;re managing customer support, sales, or
                  marketing conversations, a centralized WhatsApp CRM can help
                  your team respond faster, stay organized, and build stronger
                  customer relationships.
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
