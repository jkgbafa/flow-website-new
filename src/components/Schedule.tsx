"use client";

import { useRef, useEffect, useState } from "react";

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

const scheduleItems = [
  {
    day: "Tuesday & Friday",
    time: "4:00 AM",
    timezone: "GMT",
    label: "FLOW Prayer Meeting",
    description:
      "Join millions of believers in prophetic prayer led by Dag Heward-Mills. Pray about unique topics that will change your life.",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
    ),
  },
  {
    day: "Sunday",
    time: "7:00 AM",
    timezone: "GMT",
    label: "FLOW Sunday Service",
    description:
      "A time of worship, the Word, and fellowship. Come as you are and experience the presence of God together.",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
        />
      </svg>
    ),
  },
];

export default function Schedule() {
  const { ref, visible } = useInView();

  return (
    <section id="schedule" className="py-24 md:py-36 bg-gray-50/80">
      <div ref={ref} className="max-w-5xl mx-auto px-6">
        <div className={`reveal ${visible ? "visible" : ""} text-center mb-16`}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-gold mb-3">
            Prayer Schedule
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-5">
            Join Us In Prayer
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Be part of a global prayer movement. You&apos;ll be glad you
            prayed!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {scheduleItems.map((item, i) => (
            <div
              key={item.label}
              className={`reveal ${visible ? "visible" : ""} delay-${i + 2}`}
            >
              <div className="bg-white border border-gray-100 rounded-2xl p-8 md:p-10 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group h-full">
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-2.5 h-2.5 rounded-full bg-gold live-pulse flex-shrink-0" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold">
                    {item.label}
                  </span>
                </div>

                {/* Time */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {item.day}
                  </h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl md:text-5xl font-black text-black tracking-tight">
                      {item.time}
                    </span>
                    <span className="text-lg font-bold text-gold">
                      {item.timezone}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-500 leading-relaxed text-[15px]">
                  {item.description}
                </p>

                {/* Icon */}
                <div className="mt-6 text-gray-300 group-hover:text-gold transition-colors duration-300">
                  {item.icon}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
