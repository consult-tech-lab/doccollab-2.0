import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PenLine, Send, Tag, User, AlertCircle, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { addRoundsNote } from '@/lib/roundsStore';

const NOTE_TYPES = ['Follow-Up', 'Update', 'Coordination', 'Critical Update', 'Discharge Planning', 'IDT Note'];
const PRIORITIES = [
  { val: 'routine', label: 'Routine', color: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400' },
  { val: 'medium', label: 'Priority', color: 'bg-amber-500/15 text-amber-600 dark:text-amber-400' },
  { val: 'high', label: 'Urgent', color: 'bg-red-500/15 text-red-500' },
  { val: 'critical', label: 'Critical', color: 'bg-red-600 text-white' },
];

const CLINICIANS = [
  { name: 'Dr. K. Mensah', credential: 'MD · Attending' },
  { name: 'Dr. L. Shah', credential: 'MD · Resident' },
  { name: 'R. Navarro', credential: 'RN · Charge Nurse' },
  { name: 'J. Park', credential: 'PharmD' },
  { name: 'C. Torres', credential: 'SW · Social Work' },
  { name: 'M. Ellis', credential: 'PT · Physical Therapy' },
];

export default function RoundsNotepad({ patient, onNoteAdded }) {
  const [note, setNote] = useState('');
  const [type, setType] = useState('Follow-Up');
  const [priority, setPriority] = useState('routine');
  const [clinician, setClinician] = useState(CLINICIANS[0]);
  const [tagInput, setTagInput] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const submit = () => {
    if (!note.trim()) return;
    const tags = tagInput.trim()
      ? tagInput.split(',').map(t => t.trim().startsWith('#') ? t.trim() : `#${t.trim()}`).filter(Boolean)
      : [];

    const newNote = {
      id: `rn-${Date.now()}`,
      ts: new Date().toISOString(),
      patientId: patient.id,
      patientName: patient.name,
      room: patient.room,
      mrn: patient.mrn || `MRN-${10000 + Math.floor(Math.random() * 99999)}`,
      payer: patient.payer || 'Unspecified',
      type,
      author: clinician.name,
      credential: clinician.credential,
      note: note.trim(),
      tags,
      priority,
    };

    addRoundsNote(newNote);
    onNoteAdded(newNote);
    setNote('');
    setTagInput('');
    setType('Follow-Up');
    setPriority('routine');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-3"
    >
      {/* Context header */}
      <div className="flex items-center gap-2 px-1">
        <PenLine className="w-3.5 h-3.5 text-primary" />
        <p className="text-[10px] font-bold tracking-[0.15em] text-primary uppercase">Quick Rounds Note</p>
        <span className="text-[10px] text-muted-foreground">— {patient.name} · Rm {patient.room}</span>
      </div>

      {/* Row 1: Type + Priority */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <select
            value={type}
            onChange={e => setType(e.target.value)}
            className="w-full appearance-none text-xs font-medium bg-secondary border border-border rounded-lg px-3 py-2 pr-7 text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          >
            {NOTE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground pointer-events-none" />
        </div>
        <div className="flex gap-1">
          {PRIORITIES.map(p => (
            <button
              key={p.val}
              onClick={() => setPriority(p.val)}
              className={`px-2 py-1 rounded-lg text-[10px] font-bold border transition-all ${
                priority === p.val
                  ? p.color + ' border-transparent shadow-sm'
                  : 'bg-transparent text-muted-foreground border-border hover:bg-secondary'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Row 2: Clinician */}
      <div className="relative">
        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
        <select
          value={clinician.name}
          onChange={e => setClinician(CLINICIANS.find(c => c.name === e.target.value))}
          className="w-full appearance-none text-xs font-medium bg-secondary border border-border rounded-lg pl-8 pr-7 py-2 text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
        >
          {CLINICIANS.map(c => <option key={c.name} value={c.name}>{c.name} · {c.credential}</option>)}
        </select>
        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground pointer-events-none" />
      </div>

      {/* Note textarea */}
      <textarea
        value={note}
        onChange={e => setNote(e.target.value)}
        placeholder="Jot your rounds note — clinical updates, f/u tasks, coordination items, anticipated changes..."
        rows={4}
        className="w-full text-sm bg-secondary/50 border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none leading-relaxed"
      />

      {/* Tags */}
      <div className="flex items-center gap-2">
        <Tag className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
        <input
          value={tagInput}
          onChange={e => setTagInput(e.target.value)}
          placeholder="Tags: CHF, discharge, PT (comma separated)"
          className="flex-1 text-xs bg-secondary/50 border border-border rounded-lg px-3 py-1.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      {/* Submit */}
      <Button
        onClick={submit}
        disabled={!note.trim()}
        className={`w-full gap-2 text-sm font-semibold rounded-xl h-10 transition-all ${
          submitted
            ? 'bg-emerald-500 hover:bg-emerald-500 text-white'
            : 'bg-primary hover:bg-primary/90 text-primary-foreground'
        }`}
      >
        <Send className="w-4 h-4" />
        {submitted ? '✓ Note saved to Rounds Transcript' : 'Submit to Rounds Transcript'}
      </Button>

      <p className="text-[9px] text-muted-foreground text-center">
        Submitted notes are visible to all credentialed team members in the Rounds Transcript
      </p>
    </motion.div>
  );
}