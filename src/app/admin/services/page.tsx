'use client';

import { useState, useEffect, useRef } from 'react';
import { getCollection, getDocument, setDocument, addDocument, updateDocument, removeDocument, toFirestore, COLLECTIONS } from '@/lib/firestore';
import type { ServiceItem, ScopeOfWorkItem, ExecutionProcessItem, ServicesHeroSlide, ServicesHeroContent } from '@/lib/firestore-types';
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
import { Plus, Pencil, Trash2, Loader2, Upload, X, ImageIcon, LayoutTemplate, Zap, Layers, GitBranch } from 'lucide-react';
import { getFirebaseClient } from '@/lib/firebase';
import { uploadImage, validateImageFile } from '@/lib/storage';
import Image from 'next/image';

type TabKey = 'hero' | 'services' | 'scope' | 'execution';

const ICON_OPTIONS = ['Sun', 'BarChart3', 'Zap', 'LayoutPanelTop', 'FileText', 'Truck', 'HardHat', 'ShieldCheck', 'TrendingUp', 'Clock', 'Star', 'Users', 'Battery', 'Leaf', 'Shield', 'Award'];

const TAB_META: Record<TabKey, { label: string; icon: React.ReactNode; description: string }> = {
  hero:      { label: 'Hero Section',      icon: <LayoutTemplate className="h-4 w-4" />, description: 'Background slideshow images and headline text at the top of the Services page.' },
  services:  { label: 'Services',          icon: <Zap className="h-4 w-4" />,            description: 'The three main service cards: Residential, Commercial, and Infrastructure.' },
  scope:     { label: 'Scope of Work',     icon: <Layers className="h-4 w-4" />,         description: 'The expandable phases shown in the Scope of Work section.' },
  execution: { label: 'Execution Process', icon: <GitBranch className="h-4 w-4" />,      description: 'Step-by-step timeline shown in the Execution Process section.' },
};

const DEFAULT_HERO_CONTENT: ServicesHeroContent = {
  badge: 'End-to-End Premium Solar Solutions',
  titleLine1: 'Our Services &',
  titleLine2: 'Solutions',
  subtitle: 'Complete Solar Excellence from Concept to Commissioning',
};

