import React from 'react';
import PageHeader from '@/components/common/PageHeader';
import { Shield, Lock, FileCheck, KeyRound, ScrollText, Cloud } from 'lucide-react';

const pillars = [
  { icon: Shield, title: 'HIPAA-compliant Cloud', desc: 'Built on infrastructure designed to meet HIPAA and HITECH requirements.' },
  { icon: KeyRound, title: 'MFA & RBAC', desc: 'Multi-factor authentication with fine-grained role-based access control.' },
  { icon: Lock, title: 'End-to-End Encryption', desc: 'AES-256 at rest, TLS 1.2+ in transit. Per-session key derivation.' },
  { icon: FileCheck, title: 'BAA-ready', desc: 'Business Associate Agreement–ready for covered entities and partners.' },
  { icon: ScrollText, title: 'Immutable Audit Logs', desc: 'Full, tamper-evident logs for every access, edit, and share action.' },
  { icon: Cloud, title: 'Regional Residency', desc: 'Data residency controls for US, EU, and custom regions.' },
];

export default function Compliance() {
  return (
    <div>
      <PageHeader
        eyebrow="Security &amp; Compliance"
        title="Security isn't a feature —"
        accent="it's the foundation."
        description="DocCollab is engineered from day one for HIPAA-focused environments. Every session, message, and note is protected end-to-end."
      />

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {pillars.map(({ icon: I, title, desc }) => (
              <div key={title} className="p-6 rounded-2xl bg-card border border-border hover:border-primary/40 transition-colors">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <I className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-lg text-foreground mb-1.5">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary/40 border-t border-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="font-display font-bold text-3xl text-foreground mb-3">Audit, on every action.</h2>
              <p className="text-muted-foreground leading-relaxed">
                Every event — authentication, message, note edit, share, export — is recorded in an immutable, tamper-evident log. Exportable for HIPAA audits and internal review.
              </p>
            </div>
            <div className="rounded-2xl bg-card border border-border p-5 font-mono text-xs space-y-1.5 overflow-hidden">
              {[
                { t: '08:02:14', u: 'kmensah@hosp', a: 'SESSION.OPEN', r: 'rd-4b-0420' },
                { t: '08:03:22', u: 'lshah@hosp', a: 'NOTE.CREATE', r: 'note-9271' },
                { t: '08:04:01', u: 'rnavarro@hosp', a: 'FHIR.OBS.WRITE', r: 'obs-445' },
                { t: '08:05:17', u: 'system/ai', a: 'AI.SOAP.DRAFT', r: 'note-9271' },
                { t: '08:06:40', u: 'kmensah@hosp', a: 'NOTE.APPROVE', r: 'note-9271' },
              ].map((l, i) => (
                <div key={i} className="grid grid-cols-[auto_1fr_auto_auto] gap-3 text-muted-foreground">
                  <span className="text-primary">{l.t}</span>
                  <span className="text-foreground truncate">{l.u}</span>
                  <span className="text-accent-foreground font-bold">{l.a}</span>
                  <span>{l.r}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}