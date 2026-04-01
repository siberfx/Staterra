'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef, useCallback } from 'react';
import { mapMenuUrl } from '@/lib/cms';
import type { MenuItem, HeaderMenuResponse, SettingsResponse } from '@/lib/types';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

// NodeJS.Timeout / browser timeout compatible type
type TimeoutHandle = ReturnType<typeof setTimeout>;

interface HeaderProps {
  menu: HeaderMenuResponse | null;
  settings: SettingsResponse | null;
}

// ── Filterregel ──────────────────────────────────────────────
// Het CMS bevat een duplicaat "Woo-oplossing" top-level item met
// url: "#". Dat item hoort niet in de header; we filteren het weg.
function filterTopLevelItems(items: MenuItem[]): MenuItem[] {
  return items.filter((item) => item.url !== '#');
}

// ── Hardcoded Doelgroepen-dropdown ───────────────────────────
// Wordt als tweede item na "Oplossingen" ingevoegd, zodat het
// bestaande NavItem-systeem (hover-delay, gedeelde openId,
// mobile accordion) automatisch werkt.
const DOELGROEPEN_ITEM: MenuItem = {
  id: 9999,
  title: 'Doelgroepen',
  subtitle: null,
  description: '',
  url: '#',
  slug: null,
  page_type: '',
  template: '',
  order: 99,
  tags: [],
  sidebar: null,
  children: [
    {
      id: 9001, title: 'Gemeenten',
      subtitle: 'Woo-compliance voor 342 gemeenten',
      description: '', url: '/staterra-gemeenten',
      slug: 'staterra-gemeenten', page_type: '', template: '', order: 1, tags: [], sidebar: null, children: [],
    },
    {
      id: 9002, title: 'Provincies',
      subtitle: 'Oplossingen voor 12 provincies',
      description: '', url: '/staterra-provincies',
      slug: 'staterra-provincies', page_type: '', template: '', order: 2, tags: [], sidebar: null, children: [],
    },
    {
      id: 9003, title: 'Waterschappen',
      subtitle: 'Digitale regie voor 21 waterschappen',
      description: '', url: '/staterra-waterschappen',
      slug: 'staterra-waterschappen', page_type: '', template: '', order: 3, tags: [], sidebar: null, children: [],
    },
    {
      id: 9004, title: 'Rijksoverheid',
      subtitle: 'Ministeries en agentschappen',
      description: '', url: '/staterra-rijkspartijen',
      slug: 'staterra-rijkspartijen', page_type: '', template: '', order: 4, tags: [], sidebar: null, children: [],
    },
  ],
};

// Voeg Doelgroepen in na het eerste CMS-item (Oplossingen)
function injectDoelgroepen(items: MenuItem[]): MenuItem[] {
  if (items.length === 0) return [DOELGROEPEN_ITEM];
  return [items[0], DOELGROEPEN_ITEM, ...items.slice(1)];
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
              href={mapMenuUrl(item.url)}
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
        href={mapMenuUrl(item.url)}
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
                href={mapMenuUrl(item.url)}
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
                  href={mapMenuUrl(child.url)}
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
  const items = injectDoelgroepen(filterTopLevelItems(allItems));

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
          <Link href="/" className="flex items-center gap-3 flex-shrink-0" aria-label={`${siteName} — naar de homepage`}>
            {logoUrl ? (
              <Image
                src={logoUrl}
                alt={siteName}
                width={140}
                height={36}
                className="object-contain"
                style={{ height: '32px', width: 'auto' }}
                priority
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
