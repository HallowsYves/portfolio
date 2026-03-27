"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, animate, PanInfo } from "framer-motion";
import CompactDisc from "@/Components/CompactDisc";
import { Disc } from "@/types";

export interface DraggableCDProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  dockRef: React.RefObject<HTMLDivElement | null>;
  disc: Disc;
  /** Must match CDPlayerDock diameter exactly for correct visual overlap on snap */
  size: number;
  isDocked: boolean;
  isSpinning: boolean;
  angle: number;
  onDock: () => void;
  onToggleSpin: () => void;
}

export default function DraggableCD({
  containerRef,
  dockRef,
  disc,
  size,
  isDocked,
  isSpinning,
  angle,
  onDock,
  onToggleSpin,
}: DraggableCDProps) {
  const cdRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // MotionValues give us the *actual* clamped position at any moment —
  // critical for a correct snap calculation when dragConstraints are active.
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Snap threshold: must drag at least halfway across the disc toward the dock
  const SNAP_THRESHOLD = size * 0.4;

  // Spring back to origin whenever the CD is ejected
  useEffect(() => {
    if (!isDocked) {
      animate(x, 0, { type: "spring", stiffness: 200, damping: 20 });
      animate(y, 0, { type: "spring", stiffness: 200, damping: 20 });
    }
  }, [isDocked, x, y]);

  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    _info: PanInfo
  ) => {
    setIsDragging(false);

    if (!dockRef.current || !cdRef.current) return;

    const dockRect = dockRef.current.getBoundingClientRect();
    const cdRect = cdRef.current.getBoundingClientRect();

    const dockCenterX = dockRect.left + dockRect.width / 2;
    const dockCenterY = dockRect.top + dockRect.height / 2;
    const cdCenterX = cdRect.left + cdRect.width / 2;
    const cdCenterY = cdRect.top + cdRect.height / 2;

    const distance = Math.sqrt(
      Math.pow(dockCenterX - cdCenterX, 2) + Math.pow(dockCenterY - cdCenterY, 2)
    );

    if (distance < SNAP_THRESHOLD) {
      // x.get() is the true current motion value (not the raw pointer offset).
      // Add the remaining screen-space gap to land exactly on the dock center.
      animate(x, x.get() + (dockCenterX - cdCenterX), {
        type: "spring",
        stiffness: 300,
        damping: 25,
      });
      animate(y, y.get() + (dockCenterY - cdCenterY), {
        type: "spring",
        stiffness: 300,
        damping: 25,
      });
      onDock();
    } else {
      animate(x, 0, { type: "spring", stiffness: 200, damping: 20 });
      animate(y, 0, { type: "spring", stiffness: 200, damping: 20 });
    }
  };

  return (
    <motion.div
      ref={cdRef}
      drag={!isDocked}
      dragConstraints={containerRef}
      dragElastic={0.08}
      style={{
        x,
        y,
        width: size,
        height: size,
        position: "absolute",
        bottom: 32,
        left: 32,
        borderRadius: "50%",
        // Always keep pointer-events active so the onClick fires when docked
        pointerEvents: "auto",
        zIndex: isDragging ? 50 : isDocked ? 10 : 20,
        cursor: isDocked ? "pointer" : isDragging ? "grabbing" : "grab",
      }}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={handleDragEnd}
      onClick={isDocked ? onToggleSpin : undefined}
      whileDrag={{ scale: 1.05 }}
    >
      <CompactDisc disc={disc} isSpinning={isSpinning} angle={angle} />
    </motion.div>
  );
}
