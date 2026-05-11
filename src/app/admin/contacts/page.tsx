'use client';

import { useContactSubmissions } from '@/hooks/use-site-content';
import { Button } from '@/components/ui/button';
import { removeDocument, COLLECTIONS } from '@/lib/firestore';
import { Loader2, Trash2, Mail, User, MessageSquare, Calendar } from 'lucide-react';
import { getFirebaseClient } from '@/lib/firebase';

export default function AdminContactsPage() {
  const { data: submissions, loading, error } = useContactSubmissions();
  const db = getFirebaseClient()?.db;

  async function handleDelete(id: string) {
    if (!db || !confirm('Delete this submission?')) return;
    await removeDocument(COLLECTIONS.CONTACT_SUBMISSIONS, id);
    window.location.reload();
  }

  if (!db) {
    return (
      <div className="rounded-lg bg-amber-500/20 p-4 text-amber-200">Firebase not configured.</div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg bg-red-500/20 p-4 text-red-300">{error.message}</div>
    );
  }

  return (
    <div>
      <h1 className="font-headline text-2xl font-bold text-white mb-2">Contact Submissions</h1>
      <p className="text-slate-400 mb-6">View and manage contact form submissions from the website.</p>
      {submissions.length === 0 ? (
        <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-8 text-center text-slate-400">
          No submissions yet.
        </div>
      ) : (
        <div className="space-y-4">
          {submissions.map((s) => (
            <div
              key={s.id}
              className="rounded-lg border border-slate-700 bg-slate-800/50 p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1 space-y-2">
                  <div className="flex items-center gap-2 text-slate-500 text-sm">
                    <Calendar className="h-4 w-4" />
                    {s.createdAt ? new Date(s.createdAt).toLocaleString() : '—'}
                  </div>
                  <p className="flex items-center gap-2 font-medium text-white">
                    <User className="h-4 w-4 text-orange-400" />
                    {s.name}
                  </p>
                  <p className="flex items-center gap-2 text-slate-300 text-sm">
                    <Mail className="h-4 w-4 text-orange-400" />
                    {s.email}
                    {s.phone && ` · ${s.phone}`}
                  </p>
                  <p className="font-medium text-orange-300">{s.subject}</p>
                  <p className="text-slate-400 text-sm whitespace-pre-wrap">{s.message}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-400 hover:text-red-300 shrink-0"
                  onClick={() => s.id && handleDelete(s.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
