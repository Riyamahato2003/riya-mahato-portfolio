import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import {
  ProjectStatusKind,
  RoutePath,
  getVisibleProjects,
} from '../data/portfolio';
import { OemAbstractTopology } from '../components/SpatialSystemCanvas';
import { PageHeader, StatusLine } from '../components/EditorialUI';

interface WorkPageProps {
  onNavigate: (path: RoutePath) => void;
}

type FilterOption = 'all' | ProjectStatusKind;

export function WorkPage({ onNavigate }: WorkPageProps) {
  const [filter, setFilter] = useState<FilterOption>('all');
  const allProjects = getVisibleProjects();

  const filteredProjects =
    filter === 'all'
      ? allProjects
      : allProjects.filter((p) => p.statusKind === filter);

  const filterTabs: { id: FilterOption; label: string }[] = [
    { id: 'all', label: `All Projects (${allProjects.length})` },
    { id: 'built-tested', label: 'Tested Prototypes' },
    { id: 'live-prototype', label: 'Live Demo' },
    { id: 'confidential', label: 'Confidential' },
  ];

  return (
    <div>
      <PageHeader
        indexCode="02"
        sectionLabel="Selected Work"
        title="Projects & Applied AI Work"
        lead="Projects built to solve real workflow problems — showing what problem sparked each build, how it works, what was challenging, and honest test results."
        metaRight={`${allProjects.length} Projects`}
      />

      <div className="py-6 border-b border-[rgba(184,164,255,0.16)] flex flex-wrap items-center justify-between gap-4">
        <div
          role="group"
          aria-label="Filter projects by status"
          className="inline-flex flex-wrap gap-1 p-1 bg-[#160E22] border border-[rgba(184,164,255,0.2)]"
        >
          {filterTabs.map((tab) => {
            const active = filter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter(tab.id)}
                aria-pressed={active}
                className={`relative px-3.5 py-2 text-xs font-medium transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer min-h-[36px] ${
                  active
                    ? 'text-[#0D0814] font-semibold'
                    : 'text-[#C6B9DA] hover:text-[#F7F3FB]'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="work-filter-pill"
                    transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                    className="absolute inset-0 bg-gradient-to-r from-[#D96BFF] to-[#FF6B57]"
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>

        <p className="font-mono text-xs text-[#9687AF]">
          Open any project for diagrams, decisions, and screenshot slots
        </p>
      </div>

      {filteredProjects.length === 0 ? (
        <div className="my-12 border border-[rgba(184,164,255,0.2)] bg-[#160E22] p-10 text-center">
          <p className="font-display text-lg text-[#F7F3FB]">
            No projects match this filter.
          </p>
          <button
            type="button"
            onClick={() => setFilter('all')}
            className="mt-4 border border-[rgba(184,164,255,0.28)] px-4 py-2 text-sm text-[#F7F3FB] hover:border-[#D96BFF] cursor-pointer"
          >
            Show All Projects
          </button>
        </div>
      ) : (
        <div className="mt-10 space-y-8">
          {filteredProjects.map((project) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="border border-[rgba(184,164,255,0.18)] hover:border-[rgba(217,107,255,0.42)] bg-[#160E22]/90 p-6 sm:p-8 lg:p-10 transition-colors"
            >
              <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-3 pb-5 border-b border-[rgba(184,164,255,0.14)]">
                <StatusLine
                  prefix={`Project ${project.indexNumber}`}
                  statusLabel={project.statusLabel}
                  kind={project.statusKind}
                />
                {project.confidentialityNotice && (
                  <span className="font-mono text-xs text-[#FF6B57]">
                    {project.confidentialityNotice}
                  </span>
                )}
              </div>

              <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                <div className="lg:col-span-7">
                  <p className="font-mono text-[11px] text-[#B8A4FF] mb-2">
                    {project.category}
                  </p>
                  <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#F7F3FB] leading-[1.15]">
                    {project.title}
                  </h2>
                  <p className="mt-2 text-sm text-[#9687AF]">{project.subtitle}</p>
                  <p className="mt-5 text-[15px] sm:text-base leading-[1.68] text-[#C6B9DA]">
                    {project.summary}
                  </p>

                  {project.isConfidential && (
                    <div className="mt-6">
                      <OemAbstractTopology />
                    </div>
                  )}

                  <div className="mt-6 pt-5 border-t border-[rgba(184,164,255,0.12)]">
                    <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-[#9687AF] mb-2">
                      Tools Used
                    </p>
                    <p className="font-mono text-xs text-[#E79EFF] leading-[1.8]">
                      {project.stack.join(' · ')}
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-5 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-[rgba(184,164,255,0.14)] pt-6 lg:pt-0 lg:pl-8">
                  <div>
                    <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-[#9687AF] mb-3">
                      What It Focuses On
                    </p>
                    <ul className="space-y-2.5 text-sm text-[#C6B9DA]">
                      {project.themes.map((theme) => (
                        <li key={theme} className="flex items-start gap-2.5">
                          <span aria-hidden="true" className="font-mono text-xs text-[#E79EFF] mt-0.5">
                            —
                          </span>
                          <span>{theme}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 pt-5 border-t border-[rgba(184,164,255,0.14)] flex flex-wrap items-center gap-3">
                    {!project.hideLinks && project.liveDemoUrl && (
                      <a
                        href={project.liveDemoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 bg-gradient-to-r from-[#D96BFF] to-[#FF6B57] text-[#0D0814] font-semibold px-4 py-2.5 text-sm min-h-[44px]"
                      >
                        <span>View Live Demo</span>
                        <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                      </a>
                    )}
                    {!project.hideLinks && project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 border border-[rgba(184,164,255,0.28)] bg-[#1F1530] hover:border-[#D96BFF] text-[#F7F3FB] font-medium px-4 py-2.5 text-sm min-h-[44px]"
                      >
                        <span>View GitHub</span>
                        <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={() => onNavigate(`/work/${project.slug}`)}
                      className="inline-flex items-center gap-2 border border-[rgba(184,164,255,0.28)] bg-[#160E22] hover:border-[#D96BFF] px-4 py-2.5 text-sm font-medium text-[#E79EFF] transition-all duration-150 whitespace-nowrap shrink-0 min-h-[44px] cursor-pointer"
                    >
                      <span>Open Full Details</span>
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </button>
                    {project.hideLinks && (
                      <span className="font-mono text-[11px] text-[#9687AF]">
                        Code &amp; demo withheld (NDA)
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      )}
    </div>
  );
}
