"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";

interface Photo {
  src: string;
  alt: string;
  label: string;
  caption: string;
  wide: boolean;
}

const photos: Photo[] = [
  {
    src: "/images/flow/zoom-prayer.jpg",
    alt: "Global Prayer on Zoom — thousands of believers connected",
    label: "Global",
    caption: "Believers connected worldwide",
    wide: true,
  },
  {
    src: "/images/flow/prayer-is-the-work.jpg",
    alt: "Dag Heward-Mills — Prayer Is The Work",
    label: "S12 · E13",
    caption: "Prayer is the work",
    wide: false,
  },
  {
    src: "/images/flow/worship-hands.jpg",
    alt: "Lifted hands in worship",
    label: "S12 · E14",
    caption: "Lifted in worship",
    wide: false,
  },
  {
    src: "/images/flow/flow-shirt.jpg",
    alt: "Flexible Lovers Of The Word t-shirt",
    label: "S12 · E15",
    caption: "Flexible Lovers Of The Word",
    wide: false,
  },
  {
    src: "/images/flow/singers.jpg",
    alt: "FLOW worship singers",
    label: "S12 · E15",
    caption: "Voices lifted together",
    wide: false,
  },
  {
    src: "/images/flow/worship-team.jpg",
    alt: "FLOW worship team with the cross",
    label: "S12 · E7",
    caption: "Worship in unity",
    wide: true,
  },
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
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className={photo.wide ? "col-span-2" : ""}>
      <div
        className="relative overflow-hidden rounded-2xl group cursor-pointer"
        style={{
          aspectRatio: photo.wide ? "16/9" : "3/4",
          clipPath: visible
            ? "circle(150% at 50% 50%)"
            : "circle(0% at 50% 50%)",
          transition: `clip-path 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.12}s`,
        }}
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes={photo.wide ? "100vw" : "(max-width: 768px) 100vw, 50vw"}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold">
            {photo.label}
          </span>
          <p className="text-white font-semibold mt-1 text-sm md:text-base">
            {photo.caption}
          </p>
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
    <section id="gallery" className="py-24 md:py-36 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div
          ref={ref}
          className={`reveal ${visible ? "visible" : ""} text-center mb-14`}
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-gold mb-3">
            Gallery
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Moments of Power
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
