import { motion } from 'framer-motion';
import { useSavedStore } from '@/store/savedStore';
import MovieListItem from '@/components/movie/MovieListItem';
import EmptySavedState from '@/components/movie/EmptySavedState';

const SavedMoviesPage = () => {
  const { savedMovies } = useSavedStore();

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      className='min-h-screen px-mobile-x pb-12 pt-24 md:px-page-x md:pt-38.5'
    >
      {/* ── Frame 32: centred content column ── */}
      <div className='mx-auto flex w-full max-w-content flex-col'>
        {/* ── Page Heading ── */}
        <div className='flex items-center gap-3'>
          <h1 className='text-display-xs font-bold tracking-[-0.02em] text-neutral-25 md:text-display-md'>
            Favourites
          </h1>
        </div>

        {/* ── Movies List / Empty State ── */}
        {savedMovies.length === 0 ? (
          <EmptySavedState />
        ) : (
          <div className='flex flex-col'>
            {savedMovies.map((saved, i) => (
              <MovieListItem
                key={saved.id}
                movie={{
                  ...saved,
                  backdrop_path: null,
                }}
                sparation={i < savedMovies.length - 1}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default SavedMoviesPage;
