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

        @media (max-width: 640px) {
          .splash-particle {
            animation-duration: 5s;
          }
          @keyframes splash-particle-float {
            0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.25; }
            50% { transform: translate(12px, -18px) scale(1.05); opacity: 0.45; }
          }
        }

        @media (max-height: 520px) and (orientation: landscape) {
          .splash-logo-in { animation-duration: 0.9s; }
          .splash-ring-pulse { animation-duration: 3s; }
        }
      `}</style>

      <div
        className={`fixed inset-0 z-[100] flex h-dvh max-h-dvh min-h-dvh w-full flex-col overflow-hidden ${
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

        {/* Rotating glow backdrop — scales with viewport */}
        <div
          className="splash-glow-rotate pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[min(92vw,92vh,36rem)] -translate-x-1/2 -translate-y-1/2 opacity-20 sm:opacity-30"
          style={{ animation: "splash-glow-rotate 20s linear infinite" }}
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-200 via-yellow-200 to-orange-200 blur-3xl" />
        </div>

        {/* Elegant geometric pattern */}
        <div
          className="absolute inset-0 opacity-[0.06] sm:opacity-[0.08]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(251,146,60,0.3) 1.5px, transparent 1.5px),
              linear-gradient(90deg, rgba(251,146,60,0.3) 1.5px, transparent 1.5px)
            `,
            backgroundSize: "clamp(32px, 8vw, 60px) clamp(32px, 8vw, 60px)",
          }}
        />

        {/* Floating energy particles — hidden on very small / landscape to reduce clutter */}
        <div className="splash-particle pointer-events-none absolute left-[8%] top-[18%] hidden h-2 w-2 rounded-full bg-gradient-to-br from-orange-400 to-yellow-400 shadow-lg shadow-orange-300 min-[360px]:block sm:h-3 sm:w-3" style={{ animationDelay: "0s" }} />
        <div className="splash-particle pointer-events-none absolute right-[10%] top-[32%] hidden h-2.5 w-2.5 rounded-full bg-gradient-to-br from-yellow-400 to-orange-300 shadow-lg shadow-yellow-300 min-[360px]:block sm:h-4 sm:w-4" style={{ animationDelay: "0.5s" }} />
        <div className="splash-particle pointer-events-none absolute left-[18%] bottom-[22%] hidden h-2 w-2 rounded-full bg-gradient-to-br from-orange-300 to-amber-400 shadow-lg shadow-orange-200 min-[400px]:block sm:h-2.5 sm:w-2.5" style={{ animationDelay: "1s" }} />
        <div className="splash-particle pointer-events-none absolute right-[14%] bottom-[38%] hidden h-2.5 w-2.5 rounded-full bg-gradient-to-br from-amber-400 to-orange-400 shadow-lg shadow-amber-300 min-[400px]:block sm:h-3.5 sm:w-3.5" style={{ animationDelay: "1.5s" }} />
        <div className="splash-particle pointer-events-none absolute left-[28%] top-[12%] hidden h-1.5 w-1.5 rounded-full bg-gradient-to-br from-yellow-300 to-orange-300 shadow-lg shadow-yellow-200 md:block sm:h-2 sm:w-2" style={{ animationDelay: "0.8s" }} />
        <div className="splash-particle pointer-events-none absolute right-[24%] top-[62%] hidden h-2 w-2 rounded-full bg-gradient-to-br from-orange-400 to-yellow-300 shadow-lg shadow-orange-200 md:block sm:h-3 sm:w-3" style={{ animationDelay: "2s" }} />

        {/* Top elegant accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange-400 to-transparent sm:h-1.5" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-300 to-transparent opacity-60" />

        {/* Main content — flex-1 keeps progress bar from overlapping on short screens */}
        <div className="relative z-10 flex min-h-0 flex-1 flex-col items-center justify-center px-4 pt-[max(0.75rem,env(safe-area-inset-top))] pb-2 sm:px-6 md:px-8">
          <div className="flex w-full max-w-lg flex-col items-center gap-5 min-[380px]:gap-6 sm:gap-8 md:gap-10 landscape:max-h-[70dvh] landscape:gap-3 landscape:sm:gap-4">
            {/* Logo card with premium ring effect */}
            <div className="splash-ring-pulse relative w-full max-w-[min(100%,20rem)] rounded-2xl border-2 border-orange-300/40 bg-white/90 p-4 shadow-2xl shadow-orange-200/50 backdrop-blur-xl min-[380px]:max-w-xs min-[380px]:p-5 sm:max-w-sm sm:rounded-3xl sm:p-7 md:max-w-md md:p-9 landscape:max-w-[11rem] landscape:p-3 landscape:sm:max-w-[12rem] landscape:sm:p-4">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-100/50 via-yellow-50/30 to-orange-100/50 sm:rounded-3xl" />

              <div className="splash-logo-in relative flex flex-col items-center">
                {!logoError ? (
                  <div className="relative w-full">
                    <div className="absolute inset-0 scale-110 bg-gradient-to-br from-orange-300 to-yellow-300 opacity-40 blur-2xl" />
                    <Image
                      src="/quadrantlogo.png"
                      alt="RaQuadrant Energy"
                      width={320}
                      height={320}
                      className="relative z-10 mx-auto h-auto w-full max-h-[7.5rem] object-contain drop-shadow-2xl min-[380px]:max-h-[8.5rem] sm:max-h-[10.5rem] md:max-h-[12rem] lg:max-h-[13rem] landscape:max-h-[4.5rem] landscape:sm:max-h-[5.5rem]"
                      sizes="(max-width: 380px) 240px, (max-width: 640px) 280px, (max-width: 1024px) 320px, 400px"
                      priority
                      onError={() => setLogoError(true)}
                    />
                  </div>
                ) : (
                  <div className="relative mx-auto flex aspect-square w-[min(70vw,11rem)] max-w-full items-center justify-center rounded-2xl bg-gradient-to-br from-orange-400 via-amber-400 to-yellow-400 shadow-2xl shadow-orange-400/60 min-[380px]:w-44 sm:w-52 md:w-60 landscape:w-28 landscape:sm:w-32">
                    <div className="absolute inset-0 rounded-2xl bg-white/10" />
                    <LayoutPanelTop className="relative z-10 h-[clamp(3.5rem,18vw,6rem)] w-[clamp(3.5rem,18vw,6rem)] text-white drop-shadow-lg sm:h-24 sm:w-24 md:h-28 md:w-28 landscape:h-12 landscape:w-12" />
                  </div>
                )}
              </div>
            </div>

            {/* Text content */}
            <div className="flex w-full flex-col items-center gap-2 text-center min-[380px]:gap-2.5 sm:gap-3 landscape:gap-1.5">
              <div className="flex max-w-full flex-wrap items-center justify-center gap-2 px-1 min-[380px]:gap-2.5 sm:gap-3">
                <Zap
                  className="hidden h-5 w-5 shrink-0 text-orange-500 drop-shadow-lg min-[360px]:block sm:h-6 sm:w-6 md:h-8 md:w-8 landscape:h-4 landscape:w-4"
                  style={{ animation: "splash-energy-pulse 2s ease-in-out infinite" }}
                />
                <h1
                  className="font-headline text-[clamp(1.35rem,5.5vw,3rem)] font-bold leading-tight tracking-tight"
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
                <Zap
                  className="hidden h-5 w-5 shrink-0 text-orange-500 drop-shadow-lg min-[360px]:block sm:h-6 sm:w-6 md:h-8 md:w-8 landscape:h-4 landscape:w-4"
                  style={{ animation: "splash-energy-pulse 2s ease-in-out infinite 0.3s" }}
                />
              </div>

              <p
                className="max-w-[18rem] px-2 font-body text-sm font-medium text-orange-700 min-[380px]:max-w-xs min-[380px]:text-base sm:max-w-md sm:text-lg landscape:text-xs landscape:sm:text-sm"
                style={{
                  animation: "splash-text-in 1s 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
                  opacity: 0,
                  textShadow: "0 1px 2px rgba(251,146,60,0.1)",
                }}
              >
                Powering a sustainable tomorrow
              </p>

              <p
                className="mt-1 flex items-center justify-center gap-1 font-body text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-orange-500 min-[380px]:mt-2 min-[380px]:text-xs min-[380px]:tracking-[0.18em] sm:mt-3 sm:text-sm sm:tracking-[0.2em] landscape:mt-0 landscape:text-[0.6rem]"
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
        </div>

        {/* Progress bar — pinned to bottom with safe area */}
        <div className="relative z-10 w-full shrink-0 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-2 sm:px-6 sm:pb-[max(1.25rem,env(safe-area-inset-bottom))] md:px-8 landscape:pb-[max(0.5rem,env(safe-area-inset-bottom))] landscape:pt-1">
          <div className="mx-auto w-full max-w-xs min-[380px]:max-w-sm sm:max-w-md md:max-w-lg">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-orange-300 opacity-40 blur-md" />

              <div className="relative h-1.5 overflow-hidden rounded-full border border-orange-200 bg-gradient-to-r from-orange-50 to-yellow-50 shadow-inner sm:h-2">
                <div
                  className="splash-bar-fill splash-bar-shimmer h-full rounded-full shadow-lg"
                  style={{
                    background:
                      "linear-gradient(90deg, #f97316 0%, #fb923c 25%, #fbbf24 50%, #fb923c 75%, #f97316 100%)",
                    boxShadow:
                      "0 0 20px rgba(251,146,60,0.5), inset 0 1px 2px rgba(255,255,255,0.3)",
                  }}
                  onAnimationEnd={() => onComplete()}
                />
              </div>
            </div>

            <p className="mt-2 text-center text-[0.65rem] font-medium leading-snug text-orange-600/80 min-[380px]:mt-2.5 min-[380px]:text-xs sm:mt-3 sm:text-xs landscape:mt-1.5 landscape:text-[0.6rem]">
              Initializing sustainable energy solutions...
            </p>
          </div>
        </div>

        {/* Bottom elegant accent */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange-400 to-transparent sm:h-1.5" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-300 to-transparent opacity-60" />
      </div>
    </>
  );
}
