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

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustMetrics />
        <ProblemsSection />
        <ServicesSection featured />
        <WhyWorkWithMe />
        <FeaturedProjects />
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
