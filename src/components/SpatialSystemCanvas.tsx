import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

interface TopologyNode {
  id: string;
  layer: string;
  label: string;
  route: string;
  summary: string;
  tone: 'orchid' | 'coral' | 'lavender';
}

const HERO_NODES: TopologyNode[] = [
  {
    id: 'intake',
    layer: 'Step 01 · Input & Reading',
    label: 'Understand Questions & Documents',
    route: 'READ /intake',
    summary:
      'Turns user questions and uploaded PDFs, Word docs, or spreadsheets into structured fields — without letting AI change data directly.',
    tone: 'lavender',
  },
  {
    id: 'policy',
    layer: 'Step 02 · Rules & Permissions',
    label: 'Check Rules & User Permission',
    route: 'CHECK /rules',
    summary:
      'Runs strict server checks, confirms user consent, and makes sure AI answers stay grounded in facts the system can verify.',
    tone: 'orchid',
  },
  {
    id: 'evidence',
    layer: 'Step 03 · Safe Saving & Review',
    label: 'Prevent Duplicates & Show Proof',
    route: 'SAVE /record',
    summary:
      'Prevents the same request from being processed twice when networks drop, keeps source page links, and flags uncertain items for human review.',
    tone: 'coral',
  },
];

export function SpatialSystemCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string>('policy');

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [7, -7]), {
    stiffness: 180,
    damping: 24,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-9, 9]), {
    stiffness: 180,
    damping: 24,
  });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse' || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(nx);
    mouseY.set(ny);
  };

  const handlePointerLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const activeNode =
    HERO_NODES.find((n) => n.id === selectedNodeId) ?? HERO_NODES[1];

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative"
      style={{ perspective: '1100px' }}
    >
      {/* Subtle luminous radial backdrop behind spatial plate */}
      <div
        aria-hidden="true"
        className="absolute -inset-4 bg-[radial-gradient(circle_at_55%_40%,rgba(217,107,255,0.16),rgba(255,107,87,0.08)_45%,transparent_72%)] blur-2xl pointer-events-none"
      />

      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative border border-[rgba(184,164,255,0.2)] bg-[#160E22]/90 backdrop-blur-md p-5 sm:p-6 shadow-[0_24px_80px_-20px_rgba(0,0,0,0.75)]"
      >
        {/* Top strip */}
        <div className="flex items-center justify-between gap-4 pb-3.5 border-b border-[rgba(184,164,255,0.14)] mb-5">
          <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-[#C6B9DA]">
            How I Build Reliable AI · Interactive
          </span>
          <span className="font-mono text-[11px] text-[#E79EFF]">
            Listen → Design → Build → Test
          </span>
        </div>

        {/* 3D Layered SVG Network */}
        <div className="relative w-full overflow-hidden border border-[rgba(184,164,255,0.12)] bg-[#0D0814]/85 p-3 sm:p-4">
          <svg
            viewBox="0 0 640 270"
            className="w-full h-auto block"
            role="img"
            aria-label="Interactive diagram showing how AI Systems read inputs, check rules and permissions, and prevent duplicate or unverified results"
          >
            <defs>
              <linearGradient id="conduit-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#B8A4FF" stopOpacity="0.6" />
                <stop offset="50%" stopColor="#D96BFF" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#FF6B57" stopOpacity="0.85" />
              </linearGradient>
              <filter id="node-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Isometric perspective grid floor */}
            <g opacity="0.22">
              <line x1="20" y1="220" x2="620" y2="220" stroke="#B8A4FF" strokeWidth="0.75" />
              <line x1="60" y1="245" x2="580" y2="245" stroke="#B8A4FF" strokeWidth="0.75" />
              <line x1="80" y1="35" x2="20" y2="245" stroke="#B8A4FF" strokeWidth="0.75" />
              <line x1="320" y1="20" x2="320" y2="255" stroke="#B8A4FF" strokeWidth="0.75" strokeDasharray="3 4" />
              <line x1="560" y1="35" x2="620" y2="245" stroke="#B8A4FF" strokeWidth="0.75" />
            </g>

            {/* Animated Signal Conduits */}
            <path
              d="M 192 92 C 230 92, 215 135, 250 135"
              fill="none"
              stroke="url(#conduit-grad)"
              strokeWidth="1.75"
              className="animate-signal-flow"
            />
            <path
              d="M 412 135 C 445 135, 435 178, 468 178"
              fill="none"
              stroke="url(#conduit-grad)"
              strokeWidth="1.75"
              className="animate-signal-flow"
            />
            {/* Feedback / Verification Return Path */}
            <path
              d="M 540 132 C 540 48, 112 42, 112 60"
              fill="none"
              stroke="#B8A4FF"
              strokeOpacity="0.35"
              strokeWidth="1.2"
              strokeDasharray="4 6"
            />
            <text x="235" y="42" fontSize="9.5" fontFamily="JetBrains Mono, monospace" fill="#9687AF">
              SOURCE LINKS &amp; HUMAN REVIEW LOOP
            </text>

            {/* Node 1: Intake */}
            <g
              onClick={() => setSelectedNodeId('intake')}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setSelectedNodeId('intake')}
              tabIndex={0}
              role="button"
              aria-pressed={selectedNodeId === 'intake'}
              aria-label="Inspect Step 01 Reading Questions and Documents"
              className="cursor-pointer focus:outline-none"
            >
              <rect
                x="24"
                y="60"
                width="168"
                height="86"
                rx="4"
                fill={selectedNodeId === 'intake' ? '#241738' : '#160E22'}
                stroke={selectedNodeId === 'intake' ? '#B8A4FF' : 'rgba(184,164,255,0.28)'}
                strokeWidth={selectedNodeId === 'intake' ? '1.75' : '1'}
              />
              <text x="38" y="82" fontSize="9.5" fontFamily="JetBrains Mono, monospace" fill="#B8A4FF">
                01 · READ INPUTS
              </text>
              <text x="38" y="106" fontSize="14" fontFamily="Bricolage Grotesque, sans-serif" fontWeight="600" fill="#F7F3FB">
                Docs &amp; Questions
              </text>
              <text x="38" y="128" fontSize="10" fontFamily="JetBrains Mono, monospace" fill="#9687AF">
                PDF · Word · Forms
              </text>
            </g>

            {/* Node 2: Rules & Permission */}
            <g
              onClick={() => setSelectedNodeId('policy')}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setSelectedNodeId('policy')}
              tabIndex={0}
              role="button"
              aria-pressed={selectedNodeId === 'policy'}
              aria-label="Inspect Step 02 Checking Rules and Permissions"
              className="cursor-pointer focus:outline-none"
            >
              <rect
                x="250"
                y="92"
                width="162"
                height="94"
                rx="4"
                fill={selectedNodeId === 'policy' ? '#2A143E' : '#1A102A'}
                stroke={selectedNodeId === 'policy' ? '#D96BFF' : 'rgba(217,107,255,0.4)'}
                strokeWidth={selectedNodeId === 'policy' ? '2' : '1.25'}
                filter={selectedNodeId === 'policy' ? 'url(#node-glow)' : undefined}
              />
              <text x="264" y="114" fontSize="9.5" fontFamily="JetBrains Mono, monospace" fill="#E79EFF">
                02 · RULE CHECKS
              </text>
              <text x="264" y="138" fontSize="14" fontFamily="Bricolage Grotesque, sans-serif" fontWeight="600" fill="#F7F3FB">
                Rules &amp; Consent
              </text>
              <text x="264" y="158" fontSize="10" fontFamily="JetBrains Mono, monospace" fill="#C6B9DA">
                Verified Facts Only
              </text>
              <text x="264" y="173" fontSize="9.5" fontFamily="JetBrains Mono, monospace" fill="#D96BFF">
                Server Enforced
              </text>
            </g>

            {/* Node 3: Safe Saving & Proof */}
            <g
              onClick={() => setSelectedNodeId('evidence')}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setSelectedNodeId('evidence')}
              tabIndex={0}
              role="button"
              aria-pressed={selectedNodeId === 'evidence'}
              aria-label="Inspect Step 03 Safe Saving and Human Review"
              className="cursor-pointer focus:outline-none"
            >
              <rect
                x="468"
                y="132"
                width="152"
                height="92"
                rx="4"
                fill={selectedNodeId === 'evidence' ? '#2E1624' : '#160E22'}
                stroke={selectedNodeId === 'evidence' ? '#FF6B57' : 'rgba(255,107,87,0.38)'}
                strokeWidth={selectedNodeId === 'evidence' ? '1.75' : '1'}
              />
              <text x="482" y="154" fontSize="9.5" fontFamily="JetBrains Mono, monospace" fill="#FF6B57">
                03 · SAFE RESULTS
              </text>
              <text x="482" y="178" fontSize="14" fontFamily="Bricolage Grotesque, sans-serif" fontWeight="600" fill="#F7F3FB">
                Save &amp; Review
              </text>
              <text x="482" y="198" fontSize="10" fontFamily="JetBrains Mono, monospace" fill="#C6B9DA">
                No Duplicates · Proof
              </text>
            </g>
          </svg>
        </div>

        {/* Interactive Node Info Panel */}
        <div className="mt-4 pt-4 border-t border-[rgba(184,164,255,0.14)]">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <span className="font-mono text-[11px] text-[#E79EFF]">
              {activeNode.layer}
            </span>
            <span className="font-mono text-[11px] text-[#9687AF]">
              {activeNode.route}
            </span>
          </div>
          <p className="text-sm font-medium text-[#F7F3FB]">{activeNode.label}</p>
          <p className="mt-1 text-xs sm:text-[13px] leading-[1.6] text-[#C6B9DA]">
            {activeNode.summary}
          </p>
        </div>
      </motion.div>
    </div>
  );
}

