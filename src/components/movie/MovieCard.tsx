import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import PosterImage from './PosterImage';
import RatingBadge from './RatingBadge';
import { useSavedStore } from '@/store/savedStore';
import type { MovieSummary } from '@/types/movie';

interface MovieCardProps {
  movie: MovieSummary;
}

const MovieCard = ({ movie }: MovieCardProps) => {
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
        savedAt: Date.now(),
      });
    }
  };

  const year = movie.release_date ? movie.release_date.slice(0, 4) : '—';

  return (
    <motion.article
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      onClick={() => navigate(`/movie/${movie.id}`)}
      className="relative flex cursor-pointer flex-col"
      style={{ width: 'var(--spacing-card-w)', height: 'var(--spacing-card-h)' }}
    >
      <PosterImage
        posterPath={movie.poster_path}
        title={movie.title}
        size="w342"
        className="w-full flex-1 min-h-0"
      />

      <div className="mt-2 flex flex-col gap-1 px-0.5">
        <p className="line-clamp-1 text-sm font-semibold text-neutral-25">{movie.title}</p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-neutral-500">{year}</span>
          <RatingBadge rating={movie.vote_average} />
        </div>
      </div>

      <button
        onClick={toggleSave}
        aria-label={saved ? 'Remove from saved' : 'Save movie'}
        className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-[rgba(10,13,18,0.7)] backdrop-blur-sm transition-colors hover:bg-[rgba(10,13,18,0.9)]"
      >
        <Heart
          className={`h-4 w-4 transition-colors ${saved ? 'fill-brand text-brand' : 'text-neutral-25'}`}
        />
      </button>
    </motion.article>
  );
};

export default MovieCard;
