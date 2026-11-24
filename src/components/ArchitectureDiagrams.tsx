import React, { useState } from 'react';
import { Play, Pause } from 'lucide-react';
import { DiagramId, HERO_METHODOLOGY_STEPS } from '../data/portfolio';

export function MethodologyDiagram() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const activeStep = HERO_METHODOLOGY_STEPS[activeIndex];

  return (
    <figure
      aria-label="How I work diagram: Listen, Design, Build, Test"
      className="border border-[rgba(184,164,255,0.2)] bg-[#160E22]/90 p-5 sm:p-6"
    >
      <div className="flex items-center justify-between gap-4 pb-3 border-b border-[rgba(184,164,255,0.14)] mb-5">
        <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-[#C6B9DA]">
          How I Work
        </span>
        <span className="font-mono text-[11px] text-[#E79EFF]">
          Click a step to inspect
        </span>
      </div>

      <div className="w-full overflow-x-auto">
        <svg
          viewBox="0 0 600 132"
          className="w-full min-w-[460px] h-auto block"
          role="img"
          aria-label="Four-stage workflow: 01 Listen, 02 Design, 03 Build, 04 Test"
        >
          <defs>
            <marker
              id="method-arrow-2026"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 8 5 L 0 9 z" fill="#E79EFF" />
            </marker>
          </defs>

          <line
            x1="16"
            y1="66"
            x2="584"
            y2="66"
            stroke="rgba(184,164,255,0.16)"
            strokeWidth="1"
            strokeDasharray="3 4"
          />

          {HERO_METHODOLOGY_STEPS.map((step, idx) => {
            const x = 16 + idx * 148;
            const isActive = idx === activeIndex;
            const nextX = x + 124;

            return (
              <g key={step.code}>
                <g
                  onClick={() => setActiveIndex(idx)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveIndex(idx);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-pressed={isActive}
                  aria-label={`${step.code} ${step.label}: ${step.detail}`}
                  className="cursor-pointer focus:outline-none"
                >
                  <rect
                    x={x}
                    y="20"
                    width="124"
                    height="88"
                    rx="4"
                    fill={isActive ? '#2B1542' : '#0D0814'}
                    stroke={isActive ? '#D96BFF' : 'rgba(184,164,255,0.22)'}
                    strokeWidth={isActive ? '1.75' : '1'}
                  />
                  <text
                    x={x + 14}
                    y="44"
                    fontSize="11"
                    fontFamily="JetBrains Mono, monospace"
                    fill={isActive ? '#E79EFF' : '#9687AF'}
                  >
                    {step.code}
                  </text>
                  <text
                    x={x + 14}
                    y="74"
                    fontSize="17"
                    fontFamily="Bricolage Grotesque, sans-serif"
                    fontWeight="600"
                    fill="#F7F3FB"
                  >
                    {step.label}
                  </text>
                  <line
                    x1={x + 14}
                    y1="88"
                    x2={x + 48}
                    y2="88"
                    stroke={isActive ? '#FF6B57' : 'rgba(184,164,255,0.3)'}
                    strokeWidth="2"
                  />
                </g>

                {idx < HERO_METHODOLOGY_STEPS.length - 1 && (
                  <line
                    x1={nextX + 2}
                    y1="64"
                    x2={nextX + 20}
                    y2="64"
                    stroke="#E79EFF"
                    strokeWidth="1.25"
                    markerEnd="url(#method-arrow-2026)"
                  />
                )}
              </g>
            );
          })}
        </svg>
      </div>

      <div className="mt-4 pt-4 border-t border-[rgba(184,164,255,0.14)] flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4">
        <span className="font-mono text-xs text-[#E79EFF] font-medium shrink-0 tabular-nums">
          {activeStep.code} · {activeStep.label}
        </span>
        <figcaption className="text-sm text-[#C6B9DA] leading-[1.55]">
          {activeStep.detail}
        </figcaption>
      </div>
    </figure>
  );
}

interface NodeAnnotation {
  id: string;
  label: string;
  layerCategory:
    | 'AI Help'
    | 'Strict Rules'
    | 'Safe Storage'
    | 'Simulated / External';
  role: string;
  detail: string;
}

const DIAGRAM_ANNOTATIONS: Record<DiagramId, NodeAnnotation[]> = {
  'lending-workflow': [
    {
      id: 'intake',
      label: 'Borrower Intake (AI Helper)',
      layerCategory: 'AI Help',
      role: 'Reads Inputs & Explains Offers',
      detail:
        'Helps collect borrower details and explains verified offer terms in plain language. Cannot approve loans or call lender APIs directly.',
    },
    {
      id: 'policy',
      label: 'Server Rules & Permission Check',
      layerCategory: 'Strict Rules',
      role: 'Backend Checks',
      detail:
        'Checks required fields, confirms borrower permission for each selected lender, and runs strict approval rules on the server.',
    },
    {
      id: 'ledger',
      label: 'PostgreSQL Request Log',
      layerCategory: 'Safe Storage',
      role: 'Prevents Duplicate Requests',
      detail:
        'Saves a unique request key and audit history in PostgreSQL so retrying a timed-out call never submits the same application twice.',
    },
    {
      id: 'lenders',
      label: '3 Simulated Lenders',
      layerCategory: 'Simulated / External',
      role: 'Controlled Failure Lab',
      detail:
        'Three simulated lender services used to test slow replies, dropped responses, errors, and changing field formats safely.',
    },
  ],
  'decision-boundary': [
    {
      id: 'llm',
      label: 'AI Assistant Layer',
      layerCategory: 'AI Help',
      role: 'Plain-Language Guide',
      detail:
        'Turns user messages into structured fields and explains verified results clearly — never invents approval reasons.',
    },
    {
      id: 'validator',
      label: 'Input & Permission Gate',
      layerCategory: 'Strict Rules',
      role: 'Safety Check',
      detail:
        'Rejects incomplete data, checks user consent, and blocks any unapproved action before it reaches the database.',
    },
    {
      id: 'rules',
      label: 'Verified Server Rules',
      layerCategory: 'Strict Rules',
      role: 'Source of Truth',
      detail:
        'AI answers are strictly based on information the system can verify from these deterministic Python rules.',
    },
  ],
  'consent-state-flow': [
    {
      id: 'draft',
      label: 'Borrower Permission',
      layerCategory: 'Strict Rules',
      role: 'Before Sending',
      detail:
        'Data stays local until the borrower grants clear permission for each specific simulated lender.',
    },
    {
      id: 'locked',
      label: 'Unique Request Key Saved',
      layerCategory: 'Safe Storage',
      role: 'Duplicate Lock',
      detail:
        'Preventing the same request from being processed twice by saving a unique key in PostgreSQL before sending.',
    },
    {
      id: 'uncertain',
      label: 'Lost-Response Check',
      layerCategory: 'Simulated / External',
      role: 'Timeout Recovery',
      detail:
        'If a lender reply is lost, the system checks status with the same key instead of blindly submitting a second time.',
    },
    {
      id: 'terminal',
      label: 'Final Recorded Result',
      layerCategory: 'Safe Storage',
      role: 'Clear Audit Trail',
      detail:
        'Stores the final verified offer or decline alongside the exact rule trail behind it.',
    },
  ],
  'document-verification': [
    {
      id: 'ingest',
      label: 'Read Uploaded Files',
      layerCategory: 'Simulated / External',
      role: 'PDF, Word & Excel Parsing',
      detail:
        'Reads PDFs, DOCX files, and XLSX spreadsheets while keeping exact page numbers and table rows.',
    },
    {
      id: 'normalize',
      label: 'Organize Requirements',
      layerCategory: 'AI Help',
      role: 'Structured Checklist',
      detail:
        'Turns long paragraphs and tables into clean requirement rows with units, limits, and mandatory flags.',
    },
    {
      id: 'verify',
      label: 'Check Against Source Pages',
      layerCategory: 'Strict Rules',
      role: 'Evidence Check',
      detail:
        'Makes sure every statement links back to an exact source page; missing proof is flagged instead of guessed.',
    },
    {
      id: 'review',
      label: 'Human Review Sheet',
      layerCategory: 'Safe Storage',
      role: 'Person in Control',
      detail:
        'Builds the final review table and sends uncertain results to a person for review.',
    },
  ],
};

interface ArchitectureDiagramProps {
  diagramId: DiagramId;
}

export function ArchitectureDiagramCanvas({ diagramId }: ArchitectureDiagramProps) {
  const annotations = DIAGRAM_ANNOTATIONS[diagramId];
  const [selectedId, setSelectedId] = useState<string>(annotations[0].id);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [motionEnabled, setMotionEnabled] = useState<boolean>(true);

  const activeNodeId = hoveredId ?? selectedId;
  const selectedNote =
    annotations.find((a) => a.id === activeNodeId) ?? annotations[0];

  const flowClass = motionEnabled ? 'animate-signal-flow' : '';

  const categoryColor = (cat: NodeAnnotation['layerCategory']) => {
    switch (cat) {
      case 'AI Help':
        return 'text-[#B8A4FF]';
      case 'Strict Rules':
        return 'text-[#E79EFF]';
      case 'Safe Storage':
        return 'text-[#C6B9DA]';
      case 'Simulated / External':
        return 'text-[#FF6B57]';
    }
  };

  const renderSvg = () => {
    switch (diagramId) {
      case 'lending-workflow':
        return (
          <svg
            viewBox="0 0 820 268"
            className="w-full min-w-[640px] h-auto block"
            role="img"
            aria-label="Verity system diagram showing intake, rule and consent checks, duplicate protection, and three simulated lenders"
          >
            <defs>
              <marker id="arch-arrow-1" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 1 L 8 5 L 0 9 z" fill="#E79EFF" />
              </marker>
            </defs>

            <text x="20" y="24" fontSize="10" fontFamily="JetBrains Mono, monospace" fill="#B8A4FF">
              AI HELPER
            </text>
            <text x="245" y="24" fontSize="10" fontFamily="JetBrains Mono, monospace" fill="#E79EFF">
              STRICT RULES &amp; SAFE STORAGE
            </text>
            <text x="615" y="24" fontSize="10" fontFamily="JetBrains Mono, monospace" fill="#FF6B57">
              SIMULATED LENDERS
            </text>

            <line x1="220" y1="36" x2="220" y2="246" stroke="rgba(184,164,255,0.2)" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="595" y1="36" x2="595" y2="246" stroke="rgba(184,164,255,0.2)" strokeWidth="1" strokeDasharray="4 4" />

            <g
              onClick={() => setSelectedId('intake')}
              onMouseEnter={() => setHoveredId('intake')}
              onMouseLeave={() => setHoveredId(null)}
              className="cursor-pointer focus:outline-none"
              tabIndex={0}
              role="button"
              aria-label="Inspect Borrower Intake"
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setSelectedId('intake')}
            >
              <rect
                x="20"
                y="56"
                width="180"
                height="96"
                rx="4"
                fill={activeNodeId === 'intake' ? '#241738' : '#120B1C'}
                stroke={activeNodeId === 'intake' ? '#B8A4FF' : 'rgba(184,164,255,0.28)'}
                strokeWidth={activeNodeId === 'intake' ? '2' : '1.25'}
              />
              <text x="34" y="80" fontSize="10" fontFamily="JetBrains Mono, monospace" fill="#B8A4FF">
                NEXT.JS + GEMINI
              </text>
              <text x="34" y="104" fontSize="14" fontFamily="Bricolage Grotesque, sans-serif" fontWeight="600" fill="#F7F3FB">
                Borrower Intake
              </text>
              <text x="34" y="124" fontSize="11" fontFamily="Plus Jakarta Sans, sans-serif" fill="#C6B9DA">
                Collects details &amp;
              </text>
              <text x="34" y="140" fontSize="11" fontFamily="Plus Jakarta Sans, sans-serif" fill="#C6B9DA">
                explains verified offers
              </text>
            </g>

            <line
              x1="200"
              y1="104"
              x2="246"
              y2="104"
              stroke={activeNodeId === 'intake' || activeNodeId === 'policy' ? '#E79EFF' : 'rgba(184,164,255,0.45)'}
              strokeWidth={activeNodeId === 'intake' || activeNodeId === 'policy' ? '2' : '1.25'}
              className={flowClass}
              markerEnd="url(#arch-arrow-1)"
            />

            <g
              onClick={() => setSelectedId('policy')}
              onMouseEnter={() => setHoveredId('policy')}
              onMouseLeave={() => setHoveredId(null)}
              className="cursor-pointer focus:outline-none"
              tabIndex={0}
              role="button"
              aria-label="Inspect Server Rules and Permission Check"
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setSelectedId('policy')}
            >
              <rect
                x="252"
                y="46"
                width="170"
                height="116"
                rx="4"
                fill={activeNodeId === 'policy' ? '#2D1442' : '#180E27'}
                stroke={activeNodeId === 'policy' ? '#D96BFF' : 'rgba(217,107,255,0.45)'}
                strokeWidth={activeNodeId === 'policy' ? '2' : '1.25'}
              />
              <text x="266" y="70" fontSize="10" fontFamily="JetBrains Mono, monospace" fill="#E79EFF">
                FASTAPI SERVER
              </text>
              <text x="266" y="94" fontSize="14" fontFamily="Bricolage Grotesque, sans-serif" fontWeight="600" fill="#F7F3FB">
                Rules &amp; Permission
              </text>
              <text x="266" y="112" fontSize="14" fontFamily="Bricolage Grotesque, sans-serif" fontWeight="600" fill="#F7F3FB">
                Check
              </text>
              <text x="266" y="136" fontSize="11" fontFamily="Plus Jakarta Sans, sans-serif" fill="#C6B9DA">
                Checks eligibility &amp;
              </text>
              <text x="266" y="151" fontSize="11" fontFamily="Plus Jakarta Sans, sans-serif" fill="#C6B9DA">
                lender consent
              </text>
            </g>

            <line
              x1="337"
              y1="162"
              x2="337"
              y2="188"
              stroke={activeNodeId === 'policy' || activeNodeId === 'ledger' ? '#E79EFF' : 'rgba(184,164,255,0.45)'}
              strokeWidth={activeNodeId === 'policy' || activeNodeId === 'ledger' ? '2' : '1.25'}
              className={flowClass}
              markerEnd="url(#arch-arrow-1)"
            />

            <g
              onClick={() => setSelectedId('ledger')}
              onMouseEnter={() => setHoveredId('ledger')}
              onMouseLeave={() => setHoveredId(null)}
              className="cursor-pointer focus:outline-none"
              tabIndex={0}
              role="button"
              aria-label="Inspect PostgreSQL Request Log"
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setSelectedId('ledger')}
            >
              <rect
                x="252"
                y="194"
                width="320"
                height="56"
                rx="4"
                fill={activeNodeId === 'ledger' ? '#241738' : '#120B1C'}
                stroke={activeNodeId === 'ledger' ? '#F7F3FB' : 'rgba(184,164,255,0.28)'}
                strokeWidth={activeNodeId === 'ledger' ? '2' : '1.25'}
              />
              <text x="266" y="216" fontSize="10" fontFamily="JetBrains Mono, monospace" fill="#C6B9DA">
                POSTGRESQL · DUPLICATE PROTECTION
              </text>
              <text x="266" y="236" fontSize="12.5" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="500" fill="#F7F3FB">
                Unique Request Keys · Audit History · Status Check
              </text>
            </g>

            <rect x="444" y="56" width="128" height="96" rx="4" fill="#120B1C" stroke="rgba(184,164,255,0.25)" strokeWidth="1.25" />
            <text x="456" y="80" fontSize="10" fontFamily="JetBrains Mono, monospace" fill="#9687AF">
              SAFE SENDER
            </text>
            <text x="456" y="102" fontSize="13" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="600" fill="#F7F3FB">
              Safe Retries
            </text>
            <text x="456" y="120" fontSize="13" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="600" fill="#F7F3FB">
              &amp; Recovery
            </text>
            <text x="456" y="138" fontSize="11" fontFamily="Plus Jakarta Sans, sans-serif" fill="#C6B9DA">
              No double submit
            </text>

            <line x1="422" y1="104" x2="438" y2="104" stroke="#E79EFF" strokeWidth="1.25" className={flowClass} markerEnd="url(#arch-arrow-1)" />
            <line x1="508" y1="152" x2="508" y2="188" stroke="#E79EFF" strokeWidth="1.25" className={flowClass} markerEnd="url(#arch-arrow-1)" />

            <g
              onClick={() => setSelectedId('lenders')}
              onMouseEnter={() => setHoveredId('lenders')}
              onMouseLeave={() => setHoveredId(null)}
              className="cursor-pointer focus:outline-none"
              tabIndex={0}
              role="button"
              aria-label="Inspect 3 Simulated Lenders"
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setSelectedId('lenders')}
            >
              {[
                { y: 46, name: 'Lender Sim A', note: 'Slow / dropped reply' },
                { y: 104, name: 'Lender Sim B', note: 'Changed fields' },
                { y: 162, name: 'Lender Sim C', note: 'Temporary errors' },
              ].map((lender) => (
                <g key={lender.name}>
                  <rect
                    x="616"
                    y={lender.y}
                    width="184"
                    height="48"
                    rx="4"
                    fill={activeNodeId === 'lenders' ? '#2F1522' : '#120B1C'}
                    stroke={activeNodeId === 'lenders' ? '#FF6B57' : 'rgba(255,107,87,0.38)'}
                    strokeWidth={activeNodeId === 'lenders' ? '2' : '1.25'}
                  />
                  <text x="630" y={lender.y + 20} fontSize="12" fontFamily="JetBrains Mono, monospace" fontWeight="500" fill="#F7F3FB">
                    {lender.name}
                  </text>
                  <text x="630" y={lender.y + 36} fontSize="11" fontFamily="Plus Jakarta Sans, sans-serif" fill="#FF6B57">
                    {lender.note}
                  </text>
                </g>
              ))}
            </g>

            <path d="M 572 104 L 596 104 L 596 70 L 610 70" fill="none" stroke="#FF6B57" strokeOpacity={activeNodeId === 'lenders' ? '1' : '0.55'} strokeWidth="1.5" className={flowClass} markerEnd="url(#arch-arrow-1)" />
            <line x1="572" y1="104" x2="610" y2="128" stroke="#FF6B57" strokeOpacity={activeNodeId === 'lenders' ? '1' : '0.55'} strokeWidth="1.5" className={flowClass} markerEnd="url(#arch-arrow-1)" />
            <path d="M 572 104 L 596 104 L 596 186 L 610 186" fill="none" stroke="#FF6B57" strokeOpacity={activeNodeId === 'lenders' ? '1' : '0.55'} strokeWidth="1.5" className={flowClass} markerEnd="url(#arch-arrow-1)" />
          </svg>
        );

      case 'decision-boundary':
        return (
          <svg
            viewBox="0 0 820 232"
            className="w-full min-w-[620px] h-auto block"
            role="img"
            aria-label="Diagram showing how AI answers are based only on information the system can verify"
          >
            <defs>
              <marker id="arch-arrow-2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 1 L 8 5 L 0 9 z" fill="#E79EFF" />
              </marker>
            </defs>

            <text x="20" y="24" fontSize="10" fontFamily="JetBrains Mono, monospace" fill="#C6B9DA">
              AI ANSWERS BASED ON INFORMATION THE SYSTEM CAN VERIFY
            </text>

            <g
              onClick={() => setSelectedId('llm')}
              onMouseEnter={() => setHoveredId('llm')}
              onMouseLeave={() => setHoveredId(null)}
              className="cursor-pointer focus:outline-none"
              tabIndex={0}
              role="button"
              aria-label="Inspect AI Assistant Layer"
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setSelectedId('llm')}
            >
              <rect
                x="20"
                y="46"
                width="220"
                height="158"
                rx="4"
                fill={activeNodeId === 'llm' ? '#241738' : '#120B1C'}
                stroke={activeNodeId === 'llm' ? '#B8A4FF' : 'rgba(184,164,255,0.28)'}
                strokeWidth={activeNodeId === 'llm' ? '2' : '1.25'}
              />
              <text x="36" y="70" fontSize="10" fontFamily="JetBrains Mono, monospace" fill="#B8A4FF">
                AI ASSISTANT
              </text>
              <text x="36" y="96" fontSize="15" fontFamily="Bricolage Grotesque, sans-serif" fontWeight="600" fill="#F7F3FB">
                Plain-Language Help
              </text>
              <text x="36" y="122" fontSize="12" fontFamily="Plus Jakarta Sans, sans-serif" fill="#C6B9DA">
                • Reads user questions
              </text>
              <text x="36" y="142" fontSize="12" fontFamily="Plus Jakarta Sans, sans-serif" fill="#C6B9DA">
                • Asks clear follow-ups
              </text>
              <text x="36" y="162" fontSize="12" fontFamily="Plus Jakarta Sans, sans-serif" fill="#C6B9DA">
                • Explains verified offers
              </text>
              <text x="36" y="186" fontSize="10.5" fontFamily="JetBrains Mono, monospace" fill="#FF6B57">
                CANNOT APPROVE OR WRITE
              </text>
            </g>

            <line x1="240" y1="124" x2="292" y2="124" stroke="#E79EFF" strokeWidth="1.5" className={flowClass} markerEnd="url(#arch-arrow-2)" />
            <text x="246" y="114" fontSize="10" fontFamily="JetBrains Mono, monospace" fill="#C6B9DA">
              DATA
            </text>

            <g
              onClick={() => setSelectedId('validator')}
              onMouseEnter={() => setHoveredId('validator')}
              onMouseLeave={() => setHoveredId(null)}
              className="cursor-pointer focus:outline-none"
              tabIndex={0}
              role="button"
              aria-label="Inspect Input and Permission Gate"
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setSelectedId('validator')}
            >
              <rect
                x="298"
                y="46"
                width="216"
                height="158"
                rx="4"
                fill={activeNodeId === 'validator' ? '#2D1442' : '#180E27'}
                stroke={activeNodeId === 'validator' ? '#D96BFF' : 'rgba(217,107,255,0.45)'}
                strokeWidth={activeNodeId === 'validator' ? '2' : '1.5'}
              />
              <text x="314" y="70" fontSize="10" fontFamily="JetBrains Mono, monospace" fill="#E79EFF">
                SAFETY GATE
              </text>
              <text x="314" y="96" fontSize="15" fontFamily="Bricolage Grotesque, sans-serif" fontWeight="600" fill="#F7F3FB">
                Input &amp; Permission
              </text>
              <text x="314" y="122" fontSize="12" fontFamily="Plus Jakarta Sans, sans-serif" fill="#C6B9DA">
                • Checks required fields
              </text>
              <text x="314" y="142" fontSize="12" fontFamily="Plus Jakarta Sans, sans-serif" fill="#C6B9DA">
                • Verifies user consent
              </text>
              <text x="314" y="162" fontSize="12" fontFamily="Plus Jakarta Sans, sans-serif" fill="#C6B9DA">
                • Blocks invalid actions
              </text>
              <text x="314" y="186" fontSize="10.5" fontFamily="JetBrains Mono, monospace" fill="#E79EFF">
                SERVER ENFORCED
              </text>
            </g>

            <line x1="514" y1="124" x2="566" y2="124" stroke="#E79EFF" strokeWidth="1.5" className={flowClass} markerEnd="url(#arch-arrow-2)" />
            <text x="518" y="114" fontSize="10" fontFamily="JetBrains Mono, monospace" fill="#E79EFF">
              OK
            </text>

            <g
              onClick={() => setSelectedId('rules')}
              onMouseEnter={() => setHoveredId('rules')}
              onMouseLeave={() => setHoveredId(null)}
              className="cursor-pointer focus:outline-none"
              tabIndex={0}
              role="button"
              aria-label="Inspect Verified Server Rules"
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setSelectedId('rules')}
            >
              <rect
                x="572"
                y="46"
                width="228"
                height="158"
                rx="4"
                fill={activeNodeId === 'rules' ? '#241738' : '#120B1C'}
                stroke={activeNodeId === 'rules' ? '#E79EFF' : 'rgba(184,164,255,0.28)'}
                strokeWidth={activeNodeId === 'rules' ? '2' : '1.25'}
              />
              <text x="588" y="70" fontSize="10" fontFamily="JetBrains Mono, monospace" fill="#E79EFF">
                VERIFIED RULES
              </text>
              <text x="588" y="96" fontSize="15" fontFamily="Bricolage Grotesque, sans-serif" fontWeight="600" fill="#F7F3FB">
                Approval Rules
              </text>
              <text x="588" y="122" fontSize="12" fontFamily="Plus Jakarta Sans, sans-serif" fill="#C6B9DA">
                • Clear eligibility checks
              </text>
              <text x="588" y="142" fontSize="12" fontFamily="Plus Jakarta Sans, sans-serif" fill="#C6B9DA">
                • Saved reason history
              </text>
              <text x="588" y="162" fontSize="12" fontFamily="Plus Jakarta Sans, sans-serif" fill="#C6B9DA">
                • Safe lender dispatch
              </text>
              <text x="588" y="186" fontSize="10.5" fontFamily="JetBrains Mono, monospace" fill="#B8A4FF">
                REPEATABLE &amp; TESTED
              </text>
            </g>
          </svg>
        );

      case 'consent-state-flow':
        return (
          <svg
            viewBox="0 0 820 226"
            className="w-full min-w-[620px] h-auto block"
            role="img"
            aria-label="Diagram showing how Verity prevents the same request from being processed twice"
          >
            <defs>
              <marker id="arch-arrow-3" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 1 L 8 5 L 0 9 z" fill="#E79EFF" />
              </marker>
            </defs>

            <text x="20" y="24" fontSize="10" fontFamily="JetBrains Mono, monospace" fill="#C6B9DA">
              PREVENTING THE SAME REQUEST FROM BEING PROCESSED TWICE
            </text>

            <g
              onClick={() => setSelectedId('draft')}
              onMouseEnter={() => setHoveredId('draft')}
              onMouseLeave={() => setHoveredId(null)}
              className="cursor-pointer focus:outline-none"
              tabIndex={0}
              role="button"
              aria-label="Inspect Borrower Permission step"
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setSelectedId('draft')}
            >
              <rect
                x="20"
                y="56"
                width="165"
                height="92"
                rx="4"
                fill={activeNodeId === 'draft' ? '#241738' : '#120B1C'}
                stroke={activeNodeId === 'draft' ? '#E79EFF' : 'rgba(184,164,255,0.28)'}
                strokeWidth={activeNodeId === 'draft' ? '2' : '1.25'}
              />
              <text x="34" y="80" fontSize="10" fontFamily="JetBrains Mono, monospace" fill="#B8A4FF">
                STEP 01
              </text>
              <text x="34" y="102" fontSize="14" fontFamily="Bricolage Grotesque, sans-serif" fontWeight="600" fill="#F7F3FB">
                User Permission
              </text>
              <text x="34" y="122" fontSize="11" fontFamily="Plus Jakarta Sans, sans-serif" fill="#C6B9DA">
                Approved per lender
              </text>
              <text x="34" y="137" fontSize="11" fontFamily="Plus Jakarta Sans, sans-serif" fill="#C6B9DA">
                before sending data
              </text>
            </g>

            <line x1="185" y1="101" x2="225" y2="101" stroke="#E79EFF" strokeWidth="1.5" className={flowClass} markerEnd="url(#arch-arrow-3)" />

            <g
              onClick={() => setSelectedId('locked')}
              onMouseEnter={() => setHoveredId('locked')}
              onMouseLeave={() => setHoveredId(null)}
              className="cursor-pointer focus:outline-none"
              tabIndex={0}
              role="button"
              aria-label="Inspect Unique Request Key step"
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setSelectedId('locked')}
            >
              <rect
                x="231"
                y="56"
                width="168"
                height="92"
                rx="4"
                fill={activeNodeId === 'locked' ? '#2D1442' : '#180E27'}
                stroke={activeNodeId === 'locked' ? '#D96BFF' : 'rgba(217,107,255,0.45)'}
                strokeWidth={activeNodeId === 'locked' ? '2' : '1.5'}
              />
              <text x="245" y="80" fontSize="10" fontFamily="JetBrains Mono, monospace" fill="#E79EFF">
                STEP 02
              </text>
              <text x="245" y="102" fontSize="14" fontFamily="Bricolage Grotesque, sans-serif" fontWeight="600" fill="#F7F3FB">
                Save Unique Key
              </text>
              <text x="245" y="122" fontSize="11" fontFamily="Plus Jakarta Sans, sans-serif" fill="#C6B9DA">
                Locked in PostgreSQL
              </text>
              <text x="245" y="137" fontSize="11" fontFamily="Plus Jakarta Sans, sans-serif" fill="#C6B9DA">
                before the network call
              </text>
            </g>

            <line x1="399" y1="86" x2="624" y2="86" stroke="#E79EFF" strokeWidth="1.5" className={flowClass} markerEnd="url(#arch-arrow-3)" />
            <text x="455" y="76" fontSize="10" fontFamily="JetBrains Mono, monospace" fill="#E79EFF">
              CLEAR REPLY RECEIVED
            </text>

            <path d="M 315 148 L 315 180 L 414 180" fill="none" stroke="#FF6B57" strokeWidth="1.5" className={flowClass} markerEnd="url(#arch-arrow-3)" />
            <text x="198" y="198" fontSize="10" fontFamily="JetBrains Mono, monospace" fill="#FF6B57">
              REPLY LOST / TIMED OUT
            </text>

            <g
              onClick={() => setSelectedId('uncertain')}
              onMouseEnter={() => setHoveredId('uncertain')}
              onMouseLeave={() => setHoveredId(null)}
              className="cursor-pointer focus:outline-none"
              tabIndex={0}
              role="button"
              aria-label="Inspect Lost-Response Check step"
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setSelectedId('uncertain')}
            >
              <rect
                x="420"
                y="144"
                width="178"
                height="66"
                rx="4"
                fill={activeNodeId === 'uncertain' ? '#2F1522' : '#120B1C'}
                stroke={activeNodeId === 'uncertain' ? '#FF6B57' : 'rgba(255,107,87,0.45)'}
                strokeWidth={activeNodeId === 'uncertain' ? '2' : '1.5'}
              />
              <text x="434" y="166" fontSize="10" fontFamily="JetBrains Mono, monospace" fill="#FF6B57">
                STEP 03 · RECOVERY
              </text>
              <text x="434" y="186" fontSize="13" fontFamily="Bricolage Grotesque, sans-serif" fontWeight="600" fill="#F7F3FB">
                Check by Same Key
              </text>
              <text x="434" y="200" fontSize="10.5" fontFamily="Plus Jakarta Sans, sans-serif" fill="#C6B9DA">
                Never submits a duplicate
              </text>
            </g>

            <path d="M 598 176 L 712 176 L 712 154" fill="none" stroke="#E79EFF" strokeWidth="1.5" className={flowClass} markerEnd="url(#arch-arrow-3)" />

            <g
              onClick={() => setSelectedId('terminal')}
              onMouseEnter={() => setHoveredId('terminal')}
              onMouseLeave={() => setHoveredId(null)}
              className="cursor-pointer focus:outline-none"
              tabIndex={0}
              role="button"
              aria-label="Inspect Final Recorded Result step"
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setSelectedId('terminal')}
            >
              <rect
                x="630"
                y="56"
                width="170"
                height="92"
                rx="4"
                fill={activeNodeId === 'terminal' ? '#241738' : '#120B1C'}
                stroke={activeNodeId === 'terminal' ? '#F7F3FB' : 'rgba(184,164,255,0.28)'}
                strokeWidth={activeNodeId === 'terminal' ? '2' : '1.25'}
              />
              <text x="644" y="80" fontSize="10" fontFamily="JetBrains Mono, monospace" fill="#C6B9DA">
                STEP 04
              </text>
              <text x="644" y="102" fontSize="14" fontFamily="Bricolage Grotesque, sans-serif" fontWeight="600" fill="#F7F3FB">
                Recorded Result
              </text>
              <text x="644" y="122" fontSize="11" fontFamily="Plus Jakarta Sans, sans-serif" fill="#C6B9DA">
                Offer or decline saved
              </text>
              <text x="644" y="137" fontSize="11" fontFamily="Plus Jakarta Sans, sans-serif" fill="#C6B9DA">
                with clear reasons
              </text>
            </g>
          </svg>
        );

      case 'document-verification':
        return (
          <svg
            viewBox="0 0 820 226"
            className="w-full min-w-[620px] h-auto block"
            role="img"
            aria-label="Diagram showing how Tender Review reads documents, checks source pages, and sends uncertain results to a person for review"
          >
            <defs>
              <marker id="arch-arrow-4" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 1 L 8 5 L 0 9 z" fill="#E79EFF" />
              </marker>
            </defs>

            <text x="20" y="24" fontSize="10" fontFamily="JetBrains Mono, monospace" fill="#C6B9DA">
              SENDING UNCERTAIN RESULTS TO A PERSON FOR REVIEW
            </text>

            <g
              onClick={() => setSelectedId('ingest')}
              onMouseEnter={() => setHoveredId('ingest')}
              onMouseLeave={() => setHoveredId(null)}
              className="cursor-pointer focus:outline-none"
              tabIndex={0}
              role="button"
              aria-label="Inspect Read Uploaded Files"
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setSelectedId('ingest')}
            >
              <rect
                x="20"
                y="56"
                width="170"
                height="106"
                rx="4"
                fill={activeNodeId === 'ingest' ? '#241738' : '#120B1C'}
                stroke={activeNodeId === 'ingest' ? '#FF6B57' : 'rgba(184,164,255,0.28)'}
                strokeWidth={activeNodeId === 'ingest' ? '2' : '1.25'}
              />
              <text x="34" y="80" fontSize="10" fontFamily="JetBrains Mono, monospace" fill="#FF6B57">
                01 · READ FILES
              </text>
              <text x="34" y="102" fontSize="14" fontFamily="Bricolage Grotesque, sans-serif" fontWeight="600" fill="#F7F3FB">
                Read Documents
              </text>
              <text x="34" y="124" fontSize="11" fontFamily="Plus Jakarta Sans, sans-serif" fill="#C6B9DA">
                PDF, Word &amp; Excel
              </text>
              <text x="34" y="140" fontSize="11" fontFamily="Plus Jakarta Sans, sans-serif" fill="#C6B9DA">
                keeping page numbers
              </text>
            </g>

            <line x1="190" y1="108" x2="220" y2="108" stroke="#E79EFF" strokeWidth="1.5" className={flowClass} markerEnd="url(#arch-arrow-4)" />

            <g
              onClick={() => setSelectedId('normalize')}
              onMouseEnter={() => setHoveredId('normalize')}
              onMouseLeave={() => setHoveredId(null)}
              className="cursor-pointer focus:outline-none"
              tabIndex={0}
              role="button"
              aria-label="Inspect Organize Requirements"
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setSelectedId('normalize')}
            >
              <rect
                x="226"
                y="56"
                width="170"
                height="106"
                rx="4"
                fill={activeNodeId === 'normalize' ? '#241738' : '#120B1C'}
                stroke={activeNodeId === 'normalize' ? '#B8A4FF' : 'rgba(184,164,255,0.28)'}
                strokeWidth={activeNodeId === 'normalize' ? '2' : '1.25'}
              />
              <text x="240" y="80" fontSize="10" fontFamily="JetBrains Mono, monospace" fill="#B8A4FF">
                02 · ORGANIZE
              </text>
              <text x="240" y="102" fontSize="14" fontFamily="Bricolage Grotesque, sans-serif" fontWeight="600" fill="#F7F3FB">
                Clean Checklist
              </text>
              <text x="240" y="124" fontSize="11" fontFamily="Plus Jakarta Sans, sans-serif" fill="#C6B9DA">
                Pulls out specs,
              </text>
              <text x="240" y="140" fontSize="11" fontFamily="Plus Jakarta Sans, sans-serif" fill="#C6B9DA">
                units, and limits
              </text>
            </g>

            <line x1="396" y1="108" x2="426" y2="108" stroke="#E79EFF" strokeWidth="1.5" className={flowClass} markerEnd="url(#arch-arrow-4)" />

            <g
              onClick={() => setSelectedId('verify')}
              onMouseEnter={() => setHoveredId('verify')}
              onMouseLeave={() => setHoveredId(null)}
              className="cursor-pointer focus:outline-none"
              tabIndex={0}
              role="button"
              aria-label="Inspect Check Against Source Pages"
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setSelectedId('verify')}
            >
              <rect
                x="432"
                y="56"
                width="178"
                height="106"
                rx="4"
                fill={activeNodeId === 'verify' ? '#2D1442' : '#180E27'}
                stroke={activeNodeId === 'verify' ? '#D96BFF' : 'rgba(217,107,255,0.45)'}
                strokeWidth={activeNodeId === 'verify' ? '2' : '1.5'}
              />
              <text x="446" y="80" fontSize="10" fontFamily="JetBrains Mono, monospace" fill="#E79EFF">
                03 · SOURCE CHECK
              </text>
              <text x="446" y="102" fontSize="14" fontFamily="Bricolage Grotesque, sans-serif" fontWeight="600" fill="#F7F3FB">
                Verify Proof
              </text>
              <text x="446" y="124" fontSize="11" fontFamily="Plus Jakarta Sans, sans-serif" fill="#C6B9DA">
                Links exact page &amp;
              </text>
              <text x="446" y="140" fontSize="11" fontFamily="Plus Jakarta Sans, sans-serif" fill="#C6B9DA">
                flags missing proof
              </text>
            </g>

            <line x1="610" y1="108" x2="640" y2="108" stroke="#E79EFF" strokeWidth="1.5" className={flowClass} markerEnd="url(#arch-arrow-4)" />

            <g
              onClick={() => setSelectedId('review')}
              onMouseEnter={() => setHoveredId('review')}
              onMouseLeave={() => setHoveredId(null)}
              className="cursor-pointer focus:outline-none"
              tabIndex={0}
              role="button"
              aria-label="Inspect Human Review Sheet"
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setSelectedId('review')}
            >
              <rect
                x="646"
                y="56"
                width="154"
                height="106"
                rx="4"
                fill={activeNodeId === 'review' ? '#241738' : '#120B1C'}
                stroke={activeNodeId === 'review' ? '#F7F3FB' : 'rgba(184,164,255,0.28)'}
                strokeWidth={activeNodeId === 'review' ? '2' : '1.25'}
              />
              <text x="660" y="80" fontSize="10" fontFamily="JetBrains Mono, monospace" fill="#C6B9DA">
                04 · OUTPUT
              </text>
              <text x="660" y="102" fontSize="14" fontFamily="Bricolage Grotesque, sans-serif" fontWeight="600" fill="#F7F3FB">
                Review Sheet
              </text>
              <text x="660" y="124" fontSize="11" fontFamily="Plus Jakarta Sans, sans-serif" fill="#C6B9DA">
                Clear matches +
              </text>
              <text x="660" y="140" fontSize="11" fontFamily="Plus Jakarta Sans, sans-serif" fill="#FF6B57">
                Flagged for person
              </text>
            </g>
          </svg>
        );
    }
  };

  return (
    <div className="border border-[rgba(184,164,255,0.2)] bg-[#160E22]/90">
      <div className="flex flex-wrap items-center justify-between gap-4 px-4 sm:px-6 py-3 border-b border-[rgba(184,164,255,0.14)] bg-[#120B1C]">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 font-mono text-[11px]">
          <span className="text-[#B8A4FF]">■ AI Help</span>
          <span className="text-[#E79EFF]">■ Strict Rules</span>
          <span className="text-[#C6B9DA]">■ Safe Storage</span>
          <span className="text-[#FF6B57]">■ Simulated / External</span>
        </div>

        <button
          type="button"
          onClick={() => setMotionEnabled((prev) => !prev)}
          aria-pressed={motionEnabled}
          className="inline-flex items-center gap-2 px-3 py-1.5 border border-[rgba(184,164,255,0.24)] bg-[#1F1530] hover:border-[#D96BFF] text-xs font-mono text-[#F7F3FB] cursor-pointer whitespace-nowrap shrink-0 min-h-[34px]"
        >
          {motionEnabled ? (
            <>
              <Pause className="w-3 h-3 text-[#E79EFF]" aria-hidden="true" />
              <span>Motion View</span>
            </>
          ) : (
            <>
              <Play className="w-3 h-3 text-[#C6B9DA]" aria-hidden="true" />
              <span>Static View</span>
            </>
          )}
        </button>
      </div>

      <div className="p-4 sm:p-6 overflow-x-auto bg-[#0D0814]/80">{renderSvg()}</div>

      <div className="border-t border-[rgba(184,164,255,0.14)] bg-[#160E22] px-4 sm:px-6 py-4">
        <div className="flex flex-wrap gap-2 mb-3">
          {annotations.map((node) => {
            const active = node.id === selectedNote.id;
            return (
              <button
                key={node.id}
                type="button"
                onClick={() => setSelectedId(node.id)}
                className={`px-3 py-1.5 text-xs font-mono transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer border ${
                  active
                    ? 'bg-gradient-to-r from-[#D96BFF] to-[#FF6B57] text-[#0D0814] font-semibold border-transparent'
                    : 'bg-[#0D0814] text-[#C6B9DA] border-[rgba(184,164,255,0.2)] hover:border-[#D96BFF]'
                }`}
              >
                {node.label}
              </button>
            );
          })}
        </div>
        <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 text-sm">
          <span className={`font-mono text-xs font-medium shrink-0 ${categoryColor(selectedNote.layerCategory)}`}>
            {selectedNote.layerCategory} · {selectedNote.role}:
          </span>
          <p className="text-[#C6B9DA] leading-[1.6]">{selectedNote.detail}</p>
        </div>
      </div>
    </div>
  );
}

