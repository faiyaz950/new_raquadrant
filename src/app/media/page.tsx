'use client';

import React, { useState, useMemo } from 'react';
import { useBlogPosts } from '@/hooks/use-site-content';
import type { BlogPost } from '@/lib/firestore-types';
import {
  Calendar, User, Tag, ArrowRight, BookOpen,
  Search, X, Clock, Rss,
} from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';

const CATEGORIES = ['All', 'News', 'Blog', 'Press Release'];

const CATEGORY_STYLES: Record<string, string> = {
  'News':          'bg-orange-100 text-orange-700 border border-orange-200',
  'Blog':          'bg-amber-100 text-amber-700 border border-amber-200',
  'Press Release': 'bg-yellow-100 text-yellow-700 border border-yellow-200',
};

const FALLBACK_POSTS: BlogPost[] = [
  {
    id: 'fb-1',
    title: 'RaQuadrant Completes 500+ Solar Installations Across Eastern India',
    slug: 'raquadrant-500-installations',
    excerpt: 'RaQuadrant Energy has reached a significant milestone, completing over 500 solar installations across residential, commercial, and industrial segments in Eastern India.',
    content: 'RaQuadrant Energy has reached a significant milestone, completing over 500 solar installations across residential, commercial, and industrial segments in Eastern India.\n\nThis achievement reflects the company\'s commitment to delivering reliable, high-quality solar solutions to customers across the region. Every installation follows a strict quality checklist and post-commissioning inspection before handover.\n\nThe installations range from small rooftop systems for homes to large-scale industrial projects exceeding 1 MW capacity — each customised to maximise generation and return on investment for the customer.',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=900&auto=format&fit=crop',
    category: 'News',
    author: 'RaQuadrant Team',
    publishedAt: '2024-03-15T00:00:00.000Z',
    featured: true,
    order: 1,
  },
  {
    id: 'fb-2',
    title: '5 Reasons Why Solar Energy is the Future of Industrial Power',
    slug: 'solar-future-industrial-power',
    excerpt: 'As energy costs continue to rise, industries across India are turning to solar power as a sustainable and cost-effective alternative.',
    content: 'As energy costs continue to rise, industries across India are turning to solar power as a sustainable and cost-effective alternative.\n\n1. Significant reduction in electricity bills — industrial consumers can cut power costs by 60–80% with on-site solar generation.\n\n2. Low maintenance requirements — modern solar panels have no moving parts and typically require only periodic cleaning and annual inspections.\n\n3. Long-term return on investment — most industrial solar systems pay back their capital cost within 4–6 years, then generate free electricity for 20+ more years.\n\n4. Environmental sustainability — switching to solar dramatically reduces a facility\'s carbon footprint and helps companies meet ESG commitments.\n\n5. Energy independence — on-site solar with battery backup protects businesses from grid outages and tariff volatility.',
    image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=900&auto=format&fit=crop',
    category: 'Blog',
    author: 'RaQuadrant Energy',
    publishedAt: '2024-02-20T00:00:00.000Z',
    featured: false,
    order: 2,
  },
  {
    id: 'fb-3',
    title: 'RaQuadrant Launches Dedicated Agri-Solar Division',
    slug: 'agri-solar-division-launch',
    excerpt: 'RaQuadrant Energy announces the launch of its dedicated Agri-Solar division, providing solar-powered irrigation and farming solutions to smallholder farmers.',
    content: 'RaQuadrant Energy today announced the launch of its dedicated Agri-Solar division, providing solar-powered irrigation and farming solutions to smallholder farmers across Eastern India.\n\nThe new division will offer customised solar pump systems, drip-irrigation integration, and remote monitoring tools — helping farmers reduce diesel dependency and irrigate reliably throughout the year.\n\nThe Agri-Solar initiative is backed by government subsidy schemes and RaQuadrant\'s in-house financing options, making clean energy accessible to farms of all sizes.',
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=900&auto=format&fit=crop',
    category: 'Press Release',
    author: 'RaQuadrant Communications',
    publishedAt: '2024-01-10T00:00:00.000Z',
    featured: false,
    order: 3,
  },
  {
    id: 'fb-4',
    title: 'Understanding Net Metering: A Guide for Solar Owners',
    slug: 'net-metering-guide',
    excerpt: 'Net metering lets you export surplus solar energy back to the grid and earn credits on your electricity bill. Here\'s everything you need to know.',
    content: 'Net metering is a billing mechanism that credits solar energy system owners for the electricity they add to the grid.\n\nHow it works: When your solar panels produce more power than your home or business consumes, the surplus flows back to the utility grid. Your electricity meter runs backwards, and you receive a credit equivalent to the retail electricity rate.\n\nEligibility: In India, net metering is available to consumers under DISCOM schemes in most states. The capacity limit varies — typically up to 1 MW for commercial and industrial consumers.\n\nBenefits: Net metering significantly improves the financial returns of a solar investment, often reducing or eliminating your monthly electricity bill entirely.\n\nRaQuadrant handles the complete net metering application and grid approval process for all our customers.',
    image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=900&auto=format&fit=crop',
    category: 'Blog',
    author: 'RaQuadrant Energy',
    publishedAt: '2023-12-05T00:00:00.000Z',
    featured: false,
    order: 4,
  },
];

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString('en-IN', {
      day: 'numeric', month: 'long', year: 'numeric',
    });
  } catch {
    return iso;
  }
}

