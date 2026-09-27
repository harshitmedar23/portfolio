"use client";

import type { CSSProperties, ReactNode } from "react";

export function Marquee({ children, duration = 26 }: { children: ReactNode; duration?: number }) {
  const style = { "--marquee-duration": `${duration}s` } as CSSProperties;
  return (
    <div className="marquee" style={style}>
      <div className="marquee-track">
        <div className="marquee-group">{children}</div>
        <div className="marquee-group" aria-hidden="true">{children}</div>
      </div>
    </div>
  );
}
