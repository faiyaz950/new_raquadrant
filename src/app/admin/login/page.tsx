'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { getFirebaseClient } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock, Mail, Loader2, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/admin';
  // Only check Firebase after client mount (server has no window, so getFirebaseClient() is null and button would stay disabled)
  const fb = mounted ? getFirebaseClient() : null;
  const firebaseNotConfigured = mounted && !fb?.auth;

  useEffect(() => {
    setMounted(true);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const firebase = getFirebaseClient();
      if (!firebase?.auth) throw new Error('Firebase not configured. Add NEXT_PUBLIC_FIREBASE_* to .env.local');
      await signInWithEmailAndPassword(firebase.auth, email, password);
      router.push(redirect);
      router.refresh();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Login failed';
      setError(message.includes('auth/') ? 'Invalid email or password.' : message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-orange-900/20 p-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-700/50 bg-slate-800/80 p-8 shadow-2xl">
        <div className="mb-8 text-center">
          <h1 className="font-headline text-2xl font-bold text-white">Admin Login</h1>
          <p className="mt-2 text-sm text-slate-400">RaQuadrant Content Management</p>
        </div>
        {firebaseNotConfigured && (
          <div className="mb-6 flex items-start gap-3 rounded-lg border border-amber-500/50 bg-amber-500/20 px-4 py-3 text-sm text-amber-200">
            <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Firebase not configured</p>
              <p className="mt-1 text-amber-200/90">Add <code className="rounded bg-slate-700 px-1">NEXT_PUBLIC_FIREBASE_API_KEY</code> and other env vars to <code className="rounded bg-slate-700 px-1">.env.local</code>. See <code className="rounded bg-slate-700 px-1">.env.local.example</code>.</p>
            </div>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="rounded-lg bg-red-500/20 px-4 py-3 text-sm text-red-300">{error}</div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-300">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                required
                className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-slate-300">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500"
              />
            </div>
          </div>
          <Button
            type="submit"
            disabled={loading || firebaseNotConfigured}
            className="w-full bg-orange-600 hover:bg-orange-500 text-white"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </Button>
        </form>
        <p className="mt-6 text-center text-sm text-slate-500">
          <Link href="/" className="text-orange-400 hover:underline">Back to website</Link>
        </p>
      </div>
    </div>
  );
}
