import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Lock, X } from 'lucide-react';
import { DiagramId, ProjectRecord } from '../data/portfolio';
import { PROJECT_RESULTS } from '../data/results';
import { PROJECT_IMAGE_SLOTS } from '../data/photography';
import {
  ArchitectureDiagramCanvas,
  LendingReliabilityHarnessPreview,
} from './ArchitectureDiagrams';
import { ProjectScreenshotSlots } from './PhotographyGallery';
import { OemAbstractTopology } from './SpatialSystemCanvas';
import { ExpandableNote, StatusLine } from './EditorialUI';

interface ProjectDrawerProps {
  project: ProjectRecord | null;
  onClose: () => void;
}

export function ProjectDrawer({ project, onClose }: ProjectDrawerProps) {
  const [selectedLendingDiagram, setSelectedLendingDiagram] =
    useState<DiagramId>('lending-workflow');

  useEffect(() => {
    if (!project) return;
    setSelectedLendingDiagram(
      project.details.systemArchitecture.diagramId ?? 'lending-workflow'
    );
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [project, onClose]);

  const resultRecord = project ? PROJECT_RESULTS[project.id] : undefined;
  const screenshotSlots =
    project && (project.id === 'ai-lending-lab' || project.id === 'presales-copilot')
      ? PROJECT_IMAGE_SLOTS[project.id]
      : null;

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} Project Details`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-[#0D0814]/88 backdrop-blur-md flex justify-end"
        >
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-4xl h-full overflow-y-auto bg-[#120B1C] border-l border-[rgba(184,164,255,0.22)] p-6 sm:p-10"
          >
            {/* Top Bar */}
            <div className="flex items-start justify-between gap-4 pb-6 border-b border-[rgba(184,164,255,0.16)]">
              <div>
                <StatusLine
                  prefix={`Project ${project.indexNumber}`}
                  statusLabel={project.statusLabel}
                  kind={project.statusKind}
                />
                <p className="mt-2 font-mono text-[11px] text-[#B8A4FF]">
                  {project.category}
                </p>
                <h2 className="mt-1.5 font-display text-2xl sm:text-3xl font-semibold text-[#F7F3FB]">
                  {project.title}
                </h2>
                <p className="mt-1 text-sm text-[#9687AF]">{project.subtitle}</p>

                {!project.hideLinks && (project.liveDemoUrl || project.githubUrl) && (
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    {project.liveDemoUrl && (
                      <a
                        href={project.liveDemoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 bg-gradient-to-r from-[#D96BFF] to-[#FF6B57] hover:brightness-110 text-[#0D0814] font-semibold px-4 py-2 text-xs sm:text-sm min-h-[40px]"
                      >
                        <span>View Live Demo</span>
                        <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 border border-[rgba(184,164,255,0.3)] bg-[#160E22] hover:border-[#D96BFF] text-[#F7F3FB] font-medium px-4 py-2 text-xs sm:text-sm min-h-[40px]"
                      >
                        <span>View GitHub</span>
                        <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                      </a>
                    )}
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close project details"
                className="w-11 h-11 flex items-center justify-center border border-[rgba(184,164,255,0.24)] bg-[#160E22] text-[#F7F3FB] hover:border-[#D96BFF] shrink-0 cursor-pointer"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <div className="py-8 space-y-10">
              {/* Plain-English 4-Question Overview */}
              <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="border border-[rgba(184,164,255,0.16)] bg-[#160E22] p-5">
                  <p className="font-mono text-xs text-[#E79EFF] mb-2">
                    What problem made me build it?
                  </p>
                  <p className="text-sm leading-[1.65] text-[#C6B9DA]">
                    {project.plainEnglishOverview.problem}
                  </p>
                </div>
                <div className="border border-[rgba(184,164,255,0.16)] bg-[#160E22] p-5">
                  <p className="font-mono text-xs text-[#B8A4FF] mb-2">
                    What does the application do?
                  </p>
                  <p className="text-sm leading-[1.65] text-[#C6B9DA]">
                    {project.plainEnglishOverview.whatItDoes}
                  </p>
                </div>
                <div className="border border-[rgba(184,164,255,0.16)] bg-[#160E22] p-5">
                  <p className="font-mono text-xs text-[#FF6B57] mb-2">
                    What was challenging?
                  </p>
                  <p className="text-sm leading-[1.65] text-[#C6B9DA]">
                    {project.plainEnglishOverview.challenge}
                  </p>
                </div>
                <div className="border border-[rgba(217,107,255,0.26)] bg-[#160E22] p-5">
                  <p className="font-mono text-xs text-[#E79EFF] mb-2">
                    What did I achieve or learn?
                  </p>
                  <p className="text-sm leading-[1.65] text-[#F7F3FB]">
                    {project.plainEnglishOverview.achievement}
                  </p>
                </div>
              </section>

              {/* Prepared Screenshot Slots */}
              {screenshotSlots && (
                <section>
                  <ProjectScreenshotSlots
                    projectName={project.shortTitle}
                    slots={screenshotSlots}
                  />
                </section>
              )}

              {/* System Diagram */}
              <section>
                <div className="flex flex-wrap items-baseline justify-between gap-3 mb-4">
                  <h3 className="font-display text-lg font-semibold text-[#F7F3FB]">
                    How It Works
                  </h3>
                  <span className="font-mono text-xs text-[#E79EFF]">
                    {project.details.systemArchitecture.label}
                  </span>
                </div>

                <p className="text-sm leading-[1.68] text-[#C6B9DA] mb-5">
                  {project.details.systemArchitecture.summary}
                </p>

                {project.id === 'ai-lending-lab' && (
                  <div className="space-y-5">
                    <div className="flex flex-wrap gap-2">
                      {(
                        [
                          { id: 'lending-workflow', label: '01 Full Workflow' },
                          { id: 'decision-boundary', label: '02 Verified Answers Only' },
                          { id: 'consent-state-flow', label: '03 Duplicate Prevention' },
                        ] as const
                      ).map((tab) => (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() => setSelectedLendingDiagram(tab.id)}
                          className={`px-3 py-1.5 text-xs font-mono border cursor-pointer ${
                            selectedLendingDiagram === tab.id
                              ? 'bg-[#D96BFF] text-[#0D0814] font-semibold border-transparent'
                              : 'bg-[#160E22] text-[#C6B9DA] border-[rgba(184,164,255,0.2)] hover:border-[#D96BFF]'
                          }`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>

                    <ArchitectureDiagramCanvas diagramId={selectedLendingDiagram} />
                    <LendingReliabilityHarnessPreview />
                  </div>
                )}

                {project.id === 'presales-copilot' && (
                  <ArchitectureDiagramCanvas diagramId="document-verification" />
                )}

                {project.isConfidential && (
                  <div className="space-y-4">
                    <OemAbstractTopology />
                    <div className="border border-[rgba(255,107,87,0.3)] bg-[#2A131E]/75 p-4 text-xs text-[#FF9D8E] flex items-start gap-2.5">
                      <Lock className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{project.details.systemArchitecture.withheldNotice}</span>
                    </div>
                  </div>
                )}
              </section>

              {/* What I Built */}
              {project.details.whatIBuilt.implementedItems && (
                <section className="border border-[rgba(217,107,255,0.28)] bg-[#160E22] p-5">
                  <p className="font-mono text-xs text-[#E79EFF] mb-3">
                    Key Parts Built
                  </p>
                  <ul className="space-y-2 text-xs sm:text-sm text-[#C6B9DA]">
                    {project.details.whatIBuilt.implementedItems.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="text-[#E79EFF]">+</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Decisions & Trade-offs */}
              <section className="space-y-3">
                <h3 className="font-display text-lg font-semibold text-[#F7F3FB]">
                  Key Engineering Decisions
                </h3>
                {project.details.decisionsAndTradeoffs.map((d) => (
                  <ExpandableNote key={d.decision} title={d.decision} defaultOpen={false}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="font-mono text-[11px] text-[#E79EFF] mb-1">Why I chose this</p>
                        <p>{d.rationale}</p>
                      </div>
                      <div>
                        <p className="font-mono text-[11px] text-[#FF6B57] mb-1">Trade-off</p>
                        <p>{d.tradeoff}</p>
                      </div>
                    </div>
                  </ExpandableNote>
                ))}
              </section>

              {/* Testing, Results & Limits */}
              <section className="border border-[rgba(184,164,255,0.16)] bg-[#160E22] p-5 space-y-4">
                <div>
                  <p className="font-mono text-xs text-[#E79EFF] mb-1">
                    How It Was Checked
                  </p>
                  <p className="text-sm text-[#C6B9DA] leading-[1.6]">
                    {project.details.verificationApproach}
                  </p>
                </div>
                <div className="pt-3 border-t border-[rgba(184,164,255,0.12)]">
                  <p className="font-mono text-xs text-[#FF6B57] mb-1">
                    Results &amp; Scope
                  </p>
                  <p className="text-sm text-[#F7F3FB]">
                    {resultRecord?.statusText ?? project.details.results.statusLabel}
                  </p>
                  {resultRecord?.metrics && resultRecord.metrics.length > 0 && (
                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {resultRecord.metrics.map((m) => (
                        <div
                          key={m.label}
                          className="border border-[rgba(184,164,255,0.14)] bg-[#0D0814] p-3"
                        >
                          <p className="font-mono text-[11px] text-[#9687AF]">{m.label}</p>
                          <p className="mt-1 text-sm font-semibold text-[#E79EFF]">{m.value}</p>
                          <p className="mt-0.5 text-[11px] text-[#C6B9DA]">{m.verificationMethod}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="pt-3 border-t border-[rgba(184,164,255,0.12)]">
                  <p className="font-mono text-xs text-[#9687AF] mb-2">Important Limits</p>
                  <ul className="space-y-1.5 text-xs text-[#C6B9DA]">
                    {project.details.limitations.map((lim) => (
                      <li key={lim}>— {lim}</li>
                    ))}
                  </ul>
                </div>
              </section>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
