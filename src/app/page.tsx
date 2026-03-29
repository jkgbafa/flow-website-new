import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Banner from "@/components/Banner";
import About from "@/components/About";
import PhotoReveal from "@/components/PhotoReveal";
import Schedule from "@/components/Schedule";
import Gallery from "@/components/Gallery";
import Connect from "@/components/Connect";
import Blog from "@/components/Blog";
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
        <Gallery />
        <Connect />
        <Blog />
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
