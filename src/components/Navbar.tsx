"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/80 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <div className="max-w-[980px] mx-auto px-6 h-12 flex items-center justify-between">
        {/* Logo */}
        <a href="#">
          <Image
            src="/images/flow/flow-logo-black.png"
            alt="FLOW"
            width={56}
            height={22}
            className="object-contain"
          />
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[12px] text-[#1d1d1f]/70 hover:text-[#1d1d1f] transition-colors"
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
          className="hidden md:inline-flex text-[12px] text-accent hover:text-accent-light transition-colors"
        >
          Watch Live
        </a>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden bg-white/95 backdrop-blur-xl transition-all duration-300 overflow-hidden ${
          menuOpen ? "max-h-[320px] border-t border-black/5" : "max-h-0"
        }`}
      >
        <div className="max-w-[980px] mx-auto px-6 py-4 flex flex-col gap-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[14px] text-[#1d1d1f]/80 py-2"
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a
            href="https://www.youtube.com/@TheresPowerHere"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[14px] text-accent font-medium py-2"
          >
            Watch Live
          </a>
        </div>
      </div>
    </nav>
  );
}
