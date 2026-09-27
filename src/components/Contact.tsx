"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, BriefcaseBusiness, CheckCircle2, GitBranch, Mail } from "lucide-react";
import { FormEvent, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { profile } from "@/data/profile";

export function Contact() {
  const [notice, setNotice] = useState("");
  const [draftUrl, setDraftUrl] = useState("");
  const action = profile.email ? `mailto:${profile.email}` : "";
  const contactLinks = [
    ...(profile.email ? [{ label: profile.email, href: `mailto:${profile.email}`, icon: <Mail size={17} /> }] : []),
    ...(profile.githubUrl ? [{ label: "GitHub", href: profile.githubUrl, icon: <GitBranch size={17} /> }] : []),
    ...(profile.linkedinUrl ? [{ label: "LinkedIn", href: profile.linkedinUrl, icon: <BriefcaseBusiness size={17} /> }] : []),
  ];

  function submitMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!profile.email) {
      setNotice("Add an email address in src/data/profile.ts to enable this form.");
      return;
    }
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Portfolio message from ${data.get("name")}`);
    const body = encodeURIComponent(`From: ${data.get("name")} (${data.get("email")})\n\n${data.get("message")}`);
    setDraftUrl(`${action}?subject=${subject}&body=${body}`);
    setNotice("Your email draft is ready.");
  }

  return (
    <section className="section contact-section" id="contact" aria-labelledby="contact-title">
      <div className="content-width contact-shell">
        <Reveal className="contact-copy">
          <div className="section-index"><span>07</span><span>CONTACT</span></div>
          <p className="eyebrow">The next thing starts somewhere</p>
          <h2 id="contact-title">Have an idea<br />worth building?<br /><em>Let’s talk.</em></h2>
          <p className="contact-intro">A project, a question, or a thoughtful hello. I’m open to hearing what you’re working on.</p>
          {contactLinks.length > 0 && <div className="contact-socials">{contactLinks.map((link) => <a key={link.href} href={link.href} target={link.href.startsWith("mailto:") ? undefined : "_blank"} rel={link.href.startsWith("mailto:") ? undefined : "noreferrer"}>{link.icon}<span>{link.label}</span><ArrowRight size={14} /></a>)}</div>}
        </Reveal>
        <Reveal className="contact-form-wrap">
          <div className="contact-form-heading"><span>WRITE A NOTE</span><span>01 — 03</span></div>
          <form className="contact-form" onSubmit={submitMessage}>
            <label>Name<input name="name" autoComplete="name" required placeholder="Your name" /></label>
            <label>Email<input name="email" type="email" autoComplete="email" required placeholder="you@example.com" /></label>
            <label>Message<textarea name="message" rows={4} required placeholder="What are you thinking about?" /></label>
            <button className="button-primary" type="submit">Send Message <ArrowRight size={15} /></button>
            <AnimatePresence mode="wait">
              {draftUrl ? <motion.div key="draft" className="contact-success" role="status" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.25 }}><CheckCircle2 size={19} aria-hidden="true" /><span>Your message is ready for review in your email app.</span><a href={draftUrl}>Open draft <ArrowRight size={13} /></a></motion.div> : <p className="form-note" key="note" role="status">{notice || "This form prepares an email draft; nothing is sent or stored on this site."}</p>}
            </AnimatePresence>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
