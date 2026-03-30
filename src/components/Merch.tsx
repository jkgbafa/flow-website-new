"use client";

import { useRef, useEffect, useState } from "react";

const products = [
  {
    name: "Flexible (F.L.O.W) Tee",
    href: "https://church-shop.fourthwall.com/products/flexible-f-l-o-w-tee",
    image: "/images/flow/merch-flow-tee.png",
  },
  {
    name: "Prayer is the Work Tee",
    href: "https://church-shop.fourthwall.com/products/prayer-is-the-work-tee",
    image: "/images/flow/merch-prayer-tee.png",
  },
  {
    name: "There's Power Here Tee",
    href: "https://church-shop.fourthwall.com/products/theres-power-here-tee",
    image: "/images/flow/merch-power-tee.png",
  },
  {
    name: "People Who Pray Are Survivors Tee",
    href: "https://church-shop.fourthwall.com/products/people-who-pray-are-survivors-tee",
    image: "/images/flow/merch-survivors-tee.png",
  },
];

export default function Merch() {
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
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="merch" className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />
      <div className="absolute inset-0 dot-texture" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={`reveal ${visible ? "visible" : ""} text-center mb-16`}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white tracking-tight">
            FLOW Merch
          </h2>
          <div className="mx-auto mt-6 h-1 w-48 bg-gradient-to-r from-accent via-accent-light to-accent rounded-full" />
          <p className="text-xl text-white/50 mt-6 max-w-lg mx-auto leading-relaxed">
            Wear the message wherever you go.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p, i) => (
            <a
              key={p.name}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`reveal ${visible ? "visible" : ""} group glass rounded-2xl overflow-hidden hover:border-white/20 transition-all`}
              style={{ transitionDelay: `${(i + 1) * 0.1}s` }}
            >
              <div className="relative aspect-square overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <h3 className="text-sm font-semibold text-white leading-tight">
                  {p.name}
                </h3>
              </div>
            </a>
          ))}
        </div>

        <div
          className={`reveal ${visible ? "visible" : ""} delay-3 text-center mt-12`}
        >
          <a
            href="https://church-shop.fourthwall.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block group relative px-10 py-5 rounded-2xl overflow-hidden"
          >
            <div className="absolute inset-0 glass-strong" />
            <div className="absolute inset-0 bg-gradient-to-r from-accent to-accent-light opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative text-[15px] font-semibold text-white tracking-wide">
              VIEW ALL
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
