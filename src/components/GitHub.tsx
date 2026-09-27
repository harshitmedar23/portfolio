import { ArrowUpRight, GitBranch } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { profile } from "@/data/profile";

export function GitHub() {
  return (
    <section className="section github-section" aria-labelledby="github-title">
      <Reveal className="content-width github-profile">
        <div className="github-mark" aria-hidden="true"><GitBranch size={20} /></div>
        <div><p className="eyebrow">Code profile</p><h2 id="github-title">Find me on GitHub{profile.githubUsername && <span> / @{profile.githubUsername}</span>}</h2><p>Repositories and code projects.</p></div>
        <a className="github-action" href={profile.githubUrl} target="_blank" rel="noreferrer">View profile <ArrowUpRight className="github-arrow" size={15} /></a>
      </Reveal>
    </section>
  );
}
