import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import {
  NAV_ITEMS,
  PORTFOLIO_CONFIG,
  RoutePath,
  SITE_META,
} from '../data/portfolio';

interface LayoutProps {
  currentPath: RoutePath;
  onNavigate: (path: RoutePath) => void;
  children: React.ReactNode;
}

export function Layout({ currentPath, onNavigate, children }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [currentPath]);

  const isNavActive = (itemPath: RoutePath) => {
    if (itemPath === '/') return currentPath === '/';
    if (itemPath === '/work') return currentPath === '/work' || currentPath.startsWith('/work/');
    return currentPath === itemPath;
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
    path: RoutePath
  ) => {
    e.preventDefault();
    onNavigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col studio-atmosphere relative text-[#F7F3FB]">
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

      {/* Strict 3-Zone Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#0D0814]/82 backdrop-blur-md border-b border-[rgba(184,164,255,0.16)]">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single-line Brand Wordmark */}
          <a
            href="#/"
            onClick={(e) => handleNavClick(e, '/')}
            className="font-display text-lg sm:text-xl font-semibold tracking-[-0.02em] text-[#F7F3FB] hover:text-[#E79EFF] transition-colors duration-150 whitespace-nowrap shrink-0"
          >
            {SITE_META.name}
          </a>

          {/* Zone 2: Concise single-line nav links with shared Motion active indicator */}
          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-[#C6B9DA]"
          >
            {NAV_ITEMS.map((item) => {
              const active = isNavActive(item.path);
              return (
                <a
                  key={item.path}
                  href={`#${item.path}`}
                  onClick={(e) => handleNavClick(e, item.path)}
                  aria-current={active ? 'page' : undefined}
                  className={`relative py-2 transition-colors duration-150 whitespace-nowrap shrink-0 ${
                    active
                      ? 'text-[#F7F3FB]'
                      : 'text-[#C6B9DA] hover:text-[#F7F3FB]'
                  }`}
                >
                  <span>{item.shortLabel}</span>
                  {active && (
                    <motion.span
                      layoutId="nav-active-underline"
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                      className="absolute left-0 right-0 bottom-0 h-[2px] bg-gradient-to-r from-[#D96BFF] to-[#FF6B57]"
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: 1 Primary Action + Mobile Menu Trigger */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#/contact"
              onClick={(e) => handleNavClick(e, '/contact')}
              aria-current={currentPath === '/contact' ? 'page' : undefined}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold transition-all duration-150 whitespace-nowrap shrink-0 min-h-[40px] inline-flex items-center ${
                currentPath === '/contact'
                  ? 'bg-[#F7F3FB] text-[#0D0814]'
                  : 'bg-gradient-to-r from-[#D96BFF] to-[#FF6B57] text-[#0D0814] hover:brightness-110'
              }`}
            >
              Contact
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-drawer"
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

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav
              id="mobile-nav-drawer"
              aria-label="Mobile navigation"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="md:hidden border-t border-[rgba(184,164,255,0.16)] bg-[#160E22] px-5 py-4"
            >
              <ul className="divide-y divide-[rgba(184,164,255,0.12)]">
                {[
                  ...NAV_ITEMS,
                  { index: '06', label: 'Contact', shortLabel: 'Contact', path: '/contact' as RoutePath },
                ].map((item) => {
                  const active = isNavActive(item.path);
                  return (
                    <li key={item.path}>
                      <a
                        href={`#${item.path}`}
                        onClick={(e) => handleNavClick(e, item.path)}
                        aria-current={active ? 'page' : undefined}
                        className={`flex items-baseline justify-between py-3.5 min-h-[44px] ${
                          active ? 'text-[#E79EFF] font-semibold' : 'text-[#F7F3FB]'
                        }`}
                      >
                        <span className="text-base">{item.label}</span>
                        <span className="font-mono text-xs text-[#9687AF] tabular-nums">
                          {item.index}
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content with smooth page transitions */}
      <main id="main-content" className="relative z-10 flex-1 w-full max-w-[1280px] mx-auto px-5 sm:px-8 pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPath}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Atmospheric Colophon Footer */}
      <footer className="relative z-10 border-t border-[rgba(184,164,255,0.16)] bg-[#110A1B]/90">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 border-b border-[rgba(184,164,255,0.14)]">
            <div className="md:col-span-5">
              <p className="font-display text-lg font-semibold text-[#F7F3FB]">
                {SITE_META.name}
              </p>
              <p className="mt-2 text-sm text-[#C6B9DA] leading-[1.6] max-w-sm">
                {SITE_META.role}. Based in {SITE_META.location}.
              </p>
              <p className="mt-4 font-mono text-xs text-[#9687AF]">
                Applied AI · AI Product Development · Technical Solutions
              </p>
            </div>

            <div className="md:col-span-4">
              <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-[#9687AF] mb-3">
                Navigation Index
              </p>
              <ul className="grid grid-cols-2 gap-y-2 gap-x-6 text-sm">
                {[
                  ...NAV_ITEMS,
                  { index: '06', label: 'Contact', shortLabel: 'Contact', path: '/contact' as RoutePath },
                ].map((item) => (
                  <li key={item.path}>
                    <a
                      href={`#${item.path}`}
                      onClick={(e) => handleNavClick(e, item.path)}
                      className="text-[#C6B9DA] hover:text-[#E79EFF] transition-colors inline-flex items-baseline gap-2"
                    >
                      <span className="font-mono text-[11px] text-[#9687AF] tabular-nums">
                        {item.index}
                      </span>
                      <span>{item.shortLabel}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-3">
              <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-[#9687AF] mb-3">
                Contact
              </p>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href={`mailto:${SITE_META.email}`}
                    className="text-[#F7F3FB] hover:text-[#E79EFF] underline underline-offset-4 decoration-[rgba(184,164,255,0.3)] hover:decoration-[#E79EFF]"
                  >
                    {SITE_META.email}
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${SITE_META.phone.replace(/\s+/g, '')}`}
                    className="text-[#C6B9DA] hover:text-[#E79EFF] transition-colors"
                  >
                    {SITE_META.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={SITE_META.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#C6B9DA] hover:text-[#E79EFF] transition-colors"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
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
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#9687AF]">
            <p>© {new Date().getFullYear()} Riya Mahato · New Delhi, India.</p>
            <p className="font-mono">Applied AI &amp; Technical Solutions</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
