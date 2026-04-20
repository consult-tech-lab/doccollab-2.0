import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Activity, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import NewBadge from '@/components/brand/NewBadge';

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Abstract background */}
      <div className="absolute inset-0 grid-bg opacity-40 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_80%)]" />
      <div className="absolute top-20 -left-20 w-96 h-96 rounded-full bg-primary/15 blur-3xl" />
      <div className="absolute top-40 -right-20 w-96 h-96 rounded-full bg-accent/20 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 lg:pt-24 lg:pb-32">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-7"
          >
            <div className="flex items-center gap-3">
              <NewBadge label="New · v2.0" />
              <span className="text-xs font-medium text-muted-foreground tracking-wide">
                Demo Prototype
              </span>
            </div>

            <h1 className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl leading-[1.02] tracking-tight text-foreground">
              Secure clinical<br />
              collaboration,<br />
              <span className="text-gradient">reimagined.</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              A HIPAA-focused SaaS prototype for medical professionals — enabling secure, scalable
              collaboration during patient rounds, conferences, and remote care. Now with ambient AI,
              touch-first UI, and FHIR-ready integration.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link to="/session">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full gap-2 h-12 px-6 glow-primary">
                  Start Live Session <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/ambient-ai">
                <Button size="lg" variant="outline" className="rounded-full gap-2 h-12 px-6 border-border hover:bg-secondary">
                  <Play className="w-4 h-4" /> See Ambient AI
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap gap-6 pt-4 text-sm">
              {[
                { icon: Activity, label: 'E2E Encrypted' },
                { icon: Sparkles, label: 'Ambient AI Ready' },
                { icon: Activity, label: 'FHIR Compatible' },
              ].map(({ icon: I, label }) => (
                <div key={label} className="flex items-center gap-2 text-muted-foreground">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <I className="w-4 h-4 text-primary" />
                  </div>
                  <span className="font-medium">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Device mock */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md float">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 rounded-[2rem] blur-2xl" />
              <div className="relative glass rounded-[2rem] p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-400" />
                    <div className="w-2 h-2 rounded-full bg-accent" />
                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  </div>
                  <span className="text-[10px] font-semibold tracking-widest text-primary uppercase">Rounds · Live</span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-primary/5 border border-primary/10">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-primary/60 flex-shrink-0 flex items-center justify-center text-primary-foreground font-semibold text-sm">
                      KM
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-foreground">Dr. Mensah</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Pt. stable, BP 118/76. Plan: continue metoprolol.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-accent/10 border border-accent/20">
                    <div className="w-9 h-9 rounded-full bg-accent flex-shrink-0 flex items-center justify-center text-accent-foreground font-semibold text-sm">
                      AI
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                        Ambient Scribe <Sparkles className="w-3 h-3" />
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">SOAP draft ready · ICD-10: I10 tagged</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-secondary">
                    <div className="w-9 h-9 rounded-full bg-emerald-500/20 flex-shrink-0 flex items-center justify-center text-emerald-600 font-semibold text-sm">
                      RN
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-foreground">R. Navarro, RN</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Vitals logged from Apple Watch ✓</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-border flex items-center justify-between text-[10px] text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    4 participants · encrypted
                  </span>
                  <span className="font-mono">TLS 1.3</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}