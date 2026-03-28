import { useState, useEffect } from 'react'
import Loader from './components/Loader'
import CustomCursor from './components/CustomCursor'
import Navbar from './components/Navbar'
import Terminal from './components/Terminal'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Work from './components/Work'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const [terminalOpen, setTerminalOpen] = useState(false)

  // Global keyboard shortcut for terminal (backtick / tilde)
  useEffect(() => {
    const handler = (e) => {
      if (e.key === '`' || e.key === '~') {
        e.preventDefault()
        setTerminalOpen((prev) => !prev)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const toggleTerminal = () => setTerminalOpen((prev) => !prev)

  return (
    <div className="paper-texture text-retro-navy dark:text-retro-cream transition-colors duration-500 overflow-x-hidden">
      {/* Grain overlay */}
      <div className="grain-overlay" />

      {/* Custom cursor (desktop only) */}
      <CustomCursor />

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
  )
}
