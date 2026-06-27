import { Star } from 'lucide-react';

interface RatingBadgeProps {
  rating: number;
  className?: string;
}

const RatingBadge = ({ rating, className = '' }: RatingBadgeProps) => (
  <div className={`flex items-center gap-1 ${className}`}>
    <Star className="h-6 w-6 fill-star text-star" />
    <span className="text-text-lg font-medium text-neutral-25">{rating.toFixed(1)}</span>
  </div>
);

export default RatingBadge;
