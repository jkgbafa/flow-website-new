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

export default function Footer() {
  const { ref, visible } = useInView();

  return (
    <footer className="bg-[#1d1d1f] text-white">
      {/* CTA */}
      <div ref={ref} className="py-28 md:py-40 text-center">
        <div className={`reveal ${visible ? "visible" : ""} max-w-[580px] mx-auto px-6`}>
          <Image
            src="/images/flow/flow-logo-black.png"
            alt="FLOW"
            width={80}
            height={32}
            className="mx-auto mb-10 object-contain invert brightness-200"
          />
          <h2 className="text-[40px] md:text-[56px] font-bold leading-[1.05] tracking-[-0.03em] text-white">
            There&apos;s power<br />in prayer.
          </h2>
          <p className="text-[17px] text-white/50 mt-5 leading-[1.5] max-w-[380px] mx-auto">
            Join believers from around the world. Experience the move of God through prophetic prayer.
          </p>
          <div className="mt-8">
            <a
              href="https://www.youtube.com/@TheresPowerHere"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-accent text-white text-[14px] font-semibold px-7 py-3.5 rounded-full hover:bg-accent-light transition-colors"
            >
              Join FLOW Prayer
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/[0.06]">
        <div className="max-w-[980px] mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-[6px] h-[6px] rounded-full bg-accent live-pulse" />
            <span className="text-[12px] text-white/30">
              Tuesdays &amp; Fridays · 4:30 AM GMT
            </span>
          </div>
          <p className="text-[12px] text-white/20">
            &copy; {new Date().getFullYear()} FLOW — There&apos;s Power Here
          </p>
        </div>
      </div>
    </footer>
  );
}
