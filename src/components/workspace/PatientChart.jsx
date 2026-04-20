import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Pill, FileText, AlertTriangle, ClipboardList, Heart, Wind, Thermometer, Droplets, PenLine } from 'lucide-react';
import RoundsNotepad from '@/components/workspace/RoundsNotepad';

const CHART_DATA = {
  'pt-001': {
    allergies: ['Penicillin — Anaphylaxis', 'Sulfa — Rash'],
    vitals: { bp: '142/88', hr: 84, rr: 18, temp: '98.6°F', spo2: '94%', weight: '87 kg' },
    meds: [
      { name: 'Lisinopril 10mg', route: 'PO', freq: 'Daily', status: 'active' },
      { name: 'Metoprolol 25mg', route: 'PO', freq: 'BID', status: 'active' },
      { name: 'Furosemide 40mg', route: 'IV', freq: 'BID', status: 'active' },
      { name: 'Aspirin 81mg', route: 'PO', freq: 'Daily', status: 'active' },
    ],
    notes: 'Pt. 62M admitted for CHF exacerbation. Overnight diuresed 1.2L. Weight down 1.8 kg since admission. Still reporting dyspnea on exertion. Trace pedal edema persists. Echo scheduled this PM.',
    plan: 'Continue diuresis. Increase lisinopril to 20mg daily. Repeat BMP in AM. Cardiology consult ordered.',
    labs: [
      { name: 'BNP', val: '1,840 pg/mL', flag: 'H' },
      { name: 'Creatinine', val: '1.4 mg/dL', flag: 'H' },
      { name: 'Na', val: '138 mEq/L', flag: '' },
      { name: 'K', val: '3.8 mEq/L', flag: '' },
      { name: 'Hgb', val: '11.2 g/dL', flag: 'L' },
    ],
  },
  'pt-002': {
    allergies: ['NKDA'],
    vitals: { bp: '118/74', hr: 72, rr: 16, temp: '99.1°F', spo2: '98%', weight: '64 kg' },
    meds: [
      { name: 'Oxycodone 5mg', route: 'PO', freq: 'Q6H PRN', status: 'active' },
      { name: 'Enoxaparin 40mg', route: 'SQ', freq: 'Daily', status: 'active' },
      { name: 'Cefazolin 1g', route: 'IV', freq: 'Q8H', status: 'active' },
    ],
    notes: 'Post-op Day 2 following R total hip arthroplasty. Pain well-controlled. PT cleared to ambulate 50ft with walker. No signs of wound infection.',
    plan: 'PT/OT daily. Transition to oral pain meds. Discharge planning for SNF vs home with PT — to be discussed with case management.',
    labs: [
      { name: 'WBC', val: '8.4 K/μL', flag: '' },
      { name: 'Hgb', val: '10.1 g/dL', flag: 'L' },
      { name: 'CRP', val: '24 mg/L', flag: 'H' },
    ],
  },
  'pt-003': {
    allergies: ['Codeine — N/V'],
    vitals: { bp: '138/82', hr: 92, rr: 24, temp: '100.2°F', spo2: '89%', weight: '78 kg' },
    meds: [
      { name: 'Ipratropium neb', route: 'INH', freq: 'Q4H', status: 'active' },
      { name: 'Albuterol neb', route: 'INH', freq: 'Q4H', status: 'active' },
      { name: 'Prednisone 40mg', route: 'PO', freq: 'Daily', status: 'active' },
      { name: 'Azithromycin 500mg', route: 'PO', freq: 'Daily', status: 'active' },
    ],
    notes: 'Pt. 71M with COPD exacerbation, likely triggered by URI. SpO₂ trending 88-91% on 2L NC. Increased WOB noted. Discussing escalation to BIPAP if no improvement.',
    plan: 'Continue bronchodilators and steroids. Check ABG if SpO₂ <88%. Pulmonology consult.',
    labs: [
      { name: 'WBC', val: '13.2 K/μL', flag: 'H' },
      { name: 'pH (VBG)', val: '7.32', flag: 'L' },
      { name: 'pCO2', val: '58 mmHg', flag: 'H' },
      { name: 'Procalcitonin', val: '1.8 ng/mL', flag: 'H' },
    ],
  },
  'pt-004': {
    allergies: ['Vancomycin — Red Man Syndrome'],
    vitals: { bp: '96/58', hr: 108, rr: 22, temp: '101.8°F', spo2: '96%', weight: '70 kg' },
    meds: [
      { name: 'Pip/Tazo 3.375g', route: 'IV', freq: 'Q6H', status: 'active' },
      { name: 'NS 250mL', route: 'IV', freq: 'Bolus Q4H PRN MAP<65', status: 'active' },
      { name: 'Norepinephrine', route: 'IV gtt', freq: '0.05 mcg/kg/min', status: 'active' },
    ],
    notes: 'Pt. 55F with sepsis secondary to UTI. Day 3 of antibiotics. MAP trending 62–68. Vasopressor at low dose. Urine output improving. Blood cultures pending.',
    plan: 'Continue current abx pending cultures. Wean pressor as tolerated. ID consult. Daily reassessment.',
    labs: [
      { name: 'Lactate', val: '3.2 mmol/L', flag: 'H' },
      { name: 'WBC', val: '18.4 K/μL', flag: 'H' },
      { name: 'Creatinine', val: '2.1 mg/dL', flag: 'H' },
      { name: 'Procalcitonin', val: '28 ng/mL', flag: 'H' },
    ],
  },
  'pt-005': {
    allergies: ['NKDA'],
    vitals: { bp: '122/78', hr: 68, rr: 14, temp: '98.4°F', spo2: '99%', weight: '82 kg' },
    meds: [
      { name: 'Ibuprofen 400mg', route: 'PO', freq: 'Q6H', status: 'active' },
      { name: 'Ondansetron 4mg', route: 'PO', freq: 'Q8H PRN', status: 'active' },
    ],
    notes: 'Pt. 38M s/p laparoscopic appendectomy, uncomplicated. Tolerating clears. Ambulating independently. Wound dry and intact.',
    plan: 'Advance to regular diet. Discharge today with oral analgesics. Follow-up with surgery in 2 weeks.',
    labs: [
      { name: 'WBC', val: '9.1 K/μL', flag: '' },
      { name: 'Hgb', val: '14.2 g/dL', flag: '' },
    ],
  },
};

