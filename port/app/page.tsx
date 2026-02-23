"use client";

import React, { useState } from "react";
import SimpleDiscView from "@/Components/SimpleDiscView";
// Focused Data

export default function Page() {
  const [isSpinning, setIsSpinning] = useState(true);
  return (
    <SimpleDiscView /> 
  );
}
