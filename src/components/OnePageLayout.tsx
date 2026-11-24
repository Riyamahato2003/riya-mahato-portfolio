import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { ONE_PAGE_NAV_ITEMS, SectionId } from '../data/toolkit';
import { PORTFOLIO_CONFIG, SITE_META } from '../data/portfolio';

interface OnePageLayoutProps {
  activeSection: SectionId | 'hero';
  onScrollToSection: (id: SectionId | 'hero') => void;
  children: React.ReactNode;
}

export function OnePageLayout({
  activeSection,
  onScrollToSection,
  children,
}: OnePageLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
    id: SectionId | 'hero'
  ) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onScrollToSection(id);
  };

  return (
    <div className="min-h-screen flex flex-col studio-atmosphere relative text-[#F7F3FB] overflow-x-clip">
      {/* Subtle architectural grid background */}
      <div
        aria-hidden="true"
        className="fixed inset-0 studio-grid-lines pointer-events-none opacity-65"
      />

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-[#D96BFF] focus:text-[#0D0814] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold"
      >
        Skip to content
      </a>

      {/* Sticky Top Header */}
      <header className="sticky top-0 z-40 bg-[#0D0814]/84 backdrop-blur-md border-b border-[rgba(184,164,255,0.16)]">
        {/* Hairline scroll progress bar */}
        <motion.div
          aria-hidden="true"
          style={{ scaleX: scrollYProgress, transformOrigin: '0% 50%' }}
          className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-[#B8A4FF] via-[#D96BFF] to-[#FF6B57]"
        />

        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single-line Brand Wordmark */}
          <a
            href="#hero"
            onClick={(e) => handleLinkClick(e, 'hero')}
            className="font-display text-lg sm:text-xl font-semibold tracking-[-0.02em] text-[#F7F3FB] hover:text-[#E79EFF] transition-colors duration-150 whitespace-nowrap shrink-0"
          >
            {SITE_META.name}
          </a>

          {/* Zone 2: WORK / EXPERIENCE / EXPERTISE / ABOUT / CONTACT */}
          <nav
            aria-label="Primary section navigation"
            className="hidden md:flex items-center gap-7 font-mono text-xs tracking-[0.12em] text-[#C6B9DA]"
          >
            {ONE_PAGE_NAV_ITEMS.map((item) => {
              const isContact = item.targetId === 'contact';
              const active = activeSection === item.targetId;
              if (isContact) return null;

              return (
                <a
                  key={item.targetId}
                  href={`#${item.targetId}`}
                  onClick={(e) => handleLinkClick(e, item.targetId)}
                  aria-current={active ? 'location' : undefined}
                  className={`relative py-2 transition-colors duration-150 whitespace-nowrap shrink-0 ${
                    active ? 'text-[#F7F3FB]' : 'text-[#C6B9DA] hover:text-[#F7F3FB]'
                  }`}
                >
                  <span>{item.label}</span>
                  {active && (
                    <motion.span
                      layoutId="onepage-nav-underline"
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                      className="absolute left-0 right-0 bottom-0 h-[2px] bg-gradient-to-r from-[#D96BFF] to-[#FF6B57]"
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Primary Contact Anchor + Mobile Trigger */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, 'contact')}
              aria-current={activeSection === 'contact' ? 'location' : undefined}
              className={`px-4 py-2 font-mono text-xs tracking-[0.1em] font-semibold transition-all duration-150 whitespace-nowrap shrink-0 min-h-[40px] inline-flex items-center ${
                activeSection === 'contact'
                  ? 'bg-[#F7F3FB] text-[#0D0814]'
                  : 'bg-gradient-to-r from-[#D96BFF] to-[#FF6B57] text-[#0D0814] hover:brightness-110'
              }`}
            >
              CONTACT
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-onepage-nav"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="md:hidden inline-flex items-center justify-center w-11 h-11 border border-[rgba(184,164,255,0.25)] bg-[#160E22] text-[#F7F3FB] hover:border-[#D96BFF] cursor-pointer"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" aria-hidden="true" />
              ) : (
                <Menu className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav
              id="mobile-onepage-nav"
              aria-label="Mobile section navigation"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="md:hidden border-t border-[rgba(184,164,255,0.16)] bg-[#160E22] px-5 py-4"
            >
              <ul className="divide-y divide-[rgba(184,164,255,0.12)]">
                {ONE_PAGE_NAV_ITEMS.map((item, idx) => {
                  const active = activeSection === item.targetId;
                  return (
                    <li key={item.targetId}>
                      <a
                        href={`#${item.targetId}`}
                        onClick={(e) => handleLinkClick(e, item.targetId)}
                        className={`flex items-baseline justify-between py-3.5 min-h-[44px] font-mono text-xs tracking-[0.12em] ${
                          active ? 'text-[#E79EFF] font-semibold' : 'text-[#F7F3FB]'
                        }`}
                      >
                        <span>{item.label}</span>
                        <span className="text-[#9687AF] tabular-nums">0{idx + 1}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      {/* Main Continuous Scrolling Container */}
      <main id="main-content" className="relative z-10 flex-1 w-full max-w-[1280px] mx-auto px-5 sm:px-8">
        {children}
      </main>

      {/* Minimal Footer */}
      <footer className="relative z-10 border-t border-[rgba(184,164,255,0.14)] bg-[#0B0611]/90">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 py-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-[#9687AF]">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="font-display text-sm font-semibold text-[#F7F3FB]">
              {SITE_META.name}
            </span>
            <span>{SITE_META.role}</span>
          </div>

          <div className="flex flex-wrap items-center gap-5 font-mono text-[11px]">
            <a
              href={`mailto:${SITE_META.email}`}
              className="text-[#C6B9DA] hover:text-[#E79EFF] transition-colors"
            >
              {SITE_META.email}
            </a>
            <a
              href={`tel:${SITE_META.phone.replace(/\s+/g, '')}`}
              className="text-[#C6B9DA] hover:text-[#E79EFF] transition-colors"
            >
              {SITE_META.phone}
            </a>
            <a
              href={SITE_META.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#C6B9DA] hover:text-[#E79EFF] transition-colors"
            >
              LinkedIn
            </a>
            {PORTFOLIO_CONFIG.githubConfirmed && (
              <a
                href={PORTFOLIO_CONFIG.githubProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#C6B9DA] hover:text-[#E79EFF] transition-colors"
              >
                GitHub
              </a>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}
