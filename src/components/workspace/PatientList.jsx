import React from 'react';
import { Activity, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';

const PATIENTS = [
  { id: 'pt-001', name: 'James Okafor', age: 62, room: '4B', dx: 'CHF Exacerbation', acuity: 'high', bp: '142/88', hr: 84, spo2: 94, status: 'active', mrn: 'MRN-10042', payer: 'Medicare' },
  { id: 'pt-002', name: 'Maria Delgado', age: 47, room: '4C', dx: 'Post-op Day 2 · Hip Arthroplasty', acuity: 'medium', bp: '118/74', hr: 72, spo2: 98, status: 'stable', mrn: 'MRN-10091', payer: 'BlueCross' },
  { id: 'pt-003', name: 'Robert Chen', age: 71, room: '5A', dx: 'COPD Exacerbation', acuity: 'high', bp: '138/82', hr: 92, spo2: 89, status: 'watch', mrn: 'MRN-10103', payer: 'Medicaid' },
  { id: 'pt-004', name: 'Priya Nair', age: 55, room: '5B', dx: 'Sepsis — Day 3 Antibiotics', acuity: 'high', bp: '96/58', hr: 108, spo2: 96, status: 'critical', mrn: 'MRN-10217', payer: 'Aetna' },
  { id: 'pt-005', name: 'Thomas Webb', age: 38, room: '3D', dx: 'Appendectomy — Recovering', acuity: 'low', bp: '122/78', hr: 68, spo2: 99, status: 'stable', mrn: 'MRN-10334', payer: 'UnitedHealth' },
];

const acuityConfig = {
  high: { color: 'bg-red-500/15 text-red-600 dark:text-red-400 border-red-500/30', dot: 'bg-red-500', label: 'High' },
  medium: { color: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30', dot: 'bg-amber-500', label: 'Med' },
  low: { color: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30', dot: 'bg-emerald-500', label: 'Low' },
};

const statusIcon = { critical: AlertTriangle, watch: Clock, active: Activity, stable: CheckCircle2 };
const statusColor = { critical: 'text-red-500', watch: 'text-amber-500', active: 'text-primary', stable: 'text-emerald-500' };

export default function PatientList({ selectedId, onSelect }) {
  return (
    <div className="space-y-2">
      {PATIENTS.map(pt => {
        const ac = acuityConfig[pt.acuity];
        const SIcon = statusIcon[pt.status];
        const active = selectedId === pt.id;
        return (
          <button
            key={pt.id}
            onClick={() => onSelect(pt)}
            className={`w-full text-left p-3 rounded-xl border transition-all ${
              active ? 'border-primary bg-primary/8 shadow-sm' : 'border-border bg-card hover:border-primary/40 hover:bg-secondary/50'
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-foreground truncate">{pt.name}</p>
                  <span className={`flex-shrink-0 text-[9px] font-bold px-1.5 py-0.5 rounded-full border ${ac.color}`}>{ac.label}</span>
                </div>
                <p className="text-[11px] text-muted-foreground mt-0.5 truncate">{pt.dx}</p>
              </div>
              <div className="flex-shrink-0 flex items-center gap-1 text-[10px] font-bold">
                <SIcon className={`w-3 h-3 ${statusColor[pt.status]}`} />
                <span className="font-mono text-muted-foreground">Rm {pt.room}</span>
              </div>
            </div>
            <div className="flex gap-3 mt-2 text-[10px] font-mono text-muted-foreground">
              <span>BP {pt.bp}</span>
              <span>HR {pt.hr}</span>
              <span>SpO₂ {pt.spo2}%</span>
            </div>
          </button>
        );
      })}
    </div>
  );
}

export { PATIENTS };