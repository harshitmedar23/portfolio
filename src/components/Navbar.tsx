"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Magnetic } from "@/components/Magnetic";
import { navigation, profile } from "@/data/profile";

export function Navbar({ resumeAvailable }: { resumeAvailable: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const sections = ["home", ...navigation.map((item) => item.href.slice(1))]
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);
    const observer = new IntersectionObserver((entries) => {
      const current = entries.filter((entry) => entry.isIntersecting)
        .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];
      if (current) setActiveSection(current.target.id);
    }, { rootMargin: "-28% 0px -58% 0px", threshold: [0, 0.1, 0.35, 0.65] });
    sections.forEach((section) => observer.observe(section));
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKeyDown);
      observer.disconnect();
    };
  }, []);

  return (
    <motion.header className={`site-header${scrolled ? " is-scrolled" : ""}`} initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : 0.55, delay: reduceMotion ? 0 : 0.12 }}>
      <nav className="nav-shell" aria-label="Main navigation">
        <a href="#home" className="brand-mark" aria-label={`${profile.name}, home`}>
          <span className="brand-monogram">{profile.initials}</span>
          <span className="brand-copy"><strong>{profile.name}</strong><small>Computer Science · Student</small></span>
        </a>
        <div className="desktop-nav">{navigation.map((item) => <a key={item.href} href={item.href} className={`nav-link${activeSection === item.href.slice(1) ? " is-active" : ""}`} aria-current={activeSection === item.href.slice(1) ? "location" : undefined}><span>{item.label}</span>{activeSection === item.href.slice(1) && <motion.i className="nav-indicator" layoutId="active-navigation" transition={{ type: "spring", stiffness: 440, damping: 38 }} />}</a>)}</div>
        <div className="nav-actions">
          <Magnetic strength={0.25}>
            {resumeAvailable ? <a href={profile.resumePath} download className="nav-resume">Resume <ArrowUpRight size={13} aria-hidden="true" /></a> : <button type="button" className="nav-resume is-unavailable" disabled aria-label="Download resume">Resume <ArrowUpRight size={13} aria-hidden="true" /></button>}
          </Magnetic>
          <button type="button" className="menu-toggle" aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? <X size={18} /> : <Menu size={18} />}</button>
        </div>
        <AnimatePresence>{menuOpen && <motion.div id="mobile-navigation" className="mobile-nav" initial={{ opacity: 0, y: -8, height: 0 }} animate={{ opacity: 1, y: 0, height: "auto" }} exit={{ opacity: 0, y: -8, height: 0 }} transition={{ duration: 0.2 }}>{navigation.map((item) => <a key={item.href} href={item.href} className={activeSection === item.href.slice(1) ? "is-active" : ""} aria-current={activeSection === item.href.slice(1) ? "location" : undefined} onClick={() => setMenuOpen(false)}>{item.label}<ArrowUpRight size={14} aria-hidden="true" /></a>)}</motion.div>}</AnimatePresence>
      </nav>
    </motion.header>
  );
}