/**
 * Verified Controlled-Simulation Lab Results for Verity.
 * Strictly states all tests ran in controlled simulations with no real loans processed.
 */
export function LendingReliabilityHarnessPreview() {
  const checks = [
    {
      id: 'sim-tests',
      label: 'Automated Test Suite',
      metric: '107 backend + 4 browser tests passed',
      detail:
        'Tested backend eligibility rules, consent checks, API routes, and browser flows with pytest and Playwright.',
      note: 'Controlled local test run',
    },
    {
      id: 'sim-faults',
      label: 'Failure Scenarios Built',
      metric: '5 simulated failure scenarios',
      detail:
        'Simulated dropped replies, slow lenders, server errors, changed field formats, and permission changes.',
      note: 'Simulated lenders only',
    },
    {
      id: 'sim-duplicates',
      label: 'Lost-Response Experiment',
      metric: '0 duplicates vs 5 in unsafe version',
      detail:
        'Across 5 lost-response retry trials, Verity avoided duplicate submissions while the intentionally unsafe version created 5 duplicates.',
      note: 'No real loans processed',
    },
  ];

  return (
    <div className="border border-[rgba(184,164,255,0.2)] bg-[#160E22]/90 p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[rgba(184,164,255,0.14)] mb-5">
        <div>
          <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-[#E79EFF]">
            Verity Reliability Lab · Controlled Simulation Results
          </p>
          <p className="text-sm text-[#C6B9DA] mt-1">
            Verified in local simulations and automated test runs — no real loans or live banking APIs were used.
          </p>
        </div>
        <span className="font-mono text-xs text-[#B8A4FF]">
          Controlled simulation only
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {checks.map((item) => (
          <div
            key={item.id}
            className="border border-[rgba(184,164,255,0.14)] bg-[#0D0814]/85 p-4 flex flex-col justify-between"
          >
            <div>
              <p className="font-mono text-[11px] text-[#B8A4FF]">{item.label}</p>
              <p className="mt-2 text-sm font-semibold text-[#F7F3FB] leading-[1.4]">
                {item.metric}
              </p>
              <p className="mt-2 text-xs text-[#C6B9DA] leading-[1.55]">
                {item.detail}
              </p>
            </div>
            <p className="mt-4 pt-3 border-t border-[rgba(184,164,255,0.1)] font-mono text-[11px] text-[#E79EFF]">
              {item.note}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
