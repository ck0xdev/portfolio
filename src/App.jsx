import React, { useState, useEffect } from 'react';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className="relative min-h-screen bg-[#f0f0f0] dark:bg-[#111111] transition-colors duration-300 flex flex-col overflow-hidden selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black font-sans">
      
      {/* Theme Toggle */}
      <div className="absolute top-6 right-6 z-50">
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="w-12 h-12 flex items-center justify-center text-xl bg-white dark:bg-black text-black dark:text-white border-2 border-black dark:border-white rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] transition-all active:translate-x-[4px] active:translate-y-[4px] active:shadow-none dark:active:shadow-none"
          aria-label="Toggle Dark Mode"
        >
          {isDarkMode ? '🌙' : '☀️'}
        </button>
      </div>

      {/* Liquid Background Orbs */}
      <div className="absolute inset-0 w-full h-full flex justify-center items-center z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#ff90e8] rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[80px] opacity-60 dark:opacity-30 animate-blob"></div>
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#ffc900] rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[80px] opacity-60 dark:opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-[500px] h-[500px] bg-[#00f0ff] rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[80px] opacity-60 dark:opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Centered Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center relative z-10 px-6 w-full pt-12 pb-12">
        {/* Soft Neobrutalist Glass Card */}
        <div className="w-full max-w-2xl flex flex-col items-center text-center p-10 md:p-14 bg-white/30 dark:bg-black/30 backdrop-blur-xl border-2 border-black dark:border-white rounded-[2rem] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[12px_12px_0px_0px_rgba(255,255,255,1)] transition-all duration-300">
          
          {/* Status Badge */}
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/60 dark:bg-black/60 border-2 border-black dark:border-white mb-8 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] backdrop-blur-md transition-colors">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ffc900] border border-black dark:border-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#ffc900] border border-black dark:border-white"></span>
            </span>
            <span className="text-xs font-bold text-black dark:text-white tracking-widest uppercase transition-colors">Portfolio Redesign</span>
          </div>

          {/* Hero Title */}
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-black dark:text-white mb-6 transition-colors">
            Coming Soon
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg md:text-xl text-black/80 dark:text-white/80 max-w-lg mx-auto mb-10 leading-relaxed font-medium transition-colors">
            A new portfolio experience is currently under development. Until it launches, feel free to explore my GitHub or connect with me via Discord below.
          </p>
        </div>
      </main>

      {/* Footer Info pinned to bottom */}
      <footer className="relative z-10 w-full px-6 pb-6 mt-auto">
        <div className="max-w-3xl mx-auto pt-6 border-t-2 border-black/10 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 transition-colors">
          <p className="text-xs font-bold text-black/60 dark:text-white/60 tracking-[0.2em] uppercase text-center sm:text-left transition-colors">
            Student &bull; Frontend Developer
          </p>
          <div className="flex items-center justify-center gap-6">
            <a 
              href="https://github.com/ck0xdev" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm font-bold text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors"
            >
              GitHub
            </a>
            <a 
              href="https://discord.com/users/1389525213376544768" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm font-bold text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors"
            >
              Discord
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}