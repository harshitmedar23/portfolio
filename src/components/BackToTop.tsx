"use client";

import { motion, useMotionTemplate, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

const RADIUS = 19;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 220, damping: 40, mass: 0.4 });
  const dashOffset = useTransform(progress, (value) => CIRCUMFERENCE * (1 - value));
  const strokeDasharray = useMotionTemplate`${CIRCUMFERENCE} ${CIRCUMFERENCE}`;

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.a
      href="#home"
      className="back-to-top"
      aria-label="Back to top"
      initial={{ opacity: 0, scale: 0.6, y: 16 }}
      animate={visible ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.6, y: 16 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      style={{ pointerEvents: visible ? "auto" : "none" }}
    >
      <svg width="44" height="44" viewBox="0 0 44 44" aria-hidden="true">
        <circle className="back-to-top-track" cx="22" cy="22" r={RADIUS} />
        <motion.circle
          className="back-to-top-ring"
          cx="22"
          cy="22"
          r={RADIUS}
          style={{ strokeDasharray, strokeDashoffset: dashOffset }}
        />
      </svg>
      <ArrowUp size={16} aria-hidden="true" />
    </motion.a>
  );
}
