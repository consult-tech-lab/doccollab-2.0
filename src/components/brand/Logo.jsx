import React from 'react';

export default function Logo({ size = 36, withWordmark = true, className = "" }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="DocCollab logo">
        <defs>
          <linearGradient id="dc-grad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.75" />
          </linearGradient>
          <linearGradient id="dc-accent" x1="0" y1="0" x2="20" y2="20" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="hsl(var(--accent))" />
            <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.7" />
          </linearGradient>
        </defs>
        {/* Abstract concentric "node" mark — two overlapping discs representing doc-to-doc collaboration */}
        <rect x="2" y="2" width="36" height="36" rx="10" fill="url(#dc-grad)" />
        <circle cx="15" cy="20" r="7.5" fill="white" fillOpacity="0.95" />
        <circle cx="25" cy="20" r="7.5" fill="url(#dc-accent)" />
        <circle cx="20" cy="20" r="2.5" fill="hsl(var(--primary))" />
      </svg>
      {withWordmark && (
        <div className="flex flex-col leading-none">
          <span className="font-display font-bold text-lg tracking-tight text-foreground">
            DocCollab
          </span>
          <span className="text-[9px] font-semibold tracking-[0.18em] text-primary/70 uppercase">
            2.0 · Demo
          </span>
        </div>
      )}
    </div>
  );
}