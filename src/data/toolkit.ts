export type SectionId = 'work' | 'beyond-the-code' | 'experience' | 'expertise' | 'about' | 'contact';

export interface ToolkitCategory {
  id: string;
  index: string;
  title: string;
  skills: string[];
  maturityLabel: string;
  isDeveloping?: boolean;
  linkedProjectIds: string[];
  note: string;
}

export const ONE_PAGE_NAV_ITEMS: { label: string; targetId: SectionId }[] = [
  { label: 'WORK', targetId: 'work' },
  { label: 'EXPERIENCE', targetId: 'experience' },
  { label: 'EXPERTISE', targetId: 'expertise' },
  { label: 'ABOUT', targetId: 'about' },
  { label: 'CONTACT', targetId: 'contact' },
];

export const TOOLKIT_CATEGORIES: ToolkitCategory[] = [
  {
    id: 'tk-ai-products',
    index: '01',
    title: 'AI Products',
    skills: [
      'LLM integration',
      'Prompt engineering',
      'Structured extraction',
      'Tool calling',
      'Document AI',
      'AI evaluation',
      'Human review',
    ],
    maturityLabel:
      'Built directly into Verity and Tender Review — keeping AI answers tied to verified data and human review.',
    linkedProjectIds: ['ai-lending-lab', 'presales-copilot', 'oem-intelligence'],
    note: 'Using language models where they help people most, while keeping answers tied to real sources and clear checks.',
  },
  {
    id: 'tk-software-dev',
    index: '02',
    title: 'Software Development',
    skills: [
      'Python',
      'JavaScript',
      'TypeScript',
      'SQL',
      'FastAPI',
      'React',
      'Next.js',
      'PostgreSQL',
      'REST APIs',
      'Git',
      'GitHub',
    ],
    maturityLabel:
      'Applied across full-stack prototypes, backend APIs, document parsers, and clean web interfaces.',
    linkedProjectIds: ['ai-lending-lab', 'presales-copilot', 'oem-intelligence'],
    note: 'Building practical full-stack web apps from database models and backend APIs up to responsive user interfaces.',
  },
  {
    id: 'tk-reliable-systems',
    index: '03',
    title: 'Reliable Systems',
    skills: [
      'Authentication',
      'Permissions',
      'Approvals',
      'Error handling',
      'Failure recovery',
      'Audit history',
      'Testing',
      'pytest',
      'Playwright',
    ],
    maturityLabel:
      'Practiced and tested in Verity (107 backend tests & 4 browser tests in controlled simulation) and Tender Review.',
    isDeveloping: true,
    linkedProjectIds: ['ai-lending-lab', 'presales-copilot', 'oem-intelligence'],
    note: 'Preventing duplicate actions, protecting user permissions, recovering cleanly from network failures, and writing automated tests.',
  },
  {
    id: 'tk-customers-business',
    index: '04',
    title: 'Customers and Business',
    skills: [
      'Customer discovery',
      'Technical demonstrations',
      'International OEM coordination',
      'Market research',
      'Tender analysis',
      'Technical documentation',
      'Airtable',
      'CRM workflows',
    ],
    maturityLabel:
      'Practiced daily at NB Instrument Pvt. Ltd. across customer calls, international partner coordination, and active pipeline tracking.',
    linkedProjectIds: ['experience-nb', 'presales-copilot'],
    note: 'Listening carefully to customer problems, coordinating with international engineering partners, and turning technical details into clear proposals.',
  },
];

export const DEVELOPING_SKILLS_NOTE = {
  title: 'Currently Deepening (Hands-On Practice)',
  items: [
    'Handling tricky network timeouts and database transactions in PostgreSQL',
    'Simulating real-world service failures and testing recovery with pytest and Playwright',
    'Designing clear permission checks and audit trails for multi-step AI Systems',
  ],
  disclaimer:
    'Built and tested inside Verity and ongoing personal engineering work — always clearly separated from production claims.',
};
