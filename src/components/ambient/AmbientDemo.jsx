import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Sparkles, Tag, Copy, Check, RotateCcw, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { saveNoteToVault } from '@/pages/NotesVault';

const TRANSCRIPT_SCRIPT = [
  { t: 800, who: 'Dr.', text: 'Good morning. How have you been feeling since our last visit?' },
  { t: 1800, who: 'Pt.', text: 'Better, but I still get short of breath walking up the stairs.' },
  { t: 2600, who: 'Dr.', text: 'Any chest pain, dizziness, or swelling in your ankles?' },
  { t: 1600, who: 'Pt.', text: 'Some ankle swelling at night, no chest pain.' },
  { t: 2200, who: 'Dr.', text: 'Okay. BP is 142 over 88, heart rate 78. Lungs clear, trace pedal edema.' },
  { t: 2400, who: 'Dr.', text: 'I\'ll increase your lisinopril to 20 mg and add a low-dose diuretic.' },
];

const SOAP = {
  S: 'Pt. reports improved symptoms since last visit. Persistent dyspnea on exertion, mild bilateral ankle edema at night. Denies chest pain or dizziness.',
  O: 'BP 142/88, HR 78, RR 16, SpO2 98% RA. Lungs clear bilaterally. Trace pedal edema. No JVD.',
  A: 'Hypertension — suboptimally controlled. Mild volume overload, likely related.',
  P: 'Increase lisinopril to 20 mg PO daily. Initiate hydrochlorothiazide 12.5 mg PO daily. Low-sodium diet counseling. Follow up in 4 weeks.',
};

const CODES = [
  { code: 'I10', sys: 'ICD-10', label: 'Essential hypertension' },
  { code: 'R60.0', sys: 'ICD-10', label: 'Localized edema' },
  { code: 'R06.02', sys: 'ICD-10', label: 'Shortness of breath' },
  { code: '38341003', sys: 'SNOMED', label: 'Hypertensive disorder' },
];