/**
 * NDA-safe abstract visualization for OEM Intelligence.
 */
export function OemAbstractTopology() {
  const concepts = [
    { id: 'sources', label: 'Outside Research', note: 'Collects technical findings from external papers' },
    { id: 'matching', label: 'Rule Check', note: 'Compares against verified product limits' },
    { id: 'review', label: 'Human Review', note: 'Sends uncertain matches to a person to check' },
  ];
  const [active, setActive] = useState(concepts[1].id);
  const current = concepts.find((c) => c.id === active) ?? concepts[1];

  return (
    <div className="border border-[rgba(255,107,87,0.3)] bg-[#160E22]/90 p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[rgba(184,164,255,0.12)] mb-4">
        <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-[#FF6B57]">
          NDA-Safe Overview
        </span>
        <span className="font-mono text-[11px] text-[#9687AF]">
          Private details withheld
        </span>
      </div>

      <svg
        viewBox="0 0 640 160"
        className="w-full h-auto block"
        role="img"
        aria-label="Simple overview of matching outside research with verified product facts and human review"
      >
        <line x1="185" y1="80" x2="235" y2="80" stroke="#B8A4FF" strokeOpacity="0.45" strokeWidth="1.5" className="animate-signal-flow" />
        <line x1="405" y1="80" x2="455" y2="80" stroke="#FF6B57" strokeOpacity="0.55" strokeWidth="1.5" className="animate-signal-flow" />

        <g onClick={() => setActive('sources')} className="cursor-pointer">
          <rect
            x="20"
            y="38"
            width="165"
            height="84"
            rx="4"
            fill={active === 'sources' ? '#241738' : '#0D0814'}
            stroke={active === 'sources' ? '#B8A4FF' : 'rgba(184,164,255,0.25)'}
          />
          <text x="34" y="66" fontSize="10" fontFamily="JetBrains Mono, monospace" fill="#B8A4FF">
            STEP 01
          </text>
          <text x="34" y="92" fontSize="13" fontFamily="Bricolage Grotesque, sans-serif" fill="#F7F3FB">
            Research Sources
          </text>
        </g>

        <g onClick={() => setActive('matching')} className="cursor-pointer">
          <rect
            x="235"
            y="38"
            width="170"
            height="84"
            rx="4"
            fill={active === 'matching' ? '#2A143E' : '#0D0814'}
            stroke={active === 'matching' ? '#D96BFF' : 'rgba(217,107,255,0.35)'}
          />
          <text x="249" y="66" fontSize="10" fontFamily="JetBrains Mono, monospace" fill="#E79EFF">
            STEP 02
          </text>
          <text x="249" y="92" fontSize="13" fontFamily="Bricolage Grotesque, sans-serif" fill="#F7F3FB">
            Rule Check
          </text>
        </g>

        <g onClick={() => setActive('review')} className="cursor-pointer">
          <rect
            x="455"
            y="38"
            width="165"
            height="84"
            rx="4"
            fill={active === 'review' ? '#2E1624' : '#0D0814'}
            stroke={active === 'review' ? '#FF6B57' : 'rgba(255,107,87,0.35)'}
          />
          <text x="469" y="66" fontSize="10" fontFamily="JetBrains Mono, monospace" fill="#FF6B57">
            STEP 03
          </text>
          <text x="469" y="92" fontSize="13" fontFamily="Bricolage Grotesque, sans-serif" fill="#F7F3FB">
            Human Review
          </text>
        </g>
      </svg>

      <div className="mt-3 pt-3 border-t border-[rgba(184,164,255,0.12)] flex flex-wrap items-baseline justify-between gap-2 text-xs">
        <span className="font-medium text-[#F7F3FB]">{current.label}</span>
        <span className="font-mono text-[#C6B9DA]">{current.note}</span>
      </div>
    </div>
  );
}