export default function AdminServicesPage() {
  const [heroSlides, setHeroSlides]     = useState<ServicesHeroSlide[]>([]);
  const [heroContent, setHeroContent]   = useState<ServicesHeroContent>(DEFAULT_HERO_CONTENT);
  const [services, setServices]         = useState<ServiceItem[]>([]);
  const [scopeOfWork, setScopeOfWork]   = useState<ScopeOfWorkItem[]>([]);
  const [execution, setExecution]       = useState<ExecutionProcessItem[]>([]);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState<string | null>(null);
  const [dialog, setDialog]             = useState<{ open: boolean; tab: TabKey; item?: ServiceItem | ScopeOfWorkItem | ExecutionProcessItem }>({ open: false, tab: 'services' });
  const [deleteTarget, setDeleteTarget] = useState<{ col: string; id: string; label: string } | null>(null);

  const db = getFirebaseClient()?.db;
  const canEdit = !!db;

  function load() {
    if (!db) return;
    setLoading(true);
    setError(null);
    Promise.all([
      getCollection<ServicesHeroSlide>(COLLECTIONS.SERVICES_HERO_SLIDES),
      getDocument<ServicesHeroContent>(COLLECTIONS.SERVICES_HERO_CONTENT, 'main'),
      getCollection<ServiceItem>(COLLECTIONS.SERVICES),
      getCollection<ScopeOfWorkItem>(COLLECTIONS.SCOPE_OF_WORK),
      getCollection<ExecutionProcessItem>(COLLECTIONS.EXECUTION_PROCESS),
    ])
      .then(([hs, hc, s, sc, e]) => {
        setHeroSlides(hs);
        setHeroContent(hc ?? DEFAULT_HERO_CONTENT);
        setServices(s);
        setScopeOfWork(sc);
        setExecution(e);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }

  useEffect(() => { load(); }, [!!db]);

  async function handleDelete() {
    if (!deleteTarget) return;
    await removeDocument(deleteTarget.col, deleteTarget.id);
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

  const counts: Record<TabKey, number> = {
    hero:      heroSlides.length,
    services:  services.length,
    scope:     scopeOfWork.length,
    execution: execution.length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-headline text-2xl font-bold text-white">Services Page Content</h1>
        <p className="text-slate-400 mt-1">Manage the hero, services, scope of work, and execution process sections.</p>
      </div>

      {error && (
        <div className="rounded-lg bg-red-500/20 p-4 text-red-300 flex items-center gap-2">
          <X className="h-4 w-4 shrink-0" /> {error}
        </div>
      )}

      {/* Summary Stats */}
      <div className="grid grid-cols-4 gap-3">
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

        {/* ---- Hero Tab ---- */}
        <TabsContent value="hero" className="space-y-6">
          <HeroContentEditor
            content={heroContent}
            onSaved={(updated) => setHeroContent(updated)}
          />
          <div>
            <SectionHeader
              title="Hero Slide Images"
              description="Background images that rotate in the services hero. Add up to 6 images."
              onAdd={() => {}}
              label=""
              hideButton
            />
            <HeroSlidesList
              slides={heroSlides}
              onDelete={(id, label) => setDeleteTarget({ col: COLLECTIONS.SERVICES_HERO_SLIDES, id, label })}
              onAdded={() => load()}
            />
          </div>
        </TabsContent>

        {/* ---- Services Tab ---- */}
        <TabsContent value="services">
          <SectionHeader
            title="Service Cards"
            description={TAB_META.services.description}
            onAdd={() => setDialog({ open: true, tab: 'services' })}
            label="Add Service"
          />
          <div className="grid grid-cols-1 gap-3 mt-4">
            {services.length === 0 && <EmptyState label="No services yet. Add your first service card." />}
            {services.map((item) => (
              <div key={item.id} className="flex items-start gap-4 rounded-lg border border-slate-700 bg-slate-800/50 p-3">
                {item.image ? (
                  <div className="relative h-20 w-32 shrink-0 rounded-lg overflow-hidden bg-slate-700 border border-slate-600">
                    <Image src={item.image} alt={item.title} fill className="object-cover" sizes="128px" unoptimized />
                  </div>
                ) : (
                  <div className="flex h-20 w-32 shrink-0 items-center justify-center rounded-lg bg-slate-700 border border-dashed border-slate-600">
                    <ImageIcon className="h-6 w-6 text-slate-500" />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="rounded bg-orange-600/30 px-1.5 py-0.5 text-[10px] text-orange-300 font-medium">{item.idKey}</span>
                    <span className="rounded bg-slate-700 px-1.5 py-0.5 text-[10px] text-slate-300">{item.iconName}</span>
                  </div>
                  <p className="font-semibold text-white mt-1">{item.title}</p>
                  <p className="text-xs text-slate-400 mt-0.5 line-clamp-2">{item.description}</p>
                  <div className="flex gap-3 mt-1 text-xs text-slate-500">
                    <span>Capacity: {item.capacity}</span>
                    <span>ROI: {item.roi}</span>
                  </div>
                </div>
                <CardActions
                  onEdit={() => setDialog({ open: true, tab: 'services', item })}
                  onDelete={() => item.id && setDeleteTarget({ col: COLLECTIONS.SERVICES, id: item.id, label: item.title })}
                />
              </div>
            ))}
          </div>
        </TabsContent>

        {/* ---- Scope of Work Tab ---- */}
        <TabsContent value="scope">
          <SectionHeader
            title="Scope of Work Phases"
            description={TAB_META.scope.description}
            onAdd={() => setDialog({ open: true, tab: 'scope' })}
            label="Add Phase"
          />
          <div className="grid grid-cols-1 gap-3 mt-4">
            {scopeOfWork.length === 0 && <EmptyState label="No phases yet." />}
            {scopeOfWork.map((item) => (
              <div key={item.id} className="flex items-start gap-4 rounded-lg border border-slate-700 bg-slate-800/50 p-3">
                {item.image ? (
                  <div className="relative h-20 w-32 shrink-0 rounded-lg overflow-hidden bg-slate-700 border border-slate-600">
                    <Image src={item.image} alt={item.phase} fill className="object-cover" sizes="128px" unoptimized />
                  </div>
                ) : (
                  <div className="flex h-20 w-32 shrink-0 items-center justify-center rounded-lg bg-slate-700 border border-dashed border-slate-600">
                    <ImageIcon className="h-6 w-6 text-slate-500" />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="rounded bg-slate-700 px-1.5 py-0.5 text-[10px] text-slate-300">{item.iconName}</span>
                    <span className="rounded bg-slate-700 px-1.5 py-0.5 text-[10px] text-slate-400">color: {item.color}</span>
                  </div>
                  <p className="font-semibold text-white mt-1">{item.phase}</p>
                  <p className="text-xs text-slate-400 mt-0.5 line-clamp-2">{item.content}</p>
                  {item.details?.length > 0 && (
                    <p className="text-xs text-slate-500 mt-0.5">{item.details.length} detail bullet{item.details.length !== 1 ? 's' : ''}</p>
                  )}
                </div>
                <CardActions
                  onEdit={() => setDialog({ open: true, tab: 'scope', item })}
                  onDelete={() => item.id && setDeleteTarget({ col: COLLECTIONS.SCOPE_OF_WORK, id: item.id, label: item.phase })}
                />
              </div>
            ))}
          </div>
        </TabsContent>

        {/* ---- Execution Process Tab ---- */}
        <TabsContent value="execution">
          <SectionHeader
            title="Execution Process Steps"
            description={TAB_META.execution.description}
            onAdd={() => setDialog({ open: true, tab: 'execution' })}
            label="Add Step"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
            {execution.length === 0 && <EmptyState label="No steps yet." />}
            {execution.map((item, idx) => (
              <div key={item.id} className="flex items-center gap-4 rounded-lg border border-slate-700 bg-slate-800/50 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-600/20 text-orange-400 font-bold text-sm">
                  {idx + 1}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="rounded bg-slate-700 px-1.5 py-0.5 text-[10px] text-slate-300">{item.iconName}</span>
                    <span className="text-xs text-slate-500">{item.duration}</span>
                  </div>
                  <p className="font-semibold text-white mt-0.5">{item.name}</p>
                  <p className="text-xs text-slate-400 mt-0.5 line-clamp-2">{item.description}</p>
                </div>
                <CardActions
                  onEdit={() => setDialog({ open: true, tab: 'execution', item })}
                  onDelete={() => item.id && setDeleteTarget({ col: COLLECTIONS.EXECUTION_PROCESS, id: item.id, label: item.name })}
                />
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <ServicesEditDialog
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

function ImageUploadField({ value, folder, onChange }: { value: string; folder: string; onChange: (url: string) => void }) {
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
          <div className="relative w-full aspect-video max-h-44">
            <Image src={value} alt="Preview" fill className="object-cover" sizes="400px" unoptimized />
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
          <Button type="button" variant="outline" className="w-full border-slate-600 bg-slate-700/50 text-slate-300 hover:bg-slate-700" onClick={() => fileRef.current?.click()} disabled={uploading}>
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

// ---- Hero Content Editor ----

function HeroContentEditor({ content, onSaved }: { content: ServicesHeroContent; onSaved: (c: ServicesHeroContent) => void }) {
  const [form, setForm] = useState<ServicesHeroContent>(content);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => { setForm(content); }, [content]);

  function set(key: keyof ServicesHeroContent) {
    return (e: React.ChangeEvent<HTMLInputElement>) => setForm((f) => ({ ...f, [key]: e.target.value }));
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      await setDocument(COLLECTIONS.SERVICES_HERO_CONTENT, 'main', { ...form });
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
        <p className="text-sm text-slate-400 mt-0.5">All text overlaid on the hero slideshow background.</p>
      </div>
      <form onSubmit={handleSave} className="space-y-3">
        <FieldWrap label="Badge Text" hint="Small pill shown at top of the hero section.">
          <Input className="bg-slate-700 border-slate-600" value={form.badge} onChange={set('badge')} placeholder="End-to-End Premium Solar Solutions" />
        </FieldWrap>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <FieldWrap label="Title Line 1" hint="First line of the main heading.">
            <Input className="bg-slate-700 border-slate-600" value={form.titleLine1} onChange={set('titleLine1')} placeholder="Our Services &" />
          </FieldWrap>
          <FieldWrap label="Title Line 2" hint="Second line — shown in gradient.">
            <Input className="bg-slate-700 border-slate-600" value={form.titleLine2} onChange={set('titleLine2')} placeholder="Solutions" />
          </FieldWrap>
        </div>
        <FieldWrap label="Subtitle" hint="Short line shown below the heading.">
          <Input className="bg-slate-700 border-slate-600" value={form.subtitle} onChange={set('subtitle')} placeholder="Complete Solar Excellence from Concept to Commissioning" />
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

// ---- Hero Slides List ----

function HeroSlidesList({ slides, onDelete, onAdded }: {
  slides: ServicesHeroSlide[];
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
      const url = await uploadImage(file, 'services-hero-slides', (p) => setProgress(p));
      await addDocument(COLLECTIONS.SERVICES_HERO_SLIDES, { image: url, order: slides.length });
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

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {slides.map((slide, idx) => (
          <div key={slide.id} className="group relative rounded-lg overflow-hidden border border-slate-700 bg-slate-800 aspect-video">
            <Image src={slide.image} alt={`Slide ${idx + 1}`} fill className="object-cover" sizes="300px" unoptimized />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300 hover:bg-red-500/20" onClick={() => slide.id && onDelete(slide.id, `Slide ${idx + 1}`)}>
                <Trash2 className="h-5 w-5" />
              </Button>
            </div>
            <div className="absolute top-1.5 left-1.5 rounded bg-black/60 px-1.5 py-0.5 text-[10px] text-white font-medium">
              #{idx + 1}
            </div>
          </div>
        ))}

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

function ServicesEditDialog({
  dialog,
  onClose,
  onSaved,
  iconOptions,
}: {
  dialog: { open: boolean; tab: TabKey; item?: ServiceItem | ScopeOfWorkItem | ExecutionProcessItem };
  onClose: () => void;
  onSaved: () => void;
  iconOptions: string[];
}) {
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<Record<string, string | number | string[]>>({});

  useEffect(() => {
    if (!dialog.open) return;
    const item = dialog.item as Record<string, unknown> | undefined;
    if (item) {
      const f: Record<string, string | number | string[]> = {};
      Object.entries(item).forEach(([k, v]) => {
        if (k === 'id') return;
        if (Array.isArray(v)) f[k] = v;
        else if (typeof v === 'string' || typeof v === 'number') f[k] = v;
      });
      setForm(f);
    } else {
      if (dialog.tab === 'services')  setForm({ idKey: 'residential', title: '', description: '', features: [], stats: [], capacity: '', roi: '', gradient: 'from-orange-400 to-amber-500', iconName: 'Sun', image: '', order: 0 });
      if (dialog.tab === 'scope')     setForm({ phase: '', iconName: 'LayoutPanelTop', content: '', details: [], color: 'orange', image: '', order: 0 });
      if (dialog.tab === 'execution') setForm({ name: '', description: '', iconName: 'Sun', duration: '', color: 'from-orange-400 to-amber-500', order: 0 });
    }
  }, [dialog.open, dialog.tab, dialog.item]);

  function field(key: string): string { return String(form[key] ?? ''); }
  function set(key: string) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const item = dialog.item as { id?: string } | undefined;
      const data: Record<string, unknown> = { ...form, order: typeof form.order === 'number' ? form.order : parseInt(String(form.order), 10) || 0 };
      if (dialog.tab === 'services') {
        data.features = typeof form.features === 'string' ? form.features.split('\n').filter(Boolean) : (form.features || []);
        data.stats    = typeof form.stats    === 'string' ? form.stats.split('\n').filter(Boolean)    : (form.stats    || []);
      }
      if (dialog.tab === 'scope') {
        data.details = typeof form.details === 'string' ? form.details.split('\n').filter(Boolean) : (form.details || []);
      }
      const firestoreData = toFirestore(data);
      const colMap: Record<string, string> = {
        services:  COLLECTIONS.SERVICES,
        scope:     COLLECTIONS.SCOPE_OF_WORK,
        execution: COLLECTIONS.EXECUTION_PROCESS,
      };
      const col = colMap[dialog.tab];
      if (item?.id) await updateDocument(col, item.id, firestoreData);
      else await addDocument(col, firestoreData);
      onSaved();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  }

  const singularLabel: Record<string, string> = { services: 'Service', scope: 'Scope Phase', execution: 'Execution Step' };
  const isEdit = !!dialog.item;

  return (
    <Dialog open={dialog.open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[90vh] overflow-y-auto bg-slate-800 border-slate-700 text-slate-200 sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-white">{isEdit ? 'Edit' : 'Add'} {singularLabel[dialog.tab] ?? ''}</DialogTitle>
          <p className="text-xs text-slate-500 pt-0.5">{TAB_META[dialog.tab]?.description}</p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-1">

          {/* ---- Services Form ---- */}
          {dialog.tab === 'services' && (
            <>
              <FieldWrap label="ID Key" hint="Internal identifier: residential, commercial, or infrastructure.">
                <Input className="bg-slate-700 border-slate-600" value={field('idKey')} onChange={set('idKey')} placeholder="residential" required />
              </FieldWrap>
              <FieldWrap label="Title">
                <Input className="bg-slate-700 border-slate-600" value={field('title')} onChange={set('title')} placeholder="Residential Rooftop Solar" required />
              </FieldWrap>
              <FieldWrap label="Description" hint="Short 1–2 line summary shown on the card.">
                <Textarea className="bg-slate-700 border-slate-600" value={field('description')} onChange={set('description')} rows={2} required />
              </FieldWrap>
              <FieldWrap label="Features (one per line)" hint="Each line becomes a bullet point on the card.">
                <Textarea className="bg-slate-700 border-slate-600" value={Array.isArray(form.features) ? form.features.join('\n') : field('features')} onChange={set('features')} rows={4} />
              </FieldWrap>
              <FieldWrap label="Stats (one per line)" hint="Short stat labels shown as pills (e.g. 90% Bill Cut).">
                <Textarea className="bg-slate-700 border-slate-600" value={Array.isArray(form.stats) ? form.stats.join('\n') : field('stats')} onChange={set('stats')} rows={3} />
              </FieldWrap>
              <div className="grid grid-cols-2 gap-3">
                <FieldWrap label="Capacity">
                  <Input className="bg-slate-700 border-slate-600" value={field('capacity')} onChange={set('capacity')} placeholder="1kW to 10kW" />
                </FieldWrap>
                <FieldWrap label="ROI">
                  <Input className="bg-slate-700 border-slate-600" value={field('roi')} onChange={set('roi')} placeholder="20-25% returns" />
                </FieldWrap>
              </div>
              <FieldWrap label="Gradient" hint="Tailwind gradient classes for the card background.">
                <Input className="bg-slate-700 border-slate-600" value={field('gradient')} onChange={set('gradient')} placeholder="from-orange-400 via-amber-400 to-yellow-400" />
              </FieldWrap>
              <FieldWrap label="Icon">
                <select className="w-full rounded-md border border-slate-600 bg-slate-700 px-3 py-2 text-white text-sm" value={field('iconName')} onChange={set('iconName')}>
                  {iconOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </FieldWrap>
              <FieldWrap label="Service Image" hint="Wide image shown on the service card.">
                <ImageUploadField value={field('image')} folder="service-images" onChange={(url) => setForm((f) => ({ ...f, image: url }))} />
              </FieldWrap>
              <FieldWrap label="Order (lower = first)">
                <Input type="number" className="bg-slate-700 border-slate-600 w-24" value={field('order')} onChange={set('order')} />
              </FieldWrap>
            </>
          )}

          {/* ---- Scope Form ---- */}
          {dialog.tab === 'scope' && (
            <>
              <FieldWrap label="Phase Name">
                <Input className="bg-slate-700 border-slate-600" value={field('phase')} onChange={set('phase')} placeholder="Technical Selection & Design" required />
              </FieldWrap>
              <FieldWrap label="Icon">
                <select className="w-full rounded-md border border-slate-600 bg-slate-700 px-3 py-2 text-white text-sm" value={field('iconName')} onChange={set('iconName')}>
                  {iconOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </FieldWrap>
              <FieldWrap label="Content" hint="2–3 sentence description of this phase.">
                <Textarea className="bg-slate-700 border-slate-600" value={field('content')} onChange={set('content')} rows={3} required />
              </FieldWrap>
              <FieldWrap label="Details (one per line)" hint="Each line becomes a bullet in the expanded view.">
                <Textarea className="bg-slate-700 border-slate-600" value={Array.isArray(form.details) ? form.details.join('\n') : field('details')} onChange={set('details')} rows={4} />
              </FieldWrap>
              <FieldWrap label="Color" hint="Accent colour token: orange, amber, or yellow.">
                <Input className="bg-slate-700 border-slate-600" value={field('color')} onChange={set('color')} placeholder="orange" />
              </FieldWrap>
              <FieldWrap label="Phase Image" hint="Photo shown in the expanded accordion panel.">
                <ImageUploadField value={field('image')} folder="scope-images" onChange={(url) => setForm((f) => ({ ...f, image: url }))} />
              </FieldWrap>
              <FieldWrap label="Order (lower = first)">
                <Input type="number" className="bg-slate-700 border-slate-600 w-24" value={field('order')} onChange={set('order')} />
              </FieldWrap>
            </>
          )}

          {/* ---- Execution Form ---- */}
          {dialog.tab === 'execution' && (
            <>
              <FieldWrap label="Step Name">
                <Input className="bg-slate-700 border-slate-600" value={field('name')} onChange={set('name')} placeholder="Site Assessment" required />
              </FieldWrap>
              <FieldWrap label="Description" hint="2–3 sentences explaining this step.">
                <Textarea className="bg-slate-700 border-slate-600" value={field('description')} onChange={set('description')} rows={3} required />
              </FieldWrap>
              <FieldWrap label="Icon">
                <select className="w-full rounded-md border border-slate-600 bg-slate-700 px-3 py-2 text-white text-sm" value={field('iconName')} onChange={set('iconName')}>
                  {iconOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </FieldWrap>
              <FieldWrap label="Duration" hint="How long this step takes (e.g. 1-2 days, 1 week).">
                <Input className="bg-slate-700 border-slate-600" value={field('duration')} onChange={set('duration')} placeholder="1-2 days" />
              </FieldWrap>
              <FieldWrap label="Gradient Color" hint="Tailwind gradient for the step indicator.">
                <Input className="bg-slate-700 border-slate-600" value={field('color')} onChange={set('color')} placeholder="from-orange-400 to-amber-500" />
              </FieldWrap>
              <FieldWrap label="Order (lower = first)">
                <Input type="number" className="bg-slate-700 border-slate-600 w-24" value={field('order')} onChange={set('order')} />
              </FieldWrap>
            </>
          )}

          <DialogFooter>
            <Button type="button" variant="ghost" onClick={onClose} className="text-slate-300 hover:text-white">Cancel</Button>
            <Button type="submit" disabled={saving} className="bg-orange-600 hover:bg-orange-500 text-white">
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Save'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
