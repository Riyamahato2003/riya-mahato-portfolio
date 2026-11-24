/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback, useEffect, useState } from 'react';
import { MotionConfig } from 'motion/react';
import { SectionId } from './data/toolkit';
import { SITE_META } from './data/portfolio';
import { OnePageLayout } from './components/OnePageLayout';
import { OnePagePortfolio } from './pages/OnePagePortfolio';

const OBSERVED_IDS: (SectionId | 'hero')[] = [
  'hero',
  'work',
  'beyond-the-code',
  'experience',
  'expertise',
  'about',
  'contact',
];

export default function App() {
  const [activeSection, setActiveSection] = useState<SectionId | 'hero'>('hero');

  useEffect(() => {
    document.title = `${SITE_META.name} — ${SITE_META.role}`;
  }, []);

  useEffect(() => {
    const elements = OBSERVED_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => Boolean(el)
    );

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          const id = visible[0].target.id as SectionId | 'hero';
          setActiveSection(id);
        }
      },
      {
        rootMargin: '-25% 0px -45% 0px',
        threshold: [0.1, 0.25, 0.5],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollToSection = useCallback((id: SectionId | 'hero') => {
    const el = document.getElementById(id);
    if (!el) return;
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    el.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start',
    });
    setActiveSection(id);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <OnePageLayout
        activeSection={activeSection}
        onScrollToSection={scrollToSection}
      >
        <OnePagePortfolio onScrollToSection={scrollToSection} />
      </OnePageLayout>
    </MotionConfig>
  );
}
