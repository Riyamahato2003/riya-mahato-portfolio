export type RoutePath =
  | '/'
  | '/work'
  | `/work/${string}`
  | '/systems'
  | '/experience'
  | '/about'
  | '/contact';

export type ProjectStatusKind =
  | 'built-tested'
  | 'live-prototype'
  | 'confidential'
  | 'in-development'
  | 'verification-pending';

export interface ProjectDetailSection {
  problem: string;
  context: string;
  whatIBuilt: {
    summary: string;
    implementedItems?: string[];
    plannedItems?: string[];
    withheldNotice?: string;
  };
  systemArchitecture: {
    summary: string;
    label:
      | 'Tested Simulation Architecture'
      | 'Working Document Review Architecture'
      | 'Confidential — Withheld';
    diagramId?: DiagramId;
    withheldNotice?: string;
  };
  difficultProblems: string[];
  decisionsAndTradeoffs: {
    decision: string;
    rationale: string;
    tradeoff: string;
  }[];
  verificationApproach: string;
  results: {
    statusLabel: string;
    note: string;
  };
  limitations: string[];
  stack: string[];
}

export interface ProjectRecord {
  id: string;
  indexNumber: string;
  slug: string;
  title: string;
  shortTitle: string;
  category: string;
  subtitle: string;
  statusLabel: string;
  statusKind: ProjectStatusKind;
  summary: string;
  plainEnglishOverview: {
    problem: string;
    whatItDoes: string;
    challenge: string;
    achievement: string;
  };
  themes: string[];
  stack: string[];
  confidentialityNotice?: string;
  isConfidential?: boolean;
  hideLinks?: boolean;
  githubUrl: string | null;
  liveDemoUrl: string | null;
  linkPlaceholders?: {
    github: string;
    liveDemo: string;
    metrics: string;
    architecture: string;
  };
  details: ProjectDetailSection;
}

export type CapabilityTier =
  | 'demonstrated'
  | 'ai-agentic'
  | 'backend-integrations'
  | 'evaluation-reliability'
  | 'technical-sales'
  | 'developing';

export interface CapabilityItem {
  id: string;
  name: string;
  tier: CapabilityTier;
  summary: string;
  linkedProjects: string[]; // project slugs or 'experience-nb'
  evidenceNote: string;
}

export type DiagramId =
  | 'lending-workflow'
  | 'decision-boundary'
  | 'consent-state-flow'
  | 'document-verification';

export interface DiagramMetadata {
  id: DiagramId;
  figureNumber: string;
  title: string;
  statusLabel: string;
  isProposed: boolean;
  projectSlug: string;
  projectTitle: string;
  caption: string;
  scopeNote: string;
}

export interface ExperienceItem {
  id: string;
  indexNumber: string;
  role: string;
  promotionNote?: string;
  organization: string;
  location: string;
  dates: string;
  datesConfirmed: boolean;
  contextNote?: string;
  responsibilities: {
    heading: string;
    detail: string;
  }[];
  verificationNote?: string;
}

export const PORTFOLIO_CONFIG = {
  /**
   * Toggle to false to remove OEM Intelligence completely
   * if employer disclosure requirements change.
   */
  showConfidentialOemProject: true,

  githubConfirmed: true,
  githubProfileUrl: 'https://github.com/Riyamahato2003',

  activePipelineLabel: '£1.9M+ active institutional opportunities',
  activePipelineNote:
    '£1.9M+ (including £700K+ and £1.2M+ opportunities) and £350K+ in technical qualification and proposal support.',
} as const;

export const SITE_META = {
  name: 'Riya Mahato',
  role: 'Applied AI Engineer | AI Product Development | Technical Solutions & Business Intelligence',
  shortRole: 'Applied AI Engineer & Technical Solutions Builder',
  location: 'New Delhi, India',
  primaryStatement: 'I build AI Systems that solve real problems.',
  supportingCopy:
    'I work at the intersection of technology, product development, and real customer needs — turning messy, complicated workflows into clear, reliable software.',
  secondaryCopy:
    'Right now, I’m focused on building AI products that people can actually understand, trust, and use.',
  email: 'riyamahato357@gmail.com',
  phone: '+91 7428322658',
  linkedinUrl: 'https://www.linkedin.com/in/riyamahato/',
  githubUrl: 'https://github.com/Riyamahato2003',
} as const;

