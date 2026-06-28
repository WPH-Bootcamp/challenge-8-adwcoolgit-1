import { User } from 'lucide-react';
import { TMDB_IMAGE_BASE } from '@/lib/constants';
import type { CastMember } from '@/types/movie';

interface CastCardProps {
  cast: CastMember;
}

const CastCard = ({ cast }: CastCardProps) => (
  <div className="flex items-center gap-4">
    {/* Profile photo: 69×104px, rounded-[10px] */}
    <div className="h-[104px] w-[69px] shrink-0 overflow-hidden rounded-[10px] bg-neutral-800">
      {cast.profile_path ? (
        <img
          src={`${TMDB_IMAGE_BASE}/w185${cast.profile_path}`}
          alt={cast.name}
          className="h-full w-full object-cover object-top"
          loading="lazy"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <User className="h-6 w-6 text-neutral-600" />
        </div>
      )}
    </div>

    {/* Name + character */}
    <div className="flex min-w-0 flex-1 flex-col gap-1">
      <span className="line-clamp-1 text-text-md font-semibold leading-[30px] text-neutral-25">
        {cast.name}
      </span>
      <span className="line-clamp-2 text-text-md font-normal leading-[30px] text-neutral-400">
        {cast.character}
      </span>
    </div>
  </div>
);

export default CastCard;
