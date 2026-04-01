import { Link } from 'react-router-dom';
import { useState, useEffect, useRef, useCallback } from 'react';
import { mapMenuUrl } from '@/services/cms';
import type { MenuItem, HeaderMenuResponse, SettingsResponse } from '@/lib/types';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

// NodeJS.Timeout / browser timeout compatible type
type TimeoutHandle = ReturnType<typeof setTimeout>;

interface HeaderProps {
  menu: HeaderMenuResponse | null;
  settings: SettingsResponse | null;
}

// ── Menu-items verrijken ─────────────────────────────────────
// Het CMS levert soms maar een paar items. We vullen het menu aan
// met essentiële pagina's als het CMS ze niet levert, en voegen
// dropdown-children toe aan items met url="#".

const CHILD = (id: number, title: string, subtitle: string, url: string): MenuItem => ({
  id, title, subtitle, description: '', url, slug: null, page_type: '', template: '', order: id, tags: [], sidebar: null, children: [],
})

const OPLOSSINGEN_CHILDREN: MenuItem[] = [
  CHILD(9101, 'Woo-oplossing', 'De complete Woo-compliance oplossing', '/woo-oplossing'),
  CHILD(9102, 'Samen ontwikkelen', 'Nieuwe digitale oplossingen bouwen', '/samen-ontwikkelen'),
  CHILD(9103, 'Open source', 'OPMS als open source basis', '/open-source'),
]

const DOELGROEPEN_ITEM: MenuItem = {
  id: 9999, title: 'Doelgroepen', subtitle: null, description: '', url: '#',
  slug: null, page_type: '', template: '', order: 99, tags: [], sidebar: null,
  children: [
    CHILD(9001, 'Gemeenten', 'Woo-compliance voor 342 gemeenten', '/staterra-gemeenten'),
    CHILD(9002, 'Provincies', 'Oplossingen voor 12 provincies', '/staterra-provincies'),
    CHILD(9003, 'Waterschappen', 'Digitale regie voor 21 waterschappen', '/staterra-waterschappen'),
    CHILD(9004, 'Rijksoverheid', 'Ministeries en agentschappen', '/staterra-rijkspartijen'),
  ],
}

const FALLBACK_ITEMS: MenuItem[] = [
  { id: 9801, title: 'Oplossingen', subtitle: null, description: '', url: '/oplossingen',
    slug: null, page_type: '', template: '', order: 1, tags: [], sidebar: null,
    children: OPLOSSINGEN_CHILDREN },
  DOELGROEPEN_ITEM,
  { id: 9802, title: 'Aanpak', subtitle: null, description: '', url: '/aanpak',
    slug: null, page_type: '', template: '', order: 3, tags: [], sidebar: null, children: [] },
  { id: 9804, title: 'Dienstverlening', subtitle: null, description: '', url: '/dienstverlening',
    slug: null, page_type: '', template: '', order: 5, tags: [], sidebar: null, children: [] },
  { id: 9805, title: 'Kennisbank', subtitle: null, description: '', url: '/kennisbank',
    slug: null, page_type: '', template: '', order: 6, tags: [], sidebar: null, children: [] },
]

function buildNavItems(cmsItems: MenuItem[]): MenuItem[] {
  // Als het CMS weinig items levert, gebruik onze fallback
  if (cmsItems.length <= 3) return FALLBACK_ITEMS

  // Verrijk CMS-items: voeg children toe aan items met url="#" (dropdown-triggers)
  const enriched = cmsItems.map((item) => {
    if (item.url === '#' && (!item.children || item.children.length === 0)) {
      // "Woo-oplossing" zonder url → maak er een dropdown van
      if (item.title.toLowerCase().includes('woo') || item.title.toLowerCase().includes('oplossing')) {
        return { ...item, children: OPLOSSINGEN_CHILDREN }
      }
    }
    return item
  })

  // Voeg Doelgroepen toe na eerste item (als het er niet al in zit)
  const hasDoelgroepen = enriched.some((i) => i.title === 'Doelgroepen')
  if (!hasDoelgroepen) {
    return [enriched[0], DOELGROEPEN_ITEM, ...enriched.slice(1)]
  }
  return enriched
}

