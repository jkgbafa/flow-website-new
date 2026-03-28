import Image from "next/image";

export default function Banner() {
  return (
    <section className="relative w-full pt-12">
      <div className="relative w-full" style={{ aspectRatio: "16/7" }}>
        <Image
          src="/images/flow/banner.png"
          alt="FLOW Season 12"
          fill
          className="object-cover object-top"
          sizes="100vw"
          priority
        />
        {/* Fade to white at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </div>
    </section>
  );
}
