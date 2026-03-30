import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBlogPost, getBlogPosts } from '@/lib/cms';
import type { BlogPost } from '@/lib/types';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

export const revalidate = 60;

// ── Static params (voor ISG) ──────────────────────────────────

export async function generateStaticParams() {
  const response = await getBlogPosts(100);
  return (response?.data ?? []).map((post) => ({ slug: post.slug }));
}

// ── Metadata ──────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return { title: 'Artikel niet gevonden' };

  const title = post.meta_title ?? post.title;
  const description =
    post.meta_description ?? post.excerpt ?? post.summary ?? '';
  const image = post.image_url ?? post.image;

  return {
    title,
    description,
    alternates: { canonical: `/kennisbank/${slug}` },
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: post.published_at ?? post.created_at,
      ...(image ? { images: [{ url: image, alt: post.title }] } : {}),
    },
  };
}

// ── Helpers ───────────────────────────────────────────────────

function formatDatum(iso?: string): string {
  if (!iso) return '';
  return new Intl.DateTimeFormat('nl-NL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(iso));
}

function getPostDate(post: BlogPost): string {
  return post.published_at ?? post.created_at ?? '';
}

// ── Gerelateerde artikelen sidebar ───────────────────────────

async function GerelateerdeArtikelen({ huidigSlug }: { huidigSlug: string }) {
  const response = await getBlogPosts(6);
  const anderen = (response?.data ?? []).filter((p) => p.slug !== huidigSlug).slice(0, 4);

  if (anderen.length === 0) return null;

  return (
    <div>
      <h3 className="font-heading text-h5 font-semibold text-neutral-950 mb-4">
        Meer artikelen
      </h3>
      <ul className="space-y-4">
        {anderen.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/kennisbank/${post.slug}`}
              className="group flex gap-3 hover:text-brand-700 transition-colors duration-[150ms]"
            >
              {(post.image_url ?? post.image) && (
                <div className="relative flex-shrink-0 w-16 h-16 rounded-[8px] overflow-hidden bg-brand-100">
                  <Image
                    src={(post.image_url ?? post.image) as string}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-body-sm font-semibold text-neutral-950 group-hover:text-brand-700 line-clamp-2 leading-snug transition-colors">
                  {post.title}
                </p>
                {getPostDate(post) && (
                  <p className="text-caption text-neutral-400 mt-1">
                    {formatDatum(getPostDate(post))}
                  </p>
                )}
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <Link
        href="/kennisbank"
        className="inline-flex items-center gap-1.5 mt-5 text-caption font-medium text-brand-700 hover:text-brand-900 transition-colors duration-[150ms] group"
      >
        Alle artikelen
        <svg className="w-3.5 h-3.5 transition-transform duration-[150ms] group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
      </Link>
    </div>
  );
}

// ── Pagina ────────────────────────────────────────────────────

export default async function KennisbankArtikelPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) notFound();

  const image = post.image_url ?? post.image;
  const excerpt = post.excerpt ?? post.summary ?? '';
  const datum = getPostDate(post);

  return (
    <>
      {/* ── Hero / artikel-header ──────────────────────────── */}
      <section
        className="border-b border-neutral-200 bg-neutral-50 py-12 lg:py-16"
        aria-label="Artikel"
      >
        <Container variant="content">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-caption text-neutral-500 mb-6" aria-label="Kruimelpad">
            <Link href="/" className="hover:text-brand-700 transition-colors">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/kennisbank" className="hover:text-brand-700 transition-colors">Kennisbank</Link>
            <span aria-hidden="true">/</span>
            <span className="text-neutral-900 line-clamp-1">{post.title}</span>
          </nav>

          {/* Categorieën */}
          {post.categories && post.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.categories.map((cat) => (
                <span
                  key={cat}
                  className="text-caption bg-brand-100 text-brand-700 px-2.5 py-0.5 rounded-full font-medium"
                >
                  {cat}
                </span>
              ))}
            </div>
          )}

          <h1 className="font-heading text-h1 font-semibold text-neutral-950 mb-4 leading-[1.06] max-w-[760px]">
            {post.title}
          </h1>

          {excerpt && (
            <p className="text-body-lg text-neutral-600 leading-relaxed max-w-[680px] mb-6">
              {excerpt}
            </p>
          )}

          {/* Meta-rij */}
          <div className="flex flex-wrap items-center gap-4 text-caption text-neutral-500">
            {(post.author_name ?? post.author) && (
              <span className="flex items-center gap-2 font-medium text-neutral-700">
                {post.author_image ? (
                  <Image
                    src={post.author_image}
                    alt={post.author_name ?? post.author ?? ''}
                    width={28}
                    height={28}
                    className="rounded-full object-cover"
                    style={{ width: 28, height: 28 }}
                  />
                ) : (
                  <span className="w-7 h-7 rounded-full bg-brand-200 flex items-center justify-center text-caption font-bold text-brand-800" aria-hidden="true">
                    {(post.author_name ?? post.author ?? '?').charAt(0).toUpperCase()}
                  </span>
                )}
                {post.author_name ?? post.author}
              </span>
            )}
            {datum && (
              <>
                {(post.author_name ?? post.author) && <span aria-hidden="true">·</span>}
                <time dateTime={datum}>{formatDatum(datum)}</time>
              </>
            )}
            {post.reading_time && (
              <>
                <span aria-hidden="true">·</span>
                <span>{post.reading_time} min leestijd</span>
              </>
            )}
          </div>
        </Container>
      </section>

      {/* ── Uitgelichte afbeelding ─────────────────────────── */}
      {image && (
        <div className="bg-neutral-100">
          <Container variant="content" noPadding>
            <div className="relative h-64 md:h-96 overflow-hidden rounded-b-[20px]">
              <Image
                src={image}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 1120px"
                priority
              />
            </div>
          </Container>
        </div>
      )}

      {/* ── Artikel + sidebar ─────────────────────────────── */}
      <section className="bg-white py-12 lg:py-20">
        <Container variant="content">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10 lg:gap-16 items-start">

            {/* Artikel-body */}
            <article className="min-w-0">
              {(post.body ?? post.content) ? (
                <div
                  className="prose prose-neutral prose-lg max-w-none
                    prose-headings:font-heading prose-headings:font-semibold prose-headings:text-neutral-950
                    prose-h2:text-h3 prose-h2:mt-10 prose-h2:mb-4
                    prose-h3:text-h4 prose-h3:mt-8 prose-h3:mb-3
                    prose-p:text-body prose-p:text-neutral-700 prose-p:leading-relaxed
                    prose-a:text-brand-700 prose-a:no-underline hover:prose-a:underline
                    prose-strong:text-neutral-950
                    prose-ul:space-y-1.5 prose-ol:space-y-1.5
                    prose-li:text-neutral-700
                    prose-blockquote:border-l-brand-400 prose-blockquote:text-neutral-600 prose-blockquote:not-italic
                    prose-code:text-brand-700 prose-code:bg-brand-50 prose-code:px-1 prose-code:rounded prose-code:font-normal
                    prose-pre:bg-neutral-950 prose-pre:text-neutral-100
                    prose-hr:border-neutral-200
                    prose-img:rounded-[12px] prose-img:shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
                  dangerouslySetInnerHTML={{ __html: post.body ?? post.content ?? '' }}
                />
              ) : (
                <p className="text-body text-neutral-500 italic">
                  De inhoud van dit artikel wordt binnenkort gepubliceerd.
                </p>
              )}

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="mt-10 pt-6 border-t border-neutral-200">
                  <span className="text-caption font-semibold uppercase tracking-widest text-neutral-500 mr-3">
                    Tags:
                  </span>
                  <div className="inline-flex flex-wrap gap-2 mt-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-caption border border-neutral-200 rounded-full px-3 py-0.5 text-neutral-600"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Terug-link */}
              <div className="mt-10 pt-6 border-t border-neutral-200">
                <Link
                  href="/kennisbank"
                  className="inline-flex items-center gap-2 text-body-sm font-medium text-brand-700 hover:text-brand-900 transition-colors duration-[150ms] group"
                >
                  <svg className="w-4 h-4 transition-transform duration-[150ms] group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                  </svg>
                  Terug naar kennisbank
                </Link>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="hidden lg:block lg:sticky lg:top-28 space-y-8" aria-label="Aanvullende informatie">
              <GerelateerdeArtikelen huidigSlug={slug} />

              {/* Contact-block */}
              <div className="rounded-[14px] border border-brand-200 bg-brand-50 p-5">
                <h3 className="font-heading text-h5 font-semibold text-brand-900 mb-2">
                  Vragen over dit artikel?
                </h3>
                <p className="text-caption text-brand-700 leading-relaxed mb-4">
                  Onze experts staan klaar voor een inhoudelijk gesprek.
                  Binnen twee werkdagen een reactie.
                </p>
                <Button as="link" href="/contact" variant="primary" size="sm">
                  Neem contact op
                </Button>
              </div>

              {/* Deel */}
              <div>
                <h3 className="font-heading text-h5 font-semibold text-neutral-950 mb-3">
                  Deel dit artikel
                </h3>
                <div className="flex gap-2">
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://staterra.nl/kennisbank/${slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-[8px] border border-neutral-200 bg-white px-3 py-2 text-caption font-medium text-neutral-700 hover:border-brand-300 hover:text-brand-700 transition-all duration-[150ms]"
                    aria-label="Deel op LinkedIn"
                  >
                    <svg className="w-4 h-4 text-[#0A66C2]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    LinkedIn
                  </a>
                  <a
                    href={`mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(`https://staterra.nl/kennisbank/${slug}`)}`}
                    className="flex items-center gap-2 rounded-[8px] border border-neutral-200 bg-white px-3 py-2 text-caption font-medium text-neutral-700 hover:border-brand-300 hover:text-brand-700 transition-all duration-[150ms]"
                    aria-label="Deel via e-mail"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                    E-mail
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* ── CTA onderaan ──────────────────────────────────── */}
      <section
        className="border-t border-neutral-200 bg-brand-50 py-14"
        aria-label="Meer informatie"
      >
        <Container variant="text">
          <div className="text-center">
            <h2 className="font-heading text-h3 font-semibold text-neutral-950 mb-3 leading-snug">
              Meer weten over OPMS?
            </h2>
            <p className="text-body text-neutral-600 leading-relaxed mb-7 max-w-[480px] mx-auto">
              Ontdek hoe Staterra uw organisatie helpt met Woo-compliance.
              Een vrijblijvende verkenning levert altijd inzicht op.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button as="link" href="/contact" variant="primary">
                Plan een gesprek
              </Button>
              <Button as="link" href="/kennisbank" variant="secondary">
                Meer artikelen
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
