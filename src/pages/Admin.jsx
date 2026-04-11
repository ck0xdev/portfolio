import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../lib/firebase' // Import your Firebase auth instance
import { signInWithEmailAndPassword } from 'firebase/auth'

export default function Admin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    try {
      // Authenticate against your single Firebase user
      await signInWithEmailAndPassword(auth, email, password)
      navigate('/dashboard') 
    } catch (err) {
      console.error(err)
      setError('ACCESS DENIED. Unauthorized terminal access.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 paper-texture">
      <div className="grain-overlay" />
      
      <div className="max-w-md w-full bg-retro-navy dark:bg-black p-8 rounded-xl border-2 border-retro-terra text-green-400 font-mono shadow-2xl relative z-10">
        <h2 className="text-2xl mb-6 text-center tracking-widest uppercase">System Login</h2>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs uppercase mb-2 opacity-70">Admin Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border-b-2 border-green-400/30 p-2 focus:outline-none focus:border-green-400 transition-colors"
              placeholder="_"
              required 
            />
          </div>
          <div>
            <label className="block text-xs uppercase mb-2 opacity-70">Passcode</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border-b-2 border-green-400/30 p-2 focus:outline-none focus:border-green-400 transition-colors"
              placeholder="***"
              required 
            />
          </div>

          {error && <p className="text-retro-terra text-sm animate-pulse">{error}</p>}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3 mt-4 border-2 border-green-400 hover:bg-green-400 hover:text-black transition-colors uppercase font-bold tracking-widest cursor-none disabled:opacity-50"
            data-cursor
          >
            {loading ? 'Decrypting...' : 'Authenticate'}
          </button>
        </form>
        
        <button 
          onClick={() => navigate('/')}
          className="mt-6 text-xs text-center w-full opacity-50 hover:opacity-100 transition-opacity cursor-none"
          data-cursor
        >
          [ Return to Main Network ]
        </button>
      </div>
    </div>
  )
}