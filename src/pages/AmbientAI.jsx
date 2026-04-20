import React from 'react';
import PageHeader from '@/components/common/PageHeader';
import AmbientDemo from '@/components/ambient/AmbientDemo';
import { Languages, FileText, Tag, Mic } from 'lucide-react';

const caps = [
  { icon: Mic, title: 'Ambient Documentation', desc: 'Listens, transcribes, and drafts SOAP notes for review and EHR entry.' },
  { icon: FileText, title: 'Note Summarization', desc: 'AI-assisted summarization to reduce administrative burden.' },
  { icon: Languages, title: 'Medical Translation', desc: 'Multilingual clinical communication with medical-grade accuracy.' },
  { icon: Tag, title: 'ICD / SNOMED Tagging', desc: 'Automated coding suggestions aligned with structured data standards.' },
];

export default function AmbientAI() {
  return (
    <div>
      <PageHeader
        showNew
        eyebrow="Ambient AI Suite"
        title="Be present with the patient."
        accent="Let AI write the note."
        description="An interactive demo of DocCollab's ambient scribe. Tap the mic to simulate a clinical encounter and watch a SOAP note generate in real time."
      />
      <AmbientDemo />

      <section className="py-16 bg-secondary/40 border-t border-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display font-bold text-2xl text-foreground mb-6">AI &amp; Language Capabilities</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {caps.map(({ icon: I, title, desc }) => (
              <div key={title} className="p-5 rounded-2xl bg-card border border-border">
                <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center mb-3">
                  <I className="w-5 h-5 text-accent-foreground" />
                </div>
                <h3 className="font-display font-semibold text-base text-foreground mb-1">{title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}