import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="outline-none flex-1 flex flex-col">
        <HeroSection />
      </main>
    </>
  );
}
