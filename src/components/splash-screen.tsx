"use client";

import { useState } from "react";
import Image from "next/image";
import { LayoutPanelTop, Zap } from "lucide-react";

const DURATION_MS = 3000;

export default function SplashScreen({
  onComplete,
  isExiting,
}: {
  onComplete: () => void;
  isExiting: boolean;
}) {
  const [logoError, setLogoError] = useState(false);

  return (
    <>
      <style>{`
        @keyframes splash-logo-in {
          from { opacity: 0; transform: scale(0.8) translateY(30px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes splash-ring-pulse {
          0%, 100% { 
            transform: scale(1); 
            box-shadow: 0 0 0 0 rgba(251,146,60,0.4),
                        0 0 60px rgba(251,146,60,0.2),
                        inset 0 0 40px rgba(251,146,60,0.1);
          }
          50% { 
            transform: scale(1.03); 
            box-shadow: 0 0 0 20px rgba(251,146,60,0),
                        0 0 80px rgba(251,146,60,0.3),
                        inset 0 0 60px rgba(251,146,60,0.15);
          }
        }
        @keyframes splash-text-in {
          from { opacity: 0; transform: translateY(15px); filter: blur(4px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        @keyframes splash-dots {
          0%, 20% { opacity: 0.3; transform: translateY(0); }
          40% { opacity: 1; transform: translateY(-3px); }
          60%, 100% { opacity: 0.3; transform: translateY(0); }
        }
        @keyframes splash-bar-fill {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        @keyframes splash-bar-shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes splash-fade-out {
          to { opacity: 0; transform: scale(1.05); }
        }
        @keyframes splash-particle-float {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
          25% { transform: translate(30px, -30px) scale(1.2); opacity: 0.6; }
          50% { transform: translate(-20px, -60px) scale(0.9); opacity: 0.4; }
          75% { transform: translate(40px, -40px) scale(1.1); opacity: 0.5; }
        }
        @keyframes splash-glow-rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes splash-energy-pulse {
          0%, 100% { opacity: 0.5; transform: scale(0.95); }
          50% { opacity: 1; transform: scale(1.05); }
        }
        
        .splash-logo-in { animation: splash-logo-in 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        .splash-ring-pulse { animation: splash-ring-pulse 2.5s ease-in-out infinite; }
        .splash-bar-fill { 
          animation: splash-bar-fill ${DURATION_MS}ms cubic-bezier(0.65, 0, 0.35, 1) forwards; 
          transform-origin: left; 
        }
        .splash-bar-shimmer {
          animation: splash-bar-shimmer 2s linear infinite;
          background-size: 200% 100%;
        }
        .splash-fade-out { animation: splash-fade-out 0.7s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
        .splash-particle { animation: splash-particle-float 4s ease-in-out infinite; }
        .splash-glow-rotate { animation: splash-glow-rotate 20s linear infinite; }
      `}</style>

      <div
        className={`fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden ${
          isExiting ? "splash-fade-out" : ""
        }`}
        aria-hidden="true"
      >
        {/* Premium gradient background - White to Light Orange */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-orange-50 to-yellow-50" />
        
        {/* Radial glow effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(251,146,60,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(251,191,36,0.12),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(253,186,116,0.1),transparent_50%)]" />

        {/* Rotating glow backdrop */}
        <div className="splash-glow-rotate absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 opacity-30">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-200 via-yellow-200 to-orange-200 blur-3xl" />
        </div>

        {/* Elegant geometric pattern */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(251,146,60,0.3) 1.5px, transparent 1.5px),
              linear-gradient(90deg, rgba(251,146,60,0.3) 1.5px, transparent 1.5px)
            `,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Floating energy particles */}
        <div className="splash-particle absolute left-[12%] top-[20%] h-3 w-3 rounded-full bg-gradient-to-br from-orange-400 to-yellow-400 shadow-lg shadow-orange-300" style={{ animationDelay: '0s' }} />
        <div className="splash-particle absolute right-[18%] top-[35%] h-4 w-4 rounded-full bg-gradient-to-br from-yellow-400 to-orange-300 shadow-lg shadow-yellow-300" style={{ animationDelay: '0.5s' }} />
        <div className="splash-particle absolute left-[25%] bottom-[25%] h-2.5 w-2.5 rounded-full bg-gradient-to-br from-orange-300 to-amber-400 shadow-lg shadow-orange-200" style={{ animationDelay: '1s' }} />
        <div className="splash-particle absolute right-[22%] bottom-[40%] h-3.5 w-3.5 rounded-full bg-gradient-to-br from-amber-400 to-orange-400 shadow-lg shadow-amber-300" style={{ animationDelay: '1.5s' }} />
        <div className="splash-particle absolute left-[35%] top-[15%] h-2 w-2 rounded-full bg-gradient-to-br from-yellow-300 to-orange-300 shadow-lg shadow-yellow-200" style={{ animationDelay: '0.8s' }} />
        <div className="splash-particle absolute right-[30%] top-[65%] h-3 w-3 rounded-full bg-gradient-to-br from-orange-400 to-yellow-300 shadow-lg shadow-orange-200" style={{ animationDelay: '2s' }} />

        {/* Top elegant accent */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-orange-400 to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-300 to-transparent opacity-60" />

        {/* Main content container */}
        <div className="relative flex flex-col items-center gap-10">
          {/* Logo card with premium ring effect */}
          <div className="splash-ring-pulse relative rounded-[2rem] border-2 border-orange-300/40 bg-white/90 p-8 shadow-2xl shadow-orange-200/50 backdrop-blur-xl sm:p-10">
            {/* Inner glow */}
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-orange-100/50 via-yellow-50/30 to-orange-100/50" />
            
            <div className="splash-logo-in relative flex flex-col items-center">
              {!logoError ? (
                <div className="relative">
                  {/* Logo glow effect */}
                  <div className="absolute inset-0 blur-2xl bg-gradient-to-br from-orange-300 to-yellow-300 opacity-40 scale-110" />
                  <Image
                    src="/quadrantlogo.png"
                    alt="RaQuadrant Energy"
                    width={320}
                    height={320}
                    className="relative z-10 h-44 w-auto object-contain drop-shadow-2xl sm:h-52 md:h-60"
                    priority
                    onError={() => setLogoError(true)}
                  />
                </div>
              ) : (
                <div className="relative flex h-44 w-44 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-400 via-amber-400 to-yellow-400 shadow-2xl shadow-orange-400/60 sm:h-52 sm:w-52 md:h-60 md:w-60">
                  <div className="absolute inset-0 rounded-2xl bg-white/10" />
                  <LayoutPanelTop className="relative z-10 h-24 w-24 text-white drop-shadow-lg sm:h-28 sm:w-28 md:h-32 md:w-32" />
                </div>
              )}
            </div>
          </div>

          {/* Text content with enhanced styling */}
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="flex items-center gap-3">
              <Zap className="h-8 w-8 text-orange-500 drop-shadow-lg" style={{
                animation: "splash-energy-pulse 2s ease-in-out infinite",
              }} />
              <h1
                className="font-headline text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
                style={{
                  animation: "splash-text-in 1s 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
                  opacity: 0,
                  background: "linear-gradient(135deg, #ea580c 0%, #f97316 30%, #fb923c 60%, #fbbf24 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  filter: "drop-shadow(0 2px 8px rgba(251,146,60,0.3))",
                }}
              >
                RaQuadrant Energy
              </h1>
              <Zap className="h-8 w-8 text-orange-500 drop-shadow-lg" style={{
                animation: "splash-energy-pulse 2s ease-in-out infinite 0.3s",
              }} />
            </div>
            
            <p
              className="font-body text-base font-medium text-orange-700 sm:text-lg"
              style={{
                animation: "splash-text-in 1s 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
                opacity: 0,
                textShadow: "0 1px 2px rgba(251,146,60,0.1)",
              }}
            >
              Powering a sustainable tomorrow
            </p>
            
            <p
              className="mt-3 flex items-center justify-center gap-1 font-body text-sm font-semibold uppercase tracking-[0.2em] text-orange-500"
              style={{
                animation: "splash-text-in 1s 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
                opacity: 0,
              }}
            >
              Loading
              <span className="inline-flex gap-0.5">
                <span style={{ animation: "splash-dots 1.5s ease-in-out infinite" }}>.</span>
                <span style={{ animation: "splash-dots 1.5s ease-in-out 0.2s infinite" }}>.</span>
                <span style={{ animation: "splash-dots 1.5s ease-in-out 0.4s infinite" }}>.</span>
              </span>
            </p>
          </div>
        </div>

        {/* Premium progress bar */}
        <div className="absolute bottom-16 left-1/2 w-80 -translate-x-1/2 sm:bottom-24 sm:w-[28rem]">
          <div className="relative">
            {/* Progress bar glow */}
            <div className="absolute inset-0 rounded-full bg-orange-300 opacity-40 blur-md" />
            
            <div className="relative h-2 overflow-hidden rounded-full border border-orange-200 bg-gradient-to-r from-orange-50 to-yellow-50 shadow-inner">
              <div
                className="splash-bar-fill splash-bar-shimmer h-full rounded-full shadow-lg"
                style={{
                  background: "linear-gradient(90deg, #f97316 0%, #fb923c 25%, #fbbf24 50%, #fb923c 75%, #f97316 100%)",
                  boxShadow: "0 0 20px rgba(251,146,60,0.5), inset 0 1px 2px rgba(255,255,255,0.3)",
                }}
                onAnimationEnd={() => onComplete()}
              />
            </div>
          </div>
          
          {/* Progress percentage text */}
          <p className="mt-3 text-center text-xs font-medium text-orange-600/80">
            Initializing sustainable energy solutions...
          </p>
        </div>

        {/* Bottom elegant accent */}
        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-orange-400 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-300 to-transparent opacity-60" />
      </div>
    </>
  );
}