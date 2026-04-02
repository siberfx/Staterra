import { lazy, Suspense } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PageMeta } from '@/components/PageMeta';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { getArticleBySlug } from '@/data/kennisbankArticles';

// Fallback naar CMS-artikel als het geen hardcoded artikel is
const ArticleDetail = lazy(() => import('@/pages/ArticleDetail'));

export default function KennisbankArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getArticleBySlug(slug) : undefined;

  // Geen hardcoded artikel → doorsturen naar CMS ArticleDetail
  if (!article) {
    return <Suspense fallback={null}><ArticleDetail /></Suspense>;
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    author: { '@type': 'Organization', name: 'Staterra' },
    publisher: { '@type': 'Organization', name: 'Staterra', url: 'https://staterra.nl' },
  };

  return (
    <>
      <PageMeta
        title={article.title}
        description={article.description}
        schemas={[articleSchema]}
      />

      {/* Hero */}
      <section className="bg-brand-900 py-16 lg:py-20">
        <Container variant="text">
          <span className="inline-flex items-center border-l-[3px] border-brand-400 bg-white/10 px-3 py-1 rounded-r-md text-caption font-semibold text-brand-200 uppercase tracking-widest mb-5">
            {article.category}
          </span>
          <h1 className="font-heading text-h2 lg:text-h1 font-semibold text-white mb-5 leading-[1.1]">
            {article.title}
          </h1>
          <p className="text-body-lg text-brand-200 leading-relaxed max-w-[640px]">
            {article.intro}
          </p>
        </Container>
      </section>

      {/* Content */}
      <section className="bg-white py-12 lg:py-16">
        <Container variant="text">
          <div className="max-w-3xl mx-auto">
            {article.sections.map((section, i) => (
              <div key={i} className="mb-10 last:mb-0">
                <h2 className="font-heading text-h4 font-semibold text-brand-900 mb-4">
                  {section.heading}
                </h2>
                {section.content.split('\n\n').map((paragraph, pi) => (
                  <p
                    key={pi}
                    className="text-body text-neutral-700 leading-relaxed mb-4 last:mb-0"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}

            {/* CTA */}
            <div className="mt-12 rounded-[20px] bg-brand-50 border border-brand-200 p-8 text-center">
              <p className="text-body text-neutral-700 mb-5">
                {article.cta}
              </p>
              <Button as="link" href="/contact" variant="primary">
                Plan een verkenningsgesprek
              </Button>
            </div>

            {/* Terug naar kennisbank */}
            <div className="mt-8 text-center">
              <Link
                to="/kennisbank"
                className="text-body-sm text-brand-700 font-semibold hover:text-brand-900 transition-colors duration-150"
              >
                ← Terug naar de kennisbank
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
