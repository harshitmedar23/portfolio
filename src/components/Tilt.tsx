"use client";

import { useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import type { PointerEvent } from "react";
import { useRef } from "react";

export function useTilt(max = 8) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 150, damping: 16, mass: 0.6 });
  const springY = useSpring(rotateY, { stiffness: 150, damping: 16, mass: 0.6 });

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const localX = (event.clientX - rect.left) / rect.width;
    const localY = (event.clientY - rect.top) / rect.height;
    rotateY.set((localX - 0.5) * max * 2);
    rotateX.set((0.5 - localY) * max);
  };

  const onPointerLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return {
    ref,
    style: { rotateX: springX, rotateY: springY, transformPerspective: 1200 },
    onPointerMove,
    onPointerLeave,
  };
}
