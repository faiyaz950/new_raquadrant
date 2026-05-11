'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirebaseClient } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  Home,
  Users,
  Wrench,
  MessageSquare,
  LogOut,
  Loader2,
  FileText,
  Target,
  Zap,
} from 'lucide-react';

const nav = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/home', label: 'Home Page', icon: Home },
  { href: '/admin/about', label: 'About Page', icon: Users },
  { href: '/admin/services', label: 'Services Page', icon: Wrench },
  { href: '/admin/contacts', label: 'Contact Submissions', icon: MessageSquare },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [authReady, setAuthReady] = useState(false);
  const [user, setUser] = useState<unknown>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const fb = getFirebaseClient();
    if (!fb?.auth) {
      setAuthReady(true);
      setUser(null);
      if (!pathname?.startsWith('/admin/login')) {
        router.replace(`/admin/login?redirect=${encodeURIComponent(pathname || '/admin')}`);
      }
      return;
    }
    const unsub = onAuthStateChanged(fb.auth, (u) => {
      setUser(u);
      setAuthReady(true);
      if (u === null && !pathname?.startsWith('/admin/login')) {
        router.replace(`/admin/login?redirect=${encodeURIComponent(pathname || '/admin')}`);
      }
    });
    return () => unsub();
  }, [pathname, router]);

  async function handleSignOut() {
    const fb = getFirebaseClient();
    if (fb?.auth) {
      await signOut(fb.auth);
      router.replace('/admin/login');
      router.refresh();
    }
  }

  if (!authReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <Loader2 className="h-10 w-10 animate-spin text-orange-500" />
      </div>
    );
  }

  if (pathname?.startsWith('/admin/login')) {
    return <>{children}</>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen flex bg-slate-900">
      <aside className="w-64 border-r border-slate-700/50 bg-slate-800/50 p-4 flex flex-col">
        <div className="mb-6">
          <Link href="/admin" className="flex items-center gap-2 text-orange-400 font-headline font-bold">
            <Zap className="h-6 w-6" />
            Admin
          </Link>
        </div>
        <nav className="flex-1 space-y-1">
          {nav.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                  active ? 'bg-orange-600/30 text-orange-300' : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <Button
          variant="ghost"
          className="mt-4 w-full justify-start text-slate-400 hover:text-red-400 hover:bg-red-500/10"
          onClick={handleSignOut}
        >
          <LogOut className="mr-3 h-4 w-4" />
          Sign Out
        </Button>
      </aside>
      <main className="flex-1 overflow-auto p-6 text-slate-200">
        {children}
      </main>
    </div>
  );
}
