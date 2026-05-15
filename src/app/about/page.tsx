"use client";

import Image from "next/image";
import Link from "next/link";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import {
  Users,
  Eye,
  Target,
  Sparkles,
  Wrench,
  Factory,
  ShieldCheck,
  HeartHandshake,
  Lightbulb,
  Leaf,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Star,
  Compass,
} from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useWhatSetsApart, useLeadership, useAboutHeroSlides, useAboutHeroContent, useProvenProjects } from "@/hooks/use-site-content";
import { getIconComponent } from "@/lib/icon-map";

const FALLBACK_HERO_IMAGES = [
  PlaceHolderImages.find((img) => img.id === "about-hero")?.imageUrl,
  PlaceHolderImages.find((img) => img.id === "hero-home")?.imageUrl,
  PlaceHolderImages.find((img) => img.id === "service-commercial")?.imageUrl,
].filter((u): u is string => !!u);

const FALLBACK_HERO_CONTENT = {
  badge: "NEXT-GEN ENERGY TECHNOLOGY & SOLAR EPC",
  title: "About RaQuadrant",
  titleHighlight: "Energy",
  tagline1: "Engineering Trust. Delivering Performance.",
  tagline2: "Powering India's Industrial Future.",
};

const LEADER_FALLBACK_IMAGES = {
  rizul: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&h=600&fit=crop",
  shyam: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&h=600&fit=crop",
};

const FALLBACK_SETS_APART = [
  { icon: Wrench, title: "Engineering-First Approach", description: "Every system is designed based on real load behaviour, grid conditions, and long-term performance—not assumptions." },
  { icon: Factory, title: "MSME-Focused Solutions", description: "We understand cash flows, operating hours, and business realities of Indian MSMEs." },
  { icon: ShieldCheck, title: "Execution with Integrity", description: "No inflated projections. No silent compromises. Only what can be engineered and delivered." },
  { icon: HeartHandshake, title: "Long-Term Commitment", description: "We stay engaged beyond commissioning, ensuring systems perform as promised over their lifecycle." },
  { icon: CheckCircle2, title: "Proven Ground Reality", description: "Our projects speak louder than presentations." },
];

const FALLBACK_PROVEN_PROJECTS = [
  { location: "Chapar, Dhubri", locationHighlight: "(Assam)", description: "We successfully engineered and commissioned a 150 kWp gridless, battery-less captive solar power plant—a first-of-its-kind solution for a rural MSME operating without grid access. This project has been widely appreciated for proving that reliable industrial operations are possible even without grid dependency, through disciplined engineering and system design.", highlightLabel: "First-of-its-kind solution" },
  { location: "Howrah,", locationHighlight: "West Bengal", description: "We executed a 138 kWp rooftop solar system on a non-penetrative dome structure, serving three separate meters with distinct load profiles, operational functions, and long cable distances—while addressing voltage-drop challenges and high-demand conditions. The project stands as a benchmark in precision rooftop engineering.", highlightLabel: "Precision engineering benchmark" },
];

const FALLBACK_LEADERSHIP = [
  { name: "Rizul Choudhury", role: "Founder and CEO", image: LEADER_FALLBACK_IMAGES.rizul, bio: "Over 18 years of leadership experience across energy, technology, and large-scale consumer businesses. He holds an MBA, along with a B.Sc. in Information Technology and Software Engineering, combining strategic thinking with strong technical and systems understanding. His professional journey includes leadership roles with globally respected organisations such as Samsung, Reliance Retail, Huawei Telecommunications, Future Group, Surya Business, Anvil Energy, and Husk Power Systems. Rizul has worked extensively on rural clean-energy transition and energy-access initiatives across Bihar, Uttar Pradesh, Assam, the North East, and West Bengal, focusing on MSMEs, agro-based industries, and underserved communities. A strong advocate for climate action and inclusive growth, he has led initiatives aligned with the UN Sustainable Development Goals, particularly SDG 7 (Affordable & Clean Energy) and SDG 13 (Climate Action)." },
  { name: "Shyam Chakraborty", role: "Co-Founder and COO", image: LEADER_FALLBACK_IMAGES.shyam, bio: "Over 14 years of deep, hands-on experience in rooftop and utility-scale solar projects. He leads operations, project management, engineering, and execution, ensuring every project is delivered with precision, safety, and long-term reliability. His expertise covers techno-commercial evaluation, project costing, system design (grid-connected and battery-based), risk management, and end-to-end project delivery—from site surveys and engineering validation to commissioning and O&M handover. An alumnus of XLRI Jamshedpur's Executive Program in Project Management, Shyam has worked with industry leaders including Areva T&D, Schneider Electric, Atha Group, Onergy Solar, Husk Power, and Anvil Cables & Energy. Known for his structured problem-solving approach and adherence to Total Quality Management (TQM) principles." },
];

