import { useState, useRef, useEffect } from 'react'

const COMMANDS = {
  help: () => 'Available commands: about, skills, contact, clear, exit',
  about: () => 'Frontend Developer specializing in retro-modern interfaces.',
  skills: () => 'React, JavaScript, Three.js, Node.js, Tailwind, Firebase',
  contact: () => 'GitHub: github.com/ck0xdev | Discord: ck0x.exe',
  clear: null,
  exit: null,
}

export default function Terminal({ open, onClose }) {
  const [lines, setLines] = useState([
    { text: "Welcome to ck0x portfolio", type: 'info' },
    { text: "Type 'help' for available commands", type: 'info' },
  ])
  const [input, setInput] = useState('')
  const inputRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus()
  }, [open])

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight
    }
  }, [lines])

  const handleKey = (e) => {
    if (e.key !== 'Enter') return
    const cmd = input.trim()
    setInput('')

    const newLines = [...lines, { text: `$ ${cmd}`, type: 'cmd' }]

    if (cmd === 'clear') {
      setLines([])
      return
    }
    if (cmd === 'exit') {
      newLines.push({ text: 'Goodbye!', type: 'out' })
      setLines(newLines)
      setTimeout(onClose, 400)
      return
    }
    if (COMMANDS[cmd]) {
      newLines.push({ text: COMMANDS[cmd](), type: 'out' })
    } else if (cmd) {
      newLines.push({ text: `Command not found: ${cmd}`, type: 'error' })
    }

    setLines(newLines)
  }

  return (
    <div
      className="fixed bottom-0 left-0 right-0 h-64 bg-retro-navy/95 dark:bg-black/95 backdrop-blur-sm transition-transform duration-300 z-40 border-t-4 border-retro-teal font-mono text-sm p-4 overflow-hidden terminal text-green-400"
      style={{ transform: open ? 'translateY(0)' : 'translateY(100%)' }}
    >
      <div className="max-w-4xl mx-auto h-full flex flex-col">
        <div className="flex justify-between items-center mb-4 border-b border-green-400/30 pb-2">
          <span className="text-xs opacity-70">ck0x@portfolio:~</span>
          <button onClick={onClose} className="text-red-400 hover:text-red-300">
            [x]
          </button>
        </div>
        <div ref={contentRef} className="flex-1 overflow-y-auto space-y-1">
          {lines.map((line, i) => (
            <p
              key={i}
              className={
                line.type === 'cmd'
                  ? 'text-retro-terra'
                  : line.type === 'error'
                  ? 'text-red-400'
                  : 'opacity-70'
              }
            >
              {line.text}
            </p>
          ))}
          <div className="flex items-center gap-2">
            <span className="text-retro-terra">$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              className="bg-transparent outline-none flex-1 text-retro-cream"
              placeholder="_"
              autoComplete="off"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
