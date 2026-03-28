import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FLOW | There's Power Here",
  description:
    "Join millions of believers worldwide in online prophetic prayer meetings led by Dag Heward-Mills. Flexible Lovers Of The Word. Tuesdays & Fridays at 4AM GMT.",
  openGraph: {
    title: "FLOW | There's Power Here",
    description:
      "Online Prophetic Prayer Meetings led by Dag Heward-Mills. Join FLOW — Flexible Lovers Of The Word.",
    images: ["/images/flow/banner.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-black">
        {children}
      </body>
    </html>
  );
}
