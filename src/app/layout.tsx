import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
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
    <html lang="en" className={`${montserrat.variable} antialiased`}>
      <body className="bg-white text-[#1d1d1f]">{children}</body>
    </html>
  );
}
