"use client";

import { useEffect, useState } from "react";
import { navigation } from "@/data/profile";

export function SectionDots() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const ids = ["home", ...navigation.map((item) => item.href.slice(1))];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const current = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];
        if (current) setActive(current.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.2, 0.5, 0.8] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const items = [{ label: "Home", href: "#home" }, ...navigation];

  return (
    <nav className="section-dots" aria-label="Section navigation">
      {items.map((item) => {
        const id = item.href.slice(1);
        const isActive = active === id;
        return (
          <a
            key={id}
            href={item.href}
            className={`section-dot${isActive ? " is-active" : ""}`}
            aria-label={item.label}
            aria-current={isActive ? "location" : undefined}
          >
            <span className="section-dot-label">{item.label}</span>
            <span className="section-dot-mark" aria-hidden="true" />
          </a>
        );
      })}
    </nav>
  );
}
