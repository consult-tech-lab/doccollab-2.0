import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Filter, Trash2, ChevronDown, ChevronUp,
  User, Clock, Tag, AlertTriangle, Building2, Hash,
  ClipboardList, RefreshCw
} from 'lucide-react';
import { getRoundsNotes, deleteRoundsNote } from '@/lib/roundsStore';

const PRIORITY_CONFIG = {
  routine: { label: 'Routine', cls: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30' },
  medium: { label: 'Priority', cls: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30' },
  high: { label: 'Urgent', cls: 'bg-red-500/15 text-red-500 border-red-500/30' },
  critical: { label: 'Critical', cls: 'bg-red-600 text-white border-red-600' },
};

const TYPE_COLORS = {
  'Follow-Up': 'text-primary bg-primary/10',
  'Update': 'text-blue-500 bg-blue-500/10',
  'Coordination': 'text-purple-500 bg-purple-500/10',
  'Critical Update': 'text-red-500 bg-red-500/10',
  'Discharge Planning': 'text-emerald-600 bg-emerald-500/10',
  'IDT Note': 'text-amber-600 bg-amber-500/10',
};

function NoteCard({ note, onDelete }) {
  const [expanded, setExpanded] = useState(false);
  const pc = PRIORITY_CONFIG[note.priority] || PRIORITY_CONFIG.routine;
  const tc = TYPE_COLORS[note.type] || 'text-muted-foreground bg-secondary';
  const date = new Date(note.ts);
  const dateStr = date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  const timeStr = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0, marginBottom: 0 }}
      className="rounded-xl border border-border bg-card overflow-hidden"
    >
      {/* Card header */}
      <div className="px-4 py-3 flex items-start gap-3">
        {/* Priority stripe */}
        <div className={`flex-shrink-0 mt-0.5 w-1 h-10 rounded-full ${
          note.priority === 'critical' ? 'bg-red-600' :
          note.priority === 'high' ? 'bg-red-400' :
          note.priority === 'medium' ? 'bg-amber-400' : 'bg-emerald-400'
        }`} />

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-1.5 mb-1">
            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${tc}`}>{note.type}</span>
            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full border ${pc.cls}`}>{pc.label}</span>
            <span className="text-[10px] font-mono text-muted-foreground">{note.mrn}</span>
          </div>

          <p className="text-sm font-semibold text-foreground">{note.patientName}</p>
          <div className="flex flex-wrap gap-2 mt-0.5 text-[10px] text-muted-foreground">
            <span>Rm {note.room}</span>
            <span>·</span>
            <span className="flex items-center gap-0.5"><Building2 className="w-2.5 h-2.5" /> {note.payer}</span>
            <span>·</span>
            <span className="flex items-center gap-0.5"><Clock className="w-2.5 h-2.5" /> {dateStr} {timeStr}</span>
          </div>
        </div>

        <div className="flex items-center gap-1 flex-shrink-0">
          <button onClick={() => onDelete(note.id)} className="p-1.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors">
            <Trash2 className="w-3.5 h-3.5" />
          </button>
          <button onClick={() => setExpanded(!expanded)} className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground transition-colors">
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Preview line */}
      {!expanded && (
        <div className="px-4 pb-3 -mt-1">
          <p className="text-xs text-muted-foreground truncate">{note.note}</p>
        </div>
      )}

      {/* Expanded body */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t border-border/60 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-3">
              {/* Full note */}
              <p className="text-sm text-foreground leading-relaxed">{note.note}</p>

              {/* Tags */}
              {note.tags?.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {note.tags.map(t => (
                    <span key={t} className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary">{t}</span>
                  ))}
                </div>
              )}

              {/* Author + credential */}
              <div className="flex items-center gap-2 pt-1 border-t border-border/40">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-white text-[9px] font-bold">
                  {note.author.split(' ').map(w => w[0]).join('').slice(0, 2)}
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-foreground">{note.author}</p>
                  <p className="text-[10px] text-muted-foreground">{note.credential}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function RoundsTranscript({ refreshTick }) {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState('');
  const [filterPayer, setFilterPayer] = useState('All');
  const [filterRoom, setFilterRoom] = useState('All');
  const [filterType, setFilterType] = useState('All');
  const [sortDir, setSortDir] = useState('desc');

  const load = () => setNotes(getRoundsNotes());

  useEffect(() => { load(); }, [refreshTick]);

  const handleDelete = (id) => {
    deleteRoundsNote(id);
    load();
  };

  // Derived filter options
  const payers = ['All', ...Array.from(new Set(notes.map(n => n.payer).filter(Boolean)))];
  const rooms = ['All', ...Array.from(new Set(notes.map(n => n.room).filter(Boolean))).sort()];
  const types = ['All', ...Array.from(new Set(notes.map(n => n.type).filter(Boolean)))];

  const filtered = notes
    .filter(n => {
      const q = search.toLowerCase();
      const matchSearch = !q || n.patientName?.toLowerCase().includes(q) || n.mrn?.toLowerCase().includes(q) || n.note?.toLowerCase().includes(q) || n.author?.toLowerCase().includes(q) || n.tags?.some(t => t.toLowerCase().includes(q));
      const matchPayer = filterPayer === 'All' || n.payer === filterPayer;
      const matchRoom = filterRoom === 'All' || n.room === filterRoom;
      const matchType = filterType === 'All' || n.type === filterType;
      return matchSearch && matchPayer && matchRoom && matchType;
    })
    .sort((a, b) => sortDir === 'desc'
      ? new Date(b.ts) - new Date(a.ts)
      : new Date(a.ts) - new Date(b.ts)
    );

  const priorityOrder = { critical: 0, high: 1, medium: 2, routine: 3 };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Toolbar */}
      <div className="flex-shrink-0 px-4 pt-4 pb-3 space-y-2 border-b border-border/60">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by patient, MRN, last name, note…"
            className="w-full pl-8 pr-3 py-2 text-xs bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Filters row */}
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="w-3 h-3 text-muted-foreground flex-shrink-0" />

          {/* Payer */}
          <select value={filterPayer} onChange={e => setFilterPayer(e.target.value)}
            className="text-[10px] font-medium bg-secondary border border-border rounded-lg px-2 py-1 text-foreground focus:outline-none focus:ring-1 focus:ring-primary">
            {payers.map(p => <option key={p} value={p}>{p === 'All' ? 'All Payers' : p}</option>)}
          </select>

          {/* Room */}
          <select value={filterRoom} onChange={e => setFilterRoom(e.target.value)}
            className="text-[10px] font-medium bg-secondary border border-border rounded-lg px-2 py-1 text-foreground focus:outline-none focus:ring-1 focus:ring-primary">
            {rooms.map(r => <option key={r} value={r}>{r === 'All' ? 'All Rooms' : `Rm ${r}`}</option>)}
          </select>

          {/* Note type */}
          <select value={filterType} onChange={e => setFilterType(e.target.value)}
            className="text-[10px] font-medium bg-secondary border border-border rounded-lg px-2 py-1 text-foreground focus:outline-none focus:ring-1 focus:ring-primary">
            {types.map(t => <option key={t} value={t}>{t === 'All' ? 'All Types' : t}</option>)}
          </select>

          <button onClick={() => setSortDir(d => d === 'desc' ? 'asc' : 'desc')}
            className="ml-auto flex items-center gap-1 text-[10px] font-semibold text-muted-foreground hover:text-foreground px-2 py-1 rounded-lg hover:bg-secondary border border-border transition-colors">
            <Clock className="w-3 h-3" /> {sortDir === 'desc' ? 'Newest' : 'Oldest'}
          </button>

          <button onClick={load} className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground border border-border">
            <RefreshCw className="w-3 h-3" />
          </button>
        </div>

        {/* Stats bar */}
        <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
          <span className="flex items-center gap-1"><ClipboardList className="w-3 h-3" /> {filtered.length} note{filtered.length !== 1 ? 's' : ''}</span>
          {filtered.filter(n => n.priority === 'critical').length > 0 && (
            <span className="flex items-center gap-1 text-red-500 font-semibold">
              <AlertTriangle className="w-3 h-3" /> {filtered.filter(n => n.priority === 'critical').length} critical
            </span>
          )}
        </div>
      </div>

      {/* Notes list */}
      <div className="flex-1 overflow-y-auto scrollbar-thin px-4 py-3 space-y-2">
        {filtered.length === 0 ? (
          <div className="text-center py-12">
            <ClipboardList className="w-8 h-8 text-muted-foreground mx-auto mb-3 opacity-40" />
            <p className="text-sm text-muted-foreground">No notes match your filters.</p>
            <p className="text-xs text-muted-foreground mt-1">Submit a note from the Rounds Notes tab.</p>
          </div>
        ) : (
          <AnimatePresence>
            {filtered.map(n => (
              <NoteCard key={n.id} note={n} onDelete={handleDelete} />
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}