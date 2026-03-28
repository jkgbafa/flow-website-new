"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";

export default function PhotoReveal() {
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

  const clipSize = progress * 75;

  return (
    <section ref={sectionRef} style={{ height: "150vh" }}>
      <div className="sticky top-0 h-screen flex items-center justify-center bg-white overflow-hidden">
        <div
          className="relative w-[90%] max-w-[900px] rounded-[24px] overflow-hidden"
          style={{
            aspectRatio: "16/9",
            clipPath: `circle(${clipSize}% at 50% 50%)`,
          }}
        >
          <Image
            src="/images/flow/podium-prayer.jpg"
            alt="FLOW Prayer Meeting"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 90vw, 900px"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>
      </div>
    </section>
  );
}
