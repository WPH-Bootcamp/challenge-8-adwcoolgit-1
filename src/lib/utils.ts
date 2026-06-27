import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { TMDB_IMAGE_BASE } from './constants';
import type { MovieSummary, SortOption } from '@/types/movie';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getImageUrl(path: string, size = 'original'): string {
  return `${TMDB_IMAGE_BASE}/${size}${path}`;
}

export function sortMovies(movies: MovieSummary[], sort: SortOption): MovieSummary[] {
  return [...movies].sort((a, b) => {
    switch (sort) {
      case 'rating':
        return b.vote_average - a.vote_average;
      case 'release_date':
        return b.release_date.localeCompare(a.release_date);
      case 'title':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });
}
