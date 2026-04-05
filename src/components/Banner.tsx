"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";

export default function Banner() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 dot-texture" />
      <div ref={ref} className={`reveal ${visible ? "visible" : ""} max-w-6xl mx-auto px-4 sm:px-6 lg:px-8`}>
        <div className="relative w-full rounded-3xl overflow-hidden border border-white/10">
          <Image
            src="/images/flow/banner.png"
            alt="FLOW Season 12"
            width={3120}
            height={1160}
            className="w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
}
