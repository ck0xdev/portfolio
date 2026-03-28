import { useState, useEffect } from 'react'

export default function Loader({ onDone }) {
  const [count, setCount] = useState(3)
  const [hiding, setHiding] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          setTimeout(() => {
            setHiding(true)
            setTimeout(onDone, 1000)
          }, 500)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [onDone])

  return (
    <div
      className="fixed inset-0 z-[9999] bg-retro-cream dark:bg-retro-navy flex flex-col items-center justify-center transition-transform duration-1000"
      style={{ transform: hiding ? 'translateY(-100%)' : 'translateY(0)' }}
    >
      <div className="relative">
        <div className="w-32 h-32 border-4 border-retro-terra dark:border-retro-mustard rounded-full flex items-center justify-center animate-pulse">
          <span className="font-mono text-4xl font-bold loader-count text-retro-navy dark:text-retro-cream">
            {count}
          </span>
        </div>
        <div
          className="absolute -inset-4 border-2 border-dashed border-retro-teal rounded-full animate-spin"
          style={{ animationDuration: '10s' }}
        />
      </div>
      <p className="mt-8 font-mono text-sm tracking-widest uppercase animate-pulse text-retro-navy dark:text-retro-cream">
        Loading Experience...
      </p>
      <div className="mt-4 w-48 h-1 bg-retro-navy/20 dark:bg-retro-cream/20 rounded-full overflow-hidden">
        <div
          className="h-full bg-retro-terra dark:bg-retro-mustard"
          style={{
            width: `${((3 - count) / 3) * 100}%`,
            transition: 'width 1s ease-out',
          }}
        />
      </div>
    </div>
  )
}
