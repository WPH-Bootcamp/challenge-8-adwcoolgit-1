import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Search, X } from 'lucide-react';
import { searchSchema, type SearchFormValues } from '@/lib/schemas';

interface SearchBarProps {
  onSearch: (query: string) => void;
  initialQuery?: string;
}

const SearchBar = ({ onSearch, initialQuery = '' }: SearchBarProps) => {
  const [hasValue, setHasValue] = useState(initialQuery.length > 0);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SearchFormValues>({
    resolver: zodResolver(searchSchema),
    defaultValues: { query: initialQuery },
  });

  const { onChange: registerOnChange, ...registerRest } = register('query');

  const onSubmit = (data: SearchFormValues) => {
    onSearch(data.query.trim());
  };

  const handleClear = () => {
    reset({ query: '' });
    setHasValue(false);
    onSearch('');
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          className="flex h-14 w-full items-center gap-3 rounded-2xl border border-neutral-800 px-4 py-2"
          style={{ backdropFilter: 'blur(20px)', background: 'rgba(10,13,18,0.6)' }}
        >
          <Search className="h-6 w-6 shrink-0 text-neutral-500" />
          <input
            {...registerRest}
            onChange={(e) => {
              setHasValue(e.target.value.length > 0);
              registerOnChange(e);
            }}
            type="text"
            placeholder="Search Movie"
            autoComplete="off"
            className="min-w-0 flex-1 bg-transparent text-sm text-neutral-25 placeholder:text-neutral-500 outline-none"
          />
          {hasValue && (
            <button
              type="button"
              onClick={handleClear}
              aria-label="Clear search"
              className="shrink-0 text-neutral-500 hover:text-neutral-25 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </form>
      {errors.query && (
        <p className="mt-1 text-xs text-destructive">{errors.query.message}</p>
      )}
    </div>
  );
};

export default SearchBar;
