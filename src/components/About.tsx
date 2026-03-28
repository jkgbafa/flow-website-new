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
  const { ref: sectionRef, visible } = useInView(0.15);
  const { ref: imgRef, visible: imgVisible } = useInView(0.1);

  return (
    <section id="about" className="py-32 md:py-48 bg-white">
      <div className="max-w-7xl mx-auto px-8 md:px-12">
        <div className="grid md:grid-cols-12 gap-12 md:gap-16 items-center">
          {/* Text — 7 cols */}
          <div ref={sectionRef} className="md:col-span-7">
            <div className={`reveal-left ${visible ? "visible" : ""}`}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-gold mb-6">
                About FLOW
              </p>
            </div>

            <div className={`reveal-left ${visible ? "visible" : ""} delay-1`}>
              <h2
                className="text-5xl md:text-7xl leading-[1] tracking-[-0.02em] mb-10"
                style={{ fontFamily: "var(--font-display)" }}
              >
                <span className="italic">Flexible</span>
                <br />
                <span className="italic">Lovers</span>
                <br />
                <span className="italic">Of The </span>
                <span className="italic gold-text">Word</span>
              </h2>
            </div>

            <div className={`reveal-left ${visible ? "visible" : ""} delay-2`}>
              <div className="divider-gold mb-8" />
            </div>

            <div className={`reveal-left ${visible ? "visible" : ""} delay-3`}>
              <p className="text-gray-400 text-lg leading-[1.8] mb-6 max-w-lg">
                FLOW is a global online prayer and worship community led by Dag
                Heward-Mills, gathering believers from around the world to pray,
                worship, and seek God together.
              </p>
            </div>

            <div className={`reveal-left ${visible ? "visible" : ""} delay-4`}>
              <p className="text-gray-400 text-lg leading-[1.8] max-w-lg">
                Every week, millions join from Ghana, Nigeria, USA, South Africa,
                Australia, and beyond — united in prayer, believing that
                <span className="text-gold font-semibold">
                  {" "}there&apos;s power here.
                </span>
              </p>
            </div>

            <div className={`reveal-left ${visible ? "visible" : ""} delay-5`}>
              <div className="mt-10 flex items-center gap-5">
                <a
                  href="https://www.youtube.com/@TheresPowerHere"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black text-white text-[12px] font-semibold uppercase tracking-[0.1em] px-7 py-3.5 rounded-full hover:bg-gold hover:text-black transition-all duration-300"
                >
                  Watch Live
                </a>
                <span className="text-gray-200 text-sm tracking-[0.05em]">
                  #FLOWwithme
                </span>
              </div>
            </div>
          </div>

          {/* Image — 5 cols */}
          <div ref={imgRef} className="md:col-span-5">
            <div
              className="relative overflow-hidden rounded-[24px]"
              style={{
                clipPath: imgVisible
                  ? "circle(150% at 50% 50%)"
                  : "circle(0% at 50% 50%)",
                transition: "clip-path 1.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              }}
            >
              <div style={{ aspectRatio: "3/4" }} className="relative">
                <Image
                  src="/images/flow/join-flow.jpg"
                  alt="Join FLOW Prayer Meetings"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
