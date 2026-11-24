/**
 * Shared, verified store for project test outcomes and screenshot slot metadata.
 * All simulation metrics are explicitly scoped to controlled test environments.
 */

export interface VerifiedProjectResults {
  projectId: string;
  verifiedMetricsAvailable: boolean;
  statusText: string;
  simulationDisclaimer?: string;
  metrics: {
    label: string;
    value: string;
    verificationMethod: string;
  }[];
  lastReviewed: string;
}

export const PROJECT_RESULTS: Record<string, VerifiedProjectResults> = {
  'ai-lending-lab': {
    projectId: 'ai-lending-lab',
    verifiedMetricsAvailable: true,
    statusText:
      'Tested in controlled simulations (no real loans processed): 107 backend tests passed, 4 browser tests passed, and 5 simulated failure scenarios implemented.',
    simulationDisclaimer:
      'All results below come from controlled local simulations and automated test runs. No real borrower data or live financial transactions were processed.',
    metrics: [
      {
        label: 'Backend tests passed',
        value: '107 passed',
        verificationMethod: 'Automated pytest suite (controlled simulation)',
      },
      {
        label: 'Browser tests passed',
        value: '4 passed',
        verificationMethod: 'Playwright end-to-end tests',
      },
      {
        label: 'Simulated failure scenarios',
        value: '5 scenarios',
        verificationMethod: 'Injected timeout, error, and retry faults',
      },
      {
        label: '5-trial lost-response test',
        value: '0 duplicates vs 5 in unsafe baseline',
        verificationMethod: 'Controlled lost-response retry experiment',
      },
    ],
    lastReviewed: 'Controlled simulation verified',
  },
  'presales-copilot': {
    projectId: 'presales-copilot',
    verifiedMetricsAvailable: false,
    statusText:
      'Live prototype deployed on Vercel with public GitHub repository; source-page checking and human review flags are active.',
    metrics: [],
    lastReviewed: 'Live prototype active',
  },
  'oem-intelligence': {
    projectId: 'oem-intelligence',
    verifiedMetricsAvailable: false,
    statusText:
      'Confidential professional project — internal metrics and client details are withheld under NDA.',
    metrics: [],
    lastReviewed: 'Withheld (NDA)',
  },
};
