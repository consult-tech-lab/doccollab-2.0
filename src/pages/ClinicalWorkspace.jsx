import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Users, Clock, Lock, Shield, Menu, X, ChevronRight, Bell } from 'lucide-react';
import PatientList, { PATIENTS } from '@/components/workspace/PatientList';
import PatientChart from '@/components/workspace/PatientChart';
import WorkspaceChat from '@/components/workspace/WorkspaceChat';
import QuickActions from '@/components/workspace/QuickActions';
import AmbientScribePanel from '@/components/workspace/AmbientScribePanel';
import AlertBanner from '@/components/workspace/AlertBanner';
import Logo from '@/components/brand/Logo';

const SEED_MESSAGES = [
  { id: 1, author: 'Dr. K. Mensah', initials: 'KM', color: 'from-primary to-primary/60', text: 'Rounds start — Pt. in 4B, 62M with CHF exacerbation.', tags: [], time: '08:02' },
  { id: 2, author: 'Dr. L. Shah', initials: 'LS', color: 'from-emerald-500 to-emerald-400', text: 'Overnight diuresed 1.2L. Weight down 1.8 kg. Still orthopneic.', tags: ['#CHF'], time: '08:03' },
  { id: 3, author: 'R. Navarro', initials: 'RN', color: 'from-amber-500 to-amber-400', text: 'Vitals from Apple Watch synced · HR 84 · SpO₂ 94%.', tags: ['#vitals'], time: '08:04', attachment: 'vitals.fhir' },
  { id: 4, author: 'Ambient AI', initials: 'AI', color: 'from-primary to-accent', text: 'Draft plan ready · suggested codes: I50.23, J96.01. Review?', tags: ['#AI', '#SOAP'], time: '08:05', isAI: true },
];

export default function ClinicalWorkspace() {
  const [selectedPatient, setSelectedPatient] = useState(PATIENTS[0]);
  const [showScribe, setShowScribe] = useState(false);
  const [alert, setAlert] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleAlert = (pt) => {
    setAlert(`All care team members alerted for ${pt.name} — Room ${pt.room}`);
  };

  const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      <AlertBanner alert={alert} onDismiss={() => setAlert(null)} />

      {/* Top bar */}
      <header className="flex-shrink-0 h-14 border-b border-border/60 bg-background/90 backdrop-blur-xl flex items-center px-4 gap-3 z-30">
        <Logo size={28} />
        <div className="hidden sm:flex items-center gap-2 ml-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-semibold text-foreground">Morning Rounds · Unit 4B</span>
          <span className="text-xs text-muted-foreground font-mono">rd-4b-0420</span>
        </div>
        <div className="flex-1" />
        <div className="flex items-center gap-2 text-[10px]">
          <span className="hidden md:flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold">
            <Lock className="w-3 h-3" /> Encrypted
          </span>
          <span className="hidden md:flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 text-primary font-semibold">
            <Activity className="w-3 h-3" /> Audit Active
          </span>
          <span className="px-2 py-1 rounded-full bg-secondary border border-border text-muted-foreground font-mono">{now}</span>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 rounded-lg hover:bg-secondary text-muted-foreground">
            {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Main layout */}
      <div className="flex-1 overflow-hidden flex">

        {/* LEFT: Patient list */}
        <aside className={`
          flex-shrink-0 w-64 border-r border-border/60 bg-background flex flex-col overflow-hidden
          lg:relative lg:translate-x-0 lg:flex
          ${sidebarOpen ? 'absolute inset-y-0 left-0 z-20 shadow-2xl' : 'hidden lg:flex'}
        `} style={{ top: '3.5rem' }}>
          <div className="px-4 pt-4 pb-2 flex-shrink-0">
            <p className="text-[10px] font-bold tracking-[0.2em] text-muted-foreground uppercase flex items-center gap-1.5">
              <Users className="w-3 h-3" /> My Patients ({PATIENTS.length})
            </p>
          </div>
          <div className="flex-1 overflow-y-auto scrollbar-thin px-3 pb-4">
            <PatientList
              selectedId={selectedPatient?.id}
              onSelect={pt => { setSelectedPatient(pt); setShowScribe(false); setSidebarOpen(false); }}
            />
          </div>
          <div className="px-4 py-3 border-t border-border/60 text-[10px] text-muted-foreground flex items-center gap-1.5">
            <Shield className="w-3 h-3 text-primary" /> HIPAA audit logging active
          </div>
        </aside>

        {/* CENTER: Chart + Quick Actions */}
        <main className="flex-1 flex flex-col overflow-hidden min-w-0">
          {/* Chart area */}
          <div className="flex-1 overflow-hidden relative">
            {selectedPatient ? (
              <>
                <div className="h-full overflow-hidden">
                  <PatientChart patient={selectedPatient} />
                </div>
                <AnimatePresence>
                  {showScribe && (
                    <AmbientScribePanel
                      patient={selectedPatient}
                      onClose={() => setShowScribe(false)}
                    />
                  )}
                </AnimatePresence>
              </>
            ) : (
              <div className="h-full flex items-center justify-center">
                <p className="text-muted-foreground text-sm">Select a patient</p>
              </div>
            )}
          </div>

          {/* Quick actions bar */}
          {selectedPatient && (
            <div className="flex-shrink-0 border-t border-border/60 bg-background/80 px-4 py-3">
              <QuickActions
                patient={selectedPatient}
                onLaunchAI={() => setShowScribe(true)}
                onAlert={handleAlert}
              />
            </div>
          )}
        </main>

        {/* RIGHT: Session chat */}
        <aside className="hidden xl:flex flex-col flex-shrink-0 w-72 border-l border-border/60 bg-background overflow-hidden">
          <div className="px-4 py-3 border-b border-border/60 flex-shrink-0">
            <p className="text-[10px] font-bold tracking-[0.15em] text-primary uppercase flex items-center gap-1.5">
              <Activity className="w-3 h-3" /> Team Session
            </p>
            <div className="flex items-center gap-2 mt-1">
              {['KM', 'LS', 'RN'].map((i, idx) => (
                <div key={i} className="relative">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-[9px] font-bold
                    ${idx === 0 ? 'bg-primary' : idx === 1 ? 'bg-emerald-500' : 'bg-amber-500'}`}>{i}</div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 border border-background" />
                </div>
              ))}
              <span className="text-[10px] text-muted-foreground ml-1">3 online</span>
            </div>
          </div>
          <div className="flex-1 overflow-hidden">
            <WorkspaceChat patient={selectedPatient} seedMessages={SEED_MESSAGES} />
          </div>
        </aside>
      </div>
    </div>
  );
}