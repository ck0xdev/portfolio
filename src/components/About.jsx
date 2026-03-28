import { useReveal } from '../hooks/useReveal'

export default function About() {
  const ref = useReveal()

  return (
    <section id="about" ref={ref} className="py-32 px-6 relative">
      <div className="max-w-4xl mx-auto">
        <div className="reveal">
          <h2 className="font-serif text-5xl md:text-7xl font-bold mb-12 text-retro-terra dark:text-retro-mustard">
            About
          </h2>
          <div className="bg-white/50 dark:bg-black/30 backdrop-blur-sm p-8 md:p-12 rounded-3xl border border-retro-terra/20 shadow-2xl transform hover:scale-[1.02] transition-transform duration-500">
            <p className="font-mono text-lg md:text-2xl leading-relaxed">
              I'm a Frontend Developer. I build clean, high-performance interfaces with futuristic
              technology. Specializing in{' '}
              <span className="bg-retro-mustard/30 px-2 py-1 rounded">React</span>,{' '}
              <span className="bg-retro-teal/30 px-2 py-1 rounded">Tailwind CSS</span>, and{' '}
              <span className="bg-retro-terra/30 px-2 py-1 rounded">Python</span> — delivering
              pixel-perfect, scalable web solutions.
            </p>
            <div className="mt-8 flex gap-4 flex-wrap">
              {['HTML', 'CSS', 'JavaScript', 'TailwindCSS', 'React'].map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-retro-cream dark:bg-retro-navy rounded-full font-mono text-xs border border-current opacity-70"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