export const NAV_ITEMS: { index: string; label: string; shortLabel: string; path: RoutePath }[] = [
  { index: '01', label: 'Home', shortLabel: 'Home', path: '/' },
  { index: '02', label: 'Selected Work', shortLabel: 'Selected Work', path: '/work' },
  { index: '03', label: 'Engineering / Systems', shortLabel: 'Systems', path: '/systems' },
  { index: '04', label: 'Experience', shortLabel: 'Experience', path: '/experience' },
  { index: '05', label: 'About', shortLabel: 'About', path: '/about' },
];

export const HERO_METHODOLOGY_STEPS = [
  {
    code: '01',
    label: 'Listen',
    detail: 'Talk with customers and users to find out what actually breaks in their daily workflow.',
  },
  {
    code: '02',
    label: 'Design',
    detail: 'Separate what AI should explain from the rules and checks that software must enforce.',
  },
  {
    code: '03',
    label: 'Build',
    detail: 'Write clean backend rules, readable web screens, and safe error handling around API calls.',
  },
  {
    code: '04',
    label: 'Test',
    detail: 'Run automated checks, simulate dropped connections, and verify answers against source evidence.',
  },
] as const;

export const PROJECTS_DATA: ProjectRecord[] = [
  {
    id: 'ai-lending-lab',
    indexNumber: '01',
    slug: 'ai-lending-reliability-lab',
    title: 'Verity — AI Lending Reliability Lab',
    shortTitle: 'Verity (AI Lending Reliability Lab)',
    category: 'AI Engineering | Financial Technology | Full-Stack Development',
    subtitle:
      'Helping borrowers understand loan offers clearly while preventing duplicate applications and silent failures.',
    statusLabel: 'Built prototype · Tested in controlled simulations',
    statusKind: 'built-tested',
    summary:
      'A full-stack AI lending prototype and reliability testing lab where borrowers control who sees their data, see clear reasons behind each offer, and stay protected when external lender services fail.',
    plainEnglishOverview: {
      problem:
        'Applying for a loan across multiple lenders can get confusing and risky. If a lender service drops a connection or an AI system guesses an answer without checking rules, users can get unclear rejections or duplicate loan submissions.',
      whatItDoes:
        'Verity guides borrowers through a simple intake, lets them grant or revoke permission per simulated lender, runs strict server checks for eligibility, explains offers in plain language, and includes a lab to test network failures safely.',
      challenge:
        'Preventing the same request from being processed twice when a network response gets lost, and making sure AI explanations only report facts verified by the server.',
      achievement:
        'Verified in controlled simulations (no real loans processed): 107 backend tests passed, 4 browser tests passed, 5 simulated failure scenarios implemented, and 0 duplicate effects across a 5-trial lost-response test (vs 5 duplicates in an unsafe baseline).',
    },
    themes: [
      'Three simulated lender services with realistic failure behaviors',
      'Clear per-lender permission and consent controls',
      'AI answers based strictly on information the system can verify',
      'Preventing the same request from being processed twice',
      'Recovering safely when a network reply gets lost',
      'Plain-language explanations tied to rule checks',
      'Built-in reliability testing lab with automated tests',
    ],
    stack: [
      'Python',
      'FastAPI',
      'Next.js',
      'TypeScript',
      'PostgreSQL',
      'pytest',
      'Playwright',
      'Gemini API',
    ],
    githubUrl: 'https://github.com/Riyamahato2003/ai-lending-reliability-lab',
    liveDemoUrl: null,
    linkPlaceholders: {
      github: 'https://github.com/Riyamahato2003/ai-lending-reliability-lab',
      liveDemo: 'Run locally via GitHub repository; screenshots ready to upload.',
      metrics:
        'Controlled simulation: 107 backend tests passed, 4 browser tests passed, 5 simulated failure scenarios, 0 duplicates in 5-trial lost-response test.',
      architecture: 'Diagrams show the tested simulation workflow and failure-recovery flow.',
    },
    details: {
      problem:
        'Connecting a user application to multiple external lenders breaks easily in real life. Lender services can time out after saving a request, return different field formats, or fail mid-step. If an AI assistant sits in the middle without strict rules, retries can submit the same loan twice or give explanations that do not match the real policy.',
      context:
        'Built as an applied AI and systems reliability project to study how financial workflows can stay clear for users and safe under failures. All three lender services are controlled local simulators built for testing — no real borrower data or live financial institutions are connected.',
      whatIBuilt: {
        summary:
          'Built a full-stack application with a borrower interface, FastAPI backend, PostgreSQL database, simulated lender services, and an automated testing suite covering normal flows and injected network faults.',
        implementedItems: [
          'Borrower dashboard and guided intake that keeps AI help separate from server rules.',
          'Permission controls allowing borrowers to approve or withdraw access for each simulated lender.',
          'Strict server checks (FastAPI + Pydantic) so eligibility rules and offer numbers are never guessed by the AI.',
          'PostgreSQL request tracking that locks unique submission keys and checks status instead of blindly retrying.',
          'Three simulated lenders and 5 failure scenarios tested with 107 pytest backend tests and 4 Playwright browser tests.',
        ],
      },
      systemArchitecture: {
        summary:
          'User messages and form inputs are checked on the server before anything is saved or sent. Permission tokens, unique request keys, and PostgreSQL records protect every call to the three simulated lenders, while the AI layer only explains verified outcomes.',
        label: 'Tested Simulation Architecture',
        diagramId: 'lending-workflow',
      },
      difficultProblems: [
        'Handling a lost response (where a lender saved the application but the reply timed out) without creating duplicate submissions on retry.',
        'Making sure AI explanations strictly reflect the actual server eligibility rules instead of inventing friendly-sounding guesses.',
        'Stopping retries immediately if a borrower turns off permission for a specific lender.',
        'Keeping three simulated lenders with different data rules consistent inside one readable offer comparison view.',
      ],
      decisionsAndTradeoffs: [
        {
          decision: 'Keep all approval checks and state updates inside deterministic backend code.',
          rationale:
            'Financial rules need to give the exact same answer for the same inputs and remain easy to inspect and test.',
          tradeoff:
            'Takes more explicit Python rule code upfront than letting an AI prompt handle edge cases.',
        },
        {
          decision: 'Record a unique request key in PostgreSQL before contacting any simulated lender.',
          rationale:
            'If the reply drops, the system can check the existing record safely instead of accidentally creating a second submission.',
          tradeoff:
            'Requires extra status-check logic and database state tracking for each lender call.',
        },
        {
          decision: 'Test against fault-injecting simulated lenders and an intentionally unsafe baseline.',
          rationale:
            'Comparing the protected workflow side by side against an unprotected version proves duplicate prevention actually works.',
          tradeoff:
            'Adds local simulation setup instead of simple static mock responses.',
        },
      ],
      verificationApproach:
        'Verified using 107 automated pytest backend checks, 4 Playwright end-to-end browser tests, 5 simulated failure scenarios, and a controlled 5-trial lost-response comparison against an intentionally unsafe baseline.',
      results: {
        statusLabel: 'Controlled simulations passed · No real loans processed',
        note: 'In controlled testing: 107 backend tests passed, 4 browser tests passed, and 5 simulated failure scenarios were implemented. In a 5-trial lost-response experiment, the protected system produced 0 duplicates while the intentionally unsafe version produced 5 duplicates.',
      },
      limitations: [
        'All lender connections are controlled simulations — no real financial institutions or live credit bureaus are connected.',
        'Results come from automated local tests and controlled experiments rather than live banking traffic.',
      ],
      stack: [
        'Python',
        'FastAPI',
        'Next.js',
        'TypeScript',
        'PostgreSQL',
        'Pydantic',
        'pytest',
        'Playwright',
        'Gemini API',
      ],
    },
  },
  {
    id: 'presales-copilot',
    indexNumber: '02',
    slug: 'presales-copilot-tender-compliance',
    title: 'Tender Review — Making Long Technical Documents Easier to Understand',
    shortTitle: 'Tender Review',
    category: 'Document AI | LLM Applications | Workflow Automation',
    subtitle:
      'Checking long tender PDFs and technical datasheets while keeping every answer tied to its exact source page.',
    statusLabel: 'Live prototype · Public GitHub & Vercel demo',
    statusKind: 'live-prototype',
    summary:
      'A document AI workflow that turns dense tender documents and datasheets into organized review sheets, links every statement back to source pages, and sends uncertain results to a person for review.',
    plainEnglishOverview: {
      problem:
        'Long technical tender documents and supplier datasheets take hours to read by hand. Important specifications sit scattered across PDFs, Word docs, and spreadsheets, making it easy to miss details.',
      whatItDoes:
        'Tender Review extracts requirements from uploaded files, matches them against supporting product documents, highlights the exact source pages, and builds a clean review sheet that marks anything uncertain for a human check.',
      challenge:
        'Keeping exact page and table references intact across messy documents, and making sure missing evidence is flagged clearly rather than guessed.',
      achievement:
        'Built and deployed a working live prototype on Vercel with public source code on GitHub that keeps reviewers anchored to original document proof.',
    },
    themes: [
      'Reads PDF, Word (DOCX), and Excel (XLSX) technical files',
      'Organizes scattered requirements into a clean checklist',
      'Links answers directly to source pages and excerpts',
      'Sends uncertain or missing evidence to a person for review',
      'Generates a structured response and compliance sheet',
    ],
    stack: [
      'Python',
      'TypeScript',
      'Next.js',
      'Node.js',
      'PDF / DOCX / XLSX Parsing',
      'Structured JSON',
    ],
    githubUrl: 'https://github.com/Riyamahato2003/Tender-compliance-engine',
    liveDemoUrl: 'https://tender-compliance-engine.vercel.app/',
    linkPlaceholders: {
      github: 'https://github.com/Riyamahato2003/Tender-compliance-engine',
      liveDemo: 'https://tender-compliance-engine.vercel.app/',
      metrics: 'Live prototype deployed on Vercel; real app screenshots ready to upload.',
      architecture: 'Diagram shows how uploaded files move from parsing to human review.',
    },
    details: {
      problem:
        'Technical tenders and equipment datasheets are slow and tiring to check manually. Requirements like operating limits, calibration tolerances, and compliance clauses are spread across hundreds of pages of PDFs, Word files, and Excel sheets. Missing one detail or guessing an answer can create costly mistakes.',
      context:
        'Inspired directly by real technical sales and proposal work, where engineers and teams need fast answers without losing trust in where each fact came from.',
      whatIBuilt: {
        summary:
          'Built a document review pipeline and web app that reads technical files, structures requirements into clean rows, checks source references, and highlights gaps for human sign-off.',
        implementedItems: [
          'Document upload and parsing across PDF, DOCX, and XLSX files while keeping page and section anchors.',
          'Requirement extraction into structured fields with units, limits, and mandatory flags.',
          'Source checking that ties each answer to a visible excerpt or marks it as needing review.',
          'Exportable response sheet separating clear matches from items that need a human decision.',
        ],
      },
      systemArchitecture: {
        summary:
          'Files pass through format-aware parsing that keeps page numbers, then into structured requirement extraction, source-reference checking, and a clean review table for final human approval.',
        label: 'Working Document Review Architecture',
        diagramId: 'document-verification',
      },
      difficultProblems: [
        'Pulling clean rows out of inconsistent multi-column PDF tables and footnotes without scrambling units.',
        'Separating true non-compliance from cases where a datasheet simply does not mention a specification.',
        'Ensuring no answer appears without either a matching source excerpt or a clear review warning.',
      ],
      decisionsAndTradeoffs: [
        {
          decision: 'Send uncertain or unsupported matches to a person for review instead of guessing.',
          rationale:
            'In tender reviews, one wrong "Compliant" answer causes far more trouble than flagging a row for a quick human check.',
          tradeoff:
            'Requires a reviewer to resolve flagged rows instead of pretending the sheet is 100% finished automatically.',
        },
        {
          decision: 'Convert messy text into structured JSON rows before checking rules.',
          rationale:
            'Makes it straightforward to compare numbers, units, and required fields consistently.',
          tradeoff:
            'Unusually formatted tables still benefit from parser cleanup and manual spot-checks.',
        },
      ],
      verificationApproach:
        'Checked through schema validation on extracted rows, mandatory source-pointer checks on generated answers, and side-by-side comparison against original tender documents.',
      results: {
        statusLabel: 'Live prototype active on GitHub and Vercel',
        note: 'Publicly inspectable code and live web demo are available. Real customer processing-time benchmarks are omitted so no unmeasured numbers are claimed.',
      },
      limitations: [
        'Image-only scanned PDFs or heavily nested tables lower text extraction quality and trigger manual review flags.',
        'Final technical sign-off always belongs to the human reviewer.',
      ],
      stack: [
        'Python',
        'TypeScript',
        'Next.js',
        'Node.js',
        'PDF parsing',
        'DOCX/XLSX processing',
        'Structured JSON',
      ],
    },
  },
  {
    id: 'oem-intelligence',
    indexNumber: '03',
    slug: 'oem-intelligence',
    title: 'OEM Intelligence',
    shortTitle: 'OEM Intelligence',
    category: 'Confidential Professional Work | Evidence & Research Workflows',
    subtitle: 'Connecting verified product details with external research under strict review.',
    statusLabel: 'Confidential professional work',
    statusKind: 'confidential',
    summary:
      'A professional technical intelligence project built to connect verified product information with outside scientific research while keeping human review and clear evidence front and center.',
    plainEnglishOverview: {
      problem:
        'Matching specialized product capabilities with external research papers and changing technical requirements takes careful cross-checking and cannot rely on guesswork.',
      whatItDoes:
        'Connects validated internal product facts with external research findings, checks technical limits, and highlights uncertain matches for human review.',
      challenge:
        'Keeping every match linked to real evidence and surfacing missing specifications clearly instead of hiding gaps.',
      achievement:
        'Contributed to structured data pipelines and review-ready engineering workflows (client details, code, and metrics remain under NDA).',
    },
    themes: [
      'Multi-source research workflows',
      'Evidence-backed product information',
      'Clear technical limit checks',
      'Sending uncertain matches for human review',
      'Traceable decision history',
    ],
    stack: [
      'Python',
      'React',
      'JavaScript',
      'Research pipelines',
      'Structured data processing',
      'Rule checking',
      'Human review workflows',
    ],
    confidentialityNotice: 'Confidential professional work — selected details withheld under NDA.',
    isConfidential: true,
    hideLinks: true,
    githubUrl: null,
    liveDemoUrl: null,
    details: {
      problem:
        'In specialized scientific and industrial work, comparing product capabilities against outside research papers and customer requirements requires strict accuracy without unverified assumptions.',
      context:
        'Built in a professional setting covered by confidentiality agreements. Partner names, customer identities, internal tools, and business figures are intentionally withheld.',
      whatIBuilt: {
        summary:
          'Contributed to structured workflows linking verified product specifications with external technical research through clear checks and human review steps.',
        withheldNotice:
          'Confidential professional work — selected details withheld. Internal interfaces, datasets, repositories, and client specifics cannot be shared.',
      },
      systemArchitecture: {
        summary:
          'Focused on keeping research collection, rule checking, source tracking, and human review queues clearly separated.',
        label: 'Confidential — Withheld',
        withheldNotice:
          'Internal system diagrams, schemas, and infrastructure details are withheld under NDA.',
      },
      difficultProblems: [
        'Keeping clear links between extracted findings and their original research sources.',
        'Surfacing specification mismatches early instead of forcing weak matches.',
        'Making gaps and incomplete data obvious to human reviewers.',
      ],
      decisionsAndTradeoffs: [
        {
          decision: 'Require rule checks and human review for uncertain technical matches.',
          rationale:
            'Specialized technical decisions cannot tolerate silent guesses or misread limits.',
          tradeoff:
            'Adds an explicit human review step instead of pushing uncertain matches straight through.',
        },
        {
          decision: 'Keep source evidence separate from summary displays.',
          rationale:
            'Makes it easy for technical teams to check why an item was matched or flagged.',
          tradeoff:
            'Requires cleaner data structuring earlier in the pipeline.',
        },
      ],
      verificationApproach:
        'Built around traceable evidence links, clear failure visibility, and human review of uncertain matches. Internal test counts remain confidential.',
      results: {
        statusLabel: 'Confidential professional work — details withheld',
        note: 'Business results, internal usage numbers, and evaluation benchmarks are protected under NDA and intentionally omitted.',
      },
      limitations: [
        'Public discussion is limited to high-level engineering themes.',
        'No live demo, screenshots, or repository links can be shared.',
      ],
      stack: [
        'Python',
        'React',
        'JavaScript',
        'Research pipelines',
        'Structured data processing',
        'Rule checking',
        'Human review workflows',
      ],
    },
  },
];

