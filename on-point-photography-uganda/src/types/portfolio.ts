export interface PortfolioProject {
  id: string;
  title: string;
  category: string; // 'LOGO' | 'BRANDING' | 'PACKAGING' | 'SOCIAL MEDIA' | 'PRINT' | 'POSTER' | 'ADVERTISEMENT'
  subcategory: string;
  description: string;
  fullStory?: string;
  image: string;
  tools: string[];
  client: string;
  year: string;
  featured?: boolean;
  aspectRatio?: 'landscape' | 'portrait' | 'square';
  colorPalette?: string[];
  deliverables?: string[];
  projectLink?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  tools: string[];
  deliverables: string[];
  popular?: boolean;
}

export interface SkillItem {
  name: string;
  level: number;
  category: 'software' | 'design_theory';
  icon: string;
  experienceYears: string;
  description: string;
}

export interface StatItem {
  id: string;
  label: string;
  value: string;
  numericValue: number;
  suffix: string;
  iconName: string;
}

export interface TestimonialItem {
  id: string;
  clientName: string;
  company: string;
  role: string;
  avatar: string;
  feedback: string;
  rating: number;
  projectType: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
  iconName: string;
}

export interface SiteConfig {
  brandName: string;
  name: string;
  role: string;
  tagline: string;
  heroIntro: string;
  availableForProjects: boolean;
  profileImage: string;
  aboutHeadline: string;
  aboutBio: string;
  aboutSignature: string;
  contactEmail: string;
  contactPhone: string;
  whatsappNumber: string;
  location: string;
  stats: StatItem[];
  socials: {
    facebook: string;
    instagram: string;
    linkedin: string;
    behance: string;
    dribbble: string;
    whatsapp: string;
    email: string;
    twitter: string;
    youtube: string;
  };
}
