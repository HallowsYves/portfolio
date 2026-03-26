"use client";

import React, { useState } from "react";
import SimpleDiscView from "@/Components/SimpleDiscView";
import Player from "@/Components/player";
// Focused Data

export default function Page() {
  const [isSpinning, setIsSpinning] = useState(true);
  return (
    <div>
      <Player />
    </div>
  );
}
