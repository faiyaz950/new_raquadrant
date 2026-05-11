"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import SplashScreen from "./splash-screen";

const SPLASH_DURATION_MS = 3000; // Splash sirf 3 second tak dikhega
const FADE_OUT_MS = 500;

export default function SplashWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showSplash, setShowSplash] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const completedRef = useRef(false);

  const handleSplashComplete = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    setIsExiting(true);
    setTimeout(() => {
      setShowSplash(false);
    }, FADE_OUT_MS);
  }, []);

  // 3 second ke baad splash hata do (guaranteed)
  useEffect(() => {
    if (!showSplash) return;
    const timer = setTimeout(handleSplashComplete, SPLASH_DURATION_MS);
    return () => clearTimeout(timer);
  }, [showSplash, handleSplashComplete]);

  useEffect(() => {
    if (showSplash) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showSplash]);

  return (
    <>
      {showSplash && (
        <SplashScreen
          onComplete={handleSplashComplete}
          isExiting={isExiting}
        />
      )}
      {children}
    </>
  );
}
