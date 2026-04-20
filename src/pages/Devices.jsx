import React from 'react';
import PageHeader from '@/components/common/PageHeader';
import { Smartphone, Tablet, Watch, Monitor, Hand } from 'lucide-react';
import NewBadge from '@/components/brand/NewBadge';

const devices = [
  { icon: Smartphone, title: 'iOS & Android', desc: 'Native-feel secure apps for smartphones with biometric unlock.', touch: true },
  { icon: Tablet, title: 'iPad & Tablets', desc: 'Touch-first rounds view optimized for bedside collaboration.', touch: true },
  { icon: Watch, title: 'Apple Watch & WearOS', desc: 'Receive alerts, acknowledge tags, sync vitals in real time.', touch: false },
  { icon: Monitor, title: 'Secure Desktops / VDI', desc: 'Works inside EMR and VDI environments with SSO and FHIR.', touch: false },
];

export default function Devices() {
  return (
    <div>
      <PageHeader
        eyebrow="Devices"
        title="One secure experience,"
        accent="every surface."
        description="DocCollab meets clinicians where they are — with ambient and touch-first interfaces that adapt to the device."
      />

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-5">
            {devices.map(({ icon: I, title, desc, touch }) => (
              <div key={title} className="relative p-8 rounded-3xl bg-card border border-border overflow-hidden group hover:border-primary/40 transition-colors">
                <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-primary/5 group-hover:bg-primary/10 blur-2xl transition-colors" />
                <div className="relative">
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                      <I className="w-7 h-7 text-primary" />
                    </div>
                    {touch && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-accent/20 text-[10px] font-bold tracking-wider uppercase text-accent-foreground">
                        <Hand className="w-3 h-3" /> Touch-ready
                      </span>
                    )}
                  </div>
                  <h3 className="font-display font-bold text-xl text-foreground mb-2">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary/40 border-t border-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <NewBadge label="New in 2.0" />
          </div>
          <h2 className="font-display font-bold text-3xl text-foreground mb-3 max-w-2xl">
            Ambient + touch-first, together.
          </h2>
          <p className="text-muted-foreground max-w-2xl leading-relaxed mb-8">
            On supported touchscreen devices, DocCollab activates gesture shortcuts, ambient mic-on visualization, and a simplified rounds layout — ideal for tap-and-go workflows at the bedside.
          </p>

          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { label: 'Ambient mic indicator', v: 'Always visible' },
              { label: 'Gesture shortcuts', v: 'Swipe to tag' },
              { label: 'Bedside layout', v: 'Auto-adapts' },
            ].map(i => (
              <div key={i.label} className="p-5 rounded-2xl bg-card border border-border">
                <p className="text-xs text-muted-foreground mb-1">{i.label}</p>
                <p className="font-display font-semibold text-foreground">{i.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}