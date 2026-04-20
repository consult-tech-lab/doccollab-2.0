import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Sparkles, X, Tag, Copy, Check, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { saveNoteToVault } from '@/pages/NotesVault';

const TRANSCRIPT = [
  { t: 700, who: 'Dr.', text: 'How have you been feeling since we last spoke?' },
  { t: 1600, who: 'Pt.', text: 'Better but still short of breath going up stairs.' },
  { t: 2000, who: 'Dr.', text: 'Any chest pain, ankle swelling?' },
  { t: 1400, who: 'Pt.', text: 'Some swelling at night, no chest pain.' },
  { t: 2000, who: 'Dr.', text: 'BP 142/88. Trace edema. Lungs clear. Plan to increase lisinopril.' },
];

const SOAP = {
  S: 'Improved since last visit. Persistent dyspnea on exertion, bilateral ankle edema at night. Denies chest pain.',
  O: 'BP 142/88, HR 84, SpO₂ 94%. Lungs clear. Trace pedal edema.',
  A: 'Hypertension — suboptimally controlled. Mild volume overload.',
  P: 'Increase lisinopril to 20 mg daily. Add HCTZ 12.5 mg. Low-Na diet. F/U 4 weeks.',
};

const CODES = [
  { code: 'I10', sys: 'ICD-10' }, { code: 'R60.0', sys: 'ICD-10' }, { code: 'R06.02', sys: 'ICD-10' },
];

export default function AmbientScribePanel({ patient, onClose }) {
  const [recording, setRecording] = useState(false);
  const [lines, setLines] = useState([]);
  const [generating, setGenerating] = useState(false);
  const [soap, setSoap] = useState(null);
  const [copied, setCopied] = useState(false);
  const timers = useRef([]);
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) ref.current.scrollTop = ref.current.scrollHeight;
  }, [lines]);

  const clearTimers = () => { timers.current.forEach(clearTimeout); timers.current = []; };

  const start = () => {
    reset();
    setRecording(true);
    let elapsed = 0;
    TRANSCRIPT.forEach((line, i) => {
      elapsed += line.t;
      const t = setTimeout(() => {
        setLines(prev => [...prev, line]);
        if (i === TRANSCRIPT.length - 1) {
          const t2 = setTimeout(() => {
            setRecording(false); setGenerating(true);
            const t3 = setTimeout(() => {
              setSoap(SOAP); setGenerating(false);
              saveNoteToVault(SOAP, CODES, `Workspace Scribe — ${patient?.name || 'Patient'}`);
            }, 1800);
            timers.current.push(t3);
          }, 800);
          timers.current.push(t2);
        }
      }, elapsed);
      timers.current.push(t);
    });
  };

  const reset = () => { clearTimers(); setRecording(false); setGenerating(false); setLines([]); setSoap(null); setCopied(false); };

  const copy = () => {
    if (!soap) return;
    navigator.clipboard.writeText(`S: ${soap.S}\nO: ${soap.O}\nA: ${soap.A}\nP: ${soap.P}`);
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => () => clearTimers(), []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      className="absolute inset-0 z-40 bg-background/95 backdrop-blur-sm rounded-2xl flex flex-col overflow-hidden"
    >
      <div className="px-5 py-4 border-b border-border/60 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-accent-foreground" />
          <p className="font-display font-bold text-foreground text-sm">Ambient AI Scribe</p>
          {patient && <span className="text-xs text-muted-foreground">— {patient.name}</span>}
        </div>
        <div className="flex items-center gap-2">
          {(lines.length > 0 || soap) && (
            <Button size="sm" variant="ghost" onClick={reset} className="h-7 text-xs gap-1 text-muted-foreground">
              <RotateCcw className="w-3 h-3" /> Reset
            </Button>
          )}
          {soap && (
            <Button size="sm" onClick={copy} className="h-7 text-xs gap-1 bg-primary text-primary-foreground">
              {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              {copied ? 'Copied' : 'Copy Note'}
            </Button>
          )}
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden grid grid-rows-[1fr_1fr]">
        {/* Transcript */}
        <div className="border-b border-border/60 flex flex-col overflow-hidden p-4">
          <p className="text-[10px] font-bold tracking-[0.15em] text-primary uppercase mb-2">Live Transcript</p>
          <div className="flex justify-center mb-3">
            <div className="relative">
              {recording && <div className="absolute inset-0 rounded-full bg-primary/30 pulse-ring" />}
              <button
                onClick={recording ? () => { clearTimers(); setRecording(false); } : start}
                disabled={generating}
                className={`relative w-14 h-14 rounded-full flex items-center justify-center transition-all shadow-md ${
                  recording ? 'bg-primary text-primary-foreground glow-primary' : 'bg-card border-2 border-primary text-primary hover:bg-primary/10'
                } disabled:opacity-40`}
              >
                {recording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>
            </div>
          </div>
          <div ref={ref} className="flex-1 overflow-y-auto scrollbar-thin space-y-1.5 rounded-xl bg-secondary/40 p-3">
            {lines.length === 0 && <p className="text-[11px] text-muted-foreground text-center py-4">Tap mic to begin</p>}
            <AnimatePresence>
              {lines.map((l, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="flex gap-2 text-xs">
                  <span className={`font-bold flex-shrink-0 ${l.who === 'Dr.' ? 'text-primary' : 'text-muted-foreground'}`}>{l.who}</span>
                  <span className="text-foreground">{l.text}</span>
                </motion.div>
              ))}
            </AnimatePresence>
            {recording && <div className="h-1 rounded shimmer bg-secondary mt-1" />}
          </div>
        </div>

        {/* SOAP output */}
        <div className="flex flex-col overflow-hidden p-4">
          <p className="text-[10px] font-bold tracking-[0.15em] text-primary uppercase mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3 h-3" /> SOAP Draft
          </p>
          {!soap && !generating && (
            <p className="text-[11px] text-muted-foreground text-center py-6">SOAP note will appear after encounter.</p>
          )}
          {generating && (
            <div className="flex items-center justify-center py-6 gap-2">
              <div className="w-5 h-5 rounded-full border-2 border-primary border-t-transparent animate-spin" />
              <p className="text-xs text-muted-foreground">Generating…</p>
            </div>
          )}
          {soap && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 overflow-y-auto scrollbar-thin space-y-2">
              {Object.entries(soap).map(([k, v]) => (
                <div key={k} className="p-2.5 rounded-xl bg-secondary/50 border border-border">
                  <p className="text-[9px] font-bold tracking-wider text-primary uppercase mb-0.5">
                    {k === 'S' ? 'Subjective' : k === 'O' ? 'Objective' : k === 'A' ? 'Assessment' : 'Plan'}
                  </p>
                  <p className="text-xs text-foreground leading-relaxed">{v}</p>
                </div>
              ))}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {CODES.map(c => (
                  <span key={c.code} className="text-[10px] px-2 py-0.5 rounded-full bg-accent/20 font-mono font-bold text-accent-foreground">{c.code}</span>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}