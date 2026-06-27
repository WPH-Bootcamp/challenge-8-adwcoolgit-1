export const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p';

export const IMAGE_SIZES = {
  poster: {
    small: 'w185',
    medium: 'w342',
    large: 'w500',
    original: 'original',
  },
  backdrop: {
    small: 'w300',
    medium: 'w780',
    large: 'w1280',
    original: 'original',
  },
  profile: {
    small: 'w45',
    medium: 'w185',
    large: 'h632',
    original: 'original',
  },
} as const;

export const STORAGE_KEYS = {
  saved: 'movie-saved',
} as const;

export const QUERY_KEYS = {
  movies: {
    popular: (page: number) => ['movies', 'popular', page] as const,
    nowPlaying: (page: number) => ['movies', 'now-playing', page] as const,
    details: (id: number) => ['movie', id] as const,
    search: (query: string, page: number) => ['movies', 'search', query, page] as const,
    credits: (id: number) => ['movie', id, 'credits'] as const,
    videos: (id: number) => ['movie', id, 'videos'] as const,
    similar: (id: number, page: number) => ['movie', id, 'similar', page] as const,
  },
} as const;