// ── Dropdown-paneel ──────────────────────────────────────────
// Structuur: outer wrapper heeft pt-3 (padding = onderdeel van het element,
// dus muis in de "brug" blijft in de parent div → geen mouseLeave).
// pointer-events zitten op de wrapper zodat ze direct schakelen, niet pas
// na de CSS-transitie.

function DropdownMenu({ items, isOpen }: { items: MenuItem[]; isOpen: boolean }) {
  return (
    // Outer: pt-3 bridget de gap; pointer-events schakelt direct (geen transitie-delay)
    <div
      className={[
        'absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50',
        isOpen ? 'pointer-events-auto' : 'pointer-events-none',
      ].join(' ')}
      aria-hidden={!isOpen}
    >
      {/* Inner: alleen de visuele transitie */}
      <div
        className={[
          'w-72 bg-white border border-neutral-200 rounded-[20px]',
          'shadow-[0_12px_32px_rgba(22,62,116,0.10)] p-2',
          'transition-all duration-[180ms] ease-out',
          isOpen
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-2',
        ].join(' ')}
        role="menu"
      >
        {items.map((item) => {
          const meta = item.subtitle ?? item.description ?? null;
          return (
            <Link
              key={item.id}
              to={mapMenuUrl(item.url)}
              className="flex flex-col gap-0.5 px-4 py-3 rounded-[12px] hover:bg-brand-100 transition-colors duration-[150ms] group"
              role="menuitem"
            >
              <span className="font-semibold text-body-sm text-neutral-800 group-hover:text-brand-900 transition-colors duration-[150ms]">
                {item.title}
              </span>
              {meta && (
                <span className="text-caption text-neutral-500 leading-snug">
                  {meta}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

// ── Desktop nav-item ─────────────────────────────────────────

function NavItem({
  item,
  openId,
  setOpenId,
}: {
  item: MenuItem;
  openId: number | null;
  setOpenId: (id: number | null) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<TimeoutHandle | null>(null);
  const hasChildren = item.children && item.children.length > 0;
  const isOpen = openId === item.id;

  const handleMouseEnter = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenId(item.id);
  }, [item.id, setOpenId]);

  // 150ms delay zodat de muis de pt-3 brug kan oversteken zonder flutter
  const handleMouseLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => setOpenId(null), 150);
  }, [setOpenId]);

  // Ruim de timeout op bij unmount
  useEffect(() => {
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, []);

  // Sluit dropdown bij klik buiten
  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        if (isOpen) setOpenId(null);
      }
    }
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isOpen, setOpenId]);

  if (!hasChildren) {
    return (
      <Link
        to={mapMenuUrl(item.url)}
        className="text-body-sm font-medium text-neutral-700 hover:text-brand-700 transition-colors duration-[180ms] py-2"
      >
        {item.title}
      </Link>
    );
  }

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        onClick={() => setOpenId(isOpen ? null : item.id)}
        className="flex items-center gap-1 text-body-sm font-medium text-neutral-700 hover:text-brand-700 transition-colors duration-[180ms] py-2 cursor-pointer"
        aria-expanded={isOpen}
        aria-haspopup="menu"
      >
        {item.title}
        <svg
          className={`w-4 h-4 transition-transform duration-[180ms] ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <DropdownMenu items={item.children} isOpen={isOpen} />
    </div>
  );
}

// ── Mobiel menu ───────────────────────────────────────────────

function MobileMenu({
  items,
  isOpen,
  onClose,
}: {
  items: MenuItem[];
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <div
      className={[
        'absolute top-full inset-x-0 bg-white/95 backdrop-blur-[10px]',
        'border-b border-neutral-200 shadow-[0_8px_24px_rgba(22,62,116,0.06)]',
        'transition-all duration-[200ms] ease-out overflow-hidden',
        isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0',
      ].join(' ')}
      aria-hidden={!isOpen}
    >
      <Container variant="page" className="py-4">
        <nav aria-label="Mobiele navigatie">
          {items.map((item) => (
            <div key={item.id}>
              <Link
                to={mapMenuUrl(item.url)}
                onClick={onClose}
                className="flex items-center justify-between py-3 text-body-sm font-semibold text-neutral-800 hover:text-brand-700 border-b border-neutral-100 last:border-0 transition-colors duration-[150ms]"
              >
                {item.title}
                {item.children?.length > 0 && (
                  <svg className="w-4 h-4 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </Link>
              {item.children?.map((child) => (
                <Link
                  key={child.id}
                  to={mapMenuUrl(child.url)}
                  onClick={onClose}
                  className="flex flex-col gap-0.5 py-2.5 pl-5 border-b border-neutral-50 last:border-0 hover:bg-brand-50 transition-colors duration-[150ms] rounded-[8px]"
                >
                  <span className="text-body-sm font-medium text-neutral-700 hover:text-brand-700">
                    {child.title}
                  </span>
                  {(child.subtitle ?? child.description) && (
                    <span className="text-caption text-neutral-400">
                      {child.subtitle ?? child.description}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          ))}
        </nav>
        <div className="pt-4 pb-2">
          <Button as="link" href="/contact" variant="primary" className="w-full justify-center">
            Neem contact op
          </Button>
        </div>
      </Container>
    </div>
  );
}

// ── Header ────────────────────────────────────────────────────

export function Header({ menu, settings }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  // Gedeelde open-state: slechts één dropdown tegelijk
  const [openId, setOpenId] = useState<number | null>(null);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 8);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sluit alle dropdowns bij escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setOpenId(null);
        setMobileOpen(false);
      }
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  const handleSetOpenId = useCallback((id: number | null) => {
    setOpenId(id);
  }, []);

  const allItems = menu?.items ?? [];
  const items = buildNavItems(allItems);

  const logoUrl = settings?.site?.logo;
  const siteName = settings?.site?.name ?? 'Staterra';

  return (
    <header
      className={[
        'fixed top-0 inset-x-0 z-50',
        'bg-white/90 backdrop-blur-[10px]',
        'border-b border-neutral-200',
        'transition-shadow duration-[180ms]',
        scrolled ? 'shadow-[0_8px_24px_rgba(22,62,116,0.06)]' : '',
      ].join(' ')}
    >
      <Container variant="page">
        <div className="flex items-center justify-between h-16 lg:h-18">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 flex-shrink-0" aria-label={`${siteName} — naar de homepage`}>
            {logoUrl ? (
              <img
                src={logoUrl}
                alt={siteName}
                className="object-contain h-8 w-auto"
              />
            ) : (
              <span className="font-heading font-semibold text-h5 text-brand-900">
                {siteName}
              </span>
            )}
          </Link>

          {/* Desktop navigatie */}
          <nav
            className="hidden lg:flex items-center gap-8"
            aria-label="Hoofdnavigatie"
          >
            {items.map((item) => (
              <NavItem
                key={item.id}
                item={item}
                openId={openId}
                setOpenId={handleSetOpenId}
              />
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <Button as="link" href="/contact" variant="primary" size="sm">
              Neem contact op
            </Button>
          </div>

          {/* Mobiel menu-knop */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden p-2 text-neutral-700 hover:text-brand-700 transition-colors"
            aria-label={mobileOpen ? 'Menu sluiten' : 'Menu openen'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </Container>

      {/* Mobiel menu */}
      <div id="mobile-menu">
        <MobileMenu
          items={items}
          isOpen={mobileOpen}
          onClose={() => setMobileOpen(false)}
        />
      </div>
    </header>
  );
}