export const CAPABILITIES_DATA: CapabilityItem[] = [
  {
    id: 'cap-ai-products',
    name: 'AI Products & Grounded Outputs',
    tier: 'ai-agentic',
    summary:
      'LLM integration, prompt engineering, structured extraction, tool calling, document AI, AI evaluation, and human review.',
    linkedProjects: ['ai-lending-reliability-lab', 'presales-copilot-tender-compliance', 'oem-intelligence'],
    evidenceNote: 'Applied in Verity, Tender Review, and OEM Intelligence workflows.',
  },
  {
    id: 'cap-python-backend',
    name: 'Python, FastAPI, SQL & PostgreSQL',
    tier: 'backend-integrations',
    summary:
      'Backend APIs, database modeling, REST integrations, and document parsing pipelines.',
    linkedProjects: ['ai-lending-reliability-lab', 'presales-copilot-tender-compliance'],
    evidenceNote: 'Powers Verity’s backend rules/ledger and Tender Review’s extraction pipeline.',
  },
  {
    id: 'cap-frontend',
    name: 'JavaScript, TypeScript, React & Next.js',
    tier: 'demonstrated',
    summary:
      'Full-stack web interfaces, interactive review tables, and readable user dashboards.',
    linkedProjects: ['ai-lending-reliability-lab', 'presales-copilot-tender-compliance', 'oem-intelligence'],
    evidenceNote: 'Used across personal AI prototypes and professional web applications.',
  },
  {
    id: 'cap-doc-processing',
    name: 'Document AI & Structured Extraction',
    tier: 'demonstrated',
    summary:
      'Parsing PDF, DOCX, and XLSX documents into clean structured checklists with page references.',
    linkedProjects: ['presales-copilot-tender-compliance', 'experience-nb'],
    evidenceNote: 'Core workflow inside Tender Review.',
  },
  {
    id: 'cap-reliable-systems',
    name: 'Permissions, Approvals & Failure Recovery',
    tier: 'evaluation-reliability',
    summary:
      'Authentication, permissions, approvals, error handling, failure recovery, and audit history.',
    linkedProjects: ['ai-lending-reliability-lab', 'presales-copilot-tender-compliance'],
    evidenceNote: 'Prevents duplicate submissions and protects user consent in Verity.',
  },
  {
    id: 'cap-testing',
    name: 'Automated Testing (pytest & Playwright)',
    tier: 'developing',
    summary:
      'Writing backend unit/integration tests and end-to-end browser checks across failure scenarios.',
    linkedProjects: ['ai-lending-reliability-lab'],
    evidenceNote: '107 pytest backend tests and 4 Playwright browser tests in Verity.',
  },
  {
    id: 'cap-discovery',
    name: 'Customer Discovery, Demos & International OEM Coordination',
    tier: 'technical-sales',
    summary:
      'Customer discovery, technical demonstrations, international partner coordination, market research, tender analysis, documentation, Airtable, and CRM workflows.',
    linkedProjects: ['experience-nb', 'presales-copilot-tender-compliance'],
    evidenceNote: 'Practiced directly at NB Instrument Pvt. Ltd.',
  },
];

