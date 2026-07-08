"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Container, Section } from "@/components/ui/container";
import { SectionHeading, Eyebrow } from "@/components/ui/typography";
import { Tag } from "@/components/ui/tag";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/ui/animations";
import { services } from "@/content/services";
import {
  ArrowRight,
  Zap,
  MessageSquare,
  Workflow,
  Cpu,
  Check,
  Server,
  Bot,
  Database,
  Globe,
  Link2,
  Layers,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Icon map ─────────────────────────────────────────────────────────

const iconMap: Record<string, React.ReactNode> = {
  Zap: <Zap className="h-6 w-6" />,
  Workflow: <Workflow className="h-6 w-6" />,
  MessageSquare: <MessageSquare className="h-6 w-6" />,
  Cpu: <Cpu className="h-6 w-6" />,
};

const techGroups = [
  {
    label: "Frontend",
    icon: Globe,
    items: ["Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    label: "Automation",
    icon: Bot,
    items: ["n8n", "OpenAI", "Claude"],
  },
  {
    label: "Database",
    icon: Database,
    items: ["Supabase", "PostgreSQL"],
  },
  {
    label: "Deployment",
    icon: Server,
    items: ["Vercel", "Docker"],
  },
  {
    label: "Integrations",
    icon: Link2,
    items: ["REST APIs", "Webhooks", "WhatsApp", "Google APIs"],
  },
];

const processSteps = [
  {
    step: "01",
    title: "Discovery",
    description:
      "Understand your business and identify automation opportunities.",
  },
  {
    step: "02",
    title: "Design",
    description:
      "Plan workflows, integrations, and user experience.",
  },
  {
    step: "03",
    title: "Build",
    description:
      "Develop, test, and integrate the complete system.",
  },
  {
    step: "04",
    title: "Deploy",
    description:
      "Launch, transfer ownership, and provide documentation.",
  },
];

const valueProps = [
  {
    title: "Business-first Solutions",
    description:
      "Every automation starts with understanding your workflow—not just the technology.",
  },
  {
    title: "Private Ownership",
    description:
      "Your business owns the application, database, and automation infrastructure.",
  },
  {
    title: "Modern Technology",
    description:
      "Built with scalable technologies designed for long-term reliability.",
  },
  {
    title: "Tailored Workflows",
    description:
      "Every solution is customized to match your business processes.",
  },
];

// ─── Service Card ──────────────────────────────────────────────────────

function ServiceCard({
  title,
  description,
  icon,
  features,
  index,
}: {
  title: string;
  description: string;
  icon: string;
  features: string[];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      className="group relative flex h-full flex-col rounded-xl border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-sm sm:p-8"
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent transition-all duration-300 group-hover:scale-110 group-hover:bg-accent/20">
        {iconMap[icon] || <Zap className="h-6 w-6" />}
      </div>

      <h3 className="font-display text-lg font-semibold tracking-tight">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>

      <div className="mt-auto pt-6">
        <ul className="space-y-2">
          {features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-2 text-sm text-muted-foreground"
            >
              <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 pt-2">
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="group/btn gap-1.5 px-0 text-sm font-medium text-accent hover:bg-transparent hover:text-accent/80"
        >
          <Link href="/contact">
            Learn More
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </Link>
        </Button>
      </div>
    </motion.div>
  );
}

// ─── Value Card for Why Work With Me ────────────────────────────────────

function ValueCard({
  title,
  description,
  index,
}: {
  title: string;
  description: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="rounded-xl border border-border bg-surface p-6 transition-all duration-300 hover:border-accent/20 sm:p-8"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
        <Check className="h-5 w-5" />
      </div>
      <h3 className="mt-4 font-display text-base font-semibold tracking-tight">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </motion.div>
  );
}

// ─── Process Step ───────────────────────────────────────────────────────

function ProcessStep({
  step,
  title,
  description,
  index,
}: {
  step: string;
  title: string;
  description: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="relative flex gap-6"
    >
      {/* Connector line */}
      <div className="flex flex-col items-center">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10 text-sm font-semibold text-accent">
          {step}
        </div>
        {index < processSteps.length - 1 && (
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

// ─── Page ──────────────────────────────────────────────────────────────

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* ─── Section 1: Hero ──────────────────────────────────── */}
        <section className="relative flex min-h-[50vh] items-center overflow-hidden pt-28">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />

          <Container className="relative z-10 w-full py-12">
            <AnimatedSection>
              <div className="mx-auto max-w-[700px] text-center">
                <Eyebrow className="mb-5 justify-center">Services</Eyebrow>
                <h1 className="font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl">
                  What I Build
                </h1>
                <p className="mt-5 text-lg leading-relaxed text-muted-foreground sm:text-xl">
                  I design AI-powered automation systems that help service
                  businesses reduce manual work, improve operational visibility,
                  and create more efficient workflows.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <div className="mt-10 flex justify-center">
                <Button asChild size="lg">
                  <Link href="/contact">
                    Tell Me About Your Business
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </AnimatedSection>
          </Container>
        </section>

        {/* ─── Section 2: Services Grid ─────────────────────────── */}
        <Section>
          <Container>
            <AnimatedSection>
              <SectionHeading
                title="Services"
                description="Modular automation capabilities that combine into complete systems for your business."
              />
            </AnimatedSection>

            <div className="grid gap-5 sm:grid-cols-2">
              {services.map((service, i) => (
                <ServiceCard
                  key={service.title}
                  title={service.title}
                  description={service.description}
                  icon={service.icon}
                  features={service.features}
                  index={i}
                />
              ))}
            </div>
          </Container>
        </Section>

        {/* ─── Section 3: Why Work With Me ──────────────────────── */}
        <Section className="bg-surface/20">
          <Container>
            <AnimatedSection>
              <SectionHeading
                eyebrow="Why Choose"
                title="Why Work With Me"
                description="I build systems that solve real business problems—not just technology demonstrations."
              />
            </AnimatedSection>

            <div className="grid gap-5 sm:grid-cols-2">
              {valueProps.map((prop, i) => (
                <ValueCard
                  key={prop.title}
                  title={prop.title}
                  description={prop.description}
                  index={i}
                />
              ))}
            </div>
          </Container>
        </Section>

        {/* ─── Section 4: Technology Stack ──────────────────────── */}
        <Section>
          <Container>
            <AnimatedSection>
              <SectionHeading
                eyebrow="Built With"
                title="Technology Stack"
                description="Modern tools selected for reliability, scalability, and practical business value."
              />
            </AnimatedSection>

            <div className="mx-auto max-w-4xl">
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {techGroups.map((group) => {
                  const Icon = group.icon;
                  return (
                    <div key={group.label}>
                      <div className="mb-3 flex items-center gap-2">
                        <Icon className="h-4 w-4 text-accent" />
                        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                          {group.label}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {group.items.map((tech) => (
                          <Tag key={tech}>{tech}</Tag>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Container>
        </Section>

        {/* ─── Section 5: Process ───────────────────────────────── */}
        <Section className="bg-surface/20">
          <Container>
            <AnimatedSection>
              <SectionHeading
                eyebrow="Process"
                title="How We Work"
                description="A structured approach from understanding your business to delivering a complete solution."
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
                />
              ))}
            </div>
          </Container>
        </Section>

        {/* ─── Section 6: Final CTA ─────────────────────────────── */}
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
                <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
                  Ready to Automate Your Business?
                </h2>
                <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
                  Whether you&apos;re looking to improve lead management,
                  streamline customer communication, or automate internal
                  operations, let&apos;s discuss a solution tailored to your
                  business.
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
