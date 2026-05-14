import type { HomeCtaContent, HomeCtaStat } from '@/lib/firestore-types';
import { isRegisteredIconName } from '@/lib/icon-map';

export const DEFAULT_HOME_CTA_CONTENT: HomeCtaContent = {
  title: 'Ready to Go Solar?',
  description:
    "Join thousands of satisfied customers who've made the switch to clean, affordable solar energy.",
  ctaLabel: 'Get Your Free Quote Now',
  ctaHref: '/contact',
  stats: [
    { value: '500+', label: 'Projects', iconName: 'Building2' },
    { value: '10,000+', label: 'Customers', iconName: 'Users' },
    { value: '50MW+', label: 'Installed', iconName: 'Zap' },
    { value: '10+', label: 'Years Exp', iconName: 'Award' },
  ],
};

function statNonEmpty(s: HomeCtaStat): boolean {
  return Boolean(s.value?.trim() || s.label?.trim());
}

export function normalizeHomeCtaStats(raw: unknown): HomeCtaStat[] {
  if (!Array.isArray(raw)) return DEFAULT_HOME_CTA_CONTENT.stats;
  const mapped = raw
    .map((x) => {
      if (!x || typeof x !== 'object') return { value: '', label: '', iconName: 'Zap' };
      const o = x as Record<string, unknown>;
      const rawIcon =
        typeof o.iconName === 'string' && o.iconName.trim() ? o.iconName.trim() : 'Zap';
      return {
        value: typeof o.value === 'string' ? o.value : String(o.value ?? ''),
        label: typeof o.label === 'string' ? o.label : String(o.label ?? ''),
        iconName: isRegisteredIconName(rawIcon) ? rawIcon : 'Zap',
      };
    })
    .filter(statNonEmpty);
  return mapped.length ? mapped : DEFAULT_HOME_CTA_CONTENT.stats;
}

export function mergeHomeCtaContent(doc: HomeCtaContent | null): HomeCtaContent {
  if (!doc) return DEFAULT_HOME_CTA_CONTENT;
  return {
    title: doc.title?.trim() || DEFAULT_HOME_CTA_CONTENT.title,
    description: doc.description?.trim() || DEFAULT_HOME_CTA_CONTENT.description,
    ctaLabel: doc.ctaLabel?.trim() || DEFAULT_HOME_CTA_CONTENT.ctaLabel,
    ctaHref: doc.ctaHref?.trim() || DEFAULT_HOME_CTA_CONTENT.ctaHref,
    stats: normalizeHomeCtaStats(doc.stats),
  };
}
