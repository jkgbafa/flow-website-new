"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";

interface Photo {
  src: string;
  alt: string;
  label: string;
  wide: boolean;
}

const photos: Photo[] = [
  { src: "/images/flow/zoom-prayer.jpg", alt: "Global prayer on Zoom", label: "Global", wide: true },
  { src: "/images/flow/prayer-is-the-work.jpg", alt: "Prayer Is The Work", label: "S12 E13", wide: false },
  { src: "/images/flow/worship-hands.jpg", alt: "Worship", label: "S12 E14", wide: false },
  { src: "/images/flow/flow-shirt.jpg", alt: "Flexible Lovers Of The Word", label: "S12 E15", wide: false },
  { src: "/images/flow/singers.jpg", alt: "FLOW singers", label: "S12 E15", wide: false },
  { src: "/images/flow/worship-team.jpg", alt: "Worship team", label: "S12 E7", wide: true },
];

function GalleryItem({ photo, index }: { photo: Photo; index: number }) {
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
    <div ref={ref} className={photo.wide ? "col-span-1 md:col-span-2" : "col-span-1"}>
      <div
        className="relative overflow-hidden rounded-[20px] group"
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
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes={photo.wide ? "(max-width: 768px) 100vw, 80vw" : "(max-width: 768px) 50vw, 40vw"}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <div className="absolute bottom-5 left-5 md:bottom-6 md:left-6">
          <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-white/70">
            {photo.label}
          </span>
        </div>
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
    <section id="gallery" className="py-28 md:py-40">
      <div className="max-w-[980px] mx-auto px-6">
        <div ref={ref} className={`reveal ${visible ? "visible" : ""} text-center mb-14`}>
          <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-accent mb-3">
            Gallery
          </p>
          <h2 className="text-[40px] md:text-[56px] font-bold leading-[1.05] tracking-[-0.03em] text-[#1d1d1f]">
            Moments of power.
          </h2>
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
