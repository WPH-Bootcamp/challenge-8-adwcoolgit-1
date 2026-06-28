import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import type { SortOption } from '@/types/movie';

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'popularity', label: 'Popularity' },
  { value: 'rating', label: 'Rating' },
  { value: 'release_date', label: 'Release Date' },
  { value: 'title', label: 'Title A–Z' },
];

interface FilterSortBarProps {
  value: SortOption;
  onSortChange: (sort: SortOption) => void;
}

const FilterSortBar = ({ value, onSortChange }: FilterSortBarProps) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const selected = SORT_OPTIONS.find((o) => o.value === value)!;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex items-center gap-3 px-mobile-x py-4 md:px-page-x md:py-6">
      <span className="text-sm text-neutral-400">Sort by</span>
      <div ref={containerRef} className="relative">
        <button
          onClick={() => setOpen((o) => !o)}
          className="flex h-10 items-center gap-2 rounded-full border border-neutral-800 px-4 text-sm font-medium text-neutral-25 transition-colors hover:border-neutral-700 hover:bg-neutral-800"
        >
          {selected.label}
          <ChevronDown
            className={`h-4 w-4 text-neutral-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          />
        </button>

        {open && (
          <div className="absolute left-0 top-full z-20 mt-2 w-44 overflow-hidden rounded-xl border border-neutral-800 bg-surface-card shadow-lg">
            {SORT_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onSortChange(option.value);
                  setOpen(false);
                }}
                className={`flex w-full items-center px-4 py-2.5 text-sm transition-colors hover:bg-neutral-800 ${
                  value === option.value
                    ? 'font-semibold text-brand'
                    : 'font-normal text-neutral-25'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterSortBar;
