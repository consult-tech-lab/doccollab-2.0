import React from 'react';
import { Link } from 'react-router-dom';
import { Mic, Languages, FileText, Tag, ArrowRight } from 'lucide-react';
import NewBadge from '@/components/brand/NewBadge';

const items = [
  { icon: Mic, title: 'Ambient Scribe', desc: 'Listens to the encounter and produces a SOAP-style draft.' },
  { icon: FileText, title: 'Note Summarization', desc: 'Condense long notes into clean, clinical summaries.' },
  { icon: Languages, title: 'Medical Translation', desc: 'Real-time multilingual clinical communication.' },
  { icon: Tag, title: 'ICD / SNOMED Tagging', desc: 'Automated coding suggestions for structured data.' },
];

export default function AIPreview() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden border border-border bg-card">
          <div className="absolute inset-0 grid-bg opacity-30" />
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-accent/20 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-primary/20 blur-3xl" />

          <div className="relative p-10 lg:p-16">
            <div className="flex items-center gap-3 mb-5">
              <NewBadge label="AI Suite · Live Demo" />
            </div>
            <h2 className="font-display font-bold text-4xl sm:text-5xl text-foreground leading-tight max-w-3xl">
              Ambient AI that <span className="text-gradient">writes the note</span> so you can be present.
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl">
              Documentation support that listens to the clinical encounter, transcribes dictation, and drafts a concise SOAP note ready for your review and EHR entry.
            </p>

            <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {items.map(({ icon: I, title, desc }) => (
                <div key={title} className="p-5 rounded-2xl bg-card/80 border border-border/80">
                  <I className="w-5 h-5 text-accent mb-3" />
                  <h3 className="font-display font-semibold text-sm text-foreground mb-1">{title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <Link to="/ambient-ai" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all">
                Try the Ambient AI demo <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}