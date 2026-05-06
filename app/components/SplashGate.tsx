"use client";

import { useEffect, useMemo, useState } from "react";

type SplashGateProps = {
  children: React.ReactNode;
  /** ms to keep splash visible (first visit per tab) */
  minimumDurationMs?: number;
  /** sessionStorage key */
  storageKey?: string;
};

export default function SplashGate({
  children,
  minimumDurationMs = 900,
  storageKey = "huzly:splash:shown",
}: SplashGateProps) {
  const canUseSessionStorage = useMemo(() => {
    try {
      return typeof window !== "undefined" && !!window.sessionStorage;
    } catch {
      return false;
    }
  }, []);

  const [showSplash, setShowSplash] = useState<boolean>(() => {
    if (!canUseSessionStorage) return true;
    return sessionStorage.getItem(storageKey) !== "1";
  });

  useEffect(() => {
    if (!showSplash) return;

    if (canUseSessionStorage) {
      try {
        sessionStorage.setItem(storageKey, "1");
      } catch {
        // ignore
      }
    }

    const t = window.setTimeout(() => setShowSplash(false), minimumDurationMs);
    return () => window.clearTimeout(t);
  }, [showSplash, minimumDurationMs, storageKey, canUseSessionStorage]);

  return (
    <>
      <div
        aria-hidden={!showSplash}
        className={[
          "fixed inset-0 z-50 grid place-items-center bg-white",
          "transition-opacity duration-300",
          showSplash ? "opacity-100" : "pointer-events-none opacity-0",
        ].join(" ")}
      >
        <div className="flex flex-col items-center gap-6">
          <div className="text-5xl font-semibold tracking-tight text-black">
            Huzly
          </div>
          <div className="h-5 w-5 rounded-full border-2 border-black/20 border-t-black motion-safe:animate-spin" />
        </div>
      </div>

      {children}
    </>
  );
}

