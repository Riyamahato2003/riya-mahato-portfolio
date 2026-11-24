import React from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Lock } from 'lucide-react';
import {
  ProjectRecord,
  RoutePath,
  getVisibleProjects,
} from '../data/portfolio';
import { PROJECT_RESULTS } from '../data/results';
import { PROJECT_IMAGE_SLOTS } from '../data/photography';
import {
  ArchitectureDiagramCanvas,
  LendingReliabilityHarnessPreview,
} from '../components/ArchitectureDiagrams';
import { ProjectScreenshotSlots } from '../components/PhotographyGallery';
import { OemAbstractTopology } from '../components/SpatialSystemCanvas';
import {
  ExpandableNote,
  MotionSection,
  SectionHeading,
  StatusLine,
} from '../components/EditorialUI';

interface ProjectDetailPageProps {
  project: ProjectRecord;
  onNavigate: (path: RoutePath) => void;
}

export function ProjectDetailPage({ project, onNavigate }: ProjectDetailPageProps) {
  const visibleProjects = getVisibleProjects();
  const currentIdx = visibleProjects.findIndex((p) => p.slug === project.slug);
  const prevProject = currentIdx > 0 ? visibleProjects[currentIdx - 1] : null;
  const nextProject =
    currentIdx >= 0 && currentIdx < visibleProjects.length - 1
      ? visibleProjects[currentIdx + 1]
      : null;

  const { details } = project;
  const resultRecord = PROJECT_RESULTS[project.id];
  const screenshotSlots =
    project.id === 'ai-lending-lab' || project.id === 'presales-copilot'
      ? PROJECT_IMAGE_SLOTS[project.id]
      : null;

  return (
    <div>
      <div className="pt-8 pb-4">
        <button
          type="button"
          onClick={() => onNavigate('/work')}
          className="inline-flex items-center gap-2 text-sm text-[#C6B9DA] hover:text-[#E79EFF] py-2 cursor-pointer transition-colors"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>Back to Selected Work</span>
        </button>
      </div>

      <header className="border-b border-[rgba(184,164,255,0.16)] pb-10">
        <div className="flex flex-wrap items-baseline justify-between gap-4 mb-4">
          <StatusLine
            prefix={`Project ${project.indexNumber}`}
            statusLabel={project.statusLabel}
            kind={project.statusKind}
          />
          {project.confidentialityNotice && (
            <span className="inline-flex items-center gap-1.5 font-mono text-xs text-[#FF6B57]">
              <Lock className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{project.confidentialityNotice}</span>
            </span>
          )}
        </div>

        <p className="font-mono text-xs text-[#B8A4FF] mb-2">{project.category}</p>

        <h1 className="font-display text-3xl sm:text-5xl lg:text-[3.25rem] font-semibold tracking-[-0.03em] leading-[1.08] text-[#F7F3FB] max-w-4xl">
          {project.title}
        </h1>
        <p className="mt-4 text-base sm:text-lg text-[#C6B9DA] max-w-3xl leading-[1.62]">
          {project.subtitle}
        </p>

        {!project.hideLinks && (project.liveDemoUrl || project.githubUrl) && (
          <div className="mt-6 flex flex-wrap gap-3">
            {project.liveDemoUrl && (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#D96BFF] to-[#FF6B57] text-[#0D0814] font-semibold px-5 py-2.5 text-sm min-h-[44px]"
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
                className="inline-flex items-center gap-2 border border-[rgba(184,164,255,0.28)] bg-[#1F1530] hover:border-[#D96BFF] text-[#F7F3FB] font-medium px-5 py-2.5 text-sm min-h-[44px]"
              >
                <span>View GitHub</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </a>
            )}
          </div>
        )}
      </header>

      <div className="py-12 space-y-16">
        <MotionSection className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-6">
            <SectionHeading number="01" title="What Problem Made Me Build It" />
            <p className="text-[15px] sm:text-base leading-[1.72] text-[#C6B9DA]">
              {details.problem}
            </p>
          </div>
          <div className="lg:col-span-6">
            <SectionHeading number="02" title="Context" />
            <p className="text-[15px] sm:text-base leading-[1.72] text-[#C6B9DA]">
              {details.context}
            </p>
          </div>
        </MotionSection>

        {screenshotSlots && (
          <MotionSection>
            <SectionHeading number="03" title="Project Screenshots" aside="Ready for real app captures" />
            <ProjectScreenshotSlots projectName={project.shortTitle} slots={screenshotSlots} />
          </MotionSection>
        )}

        <MotionSection>
          <SectionHeading number="04" title="What the Application Does" />
          <p className="text-[15px] sm:text-base leading-[1.72] text-[#C6B9DA] max-w-[72ch]">
            {details.whatIBuilt.summary}
          </p>

          {details.whatIBuilt.withheldNotice && (
            <div className="mt-6 border border-[rgba(255,107,87,0.35)] bg-[#2A131E] p-5 text-sm text-[#FF9D8E] leading-[1.6]">
              {details.whatIBuilt.withheldNotice}
            </div>
          )}

          {details.whatIBuilt.implementedItems && (
            <div className="mt-6 border border-[rgba(217,107,255,0.28)] bg-[#160E22] p-6">
              <p className="font-mono text-xs text-[#E79EFF] font-medium mb-4">
                Key Features Built
              </p>
              <ul className="space-y-3 text-sm leading-[1.6] text-[#C6B9DA]">
                {details.whatIBuilt.implementedItems.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span aria-hidden="true" className="font-mono text-xs text-[#E79EFF] mt-0.5">
                      +
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </MotionSection>

        <MotionSection>
          <SectionHeading
            number="05"
            title="How It Works"
            aside={details.systemArchitecture.label}
          />
          <p className="text-[15px] sm:text-base leading-[1.72] text-[#C6B9DA] max-w-[72ch] mb-6">
            {details.systemArchitecture.summary}
          </p>

          {details.systemArchitecture.diagramId ? (
            <div className="space-y-6">
              <ArchitectureDiagramCanvas diagramId={details.systemArchitecture.diagramId} />
              {project.id === 'ai-lending-lab' && <LendingReliabilityHarnessPreview />}
            </div>
          ) : (
            <div className="space-y-5">
              <OemAbstractTopology />
              <div className="border border-[rgba(255,107,87,0.3)] bg-[#2A131E]/75 p-6 text-sm text-[#C6B9DA]">
                <p className="font-mono text-xs text-[#FF6B57] font-medium mb-2">
                  {details.systemArchitecture.label}
                </p>
                <p className="leading-[1.65]">
                  {details.systemArchitecture.withheldNotice}
                </p>
              </div>
            </div>
          )}
        </MotionSection>

        <MotionSection>
          <SectionHeading number="06" title="What Was Challenging" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {details.difficultProblems.map((prob, index) => (
              <div
                key={prob}
                className="border border-[rgba(184,164,255,0.18)] bg-[#160E22]/90 p-5 flex items-start gap-4"
              >
                <span className="font-mono text-xs text-[#E79EFF] tabular-nums shrink-0 mt-0.5">
                  0{index + 1}
                </span>
                <p className="text-sm leading-[1.65] text-[#C6B9DA]">{prob}</p>
              </div>
            ))}
          </div>
        </MotionSection>

        <MotionSection>
          <SectionHeading number="07" title="Key Decisions & Trade-Offs" />
          <div className="space-y-4">
            {details.decisionsAndTradeoffs.map((item) => (
              <ExpandableNote
                key={item.decision}
                title={item.decision}
                summary="Click to expand why and trade-off"
                defaultOpen={true}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#E79EFF] mb-1.5">
                      Why I chose this
                    </p>
                    <p>{item.rationale}</p>
                  </div>
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#FF6B57] mb-1.5">
                      Trade-off
                    </p>
                    <p>{item.tradeoff}</p>
                  </div>
                </div>
              </ExpandableNote>
            ))}
          </div>
        </MotionSection>

        <MotionSection className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-6">
            <SectionHeading number="08" title="How It Was Tested" />
            <p className="text-[15px] sm:text-base leading-[1.72] text-[#C6B9DA]">
              {details.verificationApproach}
            </p>
          </div>
          <div className="lg:col-span-6">
            <SectionHeading number="09" title="What I Achieved & Learned" />
            <div className="border border-[rgba(184,164,255,0.2)] bg-[#160E22] p-5">
              <p className="font-mono text-xs font-medium text-[#E79EFF] mb-2">
                {resultRecord?.statusText ?? details.results.statusLabel}
              </p>
              <p className="text-sm leading-[1.65] text-[#C6B9DA]">
                {details.results.note}
              </p>
            </div>
          </div>
        </MotionSection>

        <MotionSection className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-6">
            <SectionHeading number="10" title="Important Limits" />
            <ul className="space-y-3 text-sm leading-[1.65] text-[#C6B9DA]">
              {details.limitations.map((lim) => (
                <li key={lim} className="flex items-start gap-2.5">
                  <span aria-hidden="true" className="font-mono text-xs text-[#FF6B57] mt-0.5">
                    —
                  </span>
                  <span>{lim}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-6">
            <SectionHeading number="11" title="Tools Used" />
            <div className="border border-[rgba(184,164,255,0.18)] bg-[#160E22] p-6">
              <p className="font-mono text-sm leading-[1.9] text-[#F7F3FB]">
                {details.stack.join(' · ')}
              </p>
            </div>
          </div>
        </MotionSection>
      </div>

      <nav
        aria-label="Project sequence navigation"
        className="border-t border-[rgba(184,164,255,0.16)] pt-8 grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        <div>
          {prevProject && (
            <button
              type="button"
              onClick={() => onNavigate(`/work/${prevProject.slug}`)}
              className="w-full text-left border border-[rgba(184,164,255,0.18)] bg-[#160E22] hover:border-[#D96BFF] p-5 transition-colors cursor-pointer"
            >
              <span className="font-mono text-xs text-[#9687AF] inline-flex items-center gap-1.5">
                <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Previous ({prevProject.indexNumber})</span>
              </span>
              <span className="block mt-1.5 font-display text-lg font-semibold text-[#F7F3FB]">
                {prevProject.title}
              </span>
            </button>
          )}
        </div>
        <div>
          {nextProject && (
            <button
              type="button"
              onClick={() => onNavigate(`/work/${nextProject.slug}`)}
              className="w-full text-left sm:text-right border border-[rgba(184,164,255,0.18)] bg-[#160E22] hover:border-[#D96BFF] p-5 transition-colors cursor-pointer"
            >
              <span className="font-mono text-xs text-[#9687AF] inline-flex items-center gap-1.5 sm:justify-end">
                <span>Next ({nextProject.indexNumber})</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </span>
              <span className="block mt-1.5 font-display text-lg font-semibold text-[#F7F3FB]">
                {nextProject.title}
              </span>
            </button>
          )}
        </div>
      </nav>
    </div>
  );
}
