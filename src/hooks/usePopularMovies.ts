import { useInfiniteQuery } from '@tanstack/react-query';
import { getPopularMovies } from '@/services/movieService';
import { QUERY_KEYS } from '@/lib/constants';

export const usePopularMovies = () =>
  useInfiniteQuery({
    queryKey: QUERY_KEYS.movies.popular(1),
    queryFn: ({ pageParam }) => getPopularMovies(pageParam),
    initialPageParam: 1,
    getNextPageParam: (last) =>
      last.page < last.total_pages ? last.page + 1 : undefined,
  });
