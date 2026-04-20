import React from 'react';
import Logo from '@/components/brand/Logo';
import { Shield, Lock, FileCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2">
            <Logo />
            <p className="text-xs text-muted-foreground max-w-md">
              This is a working demo prototype for user testing and pitching. Not for clinical use.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { icon: Shield, label: 'HIPAA-ready' },
              { icon: Lock, label: 'AES-256' },
              { icon: FileCheck, label: 'BAA-ready' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-secondary/50 text-xs font-medium text-muted-foreground">
                <Icon className="w-3.5 h-3.5 text-primary" /> {label}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-border/60 text-xs text-muted-foreground flex flex-col sm:flex-row justify-between gap-2">
          <p>© 2026 DocCollab. All rights reserved.</p>
          <p>v2.0 · Demo Prototype</p>
        </div>
      </div>
    </footer>
  );
}