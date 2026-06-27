import { useQuery } from '@tanstack/react-query';
import { getMovieVideos } from '@/services/movieService';
import { QUERY_KEYS } from '@/lib/constants';

export const useMovieVideos = (id: number) =>
  useQuery({
    queryKey: QUERY_KEYS.movies.videos(id),
    queryFn: () => getMovieVideos(id),
    enabled: id > 0,
  });
