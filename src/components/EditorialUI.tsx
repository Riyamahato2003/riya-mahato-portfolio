import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check, Copy, ChevronDown, ArrowUpRight } from 'lucide-react';

interface PageHeaderProps {
  indexCode: string;
  sectionLabel: string;
  title: string;
  lead: string;
  metaRight?: React.ReactNode;
}

export function PageHeader({
  indexCode,
  sectionLabel,
  title,
  lead,
  metaRight,
}: PageHeaderProps) {
  return (
    <header className="border-b border-[rgba(184,164,255,0.16)] pb-10 md:pb-14 pt-10 md:pt-14">
      <div className="flex flex-wrap items-baseline justify-between gap-4 mb-5">
        <p className="font-mono text-xs tracking-[0.14em] uppercase text-[#C6B9DA] tabular-nums">
          <span className="text-[#E79EFF]">{indexCode}</span>
          <span aria-hidden="true" className="mx-2 text-[#9687AF]">/</span>
          <span>{sectionLabel}</span>
        </p>
        {metaRight && (
          <div className="font-mono text-xs text-[#9687AF] tabular-nums">
            {metaRight}
          </div>
        )}
      </div>

      <h1 className="font-display text-3xl sm:text-5xl lg:text-[3.5rem] font-semibold tracking-[-0.03em] leading-[1.06] text-[#F7F3FB] max-w-4xl">
        {title}
      </h1>

      <p className="mt-6 text-base sm:text-lg leading-[1.68] text-[#C6B9DA] max-w-[68ch]">
        {lead}
      </p>
    </header>
  );
}

interface SectionHeadingProps {
  number?: string;
  title: string;
  aside?: string;
}

export function SectionHeading({ number, title, aside }: SectionHeadingProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-4 border-b border-[rgba(184,164,255,0.16)] mb-8">
      <div className="flex items-baseline gap-3">
        {number && (
          <span className="font-mono text-xs text-[#E79EFF] tabular-nums shrink-0">
            {number}.
          </span>
        )}
        <h2 className="font-display text-2xl sm:text-[1.85rem] font-semibold tracking-[-0.02em] text-[#F7F3FB]">
          {title}
        </h2>
      </div>
      {aside && (
        <span className="font-mono text-xs text-[#9687AF]">{aside}</span>
      )}
    </div>
  );
}

interface MotionSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function MotionSection({
  children,
  className = '',
  delay = 0,
}: MotionSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.35, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StatusLineProps {
  statusLabel: string;
  kind:
    | 'built-tested'
    | 'live-prototype'
    | 'in-development'
    | 'confidential'
    | 'verification-pending';
  prefix?: string;
}

export function StatusLine({ statusLabel, kind, prefix }: StatusLineProps) {
  const toneClass =
    kind === 'confidential'
      ? 'text-[#FF6B57]'
      : kind === 'built-tested' || kind === 'in-development'
      ? 'text-[#E79EFF]'
      : 'text-[#B8A4FF]';

  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs tracking-[0.04em]">
      {prefix && <span className="text-[#9687AF] tabular-nums">{prefix}</span>}
      {prefix && (
        <span aria-hidden="true" className="text-[#9687AF]/50">
          ·
        </span>
      )}
      <span className={`font-medium ${toneClass}`}>{statusLabel}</span>
    </div>
  );
}

interface CopyButtonProps {
  text: string;
  label?: string;
  copiedLabel?: string;
  variant?: 'default' | 'compact';
  className?: string;
}

export function CopyButton({
  text,
  label = 'Copy',
  copiedLabel = 'Copied',
  variant = 'default',
  className = '',
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    }
  };

  const sizeClass =
    variant === 'compact'
      ? 'px-3 py-1.5 text-xs min-h-[36px]'
      : 'px-4 py-2 text-sm min-h-[42px]';

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-live="polite"
      className={`inline-flex items-center justify-center gap-2 border border-[rgba(184,164,255,0.24)] bg-[#1F1530] hover:border-[#D96BFF] hover:bg-[#271B3D] text-[#F7F3FB] font-medium transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${sizeClass} ${className}`}
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-[#E79EFF]" aria-hidden="true" />
          <span className="text-[#E79EFF]">{copiedLabel}</span>
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5 text-[#C6B9DA]" aria-hidden="true" />
          <span>{label}</span>
        </>
      )}
    </button>
  );
}

interface ExpandableNoteProps {
  title: string;
  summary?: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

export function ExpandableNote({
  title,
  summary,
  defaultOpen = false,
  children,
}: ExpandableNoteProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-[rgba(184,164,255,0.18)] bg-[#160E22]/90">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-[#1F1530]/75 transition-colors duration-150 cursor-pointer min-h-[48px]"
      >
        <div>
          <span className="block text-sm sm:text-[15px] font-medium text-[#F7F3FB]">
            {title}
          </span>
          {summary && (
            <span className="block text-xs text-[#9687AF] mt-0.5">
              {summary}
            </span>
          )}
        </div>
        <ChevronDown
          className={`w-4 h-4 text-[#C6B9DA] shrink-0 transition-transform duration-150 ${
            isOpen ? 'rotate-180 text-[#E79EFF]' : ''
          }`}
          aria-hidden="true"
        />
      </button>
      {isOpen && (
        <div className="px-5 pb-5 pt-3 border-t border-[rgba(184,164,255,0.12)] text-sm leading-[1.68] text-[#C6B9DA]">
          {children}
        </div>
      )}
    </div>
  );
}

interface ActionLinkProps {
  onClick?: () => void;
  href?: string;
  external?: boolean;
  variant?: 'primary' | 'secondary' | 'text';
  children: React.ReactNode;
  className?: string;
}

export function ActionLink({
  onClick,
  href,
  external,
  variant = 'primary',
  children,
  className = '',
}: ActionLinkProps) {
  const base =
    'inline-flex items-center justify-center gap-2 font-medium transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer';

  const variants = {
    primary:
      'bg-gradient-to-r from-[#D96BFF] to-[#FF6B57] hover:brightness-110 text-[#0D0814] font-semibold px-5 py-2.5 text-sm min-h-[44px] shadow-[0_8px_28px_-8px_rgba(217,107,255,0.55)]',
    secondary:
      'border border-[rgba(184,164,255,0.28)] bg-[#160E22]/85 hover:border-[#D96BFF] hover:bg-[#1F1530] text-[#F7F3FB] px-5 py-2.5 text-sm min-h-[44px]',
    text: 'text-[#E79EFF] hover:text-[#F7F3FB] underline underline-offset-4 decoration-[rgba(217,107,255,0.4)] hover:decoration-[#E79EFF] py-1 text-sm',
  };

  if (href) {
    return (
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        onClick={onClick}
        className={`${base} ${variants[variant]} ${className}`}
      >
        <span>{children}</span>
        {external && <ArrowUpRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
