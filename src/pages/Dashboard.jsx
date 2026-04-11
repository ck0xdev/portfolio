import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth, db } from '../lib/firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { 
  collection, addDoc, deleteDoc, updateDoc, doc, 
  serverTimestamp, query, onSnapshot, writeBatch 
} from 'firebase/firestore'

// Drag and Drop Imports
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

// ─── Pixel-Perfect Sortable Project Card ───
function SortableProject({ p, startEdit, deleteDoc, db, isOngoing }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: p.id });
  
  const accentClass = isOngoing ? 'border-retro-teal/40 hover:border-retro-teal bg-retro-teal/5' : 'border-retro-terra/40 hover:border-retro-terra bg-retro-terra/5';
  const textAccent = isOngoing ? 'text-retro-teal' : 'text-retro-terra';

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 100 : 'auto',
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style}
      className={`p-4 border-2 rounded-xl flex justify-between items-center backdrop-blur-sm transition-colors mb-3 ${accentClass}`}
    >
      <div className="flex items-center gap-3 overflow-hidden">
        {/* Subtle Drag Handle */}
        <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing opacity-30 hover:opacity-100 font-mono text-xl select-none">
          ⠿
        </div>
        <div className="overflow-hidden">
          <p className="font-bold truncate uppercase">{p.title}</p>
          <p className="text-[10px] opacity-60 font-bold">{p.tags}</p>
        </div>
      </div>
      <div className="flex gap-4">
        <button onClick={() => startEdit(p)} className={`${textAccent} text-[10px] font-bold hover:underline cursor-none`} data-cursor>EDIT</button>
        <button onClick={() => {if(window.confirm('Erase project?')) deleteDoc(doc(db, 'projects', p.id))}} className="text-retro-terra text-[10px] font-bold hover:underline cursor-none" data-cursor>DELETE</button>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate()
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)
  const [tab, setTab] = useState('projects')
  const [projects, setProjects] = useState([])
  const [messages, setMessages] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState({ 
    title: '', description: '', tags: '', href: '', status: 'ongoing', priority: 0 
  })

  const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }));

  // ─── Theme Logic ───
  const [isDark, setIsDark] = useState(false)
  useEffect(() => {
    const saved = localStorage.getItem('theme')
    const dark = saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)
    setIsDark(dark); document.documentElement.classList.toggle('dark', dark)
  }, [])

  const toggleDark = () => {
    const next = !isDark; setIsDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }

  // ─── Listeners ───
  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (user) => {
      if (!user) navigate('/admin')
      else setIsCheckingAuth(false)
    })

    const unsubP = onSnapshot(collection(db, 'projects'), (snap) => {
      const fetched = snap.docs.map(d => ({ id: d.id, ...d.data() }))
      // Sort by priority (desc) then date (desc)
      fetched.sort((a, b) => (b.priority || 0) - (a.priority || 0) || (b.createdAt?.toMillis() || 0) - (a.createdAt?.toMillis() || 0))
      setProjects(fetched)
    })

    const unsubM = onSnapshot(collection(db, 'messages'), (snap) => {
      const msgs = snap.docs.map(d => ({ id: d.id, ...d.data() }))
      msgs.sort((a, b) => (b.timestamp?.toMillis() || 0) - (a.timestamp?.toMillis() || 0))
      setMessages(msgs)
    })

    return () => { unsubAuth(); unsubP(); unsubM(); }
  }, [navigate])

  // ─── Drag End Handler ───
  const handleDragEnd = async (event, listType) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const currentList = projects.filter(p => p.status === listType);
    const oldIndex = currentList.findIndex(p => p.id === active.id);
    const newIndex = currentList.findIndex(p => p.id === over.id);

    const newOrder = arrayMove(currentList, oldIndex, newIndex);
    const batch = writeBatch(db);
    
    // Assigning high priority numbers based on new order
    newOrder.forEach((proj, index) => {
      batch.update(doc(db, 'projects', proj.id), { priority: (newOrder.length - index) * 10 });
    });
    await batch.commit();
  }

  const handleSubmitProject = async (e) => {
    e.preventDefault()
    try {
      const data = { ...form, priority: Number(form.priority) }
      if (editingId) {
        await updateDoc(doc(db, 'projects', editingId), data)
        setEditingId(null)
      } else {
        await addDoc(collection(db, 'projects'), { ...data, createdAt: serverTimestamp() })
      }
      setForm({ title: '', description: '', tags: '', href: '', status: 'ongoing', priority: 0 })
    } catch (err) { console.error(err) }
  }

  const startEdit = (p) => {
    setEditingId(p.id)
    setForm({ title: p.title, description: p.description, tags: p.tags || '', href: p.href || '', status: p.status || 'ongoing', priority: p.priority || 0 })
    setTab('projects')
  }

  if (isCheckingAuth) return null

  const ongoingProjects = projects.filter(p => p.status === 'ongoing')
  const completedProjects = projects.filter(p => p.status === 'completed')

  return (
    <div className="min-h-screen p-6 md:p-10 paper-texture text-retro-navy dark:text-retro-cream transition-colors duration-500">
      <div className="grain-overlay" />
      <div className="max-w-6xl mx-auto relative z-10">
        
        <header className="flex justify-between items-center mb-8 border-b-2 border-current pb-6">
          <h1 className="font-serif text-3xl md:text-4xl font-bold">Control Center</h1>
          <div className="flex items-center gap-4">
            <button onClick={toggleDark} className="w-10 h-10 rounded-full border-2 border-current flex items-center justify-center hover:bg-retro-terra hover:text-white dark:hover:bg-retro-mustard transition-all cursor-none" data-cursor>
              {isDark ? '☾' : '☀'}
            </button>
            <button onClick={() => signOut(auth)} className="font-mono text-sm uppercase px-4 py-2 h-10 border border-current rounded hover:bg-retro-terra hover:text-white transition-all cursor-none" data-cursor>Logout</button>
          </div>
        </header>

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
            <p className="text-[10px] uppercase opacity-70">Messages</p>
            <p className="text-2xl font-bold">{messages.filter(m => !m.read).length}</p>
          </div>
          <div className="p-4 border-2 border-current rounded-xl bg-current/5">
            <p className="text-[10px] uppercase opacity-70">Status</p>
            <p className="text-xl mt-1 font-bold text-green-500 animate-pulse">ONLINE</p>
          </div>
        </div>

        <div className="flex gap-4 mb-8 font-mono">
          <button onClick={() => setTab('projects')} className={`px-6 py-2 rounded-full border-2 font-bold transition-all ${tab === 'projects' ? 'bg-retro-navy text-retro-cream dark:bg-retro-cream dark:text-retro-navy' : 'border-current opacity-70 hover:opacity-100'}`}>PROJECTS</button>
          <button onClick={() => setTab('messages')} className={`px-6 py-2 rounded-full border-2 font-bold transition-all ${tab === 'messages' ? 'bg-retro-navy text-retro-cream dark:bg-retro-cream dark:text-retro-navy' : 'border-current opacity-70 hover:opacity-100'}`}>INBOX ({messages.filter(m => !m.read).length})</button>
        </div>

        {tab === 'projects' ? (
          <div className="grid lg:grid-cols-2 gap-12 font-mono">
            <form onSubmit={handleSubmitProject} className="space-y-4">
              <h2 className="text-lg font-bold uppercase underline mb-4">{editingId ? 'Modify Project' : 'Deploy New Project'}</h2>
              <input type="text" placeholder="Title" required value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="dashboard-input" />
              <textarea placeholder="Description" required value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="dashboard-input h-32" />
              <input type="text" placeholder="Tags" value={form.tags} onChange={e => setForm({...form, tags: e.target.value})} className="dashboard-input" />
              <input type="url" placeholder="Link" value={form.href} onChange={e => setForm({...form, href: e.target.value})} className="dashboard-input" />

              <select value={form.status} onChange={e => setForm({...form, status: e.target.value})} className="dashboard-input appearance-none">
                <option value="ongoing">ONGOING DEPLOYMENT</option>
                <option value="completed">ARCHIVED SUCCESS</option>
              </select>

              <button type="submit" className="w-full bg-retro-teal text-white py-4 font-bold uppercase tracking-widest rounded-lg">{editingId ? 'Update' : 'Publish'}</button>
            </form>

            <div className="space-y-8 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={(e) => handleDragEnd(e, 'ongoing')}>
                <h2 className="text-lg font-bold uppercase underline mb-4 text-retro-teal">Ongoing (Drag to Sort)</h2>
                <SortableContext items={ongoingProjects.map(p => p.id)} strategy={verticalListSortingStrategy}>
                  {ongoingProjects.map(p => <SortableProject key={p.id} p={p} startEdit={startEdit} deleteDoc={deleteDoc} db={db} isOngoing={true} />)}
                </SortableContext>
              </DndContext>

              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={(e) => handleDragEnd(e, 'completed')}>
                <h2 className="text-lg font-bold uppercase underline mb-4 text-retro-terra">Archived (Drag to Sort)</h2>
                <SortableContext items={completedProjects.map(p => p.id)} strategy={verticalListSortingStrategy}>
                  {completedProjects.map(p => <SortableProject key={p.id} p={p} startEdit={startEdit} deleteDoc={deleteDoc} db={db} isOngoing={false} />)}
                </SortableContext>
              </DndContext>
            </div>
          </div>
        ) : (
          <div className="space-y-4 max-h-[700px] overflow-y-auto pr-2 custom-scrollbar font-mono">
            {messages.map(m => (
              <div key={m.id} className={`p-6 border-2 border-current rounded-xl bg-white/30 dark:bg-white/5 relative ${m.read ? 'opacity-40' : 'opacity-100 shadow-lg'}`}>
                <div className="absolute top-4 right-4 flex gap-4">
                  <button onClick={() => updateDoc(doc(db, 'messages', m.id), { read: !m.read })} className="text-retro-teal text-[10px] font-bold hover:underline">[READ]</button>
                  <button onClick={() => deleteDoc(doc(db, 'messages', m.id))} className="text-retro-terra text-[10px] font-bold hover:underline">[PURGE]</button>
                </div>
                <p className="font-bold uppercase text-xs">{m.name} <span className="opacity-50 font-normal">({m.email})</span></p>
                <p className="mt-2 italic border-l-4 border-current pl-4">{m.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .dashboard-input { width: 100%; background: rgba(0, 0, 0, 0.05); border: 2px solid currentColor; padding: 0.75rem; border-radius: 0.5rem; outline: none; color: inherit; }
        .dark .dashboard-input { background: rgba(255, 255, 255, 0.05); }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: currentColor; border-radius: 10px; }
        input[type=range] { -webkit-appearance: none; background: transparent; }
        input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; height: 16px; width: 16px; border-radius: 50%; background: currentColor; cursor: pointer; }
      `}</style>
    </div>
  )
}