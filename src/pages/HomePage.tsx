import { useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import SearchBar from '@/components/movie/SearchBar';
import MovieCard from '@/components/movie/MovieCard';
import MovieCardSkeleton from '@/components/movie/MovieCardSkeleton';
import { usePopularMovies } from '@/hooks/usePopularMovies';
import { useNowPlayingMovies } from '@/hooks/useNowPlayingMovies';

const HomePage = () => {
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
    fetchNextPage: popularFetchNext,
    hasNextPage: popularHasNext,
    isFetchingNextPage: popularFetchingNext,
  } = usePopularMovies();
  const popularMovies = popularData?.pages.flatMap((p) => p.results) ?? [];

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

  const trendingRef = useRef<HTMLDivElement>(null);
  const scrollTrending = () => {
    const isMobile = window.innerWidth < 768;
    const cardWidth = isMobile ? 173 + 16 : 216 + 20;
    trendingRef.current?.scrollBy({ left: cardWidth, behavior: 'smooth' });
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

      {/* Trending Now
          Desktop: heading at section top, cards at y:88 (48px heading + 40px gap)
          Mobile:  heading at y:40 (pt-10), cards at y:100 (mb-6 = 24px gap) */}
      <section className='pt-10 pb-10 md:pt-0 md:pb-20'>
        <h2 className='mb-6 px-mobile-x text-2xl font-semibold text-neutral-25 md:mb-10 md:px-page-x md:text-5xl'>
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
              className='flex gap-4 overflow-x-auto px-mobile-x pb-2 md:gap-5 md:px-page-x scrollbar-width:none [&::-webkit-scrollbar]:hidden'
            >
              {popularLoading
                ? Array.from({ length: 10 }).map((_, i) => (
                    <MovieCardSkeleton key={i} />
                  ))
                : popularMovies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                  ))}
            </div>

            {/* Right fade gradient — desktop only, x:1010→x:1440 = 430px wide */}
            <div className='pointer-events-none absolute inset-y-0 right-0 hidden w-107.5 bg-linear-to-l from-background to-transparent md:block' />

            {/* Arrow button — Figma: 56×56 desktop (right:61px), 44×44 mobile */}
            <button
              onClick={scrollTrending}
              aria-label='Scroll right'
              className='absolute right-4 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-neutral-800 text-neutral-25 transition-colors hover:bg-neutral-700 md:right-15.25 md:h-14 md:w-14'
            >
              <ChevronRight className='h-5 w-5 md:h-6 md:w-6' />
            </button>
          </div>
        )}

        {/* Trending Now — Load More */}
        {!popularLoading && !popularError && popularHasNext && (
          <div className='mt-6 flex justify-center'>
            <button
              onClick={() => popularFetchNext()}
              disabled={popularFetchingNext}
              className='h-11 w-50 rounded-full border border-neutral-800 text-sm font-medium text-neutral-25 transition-colors hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50 md:h-13 md:w-57.5'
            >
              {popularFetchingNext ? 'Loading…' : 'Load More'}
            </button>
          </div>
        )}
      </section>

      {/* New Release
          Desktop: 5-col grid, gap-x:20px gap-y:40px
          Mobile:  2-col grid, gap-x:16px gap-y:32px */}
      <section className='pb-10 md:pb-20'>
        <h2 className='mb-6 px-mobile-x text-2xl font-semibold text-neutral-25 md:mb-10 md:px-page-x md:text-5xl'>
          New Release
        </h2>

        {nowPlayingError ? (
          <div className='flex flex-col items-center gap-4 px-mobile-x py-10 md:px-page-x'>
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
          <div className='px-mobile-x md:px-page-x'>
            <div className='grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-5 md:gap-x-5 md:gap-y-10'>
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
            <button
              onClick={() => nowPlayingFetchNext()}
              disabled={nowPlayingFetchingNext}
              className='h-11 w-50 rounded-full border border-neutral-800 text-sm font-medium text-neutral-25 transition-colors hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50 md:h-13 md:w-57.5'
            >
              {nowPlayingFetchingNext ? 'Loading…' : 'Load More'}
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;
