'use client';

import { useState, useEffect, useRef } from 'react';
import {
  getCollection,
  addDocument,
  updateDocument,
  removeDocument,
  toFirestore,
  COLLECTIONS,
} from '@/lib/firestore';
import type { BlogPost } from '@/lib/firestore-types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
import {
  Plus,
  Pencil,
  Trash2,
  Loader2,
  Upload,
  X,
  ImageIcon,
  Newspaper,
  Star,
  StarOff,
} from 'lucide-react';
import { getFirebaseClient } from '@/lib/firebase';
import { uploadImage, validateImageFile } from '@/lib/storage';

const CATEGORIES = ['News', 'Blog', 'Press Release'];

const CATEGORY_STYLES: Record<string, string> = {
  News:            'bg-blue-500/20 text-blue-300',
  Blog:            'bg-emerald-500/20 text-emerald-300',
  'Press Release': 'bg-amber-500/20 text-amber-300',
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

type DialogMode = 'add' | 'edit';

const EMPTY_POST: Omit<BlogPost, 'id'> = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  image: '',
  category: 'Blog',
  author: '',
  publishedAt: new Date().toISOString().split('T')[0],
  featured: false,
  order: 0,
};

export default function AdminMediaPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [dialog, setDialog] = useState<{
    open: boolean;
    mode: DialogMode;
    post: Omit<BlogPost, 'id'> & { id?: string };
  }>({ open: false, mode: 'add', post: { ...EMPTY_POST } });

  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; title: string } | null>(null);

  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const db = getFirebaseClient()?.db;
  const canEdit = !!db;

  function load() {
    if (!db) return;
    setLoading(true);
    setError(null);
    getCollection<BlogPost>(COLLECTIONS.BLOG_POSTS)
      .then((list) => setPosts(list))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }

  useEffect(() => { load(); }, [!!db]); // eslint-disable-line react-hooks/exhaustive-deps

  function openAdd() {
    setDialog({ open: true, mode: 'add', post: { ...EMPTY_POST } });
    setUploadError(null);
    setUploadProgress(null);
  }

  function openEdit(post: BlogPost) {
    setDialog({
      open: true,
      mode: 'edit',
      post: { ...post },
    });
    setUploadError(null);
    setUploadProgress(null);
  }

  function closeDialog() {
    setDialog((d) => ({ ...d, open: false }));
  }

  function setField<K extends keyof BlogPost>(key: K, value: BlogPost[K]) {
    setDialog((d) => {
      const updated = { ...d.post, [key]: value };
      if (key === 'title' && d.mode === 'add') {
        updated.slug = slugify(value as string);
      }
      return { ...d, post: updated };
    });
  }

  async function handleImageUpload(file: File) {
    const err = validateImageFile(file);
    if (err) { setUploadError(err); return; }
    setUploadError(null);
    setUploadProgress(0);
    try {
      const url = await uploadImage(file, 'blog-images', (p) => setUploadProgress(p));
      setField('image', url);
    } catch (e) {
      setUploadError(e instanceof Error ? e.message : 'Upload failed');
    } finally {
      setUploadProgress(null);
    }
  }

  async function handleSave() {
    if (!dialog.post.title.trim() || !dialog.post.content.trim()) {
      setError('Title and Content are required.');
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const data = toFirestore({ ...dialog.post, order: dialog.post.order ?? 0 });
      if (dialog.mode === 'add') {
        await addDocument(COLLECTIONS.BLOG_POSTS, data);
      } else if (dialog.post.id) {
        await updateDocument(COLLECTIONS.BLOG_POSTS, dialog.post.id, data);
      }
      closeDialog();
      load();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    try {
      await removeDocument(COLLECTIONS.BLOG_POSTS, deleteTarget.id);
      setDeleteTarget(null);
      load();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Delete failed');
    }
  }

  async function toggleFeatured(post: BlogPost) {
    if (!post.id) return;
    try {
      await updateDocument(COLLECTIONS.BLOG_POSTS, post.id, { featured: !post.featured });
      load();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Update failed');
    }
  }

  if (!canEdit) {
    return (
      <div className="rounded-lg bg-amber-500/20 p-4 text-amber-200">
        Firebase not configured. Add environment variables to enable editing.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-headline text-2xl font-bold text-white flex items-center gap-2">
            <Newspaper className="h-6 w-6 text-orange-400" />
            Media &amp; Blog Posts
          </h1>
          <p className="text-slate-400 mt-1">
            Add, edit, and manage all news articles and blog posts shown on the Media page.
          </p>
        </div>
        <Button
          onClick={openAdd}
          className="bg-orange-600 hover:bg-orange-500 text-white gap-2"
        >
          <Plus className="h-4 w-4" /> Add Post
        </Button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-3">
        {CATEGORIES.map((cat) => (
          <div key={cat} className="rounded-lg border border-slate-700 bg-slate-800/60 p-3 text-center">
            <div className="text-2xl font-bold text-orange-400">
              {posts.filter((p) => p.category === cat).length}
            </div>
            <div className="text-xs text-slate-400 mt-0.5">{cat}</div>
          </div>
        ))}
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-lg bg-red-500/20 p-4 text-red-300 flex items-center gap-2">
          <X className="h-4 w-4 shrink-0" /> {error}
          <button className="ml-auto" onClick={() => setError(null)}>
            <X className="h-3 w-3" />
          </button>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
        </div>
      )}

      {/* Posts list */}
      {!loading && posts.length === 0 && (
        <div className="rounded-lg border border-dashed border-slate-700 p-12 text-center text-slate-500">
          <Newspaper className="h-10 w-10 mx-auto mb-3 opacity-40" />
          <p className="font-medium">No blog posts yet.</p>
          <p className="text-sm mt-1">Click &ldquo;Add Post&rdquo; to create your first article.</p>
        </div>
      )}

      {!loading && posts.length > 0 && (
        <div className="space-y-3">
          {posts.map((post) => (
            <div
              key={post.id}
              className="flex items-start gap-4 rounded-xl border border-slate-700 bg-slate-800/50 p-4"
            >
              {/* Thumbnail */}
              <div className="shrink-0 h-16 w-24 rounded-lg overflow-hidden bg-slate-700 border border-slate-600">
                {post.image ? (
                  <img src={post.image} alt={post.title} className="h-full w-full object-cover" />
                ) : (
                  <div className="h-full w-full flex items-center justify-center">
                    <ImageIcon className="h-6 w-6 text-slate-500" />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${CATEGORY_STYLES[post.category] ?? 'bg-slate-700 text-slate-300'}`}>
                    {post.category}
                  </span>
                  {post.featured && (
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-300">
                      Featured
                    </span>
                  )}
                </div>
                <p className="font-semibold text-white text-sm leading-snug line-clamp-1">
                  {post.title}
                </p>
                <p className="text-slate-400 text-xs mt-0.5 line-clamp-1">
                  {post.author} · {new Date(post.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1 shrink-0">
                <button
                  title={post.featured ? 'Unfeature' : 'Set as Featured'}
                  onClick={() => toggleFeatured(post)}
                  className="p-2 rounded-lg text-slate-400 hover:bg-orange-500/10 hover:text-orange-400 transition-colors"
                >
                  {post.featured ? <Star className="h-4 w-4 fill-orange-400 text-orange-400" /> : <StarOff className="h-4 w-4" />}
                </button>
                <button
                  onClick={() => openEdit(post)}
                  className="p-2 rounded-lg text-slate-400 hover:bg-blue-500/10 hover:text-blue-400 transition-colors"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setDeleteTarget({ id: post.id!, title: post.title })}
                  className="p-2 rounded-lg text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Add / Edit Dialog ── */}
      <Dialog open={dialog.open} onOpenChange={(open) => { if (!open) closeDialog(); }}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-slate-900 border-slate-700 text-slate-200">
          <DialogHeader>
            <DialogTitle className="text-white">
              {dialog.mode === 'add' ? 'Add Blog Post' : 'Edit Blog Post'}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            {/* Title */}
            <div className="space-y-1.5">
              <Label className="text-slate-300">Title *</Label>
              <Input
                value={dialog.post.title}
                onChange={(e) => setField('title', e.target.value)}
                placeholder="Enter article title"
                className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-500"
              />
            </div>

            {/* Slug */}
            <div className="space-y-1.5">
              <Label className="text-slate-300">Slug</Label>
              <Input
                value={dialog.post.slug}
                onChange={(e) => setField('slug', slugify(e.target.value))}
                placeholder="auto-generated-from-title"
                className="bg-slate-800 border-slate-600 text-slate-400 placeholder:text-slate-600 font-mono text-sm"
              />
            </div>

            {/* Category + Author row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-slate-300">Category *</Label>
                <select
                  value={dialog.post.category}
                  onChange={(e) => setField('category', e.target.value)}
                  className="w-full h-9 rounded-md border border-slate-600 bg-slate-800 text-white px-3 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-slate-300">Author</Label>
                <Input
                  value={dialog.post.author}
                  onChange={(e) => setField('author', e.target.value)}
                  placeholder="Author name"
                  className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-500"
                />
              </div>
            </div>

            {/* Date + Order row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-slate-300">Published Date</Label>
                <Input
                  type="date"
                  value={dialog.post.publishedAt?.split('T')[0] ?? ''}
                  onChange={(e) => setField('publishedAt', e.target.value + 'T00:00:00.000Z')}
                  className="bg-slate-800 border-slate-600 text-white"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-slate-300">Sort Order</Label>
                <Input
                  type="number"
                  value={dialog.post.order ?? 0}
                  onChange={(e) => setField('order', Number(e.target.value))}
                  className="bg-slate-800 border-slate-600 text-white"
                />
              </div>
            </div>

            {/* Featured toggle */}
            <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-800 border border-slate-700">
              <input
                id="featured-toggle"
                type="checkbox"
                checked={!!dialog.post.featured}
                onChange={(e) => setField('featured', e.target.checked)}
                className="h-4 w-4 accent-orange-500 rounded"
              />
              <Label htmlFor="featured-toggle" className="text-slate-300 cursor-pointer">
                Mark as Featured (shown prominently at the top of the Media page)
              </Label>
            </div>

            {/* Image upload */}
            <div className="space-y-2">
              <Label className="text-slate-300">Cover Image</Label>
              <div
                className="relative border-2 border-dashed border-slate-600 rounded-xl p-4 hover:border-orange-500/60 transition-colors cursor-pointer group"
                onClick={() => fileInputRef.current?.click()}
              >
                {dialog.post.image ? (
                  <div className="relative">
                    <img
                      src={dialog.post.image}
                      alt="Cover"
                      className="h-40 w-full object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); setField('image', ''); }}
                      className="absolute top-2 right-2 p-1 bg-red-600/80 rounded-full text-white hover:bg-red-600 transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2 py-6 text-slate-500 group-hover:text-orange-400 transition-colors">
                    <Upload className="h-8 w-8" />
                    <p className="text-sm font-medium">Click to upload cover image</p>
                    <p className="text-xs">PNG, JPG, WebP · max 5 MB</p>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleImageUpload(file);
                    e.target.value = '';
                  }}
                />
              </div>

              {/* Or paste URL */}
              <Input
                value={dialog.post.image}
                onChange={(e) => setField('image', e.target.value)}
                placeholder="Or paste an image URL directly"
                className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-500 text-sm"
              />

              {uploadProgress !== null && (
                <div className="space-y-1">
                  <div className="h-1.5 w-full bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-orange-500 rounded-full transition-all"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                  <p className="text-xs text-slate-400">Uploading… {uploadProgress}%</p>
                </div>
              )}
              {uploadError && (
                <p className="text-xs text-red-400">{uploadError}</p>
              )}
            </div>

            {/* Excerpt */}
            <div className="space-y-1.5">
              <Label className="text-slate-300">Excerpt / Summary *</Label>
              <Textarea
                value={dialog.post.excerpt}
                onChange={(e) => setField('excerpt', e.target.value)}
                placeholder="A short description shown in the article card (2–3 sentences)"
                rows={3}
                className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-500 resize-none"
              />
            </div>

            {/* Content */}
            <div className="space-y-1.5">
              <Label className="text-slate-300">Full Content *</Label>
              <p className="text-xs text-slate-500">
                Separate paragraphs with a blank line. The content is shown when a reader opens the article.
              </p>
              <Textarea
                value={dialog.post.content}
                onChange={(e) => setField('content', e.target.value)}
                placeholder="Write the full article content here…&#10;&#10;Separate paragraphs with a blank line."
                rows={12}
                className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-500 resize-y font-mono text-sm"
              />
            </div>
          </div>

          <DialogFooter className="gap-2 pt-2">
            <Button
              variant="ghost"
              onClick={closeDialog}
              className="text-slate-400 hover:text-white"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={saving || uploadProgress !== null}
              className="bg-orange-600 hover:bg-orange-500 text-white gap-2 min-w-[100px]"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {dialog.mode === 'add' ? 'Publish Post' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Delete Confirm ── */}
      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => { if (!open) setDeleteTarget(null); }}>
        <AlertDialogContent className="bg-slate-900 border-slate-700 text-slate-200">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Delete Post?</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-400">
              &ldquo;{deleteTarget?.title}&rdquo; will be permanently deleted. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-slate-600 text-slate-300 hover:bg-slate-800">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-500 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
