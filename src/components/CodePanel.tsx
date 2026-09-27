"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { ArrowUpRight, Terminal } from "lucide-react";
import type { CSSProperties } from "react";
import { useRef } from "react";
import { focusAreas, projects } from "@/data/profile";

type TerminalLine = { text: string; tone?: "muted" | "accent" };
type TerminalBlock = { command: string; output: TerminalLine[] };

const blocks: TerminalBlock[] = [
  { command: "whoami", output: [{ text: "harshit medar — computer science engineer" }] },
  {
    command: "cat focus.json",
    output: [
      { text: '["Software development",' },
      { text: '  "Artificial intelligence",', tone: "accent" },
      { text: '  "Web development"]' },
    ],
  },
  { command: "ls stack/", output: [{ text: "Java  Python  C/C++  Flask  React  MySQL", tone: "muted" }] },
  { command: "ls building/", output: [{ text: "KisanQueue   MedTrack   RINA-MUSIC", tone: "accent" }] },
];

const TYPE_SPEED = 0.045;
const OUTPUT_STAGGER = 0.09;
const PAUSE_AFTER_TYPE = 0.12;
const PAUSE_BEFORE_NEXT = 0.4;

function buildTimeline() {
  let cursor = 0.15;
  return blocks.map((block) => {
    const typingDuration = Math.max(0.35, block.command.length * TYPE_SPEED);
    const commandDelay = cursor;
    cursor += typingDuration + PAUSE_AFTER_TYPE;
    const outputStart = cursor;
    cursor += block.output.length * OUTPUT_STAGGER + PAUSE_BEFORE_NEXT;
    return { ...block, commandDelay, typingDuration, outputStart };
  });
}

export function CodePanel() {
  const reduceMotion = useReducedMotion();
  const shellRef = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 140, damping: 18, mass: 0.7 });
  const springY = useSpring(rotateY, { stiffness: 140, damping: 18, mass: 0.7 });
  const timeline = buildTimeline();
  const promptEnd = timeline[timeline.length - 1];
  const cursorDelay = promptEnd.outputStart + promptEnd.output.length * OUTPUT_STAGGER + 0.1;

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || !shellRef.current) return;

    const rect = shellRef.current.getBoundingClientRect();
    const localX = (event.clientX - rect.left) / rect.width;
    const localY = (event.clientY - rect.top) / rect.height;

    rotateY.set((localX - 0.5) * 14);
    rotateX.set((0.5 - localY) * 12);
  };

  const handlePointerLeave = () => {
    if (reduceMotion) return;
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={shellRef}
      className="workspace-shell"
      aria-label="Developer workspace showing Harshit's projects and profile"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        rotateX: springX,
        rotateY: springY,
        transformPerspective: 1600,
      }}
      whileHover={reduceMotion ? undefined : { scale: 1.004 }}
      transition={{ type: "spring", stiffness: 170, damping: 18 }}
    >
      <header className="workspace-top">
        <div className="workspace-brand"><Terminal size={15} aria-hidden="true" /><span>PORTFOLIO / WORKSPACE</span></div>
        <span className="workspace-window-title">harshit@portfolio: ~</span>
        <span className="workspace-mode">SHELL</span>
      </header>
      <div className="workspace-body">
        <aside className="workspace-rail" aria-label="Project index">
          <p className="workspace-rail-label">PROJECT INDEX <span>03</span></p>
          {projects.map((project) => <a className={`workspace-project project-${project.accent}`} key={project.name} href="#projects"><span className="workspace-project-number">{project.number}</span><span className="workspace-project-copy"><strong>{project.name}</strong><small>{project.category}</small></span><ArrowUpRight size={12} aria-hidden="true" /></a>)}
          <div className="workspace-focus"><p className="workspace-rail-label">CURRENT FOCUS</p>{focusAreas.map((area) => <span key={area.title}><i />{area.title}</span>)}</div>
        </aside>
        <div className="workspace-editor">
          <div className="workspace-tabs"><span className="workspace-tab-active">bash</span><span className="workspace-tab-meta">SHELL</span></div>
          <div className="terminal-body" aria-hidden="true">
            {timeline.map((block) => (
              <div className="terminal-block" key={block.command}>
                <div className="terminal-command">
                  <span className="terminal-prompt">➜</span>
                  <span
                    className="terminal-typed"
                    style={{
                      animationDelay: `${block.commandDelay}s`,
                      animationDuration: `${block.typingDuration}s`,
                      "--target-width": `${block.command.length}ch`,
                    } as CSSProperties}
                  >
                    {block.command}
                  </span>
                </div>
                {block.output.map((line, lineIndex) => (
                  <motion.div
                    className={`terminal-output${line.tone ? ` is-${line.tone}` : ""}`}
                    key={`${block.command}-${lineIndex}`}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: block.outputStart + lineIndex * OUTPUT_STAGGER }}
                  >
                    {line.text}
                  </motion.div>
                ))}
              </div>
            ))}
            <div className="terminal-command terminal-command-final">
              <span className="terminal-prompt">➜</span>
              <motion.span
                className="code-cursor"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: cursorDelay, duration: 0.2 }}
              >
                _
              </motion.span>
            </div>
          </div>
        </div>
      </div>
      <footer className="workspace-foot"><span>STACK / JAVA · PYTHON · FLASK · REACT · MYSQL</span><span>DATA / PROJECTS</span></footer>
    </motion.div>
  );
}
