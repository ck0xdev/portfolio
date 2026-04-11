import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth, db } from '../lib/firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { 
  collection, addDoc, deleteDoc, updateDoc, doc, 
  serverTimestamp, query, orderBy, onSnapshot 
} from 'firebase/firestore'

export default function Dashboard() {
  const navigate = useNavigate()
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)
  const [tab, setTab] = useState('projects')
  const [projects, setProjects] = useState([])
  const [messages, setMessages] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState({ 
    title: '', description: '', tags: '', href: '', status: 'ongoing' 
  })

  // ─── Theme Logic ────────────────────────────────────────
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

  // ─── Listeners for Auth & Database ──────────────────────
  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (user) => {
      if (!user) navigate('/admin')
      else setIsCheckingAuth(false)
    })

    const qP = query(collection(db, 'projects'), orderBy('createdAt', 'desc'))
    const unsubP = onSnapshot(qP, (snap) => setProjects(snap.docs.map(d => ({ id: d.id, ...d.data() }))))

    const qM = query(collection(db, 'messages'), orderBy('timestamp', 'desc'))
    const unsubM = onSnapshot(qM, (snap) => setMessages(snap.docs.map(d => ({ id: d.id, ...d.data() }))))

    return () => { unsubAuth(); unsubP(); unsubM(); }
  }, [navigate])

  // ─── Handlers ───────────────────────────────────────────
  const handleLogout = async () => {
    await signOut(auth)
    navigate('/')
  }

  const handleSubmitProject = async (e) => {
    e.preventDefault()
    try {
      if (editingId) {
        await updateDoc(doc(db, 'projects', editingId), form)
        setEditingId(null)
      } else {
        await addDoc(collection(db, 'projects'), { ...form, createdAt: serverTimestamp() })
      }
      setForm({ title: '', description: '', tags: '', href: '', status: 'ongoing' })
    } catch (err) {
      console.error("Database Error:", err)
    }
  }

  const startEdit = (p) => {
    setEditingId(p.id)
    setForm({ title: p.title, description: p.description, tags: p.tags || '', href: p.href || '', status: p.status || 'ongoing' })
    setTab('projects')
  }

  const toggleMessageRead = async (m) => {
    try {
      const messageRef = doc(db, 'messages', m.id)
      const currentStatus = m.read === true
      const newStatus = !currentStatus
      await updateDoc(messageRef, { read: newStatus })
    } catch (error) {
      console.error("Firebase Update Error:", error)
      alert("Failed to update message. Check the F12 Developer Console for details.")
    }
  }

  if (isCheckingAuth) return null

  // Helper variables for clean rendering
  const ongoingProjects = projects.filter(p => p.status === 'ongoing')
  const completedProjects = projects.filter(p => p.status === 'completed')

  return (
    <div className="min-h-screen p-6 md:p-10 paper-texture text-retro-navy dark:text-retro-cream transition-colors duration-500">
      <div className="grain-overlay" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* ─── Header ─── */}
        <header className="flex justify-between items-center mb-8 border-b-2 border-current pb-6">
          <h1 className="font-serif text-3xl md:text-4xl font-bold">Control Center</h1>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleDark}
              className="w-10 h-10 rounded-full border-2 border-current flex items-center justify-center hover:bg-retro-terra hover:text-white dark:hover:bg-retro-mustard dark:hover:text-retro-navy transition-all cursor-none"
              data-cursor
            >
              {isDark ? '☾' : '☀'}
            </button>
            <button 
              onClick={handleLogout}
              className="font-mono text-sm uppercase px-4 py-2 h-10 border border-current rounded hover:bg-retro-terra hover:border-retro-terra hover:text-white transition-all cursor-none"
              data-cursor
            >
              Logout
            </button>
          </div>
        </header>

        {/* ─── Stats Row ─── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 font-mono">
          <div className="p-4 border-2 border-retro-teal rounded-xl bg-retro-teal/10">
            <p className="text-[10px] uppercase opacity-70">Total Projects</p>
            <p className="text-2xl font-bold">{projects.length}</p>
          </div>
          <div className="p-4 border-2 border-retro-mustard rounded-xl bg-retro-mustard/10">
            <p className="text-[10px] uppercase opacity-70">Ongoing</p>
            <p className="text-2xl font-bold">{ongoingProjects.length}</p>
          </div>
          <div className="p-4 border-2 border-retro-terra rounded-xl bg-retro-terra/10">
            <p className="text-[10px] uppercase opacity-70">Unread Transmissions</p>
            <p className="text-2xl font-bold">{messages.filter(m => !m.read).length}</p>
          </div>
          <div className="p-4 border-2 border-current rounded-xl bg-current/5">
            <p className="text-[10px] uppercase opacity-70">System Status</p>
            <p className="text-xl mt-1 font-bold text-green-500 animate-pulse">ONLINE</p>
          </div>
        </div>

        {/* ─── Tabs ─── */}
        <div className="flex gap-4 mb-8 font-mono">
          <button 
            onClick={() => setTab('projects')} 
            className={`px-6 py-2 rounded-full border-2 font-bold transition-all cursor-none ${tab === 'projects' ? 'bg-retro-navy text-retro-cream dark:bg-retro-cream dark:text-retro-navy' : 'border-current opacity-70 hover:opacity-100'}`}
            data-cursor
          >
            PROJECTS
          </button>
          <button 
            onClick={() => setTab('messages')} 
            className={`px-6 py-2 rounded-full border-2 font-bold transition-all cursor-none ${tab === 'messages' ? 'bg-retro-navy text-retro-cream dark:bg-retro-cream dark:text-retro-navy' : 'border-current opacity-70 hover:opacity-100'}`}
            data-cursor
          >
            INBOX ({messages.filter(m => !m.read).length})
          </button>
        </div>

        {/* ─── Tab Content ─── */}
        {tab === 'projects' ? (
          <div className="grid lg:grid-cols-2 gap-12 font-mono">
            
            {/* Project Form */}
            <form onSubmit={handleSubmitProject} className="space-y-4">
              <h2 className="text-lg font-bold uppercase underline mb-4">{editingId ? 'Modify Project' : 'Deploy New Project'}</h2>
              <input type="text" placeholder="Title" required value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="dashboard-input" />
              <textarea placeholder="Description" required value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="dashboard-input h-32" />
              <input type="text" placeholder="Tags (comma separated: React, Tailwind)" value={form.tags} onChange={e => setForm({...form, tags: e.target.value})} className="dashboard-input" />
              <input type="url" placeholder="Project Link (Optional)" value={form.href} onChange={e => setForm({...form, href: e.target.value})} className="dashboard-input" />
              
              <div className="relative group">
                <select value={form.status} onChange={e => setForm({...form, status: e.target.value})} className="dashboard-input appearance-none cursor-pointer pr-10">
                  <option value="ongoing">ONGOING DEPLOYMENT</option>
                  <option value="completed">ARCHIVED SUCCESS</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">▼</div>
              </div>

              <div className="flex gap-2">
                <button type="submit" className="flex-1 bg-retro-teal text-white py-4 font-bold uppercase tracking-widest hover:brightness-90 transition-all rounded-lg cursor-none" data-cursor>
                  {editingId ? 'Update Mainnet' : 'Publish to Mainnet'}
                </button>
                {editingId && (
                  <button type="button" onClick={() => {setEditingId(null); setForm({title:'', description:'', tags:'', href:'', status:'ongoing'})}} className="px-6 bg-retro-terra text-white font-bold uppercase rounded-lg cursor-none" data-cursor>Cancel</button>
                )}
              </div>
            </form>

            {/* Divided Active Projects List */}
            <div className="space-y-8 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
              
              {/* Ongoing Section */}
              <div>
                <h2 className="text-lg font-bold uppercase underline mb-4 text-retro-teal">Ongoing Deployments</h2>
                <div className="space-y-3">
                  {ongoingProjects.map(p => (
                    <div key={p.id} className="p-4 border-2 border-retro-teal/40 hover:border-retro-teal rounded-xl flex justify-between items-center bg-retro-teal/5 backdrop-blur-sm transition-colors">
                      <div className="overflow-hidden">
                        <p className="font-bold truncate uppercase">{p.title}</p>
                        <p className="text-[10px] opacity-60 font-bold">{p.tags}</p>
                      </div>
                      <div className="flex gap-4">
                        <button onClick={() => startEdit(p)} className="text-retro-teal text-[10px] font-bold hover:underline cursor-none" data-cursor>EDIT</button>
                        <button onClick={() => {if(window.confirm('Erase project?')) deleteDoc(doc(db, 'projects', p.id))}} className="text-retro-terra text-[10px] font-bold hover:underline cursor-none" data-cursor>DELETE</button>
                      </div>
                    </div>
                  ))}
                  {ongoingProjects.length === 0 && <p className="text-xs opacity-50 italic">No ongoing projects found.</p>}
                </div>
              </div>

              {/* Completed Section */}
              <div>
                <h2 className="text-lg font-bold uppercase underline mb-4 text-retro-terra">Archived Successes</h2>
                <div className="space-y-3">
                  {completedProjects.map(p => (
                    <div key={p.id} className="p-4 border-2 border-retro-terra/40 hover:border-retro-terra rounded-xl flex justify-between items-center bg-retro-terra/5 backdrop-blur-sm transition-colors">
                      <div className="overflow-hidden">
                        <p className="font-bold truncate uppercase">{p.title}</p>
                        <p className="text-[10px] opacity-60 font-bold">{p.tags}</p>
                      </div>
                      <div className="flex gap-4">
                        <button onClick={() => startEdit(p)} className="text-retro-teal text-[10px] font-bold hover:underline cursor-none" data-cursor>EDIT</button>
                        <button onClick={() => {if(window.confirm('Erase project?')) deleteDoc(doc(db, 'projects', p.id))}} className="text-retro-terra text-[10px] font-bold hover:underline cursor-none" data-cursor>DELETE</button>
                      </div>
                    </div>
                  ))}
                  {completedProjects.length === 0 && <p className="text-xs opacity-50 italic">No archived successes found.</p>}
                </div>
              </div>

            </div>
          </div>
        ) : (
          
          /* Messages Inbox */
          <div className="space-y-4 max-h-[700px] overflow-y-auto pr-2 custom-scrollbar font-mono">
            <h2 className="text-lg font-bold uppercase underline mb-6">Incoming Transmissions</h2>
            {messages.length > 0 ? messages.map(m => (
              <div key={m.id} className={`p-6 border-2 border-current rounded-xl bg-white/30 dark:bg-white/5 relative transition-all ${m.read ? 'opacity-40' : 'opacity-100 shadow-lg'}`}>
                <div className="absolute top-4 right-4 flex gap-4">
                  <button onClick={() => toggleMessageRead(m)} className="text-retro-teal text-[10px] font-bold hover:underline cursor-none" data-cursor>
                    {m.read ? '[MARK UNREAD]' : '[MARK READ]'}
                  </button>
                  <button onClick={() => {if(window.confirm('Remove message?')) deleteDoc(doc(db, 'messages', m.id))}} className="text-retro-terra text-[10px] font-bold hover:underline cursor-none" data-cursor>
                    [PURGE]
                  </button>
                </div>
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-3">
                  <span className={`text-xs font-black uppercase px-2 py-0.5 rounded ${m.read ? 'bg-gray-400 dark:bg-gray-600 text-white' : 'bg-retro-navy dark:bg-retro-cream text-retro-cream dark:text-retro-navy'}`}>{m.name}</span>
                  <span className="text-[10px] opacity-60 font-bold">{m.email}</span>
                </div>
                <p className="text-sm leading-relaxed border-l-4 border-current pl-4 italic">
                  {m.message}
                </p>
              </div>
            )) : (
              <p className="text-sm opacity-50 italic">No transmissions found in buffer.</p>
            )}
          </div>
        )}
      </div>

      {/* Internal Styles for Inputs and Scrollbar */}
      <style>{`
        .dashboard-input {
          width: 100%;
          background: rgba(0, 0, 0, 0.05);
          border: 2px solid currentColor;
          padding: 0.75rem;
          border-radius: 0.5rem;
          outline: none;
          transition: all 0.2s;
          color: inherit;
        }
        .dark .dashboard-input {
          background: rgba(255, 255, 255, 0.05);
        }
        .dashboard-input:focus {
          background: rgba(255, 255, 255, 0.1);
          box-shadow: 0 0 10px rgba(129, 178, 154, 0.2);
        }
        select option {
          background-color: #1a1d23;
          color: #f7f5f0;
        }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: currentColor; border-radius: 10px; }
      `}</style>
    </div>
  )
}