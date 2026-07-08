import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Mail } from "lucide-react";
import { LinkedInIcon } from "@/components/ui/linkedin-icon";

const footerLinks = [
  {
    label: "Pages",
    links: [
      { href: "/projects", label: "Projects" },
      { href: "/services", label: "Services" },
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    label: "Industries",
    links: [
      { href: "/projects", label: "HVAC" },
      { href: "/projects", label: "Local Services" },
    ],
  },
  {
    label: "Contact",
    links: [
      { href: "mailto:arafinazizul@gmail.com", label: "Email" },
      {
        href: "https://www.linkedin.com/in/azizul-hakim-2ai-automation-expert/",
        label: "LinkedIn",
      },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border">
      <Container className="py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link
              href="/"
              className="font-display text-lg font-semibold tracking-tight"
            >
              MA <span className="text-accent">Hakim</span>
            </Link>
            <p className="mt-1 text-sm text-muted-foreground">
              Business Automation Specialist
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Helping HVAC and local service businesses automate repetitive work, improve response times, and build smarter operations with AI-powered automation.
            </p>
          </div>

          {footerLinks.map((group) => (
            <div key={group.label}>
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {group.label}
              </h4>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} MA Hakim. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="mailto:arafinazizul@gmail.com"
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Email"
            >
              <Mail className="h-4 w-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/azizul-hakim-2ai-automation-expert/"
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedInIcon className="h-4 w-4" />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
