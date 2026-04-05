"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";

export default function DagHewardMills() {
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
    <section id="dag-heward-mills" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />
      <div className="absolute inset-0 dot-texture" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`reveal ${visible ? "visible" : ""}`}>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative mx-auto w-full max-w-md">
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden glass">
                <Image
                  src="/images/flow/founder.jpg"
                  alt="Bishop Dag Heward-Mills"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
            </div>

            {/* Content */}
            <div className="text-center md:text-left">
              <h2 className="text-5xl md:text-6xl font-bold text-white tracking-tight">
                Dag Heward-Mills
              </h2>
              <div className="mt-6 h-1 w-48 bg-gradient-to-r from-accent via-accent-light to-accent rounded-full mx-auto md:mx-0" />
              <p className="text-xl text-white/50 mt-6 leading-relaxed">
                Bishop Dag Heward-Mills is the founder of the United Denominations Originating from the Lighthouse Group of Churches (UD-OLGC), a worldwide network of churches.
              </p>
              <p className="text-lg text-white/40 mt-4 leading-relaxed">
                He is the author of numerous books and leads the FLOW prophetic prayer meetings — bringing believers together from around the world to experience the power of God through prayer.
              </p>
              <div className="mt-10">
                <a
                  href="https://daghewardmills.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block group relative px-10 py-5 rounded-2xl overflow-hidden"
                >
                  <div className="absolute inset-0 glass-strong" />
                  <div className="absolute inset-0 bg-gradient-to-r from-accent to-accent-light opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative text-[15px] font-semibold text-white tracking-wide">
                    VISIT DAGHEWARDMILLS.ORG
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
