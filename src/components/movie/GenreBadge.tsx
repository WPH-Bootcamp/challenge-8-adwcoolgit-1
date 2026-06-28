import { Badge } from '@/components/ui/badge';
import type { Genre } from '@/types/movie';

interface GenreBadgeProps {
  genre: Genre;
}

const GenreBadge = ({ genre }: GenreBadgeProps) => (
  <Badge
    variant="outline"
    className="rounded-full border-neutral-700 px-3 py-1 text-xs font-medium text-neutral-400 hover:border-neutral-500 hover:text-neutral-300"
  >
    {genre.name}
  </Badge>
);

export default GenreBadge;