export default function AmbientDemo() {
  const [recording, setRecording] = useState(false);
  const [lines, setLines] = useState([]);
  const [generating, setGenerating] = useState(false);
  const [soap, setSoap] = useState(null);
  const [copied, setCopied] = useState(false);
  const timers = useRef([]);
  const transcriptRef = useRef(null);

  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }, [lines]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const start = () => {
    reset();
    setRecording(true);
    let elapsed = 0;
    TRANSCRIPT_SCRIPT.forEach((line, i) => {
      elapsed += line.t;
      const t = setTimeout(() => {
        setLines(prev => [...prev, line]);
        if (i === TRANSCRIPT_SCRIPT.length - 1) {
          const t2 = setTimeout(() => {
            setRecording(false);
            setGenerating(true);
            const t3 = setTimeout(() => {
              setSoap(SOAP);
              setGenerating(false);
              saveNoteToVault(SOAP, CODES, 'Ambient AI Demo Session');
            }, 2200);
            timers.current.push(t3);
          }, 1200);
          timers.current.push(t2);
        }
      }, elapsed);
      timers.current.push(t);
    });
  };

  const stop = () => {
    clearTimers();
    setRecording(false);
  };

  const reset = () => {
    clearTimers();
    setRecording(false);
    setGenerating(false);
    setLines([]);
    setSoap(null);
    setCopied(false);
  };

  const copyNote = () => {
    if (!soap) return;
    const text = `SUBJECTIVE:\n${soap.S}\n\nOBJECTIVE:\n${soap.O}\n\nASSESSMENT:\n${soap.A}\n\nPLAN:\n${soap.P}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => () => clearTimers(), []);

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left — Listening panel */}
          <div className="glass rounded-3xl p-8 min-h-[560px] flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-xs font-bold tracking-[0.2em] text-primary uppercase mb-1">Ambient Listening</p>
                <h3 className="font-display font-bold text-2xl text-foreground">Live Transcription</h3>
              </div>
              {(lines.length > 0 || soap) && (
                <Button size="sm" variant="ghost" onClick={reset} className="gap-1.5 text-muted-foreground">
                  <RotateCcw className="w-3.5 h-3.5" /> Reset
                </Button>
              )}
            </div>

            {/* Mic visualizer */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                {recording && <div className="absolute inset-0 pulse-ring rounded-full bg-primary/30" />}
                {recording && <div className="absolute inset-0 pulse-ring rounded-full bg-accent/20" style={{ animationDelay: '0.7s' }} />}
                <button
                  onClick={recording ? stop : start}
                  disabled={generating}
                  className={`relative w-20 h-20 rounded-full flex items-center justify-center transition-all shadow-lg ${
                    recording
                      ? 'bg-primary text-primary-foreground glow-primary'
                      : 'bg-card border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground'
                  } disabled:opacity-50`}
                  aria-label={recording ? 'Stop recording' : 'Start recording'}
                >
                  {recording ? <MicOff className="w-7 h-7" /> : <Mic className="w-7 h-7" />}
                </button>
              </div>
            </div>

            <p className="text-center text-sm text-muted-foreground mb-4">
              {recording ? 'Listening to the encounter…' : generating ? 'Generating SOAP note…' : soap ? 'Session complete.' : 'Tap the mic to simulate a clinical encounter.'}
            </p>

            {/* Transcript */}
            <div
              ref={transcriptRef}
              className="flex-1 overflow-y-auto scrollbar-thin space-y-2 p-4 rounded-2xl bg-secondary/50 border border-border"
            >
              {lines.length === 0 && !recording && (
                <p className="text-xs text-muted-foreground text-center py-8">Transcript will appear here.</p>
              )}
              <AnimatePresence>
                {lines.map((l, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-2.5 text-sm"
                  >
                    <span className={`flex-shrink-0 text-xs font-bold mt-0.5 ${l.who === 'Dr.' ? 'text-primary' : 'text-accent-foreground'}`}>
                      {l.who}
                    </span>
                    <span className="text-foreground leading-relaxed">{l.text}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
              {recording && (
                <div className="h-1.5 rounded-full shimmer bg-secondary mt-2" />
              )}
            </div>
          </div>

          {/* Right — SOAP output */}
          <div className="glass rounded-3xl p-8 min-h-[560px] flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-xs font-bold tracking-[0.2em] text-primary uppercase mb-1 flex items-center gap-2">
                  <Sparkles className="w-3 h-3" /> AI-Generated
                </p>
                <h3 className="font-display font-bold text-2xl text-foreground">SOAP Note Draft</h3>
              </div>
              {soap && (
                <Button size="sm" onClick={copyNote} className="bg-primary hover:bg-primary/90 text-primary-foreground gap-1.5">
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied' : 'Copy'}
                </Button>
              )}
            </div>

            {!soap && !generating && (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center max-w-xs">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-accent/10 flex items-center justify-center">
                    <Sparkles className="w-7 h-7 text-accent-foreground opacity-60" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Your SOAP note will be drafted here once the encounter is complete.
                  </p>
                </div>
              </div>
            )}

            {generating && (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="relative w-16 h-16 mx-auto mb-4">
                    <div className="absolute inset-0 rounded-full border-4 border-primary/20" />
                    <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" />
                  </div>
                  <p className="text-sm font-medium text-foreground">Analyzing encounter…</p>
                  <p className="text-xs text-muted-foreground mt-1">Drafting SOAP · tagging codes</p>
                </div>
              </div>
            )}

            {soap && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex-1 space-y-3 overflow-y-auto scrollbar-thin"
              >
                {Object.entries(soap).map(([key, val]) => (
                  <div key={key} className="p-3 rounded-xl bg-secondary/50 border border-border">
                    <p className="text-[10px] font-bold tracking-[0.15em] text-primary uppercase mb-1">
                      {key === 'S' ? 'Subjective' : key === 'O' ? 'Objective' : key === 'A' ? 'Assessment' : 'Plan'}
                    </p>
                    <p className="text-sm text-foreground leading-relaxed">{val}</p>
                  </div>
                ))}

                <div className="pt-2">
                  <p className="text-[10px] font-bold tracking-[0.15em] text-primary uppercase mb-2 flex items-center gap-1.5">
                    <Tag className="w-3 h-3" /> Auto-tagged codes
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {CODES.map(c => (
                      <span key={c.code} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent/20 text-xs font-medium text-foreground">
                        <span className="font-mono font-bold text-accent-foreground">{c.code}</span>
                        <span className="text-muted-foreground text-[10px]">{c.sys}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}