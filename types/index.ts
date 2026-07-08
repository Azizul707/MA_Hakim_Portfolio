export interface Project {
  title: string;
  slug: string;
  industry: string;
  summary: string;
  problem: string;
  solution: string;
  implementation?: string;
  coverImage?: string;
  primaryAction?: {
    label: string;
    url: string;
  };
  workflowImage?: string;
  gallery: string[];
  technologies: string[];
  result?: string;
  featured: boolean;
  businessImpact?: string[];
  tags?: string[];
  metrics?: {
    label: string;
    value: string;
  }[];
}

export interface Service {
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export interface CaseStudy {
  title: string;
  slug: string;
  industry: string;
  problem: string;
  analysis: string;
  solution: string;
  outcome: string;
  metrics?: {
    label: string;
    value: string;
  }[];
  technologies: string[];
  relatedProject?: string;
}

export interface Testimonial {
  name: string;
  company: string;
  role: string;
  quote: string;
  avatar?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ProcessStep {
  title: string;
  description: string;
}
