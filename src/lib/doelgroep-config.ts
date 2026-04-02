import { BESTUURSORGANEN_STATS as stats } from '@/lib/data/bestuursorganen-stats';

export interface DoelgroepConfig {
  badge: string;
  badgeColor: string;
  heroTitle: string;
  heroSubtitle: string;
  solutionSlug: string;
  solutionLabel: string;
}

export const DOELGROEP_CONFIG: Record<string, DoelgroepConfig> = {
  'staterra-gemeenten': {
    badge: `Gemeenten — ${stats.gemeenten} in Nederland`,
    badgeColor: 'bg-emerald-100 text-emerald-800',
    heroTitle: `${stats.gemeenten} gemeenten moeten voldoen aan de Woo`,
    heroSubtitle: 'Elke gemeente is zelfstandig verantwoordelijk voor openbaarmaking. Wij bieden een werkende oplossing — direct inzetbaar, open source en zonder vendor lock-in.',
    solutionSlug: '/woo-gemeenten',
    solutionLabel: 'Bekijk de Woo-oplossing voor gemeenten →',
  },
  'staterra-provincies': {
    badge: `Provincies — alle ${stats.provincies}`,
    badgeColor: 'bg-purple-100 text-purple-800',
    heroTitle: `Alle ${stats.provincies} provincies vallen onder de Woo`,
    heroSubtitle: 'Als provincie heeft u een voorbeeldfunctie in transparantie. Onze OPMS-oplossing sluit naadloos aan op uw bestaande documentbeheersystemen.',
    solutionSlug: '/woo-provincies',
    solutionLabel: 'Bekijk de Woo-oplossing voor provincies →',
  },
  'staterra-waterschappen': {
    badge: `Waterschappen — alle ${stats.waterschappen}`,
    badgeColor: 'bg-cyan-100 text-cyan-800',
    heroTitle: `${stats.waterschappen} waterschappen, één Woo-verplichting`,
    heroSubtitle: 'Als waterschap publiceert u besluitdocumenten, vergunningen en beleidsstukken. Onze oplossing maakt openbaarmaking eenvoudig en controleerbaar.',
    solutionSlug: '/woo-waterschappen',
    solutionLabel: 'Bekijk de Woo-oplossing voor waterschappen →',
  },
  'staterra-rijkspartijen': {
    badge: `Rijksoverheid — ${stats.rijksbestuursorganen} organen`,
    badgeColor: 'bg-amber-100 text-amber-800',
    heroTitle: `${stats.rijksbestuursorganen} rijksbestuursorganen onder de Woo`,
    heroSubtitle: `Verdeeld over ${stats.kerndepartementen} departementen — van agentschappen tot ZBO's. De OPMS-oplossing is ontwikkeld in samenwerking met het ministerie van JenV.`,
    solutionSlug: '/woo-rijkspartijen',
    solutionLabel: 'Bekijk de Woo-oplossing voor de rijksoverheid →',
  },
};
