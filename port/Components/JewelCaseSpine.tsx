import React from 'react';
import { Disc } from '@/types';

interface JewelCaseSpineProps {
  disc: Disc;
  onClick: (disc: Disc) => void;
  disabled: boolean;
}

export default function JewelCaseSpine({ disc, onClick, disabled }: JewelCaseSpineProps) {
  return (
    <button
        onClick={() => !disabled && onClick(disc)}
        className={`
        group relative h-full w-12 md:w-16 lg:w-20 transition-all duration-500 ease-out
        flex flex-col items-center justify-center border-r border-white/10 shadow-2xl
        ${disabled ? 'opacity-30 cursor-not-allowed grayscale' : 'hover:w-24 md:hover:w-32 cursor-pointer hover:z-10'}
        `}
        style={{ perspective: '1000px' }}
    >
        {/* Background Gradient */}
        <div className={`absolute inset-0 bg-gradient-to-b ${disc.color} opacity-80 group-hover:opacity-100 transition-opacity`} />
        
        {/* Plastic Sheen Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-black/40 pointer-events-none" />
        
        {/* Spine Label (Vertical Text) */}
        <div className="relative z-10 h-full flex flex-col items-center py-8 justify-between">
        <span className="writing-vertical text-[10px] font-bold tracking-widest text-black/60 uppercase">
            Vol. {disc.year}
        </span>
        <h3 className="writing-vertical text-lg md:text-xl font-black tracking-widest text-white drop-shadow-md whitespace-nowrap">
            {disc.title}
        </h3>
        <div className="w-1 h-8 bg-black/20 rounded-full" />
        </div>

        {/* Hover "Pull Out" Effect (simulated by margin transition in parent, but visuals here) */}
        <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-white/50" />
    </button>
  );
}