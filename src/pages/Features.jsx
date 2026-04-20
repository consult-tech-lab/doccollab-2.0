import React from 'react';
import PageHeader from '@/components/common/PageHeader';
import { Lock, Share2, Smartphone, Users, FileLock2, Sparkles, Video, Image, Watch, Brain, Shield, Languages } from 'lucide-react';

const core = [
  { icon: Lock, title: 'End-to-End Encrypted Doc-to-Doc', desc: 'AES-256 at rest, TLS 1.3 in transit. Zero-knowledge session keys.' },
  { icon: Share2, title: 'Real-Time Medical Note Sharing', desc: 'Live tagging, threaded discussion, structured handoffs.' },
  { icon: Smartphone, title: 'Secure Cross-Device Access', desc: 'Desktop, mobile, tablets, and wearables — single identity.' },
  { icon: Users, title: 'Session-Based Collaboration', desc: 'Rounds, remote teams, and conferences with time-bound rooms.' },
  { icon: FileLock2, title: 'Compliance Data Logging', desc: 'HIPAA & HITECH ready with immutable audit trails.' },
  { icon: Sparkles, title: 'Ambient AI — Live', desc: 'Transcription, SOAP drafting, and auto-coding in one flow.' },
];

const future = [
  { icon: Video, title: 'Secure Live Video', desc: 'Encrypted video for case conferences and virtual rounds.' },
  { icon: Image, title: 'Imaging + Annotation', desc: 'Medical imaging viewer with collaborative annotation.' },
  { icon: Watch, title: 'Wearable Vital Sync', desc: 'Real-time vitals from Apple Watch and WearOS devices.' },
  { icon: Brain, title: 'Advanced AI Reasoning', desc: 'Differential support and guideline-aligned suggestions.' },
  { icon: Languages, title: 'Medical Translation', desc: 'Accurate multilingual clinical communication.' },
  { icon: Shield, title: 'Role-Based Access', desc: 'Fine-grained permissions by role, service, and session.' },
];

const Card = ({ icon: I, title, desc, coming }) => (
  <div className="relative p-6 rounded-2xl bg-card border border-border hover:border-primary/40 transition-colors">
    {coming && (
      <span className="absolute top-4 right-4 text-[9px] font-bold tracking-wider text-accent-foreground bg-accent/90 px-2 py-0.5 rounded-full">
        SOON
      </span>
    )}
    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
      <I className="w-5 h-5 text-primary" />
    </div>
    <h3 className="font-display font-semibold text-lg text-foreground mb-1.5">{title}</h3>
    <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
  </div>
);

export default function Features() {
  return (
    <div>
      <PageHeader
        eyebrow="Features"
        title="Everything you need for"
        accent="clinical collaboration."
        description="Core capabilities shipping today, and the roadmap of what's next."
      />

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display font-bold text-2xl text-foreground mb-6">Core Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {core.map(f => <Card key={f.title} {...f} />)}
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary/40 border-t border-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display font-bold text-2xl text-foreground mb-1">Future Add-ons</h2>
          <p className="text-muted-foreground text-sm mb-6">Part of the DocCollab 2.0 roadmap.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {future.map(f => <Card key={f.title} {...f} coming />)}
          </div>
        </div>
      </section>
    </div>
  );
}