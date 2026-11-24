import React from 'react';
import { ABOUT_NARRATIVE, EDUCATION_DATA, RoutePath } from '../data/portfolio';
import { AboutPhotoFrame } from '../components/PhotographyGallery';
import {
  ActionLink,
  MotionSection,
  PageHeader,
  SectionHeading,
} from '../components/EditorialUI';

interface AboutPageProps {
  onNavigate: (path: RoutePath) => void;
}

export function AboutPage({ onNavigate }: AboutPageProps) {
  return (
    <div>
      <PageHeader
        indexCode="05"
        sectionLabel="About"
        title={ABOUT_NARRATIVE.lead}
        lead={`${EDUCATION_DATA.degree} · ${EDUCATION_DATA.institution} (${EDUCATION_DATA.expectedGraduation})`}
        metaRight="New Delhi, India"
      />

      <MotionSection className="py-12 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <article className="lg:col-span-7 space-y-10">
          {ABOUT_NARRATIVE.sections.map((section, idx) => (
            <section key={section.heading}>
              <h2 className="font-display text-2xl sm:text-[1.75rem] font-semibold text-[#F7F3FB] mb-4">
                {section.heading}
              </h2>
              <div className="space-y-4 text-[15.5px] sm:text-base leading-[1.78] text-[#C6B9DA] max-w-[66ch]">
                {section.paragraphs.map((para, pIdx) => (
                  <p
                    key={para}
                    className={
                      idx === 0 && pIdx === 0
                        ? 'first-letter:font-display first-letter:text-4xl first-letter:font-semibold first-letter:float-left first-letter:mr-3 first-letter:leading-[0.9] first-letter:text-[#E79EFF]'
                        : ''
                    }
                  >
                    {para}
                  </p>
                ))}
              </div>
            </section>
          ))}

          <div className="pt-6 border-t border-[rgba(184,164,255,0.16)] flex flex-wrap gap-3">
            <ActionLink variant="primary" onClick={() => onNavigate('/work')}>
              Explore My Work
            </ActionLink>
            <ActionLink variant="secondary" onClick={() => onNavigate('/contact')}>
              Get in Touch
            </ActionLink>
          </div>
        </article>

        <aside className="lg:col-span-5 lg:border-l border-[rgba(184,164,255,0.16)] lg:pl-10 space-y-8">
          <AboutPhotoFrame />

          <div>
            <SectionHeading number="01" title="How I Think About Software" />
            <div className="space-y-4">
              {ABOUT_NARRATIVE.principles.map((p) => (
                <div
                  key={p.index}
                  className="border border-[rgba(184,164,255,0.18)] bg-[#160E22]/90 p-5"
                >
                  <p className="font-mono text-xs text-[#E79EFF] tabular-nums mb-1.5">
                    {p.index}
                  </p>
                  <h3 className="font-display text-lg font-semibold text-[#F7F3FB]">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-[1.6] text-[#C6B9DA]">
                    {p.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </MotionSection>
    </div>
  );
}
