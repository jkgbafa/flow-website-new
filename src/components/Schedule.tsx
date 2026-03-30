"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";

interface TimeZone {
  country: string;
  flag: string;
  time: string;
  tz: string;
}

interface Event {
  day: string;
  name: string;
  time: string;
  tz: string;
  image: string;
  zones: TimeZone[];
}

const events: Event[] = [
  {
    day: "Tuesday",
    name: "FLOW Prayer Meeting",
    time: "4:30 AM",
    tz: "GMT",
    image: "/images/flow/podium-prayer.jpg",
    zones: [
      { country: "Ghana", flag: "\u{1F1EC}\u{1F1ED}", time: "4:30 AM", tz: "GMT" },
      { country: "UK", flag: "\u{1F1EC}\u{1F1E7}", time: "5:30 AM", tz: "BST" },
      { country: "Nigeria", flag: "\u{1F1F3}\u{1F1EC}", time: "5:30 AM", tz: "WAT" },
      { country: "USA", flag: "\u{1F1FA}\u{1F1F8}", time: "11:30 PM", tz: "EST" },
      { country: "South Africa", flag: "\u{1F1FF}\u{1F1E6}", time: "6:30 AM", tz: "SAST" },
      { country: "Australia", flag: "\u{1F1E6}\u{1F1FA}", time: "2:00 PM", tz: "ACST" },
    ],
  },
  {
    day: "Friday",
    name: "FLOW Prayer Meeting",
    time: "4:30 AM",
    tz: "GMT",
    image: "/images/flow/join-flow.jpg",
    zones: [
      { country: "Ghana", flag: "\u{1F1EC}\u{1F1ED}", time: "4:30 AM", tz: "GMT" },
      { country: "UK", flag: "\u{1F1EC}\u{1F1E7}", time: "5:30 AM", tz: "BST" },
      { country: "Nigeria", flag: "\u{1F1F3}\u{1F1EC}", time: "5:30 AM", tz: "WAT" },
      { country: "USA", flag: "\u{1F1FA}\u{1F1F8}", time: "11:30 PM", tz: "EST" },
      { country: "South Africa", flag: "\u{1F1FF}\u{1F1E6}", time: "6:30 AM", tz: "SAST" },
      { country: "Australia", flag: "\u{1F1E6}\u{1F1FA}", time: "2:00 PM", tz: "ACST" },
    ],
  },
  {
    day: "Sunday",
    name: "FLOW Sunday Service",
    time: "9:00 AM",
    tz: "GMT",
    image: "/images/flow/flow-shirt.jpg",
    zones: [
      { country: "Ghana", flag: "\u{1F1EC}\u{1F1ED}", time: "9:00 AM", tz: "GMT" },
      { country: "UK", flag: "\u{1F1EC}\u{1F1E7}", time: "10:00 AM", tz: "BST" },
      { country: "Nigeria", flag: "\u{1F1F3}\u{1F1EC}", time: "10:00 AM", tz: "WAT" },
      { country: "USA", flag: "\u{1F1FA}\u{1F1F8}", time: "4:00 AM", tz: "EST" },
      { country: "South Africa", flag: "\u{1F1FF}\u{1F1E6}", time: "11:00 AM", tz: "SAST" },
      { country: "Australia", flag: "\u{1F1E6}\u{1F1FA}", time: "6:30 PM", tz: "ACST" },
    ],
  },
];

// Meeting times in UTC: [dayOfWeek (0=Sun), hour, minute]
const MEETINGS: [number, number, number][] = [
  [0, 9, 0],   // Sunday 9:00 AM GMT
  [2, 4, 30],  // Tuesday 4:30 AM GMT
  [5, 4, 30],  // Friday 4:30 AM GMT
];

function getNextMeeting() {
  const now = new Date();
  let closest: { ms: number; label: string } | null = null;

  for (const [dow, h, m] of MEETINGS) {
    // Try this week and next week
    for (let weekOffset = 0; weekOffset <= 1; weekOffset++) {
      const target = new Date(now);
      const currentDow = target.getUTCDay();
      let daysAhead = dow - currentDow;
      if (daysAhead < 0) daysAhead += 7;
      daysAhead += weekOffset * 7;
      target.setUTCDate(target.getUTCDate() + daysAhead);
      target.setUTCHours(h, m, 0, 0);

      const diff = target.getTime() - now.getTime();
      if (diff > 0 && (!closest || diff < closest.ms)) {
        const dayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][dow];
        closest = { ms: diff, label: dayName };
      }
    }
  }
  return closest!;
}