function readingTime(text: string) {
  const words = text.split(/\s+/).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}

export default function MediaPage() {
  const { data: postsFromDb, loading } = useBlogPosts();
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const posts = postsFromDb.length > 0 ? postsFromDb : FALLBACK_POSTS;

  const filtered = useMemo(() => {
    let result = [...posts];
    if (activeCategory !== 'All') {
      result = result.filter((p) => p.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.author.toLowerCase().includes(q),
      );
    }
    return result;
  }, [posts, activeCategory, searchQuery]);

  const featuredPost = filtered.find((p) => p.featured) ?? filtered[0];
  const gridPosts = featuredPost
    ? filtered.filter((p) => p.id !== featuredPost.id)
    : filtered;

  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero ── */}
      <section className="relative py-20 sm:py-28 overflow-hidden" style={{ background: 'linear-gradient(135deg, #f97316 0%, #f59e0b 55%, #fbbf24 100%)' }}>
        {/* dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1.5px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />
        {/* light orbs */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-16 w-80 h-80 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 border border-white/30 backdrop-blur-sm mb-6">
            <Rss className="h-3.5 w-3.5 text-white" />
            <span className="text-white text-xs font-bold tracking-widest uppercase">
              Blogs & Insights
            </span>
          </div>

          <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-white mb-4 leading-tight drop-shadow-sm">
            News, Articles &{' '}
            <span className="text-white/90 underline decoration-white/40 underline-offset-4">
              Blog Posts
            </span>
          </h1>

          <p className="text-white/85 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Stay updated with the latest news, insights, and stories from
            RaQuadrant Energy — India&apos;s trusted solar EPC partner.
          </p>

          {/* Search bar */}
          <div className="mt-8 max-w-md mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-10 py-3 rounded-full bg-white shadow-lg text-gray-800 placeholder:text-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-white/60 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ── Category Filter ── */}
      <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex items-center gap-2 py-3 overflow-x-auto scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 shrink-0 ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-[var(--color-sunrise)] to-amber-500 text-white shadow-md shadow-orange-400/30'
                    : 'text-gray-500 hover:text-[var(--color-sunrise)] hover:bg-orange-50'
                }`}
              >
                {cat}
                <span className={`ml-1.5 text-[11px] font-normal ${activeCategory === cat ? 'text-white/80' : 'text-gray-400'}`}>
                  ({cat === 'All' ? posts.length : posts.filter(p => p.category === cat).length})
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-6xl">

          {/* Loading */}
          {loading && (
            <div className="flex justify-center py-20">
              <div className="h-10 w-10 border-4 border-[var(--color-sunrise)] border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {/* Empty */}
          {!loading && filtered.length === 0 && (
            <div className="text-center py-20 text-gray-400">
              <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-30" />
              <p className="text-lg font-semibold text-gray-500">No articles found</p>
              <p className="text-sm mt-1">Try a different category or search term.</p>
            </div>
          )}

          {!loading && filtered.length > 0 && (
            <>
              {/* ── Featured Post ── */}
              {featuredPost && (
                <div className="mb-12">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="h-px flex-1 bg-gradient-to-r from-[var(--color-sunrise)] to-transparent" />
                    <span className="text-xs font-bold text-[var(--color-sunrise)] uppercase tracking-widest">Featured Story</span>
                    <div className="h-px flex-1 bg-gradient-to-l from-[var(--color-sunrise)] to-transparent" />
                  </div>
                  <div
                    className="group cursor-pointer rounded-3xl overflow-hidden border border-orange-100 shadow-lg hover:shadow-2xl hover:shadow-orange-200/40 transition-all duration-500 md:flex bg-white"
                    onClick={() => setSelectedPost(featuredPost)}
                  >
                    {/* Image */}
                    <div className="md:w-[48%] relative h-64 md:h-auto overflow-hidden shrink-0">
                      <img
                        src={featuredPost.image}
                        alt={featuredPost.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-black/10" />
                      <div className="absolute top-4 left-4 flex gap-2">
                        <span className="bg-gradient-to-r from-[var(--color-sunrise)] to-amber-500 text-white text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-wide shadow-md">
                          Featured
                        </span>
                        <span className={`text-[11px] font-bold px-3 py-1 rounded-full ${CATEGORY_STYLES[featuredPost.category] ?? 'bg-gray-100 text-gray-700'}`}>
                          {featuredPost.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-8 sm:p-10 flex flex-col justify-center">
                      <h2 className="font-display font-black text-2xl sm:text-3xl text-gray-900 mb-4 leading-tight group-hover:text-[var(--color-sunrise)] transition-colors duration-200">
                        {featuredPost.title}
                      </h2>
                      <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-6 line-clamp-3">
                        {featuredPost.excerpt}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 mb-7 pb-6 border-b border-gray-100">
                        <span className="flex items-center gap-1.5">
                          <User className="h-3.5 w-3.5 text-[var(--color-sunrise)]" />
                          {featuredPost.author}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5 text-[var(--color-sunrise)]" />
                          {formatDate(featuredPost.publishedAt)}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5 text-[var(--color-sunrise)]" />
                          {readingTime(featuredPost.content)}
                        </span>
                      </div>
                      <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[var(--color-sunrise)] to-amber-500 text-white font-bold text-sm shadow-md shadow-orange-400/30 w-fit group-hover:shadow-orange-400/50 transition-shadow">
                        Read Article
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── Blog Grid ── */}
              {gridPosts.length > 0 && (
                <>
                  {featuredPost && (
                    <div className="flex items-center gap-3 mb-6">
                      <div className="h-px flex-1 bg-gray-100" />
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">More Articles</span>
                      <div className="h-px flex-1 bg-gray-100" />
                    </div>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {gridPosts.map((post) => (
                      <article
                        key={post.id}
                        className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-orange-200 shadow-sm hover:shadow-xl hover:shadow-orange-100/60 transition-all duration-300 cursor-pointer flex flex-col"
                        onClick={() => setSelectedPost(post)}
                      >
                        {/* Card image */}
                        <div className="relative h-48 overflow-hidden shrink-0">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <span className={`absolute top-3 left-3 text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm ${CATEGORY_STYLES[post.category] ?? 'bg-gray-100 text-gray-600'}`}>
                            {post.category}
                          </span>
                        </div>

                        {/* Card body */}
                        <div className="p-5 flex flex-col flex-1">
                          <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3 text-[var(--color-sunrise)]" />
                              {formatDate(post.publishedAt)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3 text-[var(--color-sunrise)]" />
                              {readingTime(post.content)}
                            </span>
                          </div>
                          <h3 className="font-display font-bold text-gray-900 text-base leading-snug mb-2 group-hover:text-[var(--color-sunrise)] transition-colors duration-200 line-clamp-2">
                            {post.title}
                          </h3>
                          <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 flex-1">
                            {post.excerpt}
                          </p>

                          {/* Bottom row */}
                          <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
                            <span className="text-xs text-gray-400 flex items-center gap-1">
                              <User className="h-3 w-3" />
                              {post.author}
                            </span>
                            <div className="flex items-center gap-1 text-[var(--color-sunrise)] font-semibold text-sm">
                              Read More
                              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform duration-200" />
                            </div>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </section>

      {/* ── Post Modal ── */}
      <Dialog open={!!selectedPost} onOpenChange={() => setSelectedPost(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-0 gap-0">
          {selectedPost && (
            <>
              {selectedPost.image && (
                <div className="relative h-56 sm:h-72 overflow-hidden rounded-t-lg shrink-0">
                  <img
                    src={selectedPost.image}
                    alt={selectedPost.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <div className="absolute bottom-4 left-6 flex gap-2">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full shadow ${CATEGORY_STYLES[selectedPost.category] ?? 'bg-white/90 text-gray-700'}`}>
                      {selectedPost.category}
                    </span>
                  </div>
                </div>
              )}

              <div className="p-6 sm:p-8">
                <h2 className="font-display font-black text-2xl sm:text-3xl text-gray-900 mb-4 leading-tight">
                  {selectedPost.title}
                </h2>

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-6 pb-6 border-b border-gray-100">
                  <span className="flex items-center gap-1.5">
                    <User className="h-4 w-4 text-[var(--color-sunrise)]" />
                    {selectedPost.author}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4 text-[var(--color-sunrise)]" />
                    {formatDate(selectedPost.publishedAt)}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-[var(--color-sunrise)]" />
                    {readingTime(selectedPost.content)}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Tag className="h-4 w-4 text-[var(--color-sunrise)]" />
                    {selectedPost.category}
                  </span>
                </div>

                <div className="space-y-4">
                  {selectedPost.content.split('\n\n').map((para, i) => (
                    <p key={i} className="text-gray-700 leading-relaxed text-base">
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
