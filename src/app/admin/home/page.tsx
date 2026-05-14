'use client';

import { useState, useEffect, useRef } from 'react';
import { getCollection, getDocument, setDocument, addDocument, updateDocument, removeDocument, toFirestore, COLLECTIONS } from '@/lib/firestore';
import type { HeroSlide, IntroPoint, Testimonial, Partner, FeaturedProject, HomeHeroContent } from '@/lib/firestore-types';
import { DEFAULT_HOME_HERO_CONTENT, mergeHomeHeroContent } from '@/lib/home-hero-content';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Plus, Pencil, Trash2, Loader2, Upload, X, ImageIcon, Star, Quote, Award, Users, Layers } from 'lucide-react';
import { getFirebaseClient } from '@/lib/firebase';
import { uploadImage, validateImageFile } from '@/lib/storage';
import Image from 'next/image';

type TabKey = 'hero' | 'intro' | 'testimonials' | 'partners' | 'projects';

const ICON_OPTIONS = ['Zap', 'Handshake', 'Globe', 'BrainCircuit', 'ShieldCheck', 'Users', 'Award', 'CheckSquare', 'Sun', 'BarChart3', 'Leaf', 'Battery'];

const TAB_META: Record<TabKey, { label: string; icon: React.ReactNode; folder: string }> = {
  hero:         { label: 'Hero Slides',   icon: <ImageIcon className="h-4 w-4" />,  folder: 'hero-slides' },
  intro:        { label: 'Intro Points',  icon: <Layers className="h-4 w-4" />,     folder: 'intro-images' },
  testimonials: { label: 'Testimonials',  icon: <Quote className="h-4 w-4" />,      folder: 'testimonials' },
  partners:     { label: 'Partners',      icon: <Award className="h-4 w-4" />,      folder: 'partners' },
  projects:     { label: 'Projects',      icon: <Star className="h-4 w-4" />,       folder: 'project-images' },
};

