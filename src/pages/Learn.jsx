import React, { useState } from 'react';
import PageHeader from '@/components/common/PageHeader';
import { ChevronRight, ChevronLeft, CheckCircle2, Circle, BookOpen, Lightbulb, HelpCircle, Lock, Share2, Mic, Shield, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

const MODULES = [
  {
    id: 1,
    icon: BookOpen,
    title: 'Welcome to DocCollab',
    eyebrow: 'Module 1 · Orientation',
    content: `DocCollab is a HIPAA-focused collaboration platform built for clinical teams. This training will walk you through the core features so you can hit the ground running.

In this demo, all data is simulated. No real patient information is used. Your interactions — messages, SOAP notes, quiz answers — are for learning purposes only.`,
    hint: '💡 Tip: Every section in this training mirrors a real workflow you\'ll use during rounds or remote care.',
    quiz: {
      q: 'What is DocCollab primarily designed for?',
      options: ['Social media for doctors', 'HIPAA-focused clinical collaboration', 'Electronic billing only', 'Personal scheduling'],
      answer: 1,
      explanation: 'Correct! DocCollab is purpose-built for secure, HIPAA-focused clinical collaboration — messaging, notes, sessions, and ambient AI all in one place.',
    },
  },
  {
    id: 2,
    icon: Lock,
    title: 'Security & Encryption',
    eyebrow: 'Module 2 · HIPAA Foundations',
    content: `Every message, note, and session in DocCollab is protected by AES-256 encryption at rest and TLS 1.3 in transit. Session keys are derived per-session so no two sessions share the same key.

The Compliance page shows your immutable audit log — every action is recorded with a timestamp, user ID, and action type. This is your BAA-grade paper trail.`,
    hint: '💡 Tip: Navigate to the Security page from the top menu to see the live audit log demo.',
    quiz: {
      q: 'Which encryption standard does DocCollab use for data at rest?',
      options: ['MD5', 'SHA-1', 'AES-256', 'Base64'],
      answer: 2,
      explanation: 'AES-256 is the gold standard for data at rest encryption used in HIPAA-compliant healthcare systems.',
    },
  },
  {
    id: 3,
    icon: Share2,
    title: 'Starting a Session',
    eyebrow: 'Module 3 · Live Sessions',
    content: `Sessions are time-bound collaboration rooms. To start one:
1. Click "Live Session" in the navbar
2. You'll enter the rounds room with simulated participants
3. Type a message in the composer and press Enter or the Send button
4. Use #hashtags to tag clinical concepts (e.g. #CHF, #vitals)
5. The AI participant will respond with coded suggestions

Sessions auto-log all activity. When you close a session, the audit trail is sealed.`,
    hint: '💡 Tip: Try sending a message with a #tag like "#bp130" to see how tagging works.',
    quiz: {
      q: 'What happens to session activity when a session ends?',
      options: ['It is deleted for privacy', 'It is emailed to participants', 'The audit trail is sealed and retained', 'Nothing — sessions are not logged'],
      answer: 2,
      explanation: 'All session activity is immutably logged. The audit trail is sealed when a session ends — critical for HIPAA compliance.',
    },
  },
  {
    id: 4,
    icon: Mic,
    title: 'Ambient AI & SOAP Notes',
    eyebrow: 'Module 4 · AI Features',
    content: `The Ambient AI Scribe listens to a clinical encounter and generates a SOAP note draft automatically. Here's how to use it:

1. Go to the Ambient AI page
2. Click the microphone button to start the simulated encounter
3. Watch the transcript fill in real time
4. After the encounter, the AI generates a full SOAP note with ICD-10 codes
5. Review, edit, and copy the note to your EHR

In the Notes Vault, every completed SOAP session is saved with a timestamp so you can review your practice sessions.`,
    hint: '💡 Tip: After completing the Ambient AI demo, check the Notes Vault page to see your saved session.',
    quiz: {
      q: 'What does the "S" in SOAP stand for?',
      options: ['System', 'Subjective', 'Summary', 'Structured'],
      answer: 1,
      explanation: 'SOAP = Subjective, Objective, Assessment, Plan. The Subjective section captures what the patient reports in their own words.',
    },
  },
  {
    id: 5,
    icon: Shield,
    title: 'Evidence-Based Tools',
    eyebrow: 'Module 5 · Clinical Decision Support',
    content: `DocCollab integrates with leading clinical decision support tools. In standalone demo mode, these appear as portal buttons — in a live enterprise deployment, they link securely via OAuth to your organization's licensed portals.

The Evidence Tools page includes:
• InterQual — Level of care criteria
• MCG (Milliman Care Guidelines) — Evidence-based care planning
• CMS Coverage — Medicare/Medicaid LCD/NCD lookup

Each button in the demo opens an information panel explaining what the tool does and how the integration will work in production.`,
    hint: '💡 Tip: Visit the Evidence Tools page and click each portal button to learn what it does.',
    quiz: {
      q: 'In standalone demo mode, what do the InterQual/MCG portal buttons do?',
      options: ['Connect live to InterQual servers', 'Open a simulated EHR', 'Show an info panel describing the future integration', 'Generate a SOAP note'],
      answer: 2,
      explanation: 'In demo mode, portal buttons open descriptive info panels. In production, they will link to your organization\'s licensed portals via secure OAuth.',
    },
  },
];

function QuizBlock({ quiz }) {
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="mt-6 p-5 rounded-2xl bg-primary/5 border border-primary/20">
      <p className="text-xs font-bold tracking-[0.15em] text-primary uppercase mb-3 flex items-center gap-1.5">
        <HelpCircle className="w-3.5 h-3.5" /> Knowledge Check
      </p>
      <p className="text-sm font-semibold text-foreground mb-3">{quiz.q}</p>
      <div className="space-y-2">
        {quiz.options.map((opt, i) => {
          let cls = 'border-border bg-card text-foreground';
          if (revealed) {
            if (i === quiz.answer) cls = 'border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400';
            else if (i === selected && i !== quiz.answer) cls = 'border-destructive bg-destructive/10 text-destructive';
          } else if (i === selected) {
            cls = 'border-primary bg-primary/10 text-primary';
          }
          return (
            <button
              key={i}
              disabled={revealed}
              onClick={() => setSelected(i)}
              className={`w-full text-left px-4 py-2.5 rounded-xl border text-sm transition-colors ${cls}`}
            >
              {opt}
            </button>
          );
        })}
      </div>
      {!revealed && selected !== null && (
        <Button size="sm" className="mt-3 bg-primary text-primary-foreground" onClick={() => setRevealed(true)}>
          Submit Answer
        </Button>
      )}
      {revealed && (
        <motion.p initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="mt-3 text-xs text-muted-foreground leading-relaxed bg-secondary/60 rounded-xl p-3">
          {quiz.explanation}
        </motion.p>
      )}
    </div>
  );
}

