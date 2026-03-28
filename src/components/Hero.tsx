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

  // Circle mask: starts at 5%, grows to 75% (covers viewport)
  const clipSize = 5 + progress * 70;
  // Text fades out as photo reveals
  const textOpacity = Math.max(0, 1 - progress * 2.5);
  // Subtle scale on text
  const textScale = 1 + progress * 0.08;
  // Overlay darkens as circle grows
  const overlayOpacity = 0.1 + progress * 0.3;

  return (
    <section ref={sectionRef} style={{ height: "180vh" }}>
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-white">
        {/* Photo reveal with circle mask */}
        <div
          className="absolute inset-0 z-0"
          style={{
            clipPath: `circle(${clipSize}% at 50% 50%)`,
          }}
        >
          <Image
            src="/images/flow/podium-prayer.jpg"
            alt="FLOW Prayer Meeting — powerful prayer at the podium"
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

        {/* Text content — fades out as photo circle grows */}
        <div
          className="relative z-10 text-center px-6 max-w-4xl"
          style={{
            opacity: textOpacity,
            transform: `scale(${textScale})`,
          }}
        >
          <div className="mb-6">
            <Image
              src="/images/flow/logo.png"
              alt="Flow"
              width={60}
              height={60}
              className="mx-auto rounded-xl"
            />
          </div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-gray-400 mb-5">
            Online Prophetic Prayers
          </p>
          <h1 className="text-[clamp(3.5rem,11vw,9rem)] font-black leading-[0.85] tracking-tight text-black">
            THERE&apos;S
            <br />
            <span className="gold-text">POWER</span>
            <br />
            HERE
          </h1>
          <p className="text-base md:text-lg text-gray-400 mt-6 max-w-md mx-auto leading-relaxed">
            Join millions of believers worldwide in prophetic prayer
          </p>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
          style={{ opacity: Math.max(0, 1 - progress * 6) }}
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-medium">
            Scroll
          </span>
          <div className="w-5 h-8 border-[1.5px] border-gray-300 rounded-full flex justify-center pt-1.5">
            <div className="w-1 h-1.5 bg-gray-400 rounded-full scroll-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
