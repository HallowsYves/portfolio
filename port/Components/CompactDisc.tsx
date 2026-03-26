import React from "react";
import { Disc } from "@/types";
import Image from "next/image";

interface CompactDiscProps {
  disc: Disc;
  isSpinning: boolean;
  angle: number;
}

export default function CompactDisc({ disc, isSpinning, angle }: CompactDiscProps) {
  return (
    <div className="relative w-full h-full rounded-full shadow-2xl flex items-center justify-center overflow-hidden">
      <div style={{transform: `rotate(${angle}deg)`}} className="absolute inset-0">

        {/* Disc Surface */}
        <div className={`absolute inset-0 bg-gradient-to-br opacity-90`} />
        {/* Holographic Reflection */}
        <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0deg,white_45deg,transparent_90deg,transparent_180deg,white_225deg,transparent_270deg)] opacity-30 mix-blend-overlay" />
        {/* Label Art */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 rotate-90">
          <div className="absolute inset-0 overflow-hidden rounded-full">
            <Image
              src={disc.image}
              alt={disc.title}
              fill
              className="object-cover"
              sizes="256px"
              />
            </div>
          </div>
      </div>
    </div>
  );
}
