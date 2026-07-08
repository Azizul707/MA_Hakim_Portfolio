import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "MA Hakim — Business Automation Specialist",
    template: "%s — MA Hakim",
  },
  description:
    "I help HVAC and local service businesses automate lead management, customer communication, and repetitive daily tasks using AI-powered workflows.",
  keywords: [
    "business automation",
    "HVAC automation",
    "service business automation",
    "AI workflow automation",
    "n8n expert",
    "lead management automation",
  ],
  openGraph: {
    title: "MA Hakim — Business Automation Specialist",
    description:
      "Helping HVAC and local service businesses automate repetitive work and build smarter operations with AI-powered automation.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-body antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
