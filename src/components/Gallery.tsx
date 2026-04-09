"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";

interface Photo {
  src: string;
  alt: string;
  wide: boolean;
}

const photos: Photo[] = [
  { src: "/images/flow/zoom-prayer.jpg", alt: "Global prayer on Zoom", wide: true },
  { src: "/images/flow/praying-1.jpg", alt: "Dag Heward-Mills leading prayer", wide: false },
  { src: "/images/flow/join-flow.jpg", alt: "Join FLOW", wide: false },
  { src: "/images/flow/flow-shirt.jpg", alt: "Flexible Lovers Of The Word", wide: false },
  { src: "/images/flow/singers.jpg", alt: "FLOW singers", wide: false },
  { src: "/images/flow/land.jpg", alt: "FLOW Prayer Meeting", wide: true },
];

function GalleryItem({ photo, index }: { photo: Photo; index: number }) {
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
    <div ref={ref} className={photo.wide ? "col-span-2" : "col-span-1"}>
      <div
        className="relative overflow-hidden rounded-2xl group"
        style={{
          aspectRatio: photo.wide ? "2/1" : "3/4",
          clipPath: visible ? "circle(150% at 50% 50%)" : "circle(0% at 50% 50%)",
          transition: `clip-path 1.2s cubic-bezier(0.25, 0.1, 0.25, 1) ${index * 0.08}s`,
        }}
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          className={`object-cover transition-transform duration-700 group-hover:scale-105 ${photo.wide ? "" : "object-top"}`}
          sizes={photo.wide ? "(max-width: 768px) 100vw, 80vw" : "(max-width: 768px) 50vw, 40vw"}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </div>
    </div>
  );
}

export default function Gallery() {
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
    <section id="gallery" className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black" />
      <div className="absolute inset-0 dot-texture" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`reveal ${visible ? "visible" : ""} text-center mb-16`}>
          <h2 className="text-5xl md:text-6xl font-bold text-white tracking-tight">
            Moments of Power
          </h2>
          <div className="mx-auto mt-6 h-1 w-48 bg-gradient-to-r from-accent via-accent-light to-accent rounded-full" />
        </div>

        <div className="grid grid-cols-2 gap-3 md:gap-4">
          {photos.map((photo, i) => (
            <GalleryItem key={photo.src} photo={photo} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
