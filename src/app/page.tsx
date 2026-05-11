'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Award, Building2, CheckSquare, BrainCircuit, Globe, Handshake, HomeIcon, Lightbulb, Droplets, ShieldCheck, Users, Zap, Sun, Leaf, Battery, TrendingUp, Star, ChevronRight, ChevronLeft, Play, Sparkles, CircleDot, Quote } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useState, useEffect, useRef, useMemo } from 'react';
import { useHeroSlides, useIntroPoints, useTestimonials, usePartners, useFeaturedProjects } from '@/hooks/use-site-content';
import { getIcon } from '@/lib/icon-map';

const heroImage = PlaceHolderImages.find(img => img.id === 'hero-home');
const aboutImage = PlaceHolderImages.find(img => img.id === 'about-home');

const FALLBACK_HERO = [
  { image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1920&auto=format&fit=crop", title: "Pioneering Solar EPC Solutions", subtitle: "for a Sustainable Future", description: "Revolutionizing energy access across India with cutting-edge solar technology" },
  { image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=1920&auto=format&fit=crop", title: "Commercial Solar Excellence", subtitle: "Power Your Business Sustainably", description: "High-capacity systems delivering exceptional ROI and tax benefits" },
  { image: "https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=1920&auto=format&fit=crop", title: "Clean Energy for Every Home", subtitle: "Transform Your Lifestyle", description: "Slash electricity bills by up to 90% while protecting the planet" },
];

const FALLBACK_INTRO = [
  { icon: <Zap className="h-8 w-8 sm:h-9 sm:w-9" />, title: "Innovation That Inspires", description: "Cutting-edge solar technology and engineering excellence that maximizes energy output.", paragraph: "We invest in the latest inverters, monitoring systems, and panel technologies so your plant performs at peak efficiency for decades. Our engineering team designs each system for your site and usage pattern.", image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=600&auto=format&fit=crop" },
  { icon: <Handshake className="h-8 w-8 sm:h-9 sm:w-9" />, title: "Trust Through Transparency", description: "Crystal-clear communication from consultation to commissioning. No surprises.", paragraph: "You get fixed quotes, clear timelines, and regular updates. We share design reports, component choices, and warranties in plain language. Our goal is to build long-term relationships, not one-time deals.", image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop" },
  { icon: <Globe className="h-8 w-8 sm:h-9 sm:w-9" />, title: "Impact That Matters", description: "Contributing to climate action and a healthier planet through reduced emissions.", paragraph: "Every kilowatt we install displaces fossil fuel and cuts carbon. We help you track and report your green impact. Together we are building a cleaner, more resilient energy future for India.", image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&auto=format&fit=crop" },
  { icon: <BrainCircuit className="h-8 w-8 sm:h-9 sm:w-9" />, title: "Expertise That Delivers", description: "Unmatched technical knowledge from residential rooftops to industrial installations.", paragraph: "From 3 kW homes to multi-megawatt plants and off-grid pumps, our team has done it all. We handle permits, grid approval, and commissioning so you get a turnkey solution without the technical headache.", image: "https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?w=600&auto=format&fit=crop" },
  { icon: <ShieldCheck className="h-8 w-8 sm:h-9 sm:w-9" />, title: "Quality That Lasts", description: "Tier-1 components and rigorous quality control for decades-long performance.", paragraph: "We use only certified panels, inverters, and mounting systems. Every installation is tested and documented. Our warranties and performance guarantees give you peace of mind for 25+ years.", image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&auto=format&fit=crop" },
  { icon: <Users className="h-8 w-8 sm:h-9 sm:w-9" />, title: "Support Beyond Commissioning", description: "Dedicated O&M, monitoring, and after-sales support for the life of your plant.", paragraph: "From day-one handover to annual maintenance and fault resolution, we stay with you. Real-time monitoring, preventive visits, and a single point of contact for any issue.", image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=600&auto=format&fit=crop" },
];

const FALLBACK_TESTIMONIALS = [
  { quote: "RaQuadrant delivered our 150 kWp off-grid solar plant in Assam on time. Their engineering and execution were outstanding. We now run our unit entirely on solar with zero dependency on the grid.", name: "Rajesh Kumar", role: "Director, Agro-Processing Unit", location: "Chapar, Dhubri (Assam)", rating: 5 },
  { quote: "From site survey to commissioning, the team was professional and transparent. Our rooftop system in Howrah has been performing beyond expectations. Highly recommend for commercial installations.", name: "Priya Sharma", role: "Operations Head", location: "Howrah, West Bengal", rating: 5 },
  { quote: "We needed a reliable solar solution for our warehouse. RaQuadrant understood our load profile and designed a system that has cut our electricity costs significantly. Trustworthy and quality-focused.", name: "Amit Patel", role: "Managing Partner", location: "Kolkata", rating: 5 },
];

const FALLBACK_PARTNERS = [
  { icon: <Award className="h-6 w-6 sm:h-7 sm:w-7" />, title: "Proven Expertise & Track Record", description: "500+ successful installations, 50MW+ capacity, 99.8% uptime, zero project failures." },
  { icon: <ShieldCheck className="h-6 w-6 sm:h-7 sm:w-7" />, title: "Uncompromising Quality", description: "Tier-1 certified components and rigorous quality control for decades-long performance." },
  { icon: <Users className="h-6 w-6 sm:h-7 sm:w-7" />, title: "Client-Centric Approach", description: "Transparent communication, timely delivery, and dedicated long-term support." },
  { icon: <CheckSquare className="h-6 w-6 sm:h-7 sm:w-7" />, title: "End-to-End Solutions", description: "Complete responsibility from concept to commissioning and beyond." },
];

const FALLBACK_PROJECTS = [
  { image: "https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?w=800&auto=format&fit=crop", title: "Industrial Rooftop", location: "Ranchi, Jharkhand", capacity: "500kW", type: "Commercial" },
  { image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&auto=format&fit=crop", title: "Agricultural Pump", location: "West Bengal", capacity: "10HP", type: "Infrastructure" },
  { image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&auto=format&fit=crop", title: "Grid-Tied System", location: "Guwahati, Assam", capacity: "25kW", type: "Residential" },
];

function useScrollReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsInView(true);
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, isInView };
}

export default function HomePage() {
  const heroFromDb = useHeroSlides();
  const introFromDb = useIntroPoints();
  const testimonialsFromDb = useTestimonials();
  const partnersFromDb = usePartners();
  const projectsFromDb = useFeaturedProjects();

  const heroSlides = useMemo(() => (heroFromDb.data?.length ? heroFromDb.data : FALLBACK_HERO), [heroFromDb.data]);
  const introPoints = useMemo(() => {
    if (introFromDb.data?.length) {
      return introFromDb.data.map((p) => ({ ...p, icon: getIcon(p.iconName, 'h-8 w-8 sm:h-9 sm:w-9') }));
    }
    return FALLBACK_INTRO;
  }, [introFromDb.data]);
  const testimonials = useMemo(() => (testimonialsFromDb.data?.length ? testimonialsFromDb.data : FALLBACK_TESTIMONIALS), [testimonialsFromDb.data]);
  const partners = useMemo(() => {
    if (partnersFromDb.data?.length) {
      return partnersFromDb.data.map((p) => ({ ...p, icon: getIcon(p.iconName, 'h-6 w-6 sm:h-7 sm:w-7') }));
    }
    return FALLBACK_PARTNERS;
  }, [partnersFromDb.data]);
  const featuredProjects = useMemo(() => (projectsFromDb.data?.length ? projectsFromDb.data : FALLBACK_PROJECTS), [projectsFromDb.data]);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const introScrollRef = useRef<HTMLDivElement>(null);
  const introReveal = useScrollReveal(0.08);
  const servicesReveal = useScrollReveal(0.06);
  const featuredReveal = useScrollReveal(0.06);
  const differenceReveal = useScrollReveal(0.06);
  const testimonialsReveal = useScrollReveal(0.06);
  const ctaReveal = useScrollReveal(0.06);

  useEffect(() => {
    setIsVisible(true);
    const len = heroSlides.length || 1;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % len);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  useEffect(() => {
    const el = introScrollRef.current;
    if (!el) return;
    const gap = 24;
    const scrollOne = () => {
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (maxScroll <= 0) return;
      const firstCard = el.querySelector('[data-intro-card]') as HTMLElement | null;
      const cardWidth = firstCard ? firstCard.offsetWidth + gap : 340;
      const next = el.scrollLeft + cardWidth;
      if (next >= maxScroll - 10) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        el.scrollTo({ left: next, behavior: 'smooth' });
      }
    };
    const interval = setInterval(scrollOne, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col overflow-hidden">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=DM+Sans:wght@400;500;700&display=swap');
        
        * {
          font-family: 'DM Sans', sans-serif;
        }
        
        h1, h2, h3, h4, h5, h6, .font-headline {
          font-family: 'Playfair Display', serif !important;
        }

        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(60px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInDown {
          from { opacity: 0; transform: translateY(-60px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-60px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(60px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(3deg); }
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 30px rgba(251, 146, 60, 0.4); }
          50% { box-shadow: 0 0 60px rgba(251, 146, 60, 0.8); }
        }
        @keyframes slideShow {
          0%, 100% { opacity: 1; transform: scale(1); }
          33.33%, 66.66% { opacity: 0; transform: scale(1.1); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.8; }
        }
        @keyframes wave {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(10px); }
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes ripple {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        @keyframes bounce-soft {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        @keyframes rotate-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1); }
        }
        @keyframes slide-reveal {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }

        .animate-slideInUp { animation: slideInUp 0.8s ease-out forwards; }
        .animate-slideInDown { animation: slideInDown 0.8s ease-out forwards; }
        .animate-slideInLeft { animation: slideInLeft 0.8s ease-out forwards; }
        .animate-slideInRight { animation: slideInRight 0.8s ease-out forwards; }
        .animate-fadeIn { animation: fadeIn 1s ease-out forwards; }
        .animate-scaleIn { animation: scaleIn 0.6s ease-out forwards; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-shimmer { 
          animation: shimmer 3s linear infinite;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent);
          background-size: 1000px 100%;
        }
        .animate-glow { animation: glow 2s ease-in-out infinite; }
        .animate-pulse { animation: pulse 2s ease-in-out infinite; }
        .animate-wave { animation: wave 3s ease-in-out infinite; }
        .animate-gradient { 
          animation: gradient 8s ease infinite;
          background-size: 200% 200%;
        }
        .animate-ripple { animation: ripple 2s ease-out infinite; }
        .animate-bounce-soft { animation: bounce-soft 3s ease-in-out infinite; }
        .animate-rotate-slow { animation: rotate-slow 20s linear infinite; }
        .animate-sparkle { animation: sparkle 2s ease-in-out infinite; }
        .animate-slide-reveal { animation: slide-reveal 0.6s ease-out forwards; }

        .scroll-reveal {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.7s ease-out, transform 0.7s ease-out;
        }
        .scroll-reveal.in-view {
          opacity: 1;
          transform: translateY(0);
        }

        /* Tailored Solar Solutions - left/right slide-in on scroll */
        .services-section .services-header {
          opacity: 0;
          transform: translateY(-24px) scale(0.98);
          transition: opacity 0.7s ease-out, transform 0.7s ease-out;
        }
        .services-section.in-view .services-header {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        .services-section .services-slide-left {
          opacity: 0;
          transform: translateX(-48px);
          transition: opacity 0.75s cubic-bezier(0.22, 1, 0.36, 1), transform 0.75s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .services-section .services-slide-right {
          opacity: 0;
          transform: translateX(48px);
          transition: opacity 0.75s cubic-bezier(0.22, 1, 0.36, 1), transform 0.75s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .services-section.in-view .services-slide-left,
        .services-section.in-view .services-slide-right {
          opacity: 1;
          transform: translateX(0);
        }
        .services-section .services-slide-left.delay-1 { transition-delay: 0.15s; }
        .services-section .services-slide-right.delay-1 { transition-delay: 0.3s; }
        .services-section .services-slide-left.delay-2 { transition-delay: 0.45s; }
        .services-section .services-slide-right.delay-2 { transition-delay: 0.6s; }
        .services-section .services-slide-left.delay-3 { transition-delay: 0.75s; }
        .services-section .services-slide-right.delay-3 { transition-delay: 0.9s; }

        /* Image hover: background zooms smoothly when cursor is on image */
        .services-section .group\/img-box:hover img {
          animation: services-img-zoom 6s ease-in-out infinite;
        }
        @keyframes services-img-zoom {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.12); }
        }

        .glass-effect {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }

        .glass-effect-dark {
          background: rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
        }

        .text-gradient {
          background: linear-gradient(135deg, #fb923c, #fbbf24, #fb923c);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hover-lift {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .hover-lift:hover {
          transform: translateY(-10px);
        }

        .hover-scale {
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .hover-scale:hover {
          transform: scale(1.05);
        }

        .bg-grid {
          background-image: 
            linear-gradient(rgba(251, 146, 60, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(251, 146, 60, 0.05) 1px, transparent 1px);
          background-size: 50px 50px;
        }

        .hero-image {
          transition: transform 8s ease-in-out;
        }

        .hero-image.active {
          transform: scale(1.1);
        }

        .card-shine {
          position: relative;
          overflow: hidden;
        }

        .card-shine::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          transition: left 0.5s;
        }

        .card-shine:hover::before {
          left: 100%;
        }

        .text-shadow-glow {
          text-shadow: 0 0 20px rgba(251, 146, 60, 0.5), 0 0 40px rgba(251, 146, 60, 0.3);
        }

        .border-gradient {
          border: 2px solid transparent;
          background-clip: padding-box;
          position: relative;
        }

        .border-gradient::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 2px;
          background: linear-gradient(135deg, #fb923c, #fbbf24);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      {/* Hero Section with Enhanced Slider */}
      <section className="relative min-h-[420px] sm:min-h-[480px] lg:min-h-[520px] h-[90vh] max-h-[680px] w-full overflow-hidden">
        {/* Background Slides */}
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className={`w-full h-full object-cover hero-image ${currentSlide === index ? 'active' : ''}`}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-orange-900/40 to-amber-900/60" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          </div>
        ))}

        {/* Enhanced Animated Orbs with Ripple Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
          <div className="absolute top-20 left-10 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-float" />
          <div className="absolute top-20 left-10 w-96 h-96 bg-orange-500/10 rounded-full blur-2xl animate-ripple" />
          <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-yellow-500/20 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}} />
          <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-yellow-500/10 rounded-full blur-2xl animate-ripple" style={{animationDelay: '1s'}} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-3xl animate-float" style={{animationDelay: '4s'}} />
          
          {/* Sparkle Elements */}
          <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-white rounded-full animate-sparkle" />
          <div className="absolute top-1/3 left-1/3 w-3 h-3 bg-yellow-300 rounded-full animate-sparkle" style={{animationDelay: '0.5s'}} />
          <div className="absolute bottom-1/3 right-1/3 w-2 h-2 bg-orange-300 rounded-full animate-sparkle" style={{animationDelay: '1s'}} />
        </div>

        {/* Content - left-aligned */}
        <div className="relative z-30 flex h-full flex-col items-start justify-center pl-4 sm:pl-6 md:pl-8 lg:pl-12 xl:pl-16 pr-4 sm:pr-6 text-white max-w-5xl w-full mr-auto">
          <div className="max-w-3xl w-full">
            {/* Enhanced Badge */}
            <div className={`inline-flex items-center gap-2 sm:gap-3 px-3 py-1.5 sm:px-4 sm:py-2 glass-effect-dark rounded-full mb-3 sm:mb-4 border border-white/30 shadow-2xl backdrop-blur-xl ${isVisible ? 'animate-slideInDown' : 'opacity-0'}`}>
              <Sun className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-orange-400 animate-pulse" />
              <span className="font-headline text-[11px] sm:text-xs font-bold text-white">
                Leading Solar EPC Company
              </span>
              <Star className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-yellow-400 animate-pulse" />
              <Sparkles className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-orange-300 animate-sparkle" />
            </div>

            {/* Title with Glow Effect - Playfair Display */}
            <h1 className="font-headline text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-3 sm:mb-4 drop-shadow-2xl min-h-[2.2em] sm:min-h-[2em]">
              <span className="font-headline block text-white text-shadow-glow">
                {heroSlides[currentSlide].title}
              </span>
              <span className="font-headline block bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-400 bg-clip-text text-transparent animate-gradient text-shadow-glow">
                {heroSlides[currentSlide].subtitle}
              </span>
            </h1>

            <p className={`font-headline text-sm sm:text-base md:text-lg max-w-xl text-orange-50 leading-relaxed font-medium mb-5 sm:mb-6 drop-shadow-lg ${isVisible ? 'animate-slideInUp' : 'opacity-0'}`} style={{animationDelay: '0.2s'}}>
              {heroSlides[currentSlide].description}
            </p>

            {/* Enhanced CTA Buttons */}
            <div className={`flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8 ${isVisible ? 'animate-slideInUp' : 'opacity-0'}`} style={{animationDelay: '0.4s'}}>
              <Button asChild size="lg" className="font-headline relative overflow-hidden bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 hover:from-orange-600 hover:via-amber-600 hover:to-yellow-600 text-white font-bold px-5 py-4 sm:px-6 sm:py-5 text-sm sm:text-base rounded-full shadow-2xl hover:shadow-orange-500/50 transform hover:scale-105 transition-all duration-300 group">
                <Link href="/contact" className="font-headline flex items-center gap-2 sm:gap-3 relative z-10">
                  <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 animate-sparkle" />
                  Get Free Solar Quote
                  <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6 group-hover:translate-x-2 transition-transform" />
                  <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="font-headline glass-effect-dark border-2 border-white/50 text-white hover:bg-white/20 font-bold px-5 py-4 sm:px-6 sm:py-5 text-sm sm:text-base rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 group backdrop-blur-xl">
                <Link href="/services" className="font-headline flex items-center gap-2 sm:gap-3">
                  Explore Projects
                  <Play className="h-3.5 w-3.5 sm:h-4 sm:w-4 group-hover:scale-110 transition-transform" />
                </Link>
              </Button>
            </div>

            {/* Enhanced Stats with Animations - ~10% smaller */}
            <div className={`grid grid-cols-3 gap-3 sm:gap-4 max-w-xl ${isVisible ? 'animate-fadeIn' : 'opacity-0'}`} style={{animationDelay: '0.6s'}}>
              {[
                { value: "500+", label: "Projects" },
                { value: "50MW+", label: "Installed" },
                { value: "10,000+", label: "Customers" }
              ].map((stat, i) => (
                <div key={i} className="text-center transform hover:scale-110 transition-transform duration-300 group">
                  <div className="relative">
                    <div className="absolute inset-0 bg-orange-500/20 rounded-xl blur-xl group-hover:bg-orange-500/40 transition-all" />
                    <div className="relative glass-effect-dark rounded-xl p-3 border border-white/30">
                      <div className="font-headline text-2xl sm:text-3xl md:text-4xl font-black text-white mb-0.5 sm:mb-1 drop-shadow-lg text-shadow-glow">
                        {stat.value}
                      </div>
                      <div className="font-headline text-[10px] sm:text-xs font-bold text-orange-200 uppercase tracking-wider">
                        {stat.label}
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 to-amber-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-2xl" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Slide Indicators */}
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-40 flex gap-2 sm:gap-3 glass-effect-dark px-4 py-3 rounded-full border border-white/30">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentSlide === index 
                  ? 'w-12 bg-gradient-to-r from-orange-500 to-amber-500 shadow-lg shadow-orange-500/50' 
                  : 'w-2 bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>

        {/* Enhanced Scroll Indicator */}
        <div className="absolute bottom-6 right-4 sm:bottom-8 sm:right-8 z-40 animate-bounce-soft hidden sm:flex">
          <div className="w-6 h-10 sm:w-8 sm:h-14 border-2 border-white/50 rounded-full flex justify-center glass-effect-dark">
            <div className="w-1.5 h-3 sm:w-2 sm:h-4 bg-orange-400 rounded-full mt-1.5 sm:mt-2 animate-pulse shadow-lg shadow-orange-500/50" />
          </div>
        </div>
      </section>

      {/* Enhanced Introduction Section */}
      <section ref={introReveal.ref} className={`py-14 sm:py-16 lg:py-20 bg-gradient-to-b from-white via-orange-50/20 to-white relative overflow-hidden scroll-reveal ${introReveal.isInView ? 'in-view' : ''}`}>
        <div className="absolute inset-0 bg-grid opacity-[0.04]" style={{ backgroundSize: '40px 40px' }} />
        <div className="absolute top-0 right-0 w-[500px] sm:w-[600px] h-[500px] sm:h-[600px] bg-gradient-to-br from-orange-100/25 to-yellow-100/25 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-100/20 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}} />
        
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 border-4 border-orange-200/30 rounded-full animate-rotate-slow" />
        <div className="absolute bottom-20 right-10 w-32 h-32 border-4 border-amber-200/30 rounded-full animate-rotate-slow" style={{animationDelay: '1s'}} />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 relative z-10 max-w-[96rem]">
          <div className="text-center mb-12 sm:mb-14 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/90 backdrop-blur-sm rounded-full mb-5 border border-orange-200 shadow-md hover:shadow-lg transition-shadow">
              <Leaf className="h-5 w-5 text-orange-500 animate-bounce-soft" />
              <span className="text-sm font-bold text-orange-600">Our Mission</span>
              <CircleDot className="h-4 w-4 text-orange-400 animate-pulse" />
            </div>
            
            <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-black mb-4 sm:mb-5">
              <span className="font-headline text-gradient animate-gradient">
                Empowering Communities with
              </span>
              <br />
              <span className="font-headline text-gray-900">Clean Energy Solutions</span>
            </h2>
            
            <div className="relative w-28 sm:w-36 h-2 mx-auto rounded-full mb-5 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 animate-slide-reveal" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer" />
            </div>
            
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              Building a sustainable legacy for future generations through innovative solar technology
            </p>
          </div>

          {/* Enhanced Horizontal Cards */}
          <div
            ref={introScrollRef}
            className="overflow-x-auto overflow-y-hidden -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <div className="flex gap-5 sm:gap-6 lg:gap-8 min-w-max">
              {introPoints.map((point, idx) => (
                <div
                  key={point.title}
                  data-intro-card
                  className="group relative flex-shrink-0 w-[300px] sm:w-[340px] lg:w-[380px]"
                >
                  <div className="relative h-full bg-white rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-orange-100 shadow-lg hover:shadow-[0_24px_48px_-12px_rgba(249,115,22,0.2)] hover:border-orange-200/80 transition-all duration-500 flex flex-col card-shine">
                    {/* Decorative Corner */}
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-orange-100/50 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Image with Overlay */}
                    <div className="relative w-full h-44 sm:h-52 lg:h-56 flex-shrink-0 overflow-hidden">
                      <img
                        src={point.image}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                      
                      {/* Floating Icon */}
                      <div className="absolute top-4 left-4 z-10 animate-float" style={{animationDelay: `${idx * 0.2}s`}}>
                        <div className="relative">
                          <div className="absolute inset-0 bg-orange-500/30 rounded-2xl blur-lg animate-pulse" />
                          <div className="relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-white/95 backdrop-blur-sm shadow-lg text-orange-600 group-hover:rotate-12 transition-transform duration-500">
                            {point.icon}
                          </div>
                        </div>
                      </div>

                      {/* Number Badge */}
                      <div className="absolute bottom-3 right-3 w-10 h-10 glass-effect rounded-full flex items-center justify-center font-black text-orange-600 border border-orange-200">
                        {idx + 1}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="relative flex-1 p-5 sm:p-6 lg:p-7 flex flex-col min-h-0">
                      <h3 className="font-headline text-xl sm:text-2xl font-bold text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-600 group-hover:to-amber-600 transition-all duration-300">
                        {point.title}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3 font-medium">
                        {point.description}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed flex-1">
                        {point.paragraph}
                      </p>
                      
                      {/* Hover Indicator */}
                      <div className="mt-4 flex items-center gap-2 text-orange-600 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span>Learn More</span>
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                      
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 to-amber-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-b-2xl" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Key Offerings Section - Vertical Layout */}
      <section id="services" ref={servicesReveal.ref} className={`services-section py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-orange-50/40 via-white to-amber-50/30 relative overflow-hidden scroll-reveal ${servicesReveal.isInView ? 'in-view' : ''}`}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-100/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-grid opacity-[0.03]" style={{ backgroundSize: '32px 32px' }} />
        
        {/* Animated Background Elements */}
        <div className="absolute top-10 left-10 w-64 h-64 bg-orange-200/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-amber-200/20 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-200/10 rounded-full blur-3xl animate-float" style={{animationDelay: '4s'}} />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 relative z-10 max-w-[96rem]">
          {/* Enhanced Section Header - animates on scroll */}
          <div className="services-header text-center mb-14 sm:mb-16 lg:mb-20 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/80 backdrop-blur-sm rounded-full mb-5 border border-orange-200/80 shadow-md hover:shadow-lg transition-shadow">
              <Sun className="h-5 w-5 text-orange-500 animate-pulse" />
              <span className="text-sm font-bold text-orange-600">Our Solutions</span>
              <Sparkles className="h-4 w-4 text-amber-500 animate-sparkle" />
            </div>
            <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-5 text-gray-900">
              <span className="font-headline text-gradient animate-gradient">Tailored Solar Solutions</span>
              <br />
              <span className="font-headline text-gray-900">for Every Need</span>
            </h2>
            <div className="relative w-28 sm:w-36 h-2 mx-auto rounded-full mb-5 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer" />
            </div>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              From homes to industries and farms — we deliver end-to-end solar solutions designed for your context, with expert support at every step.
            </p>
          </div>

          {/* Vertical Stack of Solutions */}
          <div className="space-y-12 sm:space-y-16 lg:space-y-20">
            
            {/* Solution 1: Residential - slides in from left (image) and right (content) */}
            <div className="group relative">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-0 items-stretch min-h-[220px] sm:min-h-[260px] lg:min-h-[280px]">
                  {/* Image Side - slides from left */}
                  <div className="services-slide-left delay-1 relative min-h-[180px] sm:min-h-[200px] h-full overflow-hidden pt-6 lg:pt-8 order-1">
                    <div className="group/img-box relative w-full h-full min-h-[160px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl cursor-pointer">
                      <img 
                        src="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&auto=format&fit=crop" 
                        alt="Residential Solar" 
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-900/20 to-orange-900/40 transition-opacity duration-500 group-hover/img-box:opacity-70" />
                    </div>
                    
                    {/* Floating Number Badge */}
                    <div className="absolute top-6 left-6 animate-float">
                      <div className="relative">
                        <div className="absolute inset-0 bg-orange-500/40 rounded-2xl blur-xl animate-pulse" />
                        <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/95 backdrop-blur-sm shadow-2xl flex items-center justify-center">
                          <span className="font-headline text-3xl sm:text-4xl font-black text-gradient">01</span>
                        </div>
                      </div>
                    </div>

                    {/* Stats Overlay */}
                    <div className="absolute bottom-6 left-6 right-6 grid grid-cols-3 gap-3">
                      {[
                        { value: "90%", label: "Bill Cut" },
                        { value: "25+", label: "Years" },
                        { value: "3-5Y", label: "Payback" }
                      ].map((stat, idx) => (
                        <div key={idx} className="glass-effect rounded-xl p-3 text-center border border-white/30 hover:scale-105 transition-transform duration-300">
                          <div className="text-2xl sm:text-3xl font-black text-orange-600 mb-1">{stat.value}</div>
                          <div className="text-xs font-semibold text-gray-700">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Content Side - slides from right */}
                  <div className="services-slide-right delay-1 p-6 sm:p-8 lg:p-14 pt-6 lg:pt-8 flex flex-col min-w-0 order-2">
                    <div className="inline-flex items-center gap-2 w-fit mb-4 sm:mb-6 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200/60 shadow-md">
                      <HomeIcon className="h-4 w-4 sm:h-5 sm:w-5 text-orange-600 animate-bounce-soft" />
                      <span className="font-headline font-bold text-xs sm:text-sm text-orange-700">Residential Solar</span>
                      <CircleDot className="h-3 w-3 sm:h-4 sm:w-4 text-orange-500 animate-pulse" />
                    </div>

                    <h3 className="font-headline text-xl sm:text-2xl lg:text-3xl font-black text-gray-900 mb-3 sm:mb-4 leading-tight">
                      <span className="font-headline text-gradient">Transform Your Home</span>
                      <br />
                      <span className="font-headline text-gray-900">Into a Clean Energy Powerhouse</span>
                    </h3>

                    <div className="mb-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="h-1 w-12 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full" />
                        <span className="font-headline text-base font-black text-gradient">1–10 kW Systems</span>
                      </div>
                    </div>

                    <div className="space-y-3 mb-6 text-gray-600 text-sm sm:text-base leading-relaxed">
                      <p>
                        Experience energy independence with custom rooftop solar for homes and societies — slash bills by up to 90%, with smart monitoring and optional battery backup. We handle subsidies and approvals.
                      </p>
                      <p>
                        Optimized panel placement, real-time monitoring via mobile apps, and optional battery backup for uninterrupted power. Typical payback 3–5 years with long-term savings.
                      </p>
                      <p>
                        Every installation includes comprehensive government subsidy support; we manage all paperwork and approvals so you can focus on enjoying lower bills and a smaller carbon footprint.
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <Button asChild className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold px-8 py-6 rounded-full shadow-xl hover:shadow-orange-500/40 group/btn transition-all hover:scale-105">
                        <Link href="/contact" className="flex items-center gap-2">
                          Get Started
                          <ArrowRight className="h-5 w-5 group-hover/btn:translate-x-2 transition-transform" />
                        </Link>
                      </Button>
                      <Button asChild variant="outline" className="border-2 border-orange-300 text-orange-700 hover:bg-orange-50 font-bold px-8 py-6 rounded-full shadow-lg group/btn transition-all hover:scale-105">
                        <Link href="/services" className="flex items-center gap-2">
                          Learn More
                          <ChevronRight className="h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

            {/* Solution 2: Commercial - content slides from left, image from right */}
            <div className="group relative">
              <div className="grid lg:grid-cols-2 gap-0 items-stretch min-h-[220px] lg:min-h-[280px]">
                  {/* Content Side - slides from left */}
                  <div className="services-slide-left delay-2 p-8 sm:p-10 lg:p-14 pt-6 lg:pt-8 flex flex-col order-2 lg:order-1">
                    <div className="inline-flex items-center gap-2 w-fit mb-6 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/60 shadow-md">
                      <Building2 className="h-5 w-5 text-amber-700 animate-bounce-soft" />
                      <span className="font-headline font-bold text-sm text-amber-800">Commercial Solar</span>
                      <CircleDot className="h-4 w-4 text-amber-600 animate-pulse" />
                    </div>

                    <h3 className="font-headline text-xl sm:text-2xl lg:text-3xl font-black text-gray-900 mb-3 sm:mb-4 leading-tight">
                      <span className="font-headline text-gradient">Power Your Business</span>
                      <br />
                      <span className="font-headline text-gray-900">with Sustainable Energy</span>
                    </h3>

                    <div className="mb-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="h-1 w-12 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full" />
                        <span className="font-headline text-base font-black text-gradient">50 kW – Multi-MW</span>
                      </div>
                    </div>

                    <div className="space-y-3 mb-6 text-gray-600 text-sm sm:text-base leading-relaxed">
                      <p>
                        High-capacity commercial solar for offices, factories, malls, and warehouses — exceptional ROI and tax benefits. Flexible OPEX/CAPEX and lease models; insurance-backed guarantees. Typical payback 3-4 years, up to 30% annual ROI.
                      </p>
                      <p>
                        Designed for offices, factories, malls, hospitals, and warehouses. Accelerated depreciation and performance guarantees ensure reliable energy for decades.
                      </p>
                      <p>
                        Systems range from 50 kW rooftop installations to multi-megawatt ground-mounted plants. Demonstrate your commitment to corporate sustainability while cutting operational costs.
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <Button asChild className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold px-8 py-6 rounded-full shadow-xl hover:shadow-amber-500/40 group/btn transition-all hover:scale-105">
                        <Link href="/contact" className="flex items-center gap-2">
                          Request Consultation
                          <ArrowRight className="h-5 w-5 group-hover/btn:translate-x-2 transition-transform" />
                        </Link>
                      </Button>
                      <Button asChild variant="outline" className="border-2 border-amber-300 text-amber-700 hover:bg-amber-50 font-bold px-8 py-6 rounded-full shadow-lg group/btn transition-all hover:scale-105">
                        <Link href="/services" className="flex items-center gap-2">
                          View Projects
                          <ChevronRight className="h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </div>
                  </div>

                  {/* Image Side - slides from right */}
                  <div className="services-slide-right delay-2 relative min-h-[180px] sm:min-h-[200px] h-full overflow-hidden order-1 lg:order-2 pt-6 lg:pt-8">
                    <div className="group/img-box relative w-full h-full min-h-[160px] rounded-2xl sm:rounded-3xl lg:rounded-s-[2rem] overflow-hidden shadow-xl cursor-pointer">
                      <img 
                        src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=1200&auto=format&fit=crop" 
                        alt="Commercial Solar" 
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-l from-transparent via-amber-900/20 to-amber-900/40 transition-opacity duration-500 group-hover/img-box:opacity-70" />
                    </div>
                    
                    {/* Floating Number Badge */}
                    <div className="absolute top-6 right-6 animate-float" style={{animationDelay: '0.5s'}}>
                      <div className="relative">
                        <div className="absolute inset-0 bg-amber-500/40 rounded-2xl blur-xl animate-pulse" />
                        <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/95 backdrop-blur-sm shadow-2xl flex items-center justify-center">
                          <span className="font-headline text-3xl sm:text-4xl font-black text-gradient">02</span>
                        </div>
                      </div>
                    </div>

                    {/* Stats Overlay */}
                    <div className="absolute bottom-6 left-6 right-6 grid grid-cols-3 gap-3">
                      {[
                        { value: "100%", label: "Energy" },
                        { value: "3-4Y", label: "Payback" },
                        { value: "30%", label: "ROI" }
                      ].map((stat, idx) => (
                        <div key={idx} className="glass-effect rounded-xl p-3 text-center border border-white/30 hover:scale-105 transition-transform duration-300">
                          <div className="text-2xl sm:text-3xl font-black text-amber-600 mb-1">{stat.value}</div>
                          <div className="text-xs font-semibold text-gray-700">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

            {/* Solution 3: Infrastructure - image slides from left, content from right */}
            <div className="group relative">
              <div className="grid lg:grid-cols-2 gap-0 items-stretch min-h-[220px] lg:min-h-[280px]">
                  {/* Image Side - slides from left */}
                  <div className="services-slide-left delay-3 relative min-h-[180px] sm:min-h-[200px] h-full overflow-hidden pt-6 lg:pt-8">
                    <div className="group/img-box relative w-full h-full min-h-[160px] rounded-2xl sm:rounded-3xl lg:rounded-e-[2rem] overflow-hidden shadow-xl cursor-pointer">
                      <img 
                        src="https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=1200&auto=format&fit=crop" 
                        alt="Infrastructure Solar" 
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-900/20 to-yellow-900/40 transition-opacity duration-500 group-hover/img-box:opacity-70" />
                    </div>
                    
                    {/* Floating Number Badge */}
                    <div className="absolute top-6 left-6 animate-float" style={{animationDelay: '1s'}}>
                      <div className="relative">
                        <div className="absolute inset-0 bg-yellow-500/40 rounded-2xl blur-xl animate-pulse" />
                        <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/95 backdrop-blur-sm shadow-2xl flex items-center justify-center">
                          <span className="font-headline text-3xl sm:text-4xl font-black text-gradient">03</span>
                        </div>
                      </div>
                    </div>

                    {/* Stats Overlay */}
                    <div className="absolute bottom-6 left-6 right-6 grid grid-cols-3 gap-3">
                      {[
                        { value: "90%", label: "Subsidy" },
                        { value: "25HP", label: "Max" },
                        { value: "5Y+", label: "Life" }
                      ].map((stat, idx) => (
                        <div key={idx} className="glass-effect rounded-xl p-3 text-center border border-white/30 hover:scale-105 transition-transform duration-300">
                          <div className="text-2xl sm:text-3xl font-black text-yellow-600 mb-1">{stat.value}</div>
                          <div className="text-xs font-semibold text-gray-700">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Content Side - slides from right */}
                  <div className="services-slide-right delay-3 p-8 sm:p-10 lg:p-14 pt-6 lg:pt-8 flex flex-col">
                    <div className="inline-flex items-center gap-2 w-fit mb-4 sm:mb-6 px-5 py-2.5 rounded-full bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200/60 shadow-md">
                      <Lightbulb className="h-5 w-5 text-yellow-700 animate-bounce-soft" />
                      <span className="font-headline font-bold text-sm text-yellow-800">Infrastructure Solar</span>
                      <CircleDot className="h-4 w-4 text-yellow-600 animate-pulse" />
                    </div>

                    <h3 className="font-headline text-xl sm:text-2xl lg:text-3xl font-black text-gray-900 mb-3 sm:mb-4 leading-tight">
                      <span className="font-headline text-gradient">Bringing Light & Water</span>
                      <br />
                      <span className="font-headline text-gray-900">to Every Corner</span>
                    </h3>

                    <div className="mb-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="h-1 w-12 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full" />
                        <span className="font-headline text-base font-black text-gradient">Off-Grid Solutions</span>
                      </div>
                    </div>

                    <div className="space-y-3 mb-6 text-gray-600 text-sm sm:text-base leading-relaxed">
                      <p>
                        Off-grid solar for rural areas: solar pumps (1–25 HP) and street lighting. Up to 90% subsidy under PM-KUSUM; we handle applications. IP65-rated, low maintenance.
                      </p>
                      <p>
                        Solar pumping for irrigation and dusk-to-dawn street lights for villages and municipalities. Weather-resistant components for farms and public spaces.
                      </p>
                      <p>
                        Built with IP65-rated components for harsh conditions. Our solutions bring modern energy access to farms, villages, and public spaces with minimal environmental impact and maximum social benefit.
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <Button asChild className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-bold px-8 py-6 rounded-full shadow-xl hover:shadow-yellow-500/40 group/btn transition-all hover:scale-105">
                        <Link href="/contact" className="flex items-center gap-2">
                          Learn More
                          <ArrowRight className="h-5 w-5 group-hover/btn:translate-x-2 transition-transform" />
                        </Link>
                      </Button>
                      <Button asChild variant="outline" className="border-2 border-yellow-300 text-yellow-700 hover:bg-yellow-50 font-bold px-8 py-6 rounded-full shadow-lg group/btn transition-all hover:scale-105">
                        <Link href="/services" className="flex items-center gap-2">
                          See Examples
                          <ChevronRight className="h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>

          </div>
        </div>
        </div>
      </section>

      {/* Enhanced Featured Projects */}
      <section ref={featuredReveal.ref} className={`py-12 sm:py-16 lg:py-20 relative overflow-hidden scroll-reveal ${featuredReveal.isInView ? 'in-view' : ''}`}>
        {/* Animated GIF Background */}
        <div className="absolute inset-0">
          <img
            src="/featurebg.gif"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            aria-hidden
          />
          <div className="absolute inset-0 bg-white/75 backdrop-blur-[1px]" />
        </div>
        <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-6xl">
          <div className="text-center mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 sm:px-5 sm:py-2 bg-gradient-to-r from-orange-50 to-amber-50 rounded-full mb-4 sm:mb-5 border border-orange-200 shadow-md hover:shadow-lg transition-shadow">
              <Star className="h-4 w-4 sm:h-5 sm:w-5 text-orange-500 animate-pulse" />
              <span className="text-xs sm:text-sm font-bold text-orange-600">Success Stories</span>
              <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-amber-500 animate-sparkle" />
            </div>
            
            <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-black mb-4 sm:mb-5">
              <span className="font-headline text-gradient animate-gradient">
                Featured Projects
              </span>
            </h2>
            
            <div className="relative w-24 sm:w-32 h-1.5 sm:h-2 mx-auto rounded-full overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 max-w-6xl mx-auto">
            {featuredProjects.map((project, i) => (
              <div 
                key={i}
                className="group relative animate-slideInUp hover-lift"
                style={{animationDelay: `${i * 0.1}s`}}
              >
                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl card-shine">
                  <div className="relative overflow-hidden">
                    <img 
                      src={project.image}
                      alt={project.title}
                      className="w-full h-56 sm:h-64 lg:h-72 object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                    
                    {/* Decorative Corner */}
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                    <div className="mb-2 sm:mb-2.5 flex items-center gap-2">
                      <span className="px-3 py-1 sm:px-3.5 sm:py-1.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-full text-[10px] sm:text-xs font-bold shadow-lg">
                        {project.type}
                      </span>
                      <div className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse" />
                    </div>
                    <h3 className="font-headline text-lg sm:text-xl font-black text-white mb-1.5 sm:mb-2 group-hover:text-orange-300 transition-colors">
                      {project.title}
                    </h3>
                    <div className="flex items-center justify-between text-orange-200 text-xs sm:text-sm">
                      <span className="font-semibold flex items-center gap-1">
                        <CircleDot className="h-3 w-3" />
                        {project.location}
                      </span>
                      <span className="font-bold px-2 py-1 bg-white/10 rounded-full backdrop-blur-sm">{project.capacity}</span>
                    </div>
                  </div>

                  {/* Hover Arrow */}
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:rotate-45">
                    <div className="p-2 sm:p-2.5 glass-effect rounded-full border border-white/30">
                      <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6 text-orange-500" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8 sm:mt-10">
            <Button asChild className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold px-6 py-5 sm:px-8 sm:py-5 text-base sm:text-lg rounded-full shadow-xl group hover:scale-105 transition-all">
              <Link href="/projects" className="flex items-center gap-2">
                View All Projects
                <ChevronRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Enhanced Why Partner Section */}
      <section ref={differenceReveal.ref} className={`py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-orange-50/50 to-white relative overflow-hidden scroll-reveal ${differenceReveal.isInView ? 'in-view' : ''}`}>
        <div className="absolute bottom-0 left-0 w-[400px] sm:w-[500px] lg:w-[600px] h-[400px] sm:h-[500px] lg:h-[600px] bg-gradient-to-br from-orange-100/40 to-yellow-100/40 rounded-full blur-3xl animate-float" />
        
        {/* Decorative Grid */}
        <div className="absolute inset-0 bg-grid opacity-[0.02]" style={{ backgroundSize: '40px 40px' }} />
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-6xl">
          <div className="text-center mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 sm:px-5 sm:py-2 bg-gradient-to-r from-orange-50 to-amber-50 rounded-full mb-4 sm:mb-5 border border-orange-200 shadow-md hover:shadow-lg transition-shadow">
              <Award className="h-4 w-4 sm:h-5 sm:w-5 text-orange-500 animate-pulse" />
              <span className="text-xs sm:text-sm font-bold text-orange-600">Why Choose Us</span>
            </div>
            
            <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-black mb-4 sm:mb-5">
              <span className="font-headline text-gray-900">The</span>
              <span className="font-headline text-gradient animate-gradient"> RaQuadrant </span>
              <span className="font-headline text-gray-900">Difference</span>
            </h2>
            
            <div className="relative w-24 sm:w-32 h-1.5 sm:h-2 mx-auto rounded-full mb-3 sm:mb-4 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer" />
            </div>
            <p className="text-base sm:text-lg text-gray-600">Excellence in Every Detail</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 max-w-5xl mx-auto">
            {partners.map((item, index) => (
              <div 
                key={item.title}
                className="group animate-slideInUp hover-lift"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="flex items-start gap-4 sm:gap-5 p-5 sm:p-6 lg:p-7 bg-white rounded-2xl sm:rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-orange-100 h-full card-shine relative overflow-hidden">
                  {/* Decorative Corner */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-orange-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="flex-shrink-0 relative">
                    <div className="absolute inset-0 bg-orange-500/20 rounded-2xl blur-lg animate-pulse" />
                    <div className="relative flex items-center justify-center h-12 w-12 sm:h-14 sm:w-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-orange-400 to-amber-500 text-white shadow-lg transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                      {item.icon}
                    </div>
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-headline text-base sm:text-lg font-black mb-2 sm:mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-600 group-hover:to-amber-600 transition-all duration-300">
                      {item.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                    
                    {/* Bottom Line Indicator */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 to-amber-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-b-2xl" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" ref={testimonialsReveal.ref} className={`py-12 sm:py-16 lg:py-20 bg-white relative overflow-hidden scroll-reveal ${testimonialsReveal.isInView ? 'in-view' : ''}`}>
        <div className="absolute top-0 right-0 w-72 h-72 bg-orange-50 rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-50 rounded-full blur-3xl opacity-50" />
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-6xl">
          <div className="text-center mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 sm:px-5 sm:py-2 bg-gradient-to-r from-orange-50 to-amber-50 rounded-full mb-4 sm:mb-5 border border-orange-200 shadow-md hover:shadow-lg transition-shadow">
              <Quote className="h-4 w-4 sm:h-5 sm:w-5 text-orange-500" />
              <span className="text-xs sm:text-sm font-bold text-orange-600">Testimonials</span>
            </div>
            
            <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-black mb-4 sm:mb-5">
              <span className="font-headline text-gray-900">What our clients</span>
              <span className="font-headline text-gradient animate-gradient"> say</span>
            </h2>
            
            <div className="relative w-24 sm:w-32 h-1.5 sm:h-2 mx-auto rounded-full mb-3 sm:mb-4 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400" />
            </div>
            <p className="text-base sm:text-lg text-gray-600">Real stories from businesses we&apos;ve powered</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {testimonials.map((item, index) => (
              <div
                key={item.name}
                className="group animate-slideInUp hover-lift"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="h-full flex flex-col p-5 sm:p-6 lg:p-7 bg-white rounded-2xl sm:rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-orange-100 card-shine relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-orange-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="flex gap-1 mb-4">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  
                  <blockquote className="text-sm sm:text-base text-gray-700 leading-relaxed mb-5 sm:mb-6 flex-1 italic">
                    &ldquo;{item.quote}&rdquo;
                  </blockquote>
                  
                  <div className="pt-4 border-t border-orange-100">
                    <p className="font-headline font-bold text-gray-900 text-base sm:text-lg">{item.name}</p>
                    <p className="text-orange-600 font-semibold text-xs sm:text-sm">{item.role}</p>
                    <p className="text-gray-500 text-xs sm:text-sm mt-0.5">{item.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section ref={ctaReveal.ref} className={`relative py-16 sm:py-20 lg:py-24 overflow-hidden scroll-reveal ${ctaReveal.isInView ? 'in-view' : ''}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600 via-amber-500 to-yellow-600 animate-gradient" />
        
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-[400px] sm:w-[500px] lg:w-[600px] h-[400px] sm:h-[500px] lg:h-[600px] bg-white/20 rounded-full blur-3xl animate-float" />
          <div className="absolute top-0 left-0 w-[400px] sm:w-[500px] lg:w-[600px] h-[400px] sm:h-[500px] lg:h-[600px] bg-white/10 rounded-full blur-2xl animate-ripple" />
          <div className="absolute bottom-0 right-0 w-[500px] sm:w-[600px] lg:w-[700px] h-[500px] sm:h-[600px] lg:h-[700px] bg-white/20 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}} />
          <div className="absolute bottom-0 right-0 w-[500px] sm:w-[600px] lg:w-[700px] h-[500px] sm:h-[600px] lg:h-[700px] bg-white/10 rounded-full blur-2xl animate-ripple" style={{animationDelay: '1s'}} />
          
          {/* Sparkle Effects */}
          <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-white rounded-full animate-sparkle" />
          <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-white/70 rounded-full animate-sparkle" style={{animationDelay: '0.5s'}} />
          <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-white/70 rounded-full animate-sparkle" style={{animationDelay: '1s'}} />
        </div>

        <div className="container mx-auto px-4 sm:px-6 text-center relative z-10 max-w-5xl">
          <div className="inline-flex p-5 sm:p-6 lg:p-8 glass-effect-dark rounded-full mb-6 sm:mb-8 animate-float border-2 border-white/30 shadow-2xl backdrop-blur-xl">
            <div className="relative">
              <div className="absolute inset-0 bg-white/30 rounded-full blur-xl animate-pulse" />
              <Sun className="relative h-14 w-14 sm:h-16 sm:w-16 lg:h-20 lg:w-20 text-white animate-pulse" />
            </div>
          </div>
          
          <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 sm:mb-5 drop-shadow-2xl text-shadow-glow">
            <span className="font-headline">Ready to Go Solar?</span>
          </h2>
          
          <p className="text-base sm:text-lg md:text-xl text-white/95 max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed drop-shadow-lg">
            Join thousands of satisfied customers who've made the switch to clean, affordable solar energy.
          </p>

          <Button asChild size="lg" className="bg-white text-orange-600 hover:bg-orange-50 font-black px-8 py-6 sm:px-10 sm:py-7 lg:px-12 lg:py-7 text-base sm:text-lg lg:text-xl rounded-full shadow-2xl hover:shadow-white/50 transform hover:scale-110 transition-all duration-500 group relative overflow-hidden">
            <Link href="/contact" className="flex items-center gap-2 sm:gap-3 relative z-10">
              <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 animate-sparkle" />
              Get Your Free Quote Now
              <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 group-hover:translate-x-2 transition-transform" />
              <div className="absolute inset-0 bg-orange-100/30 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </Link>
          </Button>

          <div className="mt-10 sm:mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto">
            {[
              { value: "500+", label: "Projects", icon: <Building2 className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8" /> },
              { value: "10,000+", label: "Customers", icon: <Users className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8" /> },
              { value: "50MW+", label: "Installed", icon: <Zap className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8" /> },
              { value: "10+", label: "Years Exp", icon: <Award className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8" /> }
            ].map((stat, i) => (
              <div key={i} className="text-center transform hover:scale-110 transition-transform duration-300 group/stat">
                <div className="relative">
                  <div className="absolute inset-0 bg-white/20 rounded-3xl blur-lg animate-pulse" />
                  <div className="relative glass-effect-dark rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-2xl border-2 border-white/30 backdrop-blur-xl">
                    <div className="text-white mb-2 sm:mb-3 inline-block group-hover/stat:scale-110 group-hover/stat:rotate-12 transition-all duration-300">
                      {stat.icon}
                    </div>
                    <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-1 sm:mb-2 drop-shadow-lg text-shadow-glow">
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-white/90 uppercase tracking-wider">
                      {stat.label}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-white/50 to-white/70 transform scale-x-0 group-hover/stat:scale-x-100 transition-transform duration-500 rounded-b-2xl" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
