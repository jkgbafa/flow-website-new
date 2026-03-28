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

export default function About() {
  const { ref: textRef, visible: textVisible } = useInView();
  const { ref: imgRef, visible: imgVisible } = useInView(0.15);

  return (
    <section id="about" className="py-24 md:py-36 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Text */}
          <div ref={textRef}>
            <div className={`reveal-left ${textVisible ? "visible" : ""}`}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-gold mb-4">
                About FLOW
              </p>
            </div>
            <div className={`reveal-left ${textVisible ? "visible" : ""} delay-1`}>
              <h2 className="text-4xl md:text-[3.5rem] font-bold tracking-tight leading-[1.05] mb-8">
                Flexible
                <br />
                Lovers
                <br />
                Of The
                <br />
                <span className="gold-text">Word</span>
              </h2>
            </div>
            <div className={`reveal-left ${textVisible ? "visible" : ""} delay-2`}>
              <p className="text-gray-500 text-lg leading-relaxed mb-5">
                FLOW is a global online prayer and worship community led by Dag
                Heward-Mills, gathering believers from around the world to pray,
                worship, and seek God together.
              </p>
            </div>
            <div className={`reveal-left ${textVisible ? "visible" : ""} delay-3`}>
              <p className="text-gray-500 text-lg leading-relaxed">
                Every week, millions join from Ghana, Nigeria, USA, South Africa,
                Australia, and beyond — united in prayer, believing that
                <span className="text-gold font-semibold">
                  {" "}
                  there&apos;s power here.
                </span>
              </p>
            </div>
            <div className={`reveal-left ${textVisible ? "visible" : ""} delay-4`}>
              <div className="mt-8 flex items-center gap-4">
                <a
                  href="https://www.youtube.com/@TheresPowerHere"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-gray-800 transition-colors"
                >
                  Watch Live
                </a>
                <span className="text-gray-300 text-sm font-medium tracking-wide">
                  #FLOWwithme
                </span>
              </div>
            </div>
          </div>

          {/* Image */}
          <div ref={imgRef} className="relative">
            <div
              className="relative overflow-hidden rounded-3xl"
              style={{
                clipPath: imgVisible
                  ? "circle(150% at 50% 50%)"
                  : "circle(0% at 50% 50%)",
                transition:
                  "clip-path 1.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              }}
            >
              <div style={{ aspectRatio: "3/4" }} className="relative">
                <Image
                  src="/images/flow/join-flow.jpg"
                  alt="Join FLOW Prayer Meetings — back of shirt"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
            {/* Decorative gold accent */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-2 border-gold/20 rounded-2xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
