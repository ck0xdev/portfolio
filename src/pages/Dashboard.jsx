import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen p-10 paper-texture text-retro-navy dark:text-retro-cream">
      <div className="grain-overlay" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <header className="flex justify-between items-center mb-12 border-b-2 border-current pb-6">
          <h1 className="font-serif text-4xl font-bold">Control Center</h1>
          <button 
            onClick={() => navigate('/')}
            className="font-mono text-sm uppercase px-4 py-2 border border-current rounded hover:bg-retro-terra hover:border-retro-terra hover:text-white transition-all cursor-none"
            data-cursor
          >
            Logout
          </button>
        </header>

        <div className="grid md:grid-cols-3 gap-8 font-mono">
          <div className="p-6 border-2 border-retro-teal rounded-xl bg-retro-teal/10">
            <h2 className="text-xl mb-2 font-bold uppercase">Messages</h2>
            <p className="opacity-70 text-sm">0 Unread Transmissions</p>
          </div>
          <div className="p-6 border-2 border-retro-mustard rounded-xl bg-retro-mustard/10">
            <h2 className="text-xl mb-2 font-bold uppercase">Projects</h2>
            <p className="opacity-70 text-sm">Manage Portfolio Works</p>
          </div>
          <div className="p-6 border-2 border-retro-terra rounded-xl bg-retro-terra/10">
            <h2 className="text-xl mb-2 font-bold uppercase">System Stats</h2>
            <p className="opacity-70 text-sm">All Systems Operational</p>
          </div>
        </div>
      </div>
    </div>
  )
}