import { useReveal } from '../hooks/useReveal'

const PROJECTS = [
  {
    num: '01',
    title: 'Portfolio',
    titleHover: 'group-hover:text-retro-terra',
    description:
      'A retro-modern developer portfolio rebuilt from scratch with Vite + React. Features a custom dot-ring cursor, slide-up CLI terminal with live commands, 3-2-1 countdown loader, IntersectionObserver scroll-reveal animations, dark/light mode with localStorage persistence, and interactive skill proficiency bars. Fully responsive across all breakpoints.',
    tags: ['Vite', 'React 18', 'Tailwind CSS v3', 'JavaScript', 'Firebase'],
    linkColor: 'text-retro-terra',
    href: 'https://github.com/ck0xdev/portfolio',
    bgFrom: 'from-retro-terra/20',
    bgTo: 'to-retro-mustard/20',
    bgBase: 'bg-retro-mustard/10',
    borderColor: 'border-retro-terra/20',
    reverse: false,
  },
  {
    num: '02',
    title: 'ServeX',
    titleHover: 'group-hover:text-retro-teal',
    description:
      'A modern web services platform with Firebase authentication, user dashboard, file upload system, and admin panel. Features neumorphic UI design and fully responsive layout.',
    tags: ['React 18', 'Tailwind CSS 3', 'Firebase', 'Vite', 'Lucide React'],
    linkColor: 'text-retro-teal',
    href: 'https://github.com/ck0xdev/ServeX',
    bgFrom: 'from-retro-teal/20',
    bgTo: 'to-retro-mustard/20',
    bgBase: 'bg-retro-teal/10',
    borderColor: 'border-retro-teal/20',
    reverse: true,
  },
  {
    num: '03',
    title: 'DataXplore',
    titleHover: 'group-hover:text-retro-mustard',
    description:
      'College minor project focused on data exploration and visualization. Combines Python backend with a clean HTML/JS frontend for interactive data analysis.',
    tags: ['HTML', 'Python', 'Data Viz', 'JavaScript'],
    linkColor: 'text-retro-mustard',
    href: 'https://github.com/ck0xdev/dataXplore',
    bgFrom: 'from-retro-mustard/20',
    bgTo: 'to-retro-terra/20',
    bgBase: 'bg-retro-terra/10',
    borderColor: 'border-retro-mustard/20',
    reverse: false,
  },
]

export default function Work() {
  const ref = useReveal()

  return (
    <section id="work" ref={ref} className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-serif text-5xl md:text-7xl font-bold mb-20 reveal text-retro-teal">
          Selected Work
        </h2>

        <div className="space-y-32">
          {PROJECTS.map((project) => (
            <div key={project.num} className="group relative reveal">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Image placeholder */}
                <div
                  className={`relative overflow-hidden rounded-2xl ${project.bgBase} aspect-video border-2 ${project.borderColor} ${project.reverse ? 'md:order-2' : ''}`}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${project.bgFrom} ${project.bgTo} group-hover:scale-110 transition-transform duration-700`}
                  />
                  <div className="absolute inset-0 flex items-center justify-center font-mono text-4xl opacity-30">
                    {project.num}
                  </div>
                  {/* Dot pattern overlay */}
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23E07A5F' fill-opacity='0.4' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E\")",
                    }}
                  />
                </div>

                {/* Content */}
                <div className={`space-y-4 ${project.reverse ? 'md:order-1' : ''}`}>
                  <h3
                    className={`font-serif text-4xl font-bold ${project.titleHover} transition-colors cursor-none`}
                    data-cursor
                  >
                    {project.title}
                  </h3>
                  <p className="font-mono opacity-70">{project.description}</p>
                  <div className="flex gap-2 flex-wrap">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-xs font-mono border border-current px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noreferrer"
                    className={`inline-flex items-center gap-2 font-mono ${project.linkColor} hover:underline mt-4 cursor-none`}
                    data-cursor
                  >
                    View on GitHub →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
