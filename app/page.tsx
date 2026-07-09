import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/sections/hero";
import { TrustMetrics } from "@/components/sections/trust-metrics";
import { ProblemsSection } from "@/components/sections/problems-section";
import { ServicesSection } from "@/components/sections/services-section";
import { WhyWorkWithMe } from "@/components/sections/why-work-with-me";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { CaseStudiesSection } from "@/components/sections/case-studies-section";
import { ProcessSection } from "@/components/sections/process-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { FAQSection } from "@/components/sections/faq-section";
import { ContactCTA } from "@/components/sections/contact-cta";
import { getProjectsForPublic } from "@/lib/actions/projects";
import type { ProjectCardData } from "@/components/sections/project-card";

export default async function HomePage() {
  let featuredProjects: ProjectCardData[] = [];

  try {
    const raw = await getProjectsForPublic();
    featuredProjects = (raw ?? []).map((p: any) => ({
      title: p.title,
      slug: p.slug,
      category: p.category || "",
      short_description: p.short_description,
      cover_image: p.cover_image,
      live_demo_url: p.live_demo_url,
      technology_stack: (p.solution?.technology_stack as string[]) || [],
      featured: p.featured,
    }));
  } catch {
    // Projects table may not exist yet — render without featured projects
  }

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustMetrics />
        <ProblemsSection />
        <ServicesSection featured />
        <WhyWorkWithMe />
        <FeaturedProjects projects={featuredProjects} />
        <CaseStudiesSection />
        <ProcessSection />
        <TestimonialsSection />
        <FAQSection />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
