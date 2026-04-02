import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getBlogPosts } from '@/services/cms';
import { PageMeta } from '@/components/PageMeta';
import type { BlogPost } from '@/lib/types';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

// ── Verwachte onderwerpen (voor empty state) ──────────────────

const AANKOMENDE_THEMAS = [
  {
    icoon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
    label: 'Woo & actieve openbaarmaking',
  },
  {
    icoon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
    label: 'Open source overheid',
  },
  {
    icoon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
      </svg>
    ),
    label: 'Informatiehuishouding',
  },
  {
    icoon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
      </svg>
    ),
    label: 'Bestuursorganen & wetgeving',
  },
  {
    icoon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    label: 'Privacy & AVG',
  },
  {
    icoon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
      </svg>
    ),
    label: 'Implementatie & aanpak',
  },
];

// ── Helpers ───────────────────────────────────────────────────

function formatDatum(iso?: string): string {
  if (!iso) return '';
  return new Intl.DateTimeFormat('nl-NL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(iso));
}

function getPostImage(post: BlogPost): string | null {
  return post.image_url ?? post.image ?? null;
}

function getPostExcerpt(post: BlogPost): string {
  return post.excerpt ?? post.summary ?? '';
}

function getPostDate(post: BlogPost): string {
  return post.published_at ?? post.created_at ?? '';
}

// ── BlogPostCard ──────────────────────────────────────────────

function BlogPostCard({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  const image = getPostImage(post);
  const excerpt = getPostExcerpt(post);
  const date = getPostDate(post);

  if (featured) {
    return (
      <Link
        to={`/kennisbank/${post.slug}`}
        className="group block col-span-1 md:col-span-2 rounded-[20px] overflow-hidden border border-neutral-200 bg-white hover:shadow-[0_12px_36px_rgba(22,62,116,0.09)] transition-all duration-[200ms]"
        aria-label={`Lees artikel: ${post.title}`}
      >
        {image && (
          <div className="relative h-56 md:h-72 w-full overflow-hidden bg-brand-100">
            <img
              src={image}
              alt={post.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[400ms] group-hover:scale-[1.02]"
            />
          </div>
        )}
        <div className="p-7">
          {post.categories && post.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {post.categories.slice(0, 3).map((cat) => (
                <span
                  key={cat}
                  className="text-caption bg-brand-100 text-brand-700 px-2.5 py-0.5 rounded-full font-medium"
                >
                  {cat}
                </span>
              ))}
            </div>
          )}
          <h2 className="font-heading text-h3 font-semibold text-neutral-950 mb-2 group-hover:text-brand-700 transition-colors duration-[150ms] leading-snug">
            {post.title}
          </h2>
          {excerpt && (
            <p className="text-body-sm text-neutral-600 leading-relaxed mb-4 line-clamp-2">
              {excerpt}
            </p>
          )}
          <div className="flex items-center gap-4 text-caption text-neutral-400">
            {date && <span>{formatDatum(date)}</span>}
            {post.reading_time && (
              <>
                <span aria-hidden="true">&middot;</span>
                <span>{post.reading_time} min leestijd</span>
              </>
            )}
            {(post.author_name ?? post.author) && (
              <>
                <span aria-hidden="true">&middot;</span>
                <span>{post.author_name ?? post.author}</span>
              </>
            )}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/kennisbank/${post.slug}`}
      className="group flex flex-col rounded-[16px] overflow-hidden border border-neutral-200 bg-white hover:shadow-[0_8px_24px_rgba(22,62,116,0.07)] transition-all duration-[200ms]"
      aria-label={`Lees artikel: ${post.title}`}
    >
      {image && (
        <div className="relative h-44 w-full overflow-hidden bg-brand-100">
          <img
            src={image}
            alt={post.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[400ms] group-hover:scale-[1.03]"
          />
        </div>
      )}
      <div className="flex flex-col flex-1 p-5">
        {post.categories && post.categories.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-2.5">
            {post.categories.slice(0, 2).map((cat) => (
              <span
                key={cat}
                className="text-caption bg-brand-100 text-brand-700 px-2 py-0.5 rounded-full font-medium"
              >
                {cat}
              </span>
            ))}
          </div>
        )}
        <h2 className="font-heading text-h5 font-semibold text-neutral-950 mb-2 group-hover:text-brand-700 transition-colors duration-[150ms] leading-snug flex-1">
          {post.title}
        </h2>
        {excerpt && (
          <p className="text-caption text-neutral-600 leading-relaxed mb-4 line-clamp-3">
            {excerpt}
          </p>
        )}
        <div className="flex items-center gap-3 text-caption text-neutral-400 pt-4 border-t border-neutral-100 mt-auto">
          {date && <span>{formatDatum(date)}</span>}
          {post.reading_time && (
            <>
              <span aria-hidden="true">&middot;</span>
              <span>{post.reading_time} min</span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}

// ── Empty state ───────────────────────────────────────────────

function EmptyState() {
  return (
    <div className="py-20 lg:py-28">
      <Container variant="text">
        <div className="text-center">
          {/* Illustratie */}
          <div className="mx-auto mb-8 w-20 h-20 rounded-[20px] bg-brand-100 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-brand-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.2}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
          </div>

          <h2 className="font-heading text-h2 font-semibold text-neutral-950 mb-4 leading-[1.1]">
            De kennisbank wordt gevuld
          </h2>
          <p className="text-body-lg text-neutral-600 leading-relaxed mb-4 max-w-[480px] mx-auto">
            Binnenkort verschijnen hier artikelen, handleidingen en
            achtergronden over Woo-compliance, open source en digitale
            publieke infrastructuur.
          </p>
          <p className="text-body text-neutral-500 leading-relaxed mb-10 max-w-[480px] mx-auto">
            Heeft u een vraag die nu al beantwoord moet worden? Neem direct
            contact op — wij reageren binnen twee werkdagen inhoudelijk.
          </p>

          {/* Aankomende thema's */}
          <div className="mb-10">
            <p className="text-caption font-semibold uppercase tracking-widest text-neutral-500 mb-5">
              Aankomende onderwerpen
            </p>
            <div className="flex flex-wrap justify-center gap-2.5">
              {AANKOMENDE_THEMAS.map((t) => (
                <span
                  key={t.label}
                  className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 text-caption font-medium text-neutral-700 hover:border-brand-300 hover:bg-brand-50 transition-all duration-[150ms]"
                >
                  <span className="text-brand-600">{t.icoon}</span>
                  {t.label}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button as="link" href="/contact" variant="primary" size="lg">
              Stel uw vraag
            </Button>
            <Button as="link" href="/woo-oplossing" variant="secondary" size="lg">
              Bekijk onze Woo-oplossing
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}

// ── Pagina ────────────────────────────────────────────────────

export default function KennisbankPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function fetchPosts() {
      try {
        const response = await getBlogPosts(12);
        if (!cancelled) {
          setPosts(response?.data ?? []);
          setHasMore(response?.has_more ?? false);
        }
      } catch {
        // silently fail
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchPosts();
    return () => { cancelled = true; };
  }, []);

  const hasPosts = posts.length > 0;
  const [featuredPost, ...restPosts] = posts;

  if (loading) {
    return (
      <div className="py-20 text-center">
        <Container variant="text">
          <p className="text-body text-neutral-500">Laden...</p>
        </Container>
      </div>
    );
  }

  return (
    <>
      <PageMeta title="Kennisbank" description="Artikelen, handleidingen en inzichten over Woo-compliance en open source voor de overheid." />
      {/* ── Hero ──────────────────────────────────────────── */}
      <section
        className="border-b border-neutral-200 bg-neutral-50 py-14 lg:py-20"
        aria-label="Kennisbank"
      >
        <Container variant="content">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-end">
            <div>
              <span className="inline-block text-caption font-semibold uppercase tracking-widest text-brand-600 mb-4">
                Kennisbank
              </span>
              <h1 className="font-heading text-h1 font-semibold text-neutral-950 mb-4 leading-[1.05]">
                Verdieping over Woo en
                <span className="text-brand-700"> open overheid</span>
              </h1>
              <p className="text-body-lg text-neutral-600 leading-relaxed max-w-[560px]">
                Artikelen, handleidingen en achtergronden voor
                bestuursorganen die hun Woo-compliance serieus nemen.
              </p>
            </div>

            {/* Zoekbalk — future use */}
            {hasPosts && (
              <form
                action="/kennisbank/zoeken"
                method="GET"
                className="w-full lg:w-72"
                role="search"
                aria-label="Zoeken in kennisbank"
              >
                <div className="relative">
                  <label htmlFor="kb-search" className="sr-only">
                    Zoek in de kennisbank
                  </label>
                  <input
                    id="kb-search"
                    name="q"
                    type="search"
                    placeholder="Zoek in de kennisbank\u2026"
                    className="w-full rounded-[10px] border border-neutral-300 bg-white pl-4 pr-10 py-2.5 text-body-sm placeholder:text-neutral-400 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200 transition-colors"
                  />
                  <button
                    type="submit"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-brand-600 transition-colors"
                    aria-label="Zoeken"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Categorie-filters (zichtbaar zodra er posts zijn) */}
          {hasPosts && (
            <div className="mt-6 flex flex-wrap gap-2">
              <button className="rounded-full border border-brand-700 bg-brand-700 px-4 py-1.5 text-caption font-medium text-white transition-colors">
                Alle artikelen
              </button>
              {Array.from(
                new Set(posts.flatMap((p) => p.categories ?? []))
              )
                .slice(0, 6)
                .map((cat) => (
                  <button
                    key={cat}
                    className="rounded-full border border-neutral-300 bg-white px-4 py-1.5 text-caption font-medium text-neutral-700 hover:border-brand-400 hover:text-brand-700 transition-colors"
                  >
                    {cat}
                  </button>
                ))}
            </div>
          )}
        </Container>
      </section>

      {/* ── Content ───────────────────────────────────────── */}
      {hasPosts ? (
        <section className="bg-white py-12 lg:py-20" aria-label="Artikelen">
          <Container variant="content">
            {/* Uitgelicht artikel */}
            {featuredPost && (
              <div className="mb-8">
                <p className="text-caption font-semibold uppercase tracking-widest text-neutral-500 mb-4">
                  Uitgelicht
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <BlogPostCard post={featuredPost} featured />
                  {restPosts.slice(0, 1).map((post) => (
                    <BlogPostCard key={post.slug} post={post} />
                  ))}
                </div>
              </div>
            )}

            {/* Overige artikelen */}
            {restPosts.length > 1 && (
              <>
                <div className="flex items-center gap-4 mb-6 mt-10">
                  <p className="text-caption font-semibold uppercase tracking-widest text-neutral-500">
                    Alle artikelen
                  </p>
                  <div className="flex-1 h-px bg-neutral-200" aria-hidden="true" />
                  <span className="text-caption text-neutral-400">
                    {restPosts.length - 1} artikel{restPosts.length - 1 !== 1 ? 'en' : ''}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {restPosts.slice(1).map((post) => (
                    <BlogPostCard key={post.slug} post={post} />
                  ))}
                </div>
              </>
            )}

            {/* Meer laden */}
            {hasMore && (
              <div className="text-center mt-12">
                <Button as="link" href="/kennisbank?page=2" variant="secondary" size="lg">
                  Laad meer artikelen
                </Button>
              </div>
            )}
          </Container>
        </section>
      ) : (
        <EmptyState />
      )}

      {/* ── Nieuwsbrief / notificatie-CTA ─────────────────── */}
      <section
        className="border-t border-neutral-200 bg-neutral-50 py-14"
        aria-label="Op de hoogte blijven"
      >
        <Container variant="text">
          <div className="text-center">
            <span className="inline-block text-caption font-semibold uppercase tracking-widest text-brand-600 mb-3">
              Op de hoogte blijven
            </span>
            <h2 className="font-heading text-h3 font-semibold text-neutral-950 mb-3 leading-snug">
              Informatie die u nergens anders vindt
            </h2>
            <p className="text-body text-neutral-600 mb-7 leading-relaxed">
              Praktische kennis over Woo-compliance voor bestuursorganen.
              Geen nieuwsbriefformaat — alleen inhoud met waarde.
            </p>
            <Button as="link" href="/contact?reden=Kennisbank" variant="primary">
              Meld u aan voor updates
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
