"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, ExternalLink, GitBranch, X } from "lucide-react";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { Magnetic } from "@/components/Magnetic";
import { Reveal } from "@/components/Reveal";
import { useTilt } from "@/components/Tilt";
import { projects } from "@/data/profile";

type PortfolioProject = (typeof projects)[number];

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (selectedProject && !dialog.open) dialog.showModal();
    if (!selectedProject && dialog.open) dialog.close();
  }, [selectedProject]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedProject((current) => current ? null : current);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <section className="section projects-section content-width" id="projects" aria-labelledby="projects-title">
      <Reveal className="projects-heading">
        <div className="section-index"><span>03</span><span>SELECTED PROJECTS</span></div>
        <div className="projects-title-row"><div><p className="eyebrow">What I build</p><h2 className="section-heading" id="projects-title">Software with a job to do.</h2></div><span className="projects-count">03 <small>PROJECTS</small></span></div>
        <p className="section-copy">Three different problems, explored through applications, data, and connected systems.</p>
      </Reveal>
      <div className="project-grid">
        {projects.map((project, index) => (
          <Reveal className={`project-card project-${project.accent}`} delay={index * 0.08} key={project.name}>
            <article className="project-card-inner">
              <header className="project-card-top"><span>{project.number} &middot; {project.category}</span><span>CASE STUDY</span></header>
              <ProjectPreview project={project} />
              <div className="project-card-body">
                <h3>{project.name}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-tags">{project.stack.map((tag) => <span key={tag}>{tag}</span>)}</div>
                <div className="project-card-actions">
                  <div className="project-links"><ProjectLink href={project.githubUrl} label="GitHub" icon={<GitBranch size={13} />} /><ProjectLink href={project.demoUrl} label="Live demo" icon={<ExternalLink size={13} />} /></div>
                  <Magnetic strength={0.25}>
                    <button type="button" className="project-case-study" onClick={() => setSelectedProject(project)}>View case study <ArrowUpRight size={15} aria-hidden="true" /></button>
                  </Magnetic>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
      <dialog
        ref={dialogRef}
        className="case-study-dialog"
        aria-labelledby="case-study-title"
        aria-describedby="case-study-overview"
        onCancel={(event) => {
          event.preventDefault();
          setSelectedProject(null);
        }}
        onClose={() => setSelectedProject(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setSelectedProject(null);
        }}
      >
        {selectedProject && <CaseStudy project={selectedProject} onClose={() => setSelectedProject(null)} />}
      </dialog>
    </section>
  );
}

function ProjectPreview({ project }: { project: PortfolioProject }) {
  const tilt = useTilt(6);
  const tiltProps = {
    ref: tilt.ref,
    style: tilt.style,
    onPointerMove: tilt.onPointerMove,
    onPointerLeave: tilt.onPointerLeave,
    whileHover: { scale: 1.015 },
    transition: { type: "spring" as const, stiffness: 200, damping: 20 },
  };

  if (project.name === "KisanQueue") {
    return <motion.div className="project-preview preview-queue" aria-label="KisanQueue feature workflow visualization" {...tiltProps}>
      <div className="preview-topline"><span>WORKFLOW / KISANQUEUE</span><span>01</span></div>
      <div className="queue-flow">{["Slot booking", "Live queue", "QR check-in"].map((step, index) => <div className="queue-step" key={step}><span>0{index + 1}</span><strong>{step}</strong>{index < 2 && <ArrowRight size={15} aria-hidden="true" />}</div>)}</div>
      <div className="preview-footline"><span>OTP AUTH</span><span>NOTIFICATIONS</span><span>ANALYTICS</span></div>
    </motion.div>;
  }

  if (project.name === "MedTrack") {
    return <motion.div className="project-preview preview-inventory" aria-label="MedTrack inventory concept visualization" {...tiltProps}>
      <div className="preview-topline"><span>INVENTORY / MEDTRACK</span><span>02</span></div>
      <div className="inventory-ledger"><span>PHARMACY INVENTORY</span><div className="ledger-rule"><i /><i /><i /></div><span>STOCK RECORDS</span><div className="ledger-lines"><i /><i /><i /><i /></div><span>DATABASE-DRIVEN MANAGEMENT</span></div>
      <div className="preview-footline"><span>MYSQL</span><span>DBMS</span></div>
    </motion.div>;
  }

  return <motion.div className="project-preview preview-audio" aria-label="RINA-MUSIC playback architecture visualization" {...tiltProps}>
    <div className="preview-topline"><span>PLAYBACK / RINA-MUSIC</span><span>03</span></div>
    <div className="audio-flow"><span>Discord</span><ArrowRight size={16} aria-hidden="true" /><span>Lavalink</span><ArrowRight size={16} aria-hidden="true" /><span>Playback</span></div>
    <div className="preview-footline"><span>NODE.JS</span><span>MUSIC BOT</span></div>
  </motion.div>;
}

function CaseStudy({ project, onClose }: { project: PortfolioProject; onClose: () => void }) {
  const studySections = [
    ["Problem", project.caseStudy.problem],
    ["Solution", project.caseStudy.solution],
    ["Architecture", project.caseStudy.architecture],
    ["Challenges", project.caseStudy.challenges],
    ["What I learned", project.caseStudy.learning],
  ].filter((section): section is [string, string] => Boolean(section[1]));

  return (
    <article className={`case-study-content project-${project.accent}`}>
      <header className="case-study-header">
        <div><p className="eyebrow">CASE STUDY / {project.number}</p><p className="case-study-category">{project.category}</p></div>
        <button type="button" className="case-study-close" onClick={onClose} aria-label="Close case study"><X size={18} /></button>
      </header>
      <h2 id="case-study-title">{project.name}</h2>
      <p className="case-study-overview" id="case-study-overview">{project.description}</p>
      <div className="case-study-summary">
        <section><p className="case-study-label">FEATURES</p><ul>{project.details.map((detail) => <li key={detail}>{detail}</li>)}</ul></section>
        <section><p className="case-study-label">TECHNOLOGY</p><div className="project-tags">{project.stack.map((technology) => <span key={technology}>{technology}</span>)}</div></section>
      </div>
      {studySections.length > 0 && <div className="case-study-sections">{studySections.map(([heading, content]) => <section key={heading}><h3>{heading}</h3><p>{content}</p></section>)}</div>}
      <div className="case-study-footer">
        <ProjectLink href={project.githubUrl} label="GitHub" icon={<GitBranch size={14} />} />
        <ProjectLink href={project.demoUrl} label="Live demo" icon={<ExternalLink size={14} />} />
      </div>
    </article>
  );
}

function ProjectLink({ href, label, icon }: { href: string; label: string; icon: ReactNode }) {
  if (!href) return <span className="project-link is-disabled" aria-disabled="true" title={`${label} URL not provided`}>{icon}{label}</span>;
  return <a className="project-link" href={href} target="_blank" rel="noreferrer">{icon}{label}</a>;
}
