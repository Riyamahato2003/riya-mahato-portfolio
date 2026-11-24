import React from 'react';
import { Mail, ArrowUpRight, Phone } from 'lucide-react';
import { SITE_META } from '../data/portfolio';
import {
  CopyButton,
  MotionSection,
  PageHeader,
  SectionHeading,
} from '../components/EditorialUI';

const INQUIRY_TEMPLATE = `Subject: Applied AI / Technical Solutions Conversation

Hi Riya,

I saw your portfolio and wanted to connect about [Role / Project / Idea].

A few quick details:
- Team / company:
- What we're working on:
- Good time for a quick chat:`;

export function ContactPage() {
  return (
    <div>
      <PageHeader
        indexCode="06"
        sectionLabel="Contact"
        title="Have something interesting to build? Let's talk."
        lead="If you're working on AI products, applied engineering, or technical solutions and want to connect, feel free to reach out."
        metaRight={SITE_META.location}
      />

      <MotionSection className="py-12 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-10">
        <section className="lg:col-span-7">
          <SectionHeading number="01" title="Ways to Reach Me" />

          <div className="divide-y divide-[rgba(184,164,255,0.14)] border border-[rgba(184,164,255,0.18)] bg-[#160E22]/90">
            {/* Email Row */}
            <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-[#9687AF]">
                  Email
                </p>
                <a
                  href={`mailto:${SITE_META.email}`}
                  className="mt-1.5 inline-flex items-center gap-2 font-display text-xl text-[#F7F3FB] hover:text-[#E79EFF] underline underline-offset-4 decoration-[rgba(184,164,255,0.3)] hover:decoration-[#E79EFF]"
                >
                  <Mail className="w-4 h-4 text-[#E79EFF] shrink-0" aria-hidden="true" />
                  <span>{SITE_META.email}</span>
                </a>
              </div>
              <CopyButton text={SITE_META.email} label="Copy email" copiedLabel="Email copied" />
            </div>

            {/* Phone Row */}
            <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-[#9687AF]">
                  Phone
                </p>
                <a
                  href={`tel:${SITE_META.phone.replace(/\s+/g, '')}`}
                  className="mt-1.5 inline-flex items-center gap-2 font-display text-xl text-[#F7F3FB] hover:text-[#E79EFF]"
                >
                  <Phone className="w-4 h-4 text-[#E79EFF] shrink-0" aria-hidden="true" />
                  <span>{SITE_META.phone}</span>
                </a>
              </div>
              <CopyButton text={SITE_META.phone} label="Copy phone" copiedLabel="Phone copied" />
            </div>

            {/* GitHub Row */}
            <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-[#9687AF]">
                  GitHub
                </p>
                <p className="mt-1.5 text-sm text-[#C6B9DA]">
                  github.com/Riyamahato2003
                </p>
              </div>
              <a
                href={SITE_META.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-[rgba(184,164,255,0.24)] bg-[#1F1530] hover:border-[#D96BFF] px-4 py-2 text-sm font-medium text-[#F7F3FB] transition-colors whitespace-nowrap shrink-0 min-h-[42px]"
              >
                <span>Open GitHub</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>

            {/* LinkedIn Row */}
            <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-[#9687AF]">
                  LinkedIn
                </p>
                <p className="mt-1.5 text-sm text-[#C6B9DA]">
                  linkedin.com/in/riyamahato
                </p>
              </div>
              <a
                href={SITE_META.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-[rgba(184,164,255,0.24)] bg-[#1F1530] hover:border-[#D96BFF] px-4 py-2 text-sm font-medium text-[#F7F3FB] transition-colors whitespace-nowrap shrink-0 min-h-[42px]"
              >
                <span>Open LinkedIn</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        <aside className="lg:col-span-5">
          <SectionHeading number="02" title="Quick Message Template" />
          <div className="border border-[rgba(184,164,255,0.18)] bg-[#160E22]/90 p-6">
            <p className="text-sm text-[#C6B9DA] leading-[1.6] mb-4">
              Copy this quick template or open your email app directly.
            </p>
            <pre className="border border-[rgba(184,164,255,0.14)] bg-[#0D0814] p-4 font-mono text-xs text-[#F7F3FB] leading-[1.65] whitespace-pre-wrap overflow-x-auto">
              {INQUIRY_TEMPLATE}
            </pre>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <CopyButton
                text={INQUIRY_TEMPLATE}
                label="Copy template"
                copiedLabel="Template copied"
              />
              <a
                href={`mailto:${SITE_META.email}?subject=${encodeURIComponent(
                  'Applied AI / Technical Solutions Conversation'
                )}`}
                className="inline-flex items-center justify-center bg-gradient-to-r from-[#D96BFF] to-[#FF6B57] hover:brightness-110 text-[#0D0814] font-semibold px-4 py-2 text-sm transition-all min-h-[42px] whitespace-nowrap shrink-0"
              >
                Email Me
              </a>
            </div>
          </div>
        </aside>
      </MotionSection>
    </div>
  );
}
