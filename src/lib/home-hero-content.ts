import type { HomeHeroContent, HomeHeroStat } from '@/lib/firestore-types';

export const DEFAULT_HOME_HERO_CONTENT: HomeHeroContent = {
  badge: 'Leading Solar EPC Company',
  primaryCtaLabel: 'Get Free Solar Quote',
  primaryCtaHref: '/contact',
  secondaryCtaLabel: 'Explore Projects',
  secondaryCtaHref: '/services',
  stats: [
    { value: '500+', label: 'Projects' },
    { value: '50MW+', label: 'Installed' },
    { value: '10,000+', label: 'Customers' },
  ],
};

export function normalizeHomeHeroStats(raw: unknown): HomeHeroStat[] {
  if (!Array.isArray(raw)) return DEFAULT_HOME_HERO_CONTENT.stats;
  const mapped = raw
    .map((x) => {
      if (!x || typeof x !== 'object') return { value: '', label: '' };
      const o = x as Record<string, unknown>;
      return {
        value: typeof o.value === 'string' ? o.value : String(o.value ?? ''),
        label: typeof o.label === 'string' ? o.label : String(o.label ?? ''),
      };
    })
    .filter((s) => s.value.trim() || s.label.trim());
  return mapped.length ? mapped : DEFAULT_HOME_HERO_CONTENT.stats;
}

export function mergeHomeHeroContent(doc: HomeHeroContent | null): HomeHeroContent {
  if (!doc) return DEFAULT_HOME_HERO_CONTENT;
  return {
    badge: doc.badge?.trim() || DEFAULT_HOME_HERO_CONTENT.badge,
    primaryCtaLabel: doc.primaryCtaLabel?.trim() || DEFAULT_HOME_HERO_CONTENT.primaryCtaLabel,
    primaryCtaHref: doc.primaryCtaHref?.trim() || DEFAULT_HOME_HERO_CONTENT.primaryCtaHref,
    secondaryCtaLabel: doc.secondaryCtaLabel?.trim() || DEFAULT_HOME_HERO_CONTENT.secondaryCtaLabel,
    secondaryCtaHref: doc.secondaryCtaHref?.trim() || DEFAULT_HOME_HERO_CONTENT.secondaryCtaHref,
    stats: normalizeHomeHeroStats(doc.stats),
  };
}
