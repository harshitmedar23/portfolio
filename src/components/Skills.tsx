import { Code2, Database, PanelsTopLeft, Server, Wrench } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { skillGroups, skillProjectUsage } from "@/data/profile";

const skillIcons = { Languages: Code2, Frontend: PanelsTopLeft, Backend: Server, Database, Tools: Wrench };

export function Skills() {
  return (
    <section className="section skills-section" id="skills" aria-labelledby="skills-title">
      <div className="content-width">
        <Reveal className="skills-intro">
          <div className="section-index"><span>04</span><span>TECHNICAL STACK</span></div>
          <div><p className="eyebrow">Tools and technologies</p><h2 className="section-heading" id="skills-title">A stack in progress.</h2></div>
          <p className="section-copy">Grouped by where each technology fits. Project connections appear only when they’re part of the supplied project details.</p>
        </Reveal>
        <div className="skills-ledger">
          {skillGroups.map((group, index) => {
            const Icon = skillIcons[group.label];
            return (
            <Reveal className="skill-row" delay={index * 0.04} key={group.label}>
              <div className="skill-group-head"><span className="skill-row-index">0{index + 1}</span><Icon size={16} aria-hidden="true" /><span>{group.label}</span></div>
              <div className="skill-list">{group.items.map((skill) => {
                const usedIn = skillProjectUsage[skill.name] ?? [];
                const context = usedIn.length ? `Used in ${usedIn.join(" and ")}` : group.label;
                return <div className="skill-entry" key={skill.name} title={`${skill.name} / ${group.label}${usedIn.length ? ` / ${context}` : ""}`}>
                  <span className="skill-mark" aria-hidden="true">{skill.mark}</span><span className="skill-name">{skill.name}</span>
                  <span className="skill-detail" aria-hidden="true">{usedIn.length ? context : group.label}</span>
                </div>;
              })}</div>
            </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
