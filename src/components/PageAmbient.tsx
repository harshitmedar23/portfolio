"use client";

import { motion, useMotionTemplate, useMotionValue, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  radius: number;
  driftX: number;
  driftY: number;
  alpha: number;
  twinkle: number;
  hue: number;
  orbit: number;
  angle: number;
};

export function PageAmbient({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerX = useMotionValue(50);
  const pointerY = useMotionValue(35);
  const ambientGlow = useMotionTemplate`radial-gradient(circle at ${pointerX}% ${pointerY}%, rgba(180, 255, 60, 0.10), rgba(111, 91, 255, 0.06) 12%, rgba(8, 12, 18, 0) 30%)`;

  useEffect(() => {
    if (reduceMotion) return;

    const canvas = canvasRef.current;
    const parent = wrapRef.current;
    if (!canvas || !parent) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const particles: Particle[] = [];
    let animationFrame = 0;

    const makeParticles = () => {
      const width = window.innerWidth;
      const height = Math.max(window.innerHeight, parent.scrollHeight || window.innerHeight);
      const count = Math.min(240, Math.max(120, Math.round((width * height) / 18)));
      particles.length = 0;

      for (let index = 0; index < count; index += 1) {
        const palette = [72, 252, 14];
        const hue = palette[index % 3] + (Math.random() * 16 - 8);
        const orbit = Math.random() * 0.9 + 0.3;
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 2.5 + 0.8,
          driftX: (Math.random() - 0.5) * 0.28,
          driftY: (Math.random() - 0.5) * 0.22,
          alpha: Math.random() * 0.8 + 0.2,
          twinkle: Math.random() * Math.PI * 2,
          hue,
          orbit,
          angle: Math.random() * Math.PI * 2,
        });
      }
    };

    const updateCanvas = () => {
      const width = window.innerWidth;
      const height = Math.max(window.innerHeight, parent.scrollHeight || window.innerHeight);
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);

      const time = performance.now() * 0.00022;
      ctx.clearRect(0, 0, width, height);

      const centerX = width * 0.55;
      const centerY = height * 0.38;

      const glow = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, Math.max(width, height) * 0.5);
      glow.addColorStop(0, "rgba(180, 255, 60, 0.14)");
      glow.addColorStop(0.3, "rgba(111, 91, 255, 0.10)");
      glow.addColorStop(1, "rgba(8, 12, 18, 0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      const nebulae = [
        { x: width * 0.18, y: height * 0.22, r: width * 0.42, hue: 72, alpha: 0.11 },
        { x: width * 0.72, y: height * 0.28, r: width * 0.38, hue: 252, alpha: 0.09 },
        { x: width * 0.5, y: height * 0.74, r: width * 0.46, hue: 14, alpha: 0.08 },
      ];

      for (const cloud of nebulae) {
        const gradient = ctx.createRadialGradient(cloud.x, cloud.y, 0, cloud.x, cloud.y, cloud.r);
        gradient.addColorStop(0, `hsla(${cloud.hue}, 96%, 70%, ${cloud.alpha})`);
        gradient.addColorStop(0.25, `hsla(${cloud.hue + 18}, 90%, 64%, ${cloud.alpha * 0.7})`);
        gradient.addColorStop(0.6, `hsla(${cloud.hue + 36}, 85%, 62%, ${cloud.alpha * 0.45})`);
        gradient.addColorStop(1, "rgba(8, 12, 18, 0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      }

      for (let index = 0; index < 5; index += 1) {
        const armAngle = (Math.PI * 2 * index) / 5 + time * 0.7;
        ctx.beginPath();
        ctx.strokeStyle = `rgba(180, 220, 90, ${0.12 + index * 0.02})`;
        ctx.lineWidth = 1.8;
        ctx.ellipse(
          centerX,
          centerY,
          width * (0.18 + index * 0.08),
          height * (0.09 + index * 0.04),
          armAngle,
          0,
          Math.PI * 2,
        );
        ctx.stroke();
      }

      for (const particle of particles) {
        particle.angle += 0.003 + particle.orbit * 0.004;
        particle.x += particle.driftX + Math.sin(time * 2 + particle.angle) * 0.28 * particle.orbit;
        particle.y += particle.driftY + Math.cos(time * 1.7 + particle.angle * 1.3) * 0.2 * particle.orbit;

        if (particle.x < -10) particle.x = width + 10;
        if (particle.x > width + 10) particle.x = -10;
        if (particle.y < -10) particle.y = height + 10;
        if (particle.y > height + 10) particle.y = -10;

        const pulse = 0.5 + Math.sin(time * 3 + particle.twinkle) * 0.5;
        const radius = particle.radius * (0.9 + particle.orbit * 0.55);
        ctx.beginPath();
        ctx.fillStyle = `hsla(${particle.hue}, 100%, 84%, ${particle.alpha * pulse})`;
        ctx.shadowBlur = 15 + particle.orbit * 10;
        ctx.shadowColor = `hsla(${particle.hue}, 100%, 70%, 0.5)`;
        ctx.arc(particle.x, particle.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.shadowBlur = 0;
      animationFrame = window.requestAnimationFrame(updateCanvas);
    };

    makeParticles();
    updateCanvas();

    const onResize = () => {
      makeParticles();
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", onResize);
    };
  }, [reduceMotion]);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || !wrapRef.current) return;

    const rect = wrapRef.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    pointerX.set(x);
    pointerY.set(y);
  };

  const handlePointerLeave = () => {
    if (reduceMotion) return;
    pointerX.set(50);
    pointerY.set(35);
  };

  return (
    <motion.div
      ref={wrapRef}
      className="page-ambient-shell"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ background: ambientGlow }}
    >
      <canvas ref={canvasRef} className="page-particles" aria-hidden="true" />
      <div className="page-content-layer">{children}</div>
    </motion.div>
  );
}
