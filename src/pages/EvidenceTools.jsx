import React, { useState } from 'react';
import PageHeader from '@/components/common/PageHeader';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Lock, Info, X, FileSearch, ClipboardList, Landmark, ChevronRight, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TOOLS = [
  {
    id: 'interqual',
    icon: ClipboardList,
    label: 'InterQual',
    sublabel: 'Change Healthcare / Optum',
    tag: 'Level of Care Criteria',
    color: 'from-blue-600 to-blue-500',
    badgeColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
    description: `InterQual provides evidence-based clinical decision support criteria used to determine appropriate level of care — inpatient, observation, skilled nursing, home health, and more.

In production, clicking this button will open your organization's licensed InterQual portal via a secure OAuth-authenticated link. The session token is passed encrypted and no PHI is exposed in the URL.`,
    future: `Future integration: DocCollab will call the InterQual API to pre-populate patient context (diagnosis, procedure codes, LOS) directly from the current session — saving 4–6 minutes per review.`,
    link: 'https://www.optum.com/business/products/health-plans/clinical-criteria/interqual.html',
  },
  {
    id: 'mcg',
    icon: FileSearch,
    label: 'MCG Guidelines',
    sublabel: 'Milliman Care Guidelines',
    tag: 'Evidence-Based Care Planning',
    color: 'from-emerald-600 to-emerald-500',
    badgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    description: `MCG (formerly Milliman Care Guidelines) offers evidence-based care management guidelines across the continuum — from acute inpatient criteria to ambulatory care and recovery milestones.

In production, this button connects via your organization's MCG license. DocCollab passes the encounter context (DRG, diagnoses) to pre-filter relevant guidelines for the active patient session.`,
    future: `Future integration: The ambient AI will automatically surface the matching MCG guideline chapter based on the SOAP assessment section — inline, without leaving the session.`,
    link: 'https://www.mcg.com/',
  },
  {
    id: 'cms',
    icon: Landmark,
    label: 'CMS Coverage',
    sublabel: 'Centers for Medicare & Medicaid Services',
    tag: 'LCD · NCD · Medicare Policy',
    color: 'from-amber-600 to-amber-500',
    badgeColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
    description: `CMS provides publicly available Local Coverage Determinations (LCDs) and National Coverage Determinations (NCDs) that define Medicare/Medicaid coverage criteria for procedures and diagnoses.

This integration pulls the latest CMS LCD/NCD database. In standalone demo mode it links to CMS.gov. In enterprise mode it will integrate with your MAC's LCD portal for real-time coverage lookup.`,
    future: `Future integration: The SOAP plan section will auto-flag procedures against active LCDs — alerting clinicians before documentation is complete, reducing claim denials.`,
    link: 'https://www.cms.gov/medicare-coverage-database/',
  },
];

