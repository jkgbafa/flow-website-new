"use client";

import { useRef, useEffect, useState } from "react";

const methods = [
  {
    region: "Worldwide",
    icon: "🌍",
    details: [
      { label: "Website", value: "flowoffering.com", link: "https://flowoffering.com" },
      { label: "MTN MoMo", value: "+233 53 042 9589" },
    ],
  },
  {
    region: "USA",
    icon: "🇺🇸",
    details: [
      { label: "Text to Give", value: "925-255-9050" },
      { label: "Instructions", value: "Text the amount + \"Flow\"" },
    ],
  },
  {
    region: "United Kingdom",
    icon: "🇬🇧",
    details: [
      { label: "Account Name", value: "First Love Church" },
      { label: "Account Number", value: "13830128" },
      { label: "Sort Code", value: "20-90-74" },
      { label: "Reference", value: "FLOW" },
    ],
  },
  {
    region: "Europe",
    icon: "🇪🇺",
    details: [
      { label: "Account Name", value: "First Love Church (Switzerland)" },
      { label: "IBAN", value: "CH2900231231168902400W" },
      { label: "Address", value: "Birgistrasse 7, 8304 Wallisellen" },
    ],
  },
  {
    region: "Ghana",
    icon: "🇬🇭",
    details: [
      { label: "MoMo", value: "053 042 9589" },
      { label: "Account Name", value: "The Flow Church" },
      { label: "Account Number", value: "0871081972" },
      { label: "Branch", value: "Kaneshie" },
      { label: "SWIFT", value: "BARCGHAC" },
    ],
  },
  {
    region: "PayPal",
    icon: "💳",
    details: [
      { label: "Search", value: "Lighthouse Chapel International" },
      { label: "Card/Visa/Apple Pay", value: "flowoffering.com", link: "https://flowoffering.com" },
    ],
  },
];

export default function Give() {
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
    <section id="give" className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />
      <div className="absolute inset-0 dot-texture" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`reveal ${visible ? "visible" : ""} text-center mb-16`}>
          <h2 className="text-5xl md:text-6xl font-bold text-white tracking-tight">
            Ways To Give
          </h2>
          <div className="mx-auto mt-6 h-1 w-48 bg-gradient-to-r from-accent via-accent-light to-accent rounded-full" />
          <p className="text-xl text-white/50 mt-6 max-w-lg mx-auto leading-relaxed">
            God bless you as you give. Your generosity makes a difference.
          </p>
        </div>

        {/* Main CTA */}
        <div className={`reveal ${visible ? "visible" : ""} delay-1 text-center mb-12`}>
          <a
            href="https://flowoffering.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block group relative px-10 py-5 rounded-2xl overflow-hidden"
          >
            <div className="absolute inset-0 glass-strong" />
            <div className="absolute inset-0 bg-gradient-to-r from-accent to-accent-light opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative text-[15px] font-semibold text-white tracking-wide">
              GIVE AT FLOWOFFERING.COM
            </span>
          </a>
        </div>

        {/* Giving methods grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {methods.map((m, i) => (
            <div
              key={m.region}
              className={`reveal ${visible ? "visible" : ""} glass rounded-2xl p-6 hover:border-white/20 transition-colors`}
              style={{ transitionDelay: `${(i + 2) * 0.08}s` }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{m.icon}</span>
                <h3 className="text-lg font-semibold text-white">{m.region}</h3>
              </div>
              <div className="space-y-2">
                {m.details.map((d) => (
                  <div key={d.label} className="flex flex-col">
                    <span className="text-[11px] text-white/30 uppercase tracking-wider font-medium">
                      {d.label}
                    </span>
                    {d.link ? (
                      <a
                        href={d.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-accent hover:text-accent-light transition-colors font-medium"
                      >
                        {d.value}
                      </a>
                    ) : (
                      <span className="text-sm text-white/70 font-medium select-all">
                        {d.value}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
