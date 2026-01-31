'use client';

import React, { useState, useEffect } from 'react';
import { Power, Volume2, SkipBack, Play, Pause, Disc as DiscIcon } from 'lucide-react';

// Import our new sub-components
import CompactDisc from '@/Components/CompactDisc';
import JewelCaseSpine from '@/Components/JewelCaseSpine';
import AudioVisualizer from '@/Components/AudioVisualizer';

// Import our Shared Type
import { Disc } from '@/types';

// --- Data ---
const DISCS: Disc[] = [
  {
    id: 'about',
    title: 'ABOUT ME',
    artist: 'The Developer',
    year: '1995',
    color: 'from-amber-500 to-orange-600',
    image:'/7ae040a97b3e8b6fdaf838c1c76be543.jpg',
    trackList: ['Intro', 'Skills', 'History'],
    content: (
      <div className="space-y-4 font-mono text-sm md:text-base leading-relaxed text-amber-100">
        <h2 className="text-xl md:text-2xl font-bold text-amber-500 mb-4 mt-6">TRACK 01: ORIGIN</h2>
        <p>I am a creative developer with a passion for retro aesthetics and modern performance.</p>
        <h2 className="text-xl md:text-2xl font-bold text-amber-500 mb-4 mt-8">TRACK 02: STACK</h2>
        <ul className="grid grid-cols-2 gap-2 text-xs md:text-sm opacity-80">
          <li>[01] React.js / Next.js</li>
          <li>[02] TypeScript</li>
          <li>[03] Node.js Logic</li>
          <li>[04] UX/UI Design</li>
        </ul>
      </div>
    )
  },
  {
    id: 'projects',
    title: 'GALLERY',
    artist: 'Various Artists',
    year: '2023',
    color: 'from-purple-500 to-pink-600',
    trackList: ['Web Apps', 'Mobile', 'Design'],
    content: (
      <div className="space-y-6 font-mono text-purple-100">
        <div className="border-b border-purple-500/30 pb-2 mb-4">
          <h3 className="text-lg font-bold text-purple-400">PROJECT_ALPHA.EXE</h3>
          <p className="text-xs opacity-70">Full Stack E-Commerce Solution</p>
        </div>
        <p className="text-xs animate-pulse mt-8">&gt;&gt; INSERT DISC 2 FOR ARCHIVED WORKS...</p>
      </div>
    )
  },
  {
    id: 'contact',
    title: 'CONTACT',
    artist: 'Transmission',
    year: '2024',
    color: 'from-emerald-500 to-teal-600',
    trackList: ['Email', 'Socials', 'Offices'],
    content: (
      <div className="space-y-8 font-mono text-emerald-100">
        <div className="bg-emerald-900/20 p-4 border border-emerald-500/30 rounded">
          <h3 className="text-emerald-400 font-bold mb-2">SEND TRANSMISSION</h3>
          <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
            <input type="text" placeholder="CODENAME" className="w-full bg-black/50 border border-emerald-500/30 p-2 text-sm focus:outline-none focus:border-emerald-400 transition-colors" />
            <button className="bg-emerald-600 hover:bg-emerald-500 text-black font-bold py-2 px-4 w-full text-xs tracking-widest uppercase transition-colors">Transmit</button>
          </form>
        </div>
      </div>
    )
  }
];

