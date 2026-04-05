"use client";

import { useRef, useEffect, useState } from "react";

export default function Salvation() {
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
    <section id="salvation" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgb(0,0,0),rgb(41,0,0),rgb(0,0,0))]" />
      <div className="absolute inset-0 dot-texture" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/10 rounded-full blur-3xl" />

      <div ref={ref} className="relative max-w-3xl mx-auto px-4 text-center">
        <div className={`reveal ${visible ? "visible" : ""}`}>
          <div className="mx-auto w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mb-8">
            <svg className="w-10 h-10 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-white tracking-tight">
            Did You Give Your<br />Life to Christ?
          </h2>
          <div className="mx-auto mt-6 h-1 w-48 bg-gradient-to-r from-accent via-accent-light to-accent rounded-full" />
          <p className="text-xl text-white/50 mt-6 max-w-lg mx-auto leading-relaxed">
            If you made a decision to accept Jesus Christ as your Lord and Saviour during a FLOW Prayer Meeting, we would love to hear from you and help you on this journey.
          </p>
          <p className="text-lg text-white/40 mt-4 max-w-lg mx-auto leading-relaxed">
            Let us know so we can connect you with resources, prayer, and a community of believers to support your walk with God.
          </p>
        </div>

        <div className={`reveal ${visible ? "visible" : ""} delay-2 mt-12 grid sm:grid-cols-2 gap-5 max-w-xl mx-auto`}>
          {/* WhatsApp */}
          <a
            href="https://wa.me/233550669630?text=Hello%2C%20I%20gave%20my%20life%20to%20Christ%20during%20a%20FLOW%20Prayer%20Meeting"
            target="_blank"
            rel="noopener noreferrer"
            className="group glass rounded-2xl p-6 hover:border-white/20 transition-colors text-center"
          >
            <div className="mx-auto w-14 h-14 rounded-full bg-[#25D366]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-7 h-7 text-[#25D366]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </div>
            <p className="text-sm font-semibold text-white mb-1">WhatsApp</p>
            <p className="text-[13px] text-white/40 select-all">+233 55 066 9630</p>
          </a>

          {/* Email */}
          <a
            href="mailto:connect@theflowchurch.online?subject=I%20Gave%20My%20Life%20to%20Christ%20at%20FLOW"
            className="group glass rounded-2xl p-6 hover:border-white/20 transition-colors text-center"
          >
            <div className="mx-auto w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-7 h-7 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-sm font-semibold text-white mb-1">E-mail</p>
            <p className="text-[13px] text-white/40 select-all">connect@theflowchurch.online</p>
          </a>
        </div>
      </div>
    </section>
  );
}
