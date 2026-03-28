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

const LATEST_VIDEO_ID = "XArwAvO5rMQ";

const socials = [
  {
    platform: "YouTube",
    handle: "@TheresPowerHere",
    url: "https://www.youtube.com/@TheresPowerHere",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    platform: "Facebook",
    handle: "FLOW",
    url: "https://www.facebook.com/profile.php?id=100084941564133",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    platform: "Instagram",
    handle: "@flow_thereispowerhere",
    url: "https://www.instagram.com/flow_thereispowerhere/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    platform: "TikTok",
    handle: "@theflowchurch",
    url: "https://www.tiktok.com/@theflowchurch",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z" />
      </svg>
    ),
  },
];

export default function Connect() {
  const { ref: headingRef, visible: headingVisible } = useInView();
  const { ref: videoRef, visible: videoVisible } = useInView(0.15);
  const [playing, setPlaying] = useState(false);

  return (
    <section id="connect" className="py-28 md:py-40 bg-[#f5f5f7]">
      <div className="max-w-[980px] mx-auto px-6">
        {/* Heading */}
        <div ref={headingRef} className={`reveal ${headingVisible ? "visible" : ""} text-center mb-14`}>
          <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-accent mb-3">
            Connect
          </p>
          <h2 className="text-[40px] md:text-[56px] font-bold leading-[1.05] tracking-[-0.03em] text-[#1d1d1f]">
            Watch and pray.
          </h2>
          <p className="text-[17px] text-[#86868b] mt-4 max-w-[420px] mx-auto">
            The latest FLOW Prayer Meeting. Hover to preview.
          </p>
        </div>

        {/* Video */}
        <div
          ref={videoRef}
          className={`reveal ${videoVisible ? "visible" : ""} mb-16`}
        >
          <div
            className="relative rounded-[20px] overflow-hidden cursor-pointer group bg-black"
            style={{ aspectRatio: "16/9" }}
            onMouseEnter={() => setPlaying(true)}
            onClick={() => setPlaying(true)}
          >
            {playing ? (
              <iframe
                src={`https://www.youtube.com/embed/${LATEST_VIDEO_ID}?autoplay=1&mute=1&start=30&rel=0`}
                className="absolute inset-0 w-full h-full"
                allow="autoplay; encrypted-media; fullscreen"
                allowFullScreen
                title="Latest FLOW Prayer Meeting"
              />
            ) : (
              <>
                <Image
                  src="/images/flow/banner.png"
                  alt="FLOW Prayer Meeting"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 980px"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />

                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-[72px] h-[72px] rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-7 h-7 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>

                <div className="absolute bottom-5 left-5 md:bottom-6 md:left-6">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-accent">
                    Latest Episode
                  </span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Socials */}
        <div className={`reveal ${headingVisible ? "visible" : ""} delay-2`}>
          <div className="flex flex-wrap justify-center gap-3">
            {socials.map((s) => (
              <a
                key={s.platform}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 bg-white rounded-full px-5 py-3 text-[#1d1d1f]/60 hover:text-[#1d1d1f] transition-colors"
              >
                {s.icon}
                <span className="text-[13px] font-medium">{s.platform}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
