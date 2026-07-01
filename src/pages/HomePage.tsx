import { useRef, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SearchBar from '@/components/movie/SearchBar';
import MovieCard from '@/components/movie/MovieCard';
import MovieCardSkeleton from '@/components/movie/MovieCardSkeleton';
import MovieListItem from '@/components/movie/MovieListItem';
import EmptySearchState from '@/components/movie/EmptySearchState';
import { usePopularMovies } from '@/hooks/usePopularMovies';
import { useNowPlayingMovies } from '@/hooks/useNowPlayingMovies';
import { useSearchMovies } from '@/hooks/useSearchMovies';
import { useMovieVideos } from '@/hooks/useMovieVideos';
import { TMDB_IMAGE_BASE } from '@/lib/constants';

const HomePage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') ?? '';
  const handleSearch = (query: string) => {
    if (query) {
      setSearchParams({ q: query }, { replace: true });
    } else {
      setSearchParams({}, { replace: true });
    }
  };

  const {
    data: popularData,
    isLoading: popularLoading,
    isError: popularError,
    refetch: popularRefetch,
  } = usePopularMovies();
  const popularMovies = popularData?.pages.flatMap((p) => p.results) ?? [];
  const featured = popularMovies[0];
  const { data: heroVideosData } = useMovieVideos(featured?.id ?? 0);
  const heroTrailer =
    heroVideosData?.results.find(
      (v) => v.type === 'Trailer' && v.site === 'YouTube' && v.official
    ) ??
    heroVideosData?.results.find(
      (v) => v.type === 'Trailer' && v.site === 'YouTube'
    );

  const {
    data: nowPlayingData,
    isLoading: nowPlayingLoading,
    isError: nowPlayingError,
    refetch: nowPlayingRefetch,
    fetchNextPage: nowPlayingFetchNext,
    hasNextPage: nowPlayingHasNext,
    isFetchingNextPage: nowPlayingFetchingNext,
  } = useNowPlayingMovies();
  const nowPlayingMovies =
    nowPlayingData?.pages.flatMap((p) => p.results) ?? [];

  const {
    data: searchData,
    isLoading: searchLoading,
    isError: searchError,
  } = useSearchMovies(searchQuery);
  const searchResults = searchData?.results ?? [];

  const trendingRef = useRef<HTMLDivElement>(null);
  const [trendingScrolled, setTrendingScrolled] = useState(false);

  const scrollTrending = (dir: 'left' | 'right') => {
    const isMobile = window.innerWidth < 768;
    const cardWidth = isMobile ? 173 + 16 : 216 + 20;
    trendingRef.current?.scrollBy({
      left: dir === 'right' ? cardWidth : -cardWidth,
      behavior: 'smooth',
    });
  };

  const handleTrendingScroll = () => {
    setTrendingScrolled((trendingRef.current?.scrollLeft ?? 0) > 0);
  };

  return (
    <div className='min-h-screen pt-navbar-h'>
      {/* Mobile search section — desktop uses the Navbar search */}
      <section className='px-mobile-x py-4 md:hidden'>
        <SearchBar
          key={searchQuery}
          onSearch={handleSearch}
          initialQuery={searchQuery}
        />
      </section>

      {/* Search Results — visible only when searchQuery is non-empty
          Desktop: results start at y:154 → pt-16 (64px below navbar bottom)
          Mobile:  appears below the SearchBar section */}
      {searchQuery && (
        <section className='px-mobile-x pt-4 pb-10 md:px-page-x md:pt-16 md:pb-20'>
          {searchLoading && (
            <div className='flex flex-col'>
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className='flex gap-3 border-b border-neutral-800 py-6 md:gap-5 md:py-8'
                >
                  <div className='h-30 w-[80px] shrink-0 animate-pulse rounded-xl bg-neutral-800 md:h-47.5 md:w-30' />
                  <div className='flex flex-1 flex-col gap-2'>
                    <div className='h-5 w-3/4 animate-pulse rounded bg-neutral-800' />
                    <div className='h-4 w-16 animate-pulse rounded bg-neutral-800' />
                    <div className='h-4 w-full animate-pulse rounded bg-neutral-800' />
                    <div className='h-4 w-2/3 animate-pulse rounded bg-neutral-800' />
                  </div>
                </div>
              ))}
            </div>
          )}
          {searchError && (
            <p className='text-sm text-destructive'>
              Failed to load search results. Please try again.
            </p>
          )}
          {!searchLoading && !searchError && searchResults.length === 0 && (
            <EmptySearchState />
          )}
          {!searchLoading && !searchError && searchResults.length > 0 && (
            <div className='flex flex-col'>
              {searchResults.map((movie) => (
                <MovieListItem key={movie.id} movie={movie} />
              ))}
            </div>
          )}
        </section>
      )}

      {/* Trending Now + New Release — hidden when search is active (T040) */}
      {!searchQuery && (
        <>
          {/* Hero Section
          Desktop: 810px full-width backdrop, content at top:298px left:140px
          Mobile:  540px backdrop, content pinned to bottom */}
          <section className='-mt-navbar-h relative h-[540px] overflow-hidden md:h-[810px]'>
            {/* Backdrop */}
            <div className='absolute inset-0'>
              {popularLoading ? (
                <div className='h-full w-full animate-pulse bg-neutral-900' />
              ) : featured?.backdrop_path ? (
                <img
                  src={`${TMDB_IMAGE_BASE}/w1280${featured.backdrop_path}`}
                  alt={featured?.title}
                  className='h-full w-full object-cover object-top'
                />
              ) : (
                <div className='h-full w-full bg-neutral-900' />
              )}
              <div className='absolute inset-0 bg-linear-to-b from-transparent to-black' />
            </div>

            {/* Content */}
            {!popularLoading && featured && (
              <div className='absolute bottom-10 left-0 right-0 flex flex-col gap-4 px-mobile-x md:bottom-auto md:left-[140px] md:right-auto md:top-[298px] md:w-[635px] md:gap-12 md:px-0'>
                <div className='flex flex-col gap-2 md:gap-4'>
                  <h1 className='text-2xl font-bold text-neutral-25 md:text-display-2xl'>
                    {featured.title}
                  </h1>
                  <p className='line-clamp-3 text-sm text-neutral-400 md:text-text-md'>
                    {featured.overview}
                  </p>
                </div>
                <div className='flex items-center gap-4'>
                  <Button
                    variant='primary'
                    size='lg'
                    onClick={() =>
                      heroTrailer
                        ? window.open(
                            `https://www.youtube.com/watch?v=${heroTrailer.key}`,
                            '_blank'
                          )
                        : navigate(`/movie/${featured.id}`)
                    }
                    className='flex-1 md:w-[230px] md:flex-none'
                  >
                    Watch Trailer
                    <img src='/icons/play.svg' alt='Play' className='h-6 w-6' />
                  </Button>
                  <Button
                    variant='outline'
                    size='lg'
                    onClick={() => navigate(`/movie/${featured.id}`)}
                    className='flex-1 border-neutral-900 bg-neutral-950/60 backdrop-blur-[20px] hover:bg-transparent hover:border-neutral-800 md:w-[230px] md:flex-none'
                  >
                    See Detail
                  </Button>
                </div>
              </div>
            )}
          </section>

          {/* Trending Now
          Desktop: heading at section top, cards at y:88 (48px heading + 40px gap)
          Mobile:  heading at y:40 (pt-10), cards at y:100 (mb-6 = 24px gap) */}
          <section className='isolate mx-auto w-full max-w-360 pt-10 pb-10 md:pt-0 md:pb-20'>
            <h2 className='mb-6 px-mobile-x text-2xl font-semibold text-neutral-25 md:mb-10 md:px-10  lg:px-page-x md:text-5xl'>
              Trending Now
            </h2>

            {popularError ? (
              <div className='flex flex-col items-center gap-4 px-mobile-x py-10 md:px-page-x'>
                <p className='text-sm text-neutral-500'>
                  Failed to load trending movies.
                </p>
                <button
                  onClick={() => popularRefetch()}
                  className='rounded-full bg-neutral-800 px-6 py-2.5 text-sm font-medium text-neutral-25 transition-colors hover:bg-neutral-700'
                >
                  Try again
                </button>
              </div>
            ) : (
              <div className='relative overflow-hidden'>
                {/* Horizontal scroll row */}
                <div
                  ref={trendingRef}
                  onScroll={handleTrendingScroll}
                  className='flex gap-4 overflow-x-auto px-mobile-x pb-2 md:gap-5 md:px-page-x scrollbar-width:none [&::-webkit-scrollbar]:hidden'
                >
                  {popularLoading
                    ? Array.from({ length: 10 }).map((_, i) => (
                        <MovieCardSkeleton key={i} />
                      ))
                    : popularMovies.map((movie, i) => (
                        <MovieCard key={movie.id} movie={movie} id={i} />
                      ))}
                </div>

                {/* Left fade gradient */}
                <div className='pointer-events-none absolute inset-y-0 left-0 w-28 bg-linear-to-r from-background via-background/60 to-transparent md:w-120' />

                {/* Right fade gradient */}
                <div className='pointer-events-none absolute inset-y-0 right-0 w-28 bg-linear-to-l from-background via-background/60 to-transparent md:w-120' />

                {/* Left arrow — visible only when scrolled */}
                {trendingScrolled && (
                  <Button
                    onClick={() => scrollTrending('left')}
                    aria-label='Scroll left'
                    className='absolute left-4 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-neutral-800 text-neutral-25 transition-colors hover:bg-neutral-700 md:left-15.25 md:h-14 md:w-14'
                  >
                    <ChevronLeft className='h-5 w-5 md:h-6 md:w-6' />
                  </Button>
                )}

                {/* Right arrow */}
                <Button
                  onClick={() => scrollTrending('right')}
                  aria-label='Scroll right'
                  className='absolute right-4 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-neutral-800 text-neutral-25 transition-colors hover:bg-neutral-700 md:right-15.25 md:h-14 md:w-14'
                >
                  <ChevronRight className='h-5 w-5 md:h-6 md:w-6' />
                </Button>
              </div>
            )}
          </section>

          {/* New Release
          Desktop: 5-col grid, gap-x:20px gap-y:40px
          Mobile:  2-col grid, gap-x:16px gap-y:32px */}
          <section className='pb-10 md:pb-20'>
            <h2 className='mb-6 px-mobile-x text-2xl font-semibold text-neutral-25 md:mb-10 md:px-10 lg:px-page-x md:text-5xl'>
              New Release
            </h2>

            {nowPlayingError ? (
              <div className='flex flex-col items-center gap-4 px-mobile-x py-10 md:px-10 lg:px-page-x'>
                <p className='text-sm text-neutral-500'>
                  Failed to load new releases.
                </p>
                <button
                  onClick={() => nowPlayingRefetch()}
                  className='rounded-full bg-neutral-800 px-6 py-2.5 text-sm font-medium text-neutral-25 transition-colors hover:bg-neutral-700'
                >
                  Try again
                </button>
              </div>
            ) : (
              <div className='px-mobile-x md:px-10  lg:px-page-x'>
                <div className='grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-5 md:gap-x-5 md:gap-y-10'>
                  {nowPlayingLoading
                    ? Array.from({ length: 10 }).map((_, i) => (
                        <MovieCardSkeleton key={i} />
                      ))
                    : nowPlayingMovies.map((movie) => (
                        <MovieCard
                          key={movie.id}
                          movie={movie}
                          className='w-full h-card-mobile-h md:h-card-h'
                        />
                      ))}
                </div>
              </div>
            )}

            {/* New Release — Load More */}
            {!nowPlayingLoading && !nowPlayingError && nowPlayingHasNext && (
              <div className='mt-8 flex justify-center md:mt-10'>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => nowPlayingFetchNext()}
                  disabled={nowPlayingFetchingNext}
                  className='w-50 md:h-13 md:w-57.5'
                >
                  {nowPlayingFetchingNext ? 'Loading…' : 'Load More'}
                </Button>
              </div>
            )}
          </section>
        </> /* end !searchQuery */
      )}
    </div>
  );
};

export default HomePage;
