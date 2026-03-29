"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { socialLinks } from "@/lib/socials";

const navLinks = [
  { label: "ABOUT", href: "#about" },
  { label: "SCHEDULE", href: "#schedule" },
  { label: "WATCH", href: "#connect" },
  { label: "GIVE", href: "#give" },
  { label: "CONNECT", href: "#stay-connected" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-black/80 backdrop-blur-md border-b border-white/5" : "bg-transparent"
      }`}
    >
      <div className="w-full px-3 sm:px-6 lg:px-10 h-16 sm:h-20 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center shrink-0">
          <Image
            src="/images/flow/flow-logo-white.png"
            alt="FLOW"
            width={70}
            height={28}
            className="object-contain sm:w-[80px]"
          />
        </a>

        {/* Nav links — always visible, horizontal */}
        <div className="flex items-center gap-3 sm:gap-5 lg:gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[10px] sm:text-[11px] lg:text-[13px] font-medium tracking-[0.03em] sm:tracking-[0.05em] text-white/70 hover:text-white transition-colors relative group whitespace-nowrap"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-accent to-accent-light group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>

        {/* Right: social icons */}
        <div className="flex items-center gap-0.5 sm:gap-1">
          {socialLinks.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-white/40 ${s.hoverColor} transition-colors p-1.5 sm:p-2.5 rounded-full hover:bg-white/5`}
              title={s.label}
            >
              <span className="[&_svg]:w-3 [&_svg]:h-3 sm:[&_svg]:w-4 sm:[&_svg]:h-4">
                {s.icon}
              </span>
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
