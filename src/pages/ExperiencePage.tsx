import React from 'react';
import {
  EDUCATION_DATA,
  EXPERIENCE_DATA,
  PORTFOLIO_CONFIG,
  RoutePath,
} from '../data/portfolio';
import { ExperiencePhotoGallery } from '../components/PhotographyGallery';
import {
  ActionLink,
  MotionSection,
  PageHeader,
  SectionHeading,
} from '../components/EditorialUI';

interface ExperiencePageProps {
  onNavigate: (path: RoutePath) => void;
}

const EXPERIENCE_PILLARS = [
  {
    code: '01 · Customers',
    title: 'Understanding Customer Needs',
    detail:
      'Running discovery conversations with researchers and engineers to translate tricky problems into clear technical requirements.',
  },
  {
    code: '02 · Partners',
    title: 'International Partner Coordination',
    detail:
      'Working directly with international technology makers to verify compatibility, specifications, and technical answers.',
  },
  {
    code: '03 · Opportunities',
    title: 'Complex Technical Deals',
    detail:
      'Supporting £1.9M+ in active institutional opportunities, including £700K+ and £1.2M+ multi-system requirements.',
  },
  {
    code: '04 · Internal AI',
    title: 'Building Practical AI Systems',
    detail:
      'Creating AI Systems that make reading datasheets, checking specifications, and preparing proposals faster and more reliable.',
  },
];

export function ExperiencePage({ onNavigate }: ExperiencePageProps) {
  return (
    <div>
      <PageHeader
        indexCode="04"
        sectionLabel="Experience"
        title="Technical Sales Engineering & Customer Work"
        lead="Working directly with customers, international technology partners, and internal AI workflows in New Delhi."
        metaRight="NB Instrument Pvt. Ltd. · New Delhi"
      />

      <MotionSection className="py-10 border-b border-[rgba(184,164,255,0.16)]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {EXPERIENCE_PILLARS.map((pillar) => (
            <div
              key={pillar.code}
              className="border border-[rgba(184,164,255,0.18)] bg-[#160E22]/90 p-5 flex flex-col justify-between"
            >
              <div>
                <p className="font-mono text-[11px] text-[#E79EFF] mb-2">
                  {pillar.code}
                </p>
                <h2 className="font-display text-lg font-semibold text-[#F7F3FB] leading-[1.25]">
                  {pillar.title}
                </h2>
              </div>
              <p className="mt-3 text-xs sm:text-[13px] leading-[1.6] text-[#C6B9DA]">
                {pillar.detail}
              </p>
            </div>
          ))}
        </div>
      </MotionSection>

      {/* Real Meeting & Partner Session Photos */}
      <MotionSection className="py-14 border-b border-[rgba(184,164,255,0.16)]">
        <ExperiencePhotoGallery />
      </MotionSection>

      {/* Role Records */}
      <MotionSection className="py-14 border-b border-[rgba(184,164,255,0.16)]">
        <SectionHeading
          number="01"
          title="Work History"
          aside="July 2025 – Present"
        />

        <div className="space-y-8">
          {EXPERIENCE_DATA.map((role) => (
            <article
              key={role.id}
              className="border border-[rgba(184,164,255,0.18)] bg-[#160E22]/90 p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8"
            >
              <div className="lg:col-span-4">
                <p className="font-mono text-xs text-[#9687AF] tabular-nums">
                  {role.indexNumber} · {role.location}
                </p>
                <h3 className="mt-2 font-display text-xl sm:text-2xl font-semibold text-[#F7F3FB]">
                  {role.role}
                </h3>
                {role.promotionNote && (
                  <p className="mt-1.5 font-mono text-xs text-[#B8A4FF]">
                    {role.promotionNote}
                  </p>
                )}
                <p className="mt-2 text-sm font-medium text-[#E79EFF]">
                  {role.organization}
                </p>
                <p className="mt-2 font-mono text-xs text-[#C6B9DA]">
                  {role.dates}
                </p>
              </div>

              <div className="lg:col-span-8 border-t lg:border-t-0 lg:border-l border-[rgba(184,164,255,0.14)] pt-6 lg:pt-0 lg:pl-8">
                {role.contextNote && (
                  <div className="mb-5 border border-[rgba(217,107,255,0.24)] bg-[#0D0814]/80 p-4 text-sm leading-[1.6] text-[#C6B9DA]">
                    <p>{role.contextNote}</p>
                  </div>
                )}

                <ul className="space-y-3 text-sm sm:text-[15px] leading-[1.68] text-[#C6B9DA]">
                  {role.responsibilities.map((item) => (
                    <li key={item.heading} className="flex items-start gap-3">
                      <span aria-hidden="true" className="font-mono text-xs text-[#E79EFF] mt-1">
                        —
                      </span>
                      <span>
                        <strong className="text-[#F7F3FB] font-medium">
                          {item.heading}:{' '}
                        </strong>
                        {item.detail}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 border border-[rgba(184,164,255,0.2)] bg-[linear-gradient(120deg,rgba(217,107,255,0.08),rgba(255,107,87,0.05))] p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="font-mono text-xs text-[#E79EFF] font-medium tabular-nums">
              Active Pipeline · {PORTFOLIO_CONFIG.activePipelineLabel}
            </p>
            <p className="mt-1 text-sm text-[#C6B9DA] max-w-2xl leading-[1.6]">
              {PORTFOLIO_CONFIG.activePipelineNote}
            </p>
          </div>
          <ActionLink variant="secondary" onClick={() => onNavigate('/work')}>
            View Related Projects
          </ActionLink>
        </div>
      </MotionSection>

      {/* Education */}
      <MotionSection className="py-14">
        <SectionHeading number="02" title="Education" />

        <div className="border border-[rgba(184,164,255,0.18)] bg-[#160E22]/90 p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5">
            <p className="font-mono text-xs text-[#E79EFF] tabular-nums">
              {EDUCATION_DATA.expectedGraduation}
            </p>
            <h3 className="mt-2 font-display text-xl sm:text-2xl font-semibold text-[#F7F3FB] leading-[1.25]">
              {EDUCATION_DATA.degree}
            </h3>
            <p className="mt-2 text-sm font-medium text-[#C6B9DA]">
              {EDUCATION_DATA.institution}
            </p>
          </div>

          <div className="lg:col-span-7 border-t lg:border-t-0 lg:border-l border-[rgba(184,164,255,0.14)] pt-6 lg:pt-0 lg:pl-8 flex items-center">
            <p className="text-[15px] leading-[1.7] text-[#C6B9DA]">
              {EDUCATION_DATA.focusNote}
            </p>
          </div>
        </div>
      </MotionSection>
    </div>
  );
}
