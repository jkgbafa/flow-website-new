"use client";

import { useRef, useEffect, useState } from "react";

export default function ShareLink() {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          videoRef.current?.play();
        } else {
          videoRef.current?.pause();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 dot-texture" />

      <div ref={ref} className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`reveal ${visible ? "visible" : ""} grid md:grid-cols-2 gap-12 lg:gap-16 items-center`}>
          {/* Video */}
          <div className="relative rounded-2xl overflow-hidden border border-white/10">
            <video
              ref={videoRef}
              src="/videos/share-the-link.mp4"
              muted
              loop
              playsInline
              className="w-full"
              style={{ aspectRatio: "9/16", objectFit: "cover" }}
            />
          </div>

          {/* Text */}
          <div className={`reveal ${visible ? "visible" : ""} delay-2`}>
            <p className="text-accent text-[11px] font-semibold tracking-[0.15em] uppercase mb-4">
              Spread The Word
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              Share The<br />FLOW Link
            </h2>
            <div className="mt-6 h-1 w-32 bg-gradient-to-r from-accent via-accent-light to-accent rounded-full" />
            <p className="text-white/50 text-lg mt-6 leading-relaxed">
              Help others experience the power of prayer. Share the FLOW link with your friends, family, and community so they can join the prayer meetings.
            </p>
            <div className="mt-8 glass rounded-2xl p-5">
              <p className="text-[11px] text-white/30 uppercase tracking-wider font-medium mb-2">
                Share this link
              </p>
              <p className="text-white font-semibold select-all">
                youtube.com/@TheresPowerHere
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
