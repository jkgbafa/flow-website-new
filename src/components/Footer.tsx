"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";

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

const socials = [
  {
    platform: "YouTube",
    url: "https://www.youtube.com/@TheresPowerHere",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
    hoverColor: "hover:text-red-500 hover:border-red-500/30",
  },
  {
    platform: "Facebook",
    url: "https://www.facebook.com/profile.php?id=100084941564133",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
    hoverColor: "hover:text-blue-600 hover:border-blue-600/30",
  },
  {
    platform: "Instagram",
    url: "https://www.instagram.com/flow_thereispowerhere/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
    hoverColor: "hover:text-pink-500 hover:border-pink-500/30",
  },
];

export default function Footer() {
  const { ref: socialsRef, visible: socialsVisible } = useInView();
  const { ref: ctaRef, visible: ctaVisible } = useInView();

  return (
    <footer className="bg-black text-white">
      {/* Big CTA section */}
      <div ref={ctaRef} className="py-24 md:py-32 text-center">
        <div className={`reveal ${ctaVisible ? "visible" : ""} max-w-3xl mx-auto px-6`}>
          <Image
            src="/images/flow/logo.png"
            alt="Flow"
            width={50}
            height={50}
            className="mx-auto mb-6 rounded-lg brightness-200"
          />
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-5">
            There&apos;s Power In
            <br />
            <span className="gold-text">Prayer</span>
          </h2>
          <p className="text-white/50 text-lg mb-8 max-w-lg mx-auto">
            Join believers from around the world. Experience the move of God in
            your life through prophetic prayer.
          </p>
          <a
            href="https://www.youtube.com/@TheresPowerHere"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gold text-black text-sm font-bold px-8 py-4 rounded-full hover:bg-gold-light transition-colors duration-300"
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

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-white/10" />
      </div>

      {/* Bottom section */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div
          ref={socialsRef}
          className="flex flex-col md:flex-row items-center justify-between gap-8"
        >
          {/* Social links */}
          <div
            className={`reveal ${socialsVisible ? "visible" : ""} flex items-center gap-3`}
          >
            {socials.map((s, i) => (
              <a
                key={s.platform}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center w-11 h-11 rounded-full border border-white/10 text-white/50 transition-all duration-300 ${s.hoverColor}`}
                aria-label={s.platform}
                style={{ transitionDelay: `${i * 0.05}s` }}
              >
                {s.icon}
              </a>
            ))}
          </div>

          {/* Schedule reminder */}
          <div
            className={`reveal ${socialsVisible ? "visible" : ""} delay-2 flex items-center gap-3`}
          >
            <div className="w-2 h-2 rounded-full bg-gold live-pulse" />
            <span className="text-white/40 text-sm">
              Tuesdays & Fridays · 4:00 AM GMT
            </span>
          </div>

          {/* Copyright */}
          <div
            className={`reveal ${socialsVisible ? "visible" : ""} delay-3`}
          >
            <p className="text-white/25 text-sm">
              &copy; {new Date().getFullYear()} The FLOW Church
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
