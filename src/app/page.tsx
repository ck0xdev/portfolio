import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Animations from '@/components/Animations';
import ScrollMotion from '@/components/ScrollMotion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Preloader from '@/components/Preloader';
import CanvasBackground from '@/components/CanvasBackground';
import Interactivity from '@/components/Interactivity';
import LiquidScrollbar from '@/components/LiquidScrollbar';

export default function Home() {
    return (
        <>
            <Animations />
            <ScrollMotion />
            <LiquidScrollbar />
            <CanvasBackground />
            <Interactivity />

            <div className="quick-loader">
                <div className="spinner"></div>
            </div>

            <Preloader />

            <div className="white-dot"></div>
            <svg className="screen-frame-svg">
                <defs>
                    <filter id="soft-glow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="6" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>
                <path className="frame-path frame-path-left" filter="url(#soft-glow)" fill="none" stroke="#ffffff" strokeWidth="8"
                    strokeLinecap="round" strokeLinejoin="round" />
                <path className="frame-path frame-path-right" filter="url(#soft-glow)" fill="none" stroke="#ffffff" strokeWidth="8"
                    strokeLinecap="round" strokeLinejoin="round" />
            </svg>

            <div className="white-fill-box"></div>

            <div className="enter-prompt magnetic">
                <span>Click to Enter</span>
            </div>

            <div className="cursor-dot"></div>
            <div className="cursor-outline"></div>

            <Navigation />

            <main className="scroll-container">
                <Hero />
                <About />
                <Experience />
                <Projects />
                <Contact />
            </main>

            <Footer />
        </>
    );
}
