"use client";

import React, { useState } from "react";
import CompactDisc from "@/Components/CompactDisc";
import { Disc } from "@/types";
import coverImage from "@/public/bfd476072d2e25015d933be8d6fa0570.jpg";

// Focused Data
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

export default function SimpleDiscView() {
  const [isSpinning, setIsSpinning] = useState(true);
  return (
    <div className="min-h-screen bg-[#121212] flex flex-col items-start justify-center p-4">
      {/* Container for the Disc */}
      <style jsx global>
        {`
          .compact-disc {
            animation: spin 1s linear infinite;
            transition: animation-play-state 2s ease-out;
            animation-fill-mode: forwards;
          }
          .is-playing {
            animation-play-state: running;
          }
          .is-paused {
            animation-play-state: paused;
          }
          @keyframes spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
      <div
        className="relative w-72 h-72 md:w-96 md:h-96 cursor-pointer"
        onClick={() => setIsSpinning(!isSpinning)}
      >
        <CompactDisc disc={ABOUT_DISC} isSpinning={isSpinning} />
      </div>
    </div>
  );
}
