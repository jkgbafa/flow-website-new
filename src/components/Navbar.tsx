"use client";

import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { label: "About", href: "#about" },
    { label: "Schedule", href: "#schedule" },
    { label: "Gallery", href: "#gallery" },
    { label: "Watch", href: "#connect" },
    { label: "Blog", href: "#blog" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/95 backdrop-blur-lg border-b border-black/[0.04]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 md:px-12 h-20 flex items-center justify-between">
        {/* flow. wordmark */}
        <a
          href="#"
          className="text-[1.4rem] font-bold tracking-[-0.02em]"
          style={{ fontFamily: "var(--font-body)" }}
        >
          flow<span className="text-gold">.</span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[12px] font-medium uppercase tracking-[0.18em] text-gray-400 hover:text-black transition-colors duration-300"
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="https://www.youtube.com/@TheresPowerHere"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-2 bg-black text-white text-[12px] font-semibold uppercase tracking-[0.1em] px-6 py-3 rounded-full hover:bg-gold hover:text-black transition-all duration-300"
        >
          Watch Live
        </a>

        {/* Mobile toggle */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`w-5 h-[1.5px] bg-black transition-all duration-300 origin-center ${
              menuOpen ? "rotate-45 translate-y-[6.5px]" : ""
            }`}
          />
          <span
            className={`w-5 h-[1.5px] bg-black transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-5 h-[1.5px] bg-black transition-all duration-300 origin-center ${
              menuOpen ? "-rotate-45 -translate-y-[6.5px]" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden bg-white transition-all duration-400 overflow-hidden ${
          menuOpen ? "max-h-[400px] opacity-100 border-t border-gray-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-8 py-6 flex flex-col gap-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-gray-500 font-medium py-3 text-[15px] hover:text-black transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a
            href="https://www.youtube.com/@TheresPowerHere"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 bg-black text-white text-[13px] font-semibold px-6 py-3.5 rounded-full text-center"
          >
            Watch Live
          </a>
        </div>
      </div>
    </nav>
  );
}
