import React from 'react';
import { Building2, Radio, GraduationCap, Globe2 } from 'lucide-react';

const items = [
  { icon: Building2, label: 'Multi-hospital systems' },
  { icon: Radio, label: 'Telehealth networks' },
  { icon: GraduationCap, label: 'Academic medical centers' },
  { icon: Globe2, label: 'Global collaborations' },
];

export default function ScaleStrip() {
  return (
    <section className="py-16 border-t border-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-bold tracking-[0.2em] text-muted-foreground uppercase mb-8">
          Built to scale across
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map(({ icon: I, label }) => (
            <div key={label} className="flex items-center gap-3 p-4 rounded-2xl bg-secondary/60 border border-border">
              <div className="w-10 h-10 rounded-xl bg-background flex items-center justify-center flex-shrink-0">
                <I className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm font-medium text-foreground">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}