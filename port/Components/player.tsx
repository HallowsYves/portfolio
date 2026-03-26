"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useAnimation, PanInfo } from "framer-motion";

// ============================================
// DRAGGABLE CD COMPONENT
// ============================================
interface DraggableCDProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  dockRef: React.RefObject<HTMLDivElement | null>;
  onDock: () => void;
  isDocked: boolean;
  isSpinning: boolean;
}

function DraggableCD({
  containerRef,
  dockRef,
  onDock,
  isDocked,
  isSpinning,
}: DraggableCDProps) {
  const cdControls = useAnimation();
  const cdRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Starting position (will be set relative to container)
  const startPosition = { x: 0, y: 0 };

  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    setIsDragging(false);

    if (!dockRef.current || !cdRef.current) return;

    const dockRect = dockRef.current.getBoundingClientRect();
    const cdRect = cdRef.current.getBoundingClientRect();

    // Calculate centers
    const dockCenterX = dockRect.left + dockRect.width / 2;
    const dockCenterY = dockRect.top + dockRect.height / 2;
    const cdCenterX = cdRect.left + cdRect.width / 2;
    const cdCenterY = cdRect.top + cdRect.height / 2;

    // Calculate distance between centers
    const distance = Math.sqrt(
      Math.pow(dockCenterX - cdCenterX, 2) +
        Math.pow(dockCenterY - cdCenterY, 2)
    );

    const SNAP_THRESHOLD = 80;

    if (distance < SNAP_THRESHOLD) {
      // Snap to dock center
      // Calculate the offset needed to center the CD on the dock
      const offsetX = dockCenterX - cdCenterX + info.offset.x;
      const offsetY = dockCenterY - cdCenterY + info.offset.y;

      cdControls.start({
        x: offsetX,
        y: offsetY,
        transition: { type: "spring", stiffness: 300, damping: 25 },
      });

      onDock();
    } else {
      // Spring back to original position
      cdControls.start({
        x: startPosition.x,
        y: startPosition.y,
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
      className={`
        absolute bottom-8 left-8
        w-32 h-32
        rounded-full
        cursor-grab active:cursor-grabbing
        ${isDragging ? "z-50" : isDocked ? "z-10" : "z-20"}
        ${isDocked ? "pointer-events-none" : ""}
      `}
      style={{
        // Shiny CD gradient
        background: `
          radial-gradient(circle at 30% 30%,
            rgba(255,255,255,0.8) 0%,
            rgba(200,200,220,0.6) 10%,
            rgba(180,180,200,0.4) 20%,
            rgba(100,100,150,0.3) 40%,
            rgba(60,60,100,0.5) 60%,
            rgba(40,40,80,0.7) 80%,
            rgba(20,20,40,0.9) 100%
          ),
          conic-gradient(
            from 0deg,
            #ff6b6b, #feca57, #48dbfb, #ff9ff3, #54a0ff, #5f27cd,
            #ff6b6b
          )
        `,
        boxShadow: isDragging
          ? "0 20px 40px rgba(0,0,0,0.4), inset 0 0 20px rgba(255,255,255,0.2)"
          : "0 8px 20px rgba(0,0,0,0.3), inset 0 0 15px rgba(255,255,255,0.15)",
      }}
      whileDrag={{ scale: 1.05 }}
    >
      {/* Spinning wrapper - add your rotation logic here */}
      <motion.div
        className="w-full h-full rounded-full relative"
        animate={isSpinning ? { rotate: 360 } : { rotate: 0 }}
        transition={
          isSpinning
            ? { duration: 2, repeat: Infinity, ease: "linear" }
            : { duration: 0 }
        }
      >
        {/* CD surface shimmer effect */}
        <div
          className="absolute inset-0 rounded-full opacity-50"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0%, rgba(255,255,255,0.3) 10%, transparent 20%, rgba(255,255,255,0.2) 30%, transparent 40%, rgba(255,255,255,0.25) 50%, transparent 60%, rgba(255,255,255,0.2) 70%, transparent 80%, rgba(255,255,255,0.3) 90%, transparent 100%)",
          }}
        />

        {/* Center hole */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-8 h-8 rounded-full bg-zinc-900 ring-2 ring-zinc-700"
            style={{
              boxShadow: "inset 0 2px 4px rgba(0,0,0,0.8)",
            }}
          />
        </div>

        {/* CD label area */}
        <div
          className="absolute inset-6 rounded-full opacity-30"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
          }}
        />
      </motion.div>
    </motion.div>
  );
}

