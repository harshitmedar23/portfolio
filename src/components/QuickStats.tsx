"use client";

import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { projects, skillGroups, technologyCount } from "@/data/profile";

const metrics = [
  { value: projects.length, label: "Projects" },
  { value: technologyCount, label: "Technologies listed" },
  { value: skillGroups.length, label: "Skill areas" },
  { value: "CSE", label: "Student" },
] as const;

export function QuickStats() {
  return (
    <section className="quick-stats content-width" aria-label="Portfolio overview">
      {metrics.map((metric, index) => (
        <div className="quick-stat" key={metric.label}>
          <span className="stat-index">0{index + 1}</span>
          {typeof metric.value === "number" ? <CountValue value={metric.value} /> : <strong className="stat-value">{metric.value}</strong>}
          <span className="stat-label">{metric.label}</span>
        </div>
      ))}
    </section>
  );
}

function CountValue({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const count = useMotionValue(0);
  const display = useTransform(count, (current) => String(Math.round(current)).padStart(2, "0"));
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!ref.current) return;
    let stopAnimation: (() => void) | undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      if (reduceMotion) {
        count.set(value);
      } else {
        const animation = animate(count, value, { duration: 0.85, ease: "easeOut" });
        stopAnimation = () => animation.stop();
      }
    }, { threshold: 0.7 });
    observer.observe(ref.current);
    return () => {
      observer.disconnect();
      stopAnimation?.();
    };
  }, [count, reduceMotion, value]);

  return <motion.strong className="stat-value" ref={ref}>{display}</motion.strong>;
}