export default function AboutPage() {
  const setsApartFromDb = useWhatSetsApart();
  const leadershipFromDb = useLeadership();
  const heroSlidesFromDb = useAboutHeroSlides();
  const heroContentFromDb = useAboutHeroContent();
  const provenFromDb = useProvenProjects();

  const whatSetsUsApart = useMemo(() => {
    if (setsApartFromDb.data?.length) {
      return setsApartFromDb.data.map((s) => ({ ...s, icon: getIconComponent(s.iconName) }));
    }
    return FALLBACK_SETS_APART;
  }, [setsApartFromDb.data]);

  const leadership = useMemo(() => (leadershipFromDb.data?.length ? leadershipFromDb.data : FALLBACK_LEADERSHIP), [leadershipFromDb.data]);
  const provenProjects = useMemo(() => (provenFromDb.data?.length ? provenFromDb.data : FALLBACK_PROVEN_PROJECTS), [provenFromDb.data]);

  const heroImages = useMemo(() =>
    heroSlidesFromDb.data?.length
      ? heroSlidesFromDb.data.map((s) => s.image)
      : FALLBACK_HERO_IMAGES,
    [heroSlidesFromDb.data]);

  const heroContent = useMemo(() =>
    heroContentFromDb.data ?? FALLBACK_HERO_CONTENT,
    [heroContentFromDb.data]);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const introReveal = useScrollReveal(0.06);
  const purposeReveal = useScrollReveal(0.06);
  const engineeringReveal = useScrollReveal(0.06);
  const setsApartReveal = useScrollReveal(0.06);
  const futureReveal = useScrollReveal(0.06);
  const leadershipReveal = useScrollReveal(0.06);

  useEffect(() => {
    setIsVisible(true);
    const len = heroImages.length || 1;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % len);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
        
        :root {
          --color-sunrise: #FF6B35;
          --color-amber: #FFB627;
          --color-honey: #FFA726;
          --color-cream: #FFF8E7;
          --color-warm-white: #FFFBF5;
          --color-deep-orange: #F4511E;
          --color-soft-peach: #FFE0B2;
        }
        
        .font-display { font-family: 'Playfair Display', serif; }
        .font-body { font-family: 'Plus Jakarta Sans', sans-serif; }
        
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(255, 107, 53, 0.4), 0 0 40px rgba(255, 107, 53, 0.2); }
          50% { box-shadow: 0 0 30px rgba(255, 107, 53, 0.6), 0 0 60px rgba(255, 107, 53, 0.3); }
        }
        
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .hero-gradient {
          background: linear-gradient(135deg,
            rgba(255, 107, 53, 0.35) 0%,
            rgba(255, 166, 38, 0.3) 50%,
            rgba(244, 81, 30, 0.28) 100%);
        }
        
        .text-gradient {
          background: linear-gradient(135deg, var(--color-sunrise), var(--color-amber), var(--color-honey));
          background-size: 200% 200%;
          animation: gradient-shift 3s ease infinite;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .card-hover {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }
        
        .card-hover::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s;
        }
        
        .card-hover:hover::before {
          left: 100%;
        }
        
        .card-hover:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 25px 50px rgba(255, 107, 53, 0.25), 0 10px 20px rgba(255, 107, 53, 0.15);
        }
        
        .glass-morphism {
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.25);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }
        
        .hero-slide {
          transition: opacity 1s ease-in-out, transform 1s ease-in-out;
        }
        
        .hero-slide.active {
          opacity: 1;
          transform: scale(1);
        }
        
        .hero-slide.inactive {
          opacity: 0;
          transform: scale(1.05);
        }
        
        .parallax-element {
          transition: transform 0.3s ease-out;
        }
        
        .gradient-border {
          position: relative;
          background: linear-gradient(white, white) padding-box,
                      linear-gradient(135deg, var(--color-sunrise), var(--color-amber)) border-box;
          border: 2px solid transparent;
        }
        
        .shine-effect {
          position: relative;
          overflow: hidden;
        }
        
        .shine-effect::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(
            45deg,
            transparent 30%,
            rgba(255, 255, 255, 0.3) 50%,
            transparent 70%
          );
          animation: shimmer 3s infinite;
        }
        
        .floating-icon {
          animation: float 3s ease-in-out infinite;
        }
        
        .section-divider {
          position: relative;
          overflow: hidden;
        }
        
        .section-divider::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--color-sunrise), transparent);
          animation: slide-right 2s ease-in-out infinite;
        }
        
        @keyframes slide-right {
          0% { left: -100%; }
          100% { left: 100%; }
        }
        
        .team-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, transparent 100%);
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        
        .team-card:hover .team-card-overlay {
          opacity: 1;
        }
        
        .stagger-animation > * {
          opacity: 0;
          animation: fadeInUp 0.6s ease forwards;
        }
        
        .stagger-animation > *:nth-child(1) { animation-delay: 0.1s; }
        .stagger-animation > *:nth-child(2) { animation-delay: 0.2s; }
        .stagger-animation > *:nth-child(3) { animation-delay: 0.3s; }
        .stagger-animation > *:nth-child(4) { animation-delay: 0.4s; }
        .stagger-animation > *:nth-child(5) { animation-delay: 0.5s; }
        
        .bg-pattern {
          background-image: 
            radial-gradient(circle at 20% 50%, rgba(255, 107, 53, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(255, 182, 39, 0.05) 0%, transparent 50%);
        }
        
        .rotate-slow {
          animation: rotate 20s linear infinite;
        }
      `}</style>

      <div className="flex flex-col bg-gradient-to-b from-[var(--color-warm-white)] to-white font-display overflow-hidden">
        {/* Floating Background Elements */}
        <div className="fixed inset-0 pointer-events-none z-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[var(--color-sunrise)] rounded-full blur-3xl opacity-20 floating-icon" style={{ animationDelay: '0s' }} />
          <div className="absolute top-40 right-20 w-96 h-96 bg-[var(--color-amber)] rounded-full blur-3xl opacity-15 floating-icon" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-40 left-1/3 w-64 h-64 bg-[var(--color-honey)] rounded-full blur-3xl opacity-20 floating-icon" style={{ animationDelay: '2s' }} />
        </div>

        {/* Hero */}
        <section className="relative h-[62vh] min-h-[480px] w-full overflow-hidden">
          <div className="absolute inset-0">
            {heroImages.map((imgUrl, index) => (
              <div
                key={index}
                className={`absolute inset-0 hero-slide ${
                  index === currentSlide ? "active" : "inactive"
                }`}
              >
                <Image
                  src={imgUrl}
                  alt=""
                  fill
                  className="object-cover"
                  priority={index === 0}
                  unoptimized
                />
              </div>
            ))}
          </div>
          <div className="absolute inset-0 hero-gradient backdrop-blur-[2px]" />

          {/* Animated Geometric Shapes */}
          <div className="absolute inset-0 overflow-hidden opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 border-4 border-white rotate-slow" />
            <div className="absolute bottom-20 right-20 w-40 h-40 border-4 border-white rounded-full" style={{ animation: 'rotate 15s linear infinite reverse' }} />
            <div className="absolute top-1/2 left-1/4 w-24 h-24 border-4 border-white" style={{ animation: 'float 4s ease-in-out infinite' }} />
          </div>

          <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white px-4">
            <div
              className={`transition-all duration-1200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
            >
              <div className="inline-flex items-center gap-2 glass-morphism rounded-full px-4 py-2 mb-4 shine-effect">
                <Sparkles className="h-4 w-4 floating-icon" />
                <span className="text-xs sm:text-sm font-bold tracking-wider">
                  {heroContent.badge}
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black drop-shadow-2xl mb-3 leading-tight">
                {heroContent.title} <span className="text-[var(--color-amber)] inline-block" style={{ animation: 'scaleIn 0.6s ease forwards' }}></span>
                <br />
                <span className="text-gradient inline-block" style={{ animation: 'fadeInUp 0.6s ease 0.3s forwards', opacity: 0 }}>{heroContent.titleHighlight}</span>
              </h1>

              <div className="max-w-2xl mx-auto">
                <p className="text-base sm:text-lg md:text-xl font-light leading-relaxed mb-1" style={{ animation: 'fadeInUp 0.6s ease 0.5s forwards', opacity: 0 }}>
                  {heroContent.tagline1}
                </p>
                <p className="text-lg sm:text-xl md:text-2xl font-semibold" style={{ animation: 'fadeInUp 0.6s ease 0.7s forwards', opacity: 0 }}>
                  {heroContent.tagline2}
                </p>
              </div>

              <div className="flex gap-2 mt-8 justify-center">
                {heroImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-2 rounded-full transition-all duration-500 ${
                      index === currentSlide
                        ? "w-12 bg-white shadow-lg"
                        : "w-2 bg-white/50 hover:bg-white/80 hover:w-8"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
            
            <div className="absolute bottom-8 animate-bounce">
              <div className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-2">
                <div className="w-1 h-3 bg-white rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        </section>

        {/* About RaQuadrant Energy - Intro */}
        <section
          ref={introReveal.ref}
          className="py-12 sm:py-16 lg:py-20 bg-white relative overflow-hidden bg-pattern"
        >
          <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-[var(--color-soft-peach)] to-transparent rounded-full blur-3xl opacity-30" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto">
              <div
                className={`transition-all duration-1000 ${
                  introReveal.isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                }`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-0.5 w-12 bg-gradient-to-r from-[var(--color-sunrise)] to-[var(--color-amber)] rounded-full" />
                  <span className="text-[var(--color-sunrise)] font-bold text-xs tracking-widest uppercase">
                    Who We Are
                  </span>
                </div>
                
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-gray-900 mb-4">
                  RaQuadrant <span className="text-gradient">Energy</span>
                </h2>
                
                <div className="space-y-4 text-gray-700 leading-relaxed text-base sm:text-lg">
                  <p className="relative pl-5 border-l-4 border-[var(--color-sunrise)]">
                    RaQuadrant Energy is a next-generation Energy Technology and Solar EPC company committed to reshaping how India&apos;s industries access, manage, and consume power. We work at the intersection of engineering excellence, on-ground execution, and MSME-centric innovation, delivering solar solutions that are built not just to install—but to perform reliably for decades.
                  </p>
                  
                  <div className="bg-gradient-to-br from-[var(--color-cream)] to-white p-5 sm:p-6 rounded-2xl shadow-xl border-2 border-[var(--color-soft-peach)]">
                    <p className="text-gray-800 font-medium text-sm sm:text-base">
                      In a market crowded with short-term installers and price-driven promises, RaQuadrant stands for something different: <strong className="text-[var(--color-sunrise)]">precision, accountability, and long-term value creation.</strong>
                    </p>
                  </div>
                  
                  <p className="text-sm sm:text-base">
                    Our work spans factories, agro-based industries, warehouses, healthcare facilities, and commercial enterprises—particularly in regions where grid reliability is weak, operating margins are tight, and energy decisions directly impact livelihoods.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Purpose & Vision */}
        <section
          ref={purposeReveal.ref}
          className="py-16 sm:py-20 lg:py-24 bg-[#0f1117] relative overflow-hidden"
        >
          {/* Subtle warm glow top-left */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-[var(--color-sunrise)] opacity-10 rounded-full blur-3xl pointer-events-none" />
          {/* Subtle warm glow bottom-right */}
          <div className="absolute -bottom-24 -right-16 w-80 h-80 bg-[var(--color-honey)] opacity-10 rounded-full blur-3xl pointer-events-none" />
          {/* Fine dot grid */}
          <div className="absolute inset-0 opacity-[0.04]" style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, white 1.5px, transparent 0)",
            backgroundSize: "36px 36px"
          }} />

          <div className="absolute top-10 left-10 opacity-10">
            <Star className="h-10 w-10 text-[var(--color-honey)] floating-icon" />
          </div>
          <div className="absolute bottom-10 right-10 opacity-10">
            <Compass className="h-12 w-12 text-[var(--color-sunrise)] rotate-slow" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto">
              <div
                className={`transition-all duration-1000 ${
                  purposeReveal.isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                }`}
              >
                {/* Label */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-px w-10 bg-[var(--color-sunrise)]" />
                  <span className="text-[var(--color-sunrise)] font-bold text-xs tracking-widest uppercase">
                    Our Purpose
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-white mb-8 leading-tight">
                  One Guiding <span className="text-[var(--color-honey)]">Principle</span>
                </h2>

                {/* Mission card */}
                <div className="rounded-2xl p-6 sm:p-8 mb-5 border border-white/10 bg-white/5 backdrop-blur-sm shadow-xl relative overflow-hidden">
                  {/* left accent bar */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl bg-gradient-to-b from-[var(--color-sunrise)] to-[var(--color-honey)]" />
                  <div className="flex items-start gap-4 mb-4 pl-4">
                    <div className="bg-gradient-to-br from-[var(--color-sunrise)] to-[var(--color-honey)] p-2.5 rounded-xl shadow-lg shrink-0 mt-0.5">
                      <Target className="h-5 w-5 text-white" />
                    </div>
                    <blockquote className="text-base sm:text-lg md:text-xl text-white/90 font-display font-semibold leading-relaxed">
                      &ldquo;To deliver high-quality, reliable, and innovative solar solutions that customers can trust—executed with precision, transparency, and long-term commitment.&rdquo;
                    </blockquote>
                  </div>
                  <p className="text-white/50 text-sm sm:text-base pl-4 border-t border-white/10 pt-4">
                    This philosophy defines every decision we make—from engineering design and component selection to execution standards and post-commissioning support.
                  </p>
                </div>

                {/* Vision card */}
                <div className="rounded-2xl p-6 sm:p-8 border border-[var(--color-sunrise)]/20 bg-white/5 relative overflow-hidden">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-gradient-to-br from-[var(--color-honey)] to-[var(--color-deep-orange)] p-2.5 rounded-xl shadow-lg">
                      <Eye className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-[var(--color-honey)] text-xs font-bold tracking-widest uppercase">Vision</span>
                  </div>
                  <p className="text-base sm:text-lg md:text-xl font-display font-bold text-white/90 leading-relaxed">
                    &ldquo;To redefine India&apos;s solar ecosystem with bold ideas, relentless execution, and solutions that inspire trust and transform lives.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Leadership Team */}
        <section
          ref={leadershipReveal.ref}
          className="py-12 sm:py-16 lg:py-20 bg-white relative overflow-hidden"
        >
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-5xl mx-auto">
              <div
                className={`transition-all duration-1000 ${
                  leadershipReveal.isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                }`}
              >
                <div className="text-center mb-8">
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <Users className="h-5 w-5 text-[var(--color-sunrise)]" />
                    <span className="text-[var(--color-sunrise)] font-bold text-xs tracking-widest uppercase">
                      The People Behind RaQuadrant
                    </span>
                    <Users className="h-5 w-5 text-[var(--color-sunrise)]" />
                  </div>
                  
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-gray-900">
                    Leadership <span className="text-gradient">Team</span>
                  </h2>
                </div>
                
                <div className="space-y-6 sm:space-y-8">
                  {leadership.map((person, index) => (
                    <div
                      key={person.name}
                      className={`group team-card relative bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-100 card-hover flex flex-col md:flex-row ${
                        index % 2 === 1 ? "md:flex-row-reverse" : ""
                      }`}
                      style={{ 
                        animation: leadershipReveal.isInView ? `fadeInUp 0.7s ease ${index * 0.15}s forwards` : "none",
                        opacity: leadershipReveal.isInView ? 1 : 0 
                      }}
                    >
                      {/* Image - horizontal half */}
                      <div className="relative w-full md:w-2/5 md:min-w-[280px] md:max-w-[340px] aspect-[4/5] md:aspect-auto md:min-h-[280px] bg-gradient-to-br from-gray-200 to-gray-100 overflow-hidden flex-shrink-0">
                        <Image
                          src={person.image}
                          alt={person.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 340px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 md:hidden" />
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent md:hidden">
                          <h3 className="font-display font-black text-white text-lg">{person.name}</h3>
                          <p className="text-[var(--color-amber)] font-bold text-sm">{person.role}</p>
                        </div>
                        {/* Accent corner */}
                        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-[var(--color-sunrise)]/20 to-transparent rounded-bl-full" />
                      </div>
                      
                      {/* Content - horizontal half */}
                      <div className="flex-1 flex flex-col justify-center p-6 sm:p-8 md:py-8">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="h-1 w-10 bg-gradient-to-r from-[var(--color-sunrise)] to-[var(--color-amber)] rounded-full flex-shrink-0" />
                          <span className="text-[var(--color-sunrise)] font-bold text-xs tracking-widest uppercase hidden md:inline">
                            Leadership
                          </span>
                        </div>
                        <h3 className="font-display font-black text-gray-900 text-xl sm:text-2xl mb-1">
                          {person.name}
                        </h3>
                        <p className="text-[var(--color-sunrise)] font-bold text-sm sm:text-base mb-4">
                          {person.role}
                        </p>
                        <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                          {person.bio}
                        </p>
                      </div>
                      
                      {/* Hover border */}
                      <div className="absolute inset-0 border-2 border-transparent group-hover:border-[var(--color-sunrise)]/30 rounded-2xl transition-all duration-300 pointer-events-none" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Building the Future */}
        <section
          ref={futureReveal.ref}
          className="py-14 sm:py-20 lg:py-24 bg-gradient-to-b from-[var(--color-cream)] via-[var(--color-warm-white)] to-white relative overflow-hidden"
        >
          <div className="absolute top-16 right-10 w-28 h-28 border-2 border-[var(--color-amber)] rounded-full opacity-20 floating-icon" />
          <div className="absolute bottom-16 left-10 w-32 h-32 border-2 border-[var(--color-sunrise)] opacity-20" style={{ animation: 'float 5s ease-in-out infinite' }} />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div
                className={`transition-all duration-1000 ${
                  futureReveal.isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                }`}
              >
                <div className="flex justify-center gap-4 mb-6">
                  <div className="bg-gradient-to-br from-[var(--color-sunrise)] to-[var(--color-amber)] p-4 rounded-full shadow-xl floating-icon">
                    <Lightbulb className="h-11 w-11 text-white" />
                  </div>
                  <div className="bg-gradient-to-br from-[var(--color-amber)] to-[var(--color-honey)] p-4 rounded-full shadow-xl floating-icon" style={{ animationDelay: '0.5s' }}>
                    <Leaf className="h-11 w-11 text-white" />
                  </div>
                </div>
                
                <span className="text-[var(--color-sunrise)] font-bold text-sm tracking-widest uppercase">
                  Our Commitment
                </span>
                
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-gray-900 mt-3 mb-6">
                  Building the Future of <span className="text-gradient">Clean Energy</span>
                </h2>
                
                <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-2xl border-2 border-[var(--color-soft-peach)] mb-6">
                  <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-5">
                    Aligned with <strong className="text-[var(--color-sunrise)]">SDG 7 (Affordable & Clean Energy)</strong> and <strong className="text-[var(--color-sunrise)]">SDG 13 (Climate Action)</strong>, RaQuadrant Energy believes that the energy transition will succeed only when reliability meets responsibility—and when clean energy works equally well for urban industries and rural enterprises.
                  </p>
                  
                  <div className="inline-block bg-gradient-to-r from-[var(--color-sunrise)] to-[var(--color-amber)] p-[2px] rounded-xl">
                    <div className="bg-white rounded-xl px-6 py-5">
                      <p className="text-gray-800 text-base sm:text-lg font-bold leading-relaxed">
                        We are not here to chase volumes.<br />
                        <span className="text-gradient">We are here to build trust, resilience, and performance—one project at a time.</span>
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-sunrise)] via-[var(--color-amber)] to-[var(--color-honey)] blur-2xl opacity-30" />
                  <h3 className="relative text-xl sm:text-2xl md:text-3xl font-display font-black text-gradient leading-relaxed">
                    Engineering Trust. Delivering Performance.<br />
                    Powering India&apos;s Industrial Future.
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* Engineering Where Others Hesitate */}
        <section
          ref={engineeringReveal.ref}
          className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-white via-[var(--color-warm-white)] to-white relative overflow-hidden"
        >
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-[var(--color-amber)] to-transparent rounded-full blur-3xl opacity-20" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-5xl mx-auto">
              <div
                className={`transition-all duration-1000 ${
                  engineeringReveal.isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                }`}
              >
                <div className="text-center mb-8">
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <div className="h-0.5 w-12 bg-gradient-to-r from-transparent via-[var(--color-sunrise)] to-transparent rounded-full" />
                    <span className="text-[var(--color-sunrise)] font-bold text-xs tracking-widest uppercase">
                      Proven Capability
                    </span>
                    <div className="h-0.5 w-12 bg-gradient-to-r from-transparent via-[var(--color-sunrise)] to-transparent rounded-full" />
                  </div>
                  
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-gray-900 mb-4">
                    Engineering Where Others <span className="text-gradient">Hesitate</span>
                  </h2>
                  
                  <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
                    RaQuadrant Energy is recognised for delivering complex, high-stake solar projects where conventional EPC approaches fall short.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-5 sm:gap-6">
                  {provenProjects.map((project, index) => (
                    <div key={project.id ?? index} className="gradient-border rounded-2xl p-5 sm:p-6 card-hover bg-white">
                      <div className="flex items-center gap-2 mb-4">
                        <div className={`p-2 rounded-lg shadow-lg ${index % 2 === 0 ? 'bg-gradient-to-br from-[var(--color-sunrise)] to-[var(--color-amber)]' : 'bg-gradient-to-br from-[var(--color-honey)] to-[var(--color-deep-orange)]'}`}>
                          <MapPin className="h-5 w-5 text-white" />
                        </div>
                        <h3 className="font-display font-black text-gray-900 text-base sm:text-lg">
                          {project.location} <span className="text-[var(--color-sunrise)]">{project.locationHighlight}</span>
                        </h3>
                      </div>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                        {project.description}
                      </p>
                      <div className="mt-4 flex items-center gap-2 text-[var(--color-sunrise)] font-semibold text-sm">
                        <CheckCircle2 className="h-4 w-4" />
                        <span>{project.highlightLabel}</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 text-center">
                  <div className="inline-block bg-gradient-to-r from-[var(--color-cream)] to-[var(--color-soft-peach)] rounded-xl p-4 shadow-xl">
                    <p className="text-gray-700 text-sm sm:text-base font-medium max-w-2xl">
                      These installations are not just capacity numbers. They are <strong className="text-[var(--color-sunrise)]">testaments to RaQuadrant&apos;s problem-solving capability</strong>, attention to detail, and refusal to compromise on quality—even under technical and commercial pressure.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What Sets Us Apart */}
        <section
          ref={setsApartReveal.ref}
          className="py-12 sm:py-16 lg:py-20 bg-white relative overflow-hidden"
        >
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-5xl mx-auto">
              <div
                className={`transition-all duration-1000 ${
                  setsApartReveal.isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                }`}
              >
                <div className="text-center mb-8">
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <Sparkles className="h-5 w-5 text-[var(--color-sunrise)]" />
                    <span className="text-[var(--color-sunrise)] font-bold text-xs tracking-widest uppercase">
                      Our Difference
                    </span>
                    <Sparkles className="h-5 w-5 text-[var(--color-sunrise)]" />
                  </div>
                  
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-gray-900">
                    What Sets Us <span className="text-gradient">Apart</span>
                  </h2>
                </div>
                
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                  {whatSetsUsApart.map((item, index) => (
                    <div
                      key={index}
                      className="group relative bg-gradient-to-br from-[var(--color-cream)] via-white to-[var(--color-soft-peach)] rounded-xl p-5 sm:p-6 border-2 border-[var(--color-soft-peach)] card-hover"
                      style={{ 
                        animation: setsApartReveal.isInView ? `scaleIn 0.6s ease ${index * 0.1}s forwards` : 'none',
                        opacity: setsApartReveal.isInView ? 1 : 0 
                      }}
                    >
                      <div className="relative z-10">
                        <div className="bg-gradient-to-br from-[var(--color-sunrise)] to-[var(--color-amber)] p-3 rounded-lg w-fit mb-3 shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <item.icon className="h-6 w-6 text-white" />
                        </div>
                        
                        <h3 className="font-display font-black text-gray-900 text-base sm:text-lg mb-2">
                          {item.title}
                        </h3>
                        
                        <p className="text-gray-600 leading-relaxed text-xs sm:text-sm">
                          {item.description}
                        </p>
                      </div>
                      
                      <div className="absolute top-0 right-0 w-14 h-14 bg-gradient-to-br from-[var(--color-sunrise)]/10 to-transparent rounded-bl-full" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-[var(--color-deep-orange)] via-[var(--color-sunrise)] to-[var(--color-honey)] relative overflow-hidden">
          <div className="absolute inset-0 opacity-15" style={{ 
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 15px, rgba(255,255,255,0.1) 15px, rgba(255,255,255,0.1) 30px)',
          }} />
          
          <div className="absolute top-8 left-8 w-24 h-24 bg-white/10 rounded-full blur-2xl floating-icon" />
          <div className="absolute bottom-8 right-8 w-28 h-28 bg-white/10 rounded-full blur-2xl floating-icon" style={{ animationDelay: '1s' }} />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center text-white">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-4 py-2 border border-white/30 mb-5">
                <Sparkles className="h-4 w-4" />
                <span className="text-xs font-bold tracking-wider">LET'S GET STARTED</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black mb-4 leading-tight">
                Ready to Go <span className="text-[var(--color-amber)]">Solar</span>?
              </h2>
              
              <p className="text-base sm:text-lg font-light mb-6 max-w-xl mx-auto">
                Join thousands of satisfied customers who&apos;ve made the switch to clean, reliable energy.
              </p>
              
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 bg-white text-[var(--color-sunrise)] px-7 py-3.5 rounded-full text-base font-black hover:bg-white/95 transition-all duration-300 shadow-xl hover:scale-105"
              >
                Get in Touch
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <p className="mt-5 text-white/80 text-xs">
                Free consultation • Custom solutions • Expert support
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}