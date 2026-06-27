import { useInfiniteQuery } from '@tanstack/react-query';
import { getNowPlayingMovies } from '@/services/movieService';
import { QUERY_KEYS } from '@/lib/constants';

export const useNowPlayingMovies = () =>
  useInfiniteQuery({
    queryKey: QUERY_KEYS.movies.nowPlaying(1),
    queryFn: ({ pageParam }) => getNowPlayingMovies(pageParam),
    initialPageParam: 1,
    getNextPageParam: (last) =>
      last.page < last.total_pages ? last.page + 1 : undefined,
  });
