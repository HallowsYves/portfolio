'use client';

import React, { useState, useEffect } from 'react';
import { Disc, Play, Pause, SkipBack, Volume2, Power } from 'lucide-react';
import CompactDisc from '@/Components/CompactDisc';
import JewelCaseSpine from '@/Components/JewelCaseSpine';


const DISCS = [
  {
    id: 'about',
    title: 'ABOUT ME',
    artist: 'The Developer',
    year: '1995',
    color: 'from-amber-500 to-orange-600',
    trackList: ['Intro', 'Skills', 'History'],
    content: (
      <div className="space-y-4 font-mono text-sm md:text-base leading-relaxed text-amber-100">
        <h2 className="text-xl md:text-2xl font-bold text-amber-500 mb-4">TRACK 01: ORIGIN</h2>
        <p>Blah blah blah blah </p>
        <h2 className="text-xl md:text-2xl font-bold text-amber-500 mb-4 mt-8">TRACK 02: STACK</h2>
        <ul className="grid grid-cols-2 gap-2 text-xs md:text-sm opacity-80">
          <li>[01] React / Next.js</li>
          <li>[02] TypeScript</li>
          <li>[03] Tailwind CSS</li>
          <li>[04] </li>
        </ul>
      </div>
    )
  },
  {
    id: 'projects',
    title: 'GALLERY',
    artist: 'Creative Works',
    year: '2023',
    color: 'from-purple-500 to-pink-600',
    trackList: ['Web', 'Mobile', 'Design'],
    content: (
      <div className="space-y-6 font-mono text-purple-100">
        <div className="border-b border-purple-500/30 pb-2 mb-4">
          <h3 className="text-lg font-bold text-purple-400">PROJECT_ALPHA.EXE</h3>
          <p className="text-xs opacity-70">Interactive CD Portfolio System</p>
        </div>
        <div className="border-b border-purple-500/30 pb-2 mb-4">
          <h3 className="text-lg font-bold text-purple-400">NEON_DREAMS.WAV</h3>
          <p className="text-xs opacity-70">A nostalgic audio visualizer experience.</p>
        </div>
      </div>
    )
  }
];


export default function PortfolioPage() {
  const [currentDisc, setCurrentDisc] = useState<any>(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let interval: any;
    if (currentDisc && loadingProgress < 100) {
      setIsPlaying(true);
      interval = setInterval(() => {
        setLoadingProgress(prev => {
          const next = prev + Math.random() * 20;
          return next > 100 ? 100 : next;
        });
      }, 400);
    }
    return () => clearInterval(interval);
  }, [currentDisc, loadingProgress]);

  const handleEject = () => {
    setCurrentDisc(null);
    setLoadingProgress(0);
    setIsPlaying(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center p-4">
      <div className="relative w-full max-w-5xl h-[600px] bg-[#1a1a1a] rounded-2xl shadow-2xl border border-white/5 flex flex-col md:flex-row overflow-hidden">
        
        {/* PLAYER SECTION */}
        <div className="w-full md:w-2/5 bg-[#222] p-6 flex flex-col border-b md:border-b-0 md:border-r border-black">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <Power className="w-3 h-3 text-green-500" />
              <span className="text-[10px] font-mono opacity-40">READY_MODE</span>
            </div>
            <Volume2 className="w-4 h-4 opacity-40" />
          </div>

          <div className="flex-grow flex items-center justify-center relative">
            <div className="w-56 h-56 md:w-64 md:h-64 rounded-full bg-black/40 border-4 border-[#333] flex items-center justify-center">
              {currentDisc ? (
                <CompactDisc disc={currentDisc} isSpinning={isPlaying} />
              ) : (
                <span className="text-[10px] font-mono opacity-20 tracking-widest uppercase">Insert Disc</span>
              )}
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div className="bg-black/60 p-3 rounded font-mono border border-white/5">
              <div className="text-[10px] text-green-500 opacity-50 mb-1">TRACK_INFO</div>
              <div className="text-xs text-green-400 truncate">
                {currentDisc ? `${currentDisc.artist} - ${currentDisc.title}` : '---'}
              </div>
              <div className="mt-2 h-1 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 transition-all" style={{ width: `${loadingProgress}%` }} />
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2">
              <button className="h-10 bg-[#333] rounded hover:bg-[#383838] flex items-center justify-center"><SkipBack size={16}/></button>
              <button onClick={() => currentDisc && setIsPlaying(!isPlaying)} className="h-10 bg-[#333] rounded col-span-2 flex items-center justify-center text-green-400">
                {isPlaying ? <Pause size={18} fill="currentColor"/> : <Play size={18} fill="currentColor"/>}
              </button>
              <button onClick={handleEject} className="h-10 bg-[#333] rounded flex items-center justify-center text-red-500"><Disc size={16}/></button>
            </div>
          </div>
        </div>

        {/* CONTENT/SHELF SECTION */}
        <div className="flex-grow relative bg-[#111]">
          {currentDisc ? (
            <div className="absolute inset-0 p-8 md:p-12 overflow-y-auto animate-in fade-in slide-in-from-right-4 duration-700">
              {loadingProgress < 100 ? (
                <div className="h-full flex items-center justify-center">
                  <span className="font-mono text-xs animate-pulse">LOADING_DATA...</span>
                </div>
              ) : (
                <div className="max-w-xl">
                  <h1 className="text-4xl font-black mb-1">{currentDisc.title}</h1>
                  <div className="h-1 w-12 bg-white/20 mb-8" />
                  {currentDisc.content}
                </div>
              )}
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center md:justify-start md:pl-12">
              <div className="h-3/4 flex space-x-1 items-end">
                {DISCS.map(d => (
                  <JewelCaseSpine key={d.id} disc={d} onClick={setCurrentDisc} disabled={false} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx global>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }
      `}</style>
    </div>
  );
}