export const ARCHITECTURE_DIAGRAMS: DiagramMetadata[] = [
  {
    id: 'lending-workflow',
    figureNumber: 'FIG. 01',
    title: 'Verity — Safe Request Flow & Failure Testing',
    statusLabel: 'Controlled Simulation Architecture',
    isProposed: false,
    projectSlug: 'ai-lending-reliability-lab',
    projectTitle: 'Verity — AI Lending Reliability Lab',
    caption:
      'Shows how borrower requests are checked on the server, paired with explicit permission and a unique key, and safely sent to three simulated lenders.',
    scopeNote:
      'Tested in controlled local simulations (107 backend tests, 4 browser tests). No real loans are processed.',
  },
  {
    id: 'decision-boundary',
    figureNumber: 'FIG. 02',
    title: 'AI Answers Based on Information the System Can Verify',
    statusLabel: 'Control Boundary',
    isProposed: false,
    projectSlug: 'ai-lending-reliability-lab',
    projectTitle: 'Verity — AI Lending Reliability Lab',
    caption:
      'Separates helpful AI language support from strict server checks so the AI only explains facts the backend has already verified.',
    scopeNote:
      'Prevents AI guesses from changing eligibility outcomes or database records.',
  },
  {
    id: 'consent-state-flow',
    figureNumber: 'FIG. 03',
    title: 'Preventing the Same Request From Being Processed Twice',
    statusLabel: 'Safe Retry & Permission Flow',
    isProposed: false,
    projectSlug: 'ai-lending-reliability-lab',
    projectTitle: 'Verity — AI Lending Reliability Lab',
    caption:
      'Shows how borrower permission, unique request keys, and status checks recover cleanly if a lender response drops mid-call.',
    scopeNote:
      'Verified in a 5-trial lost-response experiment: 0 duplicates in the protected flow vs 5 in the unsafe version.',
  },
  {
    id: 'document-verification',
    figureNumber: 'FIG. 04',
    title: 'Sending Uncertain Results to a Person for Review',
    statusLabel: 'Live Document Review Workflow',
    isProposed: false,
    projectSlug: 'presales-copilot-tender-compliance',
    projectTitle: 'Tender Review',
    caption:
      'Shows how uploaded PDFs, Word docs, and spreadsheets turn into structured checklists tied to source pages, with uncertain items flagged for a human check.',
    scopeNote:
      'Powers the Tender Review prototype without exposing proprietary customer files.',
  },
];

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: 'nb-tse',
    indexNumber: '01',
    role: 'Technical Sales Engineer',
    promotionNote: 'Promoted from Sales Engineering Intern',
    organization: 'NB Instrument Pvt. Ltd.',
    location: 'New Delhi, India',
    dates: 'January 2026 – Present',
    datesConfirmed: true,
    contextNote:
      'Supporting £1.9M+ in active institutional opportunities, including £700K+ and £1.2M+ multi-system requirements.',
    responsibilities: [
      {
        heading: 'Working with international technology partners',
        detail:
          'Coordinate directly with international equipment makers to verify product compatibility, specifications, and technical answers for customers.',
      },
      {
        heading: 'Handling complex technical deals',
        detail:
          'Lead technical qualification across £1.9M+ in active institutional opportunities, including £700K+ and £1.2M+ multi-system requirements.',
      },
      {
        heading: 'Understanding customer needs and translating requirements',
        detail:
          'Run technical discovery conversations with researchers and engineering teams to turn complex lab needs into clear system specifications.',
      },
      {
        heading: 'Creating clear technical demos and documentation',
        detail:
          'Build product walkthroughs, specification comparisons, and technical proposal documents that both engineers and buyers can follow easily.',
      },
      {
        heading: 'Tracking opportunities and building internal workflows',
        detail:
          'Organize CRM records, Airtable tracking, and qualification checklists so technical handoffs stay consistent.',
      },
      {
        heading: 'Building internal AI Systems',
        detail:
          'Create practical AI Systems to make checking long datasheets, requirements, and technical documents faster and more reliable.',
      },
    ],
  },
  {
    id: 'nb-intern',
    indexNumber: '02',
    role: 'Sales Engineering Intern',
    organization: 'NB Instrument Pvt. Ltd.',
    location: 'New Delhi, India',
    dates: 'July 2025 – December 2025',
    datesConfirmed: true,
    responsibilities: [
      {
        heading: 'Supporting live technical calls and demos',
        detail:
          'Assisted customer discovery meetings, product demonstrations, and technical Q&A alongside senior engineers.',
      },
      {
        heading: 'Preparing technical proposals and comparisons',
        detail:
          'Helped compare equipment specifications and prepare documentation supporting £350K+ in active opportunity proposals.',
      },
      {
        heading: 'Coordinating with international suppliers',
        detail:
          'Followed up on technical clarifications, datasheets, and delivery questions with international partners.',
      },
      {
        heading: 'Researching markets and institutional buyers',
        detail:
          'Researched laboratories, technical requirements, and target accounts across specialized scientific domains.',
      },
      {
        heading: 'Documenting repeatable team processes',
        detail:
          'Helped organize CRM records and sales-engineering checklists for smoother proposal preparation.',
      },
    ],
  },
];

