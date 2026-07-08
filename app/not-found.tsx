import Link from "next/link";
import { Container, Section } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <Container>
      <Section className="flex min-h-[70vh] items-center justify-center pt-28">
        <div className="text-center">
          <p className="font-display text-6xl font-bold tracking-tight text-accent sm:text-8xl">
            404
          </p>
          <h1 className="mt-6 font-display text-2xl font-semibold tracking-tight">
            Page Not Found
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved. Let&apos;s get you back on track.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button asChild>
              <Link href="/">
                <ArrowLeft className="h-4 w-4" />
                Back Home
              </Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/projects">View Projects</Link>
            </Button>
          </div>
        </div>
      </Section>
    </Container>
  );
}
