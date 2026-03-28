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

export default function Schedule() {
  const { ref, visible } = useInView();

  return (
    <section id="schedule" className="py-28 md:py-40 bg-[#f5f5f7]">
      <div ref={ref} className="max-w-[980px] mx-auto px-6">
        {/* Heading */}
        <div className={`reveal ${visible ? "visible" : ""} text-center mb-16`}>
          <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-accent mb-3">
            Schedule
          </p>
          <h2 className="text-[40px] md:text-[56px] font-bold leading-[1.05] tracking-[-0.03em] text-[#1d1d1f]">
            Join us in prayer.
          </h2>
          <p className="text-[17px] text-[#86868b] mt-4 max-w-[420px] mx-auto leading-[1.5]">
            Be part of a global prayer movement. You&apos;ll be glad you prayed.
          </p>
        </div>

        {/* Schedule cards */}
        <div className="grid md:grid-cols-2 gap-5">
          {/* Prayer Meeting */}
          <div className={`reveal ${visible ? "visible" : ""} delay-1`}>
            <div className="bg-white rounded-[20px] p-8 md:p-10 h-full">
              <div className="flex items-center gap-2.5 mb-6">
                <div className="w-2 h-2 rounded-full bg-accent live-pulse" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-accent">
                  Prayer Meeting
                </span>
              </div>
              <p className="text-[15px] text-[#86868b] mb-2">
                Every Tuesday &amp; Friday
              </p>
              <p className="text-[44px] md:text-[56px] font-bold tracking-[-0.04em] text-[#1d1d1f] leading-none">
                4:30 <span className="text-[24px] md:text-[28px] font-semibold text-[#86868b]">AM GMT</span>
              </p>
              <p className="text-[15px] text-[#86868b] mt-6 leading-[1.6]">
                Prophetic prayer led by Dag Heward-Mills. Pray about unique topics that will change your life.
              </p>
            </div>
          </div>

          {/* Sunday Service */}
          <div className={`reveal ${visible ? "visible" : ""} delay-2`}>
            <div className="bg-[#1d1d1f] rounded-[20px] p-8 md:p-10 h-full">
              <div className="flex items-center gap-2.5 mb-6">
                <div className="w-2 h-2 rounded-full bg-accent live-pulse" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-accent">
                  Sunday Service
                </span>
              </div>
              <p className="text-[15px] text-white/50 mb-2">
                Every Sunday
              </p>
              <p className="text-[44px] md:text-[56px] font-bold tracking-[-0.04em] text-white leading-none">
                7:30 <span className="text-[24px] md:text-[28px] font-semibold text-white/50">AM GMT</span>
              </p>
              <p className="text-[15px] text-white/50 mt-6 leading-[1.6]">
                Worship, the Word, and fellowship. Come as you are and experience the presence of God.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
