'use client';

import { useState, useEffect, useRef } from 'react';
import { getCollection, getDocument, setDocument, addDocument, updateDocument, removeDocument, toFirestore, COLLECTIONS } from '@/lib/firestore';
import type { AboutStat, WhatSetsApart, Leadership, AboutHeroSlide, AboutHeroContent, ProvenProject } from '@/lib/firestore-types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
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
import { Plus, Pencil, Trash2, Loader2, Upload, X, ImageIcon, BarChart3, Sparkles, Users, LayoutTemplate, MapPin } from 'lucide-react';
import { getFirebaseClient } from '@/lib/firebase';
import { uploadImage, validateImageFile } from '@/lib/storage';
import Image from 'next/image';

type TabKey = 'hero' | 'stats' | 'setsApart' | 'proven' | 'leadership';

const ICON_OPTIONS = ['Award', 'Users', 'Zap', 'TrendingUp', 'Wrench', 'Factory', 'ShieldCheck', 'HeartHandshake', 'CheckCircle2', 'Target', 'Eye', 'Compass', 'Star', 'Globe', 'BrainCircuit', 'Leaf', 'Battery', 'Sun'];

const TAB_META: Record<TabKey, { label: string; icon: React.ReactNode; description: string }> = {
  hero:       { label: 'Hero Section',       icon: <LayoutTemplate className="h-4 w-4" />, description: 'Background images and text shown in the top banner of the About page.' },
  stats:      { label: 'Stats',              icon: <BarChart3 className="h-4 w-4" />,      description: 'Numbers shown in the orange banner below the hero (e.g. 500+ Projects, 50MW+ Capacity).' },
  setsApart:  { label: 'What Sets Us Apart', icon: <Sparkles className="h-4 w-4" />,      description: 'Cards on the Services page ("What Sets Us Apart") — each has an icon, title, and description.' },
  proven:     { label: 'Proven Projects',    icon: <MapPin className="h-4 w-4" />,        description: 'Case study cards on the Services page ("Engineering Where Others Hesitate") — each has a location, description, and highlight.' },
  leadership: { label: 'Leadership',         icon: <Users className="h-4 w-4" />,         description: 'Team member profiles shown in the Leadership section with photo, role, and bio.' },
};

const DEFAULT_HERO_CONTENT: AboutHeroContent = {
  badge: 'NEXT-GEN ENERGY TECHNOLOGY & SOLAR EPC',
  title: 'About RaQuadrant',
  titleHighlight: 'Energy',
  tagline1: 'Engineering Trust. Delivering Performance.',
  tagline2: "Powering India's Industrial Future.",
};

