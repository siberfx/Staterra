export interface DoelgroepConfig {
  badge: string;
  badgeColor: string;
  solutionSlug: string;
  solutionLabel: string;
}

export const DOELGROEP_CONFIG: Record<string, DoelgroepConfig> = {
  'staterra-gemeenten': {
    badge: 'Gemeenten — 342 in Nederland',
    badgeColor: 'bg-emerald-100 text-emerald-800',
    solutionSlug: '/woo-gemeenten',
    solutionLabel: 'Bekijk de Woo-oplossing voor gemeenten →',
  },
  'staterra-provincies': {
    badge: 'Provincies — 12 provincies',
    badgeColor: 'bg-purple-100 text-purple-800',
    solutionSlug: '/woo-provincies',
    solutionLabel: 'Bekijk de Woo-oplossing voor provincies →',
  },
  'staterra-waterschappen': {
    badge: 'Waterschappen — 21 waterschappen',
    badgeColor: 'bg-cyan-100 text-cyan-800',
    solutionSlug: '/woo-waterschappen',
    solutionLabel: 'Bekijk de Woo-oplossing voor waterschappen →',
  },
  'staterra-rijkspartijen': {
    badge: 'Rijksoverheid — 15 ministeries + ~40 agentschappen',
    badgeColor: 'bg-amber-100 text-amber-800',
    solutionSlug: '/woo-rijksoverheid',
    solutionLabel: 'Bekijk de Woo-oplossing voor de rijksoverheid →',
  },
};
