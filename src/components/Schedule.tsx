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
    time: "4:30 AM",
    timezone: "GMT",
    label: "FLOW Prayer Meeting",
    description:
      "Join millions of believers in prophetic prayer led by Dag Heward-Mills. Pray about unique topics that will change your life.",
  },
  {
    day: "Sunday",
    time: "7:30 AM",
    timezone: "GMT",
    label: "FLOW Sunday Service",
    description:
      "A time of worship, the Word, and fellowship. Come as you are and experience the presence of God together.",
  },
];

export default function Schedule() {
  const { ref, visible } = useInView();

  return (
    <section id="schedule" className="py-32 md:py-48 bg-cream">
      <div ref={ref} className="max-w-6xl mx-auto px-8 md:px-12">
        {/* Heading */}
        <div className={`reveal ${visible ? "visible" : ""} text-center mb-20`}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-gold mb-4">
            Prayer Schedule
          </p>
          <h2
            className="text-4xl md:text-6xl tracking-[-0.02em] mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <span className="italic">Join Us In Prayer</span>
          </h2>
          <div className="divider-gold mx-auto mb-6" />
          <p className="text-gray-400 text-lg max-w-md mx-auto leading-relaxed">
            Be part of a global prayer movement.
            <br />
            You&apos;ll be glad you prayed!
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {scheduleItems.map((item, i) => (
            <div
              key={item.label}
              className={`reveal ${visible ? "visible" : ""}`}
              style={{ transitionDelay: `${0.24 + i * 0.15}s` }}
            >
              <div className="bg-white rounded-[20px] p-10 md:p-12 hover:shadow-2xl hover:shadow-gold/5 hover:-translate-y-1 transition-all duration-500 group h-full border border-gray-100/80">
                {/* Label */}
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-2.5 h-2.5 rounded-full bg-gold live-pulse flex-shrink-0" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold">
                    {item.label}
                  </span>
                </div>

                {/* Day */}
                <h3
                  className="text-xl text-gray-400 mb-3"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  <span className="italic">{item.day}</span>
                </h3>

                {/* Time — big and bold */}
                <div className="flex items-baseline gap-3 mb-8">
                  <span className="text-5xl md:text-6xl font-bold tracking-[-0.03em] text-black">
                    {item.time}
                  </span>
                  <span className="text-xl font-bold text-gold">
                    {item.timezone}
                  </span>
                </div>

                {/* Divider */}
                <div className="h-px bg-gray-100 mb-6" />

                {/* Description */}
                <p className="text-gray-400 leading-[1.7] text-[15px]">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
