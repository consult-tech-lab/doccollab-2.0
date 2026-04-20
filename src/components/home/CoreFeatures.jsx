import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Share2, Smartphone, Users, FileLock2, Sparkles } from 'lucide-react';

const features = [
  { icon: Lock, title: 'End-to-End Encrypted', desc: 'Doc-to-doc collaboration protected by AES-256 at rest and TLS 1.3 in transit.' },
  { icon: Share2, title: 'Real-Time Note Sharing', desc: 'Live medical notes with @tagging, threaded replies, and structured handoffs.' },
  { icon: Smartphone, title: 'Every Device, Secure', desc: 'Desktop, tablet, mobile, and wearables — unified session, zero friction.' },
  { icon: Users, title: 'Session-Based Rounds', desc: 'Time-bound collaboration rooms for rounds, case reviews, and remote care.' },
  { icon: FileLock2, title: 'Compliance Logging', desc: 'Immutable audit logs for HIPAA, HITECH, and BAA-grade traceability.' },
  { icon: Sparkles, title: 'Ambient AI — Live', desc: 'Listens, transcribes, and drafts SOAP notes. ICD/SNOMED auto-tagging.' },
];

export default function CoreFeatures() {
  return (
    <section className="py-24 bg-secondary/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-14 max-w-2xl">
          <p className="text-xs font-bold tracking-[0.2em] text-primary uppercase mb-3">Core Capabilities</p>
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-foreground leading-tight">
            Everything a clinical team needs — <span className="text-gradient">nothing it doesn't.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group relative p-6 rounded-2xl bg-card border border-border hover:border-primary/40 transition-all hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Icon className="w-5 h-5 text-primary group-hover:text-primary-foreground" />
                </div>
                <h3 className="font-display font-semibold text-lg text-foreground mb-1.5">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}