export default function Learn() {
  const [step, setStep] = useState(0);
  const [completed, setCompleted] = useState([]);
  const mod = MODULES[step];
  const Icon = mod.icon;

  const markComplete = () => {
    if (!completed.includes(mod.id)) setCompleted(prev => [...prev, mod.id]);
    if (step < MODULES.length - 1) setStep(step + 1);
  };

  return (
    <div>
      <PageHeader
        eyebrow="LMS Training"
        title="Learn DocCollab,"
        accent="step by step."
        description="An interactive training module for clinicians. Each section explains a feature, offers hints, and ends with a quick knowledge check."
      />

      <section className="py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[240px_1fr] gap-8">
            {/* Sidebar nav */}
            <aside>
              <p className="text-xs font-bold tracking-[0.15em] text-muted-foreground uppercase mb-4">Modules</p>
              <div className="space-y-1">
                {MODULES.map((m, i) => {
                  const MI = m.icon;
                  const done = completed.includes(m.id);
                  const active = i === step;
                  return (
                    <button
                      key={m.id}
                      onClick={() => setStep(i)}
                      className={`w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                        active ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                      }`}
                    >
                      <MI className="w-4 h-4 flex-shrink-0" />
                      <span className="flex-1 truncate">{m.title}</span>
                      {done ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      ) : (
                        <Circle className="w-4 h-4 text-border flex-shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 p-4 rounded-2xl bg-secondary/60 border border-border">
                <p className="text-xs text-muted-foreground mb-1">Progress</p>
                <div className="w-full h-2 rounded-full bg-border overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary transition-all duration-500"
                    style={{ width: `${(completed.length / MODULES.length) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-foreground mt-1 font-medium">{completed.length} / {MODULES.length} complete</p>
              </div>
            </aside>

            {/* Main content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="glass rounded-3xl p-8"
              >
                <p className="text-xs font-bold tracking-[0.2em] text-primary uppercase mb-2">{mod.eyebrow}</p>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="font-display font-bold text-2xl text-foreground">{mod.title}</h2>
                </div>

                <div className="prose prose-sm max-w-none text-foreground leading-relaxed whitespace-pre-line text-sm">
                  {mod.content}
                </div>

                {/* Hint box */}
                <div className="mt-5 p-4 rounded-xl bg-accent/10 border border-accent/30 flex gap-3">
                  <Lightbulb className="w-4 h-4 text-accent-foreground flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-foreground">{mod.hint}</p>
                </div>

                {/* Quiz */}
                <QuizBlock key={step} quiz={mod.quiz} />

                {/* Navigation */}
                <div className="mt-8 flex items-center justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setStep(s => Math.max(0, s - 1))}
                    disabled={step === 0}
                    className="gap-2"
                  >
                    <ChevronLeft className="w-4 h-4" /> Previous
                  </Button>
                  <Button
                    onClick={markComplete}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
                  >
                    {step === MODULES.length - 1 ? 'Finish Training' : 'Mark Complete & Next'}
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>

                {step === MODULES.length - 1 && completed.length === MODULES.length && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center"
                  >
                    <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                      🎉 Training complete! You're ready to explore DocCollab.
                    </p>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
}