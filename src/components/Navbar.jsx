import { useState, useEffect } from 'react'

export default function Navbar({ onToggleTerminal }) {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const dark = saved === 'dark' || (!saved && prefersDark)
    setIsDark(dark)
    document.documentElement.classList.toggle('dark', dark)
  }, [])

  const toggleDark = () => {
    const next = !isDark
    setIsDark(next)
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }

  return (
    <nav className="fixed top-0 w-full z-50 px-6 py-4 mix-blend-difference">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <a
          href="#"
          className="font-serif text-2xl font-bold tracking-tighter hover:italic transition-all cursor-none text-retro-cream"
          data-cursor
        >
          ck0x
        </a>
        <div className="flex items-center gap-6">
          <button
            onClick={onToggleTerminal}
            className="font-mono text-xs uppercase tracking-widest hover:text-retro-terra dark:hover:text-retro-mustard transition-colors cursor-none text-retro-cream"
            data-cursor
          >
            [~/console]
          </button>
          <button
            onClick={toggleDark}
            className="w-10 h-10 rounded-full border-2 border-retro-cream text-retro-cream flex items-center justify-center hover:bg-retro-terra hover:text-white dark:hover:bg-retro-mustard dark:hover:text-retro-navy transition-all cursor-none"
            data-cursor
          >
            {isDark ? '☾' : '☀'}
          </button>
        </div>
      </div>
    </nav>
  )
}
