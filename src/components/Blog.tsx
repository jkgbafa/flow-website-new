"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";

/**
 * Blog posts data — Episode recaps from FLOW Prayer Meetings.
 *
 * To add new posts: add a new entry to this array.
 * For automated syncing from Facebook, integrate with the Facebook Graph API
 * and populate this array from an API route or CMS.
 */
const blogPosts = [
  {
    id: 1,
    title: "Trusting God in Every Season",
    episode: "S12 · E16",
    date: "March 2026",
    image: "/images/flow/podium-prayer.jpg",
    excerpt:
      "In this powerful prayer meeting, we explored the depths of trusting God even when we cannot see the way forward. Bishop Dag Heward-Mills led believers from around the world in targeted prayers for faith, endurance, and divine breakthrough.",
    facebookUrl: "https://www.facebook.com/share/p/1E2nStL6da/",
  },
  {
    id: 2,
    title: "Flexible Lovers Of The Word",
    episode: "S12 · E15",
    date: "March 2026",
    image: "/images/flow/flow-shirt.jpg",
    excerpt:
      "What does it mean to be a flexible lover of the word? This powerful episode unpacked the heart and identity of FLOW — a community that bends but never breaks, rooted deeply in Scripture and the power of prayer.",
    facebookUrl: "https://www.facebook.com/profile.php?id=100084941564133",
  },
  {
    id: 3,
    title: "Worship That Breaks Through",
    episode: "S12 · E14",
    date: "March 2026",
    image: "/images/flow/worship-hands.jpg",
    excerpt:
      "When hands are lifted and hearts are surrendered, something supernatural happens in the atmosphere. This session was marked by an extraordinary move of the Spirit as believers cried out together.",
    facebookUrl: "https://www.facebook.com/profile.php?id=100084941564133",
  },
  {
    id: 4,
    title: "Prayer Is The Work",
    episode: "S12 · E13",
    date: "February 2026",
    image: "/images/flow/prayer-is-the-work.jpg",
    excerpt:
      "The work is prayer, and prayer is the work. This powerful session reminded us that everything begins on our knees. When we pray, heaven moves — and God responds to the cry of His people.",
    facebookUrl: "https://www.facebook.com/profile.php?id=100084941564133",
  },
];

function BlogCard({
  post,
  index,
}: {
  post: (typeof blogPosts)[0];
  index: number;
}) {
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
        className="group block bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
      >
        {/* Image */}
        <div className="relative overflow-hidden" style={{ aspectRatio: "16/10" }}>
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          {/* Episode badge */}
          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full">
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-gold">
              {post.episode}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-xs text-gray-400 font-medium mb-2">{post.date}</p>
          <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-gold transition-colors duration-300">
            {post.title}
          </h3>
          <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
            {post.excerpt}
          </p>
          <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-gold">
            <span>Read on Facebook</span>
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </div>
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
    <section id="blog" className="py-24 md:py-36 bg-gray-50/80">
      <div className="max-w-6xl mx-auto px-6">
        <div
          ref={ref}
          className={`reveal ${visible ? "visible" : ""} text-center mb-14`}
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-gold mb-3">
            Flow Blog
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-5">
            Episode Recaps
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Relive the most powerful moments from recent FLOW Prayer Meetings
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {blogPosts.map((post, i) => (
            <BlogCard key={post.id} post={post} index={i} />
          ))}
        </div>

        {/* View all on Facebook */}
        <div className="text-center mt-12">
          <a
            href="https://www.facebook.com/profile.php?id=100084941564133"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border-2 border-gray-200 text-gray-600 text-sm font-semibold px-8 py-3.5 rounded-full hover:border-gold hover:text-gold transition-all duration-300"
          >
            View All on Facebook
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
