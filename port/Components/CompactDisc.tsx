import React from "react";
import { Disc } from "@/types";
import Image from "next/image";

interface CompactDiscProps {
  disc: Disc;
  isSpinning: boolean;
  angle: number;
}

export default function CompactDisc({ disc, angle }: CompactDiscProps) {
  return (
    // Dark base so the disc is always visible even before the image loads
    <div className="relative w-full h-full rounded-full overflow-hidden bg-zinc-900 shadow-2xl">

      {/* ── Rotating layer ─────────────────────────────────────────── */}
      <div
        className="absolute inset-0"
        style={{ transform: `rotate(${angle}deg)` }}
      >
        {/* Colored disc surface — can use {disc.color} to apply gradient */}
        {/* Holographic iridescent sheen */}
        <div
          className="absolute inset-0 opacity-25 mix-blend-overlay"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0deg, white 45deg, transparent 90deg, transparent 180deg, white 225deg, transparent 270deg)",
          }}
        />

        {/* Cover art — rotate-90 so portrait images read upright on the disc face */}
        <div className="absolute inset-0 rotate-90 overflow-hidden rounded-full">
          <Image
            src={disc.image}
            alt={disc.title}
            fill
            className="object-cover opacity-60"
            sizes="300px"
            draggable={false}
            style={{ userSelect: "none", WebkitUserDrag: "none" } as React.CSSProperties}
          />
        </div>
      </div>

      {/* ── Static center hole — sits above the rotating layer ──────── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-10 h-10 rounded-full bg-zinc-900 ring-2 ring-zinc-700"
          style={{ boxShadow: "inset 0 2px 4px rgba(0,0,0,0.8)" }}
        />
      </div>
    </div>
  );
}
