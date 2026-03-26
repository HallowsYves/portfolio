"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface UseDiscPhysicsOptions {
  acceleration?: number;
  maxSpeed?: number;
  friction?: number;
}

interface UseDiscPhysicsReturn {
  angle: number;
  isSpinning: boolean;
  toggleSpin: () => void;
  stopSpin: () => void;
}

export function useDiscPhysics({
  acceleration = 0.3,
  maxSpeed = 25,
  friction = 0.95,
}: UseDiscPhysicsOptions = {}): UseDiscPhysicsReturn {
  const [angle, setAngle] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);

  // Refs let the animation loop read current values without stale closures
  const isSpinningRef = useRef(false);
  const speedRef = useRef(0);
  const rafId = useRef<number | null>(null);

  const animate = useCallback(() => {
    if (isSpinningRef.current) {
      speedRef.current = Math.min(speedRef.current + acceleration, maxSpeed);
    } else {
      speedRef.current *= friction;
      if (speedRef.current < 0.01) speedRef.current = 0;
    }

    if (speedRef.current > 0) {
      setAngle((prev) => prev + speedRef.current);
    }

    rafId.current = requestAnimationFrame(animate);
  }, [acceleration, maxSpeed, friction]);

  useEffect(() => {
    rafId.current = requestAnimationFrame(animate);
    return () => {
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, [animate]);

  const toggleSpin = useCallback(() => {
    const next = !isSpinningRef.current;
    // Reset speed to 0 when starting so it accelerates from rest
    if (next) speedRef.current = 0;
    isSpinningRef.current = next;
    setIsSpinning(next);
  }, []);

  // Stop and let the disc decelerate naturally via friction
  const stopSpin = useCallback(() => {
    isSpinningRef.current = false;
    setIsSpinning(false);
  }, []);

  return { angle, isSpinning, toggleSpin, stopSpin };
}
