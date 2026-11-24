export type PhotoCategory =
  | 'Customer Conversations'
  | 'Partner Coordination'
  | 'Live Technical Demos'
  | 'Team Discussions';

export interface PhotographyAsset {
  id: string;
  filename: string;
  publicSrc: string;
  category: PhotoCategory;
  altText: string;
  caption: string;
  projectAssociation: string;
  date: string;
  /**
   * Natural image ratio & object-position prevent awkward face cropping or stretching.
   */
  aspectRatioClass: string;
  objectPosition: string;
  publicationApproved: boolean;
}

export interface ImageSlotSpec {
  id: string;
  title: string;
  description: string;
  requestedFileHint: string;
}

export const PROJECT_IMAGE_SLOTS: Record<'ai-lending-lab' | 'presales-copilot', ImageSlotSpec[]> = {
  'ai-lending-lab': [
    {
      id: 'verity-borrower-dashboard',
      title: 'Borrower dashboard',
      description: 'Optional image slot — ready for a real screenshot of the Verity borrower intake and dashboard screen.',
      requestedFileHint: 'Screenshot of Verity borrower dashboard',
    },
    {
      id: 'verity-loan-offers',
      title: 'Loan offers and explanations',
      description: 'Optional image slot — ready for a real screenshot showing compared offers and plain-language explanations.',
      requestedFileHint: 'Screenshot of Verity loan offers and explanations',
    },
    {
      id: 'verity-reliability-lab',
      title: 'Reliability testing lab',
      description: 'Optional image slot — ready for a real screenshot of the failure simulation and duplicate-prevention lab.',
      requestedFileHint: 'Screenshot of Verity reliability testing lab',
    },
  ],
  'presales-copilot': [
    {
      id: 'tender-review-interface',
      title: 'Document review interface',
      description: 'Optional image slot — ready for a real screenshot of the Tender Review upload and requirements workspace.',
      requestedFileHint: 'Screenshot of Tender Review document review interface',
    },
    {
      id: 'tender-source-highlighting',
      title: 'Source page highlighting',
      description: 'Optional image slot — ready for a real screenshot showing source-page highlighting alongside checked requirements.',
      requestedFileHint: 'Screenshot of Tender Review source page highlighting',
    },
    {
      id: 'tender-response-sheet',
      title: 'Generated response sheet',
      description: 'Optional image slot — ready for a real screenshot of the generated compliance and response sheet.',
      requestedFileHint: 'Screenshot of Tender Review generated response sheet',
    },
  ],
};

export const PHOTOGRAPHY_MANIFEST: PhotographyAsset[] = [
  {
    id: 'photo-customer-conversation',
    filename: 'Untitled_Design__1__13b0098d.png',
    publicSrc: '/assets/aistudio/Untitled_Design__1__13b0098d.png',
    category: 'Customer Conversations',
    altText:
      'Riya Mahato during a remote one-on-one conversation discussing technical requirements.',
    caption:
      'Discussing technical requirements with customers and engineering teams.',
    projectAssociation: 'Technical Sales Engineering · Discovery',
    date: 'Session photo',
    aspectRatioClass: 'aspect-[16/10]',
    objectPosition: '50% 42%',
    publicationApproved: true,
  },
  {
    id: 'photo-engineering-discussion',
    filename: 'Untitled_Design_cb4d6d4e.png',
    publicSrc: '/assets/aistudio/Untitled_Design_cb4d6d4e.png',
    category: 'Team Discussions',
    altText:
      'Riya Mahato in a four-person video call reviewing project details.',
    caption:
      'Learning from real-world technical and commercial challenges.',
    projectAssociation: 'NB Instrument Pvt. Ltd. · Team Collaboration',
    date: 'Session photo',
    aspectRatioClass: 'aspect-[16/10]',
    objectPosition: '50% 45%',
    publicationApproved: true,
  },
  {
    id: 'photo-technical-demo-1',
    filename: 'image_050f9ad3.png',
    publicSrc: '/assets/aistudio/image_050f9ad3.png',
    category: 'Live Technical Demos',
    altText:
      'Riya Mahato joining a multi-participant remote technical walkthrough.',
    caption:
      'Walking through technical questions and system details in live sessions.',
    projectAssociation: 'Technical Sales Engineering · Walkthroughs',
    date: 'Session photo',
    aspectRatioClass: 'aspect-[16/10]',
    objectPosition: '50% 15%',
    publicationApproved: true,
  },
  {
    id: 'photo-presentation-field',
    filename: 'image_d21f5c86.png',
    publicSrc: '/assets/aistudio/image_d21f5c86.png',
    category: 'Partner Coordination',
    altText:
      'Riya Mahato in an online technical session with international equipment partners.',
    caption:
      'Working with international technology partners.',
    projectAssociation: 'Partner Coordination · Specifications',
    date: 'Session photo',
    aspectRatioClass: 'aspect-[16/10]',
    objectPosition: '50% 18%',
    publicationApproved: true,
  },
  {
    id: 'photo-technical-demo-2',
    filename: 'image_a0cdd727.png',
    publicSrc: '/assets/aistudio/image_a0cdd727.png',
    category: 'Live Technical Demos',
    altText:
      'Riya Mahato participating in a remote product demonstration and briefing call.',
    caption:
      'Reviewing product capabilities and customer requirements with international teams.',
    projectAssociation: 'NB Instrument Pvt. Ltd. · Technical Briefing',
    date: 'Session photo',
    aspectRatioClass: 'aspect-[16/10]',
    objectPosition: '50% 50%',
    publicationApproved: true,
  },
];

export function getApprovedPhotographs(): PhotographyAsset[] {
  return PHOTOGRAPHY_MANIFEST.filter((item) => item.publicationApproved);
}
