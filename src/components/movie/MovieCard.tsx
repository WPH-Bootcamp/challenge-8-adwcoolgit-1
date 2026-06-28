import { useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';
import PosterImage from './PosterImage';
import { useSavedStore } from '@/store/savedStore';
import type { MovieSummary } from '@/types/movie';

interface MovieCardProps {
  movie: MovieSummary;
  id?: number;
  className?: string;
}

const MovieCard = ({ movie, id, className }: MovieCardProps) => {
  const navigate = useNavigate();
  const { isSaved, addMovie, removeMovie } = useSavedStore();
  const saved = isSaved(movie.id);

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
        overview: movie.overview,
        savedAt: Date.now(),
      });
    }
  };

  return (
    <motion.article
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      onClick={() => navigate(`/movie/${movie.id}`)}
      className={`flex shrink-0 cursor-pointer flex-col gap-3 ${className ?? 'w-card-mobile-w h-card-mobile-h md:w-card-w md:h-card-h'}`}
    >
      {/* Poster + heart button */}
      <div className='relative min-h-0 w-full flex-1'>
        <PosterImage
          posterPath={movie.poster_path}
          title={movie.title}
          size='w342'
          className='h-full w-full'
        />
        {id ? (
          <button
            onClick={toggleSave}
            aria-label={saved ? 'Remove from saved' : 'Save movie'}
            className='absolute left-3 top-3 flex h-12 w-12 items-center justify-center rounded-full bg-[rgba(10,13,18,0.6)] backdrop-blur-[17px] transition-colors hover:bg-[rgba(10,13,18,0.9)]'
          >
            <p className='h-6 w-6 transition-colors text-neutral-25'>
              {id + 1}
            </p>
          </button>
        ) : (
          <> </>
        )}
      </div>

      {/* Movie info */}
      <div className='flex flex-col gap-0.5'>
        <p className='line-clamp-1 text-text-lg font-semibold text-neutral-25'>
          {movie.title}
        </p>
        <div className='flex items-center gap-1'>
          <Star className='h-5 w-5 fill-star text-star' />
          <span className='text-text-md font-normal text-neutral-400'>
            {movie.vote_average.toFixed(1)}
          </span>
        </div>
      </div>
    </motion.article>
  );
};

export default MovieCard;
