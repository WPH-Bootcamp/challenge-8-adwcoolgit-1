export interface Genre {
  id: number;
  name: string;
}

export interface Movie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genres: Genre[];
  runtime: number | null;
  status: string;
  tagline: string | null;
  adult: boolean;
}

export interface MovieSummary {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  overview: string;
}

export interface PaginatedResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
}

export interface CrewMember {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
}

export interface MovieCredits {
  id: number;
  cast: CastMember[];
  crew: CrewMember[];
}

export interface MovieVideo {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
  published_at: string;
}

export interface MovieVideosResponse {
  id: number;
  results: MovieVideo[];
}

export type MovieListResponse = PaginatedResponse<MovieSummary>;
export type SearchResponse = PaginatedResponse<MovieSummary>;

export interface SavedMovie {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
  release_date: string;
  overview: string;
  savedAt: number;
}

export type SortOption = 'popularity' | 'rating' | 'release_date' | 'title';

export interface ReleaseDateEntry {
  certification: string;
  release_date: string;
  type: number;
}

export interface ReleaseDateResult {
  iso_3166_1: string;
  release_dates: ReleaseDateEntry[];
}

export interface MovieReleaseDatesResponse {
  id: number;
  results: ReleaseDateResult[];
}
