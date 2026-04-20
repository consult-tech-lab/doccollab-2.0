import React, { useState, useEffect } from 'react';
import PageHeader from '@/components/common/PageHeader';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Clock, Tag, Copy, Check, Trash2, ChevronDown, ChevronUp, BookOpen, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';

const STORAGE_KEY = 'doccollab_notes_vault';

const SEED_NOTES = [
  {
    id: 'seed-1',
    timestamp: '2026-04-20T08:05:17.000Z',
    sessionLabel: 'Morning Rounds · Unit 4B',
    soap: {
      S: 'Pt. reports improved symptoms since last visit. Persistent dyspnea on exertion, mild bilateral ankle edema at night. Denies chest pain or dizziness.',
      O: 'BP 142/88, HR 78, RR 16, SpO2 98% RA. Lungs clear bilaterally. Trace pedal edema. No JVD.',
      A: 'Hypertension — suboptimally controlled. Mild volume overload, likely related.',
      P: 'Increase lisinopril to 20 mg PO daily. Initiate hydrochlorothiazide 12.5 mg PO daily. Low-sodium diet counseling. Follow up in 4 weeks.',
    },
    codes: [
      { code: 'I10', sys: 'ICD-10', label: 'Essential hypertension' },
      { code: 'R60.0', sys: 'ICD-10', label: 'Localized edema' },
      { code: 'R06.02', sys: 'ICD-10', label: 'Shortness of breath' },
    ],
    source: 'Ambient AI Demo',
  },
];

function useVault() {
  const [notes, setNotes] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch {}
    return SEED_NOTES;
  });

  const save = (updated) => {
    setNotes(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const addNote = (note) => save([{ ...note, id: `note-${Date.now()}` }, ...notes]);
  const deleteNote = (id) => save(notes.filter(n => n.id !== id));
  const clearAll = () => save([]);

  return { notes, addNote, deleteNote, clearAll };
}

// Export so AmbientDemo can call it
export function saveNoteToVault(soap, codes, sessionLabel = 'Ambient AI Session') {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const notes = stored ? JSON.parse(stored) : SEED_NOTES;
    const newNote = {
      id: `note-${Date.now()}`,
      timestamp: new Date().toISOString(),
      sessionLabel,
      soap,
      codes,
      source: 'Ambient AI Demo',
    };
    const updated = [newNote, ...notes];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {}
}

function NoteCard({ note, onDelete }) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyNote = () => {
    const text = `SUBJECTIVE:\n${note.soap.S}\n\nOBJECTIVE:\n${note.soap.O}\n\nASSESSMENT:\n${note.soap.A}\n\nPLAN:\n${note.soap.P}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const date = new Date(note.timestamp);
  const dateStr = date.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
  const timeStr = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0 }}
      className="glass rounded-2xl overflow-hidden"
    >
      <div className="px-6 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-4 h-4 text-accent-foreground" />
          </div>
          <div>
            <p className="font-semibold text-sm text-foreground">{note.sessionLabel}</p>
            <p className="text-xs text-muted-foreground flex items-center gap-1.5">
              <Clock className="w-3 h-3" /> {dateStr} · {timeStr}
              <span className="ml-2 px-1.5 py-0.5 rounded bg-primary/10 text-primary font-mono">{note.source}</span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="ghost" onClick={copyNote} className="gap-1.5 text-muted-foreground">
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'Copy'}
          </Button>
          <Button size="sm" variant="ghost" onClick={() => onDelete(note.id)} className="text-muted-foreground hover:text-destructive">
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
          <Button size="sm" variant="ghost" onClick={() => setExpanded(!expanded)} className="text-muted-foreground">
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t border-border/60 px-6 py-5 space-y-3 overflow-hidden"
          >
            {Object.entries(note.soap).map(([key, val]) => (
              <div key={key} className="p-3 rounded-xl bg-secondary/50 border border-border">
                <p className="text-[10px] font-bold tracking-[0.15em] text-primary uppercase mb-1">
                  {key === 'S' ? 'Subjective' : key === 'O' ? 'Objective' : key === 'A' ? 'Assessment' : 'Plan'}
                </p>
                <p className="text-sm text-foreground leading-relaxed">{val}</p>
              </div>
            ))}

            {note.codes?.length > 0 && (
              <div className="pt-1">
                <p className="text-[10px] font-bold tracking-[0.15em] text-primary uppercase mb-2 flex items-center gap-1.5">
                  <Tag className="w-3 h-3" /> Auto-tagged codes
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {note.codes.map(c => (
                    <span key={c.code} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent/20 text-xs font-medium text-foreground">
                      <span className="font-mono font-bold text-accent-foreground">{c.code}</span>
                      <span className="text-muted-foreground text-[10px]">{c.sys}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function NotesVault() {
  const { notes, addNote, deleteNote, clearAll } = useVault();

  return (
    <div>
      <PageHeader
        showNew
        eyebrow="Notes Vault"
        title="Your ambient sessions,"
        accent="saved & timestamped."
        description="Every SOAP note generated in the Ambient AI demo is automatically stored here with a timestamp. Use it to review your practice sessions and track your learning."
      />

      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Info banner */}
          <div className="mb-8 p-5 rounded-2xl bg-primary/5 border border-primary/20 flex gap-4">
            <BookOpen className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-foreground mb-1">How the Notes Vault works</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Complete the Ambient AI demo (tap the mic, let the encounter run). When the SOAP note is generated, it's automatically saved here with the session timestamp. Expand any note to read the full SOAP sections and ICD-10 codes.
                <br /><br />
                <strong className="text-foreground">In production:</strong> Notes are stored encrypted in your organization's EHR-connected namespace, not in browser storage. Clinicians can review, approve, and push notes directly to the patient chart.
              </p>
            </div>
          </div>

          {/* Header bar */}
          <div className="flex items-center justify-between mb-5">
            <p className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Database className="w-4 h-4 text-primary" />
              {notes.length} saved note{notes.length !== 1 ? 's' : ''}
            </p>
            {notes.length > 0 && (
              <Button variant="outline" size="sm" onClick={clearAll} className="gap-1.5 text-muted-foreground">
                <Trash2 className="w-3.5 h-3.5" /> Clear all
              </Button>
            )}
          </div>

          {/* Notes list */}
          {notes.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-secondary flex items-center justify-center">
                <Sparkles className="w-7 h-7 text-muted-foreground" />
              </div>
              <p className="text-foreground font-semibold mb-1">No notes yet</p>
              <p className="text-sm text-muted-foreground">Run the Ambient AI demo to generate and save your first SOAP note.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <AnimatePresence>
                {notes.map(n => (
                  <NoteCard key={n.id} note={n} onDelete={deleteNote} />
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}