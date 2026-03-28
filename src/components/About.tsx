"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";

function useInView(threshold = 0.15) {
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
  const { ref, visible } = useInView();
  const { ref: imgRef, visible: imgVisible } = useInView(0.1);

  return (
    <section id="about" className="py-28 md:py-40">
      <div className="max-w-[980px] mx-auto px-6">
        {/* Section intro */}
        <div ref={ref} className={`reveal ${visible ? "visible" : ""} text-center mb-20`}>
          <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-accent mb-3">
            About FLOW
          </p>
          <h2 className="text-[40px] md:text-[56px] font-bold leading-[1.05] tracking-[-0.03em] text-[#1d1d1f]">
            Flexible Lovers<br />Of The Word.
          </h2>
        </div>

        {/* Content grid */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Image */}
          <div ref={imgRef}>
            <div
              className="relative rounded-[28px] overflow-hidden"
              style={{
                clipPath: imgVisible
                  ? "circle(150% at 50% 50%)"
                  : "circle(0% at 50% 50%)",
                transition: "clip-path 1.2s cubic-bezier(0.25, 0.1, 0.25, 1)",
              }}
            >
              <div style={{ aspectRatio: "4/5" }} className="relative">
                <Image
                  src="/images/flow/join-flow.jpg"
                  alt="Join FLOW Prayer Meetings"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>

          {/* Text */}
          <div>
            <div className={`reveal ${visible ? "visible" : ""} delay-1`}>
              <p className="text-[17px] md:text-[19px] text-[#86868b] leading-[1.6] mb-6">
                FLOW is a global online prayer and worship community led by Dag
                Heward-Mills, gathering believers from around the world to pray,
                worship, and seek God together.
              </p>
            </div>
            <div className={`reveal ${visible ? "visible" : ""} delay-2`}>
              <p className="text-[17px] md:text-[19px] text-[#86868b] leading-[1.6] mb-8">
                Every week, millions join from Ghana, Nigeria, USA, South Africa,
                Australia, and beyond — united in prayer, believing that there&apos;s
                power here.
              </p>
            </div>
            <div className={`reveal ${visible ? "visible" : ""} delay-3`}>
              <a
                href="https://www.youtube.com/@TheresPowerHere"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[17px] text-accent hover:text-accent-light font-medium transition-colors"
              >
                Join the movement &rsaquo;
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
