"use client";

import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import React, { useRef, useState, useEffect } from "react";

export const BackgroundBeamsWithCollision = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);

  // 1. FIXED: Changed hardcoded pixel values to percentages so they spread across 100% width
  const beams = [
    { initialX: "10%", duration: 7, repeatDelay: 3, delay: 2 },
    { initialX: "25%", duration: 3, repeatDelay: 3, delay: 4 },
    { initialX: "40%", duration: 7, repeatDelay: 7, className: "h-6" },
    { initialX: "55%", duration: 5, repeatDelay: 14, delay: 4 },
    { initialX: "70%", duration: 11, repeatDelay: 2, className: "h-20" },
    { initialX: "85%", duration: 4, repeatDelay: 2, className: "h-12" },
    { initialX: "95%", duration: 6, repeatDelay: 4, delay: 2, className: "h-6" },
  ];

  return (
    <div
      ref={parentRef}
      className={cn(
        "relative flex items-center justify-center w-full overflow-hidden h-96 md:h-160",
        className
      )}
    >
      {beams.map((beam, idx) => (
        <CollisionMechanism
          key={idx}
          beamOptions={beam}
          containerRef={containerRef}
          parentRef={parentRef}
        />
      ))}

      {children}

      <div
        ref={containerRef}
        className="absolute bottom-0 inset-x-0 w-full bg-neutral-100 pointer-events-none"
        style={{
          boxShadow:
            "0 0 24px rgba(34,42,53,0.06), 0 1px 1px rgba(0,0,0,0.05), 0 0 0 1px rgba(34,42,53,0.04), 0 0 4px rgba(34,42,53,0.08), 0 16px 68px rgba(47,48,55,0.05), inset 0 1px 0 rgba(255,255,255,0.1)",
        }}
      />
    </div>
  );
};

const CollisionMechanism = React.forwardRef<
  HTMLDivElement,
  {
    containerRef: React.RefObject<HTMLDivElement | null>;
    parentRef: React.RefObject<HTMLDivElement | null>;
    beamOptions?: {
      // 2. FIXED: Allow initialX and translateX to accept strings (percentages)
      initialX?: number | string;
      translateX?: number | string;
      initialY?: number | string;
      translateY?: number | string;
      rotate?: number;
      className?: string;
      duration?: number;
      delay?: number;
      repeatDelay?: number;
    };
  }
>(({ parentRef, containerRef, beamOptions = {} }, ref) => {
  const beamRef = useRef<HTMLDivElement>(null);

  const [collision, setCollision] = useState<{
    detected: boolean;
    coordinates: { x: number; y: number } | null;
  }>({ detected: false, coordinates: null });

  const [beamKey, setBeamKey] = useState(0);
  const [cycleCollisionDetected, setCycleCollisionDetected] = useState(false);

  useEffect(() => {
    const checkCollision = () => {
      if (
        beamRef.current &&
        containerRef.current &&
        parentRef.current &&
        !cycleCollisionDetected
      ) {
        const beamRect = beamRef.current.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();
        const parentRect = parentRef.current.getBoundingClientRect();

        if (beamRect.bottom >= containerRect.top) {
          const relativeX =
            beamRect.left - parentRect.left + beamRect.width / 2;
          const relativeY = beamRect.bottom - parentRect.top;

          setCollision({
            detected: true,
            coordinates: { x: relativeX, y: relativeY },
          });

          setCycleCollisionDetected(true);
        }
      }
    };

    const interval = setInterval(checkCollision, 50);
    return () => clearInterval(interval);
  }, [cycleCollisionDetected, containerRef, parentRef]);

  useEffect(() => {
    if (collision.detected) {
      const timeout1 = setTimeout(() => {
        setCollision({ detected: false, coordinates: null });
        setCycleCollisionDetected(false);
      }, 2000);

      const timeout2 = setTimeout(() => {
        setBeamKey((prev) => prev + 1);
      }, 2000);

      return () => {
        clearTimeout(timeout1);
        clearTimeout(timeout2);
      };
    }
  }, [collision]);

  return (
    <>
      <motion.div
        key={beamKey}
        ref={beamRef}
        animate={{
          y: beamOptions.translateY || 1800,
          x: beamOptions.translateX || 0,
          rotate: beamOptions.rotate || 0,
        }}
        initial={{
          y: beamOptions.initialY || -200,
          x: beamOptions.translateX || 0,
          rotate: beamOptions.rotate || 0,
        }}
        // 3. FIXED: Apply the percentage mapping to the CSS `left` property
        style={{
          left: beamOptions.initialX || "0%",
        }}
        transition={{
          duration: beamOptions.duration || 8,
          repeat: Infinity,
          ease: "linear",
          delay: beamOptions.delay || 0,
          repeatDelay: beamOptions.repeatDelay || 0,
        }}
        className={cn(
          // 4. FIXED: Removed `left-0` from here so it doesn't conflict with inline styles
          "absolute top-20 m-auto w-px h-14 rounded-full bg-linear-to-t from-indigo-500 via-purple-500 to-transparent",
          beamOptions.className
        )}
      />

      <AnimatePresence>
        {collision.detected && collision.coordinates && (
          <Explosion
            key={`${collision.coordinates.x}-${collision.coordinates.y}`}
            style={{
              left: collision.coordinates.x,
              top: collision.coordinates.y,
              transform: "translate(-50%, -50%)",
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
});

CollisionMechanism.displayName = "CollisionMechanism";

const Explosion = (props: React.HTMLProps<HTMLDivElement>) => {
  const spans = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    directionX: Math.random() * 80 - 40,
    directionY: Math.random() * -50 - 10,
  }));

  return (
    <div {...props} className={cn("absolute z-50 h-2 w-2", props.className)}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5 }}
        className="absolute -inset-x-10 top-0 m-auto h-2 w-10 rounded-full bg-linear-to-r from-transparent via-indigo-500 to-transparent blur-sm"
      />

      {spans.map((span) => (
        <motion.span
          key={span.id}
          initial={{ x: 0, y: 0, opacity: 1 }}
          animate={{ x: span.directionX, y: span.directionY, opacity: 0 }}
          transition={{ duration: Math.random() * 1.5 + 0.5 }}
          className="absolute h-1 w-1 rounded-full bg-linear-to-b from-indigo-500 to-purple-500"
        />
      ))}
    </div>
  );
};