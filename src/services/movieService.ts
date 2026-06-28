import api from '@/lib/axios';
import type {
  Movie,
  MovieListResponse,
  SearchResponse,
  MovieCredits,
  MovieVideosResponse,
  MovieReleaseDatesResponse,
} from '@/types/movie';

export const getPopularMovies = (page = 1): Promise<MovieListResponse> =>
  api.get<MovieListResponse>('/movie/popular', { params: { page } }).then((r) => r.data);

export const getNowPlayingMovies = (page = 1): Promise<MovieListResponse> =>
  api.get<MovieListResponse>('/movie/now_playing', { params: { page } }).then((r) => r.data);

export const searchMovies = (query: string, page = 1): Promise<SearchResponse> =>
  api.get<SearchResponse>('/search/movie', { params: { query, page } }).then((r) => r.data);

export const getMovieDetails = (id: number): Promise<Movie> =>
  api.get<Movie>(`/movie/${id}`).then((r) => r.data);

export const getMovieCredits = (id: number): Promise<MovieCredits> =>
  api.get<MovieCredits>(`/movie/${id}/credits`).then((r) => r.data);

export const getMovieVideos = (id: number): Promise<MovieVideosResponse> =>
  api.get<MovieVideosResponse>(`/movie/${id}/videos`).then((r) => r.data);

export const getSimilarMovies = (id: number, page = 1): Promise<MovieListResponse> =>
  api.get<MovieListResponse>(`/movie/${id}/similar`, { params: { page } }).then((r) => r.data);

export const getMovieCertification = async (id: number): Promise<string> => {
  const { data } = await api.get<MovieReleaseDatesResponse>(`/movie/${id}/release_dates`);
  const us = data.results.find((r) => r.iso_3166_1 === 'US');
  return us?.release_dates.find((d) => d.certification)?.certification ?? 'NR';
};
