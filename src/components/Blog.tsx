"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";

const blogPosts = [
  {
    id: 1,
    title: "FLOW Prayer Meeting | S12 E16 — Trusting God In Every Season",
    episode: "S12 E16",
    date: "March 2026",
    image: "/images/flow/podium-prayer.jpg",
    excerpt:
      "In this powerful prayer meeting, we explored trusting God even when we cannot see the way forward. Dag Heward-Mills led believers worldwide in targeted prayers for faith and breakthrough.",
    facebookUrl: "https://www.facebook.com/share/p/1E2nStL6da/",
  },
  {
    id: 2,
    title: "FLOW Prayer Meeting | S12 E15 — Flexible Lovers Of The Word",
    episode: "S12 E15",
    date: "March 2026",
    image: "/images/flow/flow-shirt.jpg",
    excerpt:
      "What does it mean to be a flexible lover of the word? This episode unpacked the heart and identity of FLOW — a community rooted deeply in Scripture and the power of prayer.",
    facebookUrl: "https://www.facebook.com/share/p/1E2nStL6da/",
  },
  {
    id: 3,
    title: "FLOW Prayer Meeting | S12 E14 — Worship That Breaks Through",
    episode: "S12 E14",
    date: "March 2026",
    image: "/images/flow/worship-hands.jpg",
    excerpt:
      "When hands are lifted and hearts are surrendered, something supernatural happens. This session was marked by an extraordinary move of the Spirit.",
    facebookUrl: "https://www.facebook.com/share/p/1E2nStL6da/",
  },
  {
    id: 4,
    title: "FLOW Prayer Meeting | S12 E13 — Prayer Is The Work",
    episode: "S12 E13",
    date: "February 2026",
    image: "/images/flow/prayer-is-the-work.jpg",
    excerpt:
      "The work is prayer, and prayer is the work. Everything begins on our knees. When we pray, heaven moves — and God responds to the cry of His people.",
    facebookUrl: "https://www.facebook.com/share/p/1E2nStL6da/",
  },
];

function BlogCard({ post, index }: { post: (typeof blogPosts)[0]; index: number }) {
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
    <div
      ref={ref}
      className={`reveal ${visible ? "visible" : ""}`}
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      <a
        href={post.facebookUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group block bg-white rounded-[20px] overflow-hidden hover:shadow-lg transition-shadow duration-300"
      >
        <div className="relative overflow-hidden" style={{ aspectRatio: "16/10" }}>
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-sm px-3 py-1 rounded-full">
            <span className="text-[10px] font-semibold text-white tracking-[0.05em]">
              {post.episode}
            </span>
          </div>
        </div>

        <div className="p-6 md:p-7">
          <p className="text-[12px] text-[#86868b] mb-2">{post.date}</p>
          <h3 className="text-[15px] md:text-[17px] font-semibold text-[#1d1d1f] leading-[1.35] mb-3 group-hover:text-accent transition-colors">
            {post.title}
          </h3>
          <p className="text-[14px] text-[#86868b] leading-[1.6] line-clamp-2">
            {post.excerpt}
          </p>
          <p className="mt-4 text-[14px] text-accent font-medium">
            Read more &rsaquo;
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
    <section id="blog" className="py-28 md:py-40">
      <div className="max-w-[980px] mx-auto px-6">
        <div ref={ref} className={`reveal ${visible ? "visible" : ""} text-center mb-14`}>
          <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-accent mb-3">
            Blog
          </p>
          <h2 className="text-[40px] md:text-[56px] font-bold leading-[1.05] tracking-[-0.03em] text-[#1d1d1f]">
            Episode recaps.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {blogPosts.map((post, i) => (
            <BlogCard key={post.id} post={post} index={i} />
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="https://www.facebook.com/profile.php?id=100084941564133"
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
