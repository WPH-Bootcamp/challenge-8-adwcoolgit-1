import { useQuery } from '@tanstack/react-query';
import { getMovieCertification } from '@/services/movieService';
import { QUERY_KEYS } from '@/lib/constants';

export const useMovieCertification = (id: number) =>
  useQuery({
    queryKey: QUERY_KEYS.movies.certification(id),
    queryFn: () => getMovieCertification(id),
    enabled: id > 0,
  });
