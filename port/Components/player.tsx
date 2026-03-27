"use client";

import React, { useRef, useState } from "react";
import { useDiscPhysics } from "@/hooks/useDiscPhysics";
import DraggableCD from "@/Components/DraggableCD";
import { Disc } from "@/types";
import coverImage from "@/public/bfd476072d2e25015d933be8d6fa0570.jpg";

// ── Single source of truth for disc diameter (px) ──────────────────────────
export const DISC_SIZE = 300;

const ABOUT_DISC: Disc = {
  id: "about",
  title: "ABOUT ME",
  artist: "The Developer",
  year: "1995",
  color: "from-amber-500 to-orange-600",
  image: coverImage,
  trackList: ["Intro", "Skills", "History"],
  content: null,
};

// ── CD Player Dock ──────────────────────────────────────────────────────────
interface CDPlayerDockProps {
  dockRef: React.RefObject<HTMLDivElement | null>;
  isLoaded: boolean;
}

function CDPlayerDock({ dockRef, isLoaded }: CDPlayerDockProps) {
  return (
    <div
      ref={dockRef}
      className={`
        absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        rounded-full transition-all duration-300
        ${isLoaded ? "ring-2 ring-green-500/50" : "ring-2 ring-zinc-600/50"}
      `}
      style={{
        // Matches DraggableCD wrapper exactly so they overlap perfectly on snap
        width: DISC_SIZE,
        height: DISC_SIZE,
        background: `radial-gradient(circle at 50% 40%,
          rgba(30,30,35,1) 0%,
          rgba(20,20,25,1) 50%,
          rgba(15,15,20,1) 100%
        )`,
        boxShadow: `
          inset 0 4px 8px rgba(0,0,0,0.6),
          inset 0 -2px 4px rgba(255,255,255,0.05),
          0 1px 2px rgba(255,255,255,0.1)
        `,
      }}
    >
      {/* Inner groove ring */}
      <div
        className="absolute inset-6 rounded-full"
        style={{
          boxShadow: "inset 0 2px 4px rgba(0,0,0,0.4)",
          border: "1px solid rgba(255,255,255,0.05)",
        }}
      />

      {/* Center spindle */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="w-8 h-8 rounded-full bg-zinc-700"
          style={{
            boxShadow:
              "0 2px 4px rgba(0,0,0,0.5), inset 0 1px 2px rgba(255,255,255,0.1)",
          }}
        />
      </div>

      {/* Loaded indicator */}
      {isLoaded && (
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        </div>
      )}
    </div>
  );
}

// ── Main Player ─────────────────────────────────────────────────────────────
export default function Player() {
  const containerRef = useRef<HTMLDivElement>(null);
  const dockRef = useRef<HTMLDivElement>(null);
  const [isDocked, setIsDocked] = useState(false);

  const { angle, isSpinning, toggleSpin, stopSpin } = useDiscPhysics();

  const handleDock = () => setIsDocked(true);

  const handleEject = () => {
    stopSpin();
    setIsDocked(false);
  };

  return (
    <div
      ref={containerRef}
      className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-zinc-800 to-zinc-900"
      style={{
        width: 640,
        height: 560,
        boxShadow:
          "0 25px 50px -12px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
      }}
    >
      {/* Inner housing panel */}
      <div className="absolute inset-4 rounded-xl border border-zinc-700/50">
        <CDPlayerDock dockRef={dockRef} isLoaded={isDocked} />

        {/* Controls — only shown when docked */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4">
          {isDocked && (
            <>
              <button
                onClick={toggleSpin}
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  ${
                    isSpinning
                      ? "bg-green-600 hover:bg-green-700 text-white"
                      : "bg-zinc-700 hover:bg-zinc-600 text-zinc-200"
                  }
                `}
              >
                {isSpinning ? "Pause" : "Play"}
              </button>
              <button
                onClick={handleEject}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-zinc-700 hover:bg-zinc-600 text-zinc-200 transition-all duration-200"
              >
                Eject
              </button>
            </>
          )}
        </div>

        {!isDocked && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 text-zinc-500 text-sm whitespace-nowrap">
            Drag the CD to the player
          </div>
        )}
      </div>

      {/* Draggable CD — starts bottom-left, snaps to dock center */}
      <DraggableCD
        containerRef={containerRef}
        dockRef={dockRef}
        disc={ABOUT_DISC}
        size={DISC_SIZE}
        isDocked={isDocked}
        isSpinning={isSpinning}
        angle={angle}
        onDock={handleDock}
        onToggleSpin={toggleSpin}
      />
    </div>
  );
}
