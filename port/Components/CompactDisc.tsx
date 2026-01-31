import React from 'react';
import { Disc } from '@/types';

interface CompactDiscProps {
  disc: Disc;
  isSpinning: boolean;
}

export default function CompactDisc({ disc, isSpinning }: CompactDiscProps) {
  return (
    <div className={`relative w-64 h-64 rounded-full shadow-2xl flex items-center justify-center overflow-hidden transition-all duration-1000 ${isSpinning ? 'animate-spin-slow' : ''}`}>
        {/* Disc Surface */}
        <div className={`absolute inset-0 bg-gradient-to-br ${disc.color} opacity-90`} />
        
        {/* Holographic Reflection */}
        <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0deg,white_45deg,transparent_90deg,transparent_180deg,white_225deg,transparent_270deg)] opacity-30 mix-blend-overlay" />
        
        {/* Data Rings */}
        <div className="absolute inset-2 rounded-full border border-white/20" />
        <div className="absolute inset-16 rounded-full border border-white/10" />
        <div className="absolute inset-20 rounded-full border-4 border-black/10" />
        
        {/* Label Art */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 rotate-90">
        <span className="text-white/80 font-bold text-xl drop-shadow-lg tracking-wider">{disc.artist}</span>
        <span className="text-white font-black text-3xl uppercase tracking-tighter leading-none mt-1">{disc.title}</span>
        </div>

        {/* Center Spindle/Hub Mechanism */}
        <div className="absolute w-14 h-14 bg-gradient-to-b from-[#222] to-[#000] rounded-full z-20 shadow-[0_4px_8px_rgba(0,0,0,0.8)] flex items-center justify-center border border-white/5">
        {/* Outer Grip Ring */}
        <div className="absolute inset-0 rounded-full border-2 border-dashed border-white/10 opacity-30 animate-spin-slow" style={{ animationDuration: '10s' }}></div>
        
        {/* Inner Clamp */}
        <div className="w-8 h-8 bg-[#111] rounded-full border border-white/5 flex items-center justify-center shadow-inner relative">
            <div className="w-2 h-2 bg-[#050505] rounded-full border border-white/10"></div>
            {/* 3 locking teeth */}
            <div className="absolute top-0 w-1 h-2 bg-[#333] rounded-full"></div>
            <div className="absolute bottom-1 left-1 w-1 h-2 bg-[#333] rounded-full rotate-[120deg]"></div>
            <div className="absolute bottom-1 right-1 w-1 h-2 bg-[#333] rounded-full -rotate-[120deg]"></div>
        </div>
        </div>
    </div>
  );
}