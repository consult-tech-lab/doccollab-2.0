import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Lock, Users, Tag, Paperclip, Mic, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const PARTICIPANTS = [
  { initials: 'KM', name: 'Dr. K. Mensah', role: 'Attending', color: 'from-primary to-primary/60', online: true },
  { initials: 'LS', name: 'Dr. L. Shah', role: 'Resident', color: 'from-emerald-500 to-emerald-400', online: true },
  { initials: 'RN', name: 'R. Navarro', role: 'RN', color: 'from-accent to-accent/70', online: true },
  { initials: 'JP', name: 'J. Park', role: 'Pharm.D', color: 'from-purple-500 to-purple-400', online: false },
];

const SEED_MESSAGES = [
  { id: 1, author: 'Dr. K. Mensah', initials: 'KM', color: 'from-primary to-primary/60', text: 'Rounds start — Pt. in 4B, 62M with CHF exacerbation.', tags: [], time: '08:02' },
  { id: 2, author: 'Dr. L. Shah', initials: 'LS', color: 'from-emerald-500 to-emerald-400', text: 'Overnight diuresed 1.2L. Weight down 1.8 kg. Still orthopneic.', tags: ['#CHF'], time: '08:03' },
  { id: 3, author: 'R. Navarro', initials: 'RN', color: 'from-accent to-accent/70', text: 'Vitals from Apple Watch synced · HR 84 · SpO2 94%.', tags: ['#vitals'], time: '08:04', attachment: 'vitals.fhir' },
  { id: 4, author: 'Ambient AI', initials: 'AI', color: 'from-primary to-accent', text: 'Draft plan ready · suggested codes: I50.23, J96.01. Review?', tags: ['#AI', '#SOAP'], time: '08:05', isAI: true },
];

export default function SessionRoom() {
  const [messages, setMessages] = useState(SEED_MESSAGES);
  const [draft, setDraft] = useState('');
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    const tags = Array.from(text.matchAll(/#\w+/g)).map(m => m[0]);
    setMessages(prev => [...prev, {
      id: Date.now(),
      author: 'You',
      initials: 'YO',
      color: 'from-slate-600 to-slate-500',
      text,
      tags,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }]);
    setDraft('');
  };

  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_300px] gap-6">
          {/* Session panel */}
          <div className="glass rounded-3xl flex flex-col h-[640px] overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 border-b border-border/60 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <div className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-60" />
                </div>
                <div>
                  <p className="font-display font-bold text-foreground">Morning Rounds · Unit 4B</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <Lock className="w-3 h-3" /> End-to-end encrypted · 4 participants
                  </p>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                <Activity className="w-3 h-3" /> Audit logging
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto scrollbar-thin p-6 space-y-4">
              <AnimatePresence initial={false}>
                {messages.map(m => (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-3"
                  >
                    <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${m.color} flex-shrink-0 flex items-center justify-center text-white font-bold text-xs shadow-sm`}>
                      {m.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2 mb-1">
                        <p className={`text-sm font-semibold ${m.isAI ? 'text-accent-foreground' : 'text-foreground'}`}>
                          {m.author}
                        </p>
                        <p className="text-[10px] text-muted-foreground font-mono">{m.time}</p>
                      </div>
                      <div className={`inline-block max-w-full p-3 rounded-2xl rounded-tl-sm ${
                        m.isAI
                          ? 'bg-accent/15 border border-accent/30'
                          : 'bg-secondary/70 border border-border/50'
                      }`}>
                        <p className="text-sm text-foreground leading-relaxed break-words">{m.text}</p>
                        {m.attachment && (
                          <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-background/60 text-xs font-mono text-primary">
                            <Paperclip className="w-3 h-3" /> {m.attachment}
                          </div>
                        )}
                        {m.tags?.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-1">
                            {m.tags.map(t => (
                              <span key={t} className="text-[10px] font-semibold text-primary">
                                {t}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Composer */}
            <div className="px-6 py-4 border-t border-border/60 bg-background/50">
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-xl hover:bg-secondary text-muted-foreground" aria-label="Attach">
                  <Paperclip className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-xl hover:bg-secondary text-muted-foreground" aria-label="Dictate">
                  <Mic className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-xl hover:bg-secondary text-muted-foreground" aria-label="Tag">
                  <Tag className="w-4 h-4" />
                </button>
                <Input
                  value={draft}
                  onChange={e => setDraft(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && send()}
                  placeholder="Share a note · use #tags or @mention"
                  className="flex-1 bg-secondary/60 border-border rounded-full h-10 px-4"
                />
                <Button onClick={send} className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full h-10 w-10 p-0 flex-shrink-0">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-[10px] text-muted-foreground mt-2 text-center">
                Messages are E2E encrypted · logged for HIPAA audit
              </p>
            </div>
          </div>

          {/* Participants sidebar */}
          <aside className="space-y-4">
            <div className="glass rounded-2xl p-5">
              <p className="text-xs font-bold tracking-[0.15em] text-primary uppercase mb-4 flex items-center gap-1.5">
                <Users className="w-3 h-3" /> Participants
              </p>
              <div className="space-y-3">
                {PARTICIPANTS.map(p => (
                  <div key={p.initials} className="flex items-center gap-3">
                    <div className="relative">
                      <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${p.color} flex items-center justify-center text-white font-bold text-xs`}>
                        {p.initials}
                      </div>
                      <span className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-card ${p.online ? 'bg-emerald-500' : 'bg-muted-foreground/50'}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{p.name}</p>
                      <p className="text-[11px] text-muted-foreground">{p.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass rounded-2xl p-5">
              <p className="text-xs font-bold tracking-[0.15em] text-primary uppercase mb-3">Session Info</p>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between"><span className="text-muted-foreground">Session ID</span><span className="font-mono text-foreground">rd-4b-0420</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Started</span><span className="text-foreground">08:00 AM</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Encryption</span><span className="text-emerald-500 font-semibold">AES-256</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Mode</span><span className="text-foreground">FHIR-linked</span></div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}