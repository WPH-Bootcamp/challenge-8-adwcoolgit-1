import { Star } from 'lucide-react';

interface RatingBadgeProps {
  rating: number;
  className?: string;
}

const RatingBadge = ({ rating, className = '' }: RatingBadgeProps) => (
  <div className={`flex items-center gap-1 ${className}`}>
    <Star className="h-3.5 w-3.5 fill-brand text-brand" />
    <span className="text-xs font-semibold text-neutral-25">{rating.toFixed(1)}</span>
  </div>
);

export default RatingBadge;
