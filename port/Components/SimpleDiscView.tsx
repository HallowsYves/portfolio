"use client";

import React, { useState, useEffect, useRef } from "react";
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
  const [isSpinning, setIsSpinning] = useState(false);
  const [angle, setAngle] = useState(0);
  const [rotationSpeed, setRotationSpeed] = useState(0);
  
  const acceleration = 0.3;  
  const maxSpeed = 25;        
  const friction = 0.95;     
  
  const animationFrameId = useRef<number | null>(null);
  
  const updateRotation = () => {
    if (isSpinning) {
      setRotationSpeed((prevSpeed) => {
        if (prevSpeed < maxSpeed) {
          return prevSpeed + acceleration;
        }
        return prevSpeed;
      });
    } else {
      setRotationSpeed((prevSpeed) => {
        const newSpeed = prevSpeed * friction;
        
        if (newSpeed < 0.01) {
          return 0;
        }
        return newSpeed;
      });
    }
    
    setAngle((prevAngle) => prevAngle + rotationSpeed);
  };
  
  const animate = () => {
    updateRotation();  
    
    animationFrameId.current = requestAnimationFrame(animate);
  };
  
  useEffect(() => {
    console.log("Effect running! isSpinning:", isSpinning);
    
    animationFrameId.current = requestAnimationFrame(animate);
    
    return () => {
      console.log("Cleanup running!");
      if (animationFrameId.current !== null) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isSpinning, rotationSpeed]); 
  
  
  return (
    <div className="min-h-screen bg-[#121212] flex flex-col items-start justify-center p-4">
      <div
        className="relative w-72 h-72 md:w-96 md:h-96 cursor-pointer"
        onClick={() => setIsSpinning(!isSpinning)}
      >
        <CompactDisc disc={ABOUT_DISC} isSpinning={isSpinning} angle={angle} />
      </div>
      
    </div>
  );
}