import React from 'react';

interface DiscProps {
  disc: {
    title: string;
    color: string;
  };
  isSpinning: boolean;
}

const CompactDisc = ({ disc, isSpinning }: DiscProps) => (
  <div className={`relative w-48 h-48 md:w-64 md:h-64 rounded-full shadow-2xl flex items-center justify-center overflow-hidden transition-all duration-1000 ${isSpinning ? 'animate-spin-slow' : ''}`}>
    <div className={`absolute inset-0 bg-gradient-to-br ${disc.color} opacity-90`} />
    <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0deg,white_45deg,transparent_90deg,transparent_180deg,white_225deg,transparent_270deg)] opacity-30 mix-blend-overlay" />
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 rotate-90">
      <span className="text-white font-black text-xl md:text-2xl uppercase tracking-tighter leading-none">{disc.title}</span>
    </div>
    {/* Center Spindle */}
    <div className="absolute w-12 h-12 bg-gradient-to-b from-[#222] to-[#000] rounded-full z-20 shadow-xl flex items-center justify-center border border-white/5">
      <div className="w-6 h-6 bg-[#111] rounded-full border border-white/5 flex items-center justify-center">
         <div className="w-1.5 h-1.5 bg-[#050505] rounded-full border border-white/10"></div>
      </div>
    </div>
  </div>
);

export default CompactDisc;