// ============================================
// CD PLAYER DOCK COMPONENT
// ============================================
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
        w-36 h-36
        rounded-full
        transition-all duration-300
        ${isLoaded ? "ring-2 ring-green-500/50" : "ring-2 ring-zinc-600/50"}
      `}
      style={{
        // Recessed circular tray effect
        background: `
          radial-gradient(circle at 50% 40%,
            rgba(30,30,35,1) 0%,
            rgba(20,20,25,1) 50%,
            rgba(15,15,20,1) 100%
          )
        `,
        boxShadow: `
          inset 0 4px 8px rgba(0,0,0,0.6),
          inset 0 -2px 4px rgba(255,255,255,0.05),
          0 1px 2px rgba(255,255,255,0.1)
        `,
      }}
    >
      {/* Inner ring detail */}
      <div
        className="absolute inset-3 rounded-full"
        style={{
          boxShadow: "inset 0 2px 4px rgba(0,0,0,0.4)",
          border: "1px solid rgba(255,255,255,0.05)",
        }}
      />

      {/* Center spindle */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="w-6 h-6 rounded-full bg-zinc-700"
          style={{
            boxShadow:
              "0 2px 4px rgba(0,0,0,0.5), inset 0 1px 2px rgba(255,255,255,0.1)",
          }}
        />
      </div>

      {/* Status indicator */}
      {isLoaded && (
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        </div>
      )}
    </div>
  );
}

// ============================================
// MAIN PLAYER COMPONENT
// ============================================
export default function Player() {
  const containerRef = useRef<HTMLDivElement>(null);
  const dockRef = useRef<HTMLDivElement>(null);

  // State for tracking if CD is loaded in the dock
  const [isLoaded, setIsLoaded] = useState(false);

  // State for controlling spinning (integrate your rotation logic here)
  const [isSpinning, setIsSpinning] = useState(false);

  // ============================================
  // SPINNING INTEGRATION PLACEHOLDER
  // When isLoaded becomes true, this effect triggers.
  // Replace with your existing rotation code.
  // ============================================
  useEffect(() => {
    if (isLoaded) {
      // PLACEHOLDER: Your spinning logic goes here
      // Example: Start spinning after a short delay
      const timer = setTimeout(() => {
        setIsSpinning(true);
      }, 500);

      return () => clearTimeout(timer);
    } else {
      setIsSpinning(false);
    }
  }, [isLoaded]);

  const handleDock = () => {
    setIsLoaded(true);
  };

  const handleEject = () => {
    setIsLoaded(false);
    setIsSpinning(false);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[500px] bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl overflow-hidden"
      style={{
        boxShadow:
          "0 25px 50px -12px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
      }}
    >
      {/* Player body / housing */}
      <div className="absolute inset-4 rounded-xl bg-zinc-850 border border-zinc-700/50">
        {/* CD Player Dock */}
        <CDPlayerDock dockRef={dockRef} isLoaded={isLoaded} />

        {/* Controls area */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4">
          {isLoaded && (
            <>
              <button
                onClick={() => setIsSpinning(!isSpinning)}
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium
                  transition-all duration-200
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

        {/* Instruction text */}
        {!isLoaded && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 text-zinc-500 text-sm">
            Drag the CD to the player
          </div>
        )}
      </div>

      {/* Draggable CD - only render if not docked, or render in a different position if docked */}
      <DraggableCD
        containerRef={containerRef}
        dockRef={dockRef}
        onDock={handleDock}
        isDocked={isLoaded}
        isSpinning={isSpinning}
      />
    </div>
  );
}
