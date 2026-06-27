import { useNavigate } from 'react-router-dom';
import { Play, Heart, Star } from 'lucide-react';
import PosterImage from './PosterImage';
import { useSavedStore } from '@/store/savedStore';
import type { MovieSummary } from '@/types/movie';

interface MovieListItemProps {
  movie: MovieSummary;
}

const MovieListItem = ({ movie }: MovieListItemProps) => {
  const navigate = useNavigate();
  const { isSaved, addMovie, removeMovie } = useSavedStore();
  const saved = isSaved(movie.id);

  const goToDetail = () => navigate(`/movie/${movie.id}`);

  const toggleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (saved) {
      removeMovie(movie.id);
    } else {
      addMovie({
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        vote_average: movie.vote_average,
        release_date: movie.release_date,
        savedAt: Date.now(),
      });
    }
  };

  return (
    <div className='flex flex-col border-b border-neutral-800 py-6 md:h67.5 md:flex-row md:items-start md:justify-between md:py-0'>
      {/* Left section: poster + content */}
      <div className='flex gap-3 md:items-start md:gap-6'>
        {/* Poster: mobile 80×120, desktop 182×270, radius 12px */}
        <button
          onClick={goToDetail}
          className='h-30 w-20 shrink-0 cursor-pointer overflow-hidden rounded-xl md:h-67.5 md:w-45.5'
        >
          <PosterImage
            posterPath={movie.poster_path}
            title={movie.title}
            size='w185'
            className='h-full w-full'
          />
        </button>

        {/* Content column: info group + Watch Trailer button (gap 24px on desktop) */}
        <div className='flex flex-1 flex-col md:gap-6'>
          {/* Info group: title + rating + overview (gap 12px on desktop) */}
          <div className='flex flex-col gap-1.5 md:gap-3'>
            <button
              onClick={goToDetail}
              className='line-clamp-2 text-left text-base font-semibold text-neutral-25 transition-colors hover:text-brand md:text-2xl md:font-bold md:leading-9'
            >
              {movie.title}
            </button>

            {/* Mobile: 14px star + compact text; Desktop: 24px star + "X.X/10" */}
            <div className='flex items-center gap-1'>
              <Star className='h-3.5 w-3.5 fill-star text-star md:h-6 md:w-6' />
              <span className='text-xs font-semibold text-neutral-25 md:text-lg md:font-medium'>
                {movie.vote_average.toFixed(1)}
                <span className='hidden md:inline'>/10</span>
              </span>
            </div>

            {movie.overview && (
              <p className='line-clamp-2 text-xs text-neutral-400 md:line-clamp-3 md:text-base md:leading-7.5'>
                {movie.overview}
              </p>
            )}
          </div>

          {/* Watch Trailer — desktop only */}
          <button
            onClick={goToDetail}
            className='hidden h-13 w-50 items-center justify-center gap-2 rounded-full bg-brand text-base font-semibold text-neutral-25 transition-colors hover:bg-brand-hover md:flex'
          >
            Watch Trailer
            <Play className='h-6 w-6 fill-current' />
          </button>
        </div>
      </div>

      {/* Heart button — desktop only, 56×56, glass-morphism style */}
      <button
        onClick={toggleSave}
        aria-label={saved ? 'Remove from saved' : 'Save movie'}
        className='hidden shrink-0 items-center justify-center rounded-full border border-neutral-900 bg-[rgba(10,13,18,0.6)] backdrop-blur-[20px] md:flex md:size-14'
      >
        <Heart
          className={`h-6 w-6 transition-colors ${saved ? 'fill-brand text-brand' : 'text-neutral-25'}`}
        />
      </button>

      {/* Mobile Row 2: Watch Trailer + Heart */}
      <div className='mt-3 flex gap-3 md:hidden'>
        <button
          onClick={goToDetail}
          className='flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-brand text-sm font-semibold text-neutral-25 transition-colors hover:bg-brand-hover'
        >
          <Play className='h-4 w-4 fill-current' />
          Watch Trailer
        </button>
        <button
          onClick={toggleSave}
          aria-label={saved ? 'Remove from saved' : 'Save movie'}
          className='flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-neutral-800'
        >
          <Heart
            className={`h-5 w-5 transition-colors ${saved ? 'fill-brand text-brand' : 'text-neutral-25'}`}
          />
        </button>
      </div>
    </div>
  );
};

export default MovieListItem;
