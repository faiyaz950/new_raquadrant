"use client";

import { useState } from "react";
import {
  HelpCircle, ChevronRight, ChevronDown, Mail, Globe,
  Sun, ShoppingCart, Package, Store, Settings, Headphones,
  ArrowRight, Sparkles, MessageSquare,
} from "lucide-react";
import Link from "next/link";

const categories = [
  {
    id: "general",
    label: "General Questions",
    icon: HelpCircle,
    color: "from-orange-500 to-amber-500",
    lightColor: "bg-orange-50 border-orange-100",
    activeColor: "bg-orange-500",
    faqs: [
      {
        q: "What services does Raquadrant Energy offer?",
        a: "Raquadrant Energy specializes in comprehensive solar energy solutions, including solar project installation, e-commerce platforms for solar products, and trading of solar equipment both domestically and internationally.",
        icon: Sun,
      },
      {
        q: "Does Raquadrant Energy provide customized solar energy solutions for homes and businesses?",
        a: "Yes, Raquadrant Energy offers tailored solar energy solutions designed to meet the unique energy requirements of both residential and commercial spaces. Our team ensures a seamless process from consultation to installation.",
        icon: Settings,
      },
      {
        q: "How can I place an order for solar equipment through Raquadrant Energy?",
        a: "You can browse our wide range of solar equipment on our e-commerce platform and place your order online. For bulk purchases or assistance, you can contact our sales team, who will guide you through the process.",
        icon: ShoppingCart,
      },
      {
        q: "What products are available on the Raquadrant Energy marketplace?",
        a: "The Raquadrant Energy marketplace offers a wide range of solar energy products, including solar panels, inverters, batteries, solar water heaters, solar lights, and complete solar kits, catering to both residential and commercial needs.",
        icon: Package,
      },
      {
        q: "Does Raquadrant Energy partner with manufacturers or brands?",
        a: "Yes, Raquadrant Energy collaborates with reputed manufacturers and brands to ensure a diverse selection of high-quality solar products at competitive prices. Our marketplace serves as a one-stop shop for trusted solar energy solutions.",
        icon: Globe,
      },
      {
        q: "Can I sell my solar products on the Raquadrant Energy marketplace?",
        a: "Absolutely! Raquadrant Energy provides a platform for businesses and manufacturers to list and sell their solar products. Contact our team to learn more about the registration process and start showcasing your products to a global audience.",
        icon: Store,
      },
    ],
  },
  {
    id: "listing",
    label: "Listing Management",
    icon: Settings,
    color: "from-amber-500 to-yellow-500",
    lightColor: "bg-amber-50 border-amber-100",
    activeColor: "bg-amber-500",
    faqs: [
      {
        q: "How can I list my solar products on the Raquadrant Energy marketplace?",
        a: "To list your products, sign up as a seller on the Raquadrant Energy platform. Once registered, you can upload product details, images, pricing, and specifications using the seller dashboard. Our team is available to assist with onboarding if needed.",
        icon: Store,
      },
      {
        q: "Can I update or edit my product listings after they are published?",
        a: "Yes, you can easily update or edit your product listings through the seller dashboard. This includes changing prices, updating descriptions, adding new photos, or modifying inventory details to keep your listings up-to-date.",
        icon: Settings,
      },
      {
        q: "What kind of support does Raquadrant Energy offer for managing product listings?",
        a: "Raquadrant Energy provides dedicated support to sellers for managing their listings, including guidance on product descriptions, SEO optimization, and troubleshooting any issues. We also offer analytics tools to track the performance of your listings.",
        icon: Headphones,
      },
    ],
  },
];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("general");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const currentCategory = categories.find((c) => c.id === activeCategory)!;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-slate-900" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(251,146,60,0.22),transparent_55%)]" />
        <div className="absolute inset-0 opacity-[0.05]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,.15) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.15) 1px,transparent 1px)`,
          backgroundSize: "56px 56px",
        }} />
        <div className="absolute -left-20 top-1/3 h-72 w-72 rounded-full bg-orange-500/15 blur-[100px]" />
        <div className="absolute -right-20 top-1/4 h-80 w-80 rounded-full bg-amber-500/10 blur-[100px]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-400/40 to-transparent" />

        <div className="container relative mx-auto max-w-5xl px-4 py-16 sm:py-20 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-400/50 bg-orange-500/15 backdrop-blur-sm px-5 py-2 mb-6">
            <Sparkles className="h-4 w-4 text-orange-300" />
            <span className="text-sm font-semibold text-orange-100 tracking-wide">Help Center</span>
          </div>
          <h1 className="font-headline text-4xl font-bold text-white sm:text-5xl mb-4">
            Frequently Asked
            <span className="block mt-1 bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent">
              Questions
            </span>
          </h1>
          <p className="mx-auto max-w-xl text-gray-300 text-base sm:text-lg leading-relaxed">
            Everything you need to know about RaQuadrant Energy&apos;s services, marketplace, and solar solutions.
          </p>

          {/* Stats */}
          <div className="mt-10 flex flex-wrap justify-center gap-6">
            {[
              { label: "Questions Answered", value: `${categories.reduce((a, c) => a + c.faqs.length, 0)}+` },
              { label: "Categories", value: `${categories.length}` },
              { label: "Response Time", value: "2–4 hrs" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm px-6 py-3">
                <span className="font-headline text-2xl font-bold text-white">{stat.value}</span>
                <span className="text-xs text-gray-400 mt-0.5">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-amber-400 to-yellow-500" />
      </section>

      {/* Breadcrumb */}
      <div className="border-b border-gray-200 bg-white">
        <div className="container mx-auto max-w-6xl px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-orange-600 transition-colors font-medium">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-gray-800 font-medium">FAQ</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-6xl px-4 py-12 sm:py-16">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14">

          {/* Sidebar */}
          <aside className="lg:w-64 shrink-0">
            <div className="lg:sticky lg:top-24 space-y-4">
              {/* Category selector */}
              <div className="rounded-2xl border border-orange-100 bg-white shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-orange-500 to-amber-500 px-5 py-4">
                  <p className="text-xs font-bold uppercase tracking-widest text-white/80 mb-1">Browse by Topic</p>
                  <p className="text-white font-semibold text-sm">Categories</p>
                </div>
                <nav className="p-3">
                  {categories.map((cat) => {
                    const isActive = activeCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => { setActiveCategory(cat.id); setOpenIndex(null); }}
                        className={`w-full group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 text-left ${
                          isActive
                            ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-200"
                            : "text-gray-600 hover:bg-orange-50 hover:text-orange-700"
                        }`}
                      >
                        <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-all ${
                          isActive ? "bg-white/20" : "bg-gray-100 group-hover:bg-orange-100"
                        }`}>
                          <cat.icon className={`h-3.5 w-3.5 ${isActive ? "text-white" : "text-gray-500 group-hover:text-orange-500"}`} />
                        </div>
                        <span>{cat.label}</span>
                        <span className={`ml-auto rounded-full px-2 py-0.5 text-xs font-bold ${
                          isActive ? "bg-white/25 text-white" : "bg-gray-100 text-gray-500"
                        }`}>
                          {cat.faqs.length}
                        </span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Still have questions card */}
              <div className="rounded-2xl border border-orange-100 bg-gradient-to-br from-orange-50 to-amber-50/60 p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-md mb-3">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <p className="font-semibold text-sm text-gray-800 mb-1">Still have questions?</p>
                <p className="text-xs text-gray-500 mb-4 leading-relaxed">Our team is ready to help you find the answers you need.</p>
                <Link
                  href="/contact"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:scale-[1.02]"
                >
                  Contact Us
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </aside>

          {/* FAQ Accordion */}
          <main className="flex-1 min-w-0">
            {/* Category header */}
            <div className="mb-6 flex items-center gap-4">
              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${currentCategory.color} text-white shadow-md`}>
                <currentCategory.icon className="h-6 w-6" />
              </div>
              <div>
                <h2 className="font-headline text-2xl font-bold text-gray-900">{currentCategory.label}</h2>
                <p className="text-sm text-gray-500">{currentCategory.faqs.length} questions in this section</p>
              </div>
            </div>

            {/* Accordion items */}
            <div className="space-y-3">
              {currentCategory.faqs.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <div
                    key={index}
                    className={`group rounded-2xl border-2 bg-white shadow-sm transition-all duration-300 overflow-hidden ${
                      isOpen
                        ? "border-orange-300 shadow-md shadow-orange-100"
                        : "border-gray-100 hover:border-orange-200 hover:shadow-md hover:shadow-orange-50"
                    }`}
                  >
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="flex w-full items-start gap-4 px-6 py-5 text-left"
                    >
                      {/* Question number / icon */}
                      <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl font-bold text-sm transition-all duration-300 ${
                        isOpen
                          ? "bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-sm"
                          : "bg-gray-100 text-gray-500 group-hover:bg-orange-100 group-hover:text-orange-600"
                      }`}>
                        {index + 1}
                      </div>
                      <span className={`flex-1 font-semibold text-sm sm:text-base leading-snug transition-colors duration-200 ${
                        isOpen ? "text-orange-700" : "text-gray-800 group-hover:text-orange-700"
                      }`}>
                        {faq.q}
                      </span>
                      <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-all duration-300 ${
                        isOpen ? "bg-orange-500 text-white rotate-180" : "bg-gray-100 text-gray-400 group-hover:bg-orange-100 group-hover:text-orange-500"
                      }`}>
                        <ChevronDown className="h-4 w-4" />
                      </div>
                    </button>

                    {/* Answer */}
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}>
                      <div className="mx-6 mb-5 flex gap-4">
                        <div className="w-9 shrink-0 flex justify-center">
                          <div className="w-px bg-gradient-to-b from-orange-300 to-transparent h-full" />
                        </div>
                        <div className="flex-1 rounded-xl bg-gradient-to-br from-orange-50/70 to-amber-50/50 border border-orange-100 p-4">
                          <p className="text-sm text-gray-700 leading-relaxed">{faq.a}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom CTA */}
            <div className="mt-10 rounded-2xl overflow-hidden border border-orange-200">
              <div className="relative p-8" style={{ background: "linear-gradient(135deg, #f97316 0%, #f59e0b 55%, #fbbf24 100%)" }}>
                <div className="absolute inset-0 opacity-10" style={{
                  backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
                  backgroundSize: "20px 20px",
                }} />
                <div className="relative flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div>
                    <h3 className="font-headline text-xl font-bold text-white mb-1">Didn&apos;t find your answer?</h3>
                    <p className="text-white/85 text-sm">Reach out to our team — we typically respond within 2–4 hours.</p>
                  </div>
                  <div className="flex flex-wrap gap-3 shrink-0">
                    <a
                      href="mailto:info@raquadrantenergy.com"
                      className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-orange-600 shadow-lg transition-all hover:scale-105"
                    >
                      <Mail className="h-4 w-4" />
                      Email Us
                    </a>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 rounded-xl border-2 border-white/50 bg-white/15 px-5 py-2.5 text-sm font-bold text-white backdrop-blur-sm transition-all hover:bg-white/25"
                    >
                      Contact Form
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
