"use client";

import { useState } from "react";
import Image from "next/image";
import { LayoutPanelTop } from "lucide-react";

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
        @keyframes sp-fade-in { from { opacity: 0; } to { opacity: 1; } }

        @keyframes sp-logo-rise {
          from { opacity: 0; transform: scale(0.75) translateY(40px); filter: blur(6px); }
          to   { opacity: 1; transform: scale(1) translateY(0);      filter: blur(0);  }
        }

        @keyframes sp-text-up {
          from { opacity: 0; transform: translateY(18px); filter: blur(3px); }
          to   { opacity: 1; transform: translateY(0);    filter: blur(0);   }
        }

        @keyframes sp-glow-pulse {
          0%, 100% { opacity: 0.55; transform: scale(1);    }
          50%       { opacity: 0.85; transform: scale(1.07); }
        }

        @keyframes sp-ray-spin {
          from { transform: translate(-50%, -50%) rotate(0deg);   }
          to   { transform: translate(-50%, -50%) rotate(360deg); }
        }

        @keyframes sp-ring-expand {
          0%   { transform: scale(0.7); opacity: 0.8; }
          100% { transform: scale(2.2); opacity: 0;   }
        }

        @keyframes sp-bar-fill {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        @keyframes sp-bar-shine {
          0%   { background-position: -300% center; }
          100% { background-position:  300% center; }
        }

        @keyframes sp-dot {
          0%, 60%, 100% { opacity: 0.25; transform: translateY(0);   }
          30%            { opacity: 1;    transform: translateY(-4px); }
        }

        @keyframes sp-particle {
          0%, 100% { transform: translate(0,0) scale(1);     opacity: 0.25; }
          33%       { transform: translate(20px,-28px) scale(1.15); opacity: 0.55; }
          66%       { transform: translate(-18px,-18px) scale(0.9); opacity: 0.35; }
        }

        @keyframes sp-exit {
          to { opacity: 0; transform: scale(1.04); }
        }

        @keyframes sp-badge-in {
          from { opacity: 0; transform: translateY(-12px) scale(0.9); }
          to   { opacity: 1; transform: translateY(0)     scale(1);   }
        }

        @keyframes sp-line-grow {
          from { transform: scaleX(0); opacity: 0; }
          to   { transform: scaleX(1); opacity: 1; }
        }

        @keyframes sp-counter {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        .sp-logo-rise   { animation: sp-logo-rise 1s 0.15s cubic-bezier(0.22,1.2,0.5,1) both; }
        .sp-glow-pulse  { animation: sp-glow-pulse 3s ease-in-out infinite; }
        .sp-ray-spin    { animation: sp-ray-spin 18s linear infinite; }
        .sp-ring-expand { animation: sp-ring-expand 2.4s ease-out infinite; }
        .sp-bar-fill    { animation: sp-bar-fill ${DURATION_MS}ms cubic-bezier(0.65,0,0.35,1) both; transform-origin: left; }
        .sp-bar-shine   { animation: sp-bar-shine 1.8s linear infinite; background-size: 300% 100%; }
        .sp-particle    { animation: sp-particle 4.5s ease-in-out infinite; }
        .sp-exit        { animation: sp-exit 0.65s cubic-bezier(0.4,0,0.2,1) forwards; }
      `}</style>

      <div
        className={`fixed inset-0 z-[100] flex h-dvh max-h-dvh min-h-dvh w-full flex-col overflow-hidden ${isExiting ? "sp-exit" : ""}`}
        aria-hidden="true"
      >
        {/* ── BACKGROUND ── */}
        <div className="absolute inset-0 bg-[#0a0c10]" />
        {/* Deep colour wash */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_0%,rgba(234,88,12,0.18),transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_80%_100%,rgba(245,158,11,0.10),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_10%_90%,rgba(249,115,22,0.08),transparent_60%)]" />

        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `linear-gradient(rgba(251,146,60,0.6) 1px,transparent 1px),linear-gradient(90deg,rgba(251,146,60,0.6) 1px,transparent 1px)`,
          backgroundSize: "clamp(30px,6vw,54px) clamp(30px,6vw,54px)",
        }} />

        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent"
          style={{ animation: "sp-fade-in 1s 0.3s both" }} />

        {/* ── FLOATING PARTICLES ── */}
        {[
          { cls: "left-[7%] top-[20%]",  delay: "0s",    sz: "h-2 w-2",   color: "from-orange-500 to-amber-400" },
          { cls: "right-[9%] top-[30%]", delay: "0.6s",  sz: "h-3 w-3",   color: "from-amber-400 to-yellow-300" },
          { cls: "left-[20%] bottom-[25%]",delay:"1.1s", sz: "h-1.5 w-1.5",color:"from-orange-400 to-orange-300" },
          { cls: "right-[15%] bottom-[35%]",delay:"1.7s",sz: "h-2.5 w-2.5",color:"from-yellow-400 to-amber-400" },
          { cls: "left-[35%] top-[10%]", delay: "0.3s",  sz: "h-1.5 w-1.5",color:"from-orange-300 to-yellow-300" },
          { cls: "right-[30%] top-[65%]",delay: "2s",    sz: "h-2 w-2",   color: "from-amber-500 to-orange-400" },
        ].map((p, i) => (
          <div
            key={i}
            className={`sp-particle pointer-events-none absolute ${p.cls} hidden rounded-full bg-gradient-to-br ${p.color} shadow-lg min-[360px]:block ${p.sz}`}
            style={{ animationDelay: p.delay }}
          />
        ))}

        {/* ── MAIN CONTENT ── */}
        <div className="relative z-10 flex min-h-0 flex-1 flex-col items-center justify-center px-4 pb-2 pt-[max(1rem,env(safe-area-inset-top))]">
          <div className="flex w-full max-w-md flex-col items-center gap-8 sm:max-w-lg sm:gap-10 landscape:gap-3">

            {/* Logo zone */}
            <div className="relative flex items-center justify-center">
              {/* Spinning solar rays */}
              <div
                className="sp-ray-spin pointer-events-none absolute left-1/2 top-1/2"
                style={{ width: "clamp(280px,65vw,420px)", height: "clamp(280px,65vw,420px)" }}
              >
                {Array.from({ length: 12 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute left-1/2 top-1/2 origin-bottom"
                    style={{
                      width: "2px",
                      height: "clamp(52px,13vw,80px)",
                      marginLeft: "-1px",
                      transform: `rotate(${i * 30}deg) translateY(-100%)`,
                      background: `linear-gradient(to top, rgba(251,146,60,${i % 2 === 0 ? "0.55" : "0.25"}), transparent)`,
                      borderRadius: "2px",
                    }}
                  />
                ))}
              </div>

              {/* Pulse rings */}
              {[0, 0.8, 1.6].map((delay, i) => (
                <div
                  key={i}
                  className="sp-ring-expand pointer-events-none absolute rounded-full border border-orange-500/30"
                  style={{
                    width:  "clamp(155px,38vw,230px)",
                    height: "clamp(155px,38vw,230px)",
                    animationDelay: `${delay}s`,
                  }}
                />
              ))}

              {/* Glow orb */}
              <div
                className="sp-glow-pulse pointer-events-none absolute rounded-full"
                style={{
                  width:  "clamp(180px,42vw,260px)",
                  height: "clamp(180px,42vw,260px)",
                  background: "radial-gradient(circle, rgba(249,115,22,0.35) 0%, rgba(245,158,11,0.15) 50%, transparent 75%)",
                  filter: "blur(20px)",
                }}
              />

              {/* Logo card */}
              <div
                className="sp-logo-rise relative z-10 flex items-center justify-center rounded-[28px] border border-white/10 bg-white/[0.06] backdrop-blur-xl shadow-2xl"
                style={{
                  width:  "clamp(170px,42vw,250px)",
                  height: "clamp(170px,42vw,250px)",
                  boxShadow: "0 0 80px rgba(249,115,22,0.3), 0 24px 70px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.1)",
                }}
              >
                {/* Inner glow */}
                <div className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-orange-500/12 via-transparent to-amber-500/8" />

                {!logoError ? (
                  <Image
                    src="/quadrantlogo.png"
                    alt="RaQuadrant Energy"
                    width={280}
                    height={280}
                    className="relative z-10 h-auto w-[75%] object-contain drop-shadow-[0_0_20px_rgba(251,146,60,0.6)] landscape:w-[65%]"
                    priority
                    onError={() => setLogoError(true)}
                  />
                ) : (
                  <div className="relative z-10 flex h-[55%] w-[55%] items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500">
                    <LayoutPanelTop className="h-1/2 w-1/2 text-white" />
                  </div>
                )}
              </div>
            </div>

            {/* Text block */}
            <div className="flex flex-col items-center gap-3 text-center landscape:gap-1.5">
              {/* Badge */}
              <div
                className="mb-1 inline-flex items-center gap-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 landscape:hidden"
                style={{ animation: "sp-badge-in 0.7s 0.7s cubic-bezier(0.34,1.5,0.64,1) both" }}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-orange-400 shadow-[0_0_6px_rgba(251,146,60,0.8)]"
                  style={{ animation: "sp-glow-pulse 1.5s ease-in-out infinite" }} />
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-orange-300">
                  Solar EPC Solutions
                </span>
              </div>

              {/* Company name */}
              <h1
                className="font-headline font-black leading-none tracking-tight"
                style={{
                  animation: "sp-text-up 0.9s 0.45s cubic-bezier(0.34,1.4,0.64,1) both",
                  fontSize: "clamp(1.75rem,7.5vw,3.2rem)",
                  background: "linear-gradient(135deg, #fb923c 0%, #fbbf24 40%, #f97316 70%, #fcd34d 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  filter: "drop-shadow(0 0 30px rgba(251,146,60,0.5))",
                }}
              >
                RaQuadrant Energy
              </h1>

              {/* Divider line */}
              <div
                className="h-px w-44 rounded-full bg-gradient-to-r from-transparent via-orange-500/60 to-transparent sm:w-64"
                style={{ animation: "sp-line-grow 0.8s 0.85s cubic-bezier(0.65,0,0.35,1) both", transformOrigin: "center" }}
              />

              {/* Tagline */}
              <p
                className="font-body text-base font-medium text-gray-300/80 sm:text-lg landscape:text-xs"
                style={{ animation: "sp-text-up 0.8s 0.75s cubic-bezier(0.34,1.4,0.64,1) both" }}
              >
                Powering a Sustainable Tomorrow
              </p>

              {/* Loading dots */}
              <p
                className="mt-1 flex items-center gap-0.5 font-body text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-orange-400/70 sm:text-xs landscape:mt-0"
                style={{ animation: "sp-text-up 0.7s 0.95s both" }}
              >
                <span>Loading</span>
                <span className="ml-0.5 inline-flex gap-[3px]">
                  {[0, 0.2, 0.4].map((d, i) => (
                    <span key={i} style={{ animation: `sp-dot 1.5s ${d}s ease-in-out infinite` }}>.</span>
                  ))}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* ── PROGRESS BAR ── */}
        <div className="relative z-10 w-full shrink-0 px-6 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-3 sm:px-8 sm:pb-[max(1.5rem,env(safe-area-inset-bottom))] landscape:pb-[max(0.6rem,env(safe-area-inset-bottom))] landscape:pt-1.5">
          <div className="mx-auto w-full max-w-sm sm:max-w-md">
            {/* Track */}
            <div className="relative h-[5px] overflow-hidden rounded-full bg-white/[0.07] sm:h-[7px]">
              {/* Glow behind bar */}
              <div className="absolute inset-0 rounded-full blur-sm" style={{ background: "rgba(249,115,22,0.2)" }} />
              {/* Fill */}
              <div
                className="sp-bar-fill sp-bar-shine relative h-full rounded-full"
                style={{
                  background: "linear-gradient(90deg,#ea580c 0%,#f97316 25%,#fbbf24 55%,#f97316 80%,#ea580c 100%)",
                  boxShadow: "0 0 12px rgba(249,115,22,0.7), 0 0 4px rgba(251,191,36,0.5)",
                }}
                onAnimationEnd={() => onComplete()}
              />
            </div>

            {/* Subtext */}
            <p
              className="mt-2.5 text-center font-body text-[0.6rem] font-medium tracking-wide text-gray-500 sm:text-[0.65rem] landscape:mt-1"
              style={{ animation: "sp-fade-in 1s 1.2s both" }}
            >
              Initializing sustainable energy solutions...
            </p>
          </div>
        </div>

        {/* Bottom accent */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-orange-600/60 to-transparent" />
      </div>
    </>
  );
}
