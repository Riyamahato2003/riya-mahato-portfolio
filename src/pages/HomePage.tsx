import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import {
  EDUCATION_DATA,
  PORTFOLIO_CONFIG,
  RoutePath,
  SITE_META,
  getVisibleProjects,
} from '../data/portfolio';
import { SpatialSystemCanvas } from '../components/SpatialSystemCanvas';
import { HeroVerityPreview } from '../components/PhotographyGallery';
import { MethodologyDiagram } from '../components/ArchitectureDiagrams';
import {
  ActionLink,
  MotionSection,
  SectionHeading,
  StatusLine,
} from '../components/EditorialUI';

interface HomePageProps {
  onNavigate: (path: RoutePath) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const projects = getVisibleProjects();

  return (
    <div>
      {/* Hero Section */}
      <section className="min-h-[calc(100vh-4.5rem)] flex flex-col justify-between pt-8 md:pt-12 pb-12 border-b border-[rgba(184,164,255,0.16)]">
        <div className="flex flex-wrap items-baseline justify-between gap-4 pb-5 border-b border-[rgba(184,164,255,0.12)] mb-8 lg:mb-10">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="font-mono text-xs tracking-[0.16em] uppercase text-[#F7F3FB] font-medium">
              {SITE_META.name}
            </span>
            <span aria-hidden="true" className="text-[#9687AF]">·</span>
            <span className="text-sm text-[#C6B9DA]">{SITE_META.role}</span>
          </div>
          <span className="font-mono text-xs text-[#9687AF]">
            {SITE_META.location} · Open to opportunities
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-10 items-center my-auto">
          <div className="lg:col-span-6">
            <p className="font-mono text-xs tracking-[0.14em] uppercase text-[#E79EFF] mb-4">
              {SITE_META.name}
            </p>

            <h1 className="font-display text-[2.35rem] sm:text-[3.15rem] lg:text-[3.65rem] font-semibold tracking-[-0.03em] leading-[1.04] text-[#F7F3FB]">
              {SITE_META.primaryStatement}
            </h1>

            <p className="mt-6 text-base sm:text-lg leading-[1.68] text-[#C6B9DA] max-w-[58ch]">
              {SITE_META.supportingCopy} {SITE_META.secondaryCopy}
            </p>

            <div className="mt-8 pt-6 border-t border-[rgba(184,164,255,0.14)] flex flex-wrap items-center gap-3 sm:gap-4">
              <ActionLink variant="primary" onClick={() => onNavigate('/work')}>
                Explore My Work
              </ActionLink>
              <ActionLink variant="secondary" href={SITE_META.githubUrl} external>
                View GitHub
              </ActionLink>
              <ActionLink variant="secondary" onClick={() => onNavigate('/experience')}>
                Experience
              </ActionLink>
              <ActionLink variant="text" onClick={() => onNavigate('/contact')}>
                Get in Touch
              </ActionLink>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-5">
            <HeroVerityPreview onOpenProject={() => onNavigate('/work/ai-lending-reliability-lab')} />
            <SpatialSystemCanvas />
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-[rgba(184,164,255,0.16)] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-[#9687AF]">
              Current Role
            </p>
            <p className="mt-1.5 text-sm font-semibold text-[#F7F3FB]">
              Technical Sales Engineer
            </p>
            <p className="text-xs text-[#C6B9DA] mt-0.5">
              NB Instrument Pvt. Ltd. · Jan 2026 – Present
            </p>
          </div>

          <div>
            <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-[#9687AF]">
              Opportunity Scope
            </p>
            <p className="mt-1.5 text-sm font-semibold text-[#F7F3FB] tabular-nums">
              {PORTFOLIO_CONFIG.activePipelineLabel}
            </p>
            <p className="text-xs text-[#C6B9DA] mt-0.5">
              £700K+ and £1.2M+ multi-system scope
            </p>
          </div>

          <div>
            <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-[#9687AF]">
              Focus
            </p>
            <p className="mt-1.5 text-sm font-semibold text-[#F7F3FB]">
              Practical, Reliable AI Apps
            </p>
            <p className="text-xs text-[#C6B9DA] mt-0.5">
              Verified answers + human review
            </p>
          </div>

          <div>
            <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-[#9687AF]">
              Education
            </p>
            <p className="mt-1.5 text-sm font-semibold text-[#F7F3FB]">
              B.Tech CSE (AI &amp; ML)
            </p>
            <p className="text-xs text-[#C6B9DA] mt-0.5">
              {EDUCATION_DATA.institution} · {EDUCATION_DATA.expectedGraduation}
            </p>
          </div>
        </div>
      </section>

      {/* Selected Work Showcase */}
      <MotionSection className="py-16 md:py-20 border-b border-[rgba(184,164,255,0.16)]">
        <SectionHeading
          number="01"
          title="Selected Work"
          aside="Clear goals, real prototypes, and honest test results"
        />

        <div className="space-y-5">
          {projects.map((project, idx) => (
            <motion.article
              key={project.id}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="group border border-[rgba(184,164,255,0.18)] hover:border-[rgba(217,107,255,0.48)] bg-[#160E22]/85 p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start transition-colors duration-200"
            >
              <div className="lg:col-span-4">
                <StatusLine
                  prefix={`Project ${project.indexNumber}`}
                  statusLabel={project.statusLabel}
                  kind={project.statusKind}
                />
                <p className="mt-2 font-mono text-[11px] text-[#B8A4FF]">
                  {project.category}
                </p>
                <h3 className="mt-2 font-display text-xl sm:text-2xl font-semibold text-[#F7F3FB] group-hover:text-[#E79EFF] transition-colors leading-[1.2]">
                  {project.title}
                </h3>
                <p className="mt-2 text-xs text-[#9687AF] leading-[1.55]">
                  {project.subtitle}
                </p>
              </div>

              <div className="lg:col-span-5">
                <p className="text-sm sm:text-[15px] leading-[1.68] text-[#C6B9DA]">
                  {project.summary}
                </p>
                {project.confidentialityNotice && (
                  <p className="mt-3 font-mono text-xs text-[#FF6B57]">
                    {project.confidentialityNotice}
                  </p>
                )}
                <p className="mt-4 font-mono text-xs text-[#9687AF] leading-[1.6]">
                  {project.stack.slice(0, 6).join(' · ')}
                  {project.stack.length > 6 ? ' · ...' : ''}
                </p>
              </div>

              <div className="lg:col-span-3 flex flex-wrap lg:justify-end items-start gap-2.5">
                {!project.hideLinks && project.liveDemoUrl && (
                  <a
                    href={project.liveDemoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-gradient-to-r from-[#D96BFF] to-[#FF6B57] text-[#0D0814] font-semibold px-3.5 py-2 text-xs min-h-[40px]"
                  >
                    <span>Live Demo</span>
                    <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => onNavigate(`/work/${project.slug}`)}
                  className="inline-flex items-center gap-2 border border-[rgba(184,164,255,0.28)] bg-[#1F1530] hover:border-[#D96BFF] px-4 py-2 text-xs sm:text-sm font-medium text-[#F7F3FB] transition-all duration-150 whitespace-nowrap shrink-0 min-h-[40px] cursor-pointer"
                >
                  <span>Project 0{idx + 1}</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-6 flex justify-end">
          <ActionLink variant="text" onClick={() => onNavigate('/work')}>
            View all projects
          </ActionLink>
        </div>
      </MotionSection>

      {/* How I Work */}
      <MotionSection className="py-16 md:py-20">
        <SectionHeading
          number="02"
          title="How I Approach Building Software"
          aside="From customer discovery to tested code"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
          <div className="lg:col-span-7">
            <MethodologyDiagram />
          </div>
          <div className="lg:col-span-5 space-y-4">
            <div className="border border-[rgba(184,164,255,0.18)] bg-[#160E22]/85 p-6">
              <p className="font-mono text-xs text-[#E79EFF] mb-2">
                01 · AI &amp; Full-Stack Building
              </p>
              <p className="text-sm leading-[1.65] text-[#C6B9DA]">
                Python, FastAPI, TypeScript, React, Next.js, PostgreSQL, document AI, and keeping AI outputs tied to facts the system can verify.
              </p>
            </div>

            <div className="border border-[rgba(184,164,255,0.18)] bg-[#160E22]/85 p-6">
              <p className="font-mono text-xs text-[#FF6B57] mb-2">
                02 · Testing &amp; Customer Context
              </p>
              <p className="text-sm leading-[1.65] text-[#C6B9DA]">
                Automated testing with pytest and Playwright, preventing duplicate requests, customer discovery, and coordinating with international partners.
              </p>
            </div>
          </div>
        </div>
      </MotionSection>
    </div>
  );
}
