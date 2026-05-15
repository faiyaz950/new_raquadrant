"use client";

import { useMemo } from "react";
import { MapPin, CheckCircle2 } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useProvenProjects } from "@/hooks/use-site-content";
import type { ProvenProject } from "@/lib/firestore-types";

const FALLBACK_PROVEN_PROJECTS: ProvenProject[] = [
  {
    location: "Chapar, Dhubri",
    locationHighlight: "(Assam)",
    description:
      "We successfully engineered and commissioned a 150 kWp gridless, battery-less captive solar power plant—a first-of-its-kind solution for a rural MSME operating without grid access. This project has been widely appreciated for proving that reliable industrial operations are possible even without grid dependency, through disciplined engineering and system design.",
    highlightLabel: "First-of-its-kind solution",
  },
  {
    location: "Howrah,",
    locationHighlight: "West Bengal",
    description:
      "We executed a 138 kWp rooftop solar system on a non-penetrative dome structure, serving three separate meters with distinct load profiles, operational functions, and long cable distances—while addressing voltage-drop challenges and high-demand conditions. The project stands as a benchmark in precision rooftop engineering.",
    highlightLabel: "Precision engineering benchmark",
  },
];

export default function ProvenCapabilitySection() {
  const provenFromDb = useProvenProjects();
  const reveal = useScrollReveal(0.06);

  const provenProjects = useMemo(
    () => (provenFromDb.data?.length ? provenFromDb.data : FALLBACK_PROVEN_PROJECTS),
    [provenFromDb.data]
  );

  return (
    <section
      ref={reveal.ref}
      className="py-16 bg-white relative overflow-hidden"
    >
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-orange-200/40 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div
            className={`transition-all duration-1000 ${
              reveal.isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-50 to-amber-50 rounded-full mb-5 shadow-lg border border-orange-200/50">
                <MapPin className="h-4 w-4 text-orange-500" />
                <span className="font-headline text-xs font-bold text-orange-600 tracking-widest uppercase">
                  Proven Capability
                </span>
              </div>

              <h2 className="font-headline text-3xl md:text-4xl font-black text-gray-900 mb-4">
                Engineering Where Others{" "}
                <span className="text-gradient">Hesitate</span>
              </h2>

              <p className="font-headline text-base text-gray-600 max-w-2xl mx-auto">
                RaQuadrant Energy is recognised for delivering complex, high-stake solar projects where
                conventional EPC approaches fall short.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-5 sm:gap-6">
              {provenProjects.map((project, index) => (
                <div
                  key={project.id ?? index}
                  className="gradient-border rounded-2xl p-5 sm:p-6 bg-white shadow-lg hover:shadow-orange-500/15 transition-shadow duration-300 border border-orange-100/60"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <div
                      className={`p-2 rounded-lg shadow-lg ${
                        index % 2 === 0
                          ? "bg-gradient-to-br from-orange-500 to-amber-500"
                          : "bg-gradient-to-br from-amber-500 to-orange-600"
                      }`}
                    >
                      <MapPin className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="font-headline font-black text-gray-900 text-base sm:text-lg">
                      {project.location}{" "}
                      <span className="text-orange-600">{project.locationHighlight}</span>
                    </h3>
                  </div>
                  <p className="font-headline text-gray-700 leading-relaxed text-sm sm:text-base">
                    {project.description}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-orange-600 font-semibold text-sm">
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                    <span className="font-headline">{project.highlightLabel}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <div className="inline-block bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-4 sm:p-5 shadow-lg border border-orange-100">
                <p className="font-headline text-gray-700 text-sm sm:text-base font-medium max-w-2xl">
                  These installations are not just capacity numbers. They are{" "}
                  <strong className="text-orange-600">
                    testaments to RaQuadrant&apos;s problem-solving capability
                  </strong>
                  , attention to detail, and refusal to compromise on quality—even under technical and
                  commercial pressure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
