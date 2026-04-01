import { useReveal } from '../hooks/useReveal'

const ONGOING_PROJECTS = [
  {
    title: 'Portfolio',
    description: 'My current retro-modern developer portfolio built with Vite and React. Featuring a slide-up CLI terminal and interactive animations.',
    tags: ['Vite', 'React', 'Tailwind CSS'],
    href: 'https://ck0xdev.vercel.app/',
    accent: 'border-retro-teal',
    bg: 'bg-retro-teal/5'
  },
  
]

const COMPLETED_PROJECTS = [
  {
    title: 'ServeX',
    description: 'A modern web services platform with Firebase authentication and a neumorphic UI design.',
    tags: ['React', 'Firebase', 'Vite'],
    href: 'https://github.com/ck0xdev/ServeX',
    accent: 'border-retro-terra',
    bg: 'bg-retro-terra/5'
  },
  {
    title: 'DataXplore',
    description: 'College minor project focused on data visualization combining Python and interactive JS frontends.',
    tags: ['Python', 'HTML', 'Data Viz'],
    href: 'https://github.com/ck0xdev/dataXplore',
    accent: 'border-retro-terra',
    bg: 'bg-retro-terra/5'
  }
]

function ProjectCard({ project }) {
  return (
    <div className={`group p-6 rounded-2xl border-2 ${project.accent} ${project.bg} backdrop-blur-sm transition-all hover:scale-[1.02] hover:shadow-xl flex flex-col justify-between`}>
      <div>
        <h4 className="font-serif text-2xl font-bold mb-3">{project.title}</h4>
        <p className="font-mono text-sm opacity-80 mb-4">{project.description}</p>
        <div className="flex gap-2 flex-wrap mb-6">
          {project.tags.map(tag => (
            <span key={tag} className="text-[10px] font-mono border border-current px-2 py-0.5 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </div>
      <a 
        href={project.href} 
        target="_blank" 
        rel="noreferrer" 
        className="font-mono text-xs uppercase tracking-widest hover:underline inline-flex items-center gap-2"
        data-cursor
      >
        View Project →
      </a>
    </div>
  )
}

export default function Work() {
  const ref = useReveal()

  return (
    <section id="work" ref={ref} className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Brown Line: Main Heading */}
        <div className="reveal mb-20">
          <h2 className="font-serif text-5xl md:text-7xl font-bold text-retro-terra">
            Selected Work
          </h2>
          <div className="h-1 w-32 bg-retro-terra mt-4 opacity-50" />
        </div>

        {/* Blue Section: Currently Working */}
        <div className="reveal mb-24">
          <div className="flex items-center gap-4 mb-10">
            <h3 className="font-mono text-xl md:text-2xl text-retro-teal uppercase tracking-tighter font-bold">
              Currently Working
            </h3>
            <div className="flex-1 h-[1px] bg-retro-teal opacity-30" />
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {ONGOING_PROJECTS.map((p, i) => (
              <ProjectCard key={i} project={p} />
            ))}
          </div>
        </div>

        {/* Red Section: My Works */}
        <div className="reveal">
          <div className="flex items-center gap-4 mb-10">
            <h3 className="font-mono text-xl md:text-2xl text-retro-terra uppercase tracking-tighter font-bold">
              My Works
            </h3>
            <div className="flex-1 h-[1px] bg-retro-terra opacity-30" />
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {COMPLETED_PROJECTS.map((p, i) => (
              <ProjectCard key={i} project={p} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}