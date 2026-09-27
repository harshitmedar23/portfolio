import { ArrowUpRight, BrainCircuit, Code2, PanelsTopLeft } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { focusAreas } from "@/data/profile";

const focusIcons = [Code2, BrainCircuit, PanelsTopLeft];

export function CurrentFocus() {
  return (
    <section className="section focus-section" id="focus" aria-labelledby="focus-title">
      <div className="content-width">
        <Reveal className="focus-heading">
          <div><div className="section-index"><span>06</span><span>IN PROGRESS</span></div><p className="eyebrow">Current focus</p><h2 className="section-heading" id="focus-title">Learning, building,<br /><em>experimenting.</em></h2></div>
          <p className="section-copy">Areas I’m exploring as I grow my computer science foundation and build practical applications.</p>
        </Reveal>
        <div className="focus-list">
          {focusAreas.map((area, index) => {
            const Icon = focusIcons[index];
            return <Reveal className="focus-row" delay={index * 0.05} key={area.title}>
              <span className="focus-row-number">0{index + 1}</span>
              <Icon size={19} aria-hidden="true" />
              <div className="focus-row-copy"><h3>{area.title}</h3><p>{area.detail}</p></div>
              <span className={`focus-status focus-status-${area.status.toLowerCase()}`}>{area.status}</span>
              <ArrowUpRight className="focus-arrow" size={16} aria-hidden="true" />
            </Reveal>;
          })}
        </div>
      </div>
    </section>
  );
}
