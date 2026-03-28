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
    alt: "Global Prayer — thousands of believers connected on Zoom",
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
    alt: "Flexible Lovers Of The Word",
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
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className={`${photo.wide ? "col-span-1 md:col-span-2" : "col-span-1"}`}>
      <div
        className="relative overflow-hidden rounded-[20px] group cursor-pointer"
        style={{
          aspectRatio: photo.wide ? "2/1" : "3/4",
          clipPath: visible
            ? "circle(150% at 50% 50%)"
            : "circle(0% at 50% 50%)",
          transition: `clip-path 1.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.1}s`,
        }}
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes={photo.wide ? "(max-width: 768px) 100vw, 80vw" : "(max-width: 768px) 50vw, 33vw"}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-gold">
            {photo.label}
          </span>
          <p className="text-white font-medium mt-1.5 text-sm md:text-base">
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
    <section id="gallery" className="py-32 md:py-48 bg-white">
      <div className="max-w-6xl mx-auto px-8 md:px-12">
        <div
          ref={ref}
          className={`reveal ${visible ? "visible" : ""} text-center mb-16`}
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-gold mb-4">
            Gallery
          </p>
          <h2
            className="text-4xl md:text-6xl tracking-[-0.02em]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <span className="italic">Moments of Power</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4 md:gap-6">
          {photos.map((photo, i) => (
            <GalleryItem key={photo.src} photo={photo} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
