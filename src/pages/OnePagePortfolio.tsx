import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowDown,
  ArrowUpRight,
  ChevronRight,
  Layers,
  Lock,
  Mail,
  Phone,
} from 'lucide-react';
import {
  ABOUT_NARRATIVE,
  EDUCATION_DATA,
  EXPERIENCE_DATA,
  PORTFOLIO_CONFIG,
  ProjectRecord,
  SITE_META,
  getVisibleProjects,
} from '../data/portfolio';
import { PhotographyAsset } from '../data/photography';
import {
  DEVELOPING_SKILLS_NOTE,
  SectionId,
  TOOLKIT_CATEGORIES,
} from '../data/toolkit';
import {
  OemAbstractTopology,
  SpatialSystemCanvas,
} from '../components/SpatialSystemCanvas';
import {
  AboutPhotoFrame,
  BeyondTheCodeGallery,
  HeroVerityPreview,
  PhotoLightbox,
} from '../components/PhotographyGallery';
import { ProjectDrawer } from '../components/ProjectDrawer';
import { CopyButton, MotionSection } from '../components/EditorialUI';

interface OnePagePortfolioProps {
  onScrollToSection: (id: SectionId | 'hero') => void;
}

export function OnePagePortfolio({ onScrollToSection }: OnePagePortfolioProps) {
  const [drawerProject, setDrawerProject] = useState<ProjectRecord | null>(null);
  const [lightboxAsset, setLightboxAsset] = useState<PhotographyAsset | null>(null);
  const [selectedToolkitId, setSelectedToolkitId] = useState<string>(
    TOOLKIT_CATEGORIES[0].id
  );
  const [showDevelopingPanel, setShowDevelopingPanel] = useState<boolean>(false);

  const visibleProjects = getVisibleProjects();
  const lendingProject = visibleProjects.find((p) => p.id === 'ai-lending-lab');
  const tenderProject = visibleProjects.find((p) => p.id === 'presales-copilot');
  const oemProject = visibleProjects.find((p) => p.id === 'oem-intelligence');

  const activeToolkit =
    TOOLKIT_CATEGORIES.find((t) => t.id === selectedToolkitId) ??
    TOOLKIT_CATEGORIES[0];

  const projectNamesMap: Record<string, string> = {
    'ai-lending-lab': '01 · Verity — AI Lending Reliability Lab',
    'presales-copilot': '02 · Tender Review (Live prototype)',
    'oem-intelligence': '03 · OEM Intelligence (Confidential)',
    'experience-nb': 'NB Instrument Pvt. Ltd. · Technical Sales Engineering',
  };

  return (
    <>
      {/* =========================================================
          SECTION 01 — HERO
         ========================================================= */}
      <section
        id="hero"
        className="min-h-[calc(100vh-4rem)] flex flex-col justify-between pt-8 sm:pt-12 pb-12 border-b border-[rgba(184,164,255,0.16)] scroll-mt-16"
      >
        {/* Status strip */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-[rgba(184,164,255,0.12)]">
          <p className="font-mono text-[11px] sm:text-xs tracking-[0.14em] uppercase text-[#E79EFF]">
            {SITE_META.name} · {SITE_META.role}
          </p>
          <p className="font-mono text-xs text-[#C6B9DA]">
            {SITE_META.location} · Open to opportunities
          </p>
        </div>

        {/* Asymmetric Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center my-auto py-8 lg:py-10">
          {/* Left Typographic Composition */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6"
          >
            <p className="font-mono text-xs tracking-[0.14em] uppercase text-[#B8A4FF] mb-3">
              {SITE_META.name}
            </p>

            <h1 className="font-display text-[2.5rem] sm:text-[3.35rem] lg:text-[4rem] font-semibold tracking-[-0.035em] leading-[1.03] text-[#F7F3FB]">
              {SITE_META.primaryStatement}
            </h1>

            <p className="mt-4 font-display text-lg sm:text-xl font-medium leading-[1.35] bg-gradient-to-r from-[#E79EFF] via-[#D96BFF] to-[#FF6B57] bg-clip-text text-transparent">
              {SITE_META.role}
            </p>

            <p className="mt-6 text-base sm:text-lg leading-[1.6] text-[#F7F3FB] max-w-[52ch]">
              {SITE_META.supportingCopy}
            </p>

            <p className="mt-4 text-sm sm:text-base leading-[1.7] text-[#C6B9DA] max-w-[54ch]">
              {SITE_META.secondaryCopy}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <button
                type="button"
                onClick={() => onScrollToSection('work')}
                className="bg-gradient-to-r from-[#D96BFF] to-[#FF6B57] hover:brightness-110 text-[#0D0814] font-semibold px-6 py-3 text-sm transition-all duration-150 min-h-[46px] whitespace-nowrap shrink-0 cursor-pointer shadow-[0_10px_30px_-10px_rgba(217,107,255,0.55)]"
              >
                Explore My Work
              </button>
              <a
                href={SITE_META.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-[rgba(184,164,255,0.3)] bg-[#160E22]/90 hover:border-[#D96BFF] hover:bg-[#1F1530] text-[#F7F3FB] font-medium px-5 py-3 text-sm transition-colors duration-150 min-h-[46px] whitespace-nowrap shrink-0"
              >
                <span>View GitHub</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </a>
              <button
                type="button"
                onClick={() => onScrollToSection('contact')}
                className="border border-[rgba(184,164,255,0.24)] bg-transparent hover:border-[#D96BFF] hover:bg-[#1F1530]/70 text-[#E79EFF] font-medium px-5 py-3 text-sm transition-colors duration-150 min-h-[46px] whitespace-nowrap shrink-0 cursor-pointer"
              >
                Get in Touch
              </button>
            </div>
          </motion.div>

          {/* Right: Illustrative Verity Preview + Interactive Workflow Canvas */}
          <div className="lg:col-span-6 space-y-5">
            <HeroVerityPreview
              onOpenProject={
                lendingProject ? () => setDrawerProject(lendingProject) : undefined
              }
            />
            <SpatialSystemCanvas />
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="pt-4 flex items-center justify-between border-t border-[rgba(184,164,255,0.12)]">
          <button
            type="button"
            onClick={() => onScrollToSection('work')}
            className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.16em] uppercase text-[#9687AF] hover:text-[#E79EFF] transition-colors cursor-pointer py-1"
          >
            <span>SCROLL TO EXPLORE</span>
            <ArrowDown className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
          <span className="font-mono text-[11px] text-[#9687AF]">
            01 — 07
          </span>
        </div>
      </section>

      {/* =========================================================
          SECTION 02 — SELECTED WORK
         ========================================================= */}
      <MotionSection className="py-20 md:py-24 border-b border-[rgba(184,164,255,0.16)]">
        <section id="work" className="scroll-mt-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[rgba(184,164,255,0.16)] mb-12">
            <div>
              <span className="font-mono text-xs text-[#E79EFF] tracking-[0.14em] uppercase">
                02 · Projects &amp; Case Studies
              </span>
              <h2 className="mt-2 font-display text-3xl sm:text-5xl font-semibold tracking-[-0.025em] text-[#F7F3FB]">
                Selected Work.
              </h2>
            </div>
            <p className="text-sm sm:text-base text-[#C6B9DA] max-w-md">
              AI Systems built for real workflows, checked with automated tests and clear proof.
            </p>
          </div>

          <div className="space-y-10">
            {/* PROJECT 01 — Verity (AI Lending Reliability Lab) */}
            {lendingProject && (
              <motion.article
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
                className="border border-[rgba(217,107,255,0.3)] bg-[linear-gradient(135deg,rgba(28,16,44,0.92),rgba(13,8,20,0.96))] p-6 sm:p-10"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
                  <div className="lg:col-span-6">
                    <div className="flex flex-wrap items-center gap-3 font-mono text-xs mb-3">
                      <span className="text-[#9687AF]">PROJECT 01</span>
                      <span aria-hidden="true" className="text-[#9687AF]/40">·</span>
                      <span className="text-[#E79EFF] font-medium">
                        {lendingProject.statusLabel}
                      </span>
                    </div>

                    <p className="font-mono text-[11px] text-[#B8A4FF] mb-2">
                      {lendingProject.category}
                    </p>

                    <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#F7F3FB]">
                      {lendingProject.title}
                    </h3>

                    <p className="mt-3 text-base leading-[1.65] text-[#C6B9DA]">
                      {lendingProject.summary}
                    </p>

                    <div className="mt-5 space-y-3 text-sm leading-[1.6] text-[#C6B9DA]">
                      <p>
                        <strong className="text-[#F7F3FB] font-medium">The problem: </strong>
                        {lendingProject.plainEnglishOverview.problem}
                      </p>
                      <p>
                        <strong className="text-[#F7F3FB] font-medium">What was tested: </strong>
                        107 backend tests passed, 4 browser tests passed, and 5 simulated failure scenarios implemented in controlled simulations (no real loans processed). In a 5-trial lost-response experiment, the protected system avoided duplicate effects while the intentionally unsafe version produced 5 duplicates.
                      </p>
                    </div>

                    <p className="mt-6 pt-4 border-t border-[rgba(184,164,255,0.14)] font-mono text-xs text-[#B8A4FF]">
                      {lendingProject.stack.join(' · ')}
                    </p>

                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setDrawerProject(lendingProject)}
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-[#D96BFF] to-[#FF6B57] hover:brightness-110 text-[#0D0814] font-semibold px-5 py-2.5 text-sm transition-all min-h-[44px] cursor-pointer"
                      >
                        <Layers className="w-4 h-4" aria-hidden="true" />
                        <span>Details, Diagrams &amp; Test Lab</span>
                      </button>
                      {lendingProject.githubUrl && (
                        <a
                          href={lendingProject.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 border border-[rgba(184,164,255,0.3)] bg-[#1F1530] hover:border-[#D96BFF] text-[#F7F3FB] px-4 py-2.5 text-sm font-medium transition-colors min-h-[44px]"
                        >
                          <span>View GitHub</span>
                          <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Mini Interactive State Schematic Preview */}
                  <div className="lg:col-span-6 space-y-4">
                    <div className="border border-[rgba(184,164,255,0.18)] bg-[#0D0814]/90 p-5">
                      <div className="flex items-center justify-between pb-3 border-b border-[rgba(184,164,255,0.12)] mb-4">
                        <span className="font-mono text-[11px] text-[#E79EFF]">
                          HOW VERITY PREVENTS DUPLICATES
                        </span>
                        <span className="font-mono text-[11px] text-[#9687AF]">
                          Controlled Simulation Lab
                        </span>
                      </div>
                      <svg
                        viewBox="0 0 520 180"
                        className="w-full h-auto block"
                        role="img"
                        aria-label="How Verity checks rules, saves a unique key, and prevents duplicate requests across three simulated lenders"
                      >
                        <line x1="125" y1="88" x2="175" y2="88" stroke="#E79EFF" strokeWidth="1.5" className="animate-signal-flow" />
                        <line x1="305" y1="88" x2="355" y2="45" stroke="#FF6B57" strokeWidth="1.25" className="animate-signal-flow" />
                        <line x1="305" y1="88" x2="355" y2="90" stroke="#FF6B57" strokeWidth="1.25" className="animate-signal-flow" />
                        <line x1="305" y1="88" x2="355" y2="135" stroke="#FF6B57" strokeWidth="1.25" className="animate-signal-flow" />

                        <rect x="12" y="48" width="113" height="80" rx="4" fill="#160E22" stroke="rgba(184,164,255,0.35)" />
                        <text x="24" y="76" fontSize="9.5" fontFamily="JetBrains Mono, monospace" fill="#B8A4FF">INTAKE</text>
                        <text x="24" y="98" fontSize="12" fontFamily="Bricolage Grotesque, sans-serif" fill="#F7F3FB">AI Helper</text>
                        <text x="24" y="114" fontSize="10" fontFamily="Plus Jakarta Sans, sans-serif" fill="#9687AF">Verified facts only</text>

                        <rect x="175" y="40" width="130" height="96" rx="4" fill="#26133B" stroke="#D96BFF" strokeWidth="1.5" />
                        <text x="188" y="66" fontSize="9.5" fontFamily="JetBrains Mono, monospace" fill="#E79EFF">SAFETY GATE</text>
                        <text x="188" y="90" fontSize="12" fontFamily="Bricolage Grotesque, sans-serif" fill="#F7F3FB">Rules &amp; Key</text>
                        <text x="188" y="108" fontSize="10" fontFamily="Plus Jakarta Sans, sans-serif" fill="#C6B9DA">Consent · Unique ID</text>
                        <text x="188" y="123" fontSize="9.5" fontFamily="JetBrains Mono, monospace" fill="#E79EFF">0 duplicates</text>

                        {[
                          { y: 26, title: 'Lender Sim A', sub: 'Dropped reply' },
                          { y: 71, title: 'Lender Sim B', sub: 'Field mismatch' },
                          { y: 116, title: 'Lender Sim C', sub: 'Server error' },
                        ].map((item) => (
                          <g key={item.title}>
                            <rect x="355" y={item.y} width="150" height="36" rx="4" fill="#160E22" stroke="rgba(255,107,87,0.45)" />
                            <text x="368" y={item.y + 16} fontSize="10.5" fontFamily="JetBrains Mono, monospace" fill="#F7F3FB">{item.title}</text>
                            <text x="368" y={item.y + 29} fontSize="9.5" fontFamily="Plus Jakarta Sans, sans-serif" fill="#FF6B57">{item.sub}</text>
                          </g>
                        ))}
                      </svg>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div className="border border-[rgba(184,164,255,0.16)] bg-[#0D0814]/90 p-3">
                        <p className="font-mono text-sm font-semibold text-[#E79EFF]">107</p>
                        <p className="mt-0.5 text-[11px] text-[#C6B9DA]">Backend tests passed</p>
                      </div>
                      <div className="border border-[rgba(184,164,255,0.16)] bg-[#0D0814]/90 p-3">
                        <p className="font-mono text-sm font-semibold text-[#B8A4FF]">4 / 5</p>
                        <p className="mt-0.5 text-[11px] text-[#C6B9DA]">Browser tests / fault scenarios</p>
                      </div>
                      <div className="border border-[rgba(184,164,255,0.16)] bg-[#0D0814]/90 p-3">
                        <p className="font-mono text-sm font-semibold text-[#FF6B57]">0 vs 5</p>
                        <p className="mt-0.5 text-[11px] text-[#C6B9DA]">Duplicates in 5-trial test</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            )}

            {/* PROJECT 02 (Tender Review) & PROJECT 03 (OEM Intelligence — Confidential) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* PROJECT 02 — Tender Review */}
              {tenderProject && (
                <motion.article
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                  className={`${
                    oemProject && PORTFOLIO_CONFIG.showConfidentialOemProject
                      ? 'lg:col-span-7'
                      : 'lg:col-span-12'
                  } border border-[rgba(184,164,255,0.22)] bg-[#160E22]/90 p-6 sm:p-8 flex flex-col justify-between`}
                >
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs mb-3">
                      <span className="text-[#9687AF]">PROJECT 02</span>
                      <span className="text-[#B8A4FF] font-medium">
                        {tenderProject.statusLabel}
                      </span>
                    </div>

                    <p className="font-mono text-[11px] text-[#E79EFF] mb-2">
                      {tenderProject.category}
                    </p>

                    <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#F7F3FB]">
                      {tenderProject.title}
                    </h3>

                    <p className="mt-3 text-sm sm:text-base leading-[1.65] text-[#C6B9DA] max-w-[60ch]">
                      {tenderProject.summary}
                    </p>

                    {/* 4-Stage Document Pipeline Visual */}
                    <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 border border-[rgba(184,164,255,0.16)] bg-[#0D0814]/85 p-4">
                      {[
                        { step: '01', name: 'Read Docs', detail: 'PDF · DOCX · XLSX' },
                        { step: '02', name: 'Checklist', detail: 'Clear requirements' },
                        { step: '03', name: 'Source Proof', detail: 'Exact page link' },
                        { step: '04', name: 'Human Review', detail: 'Flags uncertainty' },
                      ].map((stage) => (
                        <div
                          key={stage.step}
                          className="border border-[rgba(184,164,255,0.14)] bg-[#160E22] p-3"
                        >
                          <span className="font-mono text-[10px] text-[#E79EFF]">{stage.step}</span>
                          <p className="mt-1 text-xs font-semibold text-[#F7F3FB]">{stage.name}</p>
                          <p className="mt-0.5 font-mono text-[10px] text-[#9687AF]">{stage.detail}</p>
                        </div>
                      ))}
                    </div>

                    <ul className="mt-6 space-y-2.5 text-sm text-[#F7F3FB]">
                      <li className="flex items-start gap-2.5">
                        <span className="font-mono text-xs text-[#E79EFF] mt-0.5">—</span>
                        <span>Pulls requirements out of long technical documents into an organized review sheet.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="font-mono text-xs text-[#E79EFF] mt-0.5">—</span>
                        <span>Links answers directly back to the exact source pages so reviewers can verify them.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="font-mono text-xs text-[#E79EFF] mt-0.5">—</span>
                        <span>Sends uncertain or missing evidence to a person for review instead of guessing.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-6 pt-5 border-t border-[rgba(184,164,255,0.14)] space-y-4">
                    <p className="font-mono text-xs text-[#B8A4FF]">
                      {tenderProject.stack.join(' · ')}
                    </p>
                    <div className="flex flex-wrap items-center gap-3">
                      {tenderProject.liveDemoUrl && (
                        <a
                          href={tenderProject.liveDemoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-gradient-to-r from-[#D96BFF] to-[#FF6B57] hover:brightness-110 text-[#0D0814] font-semibold px-4 py-2 text-xs sm:text-sm min-h-[40px]"
                        >
                          <span>View Live Demo</span>
                          <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                        </a>
                      )}
                      {tenderProject.githubUrl && (
                        <a
                          href={tenderProject.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 border border-[rgba(184,164,255,0.3)] bg-[#1F1530] hover:border-[#D96BFF] text-[#F7F3FB] px-4 py-2 text-xs sm:text-sm font-medium transition-colors min-h-[40px]"
                        >
                          <span>View GitHub</span>
                          <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                        </a>
                      )}
                      <button
                        type="button"
                        onClick={() => setDrawerProject(tenderProject)}
                        className="inline-flex items-center gap-1.5 font-mono text-xs text-[#E79EFF] hover:text-[#F7F3FB] underline underline-offset-4 cursor-pointer py-1"
                      >
                        <span>Details &amp; Screenshot Slots</span>
                        <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </motion.article>
              )}

              {/* PROJECT 03 — Confidential Professional Work (OEM Intelligence, NDA-safe) */}
              {oemProject && PORTFOLIO_CONFIG.showConfidentialOemProject && (
                <motion.article
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                  className="lg:col-span-5 border border-[rgba(255,107,87,0.28)] bg-[#160E22]/90 p-6 sm:p-8 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs mb-3">
                      <span className="text-[#9687AF]">PROJECT 03</span>
                      <span className="inline-flex items-center gap-1.5 text-[#FF6B57] font-medium">
                        <Lock className="w-3 h-3" aria-hidden="true" />
                        <span>Confidential professional work</span>
                      </span>
                    </div>

                    <h3 className="font-display text-2xl font-semibold text-[#F7F3FB]">
                      {oemProject.title}
                    </h3>

                    <p className="mt-3 text-sm sm:text-[15px] leading-[1.65] text-[#C6B9DA]">
                      {oemProject.summary}
                    </p>

                    <div className="mt-5">
                      <OemAbstractTopology />
                    </div>

                    <ul className="mt-5 space-y-2 text-sm text-[#F7F3FB]">
                      <li className="flex items-start gap-2.5">
                        <span className="font-mono text-xs text-[#FF6B57] mt-0.5">—</span>
                        <span>Links product knowledge to verified outside research.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="font-mono text-xs text-[#FF6B57] mt-0.5">—</span>
                        <span>Checks clear technical limits before surfacing matches.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="font-mono text-xs text-[#FF6B57] mt-0.5">—</span>
                        <span>Sends uncertain matches to a human reviewer.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[rgba(184,164,255,0.12)] flex flex-wrap items-center justify-between gap-3">
                    <p className="font-mono text-xs text-[#C6B9DA]">
                      {oemProject.stack.slice(0, 5).join(' · ')}
                    </p>
                    <button
                      type="button"
                      onClick={() => setDrawerProject(oemProject)}
                      className="inline-flex items-center gap-1.5 font-mono text-xs text-[#FF6B57] hover:text-[#F7F3FB] underline underline-offset-4 cursor-pointer py-1"
                    >
                      <span>NDA-Safe Overview</span>
                      <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                  </div>
                </motion.article>
              )}
            </div>
          </div>
        </section>
      </MotionSection>

      {/* =========================================================
          SECTION 03 — BEYOND THE CODE (MEETING & PARTNER SESSIONS)
         ========================================================= */}
      <MotionSection className="py-20 md:py-24 border-b border-[rgba(184,164,255,0.16)]">
        <section id="beyond-the-code" className="scroll-mt-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[rgba(184,164,255,0.16)] mb-10">
            <div>
              <span className="font-mono text-xs text-[#E79EFF] tracking-[0.14em] uppercase">
                03 · Real Customer &amp; Partner Sessions
              </span>
              <h2 className="mt-2 font-display text-3xl sm:text-5xl font-semibold tracking-[-0.025em] text-[#F7F3FB]">
                Beyond the Code.
              </h2>
            </div>
            <p className="text-sm sm:text-base text-[#C6B9DA] max-w-md">
              Good AI software starts with listening to real customers, engineering teams, and international partners.
            </p>
          </div>

          <BeyondTheCodeGallery onInspect={setLightboxAsset} />
        </section>
      </MotionSection>

      {/* =========================================================
          SECTION 04 — PROFESSIONAL EXPERIENCE
         ========================================================= */}
      <MotionSection className="py-20 md:py-24 border-b border-[rgba(184,164,255,0.16)]">
        <section id="experience" className="scroll-mt-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[rgba(184,164,255,0.16)] mb-12">
            <div>
              <span className="font-mono text-xs text-[#E79EFF] tracking-[0.14em] uppercase">
                04 · Work Experience
              </span>
              <h2 className="mt-2 font-display text-3xl sm:text-5xl font-semibold tracking-[-0.025em] text-[#F7F3FB]">
                Experience.
              </h2>
            </div>
            <p className="text-sm sm:text-base text-[#C6B9DA] max-w-md">
              Customer conversations, international technology partners, and practical internal tools.
            </p>
          </div>

          <div className="space-y-6">
            {EXPERIENCE_DATA.map((role, idx) => (
              <article
                key={role.id}
                className={`border ${
                  idx === 0
                    ? 'border-[rgba(184,164,255,0.2)] bg-[#160E22]/90'
                    : 'border-[rgba(184,164,255,0.16)] bg-[#120B1C]/90'
                } p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10`}
              >
                <div className="lg:col-span-4">
                  <span className="font-mono text-xs text-[#E79EFF]">
                    {role.indexNumber} · {role.dates}
                  </span>
                  <h3 className="mt-2 font-display text-2xl sm:text-[1.65rem] font-semibold text-[#F7F3FB]">
                    {role.role}
                  </h3>
                  {role.promotionNote && (
                    <p className="mt-1.5 font-mono text-xs text-[#B8A4FF]">
                      {role.promotionNote}
                    </p>
                  )}
                  <p className="mt-2 text-sm font-medium text-[#C6B9DA]">
                    {role.organization} | {role.location}
                  </p>
                </div>

                <div className="lg:col-span-8 border-t lg:border-t-0 lg:border-l border-[rgba(184,164,255,0.14)] pt-5 lg:pt-0 lg:pl-8 space-y-4 text-sm sm:text-[15px] leading-[1.65] text-[#C6B9DA]">
                  <ul className="space-y-3">
                    {role.responsibilities.map((item) => (
                      <li key={item.heading} className="flex items-start gap-2.5">
                        <span className="font-mono text-xs text-[#E79EFF] mt-1">—</span>
                        <span>
                          <strong className="text-[#F7F3FB] font-medium">
                            {item.heading}:{' '}
                          </strong>
                          {item.detail}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {role.contextNote && (
                    <p className="pt-3 border-t border-[rgba(184,164,255,0.12)] font-mono text-xs text-[#B8A4FF] leading-[1.6]">
                      {role.contextNote}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
      </MotionSection>

      {/* =========================================================
          SECTION 05 — SKILLS & TOOLKIT (4 CATEGORIES)
         ========================================================= */}
      <MotionSection className="py-20 md:py-24 border-b border-[rgba(184,164,255,0.16)]">
        <section id="expertise" className="scroll-mt-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[rgba(184,164,255,0.16)] mb-12">
            <div>
              <span className="font-mono text-xs text-[#E79EFF] tracking-[0.14em] uppercase">
                05 · Skills
              </span>
              <h2 className="mt-2 font-display text-3xl sm:text-5xl font-semibold tracking-[-0.025em] text-[#F7F3FB]">
                What I Work With.
              </h2>
            </div>
            <p className="text-sm sm:text-base text-[#C6B9DA] max-w-md">
              From understanding user needs to building and testing reliable AI software.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* 4 Interactive Categories */}
            <div className="lg:col-span-7 space-y-3">
              {TOOLKIT_CATEGORIES.map((cat) => {
                const active = cat.id === activeToolkit.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedToolkitId(cat.id)}
                    aria-pressed={active}
                    className={`w-full text-left p-5 border transition-all duration-150 cursor-pointer ${
                      active
                        ? 'border-[#D96BFF] bg-[#1F1530]'
                        : 'border-[rgba(184,164,255,0.16)] bg-[#160E22]/85 hover:border-[rgba(184,164,255,0.4)]'
                    }`}
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="font-display text-lg font-semibold text-[#F7F3FB]">
                        <span className="font-mono text-xs text-[#E79EFF] mr-3">
                          {cat.index}
                        </span>
                        {cat.title}
                      </h3>
                      <ChevronRight
                        className={`w-4 h-4 shrink-0 transition-transform ${
                          active ? 'text-[#E79EFF] translate-x-0.5' : 'text-[#9687AF]'
                        }`}
                        aria-hidden="true"
                      />
                    </div>
                    <p className="mt-2 font-mono text-xs text-[#C6B9DA] leading-[1.7]">
                      {cat.skills.join(' · ')}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Interactive Evidence & Mapping Panel */}
            <div className="lg:col-span-5 space-y-5">
              <div className="border border-[rgba(184,164,255,0.22)] bg-[#160E22] p-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#E79EFF]">
                  Where I Use This · {activeToolkit.index}
                </p>
                <h4 className="mt-2 font-display text-xl font-semibold text-[#F7F3FB]">
                  {activeToolkit.title}
                </h4>
                <p className="mt-3 text-sm leading-[1.65] text-[#C6B9DA]">
                  {activeToolkit.note}
                </p>

                <div className="mt-5 pt-4 border-t border-[rgba(184,164,255,0.14)]">
                  <p className="font-mono text-[11px] text-[#9687AF] mb-1.5">
                    Experience Context
                  </p>
                  <p className="text-xs text-[#F7F3FB] leading-[1.55]">
                    {activeToolkit.maturityLabel}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-[rgba(184,164,255,0.14)]">
                  <p className="font-mono text-[11px] text-[#9687AF] mb-2">
                    Used In
                  </p>
                  <ul className="space-y-1.5 text-xs font-mono text-[#B8A4FF]">
                    {activeToolkit.linkedProjectIds
                      .filter(
                        (id) =>
                          id !== 'oem-intelligence' ||
                          PORTFOLIO_CONFIG.showConfidentialOemProject
                      )
                      .map((id) => (
                        <li key={id}>— {projectNamesMap[id] ?? id}</li>
                      ))}
                  </ul>
                </div>
              </div>

              {/* Currently Deepening Expandable Box */}
              <div className="border border-[rgba(255,107,87,0.3)] bg-[#1A0E1B]/85 p-5">
                <button
                  type="button"
                  onClick={() => setShowDevelopingPanel((v) => !v)}
                  aria-expanded={showDevelopingPanel}
                  className="w-full flex items-center justify-between gap-3 text-left cursor-pointer"
                >
                  <span className="font-mono text-xs text-[#FF6B57] font-medium">
                    {DEVELOPING_SKILLS_NOTE.title}
                  </span>
                  <span className="font-mono text-[11px] text-[#C6B9DA] shrink-0">
                    {showDevelopingPanel ? 'Hide' : 'Show'}
                  </span>
                </button>
                {showDevelopingPanel && (
                  <div className="mt-4 pt-3 border-t border-[rgba(255,107,87,0.2)] space-y-2">
                    <ul className="space-y-1.5 text-xs text-[#C6B9DA]">
                      {DEVELOPING_SKILLS_NOTE.items.map((item) => (
                        <li key={item}>○ {item}</li>
                      ))}
                    </ul>
                    <p className="pt-2 text-[11px] text-[#9687AF] leading-[1.5]">
                      {DEVELOPING_SKILLS_NOTE.disclaimer}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </MotionSection>

      {/* =========================================================
          SECTION 06 — ABOUT
         ========================================================= */}
      <MotionSection className="py-20 md:py-24 border-b border-[rgba(184,164,255,0.16)]">
        <section id="about" className="scroll-mt-20">
          <div className="pb-6 border-b border-[rgba(184,164,255,0.16)] mb-12">
            <span className="font-mono text-xs text-[#E79EFF] tracking-[0.14em] uppercase">
              06 · About Me &amp; Education
            </span>
            <h2 className="mt-2 font-display text-3xl sm:text-5xl font-semibold tracking-[-0.025em] text-[#F7F3FB] max-w-3xl">
              {ABOUT_NARRATIVE.lead}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-6 space-y-5 text-base sm:text-lg leading-[1.7] text-[#C6B9DA]">
              <p className="text-[#F7F3FB] font-medium">
                {ABOUT_NARRATIVE.sections[0].paragraphs[0]}
              </p>
              <p>{ABOUT_NARRATIVE.sections[0].paragraphs[1]}</p>
              <p>{ABOUT_NARRATIVE.sections[1].paragraphs[0]}</p>

              <div className="mt-8 pt-6 border-t border-[rgba(184,164,255,0.16)]">
                <p className="font-mono text-xs uppercase tracking-[0.12em] text-[#E79EFF] mb-2">
                  Education
                </p>
                <p className="font-display text-lg font-semibold text-[#F7F3FB]">
                  {EDUCATION_DATA.degree}
                </p>
                <p className="mt-1 text-sm text-[#C6B9DA]">
                  {EDUCATION_DATA.institution} · {EDUCATION_DATA.expectedGraduation}
                </p>
              </div>
            </div>

            <div className="lg:col-span-6">
              <AboutPhotoFrame />
            </div>
          </div>
        </section>
      </MotionSection>

      {/* =========================================================
          SECTION 07 — CONTACT
         ========================================================= */}
      <MotionSection className="py-20 md:py-28">
        <section id="contact" className="scroll-mt-20">
          <div className="border border-[rgba(184,164,255,0.22)] bg-[linear-gradient(140deg,rgba(31,21,48,0.92),rgba(13,8,20,0.96))] p-8 sm:p-12 lg:p-16">
            <span className="font-mono text-xs text-[#E79EFF] tracking-[0.14em] uppercase">
              07 · Contact
            </span>

            <h2 className="mt-4 font-display text-3xl sm:text-5xl lg:text-[3.5rem] font-semibold tracking-[-0.03em] leading-[1.08] text-[#F7F3FB] max-w-3xl">
              Have something interesting to build? Let&apos;s talk.
            </h2>

            <p className="mt-5 text-base sm:text-lg leading-[1.68] text-[#C6B9DA] max-w-[54ch]">
              If you&apos;re working on AI products, applied engineering, or technical solutions and want to connect, feel free to reach out.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl font-mono text-xs text-[#C6B9DA]">
              <div className="border border-[rgba(184,164,255,0.16)] bg-[#0D0814]/70 px-4 py-3 flex items-center justify-between gap-3">
                <div>
                  <span className="block text-[10px] uppercase text-[#9687AF]">Email</span>
                  <span className="text-[#F7F3FB]">{SITE_META.email}</span>
                </div>
                <CopyButton
                  text={SITE_META.email}
                  label="Copy"
                  copiedLabel="Copied"
                  variant="compact"
                />
              </div>
              <div className="border border-[rgba(184,164,255,0.16)] bg-[#0D0814]/70 px-4 py-3 flex items-center justify-between gap-3">
                <div>
                  <span className="block text-[10px] uppercase text-[#9687AF]">Phone</span>
                  <span className="text-[#F7F3FB]">{SITE_META.phone}</span>
                </div>
                <CopyButton
                  text={SITE_META.phone}
                  label="Copy"
                  copiedLabel="Copied"
                  variant="compact"
                />
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={`mailto:${SITE_META.email}`}
                className="inline-flex items-center gap-2.5 bg-gradient-to-r from-[#D96BFF] to-[#FF6B57] hover:brightness-110 text-[#0D0814] font-semibold px-6 py-3.5 text-sm transition-all min-h-[48px] whitespace-nowrap shrink-0"
              >
                <Mail className="w-4 h-4" aria-hidden="true" />
                <span>Email Me</span>
              </a>

              <a
                href={`tel:${SITE_META.phone.replace(/\s+/g, '')}`}
                className="inline-flex items-center gap-2 border border-[rgba(184,164,255,0.28)] bg-[#160E22] hover:border-[#D96BFF] px-5 py-3 text-sm font-medium text-[#F7F3FB] transition-colors min-h-[48px] whitespace-nowrap shrink-0"
              >
                <Phone className="w-4 h-4 text-[#E79EFF]" aria-hidden="true" />
                <span>Call {SITE_META.phone}</span>
              </a>

              <a
                href={SITE_META.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-[rgba(184,164,255,0.28)] bg-[#160E22] hover:border-[#D96BFF] px-5 py-3 text-sm font-medium text-[#F7F3FB] transition-colors min-h-[48px] whitespace-nowrap shrink-0"
              >
                <span>GitHub</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </a>

              <a
                href={SITE_META.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-[rgba(184,164,255,0.28)] bg-[#160E22] hover:border-[#D96BFF] px-5 py-3 text-sm font-medium text-[#F7F3FB] transition-colors min-h-[48px] whitespace-nowrap shrink-0"
              >
                <span>LinkedIn</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>
      </MotionSection>

      {/* Expandable Project Details Drawer */}
      <ProjectDrawer
        project={drawerProject}
        onClose={() => setDrawerProject(null)}
      />

      {/* Fullscreen Photography Lightbox */}
      <PhotoLightbox
        asset={lightboxAsset}
        onClose={() => setLightboxAsset(null)}
        onSelect={setLightboxAsset}
      />
    </>
  );
}
