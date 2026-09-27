"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDownRight, ArrowRight, BriefcaseBusiness, GitBranch, Mail } from "lucide-react";
import { useRef } from "react";
import { CodePanel } from "@/components/CodePanel";
import { Magnetic } from "@/components/Magnetic";
import { Marquee } from "@/components/Marquee";
import { profile } from "@/data/profile";

function AnimatedWord({ text, delay = 0 }: { text: string; delay?: number }) {
  const reduceMotion = useReducedMotion();
  return (
    <span aria-label={text}>
      {text.split("").map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          style={{ display: "inline-block" }}
          initial={{ opacity: 0, y: reduceMotion ? 0 : 34, filter: reduceMotion ? "none" : "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6, delay: reduceMotion ? 0 : delay + index * 0.032, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

export function Hero({ resumeAvailable }: { resumeAvailable: boolean }) {
  const reduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 70]);
  const enter = { initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 } };
  const socialItems = [
    { href: profile.githubUrl, label: "GitHub", icon: <GitBranch size={16} /> },
    { href: profile.linkedinUrl, label: "LinkedIn", icon: <BriefcaseBusiness size={16} /> },
    { href: profile.email ? `mailto:${profile.email}` : "", label: "Email", icon: <Mail size={16} /> },
  ].filter((item) => item.href);

  return (
    <section
      className="hero-section"
      id="home"
      aria-labelledby="hero-title"
      ref={heroRef}
    >
      <div className="hero-intro content-width">
        <motion.div className="hero-status" {...enter} transition={{ duration: reduceMotion ? 0 : 0.42, delay: reduceMotion ? 0 : 0.08 }}>
          <span className="status-dot" aria-hidden="true" />
          Available for building
        </motion.div>
        <motion.p className="hero-kicker" {...enter} transition={{ duration: reduceMotion ? 0 : 0.42, delay: reduceMotion ? 0 : 0.16 }}>Computer Science <span>/</span> Student developer</motion.p>
        <motion.p className="hero-greeting-standalone" {...enter} transition={{ duration: reduceMotion ? 0 : 0.42, delay: reduceMotion ? 0 : 0.22 }}>Hi, I&rsquo;m</motion.p>
      </div>

      <div className="hero-main content-width">
        <div className="hero-left">
          <h1 id="hero-title" className="hero-display">
            <span className="name-line"><AnimatedWord text="HARSHIT" delay={0.32} /></span>
            <span className="name-line">
              <motion.span
                className="accent-word"
                initial={{ opacity: 0, y: reduceMotion ? 0 : 34, filter: reduceMotion ? "none" : "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.65, delay: reduceMotion ? 0 : 0.62, ease: [0.22, 1, 0.36, 1] }}
              >
                MEDAR
              </motion.span>
            </span>
          </h1>
          <div className="hero-copy">
            <motion.h2 {...enter} transition={{ duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : 0.86 }}>{profile.title}</motion.h2>
            <motion.p className="hero-description" {...enter} transition={{ duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : 0.94 }}>{profile.description}</motion.p>
            <motion.div className="hero-badges" {...enter} transition={{ duration: reduceMotion ? 0 : 0.45, delay: reduceMotion ? 0 : 1.02 }}>
              {['Java', 'Python', 'React', 'Flask', 'MySQL'].map((label) => (
                <motion.span key={label} whileHover={reduceMotion ? undefined : { y: -3, scale: 1.06 }} transition={{ type: "spring", stiffness: 320, damping: 16 }}>{label}</motion.span>
              ))}
            </motion.div>
            <motion.div className="hero-actions" {...enter} transition={{ duration: reduceMotion ? 0 : 0.45, delay: reduceMotion ? 0 : 1.1 }}>
              <Magnetic strength={0.3}>
                <a className="button-primary" href="#projects">Explore the work <ArrowRight size={15} aria-hidden="true" /></a>
              </Magnetic>
              <Magnetic strength={0.3}>
                {resumeAvailable ? <a className="button-secondary" href={profile.resumePath} download>Resume <ArrowDownRight size={15} aria-hidden="true" /></a> : <button className="button-secondary is-unavailable" type="button" disabled aria-label="Download resume">Resume <ArrowDownRight size={15} aria-hidden="true" /></button>}
              </Magnetic>
            </motion.div>
            {socialItems.length > 0 && <motion.div className="hero-socials" {...enter} transition={{ duration: reduceMotion ? 0 : 0.45, delay: reduceMotion ? 0 : 1.18 }} aria-label="Social links">{socialItems.map((item) => <a key={item.label} className="social-link" href={item.href} aria-label={item.label} target={item.label === "Email" ? undefined : "_blank"} rel={item.label === "Email" ? undefined : "noreferrer"}>{item.icon}<span>{item.label}</span></a>)}</motion.div>}
          </div>
        </div>
        <motion.div
          className="hero-visual"
          style={{ y: parallaxY }}
          initial={{ opacity: 0, y: 28, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: reduceMotion ? 0 : 0.7, delay: reduceMotion ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <CodePanel />
        </motion.div>
      </div>

      <div className="hero-marquee-strip content-width">
        <Marquee duration={28}>
          {["Software Development", "Artificial Intelligence", "Web Development", "Java", "Python", "React", "Flask", "MySQL"].map((item) => (
            <span key={item} className="marquee-item">{item} <span aria-hidden="true">&#10022;</span></span>
          ))}
        </Marquee>
      </div>
      <div className="hero-baseline content-width"><span>01 / INTRODUCTION</span><a href="#about">Continue <ArrowDownRight size={14} aria-hidden="true" /></a></div>
    </section>
  );
}
