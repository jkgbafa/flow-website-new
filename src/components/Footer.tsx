"use client";

import { useRef, useEffect, useState } from "react";

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

export default function Footer() {
  const { ref: ctaRef, visible: ctaVisible } = useInView();
  const { ref: bottomRef, visible: bottomVisible } = useInView();

  return (
    <footer className="bg-black text-white">
      {/* Big CTA */}
      <div ref={ctaRef} className="py-32 md:py-44 text-center relative overflow-hidden">
        {/* Radial glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)",
            }}
          />
        </div>

        <div
          className={`reveal ${ctaVisible ? "visible" : ""} max-w-3xl mx-auto px-8 md:px-12 relative z-10`}
        >
          {/* flow. wordmark */}
          <p
            className="text-2xl font-bold tracking-[-0.02em] mb-8 text-white/40"
            style={{ fontFamily: "var(--font-body)" }}
          >
            flow<span className="text-gold">.</span>
          </p>

          <h2
            className="text-4xl md:text-6xl tracking-[-0.02em] mb-6 text-white"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <span className="italic">There&apos;s Power In </span>
            <span className="italic gold-text">Prayer</span>
          </h2>

          <p className="text-white/40 text-lg mb-10 max-w-md mx-auto leading-relaxed">
            Join believers from around the world. Experience the move of God in
            your life through prophetic prayer.
          </p>

          <a
            href="https://www.youtube.com/@TheresPowerHere"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gold text-black text-[12px] font-bold uppercase tracking-[0.1em] px-9 py-4 rounded-full hover:bg-gold-light transition-colors duration-300"
          >
            Join FLOW Prayer
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.06]">
        <div
          ref={bottomRef}
          className="max-w-6xl mx-auto px-8 md:px-12 py-8 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          {/* Schedule */}
          <div
            className={`reveal ${bottomVisible ? "visible" : ""} flex items-center gap-3`}
          >
            <div className="w-2 h-2 rounded-full bg-gold live-pulse" />
            <span className="text-white/30 text-[13px] tracking-wide">
              Tuesdays &amp; Fridays · 4:30 AM GMT
            </span>
          </div>

          {/* Copyright */}
          <div className={`reveal ${bottomVisible ? "visible" : ""} delay-1`}>
            <p className="text-white/20 text-[13px]">
              &copy; {new Date().getFullYear()} FLOW — There&apos;s Power Here
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
