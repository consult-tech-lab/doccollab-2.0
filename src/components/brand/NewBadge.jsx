import React from 'react';
import { Sparkles } from 'lucide-react';

export default function NewBadge({ label = "NEW", className = "" }) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent/90 text-accent-foreground text-[10px] font-bold tracking-wider uppercase shadow-sm ${className}`}>
      <Sparkles className="w-3 h-3" strokeWidth={2.5} />
      {label}
    </span>
  );
}