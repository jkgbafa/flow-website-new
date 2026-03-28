"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";

export default function Hero() {
  const [progress, setProgress] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const h = sectionRef.current.offsetHeight - window.innerHeight;
      if (h <= 0) return;
      const p = Math.max(0, Math.min(1, -rect.top / h));
      setProgress(p);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const clipSize = 5 + progress * 70;
  const textOpacity = Math.max(0, 1 - progress * 2.5);
  const overlayOpacity = 0.15 + progress * 0.35;

  return (
    <section ref={sectionRef} style={{ height: "180vh" }}>
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-white">
        {/* Photo circle mask reveal */}
        <div
          className="absolute inset-0 z-0"
          style={{ clipPath: `circle(${clipSize}% at 50% 50%)` }}
        >
          <Image
            src="/images/flow/podium-prayer.jpg"
            alt="FLOW Prayer Meeting"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div
            className="absolute inset-0"
            style={{ background: `rgba(0,0,0,${overlayOpacity})` }}
          />
        </div>

        {/* Hero text — centered, fades as photo reveals */}
        <div
          className="relative z-10 text-center px-8 w-full max-w-5xl mx-auto"
          style={{ opacity: textOpacity }}
        >
          {/* flow. wordmark */}
          <p
            className="text-2xl md:text-3xl font-bold tracking-[-0.02em] mb-10"
            style={{ fontFamily: "var(--font-body)" }}
          >
            flow<span className="text-gold">.</span>
          </p>

          {/* Subtitle */}
          <p className="text-[11px] md:text-[12px] font-medium uppercase tracking-[0.4em] text-gray-400 mb-8">
            Online Prophetic Prayers
          </p>

          {/* Main heading — Instrument Serif italic */}
          <h1
            className="text-[clamp(3rem,9vw,7.5rem)] leading-[0.92] tracking-[-0.02em]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <span className="italic">There&apos;s</span>
            <br />
            <span className="italic gold-text">Power</span>
            <br />
            <span className="italic">Here</span>
          </h1>

          {/* Tagline */}
          <p className="text-gray-400 text-base md:text-lg mt-8 max-w-sm mx-auto leading-relaxed">
            Join millions of believers worldwide in prophetic prayer
          </p>

          {/* Schedule pill */}
          <div className="mt-8 inline-flex items-center gap-3 border border-gray-200 rounded-full px-5 py-2.5">
            <div className="w-2 h-2 rounded-full bg-gold live-pulse" />
            <span className="text-[12px] font-medium text-gray-500 tracking-wide">
              Tuesdays &amp; Fridays · 4:30 AM GMT
            </span>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
          style={{ opacity: Math.max(0, 1 - progress * 6) }}
        >
          <span className="text-[10px] uppercase tracking-[0.25em] text-gray-300 font-medium">
            Scroll
          </span>
          <div className="w-[18px] h-7 border border-gray-300 rounded-full flex justify-center pt-1">
            <div className="w-[3px] h-[6px] bg-gray-300 rounded-full scroll-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
