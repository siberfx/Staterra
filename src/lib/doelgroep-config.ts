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
    heroSubtitle: 'Van griffie tot vergunningenloket: elke gemeente is zelfstandig verantwoordelijk voor actieve openbaarmaking. Staterra levert een werkende oplossing die past bij uw schaal — van gedeeld SaaS-model tot eigen omgeving.',
    solutionSlug: '/woo-gemeenten',
    solutionLabel: 'Bekijk de Woo-oplossing voor gemeenten →',
  },
  'staterra-provincies': {
    badge: `Provincies — alle ${stats.provincies}`,
    badgeColor: 'bg-purple-100 text-purple-800',
    heroTitle: `Alle ${stats.provincies} provincies vallen onder de Woo`,
    heroSubtitle: 'Als middenbestuur heeft u een voorbeeldfunctie in transparantie. Van omgevingsvisies tot Statenbesluiten — Staterra levert een Woo-oplossing die aansluit op uw documentbeheersystemen en werkprocessen.',
    solutionSlug: '/woo-provincies',
    solutionLabel: 'Bekijk de Woo-oplossing voor provincies →',
  },
  'staterra-waterschappen': {
    badge: `Waterschappen — alle ${stats.waterschappen}`,
    badgeColor: 'bg-cyan-100 text-cyan-800',
    heroTitle: `${stats.waterschappen} waterschappen, één Woo-verplichting`,
    heroSubtitle: 'Van keurvergunningen en peilbesluiten tot waterbeheerplannen — waterschappen publiceren documenten die nergens anders voorkomen. Staterra levert een oplossing die past bij uw unieke publicatiebehoeften.',
    solutionSlug: '/woo-waterschappen',
    solutionLabel: 'Bekijk de Woo-oplossing voor waterschappen →',
  },
  'staterra-rijkspartijen': {
    badge: `Rijksoverheid — ${stats.rijksbestuursorganen} organen`,
    badgeColor: 'bg-amber-100 text-amber-800',
    heroTitle: `${stats.rijksbestuursorganen} rijksbestuursorganen onder de Woo`,
    heroSubtitle: `Verdeeld over ${stats.kerndepartementen} departementen — van kerndepartementen tot agentschappen en ZBO's. OPMS past binnen het comply-or-explain beleid en is bewezen bij het ministerie van JenV.`,
    solutionSlug: '/woo-rijksoverheid',
    solutionLabel: 'Bekijk de Woo-oplossing voor de rijksoverheid →',
  },
};
