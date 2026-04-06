import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Loader from "./components/Loader";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import Terminal from "./components/Terminal";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Work from "./components/Work";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

// Make sure you created these two in src/pages/
import Admin from "./pages/Admin";
import Dashboard from "./pages/Dashboard";

// ─── 1. We define Home right here so you don't need a separate Home.jsx file ───
function Home() {
  const [loaded, setLoaded] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);

  // Global keyboard shortcut for terminal (backtick / tilde)
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "`" || e.key === "~") {
        e.preventDefault();
        setTerminalOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const toggleTerminal = () => setTerminalOpen((prev) => !prev);

  return (
    <div className="paper-texture text-retro-navy dark:text-retro-cream transition-colors duration-500 overflow-x-hidden">
      {/* Grain overlay */}
      <div className="grain-overlay" />

      {/* Loader — shown until countdown completes */}
      {!loaded && <Loader onDone={() => setLoaded(true)} />}

      {/* Navigation */}
      <Navbar onToggleTerminal={toggleTerminal} />

      {/* Slide-up terminal */}
      <Terminal open={terminalOpen} onClose={() => setTerminalOpen(false)} />

      {/* Page sections */}
      <main>
        <Hero onToggleTerminal={toggleTerminal} />
        <About />
        <Skills />
        <Work />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

// ─── 2. This is the main App component that handles the routing ───
export default function App() {
  return (
    <Router>
      {/* Custom Cursor stays global so it works on all pages */}
      <CustomCursor />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}