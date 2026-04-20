import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Server, Network, Check } from 'lucide-react';

const modes = {
  standalone: {
    title: 'Standalone Mode',
    desc: 'Runs independently as a secure collaboration workspace — no EHR required. Ideal for conferences, training, and rapid deployment.',
    features: ['Zero EHR dependency', 'Instant team rollout', 'Self-contained audit log', 'Session-based sharing'],
    icon: Server,
  },
  fhir: {
    title: 'FHIR Integration Mode',
    desc: 'Connects directly to your existing EHR via FHIR R4. Read/write patient context, problem lists, and notes within your clinical workflow.',
    features: ['FHIR R4 / SMART on FHIR', 'Bi-directional sync', 'Epic · Cerner · Athena', 'Write SOAP notes to EHR'],
    icon: Network,
  },
};

export default function ModeSwitch() {
  const [mode, setMode] = useState('standalone');
  const current = modes[mode];
  const Icon = current.icon;

  return (
    <section className="py-24 border-t border-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-xs font-bold tracking-[0.2em] text-primary uppercase mb-3">Deployment</p>
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-foreground">
            Stand-alone or <span className="text-gradient">FHIR-ready</span>.
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Switch between modes based on your environment. Both paths are HIPAA-focused, end-to-end encrypted, and audit-logged.
          </p>
        </div>

        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1 rounded-full bg-secondary border border-border">
            {Object.entries(modes).map(([key, m]) => (
              <button
                key={key}
                onClick={() => setMode(key)}
                className={`relative px-6 py-2 text-sm font-semibold rounded-full transition-colors ${
                  mode === key ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {mode === key && (
                  <motion.span
                    layoutId="mode-pill"
                    className="absolute inset-0 bg-primary rounded-full"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
                <span className="relative">{m.title.replace(' Mode', '')}</span>
              </button>
            ))}
          </div>
        </div>

        <motion.div
          key={mode}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="grid lg:grid-cols-2 gap-6 items-stretch"
        >
          <div className="glass rounded-3xl p-8 lg:p-10">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
              <Icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-display font-bold text-2xl text-foreground mb-3">{current.title}</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">{current.desc}</p>
            <div className="space-y-2.5">
              {current.features.map(f => (
                <div key={f} className="flex items-center gap-2.5 text-sm">
                  <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-accent-foreground" strokeWidth={3} />
                  </div>
                  <span className="text-foreground">{f}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative glass rounded-3xl p-8 lg:p-10 overflow-hidden">
            <div className="absolute inset-0 grid-bg opacity-30" />
            <div className="relative h-full flex items-center justify-center min-h-[280px]">
              <div className="relative">
                <div className="absolute inset-0 pulse-ring rounded-full bg-primary/20" />
                <div className="relative w-24 h-24 rounded-3xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-xl">
                  <Icon className="w-10 h-10 text-primary-foreground" />
                </div>
              </div>
              {mode === 'fhir' && (
                <>
                  <div className="absolute top-8 left-8 px-3 py-1.5 rounded-lg glass text-xs font-mono text-primary">GET /Patient/123</div>
                  <div className="absolute bottom-8 right-8 px-3 py-1.5 rounded-lg glass text-xs font-mono text-primary">POST /Observation</div>
                </>
              )}
              {mode === 'standalone' && (
                <>
                  <div className="absolute top-8 right-8 px-3 py-1.5 rounded-lg glass text-xs font-semibold text-primary">Self-hosted</div>
                  <div className="absolute bottom-8 left-8 px-3 py-1.5 rounded-lg glass text-xs font-semibold text-primary">No EHR</div>
                </>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}