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
      setProgress(Math.max(0, Math.min(1, -rect.top / h)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const clipSize = 5 + progress * 70;
  const textOpacity = Math.max(0, 1 - progress * 2.5);

  return (
    <section ref={sectionRef} style={{ height: "180vh" }}>
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-white">
        {/* Photo circle reveal */}
        <div
          className="absolute inset-0"
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
            style={{ background: `rgba(0,0,0,${0.15 + progress * 0.3})` }}
          />
        </div>

        {/* Content */}
        <div
          className="relative z-10 text-center px-6 w-full max-w-[680px] mx-auto"
          style={{ opacity: textOpacity }}
        >
          <Image
            src="/images/flow/flow-logo-black.png"
            alt="FLOW"
            width={100}
            height={40}
            className="mx-auto mb-12 object-contain"
          />

          <h1 className="text-[48px] md:text-[72px] font-bold leading-[1.05] tracking-[-0.03em] text-[#1d1d1f]">
            There&apos;s Power Here.
          </h1>

          <p className="text-[17px] md:text-[21px] text-[#86868b] mt-6 leading-[1.5] font-normal max-w-[460px] mx-auto">
            Online prophetic prayer meetings. Join millions of believers worldwide.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://www.youtube.com/@TheresPowerHere"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[17px] text-accent hover:text-accent-light font-medium transition-colors"
            >
              Watch live &rsaquo;
            </a>
            <span className="hidden sm:block w-1 h-1 rounded-full bg-[#d2d2d7]" />
            <a
              href="#schedule"
              className="text-[17px] text-accent hover:text-accent-light font-medium transition-colors"
            >
              View schedule &rsaquo;
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          style={{ opacity: Math.max(0, 1 - progress * 6) }}
        >
          <div className="w-[22px] h-[34px] border-2 border-[#d2d2d7] rounded-full flex justify-center pt-1.5">
            <div className="w-[3px] h-[6px] bg-[#86868b] rounded-full scroll-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
