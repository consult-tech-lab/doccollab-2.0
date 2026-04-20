import React, { useState } from 'react';
import { Sparkles, ClipboardList, ExternalLink, FileSearch, Landmark, Bell, Video, Phone, X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ACTIONS = [
  { id: 'ai', icon: Sparkles, label: 'AI Scribe', color: 'bg-accent/20 text-accent-foreground hover:bg-accent/40', desc: 'Launch ambient AI to transcribe this encounter and draft a SOAP note.' },
  { id: 'interqual', icon: ClipboardList, label: 'InterQual', color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20', desc: 'Open InterQual level-of-care criteria for this patient\'s diagnosis. (Demo: secure OAuth handoff in production)' },
  { id: 'mcg', icon: FileSearch, label: 'MCG', color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20', desc: 'Open Milliman Care Guidelines for evidence-based care planning. (Demo: secure link in production)' },
  { id: 'cms', icon: Landmark, label: 'CMS Coverage', color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20', desc: 'Look up Medicare/Medicaid LCD/NCD coverage determinations. (Demo: links to CMS.gov in production)' },
  { id: 'alert', icon: Bell, label: 'Send Alert', color: 'bg-red-500/10 text-red-500 hover:bg-red-500/20', desc: 'Broadcast an urgent alert to all session participants for this patient.' },
  { id: 'video', icon: Video, label: 'Video Consult', color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 hover:bg-purple-500/20', desc: 'Start an encrypted video consult with a specialist. (Coming soon — HIPAA-compliant video)' },
];

export default function QuickActions({ patient, onLaunchAI, onAlert }) {
  const [tooltip, setTooltip] = useState(null);
  const [fired, setFired] = useState({});

  const handleClick = (action) => {
    if (action.id === 'ai') { onLaunchAI(); return; }
    if (action.id === 'alert') { onAlert(patient); return; }
    if (action.id === 'cms') { window.open('https://www.cms.gov/medicare-coverage-database/', '_blank'); return; }
    setFired(prev => ({ ...prev, [action.id]: true }));
    setTimeout(() => setFired(prev => ({ ...prev, [action.id]: false })), 1800);
  };

  return (
    <div>
      <p className="text-[10px] font-bold tracking-[0.15em] text-muted-foreground uppercase mb-2">Quick Actions</p>
      <div className="grid grid-cols-3 gap-2">
        {ACTIONS.map(a => {
          const AI = a.icon;
          const done = fired[a.id];
          return (
            <div key={a.id} className="relative">
              <button
                onClick={() => handleClick(a)}
                onMouseEnter={() => setTooltip(a.id)}
                onMouseLeave={() => setTooltip(null)}
                className={`w-full flex flex-col items-center gap-1.5 p-2.5 rounded-xl text-xs font-semibold transition-all ${a.color}`}
              >
                {done ? <Check className="w-4 h-4" /> : <AI className="w-4 h-4" />}
                <span className="text-[10px] leading-tight text-center">{a.label}</span>
              </button>
              <AnimatePresence>
                {tooltip === a.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 z-50 w-48 p-2.5 rounded-xl bg-popover border border-border shadow-lg text-[11px] text-foreground leading-relaxed"
                  >
                    {a.desc}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}