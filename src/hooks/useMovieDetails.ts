import { useQuery } from '@tanstack/react-query';
import { getMovieDetails } from '@/services/movieService';
import { QUERY_KEYS } from '@/lib/constants';

export const useMovieDetails = (id: number) =>
  useQuery({
    queryKey: QUERY_KEYS.movies.details(id),
    queryFn: () => getMovieDetails(id),
    enabled: id > 0,
  });
