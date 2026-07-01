import { useRef, useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') ?? '';

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
  const [trendingAtEnd, setTrendingAtEnd] = useState(false);

  const scrollTrending = (dir: 'left' | 'right') => {
    const isMobile = window.innerWidth < 768;
    const cardWidth = isMobile ? 173 + 16 : 216 + 20;
    trendingRef.current?.scrollBy({
      left: dir === 'right' ? cardWidth : -cardWidth,
      behavior: 'smooth',
    });
  };

  const handleTrendingScroll = () => {
    const el = trendingRef.current;
    if (!el) return;
    setTrendingScrolled(el.scrollLeft > 0);
    setTrendingAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 1);
  };

  useEffect(() => {
    const el = trendingRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return; // already horizontal
      e.preventDefault();
      el.scrollBy({ left: e.deltaY * 1.5, behavior: 'smooth' });
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      className='min-h-screen pt-navbar-h'
    >
      {/* Search Results */}
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

      {/* Trending Now + New Release — hidden when search is active */}
      {!searchQuery && (
        <>
          {/* Hero Section
          Desktop: 810px full-width backdrop, content at top:298px left:140px
          Mobile:  540px backdrop, content pinned to bottom */}
          <section className='-mt-navbar-h relative h-135 overflow-hidden md:h-202.5'>
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
              <div className='absolute bottom-10 left-0 right-0 flex flex-col gap-4 px-mobile-x md:bottom-auto md:left-page-x md:right-auto md:top-74.5 md:w-158.75 md:gap-12 md:px-0'>
                <div className='flex flex-col gap-2 md:gap-4'>
                  <h1 className='text-2xl font-bold text-neutral-25 md:text-display-2xl'>
                    {featured.title}
                  </h1>
                  <p className='line-clamp-3 text-sm text-neutral-400 md:text-text-md'>
                    {featured.overview}
                  </p>
                </div>
                <div className='flex items-center gap-4'>
                  {heroTrailer && (
                    <Button
                      variant='primary'
                      size='lg'
                      onClick={() =>
                        window.open(
                          `https://www.youtube.com/watch?v=${heroTrailer.key}`,
                          '_blank'
                        )
                      }
                      className='flex-1 md:w-57.5 md:flex-none'
                    >
                      Watch Trailer
                      <img
                        src='/icons/play.svg'
                        alt='Play'
                        className='h-6 w-6'
                      />
                    </Button>
                  )}
                  <Button
                    variant='outline'
                    size='lg'
                    onClick={() => navigate(`/movie/${featured.id}`)}
                    className='flex-1 border-neutral-900 bg-neutral-950/60 backdrop-blur-[20px] hover:bg-transparent hover:border-neutral-800 md:w-57.5 md:flex-none'
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
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className='isolate mx-auto w-full max-w-360 pt-10 pb-10 md:pt-0 md:pb-20'
          >
            <h2 className='mb-6 px-mobile-x text-2xl font-semibold text-neutral-25 md:mb-10 md:px-10  lg:px-page-x md:text-5xl'>
              Trending Now
            </h2>

            {popularError ? (
              <div className='flex flex-col items-center gap-4 px-mobile-x py-10 md:px-page-x'>
                <p className='text-sm text-neutral-500'>
                  Failed to load trending movies.
                </p>
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={() => popularRefetch()}
                  className='bg-neutral-800 text-neutral-25 hover:bg-neutral-700'
                >
                  Try again
                </Button>
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

                {/* Right arrow — hidden when at end */}
                {!trendingAtEnd && (
                  <Button
                    onClick={() => scrollTrending('right')}
                    aria-label='Scroll right'
                    className='absolute right-4 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-neutral-800 text-neutral-25 transition-colors hover:bg-neutral-700 md:right-15.25 md:h-14 md:w-14'
                  >
                    <ChevronRight className='h-5 w-5 md:h-6 md:w-6' />
                  </Button>
                )}
              </div>
            )}
          </motion.section>

          {/* New Release
          Desktop: 5-col grid, gap-x:20px gap-y:40px
          Mobile:  2-col grid, gap-x:16px gap-y:32px */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className='pb-10 md:pb-20'
          >
            <h2 className='mb-6 px-mobile-x text-2xl font-semibold text-neutral-25 md:mb-10 md:px-10 lg:px-page-x md:text-5xl'>
              New Release
            </h2>

            {nowPlayingError ? (
              <div className='flex flex-col items-center gap-4 px-mobile-x py-10 md:px-10 lg:px-page-x'>
                <p className='text-sm text-neutral-500'>
                  Failed to load new releases.
                </p>
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={() => nowPlayingRefetch()}
                  className='bg-neutral-800 text-neutral-25 hover:bg-neutral-700'
                >
                  Try again
                </Button>
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
          </motion.section>
        </> /* end !searchQuery */
      )}
    </motion.div>
  );
};

export default HomePage;
