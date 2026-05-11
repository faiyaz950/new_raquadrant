'use client';

import Link from 'next/link';
import { Home, Users, Wrench, MessageSquare, ArrowRight } from 'lucide-react';

const cards = [
  { href: '/admin/home', title: 'Home Page', desc: 'Hero slides, intro points, testimonials, partners, projects', icon: Home },
  { href: '/admin/about', title: 'About Page', desc: 'Stats, what sets us apart, leadership', icon: Users },
  { href: '/admin/services', title: 'Services Page', desc: 'Services list, scope of work, execution process', icon: Wrench },
  { href: '/admin/contacts', title: 'Contact Submissions', desc: 'View and manage contact form submissions', icon: MessageSquare },
];

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="font-headline text-2xl font-bold text-white mb-2">Dashboard</h1>
      <p className="text-slate-400 mb-8">Select a section to manage website content.</p>
      <div className="grid gap-4 sm:grid-cols-2">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.href}
              href={card.href}
              className="flex items-start gap-4 rounded-xl border border-slate-700 bg-slate-800/50 p-6 transition-colors hover:border-orange-500/50 hover:bg-slate-800"
            >
              <div className="rounded-lg bg-orange-600/20 p-3">
                <Icon className="h-6 w-6 text-orange-400" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="font-semibold text-white">{card.title}</h2>
                <p className="mt-1 text-sm text-slate-400">{card.desc}</p>
              </div>
              <ArrowRight className="h-5 w-5 text-slate-500 shrink-0" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
