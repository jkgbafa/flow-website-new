"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";

function useInView(threshold = 0.2) {
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

export default function Hero() {
  const { ref, visible } = useInView(0.3);

  return (
    <section className="py-24 md:py-32 text-center">
      <div ref={ref} className="max-w-[680px] mx-auto px-6">
        <div className={`reveal ${visible ? "visible" : ""}`}>
          <Image
            src="/images/flow/flow-logo-black.png"
            alt="FLOW"
            width={100}
            height={40}
            className="mx-auto mb-10 object-contain"
          />
        </div>

        <div className={`reveal ${visible ? "visible" : ""} delay-1`}>
          <h1 className="text-[48px] md:text-[72px] font-bold leading-[1.05] tracking-[-0.03em] text-[#1d1d1f]">
            There&apos;s Power Here.
          </h1>
        </div>

        <div className={`reveal ${visible ? "visible" : ""} delay-2`}>
          <p className="text-[17px] md:text-[21px] text-[#86868b] mt-6 leading-[1.5] max-w-[460px] mx-auto">
            Online prophetic prayer meetings. Join millions of believers worldwide.
          </p>
        </div>

        <div className={`reveal ${visible ? "visible" : ""} delay-3`}>
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
      </div>
    </section>
  );
}