const TABS = [
  { id: 'vitals', label: 'Vitals', icon: Activity },
  { id: 'meds', label: 'Medications', icon: Pill },
  { id: 'labs', label: 'Labs', icon: ClipboardList },
  { id: 'notes', label: 'Notes & Plan', icon: FileText },
  { id: 'rounds', label: 'Rounds Note', icon: PenLine },
];

export default function PatientChart({ patient, onNoteAdded }) {
  const [tab, setTab] = useState('vitals');
  const data = CHART_DATA[patient.id] || CHART_DATA['pt-001'];

  return (
    <div className="flex flex-col h-full">
      {/* Patient header */}
      <div className="px-5 pt-4 pb-3 border-b border-border/60">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-display font-bold text-lg text-foreground">{patient.name}</p>
            <p className="text-xs text-muted-foreground">{patient.age}y · Room {patient.room} · {patient.dx}</p>
          </div>
          {data.allergies.length > 0 && data.allergies[0] !== 'NKDA' && (
            <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-[10px] font-bold">
              <AlertTriangle className="w-3 h-3" /> ALLERGY
            </div>
          )}
        </div>
        {data.allergies[0] !== 'NKDA' && (
          <p className="text-[10px] text-red-500 mt-1">{data.allergies.join(' · ')}</p>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 px-5 pt-3 pb-1">
        {TABS.map(t => {
          const TI = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                tab === t.id ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
              }`}
            >
              <TI className="w-3.5 h-3.5" /> {t.label}
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="flex-1 overflow-y-auto scrollbar-thin p-5"
        >
          {tab === 'vitals' && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { icon: Heart, label: 'Blood Pressure', val: data.vitals.bp, unit: 'mmHg' },
                { icon: Activity, label: 'Heart Rate', val: data.vitals.hr, unit: 'bpm' },
                { icon: Wind, label: 'Resp. Rate', val: data.vitals.rr, unit: '/min' },
                { icon: Thermometer, label: 'Temperature', val: data.vitals.temp, unit: '' },
                { icon: Droplets, label: 'SpO₂', val: data.vitals.spo2, unit: '' },
                { icon: Activity, label: 'Weight', val: data.vitals.weight, unit: '' },
              ].map(v => {
                const VI = v.icon;
                return (
                  <div key={v.label} className="p-3 rounded-xl bg-secondary/50 border border-border">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <VI className="w-3.5 h-3.5 text-primary" />
                      <p className="text-[10px] text-muted-foreground font-medium">{v.label}</p>
                    </div>
                    <p className="font-display font-bold text-lg text-foreground">{v.val}</p>
                    {v.unit && <p className="text-[10px] text-muted-foreground">{v.unit}</p>}
                  </div>
                );
              })}
            </div>
          )}

          {tab === 'meds' && (
            <div className="space-y-2">
              {data.meds.map((med, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-secondary/50 border border-border">
                  <div>
                    <p className="text-sm font-semibold text-foreground">{med.name}</p>
                    <p className="text-xs text-muted-foreground">{med.route} · {med.freq}</p>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">Active</span>
                </div>
              ))}
            </div>
          )}

          {tab === 'labs' && (
            <div className="space-y-2">
              {data.labs.map((lab, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-secondary/50 border border-border">
                  <p className="text-sm text-foreground">{lab.name}</p>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-foreground font-mono">{lab.val}</p>
                    {lab.flag && (
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        lab.flag === 'H' ? 'bg-red-500/15 text-red-500' : 'bg-blue-500/15 text-blue-500'
                      }`}>{lab.flag}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === 'notes' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-secondary/50 border border-border">
                <p className="text-[10px] font-bold tracking-wider text-primary uppercase mb-2">Assessment / Progress Note</p>
                <p className="text-sm text-foreground leading-relaxed">{data.notes}</p>
              </div>
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                <p className="text-[10px] font-bold tracking-wider text-primary uppercase mb-2">Plan</p>
                <p className="text-sm text-foreground leading-relaxed">{data.plan}</p>
              </div>
            </div>
          )}

          {tab === 'rounds' && (
            <RoundsNotepad patient={patient} onNoteAdded={onNoteAdded} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}