export const EDUCATION_DATA = {
  degree: 'B.Tech, Computer Science and Engineering (AI & ML)',
  institution: 'VIT Bhopal University',
  expectedGraduation: '2023–2027',
  focusNote:
    'Combining computer science and machine learning coursework with hands-on AI product building and real customer-facing engineering work.',
} as const;

export const ABOUT_NARRATIVE = {
  lead: 'I like building technology that makes difficult work easier.',
  sections: [
    {
      heading: 'Two sides of the same problem',
      paragraphs: [
        'I’m a Computer Science student specializing in AI and Machine Learning at VIT Bhopal University (2023–2027), and I work as a Technical Sales Engineer in New Delhi.',
        'Working closely with customers, researchers, and international engineering partners taught me something simple: software rarely fails because the model isn’t smart enough. It fails when nobody understood the real problem or made the output easy to trust.',
      ],
    },
    {
      heading: 'How I build AI products',
      paragraphs: [
        'That perspective shapes every tool I build. Whether I’m working on Verity or Tender Review, I try to keep AI helpful without making it mysterious — tying answers to real source pages, checking rules on the server, and handling network failures cleanly.',
        'I enjoy working on applied AI, product development, and technical solutions where talking to users, understanding business context, and writing reliable software all sit together.',
      ],
    },
  ],
  principles: [
    {
      index: '01',
      title: 'Start with the real problem',
      body: 'Listen to how people actually work before picking a model or writing an API.',
    },
    {
      index: '02',
      title: 'Keep AI grounded in facts',
      body: 'Tie generated answers to source pages or verified backend rules so users can check them.',
    },
    {
      index: '03',
      title: 'Flag uncertainty honestly',
      body: 'When evidence is missing or a connection drops, show it clearly instead of guessing.',
    },
    {
      index: '04',
      title: 'Make complexity easy to follow',
      body: 'Software should feel clear to a customer and hold up under an engineer’s inspection.',
    },
  ],
} as const;

export function getVisibleProjects(): ProjectRecord[] {
  return PORTFOLIO_CONFIG.showConfidentialOemProject
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter((p) => !p.isConfidential);
}

export function getProjectBySlug(slug: string): ProjectRecord | undefined {
  return getVisibleProjects().find((p) => p.slug === slug);
}
