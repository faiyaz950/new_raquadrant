'use client';

import { useState, useEffect } from 'react';
import { getCollection, getCollectionUnordered, getDocument } from '@/lib/firestore';
import { COLLECTIONS } from '@/lib/firestore-types';
import type {
  HeroSlide,
  HomeHeroContent,
  IntroPoint,
  Testimonial,
  Partner,
  FeaturedProject,
  AboutStat,
  AboutHeroSlide,
  AboutHeroContent,
  WhatSetsApart,
  Leadership,
  ServicesHeroSlide,
  ServicesHeroContent,
  ServiceItem,
  ScopeOfWorkItem,
  ExecutionProcessItem,
  ProvenProject,
  BlogPost,
} from '@/lib/firestore-types';

function useFirestoreCollection<T>(collectionName: string | null) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!collectionName) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    setLoading(true);
    getCollection<T>(collectionName)
      .then((list) => {
        if (!cancelled) setData(list);
      })
      .catch((e) => {
        if (!cancelled) setError(e);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [collectionName]);

  return { data, loading, error };
}

export function useHeroSlides() {
  return useFirestoreCollection<HeroSlide>(COLLECTIONS.HERO_SLIDES);
}

export function useHomeHeroContent() {
  const [data, setData] = useState<HomeHeroContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDocument<HomeHeroContent>(COLLECTIONS.HOME_HERO_CONTENT, 'main')
      .then((d) => setData(d))
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
}

export function useIntroPoints() {
  return useFirestoreCollection<IntroPoint>(COLLECTIONS.INTRO_POINTS);
}

export function useTestimonials() {
  return useFirestoreCollection<Testimonial>(COLLECTIONS.TESTIMONIALS);
}

export function usePartners() {
  return useFirestoreCollection<Partner>(COLLECTIONS.PARTNERS);
}

export function useFeaturedProjects() {
  return useFirestoreCollection<FeaturedProject>(COLLECTIONS.FEATURED_PROJECTS);
}

export function useAboutStats() {
  return useFirestoreCollection<AboutStat>(COLLECTIONS.ABOUT_STATS);
}

export function useAboutHeroSlides() {
  return useFirestoreCollection<AboutHeroSlide>(COLLECTIONS.ABOUT_HERO_SLIDES);
}

export function useAboutHeroContent() {
  const [data, setData] = useState<AboutHeroContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDocument<AboutHeroContent>(COLLECTIONS.ABOUT_HERO_CONTENT, 'main')
      .then((d) => setData(d))
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
}

export function useWhatSetsApart() {
  return useFirestoreCollection<WhatSetsApart>(COLLECTIONS.WHAT_SETS_APART);
}

export function useLeadership() {
  return useFirestoreCollection<Leadership>(COLLECTIONS.LEADERSHIP);
}

export function useServicesHeroSlides() {
  return useFirestoreCollection<ServicesHeroSlide>(COLLECTIONS.SERVICES_HERO_SLIDES);
}

export function useServicesHeroContent() {
  const [data, setData] = useState<ServicesHeroContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDocument<ServicesHeroContent>(COLLECTIONS.SERVICES_HERO_CONTENT, 'main')
      .then((d) => setData(d))
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
}

export function useServices() {
  return useFirestoreCollection<ServiceItem>(COLLECTIONS.SERVICES);
}

export function useScopeOfWork() {
  return useFirestoreCollection<ScopeOfWorkItem>(COLLECTIONS.SCOPE_OF_WORK);
}

export function useExecutionProcess() {
  return useFirestoreCollection<ExecutionProcessItem>(COLLECTIONS.EXECUTION_PROCESS);
}

export function useProvenProjects() {
  return useFirestoreCollection<ProvenProject>(COLLECTIONS.PROVEN_PROJECTS);
}

export function useBlogPosts() {
  return useFirestoreCollection<BlogPost>(COLLECTIONS.BLOG_POSTS);
}

// Contact submissions: fetch unordered and sort by createdAt desc in component
export function useContactSubmissions() {
  const [data, setData] = useState<import('@/lib/firestore-types').ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getCollectionUnordered<import('@/lib/firestore-types').ContactSubmission>(COLLECTIONS.CONTACT_SUBMISSIONS)
      .then((list) => {
        if (!cancelled) {
          const sorted = list.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
          setData(sorted);
        }
      })
      .catch((e) => {
        if (!cancelled) setError(e);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  return { data, loading, error };
}