function Countdown() {
  const calc = useCallback(() => {
    const next = getNextMeeting();
    const totalSec = Math.floor(next.ms / 1000);
    const days = Math.floor(totalSec / 86400);
    const hours = Math.floor((totalSec % 86400) / 3600);
    const minutes = Math.floor((totalSec % 3600) / 60);
    const seconds = totalSec % 60;
    return { days, hours, minutes, seconds, label: next.label };
  }, []);

  const [time, setTime] = useState(calc);

  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1_000);
    return () => clearInterval(id);
  }, [calc]);

  return (
    <div className="text-center mb-16">
      <p className="text-accent text-[11px] font-semibold tracking-[0.15em] uppercase mb-4">
        Next FLOW Meeting — {time.label}
      </p>
      <div className="flex justify-center gap-6 sm:gap-10">
        {[
          { value: time.days, unit: "Days" },
          { value: time.hours, unit: "Hours" },
          { value: time.minutes, unit: "Min" },
          { value: time.seconds, unit: "Sec" },
        ].map((t) => (
          <div key={t.unit} className="text-center">
            <span className="text-5xl sm:text-6xl font-bold text-white tabular-nums">
              {String(t.value).padStart(2, "0")}
            </span>
            <p className="text-[11px] text-white/40 uppercase tracking-wider mt-2 font-medium">
              {t.unit}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function EventCard({ event, index }: { event: Event; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [showZones, setShowZones] = useState(false);

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
      <div className="relative rounded-3xl overflow-hidden hover:border-white/20 transition-colors text-center">
        <div className="absolute inset-0">
          <Image
            src={event.image}
            alt={event.day}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-black/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>
        <div className="relative glass rounded-3xl p-8" style={{ background: "rgba(0,0,0,0.3)" }}>
          <span className="inline-block text-accent text-[12px] font-semibold tracking-widest uppercase mb-4">
            {event.day}
          </span>
          <h3 className="text-lg font-semibold text-white mb-4">{event.name}</h3>
          <p className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            {event.time}
          </p>
          <p className="text-lg font-medium text-white/40 mt-1">{event.tz}</p>

          {/* Timezone toggle */}
          <button
            onClick={() => setShowZones(!showZones)}
            className="mt-5 text-[11px] text-accent font-semibold tracking-wide uppercase hover:text-accent-light transition-colors"
          >
            {showZones ? "Hide" : "View"} Time Zones
            <svg
              className={`w-3 h-3 inline-block ml-1 transition-transform ${showZones ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Timezone grid */}
          <div
            className={`overflow-hidden transition-all duration-300 ${
              showZones ? "max-h-[300px] mt-5 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
              {event.zones.map((z) => (
                <div
                  key={z.country}
                  className="bg-white/5 rounded-xl px-3 py-2.5 text-center"
                >
                  <span className="text-lg">{z.flag}</span>
                  <p className="text-[10px] text-white/50 font-medium mt-1 uppercase tracking-wider">
                    {z.country}
                  </p>
                  <p className="text-[13px] text-white font-semibold">
                    {z.time}
                  </p>
                  <p className="text-[9px] text-white/30 font-medium">{z.tz}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Schedule() {
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
    <section id="schedule" className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />
      <div className="absolute inset-0 dot-texture" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`reveal ${visible ? "visible" : ""} text-center mb-16`}>
          <h2 className="text-5xl md:text-6xl font-bold text-white tracking-tight">
            Weekly Schedule
          </h2>
          <div className="mx-auto mt-6 h-1 w-48 bg-gradient-to-r from-accent via-accent-light to-accent rounded-full" />
        </div>

        <Countdown />

        <div className="grid md:grid-cols-3 gap-6">
          {events.map((event, i) => (
            <EventCard key={event.day} event={event} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
