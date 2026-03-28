import type { Metadata } from "next";
import { Instrument_Serif, Sora } from "next/font/google";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FLOW | There's Power Here",
  description:
    "Join millions of believers worldwide in online prophetic prayer meetings. Flexible Lovers Of The Word. Tuesdays & Fridays at 4:30 AM GMT.",
  metadataBase: new URL("https://flow-website-kohl.vercel.app"),
  openGraph: {
    title: "FLOW | There's Power Here",
    description:
      "Online Prophetic Prayer Meetings. Flexible Lovers Of The Word.",
    images: ["/images/flow/banner.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${sora.variable} antialiased`}
    >
      <body className="grain bg-white text-black">{children}</body>
    </html>
  );
}
