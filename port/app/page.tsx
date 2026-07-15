"use client";

import Player from "@/Components/player";

export default function Page() {
  return (
    <main className="min-h-screen w-full bg-black overflow-hidden flex">
      {/* Left column — CD player */}
      <div className="flex-[2] flex items-center justify-center p-8">
        <Player />
      </div>
      {/* Right column — placeholder for future content */}
      <div className="flex-1" />
    </main>
  );
}
