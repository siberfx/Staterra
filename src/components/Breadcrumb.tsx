import { Link, useLocation } from 'react-router-dom';
import { Container } from '@/components/ui/Container';

/**
 * Route → leesbare naam + optionele parent-sectie.
 * Routes die hier niet staan krijgen een automatische naam op basis van de slug.
 */
const ROUTE_MAP: Record<string, { label: string; parent?: { label: string; path: string } }> = {
  '/aanpak': { label: 'Aanpak' },
  '/dienstverlening': { label: 'Dienstverlening' },
  '/oplossingen': { label: 'Oplossingen' },
  '/woo-oplossing': { label: 'Woo-oplossing', parent: { label: 'Oplossingen', path: '/oplossingen' } },
  '/samen-ontwikkelen': { label: 'Samen ontwikkelen', parent: { label: 'Oplossingen', path: '/oplossingen' } },
  '/open-source': { label: 'Open source', parent: { label: 'Oplossingen', path: '/oplossingen' } },
  '/kennisbank': { label: 'Kennisbank' },
  '/contact': { label: 'Contact' },
  '/over-ons': { label: 'Over ons' },
  '/privacy': { label: 'Privacyverklaring' },
  '/cookies': { label: 'Cookiebeleid' },
  '/staterra-gemeenten': { label: 'Gemeenten', parent: { label: 'Doelgroepen', path: '/oplossingen' } },
  '/staterra-provincies': { label: 'Provincies', parent: { label: 'Doelgroepen', path: '/oplossingen' } },
  '/staterra-waterschappen': { label: 'Waterschappen', parent: { label: 'Doelgroepen', path: '/oplossingen' } },
  '/staterra-rijkspartijen': { label: 'Rijksoverheid', parent: { label: 'Doelgroepen', path: '/oplossingen' } },
};

function slugToLabel(slug: string): string {
  return slug.replace(/-/g, ' ').replace(/^\w/, (c) => c.toUpperCase());
}

export function Breadcrumb() {
  const { pathname } = useLocation();

  // Niet tonen op homepage
  if (pathname === '/') return null;

  const route = ROUTE_MAP[pathname];
  const currentLabel = route?.label ?? slugToLabel(pathname.split('/').pop() ?? '');

  const crumbs: { label: string; path?: string }[] = [
    { label: 'Home', path: '/' },
  ];

  if (route?.parent) {
    crumbs.push({ label: route.parent.label, path: route.parent.path });
  }

  crumbs.push({ label: currentLabel });

  return (
    <div className="bg-white border-b border-neutral-100">
      <Container variant="page">
        <nav aria-label="Breadcrumb" className="py-3">
          <ol className="flex flex-wrap items-center gap-1 text-sm text-neutral-500">
            {crumbs.map((crumb, i) => {
              const isLast = i === crumbs.length - 1;
              return (
                <li key={i} className="flex items-center gap-1">
                  {i > 0 && (
                    <svg className="w-3.5 h-3.5 text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                  {isLast ? (
                    <span className="text-neutral-700 font-medium" aria-current="page">
                      {crumb.label}
                    </span>
                  ) : (
                    <Link
                      to={crumb.path!}
                      className="text-brand-600 hover:text-brand-800 transition-colors duration-150"
                    >
                      {crumb.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      </Container>
    </div>
  );
}
