import { TMDB_IMAGE_BASE } from '@/lib/constants';

interface PosterImageProps {
  posterPath: string | null;
  title: string;
  size?: 'w185' | 'w342' | 'w500';
  className?: string;
}

const PosterImage = ({ posterPath, title, size = 'w342', className = '' }: PosterImageProps) => {
  if (!posterPath) {
    return (
      <div
        className={`flex items-center justify-center rounded-card bg-neutral-800 text-neutral-500 text-xs text-center px-2 ${className}`}
      >
        {title}
      </div>
    );
  }

  return (
    <img
      src={`${TMDB_IMAGE_BASE}/${size}${posterPath}`}
      alt={title}
      className={`rounded-card object-cover ${className}`}
      loading="lazy"
    />
  );
};

export default PosterImage;
