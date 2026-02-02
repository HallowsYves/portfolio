'use client';

import React, { useState } from 'react';
import CompactDisc from '@/Components/CompactDisc';
import { Disc } from '@/types';
import coverImage from '@/public/cover.jpg';

// Focused Data
const ABOUT_DISC: Disc = {
  id: 'about',
  title: 'ABOUT ME',
  artist: 'The Developer',
  year: '1995',
  color: 'from-amber-500 to-orange-600',
  image: coverImage,
  trackList: ['Intro', 'Skills', 'History'],
  content: null 
};

export default function SimpleDiscView() {
  const [isSpinning, setIsSpinning] = useState(true);

  return (
    <div className="min-h-screen bg-[#121212] flex flex-col items-center justify-center p-4">
      
      {/* Container for the Disc */}
      <style jsx global>
        {`
        .compact-disc { animation: spin 1s linear infinite; transition: animation-play-state 2s ease-out; }
        .is-playing {animation-play-state: running;}
        .is-paused {animation-play-state: paused;}
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}
      </style>
      <div 
        className="relative w-72 h-72 md:w-96 md:h-96 cursor-pointer"
        onClick={() => setIsSpinning(!isSpinning)}
      >
        <CompactDisc disc={ABOUT_DISC} isSpinning={isSpinning} />
      </div>

      {/* Simple Label */}
      <div className="mt-8 text-center font-mono">
        <h1 className="text-white text-2xl font-bold tracking-tighter uppercase">
          {ABOUT_DISC.title}
        </h1>
        <p className="text-amber-500 text-sm mt-2 opacity-80">
          {isSpinning ? '● SPINNING' : '○ PAUSED'}
        </p>
      </div>

      {/* Optional: Add back the tracklist or info below */}
      <div className="mt-12 max-w-md w-full border-t border-white/10 pt-6">
        <ul className="grid grid-cols-1 gap-3 text-amber-100/60 font-mono text-sm">
          {ABOUT_DISC.trackList.map((track, i) => (
            <li key={track} className="flex justify-between">
              <span>0{i + 1} {track}</span>
              <span className="opacity-30">4:0{i + 2}</span>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}