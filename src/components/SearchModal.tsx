import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SEARCH_INDEX, type SearchEntry } from '@/data/searchIndex';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function searchPages(query: string): SearchEntry[] {
  if (!query.trim()) return [];
  const terms = query.toLowerCase().split(/\s+/);
  return SEARCH_INDEX.filter((entry) => {
    const haystack = `${entry.title} ${entry.excerpt} ${entry.section ?? ''}`.toLowerCase();
    return terms.every((term) => haystack.includes(term));
  }).slice(0, 8);
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const results = searchPages(query);

  // Focus input wanneer modal opent
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Sluit bij Escape
  useEffect(() => {
    if (!isOpen) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  // Keyboard navigatie in resultaten
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, results.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === 'Enter' && results[activeIndex]) {
        e.preventDefault();
        navigate(results[activeIndex].url);
        onClose();
      }
    },
    [results, activeIndex, navigate, onClose],
  );

  // Reset active index bij nieuwe query
  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100]" role="dialog" aria-modal="true" aria-label="Zoeken">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-neutral-950/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative max-w-[560px] mx-auto mt-[15vh] mx-4">
        <div className="bg-white rounded-[16px] shadow-[0_16px_48px_rgba(22,62,116,0.20)] overflow-hidden">
          {/* Zoekveld */}
          <div className="flex items-center gap-3 px-5 border-b border-neutral-200">
            <svg className="w-5 h-5 text-neutral-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Zoek pagina's..."
              className="flex-1 py-4 text-body bg-transparent border-0 outline-none placeholder:text-neutral-400"
              aria-label="Zoekterm"
              autoComplete="off"
            />
            <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 text-caption text-neutral-400 bg-neutral-100 rounded border border-neutral-200">
              Esc
            </kbd>
          </div>

          {/* Resultaten */}
          {query.trim() && (
            <div className="max-h-[50vh] overflow-y-auto">
              {results.length > 0 ? (
                <ul role="listbox" className="py-2">
                  {results.map((entry, i) => (
                    <li key={entry.url} role="option" aria-selected={i === activeIndex}>
                      <Link
                        to={entry.url}
                        onClick={onClose}
                        className={[
                          'flex flex-col gap-0.5 px-5 py-3 transition-colors duration-100',
                          i === activeIndex ? 'bg-brand-50' : 'hover:bg-neutral-50',
                        ].join(' ')}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-body-sm font-semibold text-neutral-900">
                            {entry.title}
                          </span>
                          {entry.section && (
                            <span className="text-caption text-neutral-400">
                              {entry.section}
                            </span>
                          )}
                        </div>
                        <span className="text-caption text-neutral-500 line-clamp-1">
                          {entry.excerpt}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="px-5 py-8 text-center">
                  <p className="text-body-sm text-neutral-500">
                    Geen resultaten voor &ldquo;{query}&rdquo;
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Lege state */}
          {!query.trim() && (
            <div className="px-5 py-6 text-center">
              <p className="text-caption text-neutral-400">
                Typ om te zoeken — of gebruik pijltjestoetsen om te navigeren
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
