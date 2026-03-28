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

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-[0_1px_0_rgba(0,0,0,0.05)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <Image
            src="/images/flow/logo.png"
            alt="Flow"
            width={36}
            height={36}
            className="rounded-lg"
          />
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-500">
          <a href="#about" className="hover:text-black transition-colors">
            About
          </a>
          <a href="#schedule" className="hover:text-black transition-colors">
            Schedule
          </a>
          <a href="#gallery" className="hover:text-black transition-colors">
            Gallery
          </a>
          <a href="#blog" className="hover:text-black transition-colors">
            Blog
          </a>
        </div>

        {/* CTA */}
        <a
          href="https://www.youtube.com/@TheresPowerHere"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex bg-black text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-gray-800 transition-colors"
        >
          Join Prayer
        </a>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`w-5 h-0.5 bg-black transition-all duration-300 ${
              menuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`w-5 h-0.5 bg-black transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-5 h-0.5 bg-black transition-all duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden bg-white border-t border-gray-100 transition-all duration-300 overflow-hidden ${
          menuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 py-4 flex flex-col gap-4">
          <a
            href="#about"
            className="text-gray-600 font-medium py-2"
            onClick={() => setMenuOpen(false)}
          >
            About
          </a>
          <a
            href="#schedule"
            className="text-gray-600 font-medium py-2"
            onClick={() => setMenuOpen(false)}
          >
            Schedule
          </a>
          <a
            href="#gallery"
            className="text-gray-600 font-medium py-2"
            onClick={() => setMenuOpen(false)}
          >
            Gallery
          </a>
          <a
            href="#blog"
            className="text-gray-600 font-medium py-2"
            onClick={() => setMenuOpen(false)}
          >
            Blog
          </a>
          <a
            href="https://www.youtube.com/@TheresPowerHere"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black text-white text-sm font-semibold px-5 py-3 rounded-full text-center"
          >
            Join Prayer
          </a>
        </div>
      </div>
    </nav>
  );
}
