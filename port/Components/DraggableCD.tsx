"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useAnimation, PanInfo } from "framer-motion";
import CompactDisc from "@/Components/CompactDisc";
import { Disc } from "@/types";

export interface DraggableCDProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  dockRef: React.RefObject<HTMLDivElement | null>;
  disc: Disc;
  isDocked: boolean;
  isSpinning: boolean;
  angle: number;
  onDock: () => void;
  onToggleSpin: () => void;
}

const SNAP_THRESHOLD = 80;

export default function DraggableCD({
  containerRef,
  dockRef,
  disc,
  isDocked,
  isSpinning,
  angle,
  onDock,
  onToggleSpin,
}: DraggableCDProps) {
  const cdControls = useAnimation();
  const cdRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // When ejected, spring back to starting position
  useEffect(() => {
    if (!isDocked) {
      cdControls.start({
        x: 0,
        y: 0,
        transition: { type: "spring", stiffness: 200, damping: 20 },
      });
    }
  }, [isDocked, cdControls]);

  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
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
      // Shift current motion position by the screen-space gap to center on dock
      cdControls.start({
        x: info.offset.x + (dockCenterX - cdCenterX),
        y: info.offset.y + (dockCenterY - cdCenterY),
        transition: { type: "spring", stiffness: 300, damping: 25 },
      });
      onDock();
    } else {
      cdControls.start({
        x: 0,
        y: 0,
        transition: { type: "spring", stiffness: 200, damping: 20 },
      });
    }
  };

  return (
    <motion.div
      ref={cdRef}
      drag={!isDocked}
      dragConstraints={containerRef}
      dragElastic={0.1}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={handleDragEnd}
      animate={cdControls}
      onClick={isDocked ? onToggleSpin : undefined}
      whileDrag={{ scale: 1.05 }}
      className={`
        absolute bottom-8 left-8
        w-32 h-32
        rounded-full
        ${isDocked ? "cursor-pointer" : "cursor-grab active:cursor-grabbing"}
        ${isDragging ? "z-50" : isDocked ? "z-10" : "z-20"}
      `}
    >
      <CompactDisc disc={disc} isSpinning={isSpinning} angle={angle} />
    </motion.div>
  );
}