function ToolCard({ tool, onOpen }) {
  const Icon = tool.icon;
  return (
    <div className="group relative p-6 rounded-3xl bg-card border border-border hover:border-primary/40 transition-all hover:shadow-lg hover:shadow-primary/5">
      <div className={`absolute -top-3 left-6 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase ${tool.badgeColor}`}>
        {tool.tag}
      </div>
      <div className="mt-3 flex items-start justify-between gap-3">
        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${tool.color} flex items-center justify-center flex-shrink-0 shadow-md`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="flex items-center gap-1.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full">
          <Lock className="w-3 h-3" /> Secure Link
        </div>
      </div>
      <h3 className="font-display font-bold text-xl text-foreground mt-4 mb-0.5">{tool.label}</h3>
      <p className="text-xs text-muted-foreground mb-4">{tool.sublabel}</p>

      <div className="flex gap-2">
        <Button
          onClick={() => onOpen(tool)}
          className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground gap-2 rounded-full"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          Open Portal
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => onOpen(tool)}
          className="rounded-full"
          aria-label="Learn more"
        >
          <Info className="w-4 h-4" />
        </Button>
      </div>

      <p className="mt-3 text-[10px] text-muted-foreground flex items-center gap-1">
        <Shield className="w-3 h-3" /> Demo mode · click to learn how this integration works
      </p>
    </div>
  );
}

function InfoDrawer({ tool, onClose }) {
  if (!tool) return null;
  const Icon = tool.icon;
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-background/70 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          className="relative w-full max-w-xl glass rounded-3xl p-8"
          onClick={e => e.stopPropagation()}
        >
          <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-xl hover:bg-secondary text-muted-foreground">
            <X className="w-4 h-4" />
          </button>

          <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${tool.color} flex items-center justify-center mb-4 shadow-md`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <h2 className="font-display font-bold text-2xl text-foreground mb-1">{tool.label}</h2>
          <p className="text-xs text-muted-foreground mb-5">{tool.sublabel}</p>

          <p className="text-sm text-foreground leading-relaxed whitespace-pre-line mb-5">{tool.description}</p>

          <div className="p-4 rounded-xl bg-accent/10 border border-accent/30">
            <p className="text-[10px] font-bold tracking-[0.15em] text-accent-foreground uppercase mb-1">Coming in Production</p>
            <p className="text-sm text-foreground leading-relaxed">{tool.future}</p>
          </div>

          <div className="mt-6 flex gap-3">
            <Button
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground gap-2 rounded-full"
              onClick={() => window.open(tool.link, '_blank')}
            >
              <ExternalLink className="w-3.5 h-3.5" /> Visit {tool.label} (Public Site)
            </Button>
            <Button variant="outline" onClick={onClose} className="rounded-full">Close</Button>
          </div>

          <p className="mt-3 text-[10px] text-muted-foreground text-center flex items-center justify-center gap-1">
            <Lock className="w-3 h-3" /> In production: encrypted OAuth handoff — no PHI in URL params
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function EvidenceTools() {
  const [activeTool, setActiveTool] = useState(null);

  return (
    <div>
      <PageHeader
        eyebrow="Evidence-Based Tools"
        title="Clinical decision support,"
        accent="at your fingertips."
        description="InterQual, MCG, and CMS Coverage — condensed into one-click portal buttons. In demo mode each button shows exactly how the live integration will work."
      />

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 p-5 rounded-2xl bg-accent/10 border border-accent/30 flex gap-3">
            <Info className="w-5 h-5 text-accent-foreground flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-foreground mb-1">Demo Mode — Interactive Learning</p>
              <p className="text-sm text-muted-foreground">
                Each portal button below simulates how DocCollab will connect to licensed clinical decision support tools in production. Click any button or the <strong>ⓘ</strong> icon to read a full description of the integration, what data is passed, and what future automation is planned.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {TOOLS.map(t => <ToolCard key={t.id} tool={t} onOpen={setActiveTool} />)}
          </div>

          <div className="mt-10 grid sm:grid-cols-2 gap-5">
            <div className="p-6 rounded-2xl bg-card border border-border">
              <p className="text-xs font-bold tracking-[0.15em] text-primary uppercase mb-3">How secure portal linking works</p>
              <ol className="space-y-2 text-sm text-muted-foreground">
                {[
                  'Clinician clicks the portal button inside an active session',
                  'DocCollab generates a short-lived signed JWT with session context',
                  'JWT is passed via encrypted POST to the target portal (no URL params)',
                  'Portal validates the token and opens the relevant content',
                  'The handoff is logged in the HIPAA audit trail',
                ].map((step, i) => (
                  <li key={i} className="flex gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-bold flex-shrink-0 flex items-center justify-center">{i + 1}</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
            <div className="p-6 rounded-2xl bg-card border border-border">
              <p className="text-xs font-bold tracking-[0.15em] text-primary uppercase mb-3">Planned integrations roadmap</p>
              <ul className="space-y-2 text-sm">
                {[
                  { label: 'UpToDate / Wolters Kluwer', soon: false },
                  { label: 'Epic SmartLinks', soon: true },
                  { label: 'Cerner PowerChart context', soon: true },
                  { label: 'Vizient Clinical Analytics', soon: false },
                  { label: 'AHRQ Quality Measures', soon: false },
                ].map(r => (
                  <li key={r.label} className="flex items-center justify-between">
                    <span className="text-foreground flex items-center gap-2">
                      <ChevronRight className="w-3 h-3 text-primary" /> {r.label}
                    </span>
                    {r.soon && <span className="text-[9px] font-bold tracking-wider bg-accent/90 text-accent-foreground px-2 py-0.5 rounded-full">SOON</span>}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <InfoDrawer tool={activeTool} onClose={() => setActiveTool(null)} />
    </div>
  );
}