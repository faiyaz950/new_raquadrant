// Firestore collection names
export const COLLECTIONS = {
  HERO_SLIDES: 'heroSlides',
  INTRO_POINTS: 'introPoints',
  TESTIMONIALS: 'testimonials',
  PARTNERS: 'partners',
  FEATURED_PROJECTS: 'featuredProjects',
  ABOUT_STATS: 'aboutStats',
  ABOUT_HERO_SLIDES: 'aboutHeroSlides',
  ABOUT_HERO_CONTENT: 'aboutHeroContent',
  WHAT_SETS_APART: 'whatSetsUsApart',
  LEADERSHIP: 'leadership',
  SERVICES_HERO_SLIDES: 'servicesHeroSlides',
  SERVICES_HERO_CONTENT: 'servicesHeroContent',
  SERVICES: 'services',
  SCOPE_OF_WORK: 'scopeOfWork',
  EXECUTION_PROCESS: 'executionProcess',
  CONTACT_SUBMISSIONS: 'contactSubmissions',
} as const;

// Document types (stored in Firestore)
export interface HeroSlide {
  id?: string;
  image: string;
  title: string;
  subtitle: string;
  description: string;
  order?: number;
}

export interface IntroPoint {
  id?: string;
  iconName: string; // e.g. Zap, Handshake, Globe
  title: string;
  description: string;
  paragraph: string;
  image: string;
  order?: number;
}

export interface Testimonial {
  id?: string;
  quote: string;
  name: string;
  role: string;
  location: string;
  rating: number;
  order?: number;
}

export interface Partner {
  id?: string;
  iconName: string;
  title: string;
  description: string;
  order?: number;
}

export interface FeaturedProject {
  id?: string;
  image: string;
  title: string;
  location: string;
  capacity: string;
  type: string;
  order?: number;
}

export interface AboutHeroSlide {
  id?: string;
  image: string;
  order?: number;
}

export interface AboutHeroContent {
  id?: string;
  badge: string;
  title: string;
  titleHighlight: string;
  tagline1: string;
  tagline2: string;
}

export interface AboutStat {
  id?: string;
  iconName: string;
  value: string;
  label: string;
  order?: number;
}

export interface WhatSetsApart {
  id?: string;
  iconName: string;
  title: string;
  description: string;
  order?: number;
}

export interface Leadership {
  id?: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  order?: number;
}

export interface ServicesHeroSlide {
  id?: string;
  image: string;
  order?: number;
}

export interface ServicesHeroContent {
  id?: string;
  badge: string;
  titleLine1: string;
  titleLine2: string;
  subtitle: string;
}

export interface ServiceItem {
  id?: string;
  idKey: string; // residential, commercial, infrastructure
  title: string;
  description: string;
  features: string[];
  stats: string[];
  capacity: string;
  roi: string;
  gradient: string;
  iconName: string;
  image: string;
  order?: number;
}

export interface ScopeOfWorkItem {
  id?: string;
  phase: string;
  iconName: string;
  content: string;
  details: string[];
  color: string;
  image: string;
  order?: number;
}

export interface ExecutionProcessItem {
  id?: string;
  name: string;
  description: string;
  iconName: string;
  duration: string;
  color: string;
  order?: number;
}

export interface ContactSubmission {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  createdAt: string; // ISO
}
