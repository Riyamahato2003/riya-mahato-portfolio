import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import {
  ARCHITECTURE_DIAGRAMS,
  CAPABILITIES_DATA,
  CapabilityTier,
  DiagramId,
  RoutePath,
  getVisibleProjects,
} from '../data/portfolio';
import { TOOLKIT_CATEGORIES } from '../data/toolkit';
import { ArchitectureDiagramCanvas } from '../components/ArchitectureDiagrams';
import { MotionSection, PageHeader, SectionHeading } from '../components/EditorialUI';

interface SystemsPageProps {
  onNavigate: (path: RoutePath) => void;
}

type EvidenceSourceFilter =
  | 'all'
  | 'ai-lending-reliability-lab'
  | 'oem-intelligence'
  | 'presales-copilot-tender-compliance'
  | 'experience-nb';

const TIER_ORDER: CapabilityTier[] = [
  'ai-agentic',
  'demonstrated',
  'backend-integrations',
  'evaluation-reliability',
  'technical-sales',
  'developing',
];

export function SystemsPage({ onNavigate }: SystemsPageProps) {
  const [tierFilter, setTierFilter] = useState<'all' | CapabilityTier>('all');
  const [sourceFilter, setSourceFilter] = useState<EvidenceSourceFilter>('all');
  const [activeDiagramId, setActiveDiagramId] = useState<DiagramId>('lending-workflow');

  const visibleProjects = getVisibleProjects();
  const visibleSlugs = new Set([
    ...visibleProjects.map((p) => p.slug),
    'experience-nb',
  ]);

  const activeDiagram =
    ARCHITECTURE_DIAGRAMS.find((d) => d.id === activeDiagramId) ??
    ARCHITECTURE_DIAGRAMS[0];

  const sourceLabels: Record<string, string> = {
    'ai-lending-reliability-lab': '01 · Verity',
    'presales-copilot-tender-compliance': '02 · Tender Review',
    'oem-intelligence': '03 · OEM Intelligence',
    'experience-nb': 'NB Instrument',
  };

  const tierMeta: Record<
    CapabilityTier,
    { label: string; shortLabel: string; toneClass: string; description: string }
  > = {
    'ai-agentic': {
      label: 'AI Products',
      shortLabel: 'AI Products',
      toneClass: 'text-[#B8A4FF]',
      description: 'LLM integration, prompt engineering, document AI, tool calling, and human review.',
    },
    demonstrated: {
      label: 'Software & Web Interfaces',
      shortLabel: 'Frontend & Docs',
      toneClass: 'text-[#E79EFF]',
      description: 'JavaScript, TypeScript, React, Next.js, and multi-format document processing.',
    },
    'backend-integrations': {
      label: 'Backend & Databases',
      shortLabel: 'Backend & SQL',
      toneClass: 'text-[#C6B9DA]',
      description: 'Python, FastAPI, SQL, PostgreSQL, REST APIs, Git, and GitHub.',
    },
    'evaluation-reliability': {
      label: 'Reliable Systems',
      shortLabel: 'Reliability',
      toneClass: 'text-[#E79EFF]',
      description: 'Authentication, permissions, approvals, error handling, failure recovery, and audit history.',
    },
    'technical-sales': {
      label: 'Customers and Business',
      shortLabel: 'Customers & Biz',
      toneClass: 'text-[#F7F3FB]',
      description: 'Customer discovery, demos, international partner coordination, research, and CRM workflows.',
    },
    developing: {
      label: 'Automated Testing',
      shortLabel: 'Testing',
      toneClass: 'text-[#FF6B57]',
      description: 'pytest backend tests, Playwright browser checks, and failure simulation.',
    },
  };

  const filteredCapabilities = CAPABILITIES_DATA.filter((cap) => {
    const matchesTier = tierFilter === 'all' || cap.tier === tierFilter;
    const matchesSource =
      sourceFilter === 'all' || cap.linkedProjects.includes(sourceFilter);
    return matchesTier && matchesSource;
  });

  const groupedCapabilities = TIER_ORDER.map((tierKey) => ({
    tierKey,
    meta: tierMeta[tierKey],
    items: filteredCapabilities.filter((c) => c.tier === tierKey),
  })).filter((group) => group.items.length > 0);

  return (
    <div>
      <PageHeader
        indexCode="03"
        sectionLabel="Skills & Diagrams"
        title="Skills & How My Projects Work"
        lead="The four skill areas I work across — AI Products, Software Development, Reliable Systems, and Customers and Business — alongside interactive system diagrams."
        metaRight="Plain-English System Guides"
      />

      {/* 4 Core Skill Groups */}
      <MotionSection className="py-12 md:py-16 border-b border-[rgba(184,164,255,0.16)]">
        <SectionHeading
          number="01"
          title="Core Skills (4 Areas)"
          aside="Linked directly to real projects and work experience"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
          {TOOLKIT_CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              className="border border-[rgba(184,164,255,0.18)] bg-[#160E22]/90 p-6"
            >
              <p className="font-mono text-xs text-[#E79EFF]">{cat.index}</p>
              <h3 className="mt-1 font-display text-xl font-semibold text-[#F7F3FB]">
                {cat.title}
              </h3>
              <p className="mt-3 font-mono text-xs text-[#B8A4FF] leading-[1.75]">
                {cat.skills.join(' · ')}
              </p>
              <p className="mt-3 text-sm text-[#C6B9DA] leading-[1.6]">{cat.note}</p>
            </div>
          ))}
        </div>

        {/* Filter Controls */}
        <div className="space-y-3 mb-8">
          <div
            role="group"
            aria-label="Filter skills by area"
            className="flex flex-wrap gap-1.5 p-1.5 bg-[#160E22] border border-[rgba(184,164,255,0.18)]"
          >
            <button
              type="button"
              onClick={() => setTierFilter('all')}
              aria-pressed={tierFilter === 'all'}
              className={`relative px-3.5 py-2 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-[36px] ${
                tierFilter === 'all'
                  ? 'text-[#0D0814] font-semibold'
                  : 'text-[#C6B9DA] hover:text-[#F7F3FB]'
              }`}
            >
              {tierFilter === 'all' && (
                <motion.span
                  layoutId="tech-group-tab"
                  transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                  className="absolute inset-0 bg-gradient-to-r from-[#D96BFF] to-[#FF6B57]"
                />
              )}
              <span className="relative z-10">All Areas</span>
            </button>

            {TIER_ORDER.map((key) => {
              const active = tierFilter === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setTierFilter(key)}
                  aria-pressed={active}
                  className={`relative px-3.5 py-2 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-[36px] ${
                    active
                      ? 'text-[#0D0814] font-semibold'
                      : 'text-[#C6B9DA] hover:text-[#F7F3FB]'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="tech-group-tab"
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                      className="absolute inset-0 bg-gradient-to-r from-[#D96BFF] to-[#FF6B57]"
                    />
                  )}
                  <span className="relative z-10">{tierMeta[key].shortLabel}</span>
                </button>
              );
            })}
          </div>

          <div
            role="group"
            aria-label="Filter by project"
            className="inline-flex flex-wrap gap-1.5 p-1.5 bg-[#120B1C] border border-[rgba(184,164,255,0.14)]"
          >
            <button
              type="button"
              onClick={() => setSourceFilter('all')}
              aria-pressed={sourceFilter === 'all'}
              className={`px-3 py-1.5 text-xs font-mono transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-[34px] ${
                sourceFilter === 'all'
                  ? 'bg-[#F7F3FB] text-[#0D0814] font-semibold'
                  : 'text-[#C6B9DA] hover:text-[#F7F3FB]'
              }`}
            >
              All Sources
            </button>
            {Object.entries(sourceLabels)
              .filter(([key]) => visibleSlugs.has(key))
              .map(([key, label]) => {
                const active = sourceFilter === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSourceFilter(key as EvidenceSourceFilter)}
                    aria-pressed={active}
                    className={`px-3 py-1.5 text-xs font-mono transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-[34px] ${
                      active
                        ? 'bg-[#D96BFF] text-[#0D0814] font-semibold'
                        : 'text-[#C6B9DA] hover:text-[#F7F3FB]'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
          </div>
        </div>

        <div className="space-y-8">
          {groupedCapabilities.map((group) => (
            <div
              key={group.tierKey}
              className="border border-[rgba(184,164,255,0.18)] bg-[#160E22]/85 p-6 sm:p-7"
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-4 border-b border-[rgba(184,164,255,0.14)] mb-6">
                <div>
                  <h3 className={`font-display text-xl font-semibold ${group.meta.toneClass}`}>
                    {group.meta.label}
                  </h3>
                  <p className="text-xs text-[#9687AF] mt-1">{group.meta.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {group.items.map((cap) => {
                  const visibleLinks = cap.linkedProjects.filter((slug) =>
                    visibleSlugs.has(slug)
                  );
                  return (
                    <div
                      key={cap.id}
                      className="border border-[rgba(184,164,255,0.14)] bg-[#0D0814]/80 p-5 flex flex-col justify-between"
                    >
                      <div>
                        <p className="font-display text-base font-semibold text-[#F7F3FB]">
                          {cap.name}
                        </p>
                        <p className="mt-2 text-sm leading-[1.6] text-[#C6B9DA]">
                          {cap.summary}
                        </p>
                        <p className="mt-2 text-xs text-[#9687AF] leading-[1.55]">
                          {cap.evidenceNote}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-[rgba(184,164,255,0.1)] flex flex-wrap gap-x-4 gap-y-1">
                        {visibleLinks.map((slug) => {
                          const targetPath: RoutePath =
                            slug === 'experience-nb'
                              ? '/experience'
                              : (`/work/${slug}` as RoutePath);
                          return (
                            <button
                              key={slug}
                              type="button"
                              onClick={() => onNavigate(targetPath)}
                              className="font-mono text-[11px] text-[#E79EFF] hover:text-[#F7F3FB] underline underline-offset-4 decoration-[rgba(217,107,255,0.4)] cursor-pointer"
                            >
                              {sourceLabels[slug] ?? slug}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </MotionSection>

      {/* Interactive Diagrams */}
      <MotionSection className="py-12 md:py-16">
        <SectionHeading
          number="02"
          title="Interactive System Diagrams"
          aside="Click any step to read what it does"
        />

        <div
          role="tablist"
          aria-label="System diagrams"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6"
        >
          {ARCHITECTURE_DIAGRAMS.map((diag) => {
            const active = diag.id === activeDiagram.id;
            return (
              <button
                key={diag.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setActiveDiagramId(diag.id)}
                className={`p-4 text-left border transition-all duration-150 cursor-pointer ${
                  active
                    ? 'border-[#D96BFF] bg-[#241638] shadow-[0_8px_28px_-12px_rgba(217,107,255,0.5)]'
                    : 'border-[rgba(184,164,255,0.16)] bg-[#160E22]/85 hover:border-[rgba(184,164,255,0.4)]'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="font-mono text-[11px] text-[#9687AF] tabular-nums">
                    {diag.figureNumber}
                  </span>
                  <span className="font-mono text-[10px] text-[#E79EFF]">
                    {diag.statusLabel}
                  </span>
                </div>
                <span className="block text-sm font-medium text-[#F7F3FB] leading-[1.35]">
                  {diag.title}
                </span>
              </button>
            );
          })}
        </div>

        <div role="tabpanel" aria-label={activeDiagram.title}>
          <div className="mb-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <div>
              <p className="font-mono text-xs text-[#E79EFF]">
                {activeDiagram.figureNumber} · {activeDiagram.statusLabel}
              </p>
              <h3 className="font-display text-xl sm:text-2xl font-semibold text-[#F7F3FB] mt-1">
                {activeDiagram.title}
              </h3>
            </div>
            <button
              type="button"
              onClick={() => onNavigate(`/work/${activeDiagram.projectSlug}`)}
              className="inline-flex items-center gap-1.5 font-mono text-xs text-[#E79EFF] hover:text-[#F7F3FB] underline underline-offset-4 cursor-pointer shrink-0"
            >
              <span>Inspect {activeDiagram.projectTitle}</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>

          <ArchitectureDiagramCanvas diagramId={activeDiagram.id} />

          <div className="mt-4 grid grid-cols-1 md:grid-cols-12 gap-4 border border-[rgba(184,164,255,0.18)] bg-[#160E22] p-5 text-sm">
            <div className="md:col-span-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#9687AF] mb-1">
                Summary
              </p>
              <p className="text-[#C6B9DA] leading-[1.6]">{activeDiagram.caption}</p>
            </div>
            <div className="md:col-span-4 border-t md:border-t-0 md:border-l border-[rgba(184,164,255,0.14)] pt-3 md:pt-0 md:pl-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#FF6B57] mb-1">
                Scope Note
              </p>
              <p className="text-xs text-[#C6B9DA] leading-[1.6]">
                {activeDiagram.scopeNote}
              </p>
            </div>
          </div>
        </div>
      </MotionSection>
    </div>
  );
}
