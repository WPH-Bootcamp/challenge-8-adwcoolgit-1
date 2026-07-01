import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { searchSchema, type SearchFormValues } from '@/lib/schemas';
import SearchInput from '@/components/ui/SearchInput';

interface SearchBarProps {
  onSearch: (query: string) => void;
  initialQuery?: string;
  autoFocus?: boolean;
}

const SearchBar = ({ onSearch, initialQuery = '', autoFocus = false }: SearchBarProps) => {
  const [inputValue, setInputValue] = useState(initialQuery);

  const { handleSubmit, setValue, formState: { errors } } = useForm<SearchFormValues>({
    resolver: zodResolver(searchSchema),
    defaultValues: { query: initialQuery },
  });

  const handleChange = (val: string) => {
    setInputValue(val);
    setValue('query', val);
  };

  const handleClear = () => {
    setInputValue('');
    setValue('query', '');
    onSearch('');
  };

  const onSubmit = (data: SearchFormValues) => {
    onSearch(data.query.trim());
  };

  return (
    <div className='w-full'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <SearchInput
          value={inputValue}
          onChange={handleChange}
          onClear={handleClear}
          autoFocus={autoFocus}
          className='h-14'
        />
      </form>
      {errors.query && (
        <p className='mt-1 text-xs text-destructive'>{errors.query.message}</p>
      )}
    </div>
  );
};

export default SearchBar;
