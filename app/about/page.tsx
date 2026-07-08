"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Container, Section } from "@/components/ui/container";
import { SectionHeading, Eyebrow } from "@/components/ui/typography";
import { Tag } from "@/components/ui/tag";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/ui/animations";
import {
  ArrowRight,
  Check,
  X,
  ChevronDown,
  Wrench,
  Building2,
  HardHat,
  TrendingUp,
  Lightbulb,
  Lock,
  Expand,
  Cpu,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Reusable image placeholder ────────────────────────────────────────

function AboutImage({
  filename,
  alt,
  aspect = "4/3",
  className,
}: {
  filename: string;
  alt: string;
  aspect?: string;
  className?: string;
}) {
  const src = `/about/${filename}`;
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

// ─── Premium Card ─────────────────────────────────────────────────────

function PremiumCard({
  title,
  description,
  index,
  icon,
}: {
  title: string;
  description: string;
  index: number;
  icon: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
      className="group flex h-full flex-col rounded-xl border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-sm sm:p-8"
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent transition-all duration-300 group-hover:scale-110 group-hover:bg-accent/20">
        {icon}
      </div>
      <h3 className="font-display text-lg font-semibold tracking-tight">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </motion.div>
  );
}

// ─── Process Step ─────────────────────────────────────────────────────

function ProcessStep({
  step,
  title,
  description,
  index,
  total,
}: {
  step: string;
  title: string;
  description: string;
  index: number;
  total: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="relative flex gap-6"
    >
      <div className="flex flex-col items-center">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10 text-sm font-semibold text-accent">
          {step}
        </div>
        {index < total - 1 && (
          <div className="mt-2 h-full w-px bg-border" />
        )}
      </div>

      <div className="pb-10">
        <h3 className="font-display text-base font-semibold tracking-tight">
          {title}
        </h3>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

// ─── FAQ Accordion ─────────────────────────────────────────────────────

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-border transition-colors hover:border-accent/20">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between px-6 py-4 text-left text-sm font-medium transition-colors hover:text-accent sm:px-8 sm:py-5"
        aria-expanded={isOpen}
      >
        <span>{question}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300",
            isOpen && "rotate-180"
          )}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="border-t border-border px-6 pb-5 pt-4 text-sm leading-relaxed text-muted-foreground sm:px-8">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Data ──────────────────────────────────────────────────────────────

const whoIHelp = [
  {
    title: "HVAC Companies",
    description:
      "Helping HVAC businesses improve lead management, dispatcher operations and customer workflows.",
    icon: <Wrench className="h-6 w-6" />,
  },
  {
    title: "Local Service Businesses",
    description:
      "Building AI-powered systems for businesses that rely on customer inquiries and operational efficiency.",
    icon: <Building2 className="h-6 w-6" />,
  },
  {
    title: "Construction Companies",
    description:
      "Automating approvals, document handling and internal business processes.",
    icon: <HardHat className="h-6 w-6" />,
  },
  {
    title: "Growing Small & Medium Businesses",
    description:
      "Helping growing companies replace repetitive manual work with intelligent automation.",
    icon: <TrendingUp className="h-6 w-6" />,
  },
];

const approachCards = [
  {
    title: "Business Before Technology",
    description:
      "Every automation project starts by understanding the business process—not the software.",
    icon: <Lightbulb className="h-6 w-6" />,
  },
  {
    title: "Private Ownership",
    description:
      "You own your application, database, automation workflows and business data.",
    icon: <Lock className="h-6 w-6" />,
  },
  {
    title: "Built To Scale",
    description:
      "Solutions are designed to grow alongside your business without unnecessary complexity.",
    icon: <Expand className="h-6 w-6" />,
  },
  {
    title: "Practical AI",
    description:
      "AI should solve real operational problems, not simply add complexity.",
    icon: <Cpu className="h-6 w-6" />,
  },
];

const processSteps = [
  { step: "1", title: "Discover", description: "Understand your business, current workflow and operational challenges." },
  { step: "2", title: "Design", description: "Plan the architecture, workflows, integrations and user experience." },
  { step: "3", title: "Build", description: "Develop, test and integrate the complete automation system." },
  { step: "4", title: "Deploy", description: "Launch your private solution, transfer ownership and provide documentation." },
];

const expertiseGroups = [
  {
    label: "AI Automation",
    items: ["Workflow Automation", "AI Integration", "Lead Qualification", "Process Automation"],
  },
  {
    label: "Business Systems",
    items: ["CRM Development", "Internal Dashboards", "Customer Portals", "Analytics Platforms"],
  },
  {
    label: "Technology Stack",
    items: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "n8n", "OpenAI", "Claude"],
  },
];

const comparison = {
  traditional: {
    title: "Traditional Software",
    items: ["One-size-fits-all", "Monthly subscription fees", "Limited customization", "Vendor lock-in", "Generic workflows"],
  },
  custom: {
    title: "Custom AI Automation",
    items: ["Built around your workflow", "Full ownership", "Unlimited flexibility", "Private deployment", "Designed specifically for your business"],
  },
};

const faqItems = [
  {
    question: "Do I need technical knowledge?",
    answer:
      "No. I design solutions that fit naturally into your existing business processes and provide guidance after deployment.",
  },
  {
    question: "Can you integrate with my existing software?",
    answer:
      "Yes. I can integrate with many modern platforms using APIs, webhooks and automation tools, depending on the software you use.",
  },
  {
    question: "Do you work with businesses outside Bangladesh?",
    answer:
      "Yes. My primary focus is working with businesses in the United States, Canada and the United Kingdom.",
  },
  {
    question: "Will I own the system after delivery?",
    answer:
      "Yes. Your business owns the application, automation workflows, database and configuration. There is no vendor lock-in.",
  },
  {
    question: "Can the system grow with my business?",
    answer:
      "Yes. Every solution is designed with scalability in mind, making it easier to add new workflows, integrations and features as your business evolves.",
  },
];

// ─── Page ──────────────────────────────────────────────────────────────

export default function AboutPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <Navbar />
      <main>
        {/* ─── Section 1: Hero ──────────────────────────────────── */}
        <section className="relative min-h-[70vh] overflow-hidden pt-28">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />

          <Container className="relative z-10 w-full py-12">
            <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
              {/* Image — first on mobile */}
              <AnimatedSection className="md:order-2">
                <AboutImage
                  filename="profile.webp"
                  alt="MA Hakim — Business Automation Specialist"
                  aspect="4/5"
                  className="max-w-sm md:ml-auto"
                />
              </AnimatedSection>

              {/* Text — second on mobile */}
              <AnimatedSection delay={0.1} className="md:order-1">
                <Eyebrow className="mb-5">About</Eyebrow>
                <h1 className="font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
                  Helping Businesses Build Smarter Operations with AI & Automation
                </h1>
                <div className="mt-5 max-w-[650px] space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  <p>
                    I&apos;m Md Azizul Hakim, a Business Automation Specialist focused on
                    designing AI-powered systems that help service businesses
                    reduce manual work, improve operational visibility, and create
                    more efficient workflows.
                  </p>
                  <p>
                    Rather than selling isolated automations, I build complete
                    business systems that combine AI, workflow automation, modern
                    web applications, and intelligent dashboards into solutions
                    tailored to each business.
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Button asChild size="lg">
                    <Link href="/contact">
                      Tell Me About Your Business
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="secondary" size="lg">
                    <Link href="/projects">Explore My Projects</Link>
                  </Button>
                </div>
              </AnimatedSection>
            </div>
          </Container>
        </section>

        {/* ─── Section 2: Who I Help ────────────────────────────── */}
        <Section>
          <Container>
            <AnimatedSection>
              <SectionHeading
                eyebrow="Who I Help"
                title="Who I Help"
              />
            </AnimatedSection>

            <div className="grid gap-5 sm:grid-cols-2">
              {whoIHelp.map((item, i) => (
                <PremiumCard
                  key={item.title}
                  title={item.title}
                  description={item.description}
                  index={i}
                  icon={item.icon}
                />
              ))}
            </div>
          </Container>
        </Section>

        {/* ─── Section 3: My Approach ───────────────────────────── */}
        <Section className="bg-surface/20">
          <Container>
            <AnimatedSection>
              <SectionHeading
                eyebrow="Approach"
                title="How I Think About Automation"
              />
            </AnimatedSection>

            <div className="grid gap-5 sm:grid-cols-2">
              {approachCards.map((card, i) => (
                <PremiumCard
                  key={card.title}
                  title={card.title}
                  description={card.description}
                  index={i}
                  icon={card.icon}
                />
              ))}
            </div>
          </Container>
        </Section>

        {/* ─── Section 4: Behind The Work ───────────────────────── */}
        <Section>
          <Container>
            <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
              <AnimatedSection>
                <AboutImage
                  filename="workspace.webp"
                  alt="Workspace and development environment"
                  aspect="4/3"
                />
              </AnimatedSection>

              <AnimatedSection delay={0.1}>
                <h2 className="font-display text-2xl font-semibold leading-tight tracking-tight sm:text-3xl md:text-4xl">
                  Building Solutions That Solve Real Business Problems
                </h2>
                <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  <p>
                    Technology is only valuable when it improves the way people work.
                  </p>
                  <p>
                    Every solution begins by understanding how a business operates
                    today, identifying repetitive processes, and designing systems
                    that reduce manual work while improving visibility and
                    efficiency.
                  </p>
                  <p>
                    Whether it&apos;s lead management, customer communication, or
                    internal operations, every automation is built around the
                    people using it—not just the technology behind it.
                  </p>
                </div>
              </AnimatedSection>
            </div>
          </Container>
        </Section>

        {/* ─── Section 5: Core Expertise ────────────────────────── */}
        <Section className="bg-surface/20">
          <Container>
            <AnimatedSection>
              <SectionHeading
                eyebrow="Expertise"
                title="Core Expertise"
              />
            </AnimatedSection>

            <div className="mx-auto max-w-4xl space-y-8">
              {expertiseGroups.map((group) => (
                <div key={group.label}>
                  <h3 className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {group.label}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <Tag key={item}>{item}</Tag>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* ─── Section 6: Project Workflow ──────────────────────── */}
        <Section>
          <Container>
            <AnimatedSection>
              <SectionHeading
                eyebrow="Process"
                title="Project Workflow"
              />
            </AnimatedSection>

            <div className="mx-auto max-w-lg">
              {processSteps.map((step, i) => (
                <ProcessStep
                  key={step.step}
                  step={step.step}
                  title={step.title}
                  description={step.description}
                  index={i}
                  total={processSteps.length}
                />
              ))}
            </div>
          </Container>
        </Section>

        {/* ─── Section 7: Why Custom Automation ─────────────────── */}
        <Section className="bg-surface/20">
          <Container>
            <AnimatedSection>
              <SectionHeading
                eyebrow="Comparison"
                title="Why Choose Custom AI Automation?"
              />
            </AnimatedSection>

            <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
              {/* Traditional Software */}
              <AnimatedSection>
                <div className="rounded-xl border border-border bg-surface p-6 opacity-60 sm:p-8">
                  <h3 className="font-display text-lg font-semibold tracking-tight">
                    Traditional Software
                  </h3>
                  <ul className="mt-5 space-y-3">
                    {comparison.traditional.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-sm text-muted-foreground"
                      >
                        <X className="mt-0.5 h-4 w-4 shrink-0 text-red-400/70" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>

              {/* Custom AI Automation */}
              <AnimatedSection delay={0.1}>
                <div className="rounded-xl border border-accent/30 bg-surface p-6 shadow-sm sm:p-8">
                  <h3 className="font-display text-lg font-semibold tracking-tight">
                    Custom AI Automation
                  </h3>
                  <ul className="mt-5 space-y-3">
                    {comparison.custom.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-sm text-muted-foreground"
                      >
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            </div>
          </Container>
        </Section>

        {/* ─── Section 8: FAQ ────────────────────────────────────── */}
        <Section>
          <Container>
            <AnimatedSection>
              <SectionHeading
                eyebrow="FAQ"
                title="Frequently Asked Questions"
              />
            </AnimatedSection>

            <div className="mx-auto max-w-2xl space-y-3">
              {faqItems.map((item, i) => (
                <FAQItem
                  key={i}
                  question={item.question}
                  answer={item.answer}
                  isOpen={openFaq === i}
                  onToggle={() => setOpenFaq(openFaq === i ? null : i)}
                />
              ))}
            </div>
          </Container>
        </Section>

        {/* ─── Section 9: Final CTA ─────────────────────────────── */}
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
                <AboutImage
                  filename="contact-cta.webp"
                  alt="Contact CTA"
                  aspect="16/9"
                  className="mx-auto mb-8 max-w-md"
                />

                <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
                  Let&apos;s Build Something That Saves Time and Creates Business Value
                </h2>
                <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
                  Whether you&apos;re looking to automate lead management,
                  streamline operations or build a custom AI-powered business
                  system, I&apos;d love to learn about your business and explore
                  how automation can help.
                </p>

                <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <Button asChild size="lg">
                    <Link href="/contact">
                      Tell Me About Your Business
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="secondary" size="lg">
                    <Link href="/projects">Explore My Projects</Link>
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
