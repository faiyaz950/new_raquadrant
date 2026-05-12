'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { CheckCircle2, FileText, HardHat, LayoutPanelTop, ShieldCheck, Truck, Sun, Zap, TrendingUp, Award, ArrowRight, Sparkles, Clock, Users, BarChart3, Shield, Leaf, Battery } from 'lucide-react';
import { useServices, useScopeOfWork, useExecutionProcess, useServicesHeroSlides, useServicesHeroContent } from '@/hooks/use-site-content';
import { getIcon } from '@/lib/icon-map';

const FALLBACK_SERVICES = [
  { id: "residential", idKey: "residential", title: "Residential Rooftop Solar", description: "Transform your home into a clean energy powerhouse. Slash bills by up to 90%.", features: ["Custom-engineered designs", "Premium Tier-1 panels with 25+ year warranty", "Smart monitoring & full subsidy assistance"], stats: ["90% Bill Cut", "25+ Years", "Full Subsidy", "3-5 Year ROI"], capacity: "1kW to 10kW", roi: "20-25% returns", gradient: "from-orange-400 via-amber-400 to-yellow-400", icon: <Sun className="h-6 w-6" />, iconName: "Sun", image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&auto=format&fit=crop" },
  { id: "commercial", idKey: "commercial", title: "Commercial & Industrial Solar", description: "Power your business sustainably. High-capacity systems with exceptional ROI and tax benefits.", features: ["10kW to 1MW+ systems for all businesses", "Flexible OPEX/CAPEX financing models", "Performance guarantees & tax benefits"], stats: ["70-100% Offset", "3-4 Year ROI", "Tax Benefits", "Zero Downtime"], capacity: "10kW to 1MW+", roi: "25-30% returns", gradient: "from-yellow-400 via-orange-400 to-amber-500", icon: <BarChart3 className="h-6 w-6" />, iconName: "BarChart3", image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&auto=format&fit=crop" },
  { id: "infrastructure", idKey: "infrastructure", title: "Solar Pumps & Street Lights", description: "Off-grid solutions for agriculture and public safety with up to 90% subsidy support.", features: ["Solar pumps (1-25 HP) for farming", "90% subsidy under PM-KUSUM scheme", "Smart street lights with auto operation"], stats: ["Off-Grid Ready", "90% Subsidy", "Remote Areas", "5+ Years Life"], capacity: "1-25 HP pumps", roi: "Immediate savings", gradient: "from-amber-300 via-orange-400 to-yellow-500", icon: <Zap className="h-6 w-6" />, iconName: "Zap", image: "https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=800&auto=format&fit=crop" },
];

const FALLBACK_SCOPE = [
  { phase: "Technical Selection & Design", icon: <LayoutPanelTop className="h-6 w-6" />, iconName: "LayoutPanelTop", content: "Comprehensive technical selection and system design with premium Tier-1 solar panels from globally recognized manufacturers.", details: ["PVsyst simulation", "3D roof modeling", "Load calculations", "Energy forecasting"], color: "orange", image: "https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=600&auto=format&fit=crop" },
  { phase: "Government Liaison & Approvals", icon: <FileText className="h-6 w-6" />, iconName: "FileText", content: "We handle all bureaucratic complexities including subsidy applications under PM Surya Ghar Muft Bijli Yojana.", details: ["PM Surya Ghar subsidy", "PM-KUSUM facilitation", "Net metering", "DISCOM coordination"], color: "amber", image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&auto=format&fit=crop" },
  { phase: "Procurement & Logistics", icon: <Truck className="h-6 w-6" />, iconName: "Truck", content: "Strong partnerships with leading manufacturers ensure competitive prices without compromising quality.", details: ["Manufacturer partnerships", "Quality inspection", "BIS & MNRE compliance", "Material traceability"], color: "yellow", image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop" },
  { phase: "Professional Installation", icon: <HardHat className="h-6 w-6" />, iconName: "HardHat", content: "MNRE-certified technicians and electrical engineers execute installation with top priority on safety.", details: ["MNRE-certified team", "Safety protocols", "IS 3043 earthing", "Grid synchronization"], color: "orange", image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=600&auto=format&fit=crop" },
  { phase: "After-Sales Support", icon: <ShieldCheck className="h-6 w-6" />, iconName: "ShieldCheck", content: "Committed to your system's optimal performance for decades with 24/7 monitoring and support.", details: ["24/7 cloud monitoring", "Automatic alerts", "Bi-annual maintenance", "48-hour response"], color: "amber", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop" },
];

const FALLBACK_EXECUTION = [
  { name: "Site Assessment", description: "Detailed on-site surveys to evaluate roof structure, orientation, and electrical infrastructure.", icon: <Sun className="h-6 w-6" />, iconName: "Sun", duration: "1-2 days", color: "from-orange-400 to-amber-500" },
  { name: "Feasibility Study", description: "Comprehensive technical and financial reports with solar irradiation analysis and ROI calculations.", icon: <TrendingUp className="h-6 w-6" />, iconName: "TrendingUp", duration: "3-5 days", color: "from-amber-400 to-yellow-500" },
  { name: "Engineering & Design", description: "Detailed technical plans with diagrams, layouts, 3D visualizations, and complete documentation.", icon: <LayoutPanelTop className="h-6 w-6" />, iconName: "LayoutPanelTop", duration: "1 week", color: "from-yellow-400 to-orange-500" },
  { name: "Procurement", description: "Sourcing equipment through verified vendors with proper certifications and quality checks.", icon: <Truck className="h-6 w-6" />, iconName: "Truck", duration: "1-2 weeks", color: "from-orange-400 to-amber-400" },
  { name: "Installation", description: "MNRE-certified installers execute complete installation with comprehensive testing.", icon: <HardHat className="h-6 w-6" />, iconName: "HardHat", duration: "3-10 days", color: "from-amber-400 to-orange-500" },
  { name: "Support & Maintenance", description: "Continuous support through cloud monitoring, preventive maintenance, and warranty management.", icon: <Zap className="h-6 w-6" />, iconName: "Zap", duration: "Lifetime", color: "from-yellow-400 to-amber-500" },
];

const FALLBACK_HERO_IMAGES = [
  "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1920&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=1920&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?w=1920&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1920&auto=format&fit=crop",
];

const FALLBACK_HERO_CONTENT = {
  badge: "End-to-End Premium Solar Solutions",
  titleLine1: "Our Services &",
  titleLine2: "Solutions",
  subtitle: "Complete Solar Excellence from Concept to Commissioning",
};

export default function ServicesPage() {
  const servicesFromDb = useServices();
  const scopeFromDb = useScopeOfWork();
  const executionFromDb = useExecutionProcess();
  const heroSlidesFromDb = useServicesHeroSlides();
  const heroContentFromDb = useServicesHeroContent();

  const services = useMemo(() => {
    if (servicesFromDb.data?.length) {
      return servicesFromDb.data.map((s) => ({ ...s, icon: getIcon(s.iconName, 'h-6 w-6') }));
    }
    return FALLBACK_SERVICES;
  }, [servicesFromDb.data]);

  const scopeOfWork = useMemo(() => {
    if (scopeFromDb.data?.length) {
      return scopeFromDb.data.map((s) => ({ ...s, icon: getIcon(s.iconName, 'h-6 w-6') }));
    }
    return FALLBACK_SCOPE;
  }, [scopeFromDb.data]);

  const executionProcess = useMemo(() => {
    if (executionFromDb.data?.length) {
      return executionFromDb.data.map((s) => ({ ...s, icon: getIcon(s.iconName, 'h-6 w-6') }));
    }
    return FALLBACK_EXECUTION;
  }, [executionFromDb.data]);

  const heroImages = useMemo(() =>
    heroSlidesFromDb.data?.length
      ? heroSlidesFromDb.data.map((s) => s.image)
      : FALLBACK_HERO_IMAGES,
    [heroSlidesFromDb.data]);

  const heroContent = useMemo(() =>
    heroContentFromDb.data ?? FALLBACK_HERO_CONTENT,
    [heroContentFromDb.data]);

  const [expandedScope, setExpandedScope] = useState(0);
  const [hoveredService, setHoveredService] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [heroSlideIndex, setHeroSlideIndex] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const len = heroImages.length || 1;
    const interval = setInterval(() => {
      setHeroSlideIndex((prev) => (prev + 1) % len);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);
  
  return (
    <div className="flex flex-col bg-gradient-to-br from-white via-orange-50/30 to-yellow-50/30 overflow-hidden">
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(3deg); }
        }
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-15px) translateX(10px); }
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 30px rgba(251, 146, 60, 0.4), 0 0 60px rgba(251, 146, 60, 0.2); }
          50% { box-shadow: 0 0 50px rgba(251, 146, 60, 0.6), 0 0 80px rgba(251, 146, 60, 0.3); }
        }
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInDown {
          from { opacity: 0; transform: translateY(-50px); }
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
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.8; }
        }
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes wave {
          0%, 100% { transform: translateX(0) translateY(0); }
          25% { transform: translateX(10px) translateY(-10px); }
          50% { transform: translateX(0) translateY(-20px); }
          75% { transform: translateX(-10px) translateY(-10px); }
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-floatSlow { animation: floatSlow 8s ease-in-out infinite; }
        .animate-shimmer { 
          animation: shimmer 3s linear infinite;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent);
          background-size: 1000px 100%;
        }
        .animate-glow { animation: glow 3s ease-in-out infinite; }
        .animate-slideInUp { animation: slideInUp 0.8s ease-out forwards; }
        .animate-slideInDown { animation: slideInDown 0.8s ease-out forwards; }
        .animate-slideInLeft { animation: slideInLeft 0.8s ease-out forwards; }
        .animate-slideInRight { animation: slideInRight 0.8s ease-out forwards; }
        .animate-scaleIn { animation: scaleIn 0.6s ease-out forwards; }
        .animate-pulse { animation: pulse 2s ease-in-out infinite; }
        .animate-rotate { animation: rotate 20s linear infinite; }
        .animate-wave { animation: wave 4s ease-in-out infinite; }
        .animate-gradient { animation: gradient 8s ease infinite; background-size: 200% 200%; }
        .animate-fadeIn { animation: fadeIn 1s ease-out forwards; }
        .animate-slideUp { animation: slideUp 0.6s ease-out forwards; }
        
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        
        .glass-effect {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
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

        .group:hover .group-hover-scale {
          transform: scale(1.1);
        }

        .gradient-border {
          position: relative;
          background: white;
        }
        .gradient-border::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 2px;
          background: linear-gradient(135deg, #fb923c, #fbbf24, #fb923c);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">

        {/* Background image slideshow */}
        <div className="absolute inset-0">
          {heroImages.map((src, i) => (
            <div
              key={src}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${i === heroSlideIndex ? "opacity-100 z-[1]" : "opacity-0 z-0"}`}
              aria-hidden={i !== heroSlideIndex}
            >
              <img src={src} alt="" className="w-full h-full object-cover" fetchPriority={i === 0 ? "high" : "low"} />
            </div>
          ))}
          {/* Dark gradient overlay for readability */}
          <div className="absolute inset-0 z-[2] bg-gradient-to-b from-black/65 via-black/55 to-black/70" />
          {/* Brand colour wash at the bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-40 z-[3]" style={{ background: 'linear-gradient(to top, #f97316/20, transparent)' }} />
        </div>

        {/* Slider dots */}
        <div className="absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {heroImages.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Slide ${i + 1}`}
              onClick={() => setHeroSlideIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 ${i === heroSlideIndex ? "w-8 bg-white shadow" : "w-2 bg-white/40 hover:bg-white/70"}`}
            />
          ))}
        </div>

        {/* Dot grid */}
        <div className="absolute inset-0 z-[2] opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1.5px, transparent 0)', backgroundSize: '36px 36px' }} />

        <div className="container mx-auto px-4 text-center relative z-10 py-24">

          {/* Badge */}
          <div className={`inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/25 bg-white/10 backdrop-blur-sm mb-7 ${isVisible ? 'animate-slideInDown' : 'opacity-0'}`}>
            <Sparkles className="h-3.5 w-3.5 text-amber-300" />
            <span className="text-white/90 text-xs font-bold tracking-widest uppercase">{heroContent.badge}</span>
          </div>

          {/* Heading */}
          <h1 className={`font-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-5 text-white drop-shadow-xl ${isVisible ? 'animate-scaleIn' : 'opacity-0'}`} style={{ animationDelay: '0.15s' }}>
            {heroContent.titleLine1}{' '}
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(90deg,#fbbf24,#f97316)' }}>
                {heroContent.titleLine2}
              </span>
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full opacity-60" style={{ background: 'linear-gradient(90deg,#fbbf24,#f97316)' }} />
            </span>
          </h1>

          {/* Subtitle */}
          <p className={`max-w-2xl mx-auto text-base sm:text-lg text-white/75 leading-relaxed mb-8 ${isVisible ? 'animate-slideInUp' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
            {heroContent.subtitle}
          </p>

          {/* Feature pills */}
          <div className={`flex flex-wrap gap-2 justify-center mb-10 ${isVisible ? 'animate-fadeIn' : 'opacity-0'}`} style={{ animationDelay: '0.45s' }}>
            {[
              { icon: <Shield className="h-3.5 w-3.5" />, text: "25+ Year Warranty" },
              { icon: <Leaf className="h-3.5 w-3.5" />,   text: "90% Bill Reduction" },
              { icon: <Award className="h-3.5 w-3.5" />,  text: "MNRE Certified" },
              { icon: <Battery className="h-3.5 w-3.5" />, text: "24/7 Monitoring" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm hover:bg-white/20 transition-colors duration-200">
                <span className="text-amber-300">{item.icon}</span>
                <span className="text-white text-xs font-semibold">{item.text}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className={`flex flex-wrap gap-4 justify-center mb-14 ${isVisible ? 'animate-slideInUp' : 'opacity-0'}`} style={{ animationDelay: '0.6s' }}>
            <a
              href="/contact"
              className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-headline font-bold text-sm text-white shadow-xl shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-105 transition-all duration-300"
              style={{ background: 'linear-gradient(135deg,#f97316,#f59e0b)' }}
            >
              Get Started Today
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
            </a>
            <a
              href="#services"
              className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-headline font-bold text-sm text-white border-2 border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white/20 hover:border-white/60 hover:scale-105 transition-all duration-300"
            >
              Explore Solutions
              <Sparkles className="h-4 w-4 group-hover:rotate-12 transition-transform duration-300" />
            </a>
          </div>

          {/* Stats */}
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto ${isVisible ? 'animate-fadeIn' : 'opacity-0'}`} style={{ animationDelay: '0.75s' }}>
            {[
              { value: "500+",  label: "Projects",     icon: <BarChart3 className="h-5 w-5" /> },
              { value: "1000+", label: "Happy Clients", icon: <Users className="h-5 w-5" /> },
              { value: "50MW+", label: "Installed",    icon: <Zap className="h-5 w-5" /> },
              { value: "10+",   label: "Years Exp",    icon: <Award className="h-5 w-5" /> },
            ].map((stat, i) => (
              <div key={i} className="group rounded-2xl p-4 border border-white/15 bg-white/10 backdrop-blur-md hover:bg-white/15 hover:border-amber-400/40 transition-all duration-300 text-center">
                <div className="text-amber-300 mb-1.5 inline-block group-hover:scale-110 transition-transform duration-200">{stat.icon}</div>
                <div className="font-headline text-2xl font-black text-white">{stat.value}</div>
                <div className="text-xs font-semibold text-white/60 uppercase tracking-wide mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 animate-bounce">
          <div className="w-6 h-9 border-2 border-white/40 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-white/60 rounded-full mt-1.5 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section id="services" className="py-16 bg-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle, #fb923c 1px, transparent 1px)`,
            backgroundSize: '30px 30px'
          }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-50 to-amber-50 rounded-full mb-5 shadow-lg border border-orange-200/50 animate-slideInDown">
              <Award className="h-4 w-4 text-orange-500 animate-pulse" />
              <span className="font-headline text-xs font-bold text-orange-600">Our Expertise</span>
            </div>
            
            <h2 className="font-headline text-3xl md:text-4xl font-black mb-5 animate-slideInUp">
              <span className="text-gradient animate-gradient">
                Comprehensive Service Portfolio
              </span>
            </h2>
            
            <div className="relative w-24 h-1 bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 mx-auto mb-6 rounded-full animate-scaleIn overflow-hidden">
              <div className="absolute inset-0 animate-shimmer"></div>
            </div>
            
            <p className="font-headline text-sm md:text-base text-gray-600 leading-relaxed max-w-3xl mx-auto animate-slideInUp" style={{animationDelay: '0.2s'}}>
              RaQuadrant Energy specializes in 
              <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600"> Turnkey Rooftop Solar Installation </span>
              — complete, hassle-free solar solutions across 
              <span className="font-bold text-gray-800"> Eastern UP, Bihar, Jharkhand, Odisha, West Bengal, Assam</span>, and expanding nationwide.
            </p>
          </div>
        </div>
      </section>

      {/* Services Cards - Ultra Premium */}
      <section className="py-16 bg-gradient-to-b from-white via-orange-50/30 to-amber-50/30 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-20 right-10 w-64 h-64 bg-gradient-to-br from-orange-200/30 to-amber-200/30 rounded-full blur-3xl animate-floatSlow"></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-br from-yellow-200/30 to-orange-200/30 rounded-full blur-3xl animate-float"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div 
                key={service.id}
                className="group relative animate-slideInUp hover-lift"
                style={{animationDelay: `${index * 0.2}s`}}
                onMouseEnter={() => setHoveredService(service.id)}
                onMouseLeave={() => setHoveredService(null)}
              >
                {/* Card Container */}
                <div className="relative h-full bg-white rounded-2xl shadow-xl hover:shadow-orange-500/20 transition-all duration-700 overflow-hidden border border-orange-100/50">
                  {/* Background Image */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Animated Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-700`}></div>
                  
                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="animate-shimmer absolute inset-0"></div>
                  </div>

                  {/* Glow Effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-700"></div>

                  <div className="relative p-6">
                    {/* Floating Icon */}
                    <div className="relative mb-5">
                      <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${service.gradient} shadow-xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-700`}>
                        <div className="text-white group-hover-scale transition-transform duration-500">
                          {service.icon}
                        </div>
                      </div>
                      {/* Pulse Ring */}
                      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.gradient} opacity-20 group-hover:animate-ping`}></div>
                    </div>

                    {/* Title */}
                    <h3 className="font-headline text-xl font-black text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-600 group-hover:to-amber-600 transition-all duration-300">
                      {service.title}
                    </h3>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="font-headline px-3 py-1.5 bg-gradient-to-r from-orange-50 to-amber-50 text-orange-700 rounded-full text-xs font-bold border border-orange-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                        {service.capacity}
                      </span>
                      <span className="font-headline px-3 py-1.5 bg-gradient-to-r from-amber-50 to-yellow-50 text-amber-700 rounded-full text-xs font-bold border border-amber-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                        {service.roi}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="font-headline text-gray-600 mb-5 leading-relaxed text-sm">
                      {service.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-2.5 mb-5">
                      {service.features.map((feature, i) => (
                        <div 
                          key={i} 
                          className="flex items-start gap-3 transform translate-x-0 group-hover:translate-x-2 transition-transform duration-500 opacity-0 animate-slideInLeft"
                          style={{
                            animationDelay: `${(index * 0.2) + (i * 0.1)}s`,
                            animationFillMode: 'forwards'
                          }}
                        >
                          <div className="flex-shrink-0 mt-0.5">
                            <div className="p-1 bg-gradient-to-br from-orange-400 to-amber-500 rounded-md">
                              <CheckCircle2 className="h-3.5 w-3.5 text-white" />
                            </div>
                          </div>
                          <span className="font-headline text-xs text-gray-700 leading-relaxed">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-2 pt-5 border-t-2 border-gradient-to-r from-orange-100 via-amber-100 to-yellow-100">
                      {service.stats.map((stat, i) => (
                        <div 
                          key={i} 
                          className="relative group/stat p-3 bg-gradient-to-br from-orange-50/50 to-amber-50/50 rounded-xl transform hover:scale-105 transition-all duration-300 border border-orange-100/50 hover:border-orange-300 hover:shadow-lg"
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-amber-400 rounded-xl opacity-0 group-hover/stat:opacity-10 transition-opacity duration-300"></div>
                          <div className="relative flex items-center gap-1.5">
                            <Award className="h-4 w-4 text-orange-500 flex-shrink-0" />
                            <span className="font-headline text-[10px] text-gray-800 font-bold leading-tight">{stat}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Hover Arrow */}
                    <div className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 transform translate-x-8 group-hover:translate-x-0 transition-all duration-500">
                      <div className="p-2 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl shadow-lg">
                        <ArrowRight className="h-4 w-4 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Bottom Accent */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r ${service.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scope of Work - Premium Accordion */}
      <section className="py-16 bg-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-orange-100/40 to-amber-100/40 rounded-full blur-3xl animate-floatSlow"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-yellow-100/40 to-orange-100/40 rounded-full blur-3xl animate-float"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-50 to-amber-50 rounded-full mb-5 shadow-lg border border-orange-200/50 animate-slideInDown">
              <Sparkles className="h-4 w-4 text-orange-500 animate-pulse" />
              <span className="font-headline text-xs font-bold text-orange-600">Complete Process</span>
            </div>
            
            <h2 className="font-headline text-3xl md:text-4xl font-black mb-5 animate-slideInUp">
              <span className="text-gradient animate-gradient">
                Complete Scope of Work
              </span>
            </h2>
            
            <div className="relative w-24 h-1 bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 mx-auto mb-4 rounded-full animate-scaleIn overflow-hidden">
              <div className="absolute inset-0 animate-shimmer"></div>
            </div>
            
            <p className="font-headline text-base text-gray-600 font-semibold animate-slideInUp" style={{animationDelay: '0.2s'}}>
              We Handle Everything
            </p>
          </div>

          <div className="max-w-6xl mx-auto space-y-4">
            {scopeOfWork.map((item, index) => {
              const isExpanded = expandedScope === index;
              const colorMap = {
                orange: 'from-orange-400 to-amber-500',
                amber: 'from-amber-400 to-yellow-500',
                yellow: 'from-yellow-400 to-orange-400'
              };
              
              return (
                <div 
                  key={index}
                  className="group relative animate-slideInUp"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <div className={`relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden border-2 ${isExpanded ? 'border-orange-300' : 'border-orange-100'}`}>
                    {/* Glow Effect */}
                    {isExpanded && (
                      <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 rounded-2xl opacity-20 blur-xl animate-pulse"></div>
                    )}

                    <button
                      onClick={() => setExpandedScope(isExpanded ? -1 : index)}
                      className="relative w-full px-6 py-5 flex items-center justify-between text-left group/btn hover:bg-gradient-to-r hover:from-orange-50/50 hover:to-amber-50/50 transition-all duration-500"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        {/* Icon with Animation */}
                        <div className={`relative p-3 rounded-xl bg-gradient-to-br ${colorMap[item.color]} text-white shadow-lg transform transition-all duration-700 ${isExpanded ? 'rotate-12 scale-110' : 'group-hover/btn:scale-110 group-hover/btn:rotate-6'}`}>
                          <div className="relative z-10">{item.icon}</div>
                          {isExpanded && (
                            <div className="absolute inset-0 rounded-xl bg-white/30 animate-ping"></div>
                          )}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`font-headline px-3 py-1 bg-gradient-to-r ${colorMap[item.color]} text-white rounded-full text-xs font-bold shadow-lg`}>
                              Phase {index + 1}
                            </span>
                            {isExpanded && (
                              <div className="flex gap-1">
                                {[...Array(3)].map((_, i) => (
                                  <div key={i} className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse" style={{animationDelay: `${i * 0.2}s`}}></div>
                                ))}
                              </div>
                            )}
                          </div>
                          <span className={`font-headline text-lg md:text-xl font-black transition-all duration-300 ${isExpanded ? 'text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600' : 'text-gray-900 group-hover/btn:text-orange-600'}`}>
                            {item.phase}
                          </span>
                        </div>
                      </div>
                      
                      {/* Expand Icon */}
                      <div className={`transform transition-all duration-700 ${isExpanded ? 'rotate-180 scale-110' : 'group-hover/btn:scale-110'} p-2.5 bg-gradient-to-br from-orange-100 to-amber-100 rounded-xl`}>
                        <svg className={`w-5 h-5 transition-colors duration-300 ${isExpanded ? 'text-orange-600' : 'text-orange-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </button>
                    
                    {/* Expandable Content */}
                    <div 
                      className={`overflow-hidden transition-all duration-700 ${isExpanded ? 'max-h-[900px] opacity-100' : 'max-h-0 opacity-0'}`}
                    >
                      <div className="px-6 pb-6 bg-gradient-to-br from-orange-50/30 via-amber-50/30 to-yellow-50/30">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                          {/* Copy */}
                          <div className="lg:col-span-7">
                            <p className="font-headline text-sm md:text-base text-gray-700 leading-relaxed mb-4 animate-slideInUp">
                              {item.content}
                            </p>

                            {/* Details Card */}
                            <div className="glass-effect rounded-2xl p-5 shadow-lg border border-orange-200/50 animate-scaleIn">
                              <h4 className="font-headline font-black text-base text-gray-900 mb-4 flex items-center gap-2">
                                <div className="p-1.5 bg-gradient-to-br from-orange-400 to-amber-500 rounded-md shadow-sm">
                                  <CheckCircle2 className="h-4 w-4 text-white" />
                                </div>
                                What We Cover
                              </h4>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {item.details.map((detail, i) => (
                                  <div
                                    key={i}
                                    className="group/detail flex items-center gap-3 p-3 bg-white/80 rounded-xl hover:bg-gradient-to-r hover:from-orange-50 hover:to-amber-50 transform hover:-translate-y-0.5 transition-all duration-300 border border-orange-100/70 hover:border-orange-300 hover:shadow-lg"
                                  >
                                    <div className={`w-2 h-2 bg-gradient-to-br ${colorMap[item.color]} rounded-full flex-shrink-0 group-hover/detail:scale-125 transition-transform duration-300`} />
                                    <span className="font-headline text-xs sm:text-sm font-semibold text-gray-700 group-hover/detail:text-orange-700 transition-colors duration-300">
                                      {detail}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Image */}
                          <div className="lg:col-span-5">
                            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-orange-200/60 bg-white animate-scaleIn">
                              {/* Premium frame */}
                              <div className="absolute inset-0 pointer-events-none">
                                <div className={`absolute -inset-1 bg-gradient-to-br ${colorMap[item.color]} opacity-20 blur-2xl`} />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-black/0 to-black/0" />
                              </div>
                              <div className="relative aspect-[16/10] sm:aspect-[16/9]">
                                <img
                                  src={item.image}
                                  alt={item.phase}
                                  className="absolute inset-0 h-full w-full object-cover transform group-hover:scale-[1.03] transition-transform duration-700"
                                  loading="lazy"
                                />
                              </div>
                              <div className="relative p-4 bg-white/90 backdrop-blur">
                                <div className="flex items-center justify-between gap-3">
                                  <div className="min-w-0">
                                    <div className="text-[11px] font-bold text-orange-600">Phase {index + 1}</div>
                                    <div className="truncate font-headline text-sm font-black text-gray-900">{item.phase}</div>
                                  </div>
                                  <div className={`shrink-0 h-9 w-9 rounded-xl bg-gradient-to-br ${colorMap[item.color]} text-white flex items-center justify-center shadow-lg`}>
                                    {item.icon}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Accent Line */}
                    <div className={`absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r ${colorMap[item.color]} transform transition-all duration-700 ${isExpanded ? 'scale-x-100' : 'scale-x-0'} origin-left`}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Execution Process - Premium Timeline */}
      <section className="py-16 bg-gradient-to-b from-white via-orange-50/30 to-amber-50/30 relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-20 w-72 h-72 bg-gradient-to-br from-orange-200/30 to-amber-200/30 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/4 left-20 w-96 h-96 bg-gradient-to-br from-yellow-200/30 to-orange-200/30 rounded-full blur-3xl animate-floatSlow"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-50 to-amber-50 rounded-full mb-5 shadow-lg border border-orange-200/50 animate-slideInDown">
              <Clock className="h-4 w-4 text-orange-500 animate-pulse" />
              <span className="font-headline text-xs font-bold text-orange-600">Our Process</span>
            </div>
            
            <h2 className="font-headline text-3xl md:text-4xl font-black mb-5 animate-slideInUp">
              <span className="text-gradient animate-gradient">
                Execution Process
              </span>
            </h2>
            
            <div className="relative w-24 h-1 bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 mx-auto mb-4 rounded-full animate-scaleIn overflow-hidden">
              <div className="absolute inset-0 animate-shimmer"></div>
            </div>
            
            <p className="font-headline text-base text-gray-600 font-semibold animate-slideInUp" style={{animationDelay: '0.2s'}}>
              The 6-Step Methodology
            </p>
          </div>

          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {executionProcess.map((step, index) => (
              <div 
                key={step.name}
                className="group relative animate-slideInUp perspective-1000"
                style={{animationDelay: `${index * 0.15}s`}}
              >
                <div className="relative h-full preserve-3d">
                  <div className="relative bg-white rounded-2xl p-6 shadow-xl hover:shadow-orange-500/20 transition-all duration-700 transform hover:-translate-y-2 hover:scale-105 border-2 border-orange-100/50 hover:border-orange-300 overflow-hidden group-hover:shadow-xl">
                    {/* Animated Background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-10 transition-opacity duration-700`}></div>
                    
                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                      <div className="animate-shimmer absolute inset-0"></div>
                    </div>

                    {/* Glow Effect */}
                    <div className={`absolute -inset-1 bg-gradient-to-br ${step.color} rounded-3xl opacity-0 group-hover:opacity-30 blur-2xl transition-opacity duration-700`}></div>
                    
                    {/* Step Number Badge - 3D Effect */}
                    <div className="absolute -top-3 -right-3 w-14 h-14 perspective-1000">
                      <div className={`w-full h-full bg-gradient-to-br ${step.color} rounded-xl flex items-center justify-center text-white font-headline font-black text-xl shadow-xl transform rotate-12 group-hover:rotate-0 group-hover:scale-125 transition-all duration-700 preserve-3d`}>
                        <span className="relative z-10">{index + 1}</span>
                        <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      </div>
                    </div>

                    {/* Icon Container */}
                    <div className="relative mb-5">
                      <div className={`inline-flex p-4 bg-gradient-to-br ${step.color} rounded-2xl text-white shadow-xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-700 relative z-10`}>
                        {step.icon}
                      </div>
                      {/* Pulse Rings */}
                      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${step.color} opacity-20 group-hover:animate-ping`}></div>
                      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${step.color} opacity-10 animate-pulse`}></div>
                    </div>

                    {/* Title */}
                    <h3 className="font-headline text-lg font-black text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-600 group-hover:to-amber-600 transition-all duration-500 relative z-10">
                      {step.name}
                    </h3>

                    {/* Description */}
                    <p className="font-headline text-sm text-gray-600 leading-relaxed mb-5 flex-grow relative z-10">
                      {step.description}
                    </p>

                    {/* Duration Badge */}
                    <div className="relative z-10 mt-auto pt-4 border-t-2 border-gradient-to-r from-orange-100 to-amber-100">
                      <div className="flex items-center gap-2">
                        <div className={`p-2 bg-gradient-to-br ${step.color} rounded-xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                          <Clock className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <div className="font-headline text-[10px] text-gray-500 font-semibold mb-0.5">Timeline</div>
                          <div className="font-headline font-black text-sm bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                            {step.duration}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Decorative Corner Element */}
                    <div className={`absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-br ${step.color} rounded-tl-full opacity-10 transform translate-x-16 translate-y-16 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-700`}></div>
                    
                    {/* Top Corner Accent */}
                    <div className={`absolute top-0 left-0 w-24 h-24 bg-gradient-to-br ${step.color} rounded-br-full opacity-5 transform -translate-x-12 -translate-y-12 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-700`}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden" style={{ background: 'linear-gradient(135deg, #f97316 0%, #f59e0b 55%, #fbbf24 100%)' }}>
        {/* Dot grid */}
        <div className="absolute inset-0 opacity-[0.12]" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1.5px, transparent 0)`,
          backgroundSize: '32px 32px'
        }} />
        {/* Light orbs */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 text-center relative z-10">
          {/* Icon */}
          <div className="inline-flex p-4 rounded-2xl mb-7 bg-white/20 border border-white/30 backdrop-blur-sm shadow-lg">
            <Zap className="h-10 w-10 text-white" />
          </div>

          {/* Heading */}
          <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight drop-shadow-sm">
            Ready to Go Solar?
          </h2>

          {/* Subheading */}
          <p className="font-headline text-base md:text-lg text-white/85 max-w-2xl mx-auto mb-8 leading-relaxed font-medium">
            Join thousands of satisfied customers who have made the switch to clean, renewable energy
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap gap-3 justify-center mb-10">
            {[
              { icon: <Shield className="h-4 w-4" />, text: "100% Safe & Secure" },
              { icon: <Award className="h-4 w-4" />, text: "MNRE Certified" },
              { icon: <Users className="h-4 w-4" />, text: "Expert Team" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 border border-white/30 backdrop-blur-sm hover:bg-white/30 transition-all duration-200">
                <div className="text-white">{item.icon}</div>
                <span className="font-headline text-white text-xs font-bold">{item.text}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 justify-center mb-14">
            <a
              href="/contact"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-orange-600 rounded-full font-headline font-black text-sm shadow-xl shadow-orange-900/20 hover:shadow-orange-900/30 hover:scale-105 transition-all duration-300"
            >
              Get Your Free Consultation
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
            <a
              href="/about"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-full font-headline font-black text-sm border-2 border-white/50 text-white hover:bg-white/20 hover:border-white hover:scale-105 transition-all duration-300"
            >
              View Our Projects
              <Sparkles className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
            </a>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { label: "Projects Completed", value: "500+", icon: <BarChart3 className="h-6 w-6" /> },
              { label: "Happy Customers",    value: "1000+", icon: <Users className="h-6 w-6" /> },
              { label: "MW Installed",       value: "50+",   icon: <Zap className="h-6 w-6" /> },
              { label: "Years Experience",   value: "10+",   icon: <Award className="h-6 w-6" /> }
            ].map((stat, i) => (
              <div key={i} className="group rounded-2xl p-5 bg-white/15 border border-white/25 backdrop-blur-sm hover:bg-white/25 transition-all duration-300 text-center">
                <div className="text-white mb-2 inline-block group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="font-headline text-2xl md:text-3xl font-black text-white mb-1">
                  {stat.value}
                </div>
                <div className="font-headline text-xs font-semibold text-white/75 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}