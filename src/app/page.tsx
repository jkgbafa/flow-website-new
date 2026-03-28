import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Schedule from "@/components/Schedule";
import Gallery from "@/components/Gallery";
import Blog from "@/components/Blog";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Schedule />
        <Gallery />
        <Blog />
      </main>
      <Footer />
    </>
  );
}
