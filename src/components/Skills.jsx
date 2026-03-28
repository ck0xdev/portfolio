import { useReveal } from '../hooks/useReveal'

const SKILL_GROUPS = [
  {
    id: '01',
    title: 'Programming',
    accent: 'terra',
    border: 'border-retro-terra/20',
    labelBg: 'bg-retro-terra/10',
    labelText: 'text-retro-terra',
    itemBorder: 'border-retro-terra/10',
    skills: [
      { icon: 'devicon-c-plain', label: 'C', pct: 85 },
      { icon: 'devicon-java-plain', label: 'Java', pct: 75 },
      { icon: 'devicon-javascript-plain text-yellow-500', label: 'JavaScript', pct: 90 },
      { icon: 'devicon-python-plain text-blue-500', label: 'Python', pct: 80 },
    ],
  },
  {
    id: '02',
    title: 'Frontend Tech',
    accent: 'teal',
    border: 'border-retro-teal/20',
    labelBg: 'bg-retro-teal/10',
    labelText: 'text-retro-teal',
    itemBorder: 'border-retro-teal/10',
    skills: [
      { icon: 'devicon-html5-plain text-orange-500', label: 'HTML', pct: 95 },
      { icon: 'devicon-css3-plain text-blue-500', label: 'CSS', pct: 90 },
      { icon: 'devicon-bootstrap-plain text-purple-500', label: 'Bootstrap', pct: 85 },
      { icon: 'devicon-react-original text-cyan-400', label: 'React', pct: 88 },
      { icon: 'devicon-tailwindcss-original text-cyan-500', label: 'Tailwind', pct: 92 },
    ],
  },
  {
    id: '03',
    title: 'Database',
    accent: 'mustard',
    border: 'border-retro-mustard/20',
    labelBg: 'bg-retro-mustard/10',
    labelText: 'text-retro-mustard',
    itemBorder: 'border-retro-mustard/10',
    skills: [
      { icon: 'devicon-mongodb-plain text-green-500', label: 'MongoDB', pct: 70 },
      { icon: 'devicon-mysql-plain', label: 'MySQL', pct: 75 },
      { icon: 'devicon-firebase-plain text-orange-400', label: 'Firebase', pct: 85 },
    ],
  },
  {
    id: '04',
    title: 'Tools',
    accent: 'mustard',
    border: 'border-retro-mustard/20',
    labelBg: 'bg-retro-mustard/10',
    labelText: 'text-retro-mustard',
    itemBorder: 'border-retro-mustard/10',
    skills: [
      { icon: 'devicon-figma-plain text-pink-500', label: 'Figma', pct: 80 },
      { icon: 'devicon-photoshop-plain text-blue-600', label: 'PS', pct: 75 },
      { icon: 'devicon-github-original', label: 'Github', pct: 88 },
      { icon: 'devicon-vscode-plain text-blue-400', label: 'VS Code', pct: 90 },
    ],
  },
]

function SkillItem({ icon, label, pct, itemBorder }) {
  return (
    <div
      className={`skill-item flex flex-col items-center gap-2 p-4 rounded-2xl bg-retro-cream/50 dark:bg-retro-navy/50 ${itemBorder} border transition-all cursor-none`}
      style={{ '--proficiency': `${pct}%` }}
    >
      <i className={`${icon} text-2xl`} />
      <span className="font-mono text-[10px] font-bold">{label}</span>
      <div className="skill-bar" />
      <div className="skill-proficiency">{pct}%</div>
    </div>
  )
}

export default function Skills() {
  const ref = useReveal()

  return (
    <section
      id="skills"
      ref={ref}
      className="py-32 px-6 relative bg-retro-cream/30 dark:bg-retro-navy/30"
    >
      <div className="max-w-6xl mx-auto">
        <div className="reveal mb-12">
          <h2 className="font-serif text-5xl md:text-7xl font-bold text-retro-terra dark:text-retro-mustard">
            Skills
          </h2>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {SKILL_GROUPS.map((group) => (
            <div
              key={group.id}
              className={`group bg-white/50 dark:bg-black/30 p-8 rounded-3xl ${group.border} border backdrop-blur-sm`}
            >
              <div className="mb-6 flex items-center gap-3">
                <span
                  className={`font-mono text-xs ${group.labelText} ${group.labelBg} px-3 py-1 rounded-full shrink-0`}
                >
                  {group.id}
                </span>
                <h3 className="font-serif text-lg md:text-xl font-bold whitespace-nowrap">
                  {group.title}
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {group.skills.map((skill) => (
                  <SkillItem key={skill.label} {...skill} itemBorder={group.itemBorder} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
