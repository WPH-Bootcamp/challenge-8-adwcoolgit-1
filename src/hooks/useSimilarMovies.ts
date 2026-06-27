import { useQuery } from '@tanstack/react-query';
import { getSimilarMovies } from '@/services/movieService';
import { QUERY_KEYS } from '@/lib/constants';

export const useSimilarMovies = (id: number) =>
  useQuery({
    queryKey: QUERY_KEYS.movies.similar(id, 1),
    queryFn: () => getSimilarMovies(id, 1),
    enabled: id > 0,
  });
