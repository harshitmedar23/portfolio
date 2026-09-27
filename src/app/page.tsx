import { existsSync } from "node:fs";
import { join } from "node:path";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { CurrentFocus } from "@/components/CurrentFocus";
import { Footer } from "@/components/Footer";
import { GitHub } from "@/components/GitHub";
import { Hero } from "@/components/Hero";
import { Journey } from "@/components/Journey";
import { Navbar } from "@/components/Navbar";
import { PageAmbient } from "@/components/PageAmbient";
import { Projects } from "@/components/Projects";
import { QuickStats } from "@/components/QuickStats";
import { Skills } from "@/components/Skills";
import { profile } from "@/data/profile";

const resumeAvailable = Boolean(profile.resumePath) && existsSync(join(process.cwd(), "public", profile.resumePath.replace(/^\/+/, "")));

export default function Home() {
  return (
    <div className="page-shell">
      <PageAmbient>
        <Navbar resumeAvailable={resumeAvailable} />
        <main>
          <Hero resumeAvailable={resumeAvailable} />
          <QuickStats />
          <About />
          <Projects />
          <Skills />
          {profile.githubUrl && <GitHub />}
          <Journey />
          <CurrentFocus />
          <Contact />
        </main>
        <Footer />
      </PageAmbient>
    </div>
  );
}
