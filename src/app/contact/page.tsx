"use client";

import { ContactForm } from "@/components/contact-form";
import { Mail, Phone, MapPin, Globe, MessageSquare, ArrowRight, Sparkles, Send, Clock, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const OFFICE_ADDRESS = "1997 Rajdanga Main Road, E.K.T, Kolkata, West Bengal 700107";
const MAP_EMBED_URL = "https://www.google.com/maps?q=1997+Rajdanga+Main+Road+Kolkata+700107&output=embed";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50/40 via-white to-amber-50/30">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-orange-200/20 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-amber-200/20 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Hero Section with Enhanced Animations */}
      <section className="relative overflow-hidden py-10 sm:py-12">
        {/* Layered gradient base */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-slate-900" />
        <div className="absolute inset-0 bg-gradient-to-t from-orange-950/40 via-transparent to-amber-950/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(251,146,60,0.25),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_80%,rgba(245,158,11,0.15),transparent_50%)]" />
        {/* Spotlight behind heading */}
        <div className="absolute left-1/2 top-1/3 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-b from-orange-400/20 via-amber-400/10 to-transparent blur-3xl" />
        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-[0.06]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.12) 1px, transparent 1px)`,
          backgroundSize: "56px 56px",
        }} />
        {/* Floating gradient orbs */}
        <div className="absolute -left-20 top-1/4 h-80 w-80 rounded-full bg-orange-500/20 blur-[100px] animate-float" />
        <div className="absolute -right-20 top-1/3 h-96 w-96 rounded-full bg-amber-500/15 blur-[100px] animate-float-delayed" />
        <div className="absolute bottom-1/4 left-1/3 h-64 w-64 rounded-full bg-yellow-500/10 blur-[80px] animate-float" style={{ animationDelay: '2s' }} />
        {/* Soft vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,transparent_40%,rgba(0,0,0,0.4)_100%)]" />
        {/* Top accent glow */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-400/50 to-transparent" />

        <div className="container relative mx-auto px-4 text-center">
          {/* Badge with Animation */}
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-400/60 bg-orange-500/20 backdrop-blur-sm px-5 py-2.5 mb-5 animate-fade-in-down">
            <Sparkles className="h-4 w-4 text-orange-300 animate-pulse" />
            <span className="font-headline text-sm font-semibold text-orange-100 tracking-wide">Let&apos;s Connect</span>
          </div>

          {/* Animated Heading */}
          <h1 className="font-headline text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl mb-4 animate-fade-in-up">
            <span className="inline-block bg-gradient-to-r from-white via-orange-100 to-amber-200 bg-clip-text text-transparent animate-gradient">
              Get In Touch
            </span>
            <br />
            <span className="inline-block mt-1 text-3xl sm:text-4xl md:text-5xl bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent animate-gradient" style={{ animationDelay: '0.2s' }}>
              With Our Team
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl font-headline text-base text-gray-300 sm:text-lg leading-relaxed animate-fade-in" style={{ animationDelay: '0.3s' }}>
            Ready to harness the power of solar energy? Our experts are here to guide you through every step of your sustainable journey.
          </p>

          {/* CTA Buttons with Enhanced Animations */}
          <div className="mt-6 flex flex-wrap justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Link
              href="#contact-form"
              className="group relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 px-8 py-4 font-headline text-base font-semibold text-white shadow-2xl shadow-orange-500/50 transition-all duration-300 hover:scale-105 hover:shadow-orange-500/60 overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-orange-400 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Send className="h-5 w-5 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
              <span className="relative z-10">Send Message</span>
              <ArrowRight className="h-5 w-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            <a
              href="tel:+918910855185"
              className="group inline-flex items-center gap-2 rounded-full border-2 border-orange-400/60 bg-white/10 backdrop-blur-md px-8 py-4 font-headline text-base font-semibold text-white transition-all duration-300 hover:bg-white/20 hover:border-orange-400"
            >
              <Phone className="h-5 w-5 group-hover:animate-ring" />
              <span>Call Now</span>
            </a>
          </div>

          {/* Trust Badges */}
          <div className="mt-6 flex flex-wrap justify-center gap-6 text-gray-400 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-400" />
              <span className="text-sm">24/7 Support</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-400" />
              <span className="text-sm">Free Consultation</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-400" />
              <span className="text-sm">Quick Response</span>
            </div>
          </div>
        </div>

        {/* Bottom Gradient Line */}
        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-orange-500 via-amber-400 to-yellow-500 opacity-90 animate-shimmer" />
      </section>

      {/* Main Content Section */}
      <section id="contact-form" className="py-16 sm:py-20 lg:py-24 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-5 lg:gap-16">
            {/* Left Column - Form + Info Cards */}
            <div className="lg:col-span-3 space-y-10">
              {/* Form Card with Premium Design */}
              <div className="group rounded-3xl border-2 border-orange-200/60 bg-white/80 backdrop-blur-sm p-8 shadow-2xl shadow-orange-500/10 transition-all duration-500 hover:shadow-3xl hover:shadow-orange-500/20 hover:border-orange-300/80 animate-slide-in-left">
                {/* Form Header */}
                <div className="mb-8 flex items-start gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 via-orange-600 to-amber-600 text-white shadow-lg shadow-orange-500/30 group-hover:scale-110 transition-transform duration-300">
                    <MessageSquare className="h-7 w-7" />
                  </div>
                  <div className="flex-1">
                    <h2 className="font-headline text-2xl font-bold text-gray-900 sm:text-3xl mb-2">
                      Send Us a Message
                    </h2>
                    <p className="font-headline text-base text-gray-600 flex items-center gap-2">
                      <Clock className="h-4 w-4 text-orange-500" />
                      We typically respond within 2-4 hours
                    </p>
                  </div>
                </div>

                {/* Contact Form */}
                <ContactForm />
              </div>

              {/* Contact Info Cards Grid */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 animate-slide-in-left" style={{ animationDelay: '0.2s' }}>
                {/* Address Card */}
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(OFFICE_ADDRESS)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-start gap-5 rounded-2xl border-2 border-orange-100/80 bg-white/90 backdrop-blur-sm p-6 shadow-lg transition-all duration-300 hover:border-orange-300 hover:shadow-2xl hover:shadow-orange-500/15 hover:-translate-y-1 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-100 to-orange-200 text-orange-600 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:from-orange-500 group-hover:to-amber-500 group-hover:text-white shadow-md relative z-10">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div className="relative z-10">
                    <h3 className="font-headline text-lg font-bold text-gray-900 mb-1">Visit Our Office</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      BL-E, 1st Floor, FL-1A, 1997 Rajdanga Main Road, E.K.T, Kolkata, WB - 700107
                    </p>
                    <span className="inline-flex items-center gap-1 mt-3 text-xs font-semibold text-orange-600 group-hover:gap-2 transition-all">
                      Get directions
                      <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </a>

                {/* Email Card */}
                <a
                  href="mailto:info@raquadrantenergy.com"
                  className="group relative flex items-start gap-5 rounded-2xl border-2 border-amber-100/80 bg-white/90 backdrop-blur-sm p-6 shadow-lg transition-all duration-300 hover:border-amber-300 hover:shadow-2xl hover:shadow-amber-500/15 hover:-translate-y-1 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-100 to-amber-200 text-amber-600 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:from-amber-500 group-hover:to-yellow-500 group-hover:text-white shadow-md relative z-10">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div className="relative z-10">
                    <h3 className="font-headline text-lg font-bold text-gray-900 mb-1">Email Us</h3>
                    <p className="text-sm text-gray-600 break-all">info@raquadrantenergy.com</p>
                    <span className="inline-flex items-center gap-1 mt-3 text-xs font-semibold text-amber-600 group-hover:gap-2 transition-all">
                      Send email
                      <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </a>

                {/* Phone Card */}
                <a
                  href="tel:+918910855185"
                  className="group relative flex items-start gap-5 rounded-2xl border-2 border-yellow-100/80 bg-white/90 backdrop-blur-sm p-6 shadow-lg transition-all duration-300 hover:border-yellow-300 hover:shadow-2xl hover:shadow-yellow-500/15 hover:-translate-y-1 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-100 to-yellow-200 text-yellow-600 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:from-yellow-500 group-hover:to-amber-500 group-hover:text-white shadow-md relative z-10">
                    <Phone className="h-6 w-6 group-hover:animate-ring" />
                  </div>
                  <div className="relative z-10">
                    <h3 className="font-headline text-lg font-bold text-gray-900 mb-1">Call Us</h3>
                    <p className="text-sm text-gray-600 font-semibold">+91-8910855185</p>
                    <p className="text-sm text-gray-600 font-semibold">+91-8017337117</p>
                    <span className="inline-flex items-center gap-1 mt-3 text-xs font-semibold text-yellow-600 group-hover:gap-2 transition-all">
                      Call now
                      <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </a>

                {/* Website Card */}
                <div className="group relative flex items-start gap-5 rounded-2xl border-2 border-orange-100/80 bg-white/90 backdrop-blur-sm p-6 shadow-lg transition-all duration-300 hover:border-orange-300 hover:shadow-2xl hover:shadow-orange-500/15 hover:-translate-y-1 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-100 to-orange-200 text-orange-600 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:from-orange-500 group-hover:to-amber-500 group-hover:text-white shadow-md relative z-10">
                    <Globe className="h-6 w-6 group-hover:animate-spin-slow" />
                  </div>
                  <div className="relative z-10">
                    <h3 className="font-headline text-lg font-bold text-gray-900 mb-1">Visit Online</h3>
                    <a 
                      href="https://www.raquadrantenergy.com" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="block text-sm text-gray-600 hover:text-orange-600 transition-colors font-medium"
                    >
                      raquadrantenergy.com
                    </a>
                    <a 
                      href="https://www.Sun2Solar.in" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="block text-sm text-gray-600 hover:text-orange-600 transition-colors font-medium"
                    >
                      Sun2Solar.in
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Map */}
            <div className="lg:col-span-2 animate-slide-in-right">
              <div className="sticky top-24 rounded-3xl overflow-hidden border-2 border-orange-200/60 bg-white/90 backdrop-blur-sm shadow-2xl shadow-orange-500/10 transition-all duration-500 hover:shadow-3xl hover:shadow-orange-500/20 hover:border-orange-300/80">
                {/* Map Header */}
                <div className="border-b-2 border-orange-100 bg-gradient-to-r from-orange-50 via-amber-50 to-yellow-50 px-6 py-5">
                  <h3 className="font-headline text-xl font-bold text-gray-900 flex items-center gap-3 mb-1">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-md">
                      <MapPin className="h-5 w-5" />
                    </div>
                    Our Location
                  </h3>
                  <p className="text-sm text-gray-600 ml-13 font-medium">Kolkata Office — Rajdanga</p>
                </div>

                {/* Map Container */}
                <div className="relative aspect-[4/5] min-h-[400px] sm:aspect-square">
                  <iframe
                    src={MAP_EMBED_URL}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="RaQuadrant Energy - Kolkata Office Location"
                    className="absolute inset-0"
                  />
                  
                  {/* Map Overlay Info Card */}
                  <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/98 backdrop-blur-md px-5 py-4 shadow-2xl border-2 border-orange-200/50 animate-fade-in-up">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-md">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <p className="font-headline text-sm font-bold text-gray-900">RaQuadrant Energy Solutions</p>
                        <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                          1997 Rajdanga Main Road, E.K.T, Kolkata - 700107
                        </p>
                        <a
                          href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(OFFICE_ADDRESS)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center gap-1.5 mt-3 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 px-4 py-2 text-xs font-bold text-white shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105"
                        >
                          <MapPin className="h-3.5 w-3.5" />
                          Get Directions
                          <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Add Custom Animations CSS */}
      <style jsx>{`
        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes float-delayed {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-30px);
          }
        }

        @keyframes ring {
          0%, 100% {
            transform: rotate(0deg);
          }
          10%, 30% {
            transform: rotate(-10deg);
          }
          20%, 40% {
            transform: rotate(10deg);
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-fade-in-down {
          animation: fade-in-down 0.6s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-slide-in-left {
          animation: slide-in-left 0.7s ease-out;
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.7s ease-out;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        .animate-shimmer {
          background-size: 2000px 100%;
          animation: shimmer 3s linear infinite;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }

        .animate-ring {
          animation: ring 0.5s ease-in-out;
        }

        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </div>
  );
}