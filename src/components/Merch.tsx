"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";

const products = [
  {
    name: "Flexible (F.L.O.W) Tee",
    price: "$25.00",
    href: "https://church-shop.fourthwall.com/products/flexible-f-l-o-w-tee",
    image:
      "https://imgproxy.fourthwall.com/w9FXzrp4p8HneLStPJCjoaKw7cfmX6loe15mzrqr5NA/w:720/sm:1/enc/LtFMiGy6q8_7VVjD/LtgOp1KF1omUorkN/SVonKbXavfBjkGuw/CtTaxOhesEXMX5cb/n7J9DggSoO9Gp8j3/Z-qK6lY90LVj9a8a/w161RXCVVQ4qQ77R/JOTV0WKDZqwX05G0/CrmptgXmZ_X-MH8r/IjHm5NhJz5b5if1p/4LNKIidK6bKwh9we/91t67ZanhGak09pQ/394S7zdj8TnRl2Ak/MbskmJxGAU1Eo74-/v9MTsXBbYbE",
  },
  {
    name: "Prayer is the Work Tee",
    price: "$25.00",
    href: "https://church-shop.fourthwall.com/products/prayer-is-the-work-tee",
    image:
      "https://imgproxy.fourthwall.com/Rb0gUgMnunJa97RWZK7dximoQ-M3fHJq3tmoBeF6mis/w:720/sm:1/enc/gGF9VEbcSCmPxTGS/oaHtpDQOJWJRDOXr/M9rgFoRvwOJ0SlSe/2Q5QvqqOZ_1RhBfO/N665b66CQBYpnimx/EClJPdF8LXVG6DtV/caaVEcxKHppjfRbB/TFDRYzpCjgL6uIIi/pYDLy45epb02ibgE/WjDZwcYDf6Pt15jX/LdVO4Oe9EtJSSXKB/tDuvtIHlcNCOP2_b/cXbsDpd6FAWvCXnn/-dLor_NJxa5lICqL/Tp9b-BVbin4",
  },
  {
    name: "There's Power Here Tee",
    price: "$25.00",
    href: "https://church-shop.fourthwall.com/products/theres-power-here-tee",
    image:
      "https://imgproxy.fourthwall.com/W0UXZ0u4M8O08Sgdp4N8baUDgYNoIaz6eQ7XZ2qeces/w:720/sm:1/enc/PYKaGcDS0KHDoKYc/gzBupEdpl8gagISJ/vFgUMDKbu3cNxL9c/vCTKINvax7ErTLb8/juAnhGZabOeMCzaX/A0jTQG0tygtjhs6V/FGAqZ3JYe5yi9Flu/CW6HspS_zo6svL-f/2BFm4-bDf-EgyNlI/4QpSK5lGmIB0gJuU/2DAQ-gIak0kvrJV7/xYsa85Hq9C4a-5N2/qa_KBZTUIl8kQlA1/NIfrjOAlaHOKoax7/hwKxOrLQk-M",
  },
  {
    name: "People Who Pray Are Survivors Tee",
    price: "$25.00",
    href: "https://church-shop.fourthwall.com/products/people-who-pray-are-survivors-tee",
    image:
      "https://imgproxy.fourthwall.com/4TVgxcBZhkHDEVJG7111L8184hGVYPmOwRD24HnO6PA/w:720/sm:1/enc/9K83ekgyv2XA58iR/vtZSCBzU-yXvgIFR/d8A2iGvxP-ltaKlV/P8LsAfLnMd6sOUNw/a2C3XNTsr2Rr8Cv1/FTQtj9ESVbTWkc8k/TEF3qEisKnpB3l_-/TWf2gNEBk9-Geuhz/_9U9-GDEN8KEDdGR/gKhxlMbe5f1Oax7u/USSRCyWtbSE4kOtX/IGwL8zLn8ewKCtDy/x9AXYKW75MYDDWpG/xCCXnHWnd4m5h4z-/qVyKq4xDbWc",
  },
];

export default function Merch() {
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
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="merch" className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />
      <div className="absolute inset-0 dot-texture" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={`reveal ${visible ? "visible" : ""} text-center mb-16`}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white tracking-tight">
            Merch
          </h2>
          <div className="mx-auto mt-6 h-1 w-48 bg-gradient-to-r from-accent via-accent-light to-accent rounded-full" />
          <p className="text-xl text-white/50 mt-6 max-w-lg mx-auto leading-relaxed">
            Wear the message. Rep FLOW wherever you go.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p, i) => (
            <a
              key={p.name}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`reveal ${visible ? "visible" : ""} group glass rounded-2xl overflow-hidden hover:border-white/20 transition-all`}
              style={{ transitionDelay: `${(i + 1) * 0.1}s` }}
            >
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="p-5">
                <h3 className="text-sm font-semibold text-white leading-tight">
                  {p.name}
                </h3>
                <p className="text-accent font-bold mt-2">{p.price}</p>
              </div>
            </a>
          ))}
        </div>

        <div
          className={`reveal ${visible ? "visible" : ""} delay-3 text-center mt-12`}
        >
          <a
            href="https://church-shop.fourthwall.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block group relative px-10 py-5 rounded-2xl overflow-hidden"
          >
            <div className="absolute inset-0 glass-strong" />
            <div className="absolute inset-0 bg-gradient-to-r from-accent to-accent-light opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative text-[15px] font-semibold text-white tracking-wide">
              VIEW ALL MERCH
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
