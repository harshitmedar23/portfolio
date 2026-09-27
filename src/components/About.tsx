import { Compass, GraduationCap, RefreshCw, Sparkles } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { education } from "@/data/profile";

const facts = [
  { icon: GraduationCap, label: "Education", value: education.program },
  { icon: Sparkles, label: "Current focus", value: "Software development & AI" },
  { icon: Compass, label: "Interests", value: "Web, systems, and AI" },
  { icon: RefreshCw, label: "Approach", value: "Learn → build → improve" },
];

export function About() {
  return (
    <section className="section about-section content-width" id="about" aria-labelledby="about-title">
      <div className="section-index"><span>02</span><span>ABOUT</span></div>
      <div className="about-editorial">
        <Reveal className="about-intro">
          <p className="eyebrow">Who I am</p>
          <h2 className="section-heading" id="about-title">Learning by making<br /><em>things that matter.</em></h2>
        </Reveal>
        <div className="about-detail">
          <Reveal><p className="about-statement">I’m a Computer Science Engineering student building practical software and web applications while exploring AI.</p><p className="section-copy">I learn by experimenting with ideas, working through problems, and improving each project as I go.</p></Reveal>
          <div className="fact-list">
            {facts.map(({ icon: Icon, label, value }, index) => (
              <Reveal className="fact-row" delay={index * 0.045} key={label}>
                <span className="fact-index">0{index + 1}</span><Icon size={16} aria-hidden="true" />
                <span className="fact-label">{label}</span><strong>{value}</strong>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
