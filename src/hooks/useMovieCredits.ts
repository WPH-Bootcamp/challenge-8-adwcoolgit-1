import { useQuery } from '@tanstack/react-query';
import { getMovieCredits } from '@/services/movieService';
import { QUERY_KEYS } from '@/lib/constants';

export const useMovieCredits = (id: number) =>
  useQuery({
    queryKey: QUERY_KEYS.movies.credits(id),
    queryFn: () => getMovieCredits(id),
    enabled: id > 0,
  });
