import { Search, X } from 'lucide-react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  placeholder?: string;
  autoFocus?: boolean;
  className?: string;
}

export default function SearchInput({
  value,
  onChange,
  onClear,
  placeholder = 'Search Movie',
  autoFocus = false,
  className = '',
}: SearchInputProps) {
  return (
    <div
      className={`flex w-full items-center gap-3 rounded-2xl border border-neutral-800 px-4 ${className}`}
      style={{ backdropFilter: 'blur(20px)', background: 'rgba(10,13,18,0.6)' }}
    >
      <Search className='h-5 w-5 shrink-0 text-neutral-500' />
      <input
        type='text'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        autoComplete='off'
        className='min-w-0 flex-1 bg-transparent text-sm text-neutral-25 placeholder:text-neutral-500 outline-none'
      />
      {value && (
        <button type='button' onClick={onClear} aria-label='Clear search'>
          <X className='h-4 w-4 text-neutral-500 hover:text-neutral-25 transition-colors' />
        </button>
      )}
    </div>
  );
}
