"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Hero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/flow/podium-prayer.jpg"
          alt=""
          fill
          className="object-cover opacity-40"
          priority
        />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/80" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(226,35,26,0.15)_0%,transparent_70%)]" />
      <div className="absolute inset-0 dot-texture" />

      {/* Floating blobs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-red-800/20 rounded-full blur-3xl animate-float-slow" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div
          className={`transition-all duration-1000 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <Image
            src="/images/flow/flow-logo-white.png"
            alt="FLOW"
            width={120}
            height={48}
            className="object-contain mx-auto mb-8"
          />

          <h1 className="text-6xl md:text-8xl font-bold text-white tracking-tight">
            There&apos;s Power Here
          </h1>

          {/* Gradient divider */}
          <div className="mx-auto mt-6 mb-6 h-1 w-48 md:w-64 bg-gradient-to-r from-accent via-accent-light to-accent rounded-full animate-drift" />

          <p className="text-xl md:text-2xl text-white/70 font-medium max-w-2xl mx-auto">
            Online Prophetic Prayer Meetings
          </p>
        </div>

        {/* CTAs */}
        <div
          className={`mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-1000 delay-300 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <a
            href="https://www.youtube.com/@TheresPowerHere"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative px-8 py-4 rounded-xl overflow-hidden"
          >
            <div className="absolute inset-0 glass-strong" />
            <div className="absolute inset-0 bg-gradient-to-r from-accent to-accent-light opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative text-[14px] font-semibold text-white tracking-wide">
              JOIN PRAYER MEETING
            </span>
          </a>

          <a
            href="#connect"
            className="px-8 py-4 rounded-xl border border-white/20 text-[14px] font-semibold text-white/80 hover:text-white hover:border-white/40 transition-all tracking-wide"
          >
            WATCH ONLINE
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[11px] text-white/30 tracking-[0.1em] uppercase">Scroll Down</span>
        <svg className="w-4 h-4 text-white/30 scroll-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7" />
        </svg>
      </div>
    </section>
  );
}
