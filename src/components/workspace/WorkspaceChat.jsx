import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Paperclip, Mic, Tag, Sparkles, Lock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const AI_REPLIES = [
  pt => `SOAP draft ready for ${pt.name} — Assessment: ${pt.dx}. ICD-10 auto-tagged. Review in AI Scribe panel?`,
  pt => `Reminder: ${pt.name} has active allergy on file. Please verify medication orders.`,
  pt => `Vital trend alert for ${pt.name}: SpO₂ ${pt.spo2}% — consider reassessment.`,
  pt => `Evidence suggestion: MCG Guideline 42.3 matches current plan for ${pt.name}.`,
];

let aiIdx = 0;

export default function WorkspaceChat({ patient, seedMessages }) {
  const [messages, setMessages] = useState(seedMessages);
  const [draft, setDraft] = useState('');
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    const tags = Array.from(text.matchAll(/#\w+/g)).map(m => m[0]);
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg = { id: Date.now(), author: 'You', initials: 'YO', color: 'from-slate-600 to-slate-500', text, tags, time: now };
    setMessages(prev => [...prev, userMsg]);
    setDraft('');

    // AI auto-reply after short delay
    setTimeout(() => {
      const reply = AI_REPLIES[aiIdx % AI_REPLIES.length](patient);
      aiIdx++;
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        author: 'Ambient AI',
        initials: 'AI',
        color: 'from-primary to-accent',
        text: reply,
        tags: ['#AI'],
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isAI: true,
      }]);
    }, 1200);
  };

  return (
    <div className="flex flex-col h-full">
      <div ref={scrollRef} className="flex-1 overflow-y-auto scrollbar-thin p-4 space-y-3">
        <AnimatePresence initial={false}>
          {messages.map(m => (
            <motion.div key={m.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex gap-2.5">
              <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${m.color} flex-shrink-0 flex items-center justify-center text-white font-bold text-[10px]`}>
                {m.initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-1.5 mb-0.5">
                  <p className={`text-xs font-semibold ${m.isAI ? 'text-accent-foreground' : 'text-foreground'} flex items-center gap-1`}>
                    {m.isAI && <Sparkles className="w-3 h-3" />} {m.author}
                  </p>
                  <p className="text-[9px] text-muted-foreground font-mono">{m.time}</p>
                </div>
                <div className={`inline-block max-w-full p-2.5 rounded-xl rounded-tl-sm text-xs ${
                  m.isAI ? 'bg-accent/15 border border-accent/30' : 'bg-secondary/70 border border-border/50'
                }`}>
                  <p className="text-foreground leading-relaxed break-words">{m.text}</p>
                  {m.attachment && (
                    <p className="mt-1 text-[10px] font-mono text-primary flex items-center gap-1">
                      <Paperclip className="w-3 h-3" /> {m.attachment}
                    </p>
                  )}
                  {m.tags?.length > 0 && (
                    <div className="mt-1 flex flex-wrap gap-1">
                      {m.tags.map(t => <span key={t} className="text-[9px] font-semibold text-primary">{t}</span>)}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="px-4 py-3 border-t border-border/60 bg-background/50">
        <div className="flex items-center gap-1.5">
          <button className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground"><Paperclip className="w-3.5 h-3.5" /></button>
          <button className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground"><Mic className="w-3.5 h-3.5" /></button>
          <button className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground"><Tag className="w-3.5 h-3.5" /></button>
          <Input
            value={draft}
            onChange={e => setDraft(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && send()}
            placeholder="Note, #tag, or @mention…"
            className="flex-1 h-8 text-xs bg-secondary/60 border-border rounded-full px-3"
          />
          <Button onClick={send} className="h-8 w-8 p-0 rounded-full bg-primary text-primary-foreground flex-shrink-0">
            <Send className="w-3.5 h-3.5" />
          </Button>
        </div>
        <p className="text-[9px] text-muted-foreground mt-1.5 text-center flex items-center justify-center gap-1">
          <Lock className="w-2.5 h-2.5" /> E2E encrypted · HIPAA audit logged
        </p>
      </div>
    </div>
  );
}