export default function Portfolio() {
  const [currentDisc, setCurrentDisc] = useState<Disc | null>(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Logic: Handle "Reading" the disc
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (currentDisc && loadingProgress < 100) {
      setIsPlaying(true);
      interval = setInterval(() => {
        setLoadingProgress(prev => {
          const next = prev + Math.random() * 15;
          return next > 100 ? 100 : next;
        });
      }, 300);
    } else if (!currentDisc) {
      setLoadingProgress(0);
      setIsPlaying(false);
    }
    return () => clearInterval(interval);
  }, [currentDisc, loadingProgress]);

  const handleEject = () => {
    setIsPlaying(false);
    setCurrentDisc(null);
    setLoadingProgress(0);
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white flex items-center justify-center p-4 md:p-8 font-sans overflow-hidden">
      <div className="relative w-full max-w-6xl h-[85vh] md:h-[700px] bg-[#1a1a1a] rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-white/5 flex flex-col md:flex-row overflow-hidden">
        
        {/* PLAYER SIDE */}
        <div className="w-full md:w-5/12 lg:w-1/3 bg-[#222] p-6 flex flex-col relative border-b md:border-b-0 md:border-r border-black/50 z-20 shadow-xl">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center space-x-2">
            </div>
          </div>

          <div className="flex-grow flex flex-col items-center justify-center relative">
            <div className="relative w-72 h-72 bg-black/40 rounded-full border-4 border-[#333] shadow-inner flex items-center justify-center mb-8">
              {currentDisc ? (
                <div className="transition-all duration-700 ease-out transform scale-100 opacity-100">
                  <CompactDisc disc={currentDisc} isSpinning={isPlaying} />
                </div>
              ) : (
                <div className="text-white/10 text-xs font-mono tracking-widest text-center">NO DISC<br/>INSERTED</div>
              )}
            </div>

            <div className="w-full bg-[#111] border border-white/5 p-4 rounded-lg font-mono mb-6 relative overflow-hidden group">
               <div className="flex justify-between items-end text-green-500/80 mb-2">
                 <span className="text-[10px]">TRACK</span>
                 <span className="text-[10px]">{currentDisc ? '01' : '--'}</span>
               </div>
               <p className="text-sm truncate text-green-400 font-bold uppercase tracking-wider">
                 {currentDisc ? `${currentDisc.artist} - ${currentDisc.title}` : 'WAITING FOR INPUT...'}
               </p>
               <div className="flex justify-between items-center mt-2">
                 <span className="text-xs text-green-500/60">
                   {currentDisc && loadingProgress < 100 ? `READING ${Math.floor(loadingProgress)}%` : currentDisc ? 'PLAYING' : 'IDLE'}
                 </span>
                 <AudioVisualizer isPlaying={isPlaying} />
               </div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4 mt-auto">
             <button className="h-12 bg-[#2a2a2a] rounded flex items-center justify-center hover:bg-[#333] transition-colors"><SkipBack className="w-4 h-4 text-white/70"/></button>
             <button onClick={() => currentDisc && setIsPlaying(!isPlaying)} className="h-12 bg-[#2a2a2a] rounded flex items-center justify-center hover:bg-[#333] transition-colors col-span-2 text-green-400">
                {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
             </button>
             <button onClick={handleEject} disabled={!currentDisc} className="h-12 bg-[#333] border border-red-900/30 rounded flex items-center justify-center hover:bg-red-900/20 transition-colors group disabled:opacity-50">
                <DiscIcon className={`w-4 h-4 text-red-500 ${currentDisc ? 'group-hover:animate-pulse' : ''}`} />
             </button>
          </div>
        </div>

        {/* CONTENT SIDE */}
        <div className="flex-grow relative bg-[#181818] overflow-hidden flex flex-col">
          <div className={`absolute inset-0 p-8 md:p-12 overflow-y-auto transition-all duration-700 ${currentDisc ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20 pointer-events-none'}`}>
             <div className="max-w-2xl mx-auto h-full flex flex-col">
                <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-8">
                  <h1 className="text-3xl md:text-5xl font-black text-white uppercase">{currentDisc?.title}</h1>
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${currentDisc?.color} opacity-20 animate-pulse`}></div>
                </div>
                <div className="flex-grow">
                  {loadingProgress < 100 ? (
                    <div className="h-full flex flex-col items-center justify-center space-y-4">
                      <div className="w-full max-w-xs h-1 bg-[#333] rounded-full overflow-hidden">
                        <div className="h-full bg-white transition-all duration-300" style={{ width: `${loadingProgress}%`}} />
                      </div>
                    </div>
                  ) : (
                    <div className="animate-fade-in-up">{currentDisc?.content}</div>
                  )}
                </div>
                <div className="mt-8 pt-6 border-t border-white/10 flex justify-between items-center text-xs text-white/30 font-mono">
                  <span>TRACKS: {currentDisc?.trackList.join(' / ')}</span>
                  <button onClick={handleEject} className="hover:text-red-400">CLOSE_SESSION</button>
                </div>
             </div>
          </div>

          <div className={`absolute inset-0 bg-[#0a0a0a] flex items-center pl-12 transition-all duration-700 ${!currentDisc ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20 pointer-events-none'}`}>
             <div className="relative h-[80%] flex items-center space-x-1 py-10 px-4 overflow-x-auto w-full">
                {DISCS.map((disc) => (
                  <JewelCaseSpine key={disc.id} disc={disc} onClick={setCurrentDisc} disabled={!!currentDisc} />
                ))}
             </div>
          </div>
        </div>
      </div>
      <style jsx global>{`
        .animate-spin-slow { animation: spin 3s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-fade-in-up { animation: fadeInUp 0.5s ease-out forwards; }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}