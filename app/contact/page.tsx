"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Container, Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, CheckCircle2 } from "lucide-react";
import { LinkedInIcon } from "@/components/ui/linkedin-icon";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // No backend yet — simulate submission
    setStatus("sent");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <Navbar />
      <main>
        <Section className="pt-28">
          <Container>
            <SectionHeading
              eyebrow="Contact"
              title="Send a Message"
              description="Tell us about your business and the workflows you'd like to automate. We'll respond within 48 hours."
            />

            <div className="mx-auto grid max-w-4xl gap-10 md:grid-cols-5">
              <div className="md:col-span-2 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <a
                      href="mailto:hello@automation.studio"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      hello@automation.studio
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                    <LinkedInIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">LinkedIn</p>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      Connect with us
                    </a>
                  </div>
                </div>

                <p className="border-t border-border pt-6 text-sm leading-relaxed text-muted-foreground">
                  Prefer to talk it through? We&apos;re happy to hop on a quick
                  call after we&apos;ve reviewed your message.
                </p>
              </div>

              <div className="md:col-span-3">
                {status === "sent" ? (
                  <div className="flex h-full flex-col items-center justify-center rounded-xl border border-accent/30 bg-surface p-10 text-center">
                    <CheckCircle2 className="h-12 w-12 text-accent" />
                    <h3 className="mt-4 font-display text-xl font-semibold">
                      Message Sent
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Thanks for reaching out. We&apos;ll get back to you within
                      48 hours.
                    </p>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="mt-6"
                      onClick={() => setStatus("idle")}
                    >
                      Send Another
                    </Button>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-4 rounded-xl border border-border bg-surface p-6 sm:p-8"
                  >
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="name"
                          className="mb-1.5 block text-sm font-medium"
                        >
                          Name
                        </label>
                        <input
                          id="name"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          required
                          className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-accent/50 focus:ring-1 focus:ring-accent/30"
                          placeholder="John Smith"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="mb-1.5 block text-sm font-medium"
                        >
                          Email
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                          required
                          className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-accent/50 focus:ring-1 focus:ring-accent/30"
                          placeholder="john@business.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="company"
                        className="mb-1.5 block text-sm font-medium"
                      >
                        Company
                      </label>
                      <input
                        id="company"
                        name="company"
                        value={form.company}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-accent/50 focus:ring-1 focus:ring-accent/30"
                        placeholder="Smith HVAC"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="mb-1.5 block text-sm font-medium"
                      >
                        How can we help?
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="w-full resize-none rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-accent/50 focus:ring-1 focus:ring-accent/30"
                        placeholder="Tell us about your business and what you'd like to automate..."
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full">
                      Send a Message
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
