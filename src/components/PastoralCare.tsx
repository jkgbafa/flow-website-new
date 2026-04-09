"use client";

import { useRef, useEffect, useState } from "react";

const meetings = [
  {
    day: "Wednesdays",
    time: "5:00 PM GMT",
    name: "Holy Spirit Meetings",
    description: "Receive the baptism of the Holy Spirit and speak in tongues.",
    icon: (
      <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
      </svg>
    ),
  },
  {
    day: "Fridays",
    time: "5:00 PM GMT",
    name: "Deliverance & Healing Meetings",
    description: "Healing, deliverance, freedom, and restoration through prayer.",
    icon: (
      <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
];

export default function PastoralCare() {
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
    <section id="pastoral-care" className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900" />
      <div className="absolute inset-0 dot-texture" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`reveal ${visible ? "visible" : ""} text-center mb-16`}>
          <h2 className="text-5xl md:text-6xl font-bold text-white tracking-tight">
            Meetings of the Spirit
          </h2>
          <div className="mx-auto mt-6 h-1 w-48 bg-gradient-to-r from-accent via-accent-light to-accent rounded-full" />
          <p className="text-xl text-white/50 mt-6 max-w-lg mx-auto leading-relaxed">
            Weekly Zoom Meetings — 5:00 PM GMT
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {meetings.map((m, i) => (
            <div
              key={m.day}
              className={`reveal ${visible ? "visible" : ""} glass rounded-3xl p-8 hover:border-white/20 transition-colors text-center`}
              style={{ transitionDelay: `${(i + 1) * 0.1}s` }}
            >
              <div className="mx-auto w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-5">
                {m.icon}
              </div>
              <span className="inline-block text-accent text-[12px] font-semibold tracking-widest uppercase mb-1">
                {m.day}
              </span>
              <span className="block text-white/60 text-sm font-medium mb-3">
                {m.time}
              </span>
              <h3 className="text-xl font-semibold text-white mb-3">{m.name}</h3>
              <p className="text-sm text-white/40 leading-relaxed">{m.description}</p>
            </div>
          ))}
        </div>

        <div className={`reveal ${visible ? "visible" : ""} delay-3 text-center mt-12`}>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSfBmySOImU0H41W3K_Czudyh5rBVBNAI9p4hM3En5xaeQGP7Q/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block group relative px-10 py-5 rounded-2xl overflow-hidden"
          >
            <div className="absolute inset-0 glass-strong" />
            <div className="absolute inset-0 bg-gradient-to-r from-accent to-accent-light opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative text-[15px] font-semibold text-white tracking-wide">
              REGISTER FOR MEETINGS
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
