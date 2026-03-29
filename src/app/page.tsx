import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Banner from "@/components/Banner";
import About from "@/components/About";
import PhotoReveal from "@/components/PhotoReveal";
import Schedule from "@/components/Schedule";
import Gallery from "@/components/Gallery";
import Connect from "@/components/Connect";
import Blog from "@/components/Blog";
import Give from "@/components/Give";
import ShareLink from "@/components/ShareLink";
import PastoralCare from "@/components/PastoralCare";
import Testimony from "@/components/Testimony";
import StayConnected from "@/components/StayConnected";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Banner />
        <About />
        <PhotoReveal />
        <Schedule />
        <Connect />
        <Give />
        <ShareLink />
        <PastoralCare />
        <Testimony />
        <StayConnected />
        <Gallery />
        <Blog />
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
