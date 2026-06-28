import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import HeartOutlineIcon from '@iconify-react/solar/heart-outline';
import StarBoldIcon from '@iconify-react/solar/star-bold';
import CalendarOutlineIcon from '@iconify-react/solar/calendar-outline';
import { TMDB_IMAGE_BASE } from '@/lib/constants';
import { useMovieDetails } from '@/hooks/useMovieDetails';
import { useMovieVideos } from '@/hooks/useMovieVideos';
import { useMovieCredits } from '@/hooks/useMovieCredits';
import { useMovieCertification } from '@/hooks/useMovieCertification';
import { useSavedStore } from '@/store/savedStore';
import PosterImage from '@/components/movie/PosterImage';
import CastCard from '@/components/movie/CastCard';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

const MovieDetailPage = () => {
  const { id } = useParams();
  const movieId = Number(id);

  const { data: movie, isLoading, isError } = useMovieDetails(movieId);
  const { data: videosData } = useMovieVideos(movieId);
  const { data: creditsData, isLoading: creditsLoading } =
    useMovieCredits(movieId);
  const topCast = creditsData?.cast.slice(0, 10) ?? [];
  const { data: certification = 'NR' } = useMovieCertification(movieId);
  const { isSaved, addMovie, removeMovie } = useSavedStore();

  const saved = movie ? isSaved(movie.id) : false;

  const toggleSave = () => {
    if (!movie) return;
    if (saved) {
      removeMovie(movie.id);
    } else {
      addMovie({
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        vote_average: movie.vote_average,
        release_date: movie.release_date,
        overview: movie.overview,
        savedAt: Date.now(),
      });
    }
  };

  const trailer =
    videosData?.results.find(
      (v) => v.type === 'Trailer' && v.site === 'YouTube' && v.official
    ) ??
    videosData?.results.find(
      (v) => v.type === 'Trailer' && v.site === 'YouTube'
    );

  const openTrailer = () =>
    trailer &&
    window.open(`https://www.youtube.com/watch?v=${trailer.key}`, '_blank');

  return (
    <div className='relative min-h-screen'>
      {/* ── Hero: absolute, full width 16:9, stays behind content ── */}
      {!isError && (
        <div className='absolute inset-x-0 top-0 aspect-video w-full overflow-hidden'>
          {isLoading ? (
            <div className='h-full w-full animate-pulse bg-neutral-900' />
          ) : movie?.backdrop_path ? (
            <img
              src={`${TMDB_IMAGE_BASE}/w1280${movie.backdrop_path}`}
              alt={movie?.title}
              className='h-full w-full object-cover object-center'
            />
          ) : (
            <div className='h-full w-full bg-neutral-900' />
          )}
          <div className='absolute inset-0 bg-linear-to-t from-background/90 via-transparent to-transparent/10' />
        </div>
      )}

      {/* ── Error state ── */}
      {isError && (
        <div className='flex h-100 w-full items-center justify-center'>
          <p className='text-sm text-neutral-500'>Failed to load movie.</p>
        </div>
      )}

      {/* ── Frame 28: content starts at top: 412px ── */}
      {movie && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className='relative z-10 flex flex-col gap-12 px-mobile-x pb-12 md:px-page-x'
        >
          {/* ── Frame 47 / Frame 22: Movie Info ── */}
          <div className='mt-55.5 flex flex-col gap-4 md:mt-103'>
            {/* Row: poster + right content */}
            <div className='flex flex-row items-start gap-4 md:gap-8'>
              {/* Poster: 116×171 on mobile, 260×384 on desktop */}
              <div className='h-42.75 w-29 shrink-0 md:h-auto md:w-65'>
                <PosterImage
                  posterPath={movie.poster_path}
                  title={movie.title}
                  size='w500'
                  className='h-full w-full rounded-xl md:h-96'
                />
              </div>

              {/* Frame 19: mobile right col — title + date only */}
              <div className='flex flex-1 flex-col gap-1 md:hidden'>
                <h1 className='text-xl font-bold leading-8.5 text-neutral-25'>
                  {movie.title}
                </h1>
                {movie.release_date && (
                  <div className='flex items-center gap-1'>
                    <CalendarOutlineIcon className='h-5 w-5 shrink-0 text-white' />
                    <span className='text-sm leading-7 text-white'>
                      {formatDate(movie.release_date)}
                    </span>
                  </div>
                )}
              </div>

              {/* Frame 20: desktop right col — full content */}
              <div className='hidden md:flex md:flex-1 md:flex-col md:gap-6'>
                <h1 className='text-display-xl font-bold tracking-[-0.02em] text-neutral-25'>
                  {movie.title}
                </h1>
                {movie.release_date && (
                  <div className='flex items-center gap-2'>
                    <CalendarOutlineIcon className='h-6 w-6 shrink-0 text-white' />
                    <span className='text-text-md text-white'>
                      {formatDate(movie.release_date)}
                    </span>
                  </div>
                )}
                {/* Buttons */}
                <div className='flex items-center gap-4'>
                  {trailer && (
                    <Button
                      variant='primary'
                      size='lg'
                      onClick={openTrailer}
                      className='w-55'
                    >
                      Watch Trailer
                      <img src='/public/icons/play.svg' className='h-6 w-6' />
                    </Button>
                  )}
                  <button
                    onClick={toggleSave}
                    aria-label={saved ? 'Remove from saved' : 'Save movie'}
                    className={`flex h-13 w-13 shrink-0 items-center justify-center rounded-full border backdrop-blur-5 transition-colors bg-neutral-900 ${
                      saved
                        ? 'border-neutral-900/90 text-brand'
                        : 'border-neutral-900/90 text-neutral-25 hover:border-neutral-900 hover:text-brand'
                    }`}
                  >
                    <Heart className={`h-6 w-6 ${saved ? 'fill-brand' : ''}`} />
                  </button>
                </div>
                {/* Stat boxes */}
                <div className='flex gap-5'>
                  <div className='flex flex-1 flex-col items-center gap-2 rounded-2xl border border-neutral-800 bg-black p-5'>
                    <StarBoldIcon className='h-8 w-8 fill-star text-star' />
                    <div className='flex flex-col gap-0.5 text-center'>
                      <span className='text-text-md text-neutral-300'>
                        Rating
                      </span>
                      <span className='text-text-xl font-semibold text-neutral-25'>
                        {movie.vote_average.toFixed(1)}/10
                      </span>
                    </div>
                  </div>
                  <div className='flex flex-1 flex-col items-center gap-2 rounded-2xl border border-neutral-800 bg-black p-5'>
                    <img
                      src='/public/icons/video.svg'
                      className='h-8 w-8 p-0.75'
                    />
                    <div className='flex flex-col gap-0.5 text-center'>
                      <span className='text-text-md text-neutral-300'>
                        Genre
                      </span>
                      <span className='line-clamp-1 text-text-xl font-semibold text-neutral-25'>
                        {movie.genres[0]?.name ?? '—'}
                      </span>
                    </div>
                  </div>
                  <div className='flex flex-1 flex-col items-center gap-2 rounded-2xl border border-neutral-800 bg-black p-5'>
                    <img
                      src='/public/icons/emoji.svg'
                      className='h-8 w-8 p-0.75'
                    />
                    <div className='flex flex-col gap-0.5 text-center'>
                      <span className='text-text-md text-neutral-300'>
                        Age Limit
                      </span>
                      <span className='text-text-xl font-semibold text-neutral-25'>
                        {certification}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile: buttons + stats below the row */}
            <div className='flex flex-col gap-4 md:hidden'>
              {/* Frame 30: Buttons */}
              <div className='flex items-start gap-4'>
                {trailer && (
                  <Button
                    variant='primary'
                    size='sm'
                    onClick={openTrailer}
                    className='flex-1'
                  >
                    Watch Trailer
                    <img src='/public/icons/play.svg' className='h-5 w-5' />
                  </Button>
                )}
                <button
                  onClick={toggleSave}
                  aria-label={saved ? 'Remove from saved' : 'Save movie'}
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border backdrop-blur-[20px] transition-colors ${
                    saved
                      ? 'border-brand bg-brand text-neutral-25'
                      : 'border-neutral-900 bg-neutral-950/60 text-neutral-25 hover:border-brand hover:text-brand'
                  }`}
                >
                  <HeartOutlineIcon
                    className={`h-6 w-6 ${saved ? 'fill-brand' : ''}`}
                  />
                </button>
              </div>
              {/* Frame 17: Stat boxes */}
              <div className='flex gap-2'>
                <div className='flex flex-1 flex-col items-center gap-2 rounded-2xl border border-neutral-800 bg-black p-3'>
                  <StarBoldIcon className='h-7 w-7 fill-star text-star' />
                  <div className='flex flex-col gap-0.5 text-center'>
                    <span className='text-xs leading-7.5 text-neutral-300'>
                      Rating
                    </span>
                    <span className='text-sm font-semibold leading-8.5 text-neutral-25'>
                      {movie.vote_average.toFixed(1)}/10
                    </span>
                  </div>
                </div>
                <div className='flex flex-1 flex-col items-center gap-2 rounded-2xl border border-neutral-800 bg-black p-3'>
                  <img
                    src='/public/icons/video.svg'
                    className='h-7 w-7 p-0.75'
                  />
                  <div className='flex flex-col gap-0.5 text-center'>
                    <span className='text-xs leading-7.5 text-neutral-300'>
                      Genre
                    </span>
                    <span className='line-clamp-1 text-sm font-semibold leading-8.5 text-neutral-25'>
                      {movie.genres[0]?.name ?? '—'}
                    </span>
                  </div>
                </div>
                <div className='flex flex-1 flex-col items-center gap-2 rounded-2xl border border-neutral-800 bg-black p-3'>
                  <img
                    src='/public/icons/emoji.svg'
                    className='h-7 w-7 p-0.75'
                  />
                  <div className='flex flex-col gap-0.5 text-center'>
                    <span className='text-xs leading-7.5 text-neutral-300'>
                      Age Limit
                    </span>
                    <span className='text-sm font-semibold leading-8.5 text-neutral-25'>
                      {certification}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Frame 21: Overview ── */}
          {movie.overview && (
            <div className='flex flex-col gap-2'>
              <h2 className='text-display-xs font-bold tracking-[-0.02em] text-neutral-25 md:text-display-md'>
                Overview
              </h2>
              <p className='text-sm leading-7.5 text-neutral-400 md:text-text-md'>
                {movie.overview}
              </p>
            </div>
          )}
        </motion.div>
      )}

      {/* ── Cast Section ── */}
      <section className='px-mobile-x pb-12 md:px-page-x'>
        <h2 className='mb-6 text-display-xs font-bold tracking-[-0.02em] text-neutral-25 md:mb-8 md:text-display-md'>
          Top Cast
        </h2>
        {creditsLoading ? (
          <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className='h-26 animate-pulse rounded-xl bg-neutral-900'
              />
            ))}
          </div>
        ) : topCast.length > 0 ? (
          <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
            {topCast.map((member) => (
              <CastCard key={member.id} cast={member} />
            ))}
          </div>
        ) : null}
      </section>
    </div>
  );
};

export default MovieDetailPage;
