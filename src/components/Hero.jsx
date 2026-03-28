import { useEffect, useRef } from 'react'

export default function Hero({ onToggleTerminal }) {
  const sectionRef = useRef(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.querySelectorAll('.reveal').forEach(r => r.classList.add('active')) },
      { threshold: 0.1 }
    )
    observer.observe(el)
    // Trigger immediately since it's the first section
    el.querySelectorAll('.reveal').forEach((r) => setTimeout(() => r.classList.add('active'), 200))
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden px-6"
    >
      {/* Background blobs */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-retro-mustard/20 rounded-full blur-3xl animate-float" />
      <div
        className="absolute bottom-20 right-10 w-96 h-96 bg-retro-teal/20 geo-shape blur-3xl animate-float"
        style={{ animationDelay: '2s' }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="reveal">
          <p className="font-mono text-retro-terra dark:text-retro-mustard mb-4 tracking-widest text-sm uppercase">
            Frontend Developer // Est. 2025
          </p>
          <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl font-black leading-none mb-6 mix-blend-multiply dark:mix-blend-normal">
            <span
              className="block transform -rotate-2 hover:rotate-0 transition-transform duration-500 cursor-none"
              data-cursor
            >
              Front End
            </span>
            <span
              className="block text-transparent bg-clip-text bg-gradient-to-r from-retro-terra to-retro-mustard transform rotate-1 hover:rotate-0 transition-transform duration-500 ml-8 md:ml-20 cursor-none"
              data-cursor
            >
              Developer
            </span>
          </h1>
          <p className="font-mono text-lg md:text-xl max-w-md mt-8 border-l-4 border-retro-teal pl-6">
            Expert React Native developer crafting high-performance, minimalist apps.
          </p>
        </div>

        <div className="mt-12 flex gap-4 reveal">
          <a
            href="#work"
            className="group relative px-8 py-4 bg-retro-terra text-retro-cream font-mono font-bold rounded-full overflow-hidden cursor-none"
            data-cursor
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            <span className="relative z-10 group-hover:text-retro-navy transition-colors">
              View Work ↓
            </span>
            <div className="absolute inset-0 bg-retro-mustard transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
          </a>
          <button
            onClick={onToggleTerminal}
            className="px-8 py-4 border-2 border-retro-navy dark:border-retro-cream font-mono font-bold rounded-full hover:bg-retro-navy hover:text-retro-cream dark:hover:bg-retro-cream dark:hover:text-retro-navy transition-all cursor-none"
            data-cursor
          >
            $ Terminal
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-current rounded-full flex justify-center p-2">
          <div className="w-1 h-2 bg-current rounded-full" />
        </div>
      </div>
    </section>
  )
}
