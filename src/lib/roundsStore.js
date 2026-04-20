// Shared in-memory store for rounds notes (persisted to localStorage)
// Used by RoundsNotepad (write) and RoundsTranscript (read)

const STORAGE_KEY = 'doccollab_rounds_notes';

const SEED = [
  {
    id: 'rn-seed-1',
    ts: '2026-04-20T08:06:00.000Z',
    patientId: 'pt-001',
    patientName: 'James Okafor',
    room: '4B',
    mrn: 'MRN-10042',
    payer: 'Medicare',
    type: 'Follow-Up',
    author: 'Dr. K. Mensah',
    credential: 'MD · Attending',
    note: 'Overnight diuresis good. Echo scheduled PM. Will re-eval for discharge readiness tomorrow. Cardiology following.',
    tags: ['#CHF', '#f/u'],
    priority: 'high',
  },
  {
    id: 'rn-seed-2',
    ts: '2026-04-20T08:09:00.000Z',
    patientId: 'pt-002',
    patientName: 'Maria Delgado',
    room: '4C',
    mrn: 'MRN-10091',
    payer: 'BlueCross',
    type: 'Coordination',
    author: 'R. Navarro',
    credential: 'RN · Charge Nurse',
    note: 'PT cleared for ambulation. Case management contacted re: SNF placement vs home PT. Family meeting scheduled 2pm.',
    tags: ['#PT', '#discharge'],
    priority: 'medium',
  },
  {
    id: 'rn-seed-3',
    ts: '2026-04-20T08:14:00.000Z',
    patientId: 'pt-003',
    patientName: 'Robert Chen',
    room: '5A',
    mrn: 'MRN-10103',
    payer: 'Medicaid',
    type: 'Update',
    author: 'Dr. L. Shah',
    credential: 'MD · Resident',
    note: 'SpO₂ still 89%. Pulmonology consult placed. Considering BIPAP trial tonight if no improvement on current nebs/steroids.',
    tags: ['#COPD', '#respiratory'],
    priority: 'high',
  },
  {
    id: 'rn-seed-4',
    ts: '2026-04-20T08:18:00.000Z',
    patientId: 'pt-004',
    patientName: 'Priya Nair',
    room: '5B',
    mrn: 'MRN-10217',
    payer: 'Aetna',
    type: 'Critical Update',
    author: 'Dr. K. Mensah',
    credential: 'MD · Attending',
    note: 'MAP improved to 66. Cultures at 48h — gram negative rods, sensitivities pending. Discussed with ID — continue pip/tazo for now. ICU transfer criteria borderline — monitoring closely.',
    tags: ['#sepsis', '#ID', '#critical'],
    priority: 'critical',
  },
];

function load() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return SEED;
}

function persist(notes) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(notes)); } catch {}
}

export function getRoundsNotes() {
  return load();
}

export function addRoundsNote(note) {
  const notes = load();
  const updated = [note, ...notes];
  persist(updated);
  return updated;
}

export function deleteRoundsNote(id) {
  const updated = load().filter(n => n.id !== id);
  persist(updated);
  return updated;
}