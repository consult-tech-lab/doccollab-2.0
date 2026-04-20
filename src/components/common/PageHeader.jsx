import React from 'react';
import NewBadge from '@/components/brand/NewBadge';

export default function PageHeader({ eyebrow, title, accent, description, showNew }) {
  return (
    <div className="relative overflow-hidden border-b border-border/60">
      <div className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="max-w-3xl space-y-4">
          <div className="flex items-center gap-3">
            {showNew && <NewBadge />}
            {eyebrow && (
              <p className="text-xs font-bold tracking-[0.2em] text-primary uppercase">{eyebrow}</p>
            )}
          </div>
          <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-foreground leading-[1.05]">
            {title} {accent && <span className="text-gradient">{accent}</span>}
          </h1>
          {description && (
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
}