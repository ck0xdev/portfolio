export default function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-current">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 font-mono text-xs opacity-60">
        <p>© 2026 ck0x. Frontend Developer</p>
        <p className="flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          System Operational
        </p>
      </div>
    </footer>
  )
}