export default function AdminHomePage() {
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([]);
  const [introPoints, setIntroPoints] = useState<IntroPoint[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [projects, setProjects] = useState<FeaturedProject[]>([]);
  const [homeHeroOverlay, setHomeHeroOverlay] = useState<HomeHeroContent>(DEFAULT_HOME_HERO_CONTENT);
  const [savingHomeHero, setSavingHomeHero] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dialog, setDialog] = useState<{ open: boolean; tab: TabKey; item?: HeroSlide | IntroPoint | Testimonial | Partner | FeaturedProject }>({ open: false, tab: 'hero' });
  const [deleteTarget, setDeleteTarget] = useState<{ tab: TabKey; id: string; label: string } | null>(null);

  const db = getFirebaseClient()?.db;
  const canEdit = !!db;

  function load() {
    if (!db) return;
    setLoading(true);
    setError(null);
    Promise.all([
      getCollection<HeroSlide>(COLLECTIONS.HERO_SLIDES),
      getCollection<IntroPoint>(COLLECTIONS.INTRO_POINTS),
      getCollection<Testimonial>(COLLECTIONS.TESTIMONIALS),
      getCollection<Partner>(COLLECTIONS.PARTNERS),
      getCollection<FeaturedProject>(COLLECTIONS.FEATURED_PROJECTS),
      getDocument<HomeHeroContent>(COLLECTIONS.HOME_HERO_CONTENT, 'main'),
    ])
      .then(([h, i, t, p, proj, hc]) => {
        setHeroSlides(h);
        setIntroPoints(i);
        setTestimonials(t);
        setPartners(p);
        setProjects(proj);
        setHomeHeroOverlay(mergeHomeHeroContent(hc));
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }

  useEffect(() => { load(); }, []);

  async function handleDelete() {
    if (!deleteTarget) return;
    const collectionMap: Record<TabKey, string> = {
      hero: COLLECTIONS.HERO_SLIDES,
      intro: COLLECTIONS.INTRO_POINTS,
      testimonials: COLLECTIONS.TESTIMONIALS,
      partners: COLLECTIONS.PARTNERS,
      projects: COLLECTIONS.FEATURED_PROJECTS,
    };
    await removeDocument(collectionMap[deleteTarget.tab], deleteTarget.id);
    setDeleteTarget(null);
    load();
  }

  function askDelete(tab: TabKey, id: string, label: string) {
    setDeleteTarget({ tab, id, label });
  }

  async function saveHomeHeroOverlay() {
    setSavingHomeHero(true);
    setError(null);
    try {
      const stats = homeHeroOverlay.stats.filter((s) => s.value.trim() || s.label.trim());
      if (stats.length === 0) {
        setError('Add at least one hero stat (value or label).');
        return;
      }
      await setDocument(
        COLLECTIONS.HOME_HERO_CONTENT,
        'main',
        toFirestore({
          badge: homeHeroOverlay.badge,
          primaryCtaLabel: homeHeroOverlay.primaryCtaLabel,
          primaryCtaHref: homeHeroOverlay.primaryCtaHref?.trim() || DEFAULT_HOME_HERO_CONTENT.primaryCtaHref,
          secondaryCtaLabel: homeHeroOverlay.secondaryCtaLabel,
          secondaryCtaHref: homeHeroOverlay.secondaryCtaHref?.trim() || DEFAULT_HOME_HERO_CONTENT.secondaryCtaHref,
          stats,
        } as Record<string, unknown>)
      );
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to save hero content');
    } finally {
      setSavingHomeHero(false);
    }
  }

  if (!canEdit) {
    return (
      <div className="rounded-lg bg-amber-500/20 p-4 text-amber-200">
        Firebase not configured. Add <code className="rounded bg-slate-700 px-1">NEXT_PUBLIC_FIREBASE_*</code> env vars.
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-10 w-10 animate-spin text-orange-500" />
      </div>
    );
  }

  const counts: Record<TabKey, number> = {
    hero: heroSlides.length,
    intro: introPoints.length,
    testimonials: testimonials.length,
    partners: partners.length,
    projects: projects.length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-headline text-2xl font-bold text-white">Home Page Content</h1>
        <p className="text-slate-400 mt-1">Manage hero slides and banner text, intro points, testimonials, partners, and featured projects.</p>
      </div>

      {error && (
        <div className="rounded-lg bg-red-500/20 p-4 text-red-300 flex items-center gap-2">
          <X className="h-4 w-4 shrink-0" /> {error}
        </div>
      )}

      {/* Summary Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {(Object.keys(TAB_META) as TabKey[]).map((key) => (
          <div key={key} className="rounded-lg border border-slate-700 bg-slate-800/60 p-3 text-center">
            <div className="text-2xl font-bold text-orange-400">{counts[key]}</div>
            <div className="text-xs text-slate-400 mt-0.5">{TAB_META[key].label}</div>
          </div>
        ))}
      </div>

      <Tabs defaultValue="hero" className="space-y-4">
        <TabsList className="bg-slate-800 border border-slate-700 flex flex-wrap h-auto gap-1 p-1">
          {(Object.keys(TAB_META) as TabKey[]).map((key) => (
            <TabsTrigger key={key} value={key} className="flex items-center gap-1.5 data-[state=active]:bg-orange-600 data-[state=active]:text-white text-slate-400">
              {TAB_META[key].icon}
              <span>{TAB_META[key].label}</span>
              <span className="ml-1 rounded-full bg-slate-700 px-1.5 text-[10px] text-slate-300 data-[state=active]:bg-orange-800">
                {counts[key]}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="hero">
          <div className="rounded-lg border border-slate-700 bg-slate-800/40 p-4 space-y-4 mb-6">
            <div>
              <h2 className="font-semibold text-white">Hero banner text &amp; stats</h2>
              <p className="text-sm text-slate-400 mt-0.5">
                Top badge, both CTA buttons (labels and links), and the metric row under the headline. Rotating slide copy and images are edited below.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="sm:col-span-2 space-y-1.5">
                <Label className="text-slate-300">Badge</Label>
                <Input
                  value={homeHeroOverlay.badge}
                  onChange={(e) => setHomeHeroOverlay((o) => ({ ...o, badge: e.target.value }))}
                  className="bg-slate-900 border-slate-600 text-white"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-slate-300">Primary CTA label</Label>
                <Input
                  value={homeHeroOverlay.primaryCtaLabel}
                  onChange={(e) => setHomeHeroOverlay((o) => ({ ...o, primaryCtaLabel: e.target.value }))}
                  className="bg-slate-900 border-slate-600 text-white"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-slate-300">Primary CTA link</Label>
                <Input
                  value={homeHeroOverlay.primaryCtaHref}
                  onChange={(e) => setHomeHeroOverlay((o) => ({ ...o, primaryCtaHref: e.target.value }))}
                  placeholder="/contact"
                  className="bg-slate-900 border-slate-600 text-white"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-slate-300">Secondary CTA label</Label>
                <Input
                  value={homeHeroOverlay.secondaryCtaLabel}
                  onChange={(e) => setHomeHeroOverlay((o) => ({ ...o, secondaryCtaLabel: e.target.value }))}
                  className="bg-slate-900 border-slate-600 text-white"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-slate-300">Secondary CTA link</Label>
                <Input
                  value={homeHeroOverlay.secondaryCtaHref}
                  onChange={(e) => setHomeHeroOverlay((o) => ({ ...o, secondaryCtaHref: e.target.value }))}
                  placeholder="/services"
                  className="bg-slate-900 border-slate-600 text-white"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-slate-300">Stats row (e.g. 500+ / Projects)</Label>
              {homeHeroOverlay.stats.map((stat, idx) => (
                <div key={idx} className="flex flex-wrap items-end gap-2">
                  <div className="flex-1 min-w-[100px] space-y-1">
                    <span className="text-[10px] uppercase text-slate-500">Value</span>
                    <Input
                      value={stat.value}
                      onChange={(e) => {
                        const v = e.target.value;
                        setHomeHeroOverlay((o) => {
                          const stats = [...o.stats];
                          stats[idx] = { ...stats[idx], value: v };
                          return { ...o, stats };
                        });
                      }}
                      className="bg-slate-900 border-slate-600 text-white"
                    />
                  </div>
                  <div className="flex-1 min-w-[100px] space-y-1">
                    <span className="text-[10px] uppercase text-slate-500">Label</span>
                    <Input
                      value={stat.label}
                      onChange={(e) => {
                        const v = e.target.value;
                        setHomeHeroOverlay((o) => {
                          const stats = [...o.stats];
                          stats[idx] = { ...stats[idx], label: v };
                          return { ...o, stats };
                        });
                      }}
                      className="bg-slate-900 border-slate-600 text-white"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-red-400 hover:text-red-300 shrink-0"
                    disabled={homeHeroOverlay.stats.length <= 1}
                    onClick={() =>
                      setHomeHeroOverlay((o) =>
                        o.stats.length <= 1
                          ? o
                          : { ...o, stats: o.stats.filter((_, i) => i !== idx) }
                      )
                    }
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="border-slate-600 text-slate-300"
                disabled={homeHeroOverlay.stats.length >= 6}
                onClick={() =>
                  setHomeHeroOverlay((o) =>
                    o.stats.length >= 6
                      ? o
                      : { ...o, stats: [...o.stats, { value: '', label: '' }] }
                  )
                }
              >
                <Plus className="mr-1 h-3 w-3" /> Add stat
              </Button>
            </div>
            <Button
              type="button"
              onClick={saveHomeHeroOverlay}
              disabled={savingHomeHero}
              className="bg-orange-600 hover:bg-orange-500 text-white"
            >
              {savingHomeHero ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Save hero text &amp; stats
            </Button>
          </div>
          <SectionHeader
            title="Hero Slides"
            description="Slides shown in the homepage banner. Each slide has a background image, title, subtitle, and description."
            onAdd={() => setDialog({ open: true, tab: 'hero' })}
            label="Add Slide"
          />
          <div className="grid grid-cols-1 gap-3 mt-4">
            {heroSlides.length === 0 && <EmptyState label="No hero slides yet." />}
            {heroSlides.map((item) => (
              <HeroCard
                key={item.id}
                item={item}
                onEdit={() => setDialog({ open: true, tab: 'hero', item })}
                onDelete={() => item.id && askDelete('hero', item.id, item.title)}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="intro">
          <SectionHeader
            title="Intro Points"
            description="Cards in the 'Empowering Communities' section. Each has an icon, title, description, paragraph text, and image."
            onAdd={() => setDialog({ open: true, tab: 'intro' })}
            label="Add Point"
          />
          <div className="grid grid-cols-1 gap-3 mt-4">
            {introPoints.length === 0 && <EmptyState label="No intro points yet." />}
            {introPoints.map((item) => (
              <IntroCard
                key={item.id}
                item={item}
                onEdit={() => setDialog({ open: true, tab: 'intro', item })}
                onDelete={() => item.id && askDelete('intro', item.id, item.title)}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="testimonials">
          <SectionHeader
            title="Testimonials"
            description="Client testimonials shown in the 'What our clients say' section."
            onAdd={() => setDialog({ open: true, tab: 'testimonials' })}
            label="Add Testimonial"
          />
          <div className="grid grid-cols-1 gap-3 mt-4">
            {testimonials.length === 0 && <EmptyState label="No testimonials yet." />}
            {testimonials.map((item) => (
              <TestimonialCard
                key={item.id}
                item={item}
                onEdit={() => setDialog({ open: true, tab: 'testimonials', item })}
                onDelete={() => item.id && askDelete('testimonials', item.id, item.name)}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="partners">
          <SectionHeader
            title="Why Choose Us Cards"
            description="Cards in the 'RaQuadrant Difference' section. Each has an icon, title, and description."
            onAdd={() => setDialog({ open: true, tab: 'partners' })}
            label="Add Card"
          />
          <div className="grid grid-cols-1 gap-3 mt-4">
            {partners.length === 0 && <EmptyState label="No partner cards yet." />}
            {partners.map((item) => (
              <PartnerCard
                key={item.id}
                item={item}
                onEdit={() => setDialog({ open: true, tab: 'partners', item })}
                onDelete={() => item.id && askDelete('partners', item.id, item.title)}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="projects">
          <SectionHeader
            title="Featured Projects"
            description="Project showcase cards. Each has an image, title, location, capacity, and type."
            onAdd={() => setDialog({ open: true, tab: 'projects' })}
            label="Add Project"
          />
          <div className="grid grid-cols-1 gap-3 mt-4">
            {projects.length === 0 && <EmptyState label="No featured projects yet." />}
            {projects.map((item) => (
              <ProjectCard
                key={item.id}
                item={item}
                onEdit={() => setDialog({ open: true, tab: 'projects', item })}
                onDelete={() => item.id && askDelete('projects', item.id, item.title)}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <HomeEditDialog
        dialog={dialog}
        onClose={() => setDialog((d) => ({ ...d, open: false }))}
        onSaved={() => { setDialog((d) => ({ ...d, open: false })); load(); }}
        iconOptions={ICON_OPTIONS}
      />

      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent className="bg-slate-800 border-slate-700 text-slate-200">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Delete this item?</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-400">
              <span className="text-white font-medium">&ldquo;{deleteTarget?.label}&rdquo;</span> will be permanently deleted. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-slate-700 border-slate-600 text-slate-200 hover:bg-slate-600">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-500 text-white">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function SectionHeader({ title, description, onAdd, label }: { title: string; description: string; onAdd: () => void; label: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 rounded-lg border border-slate-700 bg-slate-800/40 p-4">
      <div>
        <h2 className="font-semibold text-white">{title}</h2>
        <p className="text-sm text-slate-400 mt-0.5">{description}</p>
      </div>
      <Button onClick={onAdd} className="shrink-0 bg-orange-600 hover:bg-orange-500 text-white">
        <Plus className="mr-2 h-4 w-4" />{label}
      </Button>
    </div>
  );
}

function EmptyState({ label }: { label: string }) {
  return (
    <div className="rounded-lg border border-dashed border-slate-700 p-8 text-center text-slate-500">
      {label}
    </div>
  );
}

function CardActions({ onEdit, onDelete }: { onEdit: () => void; onDelete: () => void }) {
  return (
    <div className="flex gap-1 shrink-0">
      <Button variant="ghost" size="sm" onClick={onEdit} className="text-slate-300 hover:text-white hover:bg-slate-700">
        <Pencil className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="sm" onClick={onDelete} className="text-red-400 hover:text-red-300 hover:bg-red-500/10">
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}

function ThumbImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-md bg-slate-700">
      {src ? (
        <Image src={src} alt={alt} fill className="object-cover" sizes="96px" unoptimized />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <ImageIcon className="h-5 w-5 text-slate-500" />
        </div>
      )}
    </div>
  );
}

function HeroCard({ item, onEdit, onDelete }: { item: HeroSlide; onEdit: () => void; onDelete: () => void }) {
  return (
    <div className="flex items-center gap-4 rounded-lg border border-slate-700 bg-slate-800/50 p-3">
      <ThumbImage src={item.image} alt={item.title} />
      <div className="min-w-0 flex-1">
        <p className="font-semibold text-white truncate">{item.title}</p>
        <p className="text-sm text-orange-400 truncate">{item.subtitle}</p>
        <p className="text-xs text-slate-400 truncate mt-0.5">{item.description}</p>
      </div>
      <CardActions onEdit={onEdit} onDelete={onDelete} />
    </div>
  );
}

function IntroCard({ item, onEdit, onDelete }: { item: IntroPoint; onEdit: () => void; onDelete: () => void }) {
  return (
    <div className="flex items-center gap-4 rounded-lg border border-slate-700 bg-slate-800/50 p-3">
      <ThumbImage src={item.image} alt={item.title} />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="rounded bg-orange-600/20 px-1.5 py-0.5 text-[10px] font-medium text-orange-400">{item.iconName}</span>
          <p className="font-semibold text-white truncate">{item.title}</p>
        </div>
        <p className="text-xs text-slate-400 truncate mt-0.5">{item.description}</p>
        <p className="text-xs text-slate-500 truncate">{item.paragraph}</p>
      </div>
      <CardActions onEdit={onEdit} onDelete={onDelete} />
    </div>
  );
}

function TestimonialCard({ item, onEdit, onDelete }: { item: Testimonial; onEdit: () => void; onDelete: () => void }) {
  return (
    <div className="flex items-start gap-4 rounded-lg border border-slate-700 bg-slate-800/50 p-3">
      <div className="flex-shrink-0 flex flex-col items-center gap-1 pt-1">
        <Users className="h-8 w-8 text-slate-500 bg-slate-700 rounded-full p-1.5" />
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`h-2.5 w-2.5 ${i < item.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-600'}`} />
          ))}
        </div>
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm text-slate-300 italic line-clamp-2">&ldquo;{item.quote}&rdquo;</p>
        <p className="mt-1 font-semibold text-white text-sm">{item.name}</p>
        <p className="text-xs text-orange-400">{item.role} · {item.location}</p>
      </div>
      <CardActions onEdit={onEdit} onDelete={onDelete} />
    </div>
  );
}

function PartnerCard({ item, onEdit, onDelete }: { item: Partner; onEdit: () => void; onDelete: () => void }) {
  return (
    <div className="flex items-center gap-4 rounded-lg border border-slate-700 bg-slate-800/50 p-3">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-orange-600/20 text-orange-400">
        <Award className="h-6 w-6" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="rounded bg-slate-700 px-1.5 py-0.5 text-[10px] text-slate-300">{item.iconName}</span>
          <p className="font-semibold text-white truncate">{item.title}</p>
        </div>
        <p className="text-xs text-slate-400 truncate mt-0.5">{item.description}</p>
      </div>
      <CardActions onEdit={onEdit} onDelete={onDelete} />
    </div>
  );
}

function ProjectCard({ item, onEdit, onDelete }: { item: FeaturedProject; onEdit: () => void; onDelete: () => void }) {
  return (
    <div className="flex items-center gap-4 rounded-lg border border-slate-700 bg-slate-800/50 p-3">
      <ThumbImage src={item.image} alt={item.title} />
      <div className="min-w-0 flex-1">
        <p className="font-semibold text-white truncate">{item.title}</p>
        <div className="flex flex-wrap gap-2 mt-1">
          <span className="rounded bg-orange-600/20 px-1.5 py-0.5 text-[10px] text-orange-400">{item.type}</span>
          <span className="text-xs text-slate-400">{item.location}</span>
          <span className="text-xs text-slate-400">·</span>
          <span className="text-xs text-slate-300 font-medium">{item.capacity}</span>
        </div>
      </div>
      <CardActions onEdit={onEdit} onDelete={onDelete} />
    </div>
  );
}

// ---- Reusable Image Upload Field ----

function ImageUploadField({
  value,
  folder,
  onChange,
}: {
  value: string;
  folder: string;
  onChange: (url: string) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setUploadError(null);
    setProgress(0);
    const err = validateImageFile(file);
    if (err) { setUploadError(err); return; }
    setUploading(true);
    try {
      const url = await uploadImage(file, folder, (p) => setProgress(p));
      onChange(url);
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
      setProgress(0);
    }
  }

  function handleRemove() {
    onChange('');
    setUploadError(null);
  }

  return (
    <div className="space-y-2">
      <input ref={fileRef} type="file" accept=".png,.webp,.jpg,.jpeg,image/png,image/webp,image/jpeg" className="hidden" onChange={handleFileSelect} disabled={uploading} />
      {value ? (
        <div className="rounded-lg border border-slate-600 overflow-hidden bg-slate-700/50">
          <div className="relative aspect-video w-full max-h-44">
            <Image src={value} alt="Preview" fill className="object-cover" sizes="400px" unoptimized />
          </div>
          <div className="flex items-center justify-between p-2 border-t border-slate-600">
            <span className="text-xs text-slate-400 truncate max-w-[200px]">{value.slice(0, 60)}{value.length > 60 ? '…' : ''}</span>
            <Button type="button" variant="ghost" size="sm" className="text-red-400 hover:text-red-300 shrink-0" onClick={handleRemove} disabled={uploading}>
              <X className="h-4 w-4 mr-1" /> Remove
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <Button
            type="button"
            variant="outline"
            className="w-full border-slate-600 bg-slate-700/50 text-slate-300 hover:bg-slate-700"
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
          >
            {uploading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Upload className="h-4 w-4 mr-2" />}
            {uploading ? `Uploading… ${progress}%` : 'Upload image'}
          </Button>
          {uploading && (
            <div className="h-1.5 w-full rounded-full bg-slate-700 overflow-hidden">
              <div className="h-full bg-orange-500 transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>
          )}
        </div>
      )}
      {uploadError && <p className="text-sm text-red-400">{uploadError}</p>}
    </div>
  );
}

// ---- Edit Dialog ----

function HomeEditDialog({
  dialog,
  onClose,
  onSaved,
  iconOptions,
}: {
  dialog: { open: boolean; tab: TabKey; item?: HeroSlide | IntroPoint | Testimonial | Partner | FeaturedProject };
  onClose: () => void;
  onSaved: () => void;
  iconOptions: string[];
}) {
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<Record<string, string | number>>({});

  const folder = TAB_META[dialog.tab].folder;

  useEffect(() => {
    if (!dialog.open) return;
    const item = dialog.item as Record<string, unknown> | undefined;
    if (item) {
      const f: Record<string, string | number> = {};
      Object.entries(item).forEach(([k, v]) => {
        if (k !== 'id' && (typeof v === 'string' || typeof v === 'number')) f[k] = v;
      });
      // Arrays aren't handled by the generic mapper above.
      if (Array.isArray(item.highlights)) {
        f.highlights = item.highlights.filter((x) => typeof x === 'string').join('\n');
      }
      setForm(f);
    } else {
      if (dialog.tab === 'hero')         setForm({ image: '', title: '', subtitle: '', description: '', order: 0 });
      if (dialog.tab === 'intro')        setForm({ iconName: 'Zap', title: '', description: '', paragraph: '', image: '', order: 0 });
      if (dialog.tab === 'testimonials') setForm({ quote: '', name: '', role: '', location: '', rating: 5, order: 0 });
      if (dialog.tab === 'partners')     setForm({ iconName: 'Award', title: '', description: '', order: 0 });
      if (dialog.tab === 'projects')     setForm({ image: '', title: '', location: '', capacity: '', type: '', description: '', highlights: '', order: 0 });
    }
  }, [dialog.open, dialog.tab, dialog.item]);

  function field(key: string) { return String(form[key] ?? ''); }
  function set(key: string) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const item = dialog.item as { id?: string } | undefined;
      const order = typeof form.order === 'number' ? form.order : parseInt(String(form.order), 10) || 0;
      const dataBase: Record<string, unknown> = { ...form, order };
      if (dialog.tab === 'projects') {
        const raw = String(form.highlights ?? '');
        const highlights = raw
          .split('\n')
          .map((s) => s.trim())
          .filter(Boolean);
        dataBase.highlights = highlights.length ? highlights : undefined;
      }
      const data = toFirestore(dataBase);

      const collectionMap: Record<TabKey, string> = {
        hero: COLLECTIONS.HERO_SLIDES,
        intro: COLLECTIONS.INTRO_POINTS,
        testimonials: COLLECTIONS.TESTIMONIALS,
        partners: COLLECTIONS.PARTNERS,
        projects: COLLECTIONS.FEATURED_PROJECTS,
      };
      const col = collectionMap[dialog.tab];
      if (item?.id) await updateDocument(col, item.id, data);
      else await addDocument(col, data);
      onSaved();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  }

  const tabLabel = TAB_META[dialog.tab].label;
  const isEdit = !!dialog.item;

  return (
    <Dialog open={dialog.open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[90vh] overflow-y-auto bg-slate-800 border-slate-700 text-slate-200 sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-white">{isEdit ? 'Edit' : 'Add'} {tabLabel.replace(/s$/, '')}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-1">

          {/* ---- Hero ---- */}
          {dialog.tab === 'hero' && (
            <>
              <FieldWrap label="Slide Image (PNG, WebP, JPG)">
                <ImageUploadField value={field('image')} folder={folder} onChange={(url) => setForm((f) => ({ ...f, image: url }))} />
              </FieldWrap>
              <FieldWrap label="Title"><Input className="bg-slate-700 border-slate-600" value={field('title')} onChange={set('title')} placeholder="Pioneering Solar EPC Solutions" /></FieldWrap>
              <FieldWrap label="Subtitle"><Input className="bg-slate-700 border-slate-600" value={field('subtitle')} onChange={set('subtitle')} placeholder="for a Sustainable Future" /></FieldWrap>
              <FieldWrap label="Description"><Textarea className="bg-slate-700 border-slate-600" value={field('description')} onChange={set('description')} rows={2} placeholder="Short description shown under the title" /></FieldWrap>
              <FieldWrap label="Order (lower = first)"><Input type="number" className="bg-slate-700 border-slate-600 w-24" value={field('order')} onChange={set('order')} /></FieldWrap>
            </>
          )}

          {/* ---- Intro ---- */}
          {dialog.tab === 'intro' && (
            <>
              <FieldWrap label="Icon">
                <select className="w-full rounded-md border border-slate-600 bg-slate-700 px-3 py-2 text-white text-sm" value={field('iconName')} onChange={set('iconName')}>
                  {iconOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </FieldWrap>
              <FieldWrap label="Title"><Input className="bg-slate-700 border-slate-600" value={field('title')} onChange={set('title')} placeholder="Innovation That Inspires" /></FieldWrap>
              <FieldWrap label="Short Description"><Input className="bg-slate-700 border-slate-600" value={field('description')} onChange={set('description')} placeholder="One-line summary shown on the card" /></FieldWrap>
              <FieldWrap label="Paragraph (full text)"><Textarea className="bg-slate-700 border-slate-600" value={field('paragraph')} onChange={set('paragraph')} rows={4} placeholder="Longer paragraph shown inside the card…" /></FieldWrap>
              <FieldWrap label="Card Image">
                <ImageUploadField value={field('image')} folder={folder} onChange={(url) => setForm((f) => ({ ...f, image: url }))} />
              </FieldWrap>
              <FieldWrap label="Order (lower = first)"><Input type="number" className="bg-slate-700 border-slate-600 w-24" value={field('order')} onChange={set('order')} /></FieldWrap>
            </>
          )}

          {/* ---- Testimonials ---- */}
          {dialog.tab === 'testimonials' && (
            <>
              <FieldWrap label="Quote"><Textarea className="bg-slate-700 border-slate-600" value={field('quote')} onChange={set('quote')} rows={3} placeholder="What the client said…" /></FieldWrap>
              <FieldWrap label="Client Name"><Input className="bg-slate-700 border-slate-600" value={field('name')} onChange={set('name')} placeholder="Rajesh Kumar" /></FieldWrap>
              <FieldWrap label="Role / Title"><Input className="bg-slate-700 border-slate-600" value={field('role')} onChange={set('role')} placeholder="Director, Agro-Processing Unit" /></FieldWrap>
              <FieldWrap label="Location"><Input className="bg-slate-700 border-slate-600" value={field('location')} onChange={set('location')} placeholder="Chapar, Dhubri (Assam)" /></FieldWrap>
              <FieldWrap label="Rating (1–5)">
                <div className="flex items-center gap-3">
                  <Input type="number" min={1} max={5} className="bg-slate-700 border-slate-600 w-20" value={form.rating ?? 5} onChange={(e) => setForm((f) => ({ ...f, rating: parseInt(e.target.value, 10) || 5 }))} />
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-4 w-4 cursor-pointer ${i < Number(form.rating ?? 5) ? 'fill-amber-400 text-amber-400' : 'text-slate-600'}`} onClick={() => setForm((f) => ({ ...f, rating: i + 1 }))} />
                    ))}
                  </div>
                </div>
              </FieldWrap>
              <FieldWrap label="Order (lower = first)"><Input type="number" className="bg-slate-700 border-slate-600 w-24" value={field('order')} onChange={set('order')} /></FieldWrap>
            </>
          )}

          {/* ---- Partners / Why Choose Us ---- */}
          {dialog.tab === 'partners' && (
            <>
              <FieldWrap label="Icon">
                <select className="w-full rounded-md border border-slate-600 bg-slate-700 px-3 py-2 text-white text-sm" value={field('iconName')} onChange={set('iconName')}>
                  {iconOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </FieldWrap>
              <FieldWrap label="Title"><Input className="bg-slate-700 border-slate-600" value={field('title')} onChange={set('title')} placeholder="Proven Expertise & Track Record" /></FieldWrap>
              <FieldWrap label="Description"><Textarea className="bg-slate-700 border-slate-600" value={field('description')} onChange={set('description')} rows={3} placeholder="500+ successful installations…" /></FieldWrap>
              <FieldWrap label="Order (lower = first)"><Input type="number" className="bg-slate-700 border-slate-600 w-24" value={field('order')} onChange={set('order')} /></FieldWrap>
            </>
          )}

          {/* ---- Featured Projects ---- */}
          {dialog.tab === 'projects' && (
            <>
              <FieldWrap label="Project Image">
                <ImageUploadField value={field('image')} folder={folder} onChange={(url) => setForm((f) => ({ ...f, image: url }))} />
              </FieldWrap>
              <FieldWrap label="Title"><Input className="bg-slate-700 border-slate-600" value={field('title')} onChange={set('title')} placeholder="Industrial Rooftop" /></FieldWrap>
              <FieldWrap label="Location"><Input className="bg-slate-700 border-slate-600" value={field('location')} onChange={set('location')} placeholder="Ranchi, Jharkhand" /></FieldWrap>
              <FieldWrap label="Capacity"><Input className="bg-slate-700 border-slate-600" value={field('capacity')} onChange={set('capacity')} placeholder="500kW" /></FieldWrap>
              <FieldWrap label="Type">
                <select className="w-full rounded-md border border-slate-600 bg-slate-700 px-3 py-2 text-white text-sm" value={field('type')} onChange={set('type')}>
                  <option value="">Select type…</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Residential">Residential</option>
                  <option value="Infrastructure">Infrastructure</option>
                </select>
              </FieldWrap>
              <FieldWrap label="Popup Description">
                <Textarea className="bg-slate-700 border-slate-600" value={field('description')} onChange={set('description')} rows={3} placeholder="Short paragraph shown in the project popup…" />
              </FieldWrap>
              <FieldWrap label="Popup Highlights (one per line)">
                <Textarea className="bg-slate-700 border-slate-600" value={field('highlights')} onChange={set('highlights')} rows={4} placeholder={"e.g.\nTurnkey EPC delivery\n25-year performance warranty\nRemote monitoring included"} />
              </FieldWrap>
              <FieldWrap label="Order (lower = first)"><Input type="number" className="bg-slate-700 border-slate-600 w-24" value={field('order')} onChange={set('order')} /></FieldWrap>
            </>
          )}

          <DialogFooter className="pt-2">
            <Button type="button" variant="ghost" onClick={onClose} className="text-slate-400 hover:text-white">Cancel</Button>
            <Button type="submit" disabled={saving} className="bg-orange-600 hover:bg-orange-500 text-white min-w-[80px]">
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : isEdit ? 'Save Changes' : 'Add'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function FieldWrap({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-slate-300 text-sm font-medium">{label}</Label>
      {children}
    </div>
  );
}
