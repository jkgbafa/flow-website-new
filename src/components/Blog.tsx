"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";

const blogPosts = [
  {
    id: 1,
    title: "FLOW Prayer Meeting | S12 E16 — Trusting God & Breaking Cycles",
    episode: "S12 E16",
    date: "March 2026",
    image: "/images/flow/worship-hands.jpg",
    facebookUrl: "https://www.facebook.com/share/p/1E2nStL6da/",
  },
  {
    id: 2,
    title: "FLOW Prayer Meeting | S12 E15",
    episode: "S12 E15",
    date: "March 2026",
    image: "/images/flow/prayer-is-the-work.jpg",
    facebookUrl: "https://www.facebook.com/share/p/1CLPXUQDJ6/",
  },
  {
    id: 3,
    title: "FLOW Prayer Meeting | S12 E14 — How God Moves In Prayer",
    episode: "S12 E14",
    date: "March 2026",
    image: "/images/flow/zoom-prayer.jpg",
    facebookUrl: "https://www.facebook.com/share/p/1BEvg4LSMw/",
  },
  {
    id: 4,
    title: "FLOW Prayer Meeting | S12 E13 — You Will Overcome",
    episode: "S12 E13",
    date: "March 2026",
    image: "/images/flow/singers.jpg",
    facebookUrl: "https://www.facebook.com/share/p/1J5caFLLcu/",
  },
];

function BlogCard({ post, index }: { post: (typeof blogPosts)[0]; index: number }) {
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
    <div
      ref={ref}
      className={`reveal ${visible ? "visible" : ""}`}
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      <a
        href={post.facebookUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group block glass rounded-3xl overflow-hidden hover:border-white/20 transition-colors"
      >
        <div className="relative overflow-hidden" style={{ aspectRatio: "16/10" }}>
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-sm px-3 py-1 rounded-full">
            <span className="text-[10px] font-semibold text-white tracking-[0.05em]">
              {post.episode}
            </span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
            <h3 className="text-[15px] md:text-[17px] font-semibold text-white leading-[1.35] group-hover:text-accent transition-colors">
              {post.title}
            </h3>
          </div>
        </div>

        <div className="p-6 md:p-7">
          <p className="text-[12px] text-white/40 mb-2">{post.date}</p>
          <p className="mt-4 text-[14px] text-accent font-medium">
            Read on Facebook &rsaquo;
          </p>
        </div>
      </a>
    </div>
  );
}

export default function Blog() {
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
    <section id="blog" className="py-32 relative">
      <div className="absolute inset-0 dot-texture" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`reveal ${visible ? "visible" : ""} text-center mb-16`}>
          <h2 className="text-5xl md:text-6xl font-bold text-white tracking-tight">
            Episode Recaps
          </h2>
          <div className="mx-auto mt-6 h-1 w-48 bg-gradient-to-r from-accent via-accent-light to-accent rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {blogPosts.map((post, i) => (
            <BlogCard key={post.id} post={post} index={i} />
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="https://www.facebook.com/p/The-Flow-Church-100084941564133/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[17px] text-accent hover:text-accent-light font-medium transition-colors"
          >
            View all on Facebook &rsaquo;
          </a>
        </div>
      </div>
    </section>
  );
}
