import { useState, useEffect } from 'react'
import { db } from '../lib/firebase'
import { collection, query, getDocs } from 'firebase/firestore'
import { useReveal } from '../hooks/useReveal'

function ProjectCard({ project }) {
  const isOngoing = project.status === 'ongoing'
  const accent = isOngoing ? 'border-retro-teal' : 'border-retro-terra'
  const bg = isOngoing ? 'bg-retro-teal/5' : 'bg-retro-terra/5'
  
  const tagsList = typeof project.tags === 'string' 
    ? project.tags.split(',').map(t => t.trim()).filter(t => t.length > 0)
    : []

  return (
    <div className={`group p-6 rounded-2xl border-2 ${accent} ${bg} backdrop-blur-sm transition-all hover:scale-[1.02] hover:shadow-xl flex flex-col justify-between`}>
      <div>
        <h4 className="font-serif text-2xl font-bold mb-3">{project.title}</h4>
        <p className="font-mono text-sm opacity-80 mb-4">{project.description}</p>
        <div className="flex gap-2 flex-wrap mb-6">
          {tagsList.map((tag, i) => (
            <span key={i} className="text-[10px] font-mono border border-current px-2 py-0.5 rounded-full uppercase">
              {tag}
            </span>
          ))}
        </div>
      </div>
      {project.href && (
        <a 
          href={project.href} 
          target="_blank" 
          rel="noreferrer" 
          className="font-mono text-xs uppercase tracking-widest hover:underline inline-flex items-center gap-2 cursor-none"
          data-cursor
        >
          View Project →
        </a>
      )}
    </div>
  )
}

export default function Work() {
  const ref = useReveal()
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsRef = collection(db, 'projects')
        const q = query(projectsRef)
        
        const snapshot = await getDocs(q)
        const fetched = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        
        // Bulletproof sorting
        fetched.sort((a, b) => {
          const timeA = (a.createdAt && typeof a.createdAt.toMillis === 'function') ? a.createdAt.toMillis() : 0
          const timeB = (b.createdAt && typeof b.createdAt.toMillis === 'function') ? b.createdAt.toMillis() : 0
          return timeB - timeA
        })
        
        setProjects(fetched)
      } catch (err) {
        console.error("🔥 Firebase Error:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  const ongoing = projects.filter(p => p.status === 'ongoing')
  const completed = projects.filter(p => p.status === 'completed')

  return (
    <section id="work" ref={ref} className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Main Header */}
        <div className="reveal mb-20">
          <h2 className="font-serif text-5xl md:text-7xl font-bold text-retro-terra">
            Selected Work
          </h2>
          <div className="h-1 w-32 bg-retro-terra mt-4 opacity-50" />
        </div>

        {/* ─── Ongoing Projects ─── */}
        <div className="reveal mb-24">
          <div className="flex items-center gap-4 mb-10">
            <h3 className="font-mono text-xl md:text-2xl text-retro-teal uppercase tracking-tighter font-bold">
              Currently Working
            </h3>
            <div className="flex-1 h-[1px] bg-retro-teal opacity-30" />
          </div>
          
          {loading ? (
            <p className="font-mono text-sm animate-pulse opacity-50">Syncing with mainnet...</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {ongoing.map(p => <ProjectCard key={p.id} project={p} />)}
              {ongoing.length === 0 && (
                <p className="font-mono text-xs opacity-30 italic">No active transmissions...</p>
              )}
            </div>
          )}
        </div>

        {/* ─── Completed Projects ─── */}
        <div className="reveal">
          <div className="flex items-center gap-4 mb-10">
            <h3 className="font-mono text-xl md:text-2xl text-retro-terra uppercase tracking-tighter font-bold">
              My Works
            </h3>
            <div className="flex-1 h-[1px] bg-retro-terra opacity-30" />
          </div>
          
          {loading ? (
            <p className="font-mono text-sm animate-pulse opacity-50">Syncing with mainnet...</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {completed.map(p => <ProjectCard key={p.id} project={p} />)}
              {completed.length === 0 && (
                <p className="font-mono text-xs opacity-30 italic">Archive empty...</p>
              )}
            </div>
          )}
        </div>

      </div>
    </section>
  )
}