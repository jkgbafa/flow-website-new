"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";

export default function About() {
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
    <section id="about" className="py-32 bg-white">
      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`reveal ${visible ? "visible" : ""} text-center mb-16`}>
          <h2 className="text-5xl md:text-6xl font-bold text-accent">
            FLOW
          </h2>
          <p className="text-2xl md:text-3xl text-gray-800 font-semibold mt-4">
            Flexible Lovers Of The Word
          </p>
          <div className="w-24 h-1 bg-accent mx-auto mt-6" />
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className={`reveal ${visible ? "visible" : ""} delay-1`}>
            <div className="space-y-5 text-gray-600 text-lg leading-relaxed">
              <p>
                FLOW is an online prophetic prayer meeting founded by Bishop Dag Heward-Mills that brings together millions of believers from around the world.
              </p>
              <p>
                Every Tuesday and Friday at 4:30 AM GMT, and every Sunday at 9:00 AM GMT, people from every nation gather to pray, worship, and experience the move of God through prophetic prayer.
              </p>
              <p>
                FLOW stands for <strong className="text-gray-800">Flexible Lovers Of The Word</strong> — a community rooted deeply in Scripture and the power of prayer. When we pray, heaven moves and God responds to the cry of His people.
              </p>
            </div>
          </div>

          <div className={`reveal ${visible ? "visible" : ""} delay-2`}>
            <div className="relative rounded-2xl overflow-hidden group">
              <div style={{ aspectRatio: "4/5" }} className="relative">
                <Image
                  src="/images/flow/prayer-desk-new.jpg"
                  alt="FLOW Prayer"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
