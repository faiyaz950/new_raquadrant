"use client";

import { useMemo } from "react";
import { Sparkles } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useWhatSetsApart } from "@/hooks/use-site-content";
import { getIconComponent } from "@/lib/icon-map";
import type { WhatSetsApart } from "@/lib/firestore-types";

const FALLBACK_SETS_APART: WhatSetsApart[] = [
  {
    iconName: "Wrench",
    title: "Engineering-First Approach",
    description:
      "Every system is designed based on real load behaviour, grid conditions, and long-term performance—not assumptions.",
  },
  {
    iconName: "Factory",
    title: "MSME-Focused Solutions",
    description: "We understand cash flows, operating hours, and business realities of Indian MSMEs.",
  },
  {
    iconName: "ShieldCheck",
    title: "Execution with Integrity",
    description:
      "No inflated projections. No silent compromises. Only what can be engineered and delivered.",
  },
  {
    iconName: "HeartHandshake",
    title: "Long-Term Commitment",
    description:
      "We stay engaged beyond commissioning, ensuring systems perform as promised over their lifecycle.",
  },
  {
    iconName: "CheckCircle2",
    title: "Proven Ground Reality",
    description: "Our projects speak louder than presentations.",
  },
];

export default function WhatSetsUsApartSection() {
  const setsApartFromDb = useWhatSetsApart();
  const reveal = useScrollReveal(0.06);

  const whatSetsUsApart = useMemo(() => {
    if (setsApartFromDb.data?.length) {
      return setsApartFromDb.data.map((s) => ({ ...s, icon: getIconComponent(s.iconName) }));
    }
    return FALLBACK_SETS_APART.map((s) => ({ ...s, icon: getIconComponent(s.iconName) }));
  }, [setsApartFromDb.data]);

  return (
    <section
      ref={reveal.ref}
      className="py-16 bg-gradient-to-b from-white via-orange-50/30 to-amber-50/30 relative overflow-hidden"
    >
      <div className="absolute top-1/4 right-10 w-64 h-64 bg-gradient-to-br from-orange-200/25 to-amber-200/25 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div
            className={`transition-all duration-1000 ${
              reveal.isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-50 to-amber-50 rounded-full mb-5 shadow-lg border border-orange-200/50">
                <Sparkles className="h-4 w-4 text-orange-500" />
                <span className="font-headline text-xs font-bold text-orange-600 tracking-widest uppercase">
                  Our Difference
                </span>
                <Sparkles className="h-4 w-4 text-orange-500" />
              </div>

              <h2 className="font-headline text-3xl md:text-4xl font-black text-gray-900">
                What Sets Us <span className="text-gradient">Apart</span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {whatSetsUsApart.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.id ?? item.title}
                    className="group relative bg-white rounded-xl p-5 sm:p-6 border-2 border-orange-100/60 shadow-lg hover:shadow-orange-500/15 hover:border-orange-300/60 transition-all duration-300 hover:-translate-y-1"
                    style={{
                      animation: reveal.isInView ? `scaleIn 0.6s ease ${index * 0.1}s forwards` : "none",
                      opacity: reveal.isInView ? 1 : 0,
                    }}
                  >
                    <div className="relative z-10">
                      <div className="bg-gradient-to-br from-orange-500 to-amber-500 p-3 rounded-lg w-fit mb-3 shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <Icon className="h-6 w-6 text-white" />
                      </div>

                      <h3 className="font-headline font-black text-gray-900 text-base sm:text-lg mb-2">
                        {item.title}
                      </h3>

                      <p className="font-headline text-gray-600 leading-relaxed text-xs sm:text-sm">
                        {item.description}
                      </p>
                    </div>

                    <div className="absolute top-0 right-0 w-14 h-14 bg-gradient-to-br from-orange-500/10 to-transparent rounded-bl-full" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
