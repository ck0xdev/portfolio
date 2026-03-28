import { useState, useRef } from 'react'
import emailjs from '@emailjs/browser'
import { useReveal } from '../hooks/useReveal'

// ── Rate-limit: max 1 submission per 60 seconds per session ──
const RATE_LIMIT_MS = 60_000
let lastSubmitTime = 0

const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

export default function Contact() {
  const ref     = useReveal()
  const formRef = useRef(null)

  // status: null | 'sending' | 'success' | 'error' | 'ratelimit'
  const [status,   setStatus]   = useState(null)
  const [honeypot, setHoneypot] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    // ── 1. Honeypot check (silent bot trap) ──
    if (honeypot) return

    // ── 2. Client-side rate limit ──
    const now = Date.now()
    if (now - lastSubmitTime < RATE_LIMIT_MS) {
      setStatus('ratelimit')
      return
    }

    // ── 3. Env-var guard (show friendly error if .env not set up) ──
    if (!SERVICE_ID || SERVICE_ID.includes('xxx')) {
      setStatus('noenv')
      return
    }

    setStatus('sending')

    try {
      // sendForm reads field `name` attributes directly from the DOM —
      // your email address is NEVER in the frontend code.
      // EmailJS maps {{from_name}}, {{from_email}}, {{message}}
      // to the recipient you set inside your dashboard template.
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, {
        publicKey: PUBLIC_KEY,
      })

      lastSubmitTime = Date.now()
      setStatus('success')
      formRef.current.reset()
    } catch (err) {
      console.error('EmailJS error:', err)
      setStatus('error')
    }
  }

  const statusConfig = {
    sending:   { color: 'text-yellow-500',              msg: '⏳ Sending your message...' },
    success:   { color: 'text-retro-teal',              msg: '✓ Message sent! I\'ll get back to you soon.' },
    error:     { color: 'text-retro-terra',             msg: '✗ Something went wrong. Try again or reach out on Discord.' },
    ratelimit: { color: 'text-retro-mustard',           msg: '⏱ One message per minute — please wait a moment.' },
    noenv:     { color: 'text-retro-mustard',           msg: '⚙ EmailJS not configured yet. Check your .env file.' },
  }

  return (
    <section id="contact" ref={ref} className="py-32 px-6 relative">
      <div className="max-w-3xl mx-auto">
        <div className="reveal">
          <h2 className="font-serif text-5xl md:text-7xl font-bold mb-12">Let's Talk</h2>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-6 bg-white/40 dark:bg-black/20 p-8 md:p-12 rounded-3xl border border-current backdrop-blur-sm"
          >
            {/* ── Honeypot — invisible to humans, bots fill it in ── */}
            <div
              aria-hidden="true"
              style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}
            >
              <input
                type="text"
                name="website"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            {/* ── Name + Email row ── */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="font-mono text-xs uppercase tracking-widest">Name</label>
                <input
                  type="text"
                  name="from_name"
                  required
                  disabled={status === 'sending'}
                  className="w-full bg-transparent border-2 border-current rounded-lg px-4 py-3 font-mono focus:outline-none focus:border-retro-terra transition-colors disabled:opacity-50"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label className="font-mono text-xs uppercase tracking-widest">Email</label>
                <input
                  type="email"
                  name="from_email"
                  required
                  disabled={status === 'sending'}
                  className="w-full bg-transparent border-2 border-current rounded-lg px-4 py-3 font-mono focus:outline-none focus:border-retro-terra transition-colors disabled:opacity-50"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            {/* ── Message ── */}
            <div className="space-y-2">
              <label className="font-mono text-xs uppercase tracking-widest">Message</label>
              <textarea
                name="message"
                rows={5}
                required
                disabled={status === 'sending'}
                className="w-full bg-transparent border-2 border-current rounded-lg px-4 py-3 font-mono focus:outline-none focus:border-retro-terra transition-colors resize-none disabled:opacity-50"
                placeholder="Tell me about your project..."
              />
            </div>

            {/* ── Human check ── */}
            <div className="flex items-center gap-2 text-sm font-mono opacity-70">
              <input
                type="checkbox"
                required
                id="human-check"
                className="w-4 h-4 accent-retro-terra"
              />
              <label htmlFor="human-check">I am not a robot (Certified Human™)</label>
            </div>

            {/* ── Submit button ── */}
            <button
              type="submit"
              disabled={status === 'sending' || status === 'success'}
              className="w-full py-4 bg-retro-navy dark:bg-retro-cream text-retro-cream dark:text-retro-navy font-mono font-bold rounded-lg hover:scale-[1.02] transition-transform cursor-none flex items-center justify-center gap-2 group disabled:opacity-60 disabled:scale-100 disabled:cursor-not-allowed"
              data-cursor
            >
              <span>
                {status === 'sending' ? 'Sending...' : status === 'success' ? 'Sent ✓' : 'Send Message'}
              </span>
              {status !== 'sending' && status !== 'success' && (
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              )}
            </button>

            {/* ── Status message ── */}
            {status && statusConfig[status] && (
              <p className={`font-mono text-sm text-center ${statusConfig[status].color}`}>
                {statusConfig[status].msg}
              </p>
            )}
          </form>

          {/* ── Social Links ── */}
          <div className="mt-12 flex justify-center gap-8">
            <a
              href="https://github.com/ck0xdev"
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col items-center gap-2 cursor-none"
              data-cursor
            >
              <div className="w-12 h-12 rounded-full border-2 border-current flex items-center justify-center group-hover:bg-retro-terra group-hover:text-white transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </div>
              <span className="font-mono text-xs">GitHub</span>
            </a>

            <a
              href="https://discord.com/users/ck0x.exe"
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col items-center gap-2 cursor-none"
              data-cursor
            >
              <div className="w-12 h-12 rounded-full border-2 border-current flex items-center justify-center group-hover:bg-[#5865F2] group-hover:text-white transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4191-2.1568 2.4191zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4191-2.1568 2.4191Z" />
                </svg>
              </div>
              <span className="font-mono text-xs">Discord</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
