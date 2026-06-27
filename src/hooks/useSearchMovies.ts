import { useQuery } from '@tanstack/react-query';
import { searchMovies } from '@/services/movieService';
import { QUERY_KEYS } from '@/lib/constants';

export const useSearchMovies = (query: string) =>
  useQuery({
    queryKey: QUERY_KEYS.movies.search(query, 1),
    queryFn: () => searchMovies(query, 1),
    enabled: query.length > 0,
  });