export default function AdminAboutPage() {
  const [heroSlides, setHeroSlides]     = useState<AboutHeroSlide[]>([]);
  const [heroContent, setHeroContent]   = useState<AboutHeroContent>(DEFAULT_HERO_CONTENT);
  const [stats, setStats]               = useState<AboutStat[]>([]);
  const [setsApart, setSetsApart]       = useState<WhatSetsApart[]>([]);
  const [leadership, setLeadership]     = useState<Leadership[]>([]);
  const [proven, setProven]             = useState<ProvenProject[]>([]);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState<string | null>(null);
  const [dialog, setDialog]             = useState<{ open: boolean; tab: TabKey; item?: AboutStat | WhatSetsApart | ProvenProject | Leadership }>({ open: false, tab: 'hero' });
  const [deleteTarget, setDeleteTarget] = useState<{ tab: TabKey; id: string; label: string } | null>(null);

  const db = getFirebaseClient()?.db;
  const canEdit = !!db;

  function load() {
    if (!db) return;
    setLoading(true);
    setError(null);
    Promise.all([
      getCollection<AboutHeroSlide>(COLLECTIONS.ABOUT_HERO_SLIDES),
      getDocument<AboutHeroContent>(COLLECTIONS.ABOUT_HERO_CONTENT, 'main'),
      getCollection<AboutStat>(COLLECTIONS.ABOUT_STATS),
      getCollection<WhatSetsApart>(COLLECTIONS.WHAT_SETS_APART),
      getCollection<Leadership>(COLLECTIONS.LEADERSHIP),
      getCollection<ProvenProject>(COLLECTIONS.PROVEN_PROJECTS),
    ])
      .then(([hs, hc, s, a, l, p]) => {
        setHeroSlides(hs);
        setHeroContent(hc ?? DEFAULT_HERO_CONTENT);
        setStats(s);
        setSetsApart(a);
        setLeadership(l);
        setProven(p);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }

  useEffect(() => { load(); }, [!!db]);

  async function handleDelete() {
    if (!deleteTarget) return;
    const colMap: Record<string, string> = {
      stats:      COLLECTIONS.ABOUT_STATS,
      setsApart:  COLLECTIONS.WHAT_SETS_APART,
      proven:     COLLECTIONS.PROVEN_PROJECTS,
      leadership: COLLECTIONS.LEADERSHIP,
      heroSlide:  COLLECTIONS.ABOUT_HERO_SLIDES,
      hero:       COLLECTIONS.ABOUT_HERO_SLIDES,
    };
    const col = colMap[deleteTarget.tab];
    if (col) await removeDocument(col, deleteTarget.id);
    setDeleteTarget(null);
    load();
  }

  if (!canEdit) {
    return <div className="rounded-lg bg-amber-500/20 p-4 text-amber-200">Firebase not configured.</div>;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-10 w-10 animate-spin text-orange-500" />
      </div>
    );
  }

  const counts: Record<TabKey, number> = { hero: heroSlides.length, stats: stats.length, setsApart: setsApart.length, proven: proven.length, leadership: leadership.length };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-headline text-2xl font-bold text-white">About Page Content</h1>
        <p className="text-slate-400 mt-1">Manage stats, what sets us apart, and leadership team.</p>
      </div>

      {error && (
        <div className="rounded-lg bg-red-500/20 p-4 text-red-300 flex items-center gap-2">
          <X className="h-4 w-4 shrink-0" /> {error}
        </div>
      )}

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-3">
        {(Object.keys(TAB_META) as TabKey[]).map((key) => (
          <div key={key} className="rounded-lg border border-slate-700 bg-slate-800/60 p-3 text-center">
            <div className="text-2xl font-bold text-orange-400">{counts[key]}</div>
            <div className="text-xs text-slate-400 mt-0.5">{TAB_META[key].label}</div>
          </div>
        ))}
      </div>

      <Tabs defaultValue="stats" className="space-y-4">
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

        {/* ---- Hero Tab ---- */}
        <TabsContent value="hero" className="space-y-6">
          {/* Hero text content */}
          <HeroContentEditor
            content={heroContent}
            onSaved={(updated) => { setHeroContent(updated); }}
          />

          {/* Hero slide images */}
          <div>
            <SectionHeader
              title="Hero Slide Images"
              description="Each image rotates in the hero background slideshow. Add up to 5 images."
              onAdd={() => {}} // handled inline below
              label=""
              hideButton
            />
            <HeroSlidesList
              slides={heroSlides}
              onDelete={(id, label) => setDeleteTarget({ tab: 'heroSlide' as TabKey, id, label })}
              onAdded={() => load()}
            />
          </div>
        </TabsContent>

        {/* ---- Stats Tab ---- */}
        <TabsContent value="stats">
          <SectionHeader
            title="Stats Bar"
            description={TAB_META.stats.description}
            onAdd={() => setDialog({ open: true, tab: 'stats' })}
            label="Add Stat"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
            {stats.length === 0 && <EmptyState label="No stats yet." />}
            {stats.map((item) => (
              <div key={item.id} className="flex items-center gap-4 rounded-lg border border-slate-700 bg-slate-800/50 p-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-orange-600/20 text-orange-400 text-lg font-black">
                  {String(item.value)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-white">{item.label}</p>
                  <span className="rounded bg-slate-700 px-1.5 py-0.5 text-[10px] text-slate-300">{item.iconName}</span>
                </div>
                <CardActions
                  onEdit={() => setDialog({ open: true, tab: 'stats', item })}
                  onDelete={() => item.id && setDeleteTarget({ tab: 'stats', id: item.id, label: `${item.value} ${item.label}` })}
                />
              </div>
            ))}
          </div>
        </TabsContent>

        {/* ---- What Sets Us Apart Tab ---- */}
        <TabsContent value="setsApart">
          <SectionHeader
            title="What Sets Us Apart"
            description={TAB_META.setsApart.description}
            onAdd={() => setDialog({ open: true, tab: 'setsApart' })}
            label="Add Item"
          />
          <div className="grid grid-cols-1 gap-3 mt-4">
            {setsApart.length === 0 && <EmptyState label="No items yet." />}
            {setsApart.map((item) => (
              <div key={item.id} className="flex items-start gap-4 rounded-lg border border-slate-700 bg-slate-800/50 p-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-orange-600/20 text-orange-400">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="rounded bg-slate-700 px-1.5 py-0.5 text-[10px] text-slate-300">{item.iconName}</span>
                    <p className="font-semibold text-white">{item.title}</p>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">{item.description}</p>
                </div>
                <CardActions
                  onEdit={() => setDialog({ open: true, tab: 'setsApart', item })}
                  onDelete={() => item.id && setDeleteTarget({ tab: 'setsApart', id: item.id, label: item.title })}
                />
              </div>
            ))}
          </div>
        </TabsContent>

        {/* ---- Proven Projects Tab ---- */}
        <TabsContent value="proven">
          <SectionHeader
            title="Proven Capability Projects"
            description={TAB_META.proven.description}
            onAdd={() => setDialog({ open: true, tab: 'proven' })}
            label="Add Project"
          />
          <div className="grid grid-cols-1 gap-3 mt-4">
            {proven.length === 0 && <EmptyState label="No proven projects yet." />}
            {proven.map((item) => (
              <div key={item.id} className="flex items-start gap-4 rounded-lg border border-slate-700 bg-slate-800/50 p-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-orange-600/20 text-orange-400">
                  <MapPin className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-white">{item.location} <span className="text-orange-400">{item.locationHighlight}</span></p>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">{item.description}</p>
                  <span className="inline-block mt-1 rounded bg-slate-700 px-1.5 py-0.5 text-[10px] text-slate-300">{item.highlightLabel}</span>
                </div>
                <CardActions
                  onEdit={() => setDialog({ open: true, tab: 'proven', item })}
                  onDelete={() => item.id && setDeleteTarget({ tab: 'proven', id: item.id, label: `${item.location} ${item.locationHighlight}` })}
                />
              </div>
            ))}
          </div>
        </TabsContent>

        {/* ---- Leadership Tab ---- */}
        <TabsContent value="leadership">
          <SectionHeader
            title="Leadership Team"
            description={TAB_META.leadership.description}
            onAdd={() => setDialog({ open: true, tab: 'leadership' })}
            label="Add Member"
          />
          <div className="grid grid-cols-1 gap-3 mt-4">
            {leadership.length === 0 && <EmptyState label="No leadership members yet." />}
            {leadership.map((item) => (
              <div key={item.id} className="flex items-center gap-4 rounded-lg border border-slate-700 bg-slate-800/50 p-3">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-slate-700 border-2 border-slate-600">
                  {item.image ? (
                    <Image src={item.image} alt={item.name} fill className="object-cover" sizes="64px" unoptimized />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <ImageIcon className="h-6 w-6 text-slate-500" />
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-white">{item.name}</p>
                  <p className="text-sm text-orange-400">{item.role}</p>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-0.5">{item.bio}</p>
                </div>
                <CardActions
                  onEdit={() => setDialog({ open: true, tab: 'leadership', item })}
                  onDelete={() => item.id && setDeleteTarget({ tab: 'leadership', id: item.id, label: item.name })}
                />
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <AboutEditDialog
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

// ---- Shared helpers ----

function SectionHeader({ title, description, onAdd, label, hideButton }: { title: string; description: string; onAdd: () => void; label: string; hideButton?: boolean }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 rounded-lg border border-slate-700 bg-slate-800/40 p-4">
      <div>
        <h2 className="font-semibold text-white">{title}</h2>
        <p className="text-sm text-slate-400 mt-0.5">{description}</p>
      </div>
      {!hideButton && (
        <Button onClick={onAdd} className="shrink-0 bg-orange-600 hover:bg-orange-500 text-white">
          <Plus className="mr-2 h-4 w-4" />{label}
        </Button>
      )}
    </div>
  );
}

function EmptyState({ label }: { label: string }) {
  return (
    <div className="rounded-lg border border-dashed border-slate-700 p-8 text-center text-slate-500 col-span-full">
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

function FieldWrap({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-slate-300 text-sm font-medium">{label}</Label>
      {children}
      {hint && <p className="text-xs text-slate-500">{hint}</p>}
    </div>
  );
}

// ---- Image Upload Field ----

function ImageUploadField({
  value,
  folder,
  onChange,
  circular,
}: {
  value: string;
  folder: string;
  onChange: (url: string) => void;
  circular?: boolean;
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

  return (
    <div className="space-y-2">
      <input ref={fileRef} type="file" accept=".png,.webp,.jpg,.jpeg,image/png,image/webp,image/jpeg" className="hidden" onChange={handleFileSelect} disabled={uploading} />
      {value ? (
        <div className="rounded-lg border border-slate-600 overflow-hidden bg-slate-700/50">
          <div className={`relative w-full ${circular ? 'aspect-square max-h-48 max-w-48 mx-auto' : 'aspect-video max-h-44'}`}>
            <Image src={value} alt="Preview" fill className={`object-cover ${circular ? 'rounded-full' : ''}`} sizes="400px" unoptimized />
          </div>
          <div className="flex items-center justify-between p-2 border-t border-slate-600">
            <span className="text-xs text-slate-400 truncate max-w-[200px]">{value.slice(0, 50)}{value.length > 50 ? '…' : ''}</span>
            <Button type="button" variant="ghost" size="sm" className="text-red-400 hover:text-red-300 shrink-0" onClick={() => { onChange(''); setUploadError(null); }} disabled={uploading}>
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

// ---- Hero Content Editor (single-doc, no dialog needed) ----

function HeroContentEditor({ content, onSaved }: { content: AboutHeroContent; onSaved: (c: AboutHeroContent) => void }) {
  const [form, setForm] = useState<AboutHeroContent>(content);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => { setForm(content); }, [content]);

  function set(key: keyof AboutHeroContent) {
    return (e: React.ChangeEvent<HTMLInputElement>) => setForm((f) => ({ ...f, [key]: e.target.value }));
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      await setDocument(COLLECTIONS.ABOUT_HERO_CONTENT, 'main', { ...form });
      onSaved(form);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="rounded-lg border border-slate-700 bg-slate-800/40 p-4 space-y-4">
      <div>
        <h2 className="font-semibold text-white">Hero Text Content</h2>
        <p className="text-sm text-slate-400 mt-0.5">All text shown over the hero background images.</p>
      </div>
      <form onSubmit={handleSave} className="space-y-3">
        <FieldWrap label="Badge Text" hint="Small pill badge shown at the top of the hero.">
          <Input className="bg-slate-700 border-slate-600" value={form.badge} onChange={set('badge')} placeholder="NEXT-GEN ENERGY TECHNOLOGY & SOLAR EPC" />
        </FieldWrap>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <FieldWrap label="Main Title" hint="First line of the big heading.">
            <Input className="bg-slate-700 border-slate-600" value={form.title} onChange={set('title')} placeholder="About RaQuadrant" />
          </FieldWrap>
          <FieldWrap label="Title Highlight" hint="Second line — shown in gradient colour.">
            <Input className="bg-slate-700 border-slate-600" value={form.titleHighlight} onChange={set('titleHighlight')} placeholder="Energy" />
          </FieldWrap>
        </div>
        <FieldWrap label="Tagline 1" hint="First line below the heading.">
          <Input className="bg-slate-700 border-slate-600" value={form.tagline1} onChange={set('tagline1')} placeholder="Engineering Trust. Delivering Performance." />
        </FieldWrap>
        <FieldWrap label="Tagline 2" hint="Second line below the heading — shown larger/bolder.">
          <Input className="bg-slate-700 border-slate-600" value={form.tagline2} onChange={set('tagline2')} placeholder="Powering India's Industrial Future." />
        </FieldWrap>
        <div className="flex items-center gap-3 pt-1">
          <Button type="submit" disabled={saving} className="bg-orange-600 hover:bg-orange-500 text-white min-w-[110px]">
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Save Text'}
          </Button>
          {saved && <span className="text-sm text-green-400">✓ Saved</span>}
        </div>
      </form>
    </div>
  );
}

// ---- Hero Slides List (images only, inline add/delete) ----

function HeroSlidesList({ slides, onDelete, onAdded }: {
  slides: AboutHeroSlide[];
  onDelete: (id: string, label: string) => void;
  onAdded: () => void;
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
    const err = validateImageFile(file);
    if (err) { setUploadError(err); return; }
    setUploading(true);
    try {
      const url = await uploadImage(file, 'about-hero-slides', (p) => setProgress(p));
      await addDocument(COLLECTIONS.ABOUT_HERO_SLIDES, { image: url, order: slides.length });
      onAdded();
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
      setProgress(0);
    }
  }

  return (
    <div className="mt-4 space-y-3">
      <input ref={fileRef} type="file" accept=".png,.webp,.jpg,.jpeg,image/png,image/webp,image/jpeg" className="hidden" onChange={handleFileSelect} disabled={uploading} />

      {/* Slide thumbnails grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {slides.map((slide, idx) => (
          <div key={slide.id} className="group relative rounded-lg overflow-hidden border border-slate-700 bg-slate-800 aspect-video">
            <Image src={slide.image} alt={`Slide ${idx + 1}`} fill className="object-cover" sizes="300px" unoptimized />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Button
                variant="ghost"
                size="sm"
                className="text-red-400 hover:text-red-300 hover:bg-red-500/20"
                onClick={() => slide.id && onDelete(slide.id, `Slide ${idx + 1}`)}
              >
                <Trash2 className="h-5 w-5" />
              </Button>
            </div>
            <div className="absolute top-1.5 left-1.5 rounded bg-black/60 px-1.5 py-0.5 text-[10px] text-white font-medium">
              #{idx + 1}
            </div>
          </div>
        ))}

        {/* Add new slide button */}
        {slides.length < 6 && (
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-slate-600 bg-slate-800/50 aspect-video hover:border-orange-500/60 hover:bg-slate-700/50 transition-all text-slate-400 hover:text-orange-400 disabled:opacity-50"
          >
            {uploading ? (
              <>
                <Loader2 className="h-6 w-6 animate-spin" />
                <span className="text-xs">{progress}%</span>
              </>
            ) : (
              <>
                <Upload className="h-6 w-6" />
                <span className="text-xs font-medium">Add Image</span>
              </>
            )}
          </button>
        )}
      </div>

      {uploading && (
        <div className="h-1.5 w-full rounded-full bg-slate-700 overflow-hidden">
          <div className="h-full bg-orange-500 transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
      )}
      {uploadError && <p className="text-sm text-red-400">{uploadError}</p>}
      {slides.length === 0 && !uploading && (
        <p className="text-sm text-slate-500 text-center py-2">No slides yet — click &quot;Add Image&quot; to upload the first one.</p>
      )}
    </div>
  );
}

// ---- Edit Dialog ----

function AboutEditDialog({
  dialog,
  onClose,
  onSaved,
  iconOptions,
}: {
  dialog: { open: boolean; tab: TabKey; item?: AboutStat | WhatSetsApart | ProvenProject | Leadership };
  onClose: () => void;
  onSaved: () => void;
  iconOptions: string[];
}) {
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<Record<string, string | number>>({});

  useEffect(() => {
    if (!dialog.open) return;
    const item = dialog.item as Record<string, unknown> | undefined;
    if (item) {
      const f: Record<string, string | number> = {};
      Object.entries(item).forEach(([k, v]) => {
        if (k !== 'id' && (typeof v === 'string' || typeof v === 'number')) f[k] = v;
      });
      setForm(f);
    } else {
      if (dialog.tab === 'stats')      setForm({ iconName: 'Award', value: '', label: '', order: 0 });
      if (dialog.tab === 'setsApart') setForm({ iconName: 'Wrench', title: '', description: '', order: 0 });
      if (dialog.tab === 'proven')    setForm({ location: '', locationHighlight: '', description: '', highlightLabel: '', order: 0 });
      if (dialog.tab === 'leadership') setForm({ name: '', role: '', image: '', bio: '', order: 0 });
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
      const data = toFirestore({ ...form, order } as Record<string, unknown>);

      const colMap: Record<string, string> = {
        hero:       COLLECTIONS.ABOUT_HERO_SLIDES,
        stats:      COLLECTIONS.ABOUT_STATS,
        setsApart:  COLLECTIONS.WHAT_SETS_APART,
        proven:     COLLECTIONS.PROVEN_PROJECTS,
        leadership: COLLECTIONS.LEADERSHIP,
      };
      const col = colMap[dialog.tab];
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

  const singularLabel: Record<string, string> = {
    hero:       'Hero Slide',
    stats:      'Stat',
    setsApart:  'Item',
    proven:     'Proven Project',
    leadership: 'Team Member',
  };

  return (
    <Dialog open={dialog.open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[90vh] overflow-y-auto bg-slate-800 border-slate-700 text-slate-200 sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-white">{isEdit ? 'Edit' : 'Add'} {singularLabel[dialog.tab]}</DialogTitle>
          <p className="text-xs text-slate-500 pt-0.5">{tabLabel}</p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-1">

          {/* ---- Stats Form ---- */}
          {dialog.tab === 'stats' && (
            <>
              <FieldWrap label="Icon" hint="Icon shown beside the stat number on the about page.">
                <select className="w-full rounded-md border border-slate-600 bg-slate-700 px-3 py-2 text-white text-sm" value={field('iconName')} onChange={set('iconName')}>
                  {iconOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </FieldWrap>
              <FieldWrap label="Value" hint="The big number or text shown (e.g. 500+, 50MW+, 98%)">
                <Input className="bg-slate-700 border-slate-600" value={field('value')} onChange={set('value')} placeholder="500+" required />
              </FieldWrap>
              <FieldWrap label="Label" hint="Short description below the value (e.g. Projects Completed)">
                <Input className="bg-slate-700 border-slate-600" value={field('label')} onChange={set('label')} placeholder="Projects Completed" required />
              </FieldWrap>
              <FieldWrap label="Order (lower = first)">
                <Input type="number" className="bg-slate-700 border-slate-600 w-24" value={field('order')} onChange={set('order')} />
              </FieldWrap>
            </>
          )}

          {/* ---- What Sets Us Apart Form ---- */}
          {dialog.tab === 'setsApart' && (
            <>
              <FieldWrap label="Icon">
                <select className="w-full rounded-md border border-slate-600 bg-slate-700 px-3 py-2 text-white text-sm" value={field('iconName')} onChange={set('iconName')}>
                  {iconOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </FieldWrap>
              <FieldWrap label="Title">
                <Input className="bg-slate-700 border-slate-600" value={field('title')} onChange={set('title')} placeholder="Engineering-First Approach" required />
              </FieldWrap>
              <FieldWrap label="Description" hint="2–3 lines explaining this differentiator.">
                <Textarea className="bg-slate-700 border-slate-600" value={field('description')} onChange={set('description')} rows={4} placeholder="Every system is designed based on real load behaviour…" required />
              </FieldWrap>
              <FieldWrap label="Order (lower = first)">
                <Input type="number" className="bg-slate-700 border-slate-600 w-24" value={field('order')} onChange={set('order')} />
              </FieldWrap>
            </>
          )}

          {/* ---- Proven Projects Form ---- */}
          {dialog.tab === 'proven' && (
            <>
              <FieldWrap label="Location" hint="Main location text, e.g. 'Chapar, Dhubri' or 'Howrah,'">
                <Input className="bg-slate-700 border-slate-600" value={field('location')} onChange={set('location')} placeholder="Chapar, Dhubri" required />
              </FieldWrap>
              <FieldWrap label="Location Highlight" hint="Part shown in orange, e.g. '(Assam)' or 'West Bengal'">
                <Input className="bg-slate-700 border-slate-600" value={field('locationHighlight')} onChange={set('locationHighlight')} placeholder="(Assam)" required />
              </FieldWrap>
              <FieldWrap label="Description" hint="Full case study description for this project.">
                <Textarea className="bg-slate-700 border-slate-600" value={field('description')} onChange={set('description')} rows={5} placeholder="We successfully engineered and commissioned a…" required />
              </FieldWrap>
              <FieldWrap label="Highlight Label" hint="Short achievement tag shown at the bottom of the card.">
                <Input className="bg-slate-700 border-slate-600" value={field('highlightLabel')} onChange={set('highlightLabel')} placeholder="First-of-its-kind solution" required />
              </FieldWrap>
              <FieldWrap label="Order (lower = first)">
                <Input type="number" className="bg-slate-700 border-slate-600 w-24" value={field('order')} onChange={set('order')} />
              </FieldWrap>
            </>
          )}

          {/* ---- Leadership Form ---- */}
          {dialog.tab === 'leadership' && (
            <>
              <FieldWrap label="Profile Photo" hint="Square or portrait photo works best. Will be shown in a circle.">
                <ImageUploadField
                  value={field('image')}
                  folder="leadership-photos"
                  onChange={(url) => setForm((f) => ({ ...f, image: url }))}
                  circular
                />
              </FieldWrap>
              <FieldWrap label="Full Name">
                <Input className="bg-slate-700 border-slate-600" value={field('name')} onChange={set('name')} placeholder="Rizul Choudhury" required />
              </FieldWrap>
              <FieldWrap label="Role / Title">
                <Input className="bg-slate-700 border-slate-600" value={field('role')} onChange={set('role')} placeholder="Founder and CEO" required />
              </FieldWrap>
              <FieldWrap label="Bio" hint="Full biography shown on the about page. 3–6 sentences recommended.">
                <Textarea className="bg-slate-700 border-slate-600" value={field('bio')} onChange={set('bio')} rows={8} placeholder="Brief biography of this person…" required />
              </FieldWrap>
              <FieldWrap label="Order (lower = first)">
                <Input type="number" className="bg-slate-700 border-slate-600 w-24" value={field('order')} onChange={set('order')} />
              </FieldWrap>
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
