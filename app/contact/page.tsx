"use client";

import { useState, useRef, useActionState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Container, Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, CheckCircle2, Loader2 } from "lucide-react";
import { LinkedInIcon } from "@/components/ui/linkedin-icon";
import { submitPortfolioLead } from "@/lib/actions/submit-lead";
import type { LeadSubmitResult } from "@/types/portfolio-lead";

const initialState: LeadSubmitResult = {
  success: false,
  message: "",
};

export default function ContactPage() {
  const [state, formAction, pending] = useActionState(
    submitPortfolioLead,
    initialState
  );
  const formRef = useRef<HTMLFormElement>(null);

  if (state.success && state.message) {
    return (
      <>
        <Navbar />
        <main>
          <Section className="pt-28">
            <Container>
              <SectionHeading
                eyebrow="Contact"
                title="Send a Message"
                description="Tell me about your business and the workflows you'd like to automate."
              />

              <div className="mx-auto max-w-lg">
                <div className="flex flex-col items-center justify-center rounded-xl border border-accent/30 bg-surface p-10 text-center">
                  <CheckCircle2 className="h-12 w-12 text-accent" />
                  <h3 className="mt-4 font-display text-xl font-semibold">
                    Message Sent
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {state.message}
                  </p>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="mt-6"
                    onClick={() => {
                      formRef.current?.reset();
                      // useActionState resets on next submit
                      window.location.reload();
                    }}
                  >
                    Send Another
                  </Button>
                </div>
              </div>
            </Container>
          </Section>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main>
        <Section className="pt-28">
          <Container>
            <SectionHeading
              eyebrow="Contact"
              title="Send a Message"
              description="Tell me about your business and the workflows you'd like to automate."
            />

            <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-5">
              <div className="space-y-6 md:col-span-2">
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
                      Connect with me
                    </a>
                  </div>
                </div>

                <p className="border-t border-border pt-6 text-sm leading-relaxed text-muted-foreground">
                  Prefer to talk it through? I&apos;m happy to hop on a quick
                  call after I&apos;ve reviewed your message.
                </p>
              </div>

              <div className="md:col-span-3">
                <form
                  ref={formRef}
                  action={formAction}
                  className="space-y-4 rounded-xl border border-border bg-surface p-6 sm:p-8"
                >
                  {/* Global error banner */}
                  {!state.success && state.message && (
                    <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800/40 dark:bg-red-950/30 dark:text-red-400">
                      {state.message}
                    </div>
                  )}

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field
                      label="Name"
                      name="name"
                      placeholder="John Smith"
                      errors={state.errors?.name}
                      required
                    />
                    <Field
                      label="Email"
                      name="email"
                      type="email"
                      placeholder="john@business.com"
                      errors={state.errors?.email}
                      required
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field
                      label="Business Name"
                      name="business_name"
                      placeholder="Smith HVAC"
                      errors={state.errors?.business_name}
                      required
                    />
                    <Field
                      label="Industry"
                      name="industry"
                      placeholder="HVAC, Construction, Healthcare..."
                      errors={state.errors?.industry}
                      required
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field
                      label="Website"
                      name="website"
                      type="url"
                      placeholder="https://yourbusiness.com"
                      errors={state.errors?.website}
                    />
                    <Field
                      label="Budget (optional)"
                      name="budget"
                      placeholder="$5,000 – $10,000"
                      errors={state.errors?.budget}
                    />
                  </div>

                  <Field
                    label="Current Challenge"
                    name="current_challenge"
                    placeholder="What's the biggest problem you're trying to solve?"
                    errors={state.errors?.current_challenge}
                    required
                  />

                  <Field
                    label="Project Goal"
                    name="project_goal"
                    placeholder="What would a successful outcome look like?"
                    errors={state.errors?.project_goal}
                    required
                  />

                  <Field
                    label="Message"
                    name="message"
                    type="textarea"
                    placeholder="Tell me about your business and what you'd like to automate..."
                    errors={state.errors?.message}
                    required
                  />

                  <input type="hidden" name="source_page" value="/contact" />

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={pending}
                  >
                    {pending ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send a Message
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}

// ─── Form Field Component ──────────────────────────────────────────────

function Field({
  label,
  name,
  type = "text",
  placeholder,
  errors,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  errors?: string[];
  required?: boolean;
}) {
  const id = `field-${name}`;
  const hasError = errors && errors.length > 0;

  const baseClass =
    "w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-accent/50 focus:ring-1 focus:ring-accent/30";
  const errorClass = hasError
    ? "border-red-400 focus:border-red-400 focus:ring-red-300"
    : "";

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium">
        {label}
        {required && <span className="ml-0.5 text-muted-foreground">*</span>}
      </label>
      {type === "textarea" ? (
        <textarea
          id={id}
          name={name}
          placeholder={placeholder}
          required={required}
          rows={4}
          className={`${baseClass} ${errorClass} resize-none`}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          className={`${baseClass} ${errorClass}`}
        />
      )}
      {hasError &&
        errors.map((err) => (
          <p key={err} className="mt-1 text-xs text-red-500">
            {err}
          </p>
        ))}
    </div>
  );
}
