import { ArrowUpRight, BriefcaseBusiness, GitBranch, Mail } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="site-footer">
      <Reveal className="footer-inner content-width">
        <a href="#home" className="footer-brand"><span className="brand-monogram">{profile.initials}</span><span><strong>{profile.name}</strong><small>Student developer, always learning.</small></span></a>
        <p className="footer-copy">© {new Date().getFullYear()} {profile.name}. Built with curiosity.</p>
        <div className="footer-socials">
          {profile.githubUrl && <a href={profile.githubUrl} aria-label="GitHub" target="_blank" rel="noreferrer"><GitBranch size={16} /></a>}
          {profile.linkedinUrl && <a href={profile.linkedinUrl} aria-label="LinkedIn" target="_blank" rel="noreferrer"><BriefcaseBusiness size={16} /></a>}
          {profile.email && <a href={`mailto:${profile.email}`} aria-label="Email"><Mail size={16} /></a>}
          <a href="#home" aria-label="Back to top"><ArrowUpRight size={16} /></a>
        </div>
      </Reveal>
    </footer>
  );
}
