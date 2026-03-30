import type { Metadata } from 'next';
import { getHomepage } from '@/lib/cms';
import { Hero } from '@/components/sections/Hero';
import { StatsBlock } from '@/components/sections/StatsBlock';
import { PainPointTabs } from '@/components/sections/PainPointTabs';
import { CompetitionBlock } from '@/components/sections/CompetitionBlock';
import { HowItWorksBlock } from '@/components/sections/HowItWorksBlock';
import { SolutionCards } from '@/components/sections/SolutionCards';
import { AboutBlock } from '@/components/sections/AboutBlock';
import { ComparisonTable } from '@/components/sections/ComparisonTable';
import { UserFeaturesBlock } from '@/components/sections/UserFeaturesBlock';
import { CTABlock } from '@/components/sections/CTABlock';

export const metadata: Metadata = {
  title: 'Staterra — Woo-compliance oplossing voor de overheid',
  description:
    'Staterra implementeert en beheert OPMS, het open source platform voor Woo-compliance. Direct inzetbaar voor 530+ bestuursorganen.',
  alternates: { canonical: '/' },
};

export default async function HomePage() {
  const homepage = await getHomepage();

  return (
    <>
      {/* 1 — Hero: brand-100 achtergrond */}
      {homepage?.hero && <Hero data={homepage.hero} />}

      {/* 2 — Statistieken: witte achtergrond */}
      <StatsBlock />

      {/* 3 — Pain point tabs: witte achtergrond */}
      {homepage?.competition && (
        <PainPointTabs data={homepage.competition} />
      )}

      {/* 4 — Bewezen in de praktijk: witte achtergrond */}
      {homepage?.competition && (
        <CompetitionBlock data={homepage.competition} />
      )}

      {/* 5 — Hoe het werkt: brand-100 achtergrond */}
      {homepage?.how_it_works && (
        <HowItWorksBlock data={homepage.how_it_works} />
      )}

      {/* 5 — Oplossingskaarten: brand-100 achtergrond */}
      {homepage?.feature_cards && (
        <SolutionCards data={homepage.feature_cards} />
      )}

      {/* 6 — Over Staterra: witte achtergrond */}
      {homepage?.about_opms && (
        <AboutBlock data={homepage.about_opms} />
      )}

      {/* 7 — Vergelijkingstabel: witte achtergrond */}
      <ComparisonTable />

      {/* 8 — Gebruikersvoordelen: brand-100 achtergrond */}
      {homepage?.user_features && (
        <UserFeaturesBlock data={homepage.user_features} />
      )}

      {/* 9 — CTA-blok: brand-gradient achtergrond */}
      {homepage?.bottom_cta && <CTABlock data={homepage.bottom_cta} />}
    </>
  );
}
