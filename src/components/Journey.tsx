"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Code2, Compass, GraduationCap, Lightbulb } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { achievements, journeyMilestones } from "@/data/profile";

const milestoneIcons = [GraduationCap, Code2, Lightbulb, Compass];

export function Journey() {
  const [activeMilestone, setActiveMilestone] = useState(0);
  const reduceMotion = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const entries = [...track.querySelectorAll<HTMLElement>(".journey-entry")];
    const observer = new IntersectionObserver((changes) => {
      const visible = changes.filter((change) => change.isIntersecting)
        .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];
      if (visible) setActiveMilestone(entries.indexOf(visible.target as HTMLElement));
    }, { rootMargin: "-38% 0px -48% 0px", threshold: [0.1, 0.35, 0.65] });
    entries.forEach((entry) => observer.observe(entry));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section journey-section" id="journey" aria-labelledby="journey-title">
      <div className="content-width journey-layout">
        <Reveal className="journey-intro">
          <div className="section-index"><span>05</span><span>JOURNEY</span></div>
          <p className="eyebrow">Education &amp; growth</p><h2 className="section-heading" id="journey-title">Learning by building.</h2>
          <p className="section-copy">Computer science, practical projects, and a steady exploration of the tools and ideas behind them.</p>
          <a className="text-link" href="#projects">Explore the projects <ArrowUpRight size={15} /></a>
        </Reveal>
        <Reveal className="journey-track" >
          <div className="journey-line" aria-hidden="true"><motion.span style={{ scaleY: activeMilestone < 0 ? 0 : (activeMilestone + 1) / journeyMilestones.length }} /></div>
          <div className="journey-entries" ref={trackRef}>
          {journeyMilestones.map((milestone, index) => {
            const Icon = milestoneIcons[index];
            const isActive = activeMilestone === index;
            return (
              <div className={`journey-entry${isActive ? " is-active" : ""}`} key={milestone.label}>
                <span className="journey-node"><Icon size={16} aria-hidden="true" /></span>
                <button type="button" className="journey-select" aria-expanded={isActive} onClick={() => setActiveMilestone(isActive ? -1 : index)}>
                  <span className="journey-date">{String(index + 1).padStart(2, "0")} / {milestone.label}</span>
                  <span className="journey-entry-title">{milestone.title}</span>
                  <AnimatePresence initial={false}>
                    {isActive && <motion.span className="journey-entry-detail" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: reduceMotion ? 0 : 0.2 }}>{milestone.detail}</motion.span>}
                  </AnimatePresence>
                </button>
              </div>
            );
          })}
          </div>
        </Reveal>
        {achievements.length > 0 && (
          <div className="achievement-strip">
            <Reveal><p className="eyebrow">Activities &amp; achievements</p></Reveal>
            {achievements.map((achievement, index) => (
              <Reveal className="achievement-item" delay={index * 0.08} key={achievement.title}>
                <article><h3>{achievement.title}</h3><p>{achievement.description}</p>{achievement.date && <time>{achievement.date}</time>}</article>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
