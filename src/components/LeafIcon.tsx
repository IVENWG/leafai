import { LEAF_CATEGORIES, type LeafCategoryKey } from '../lib/constants';
import './LeafIcon.css';

const LEAF_IMAGES: Record<LeafCategoryKey, string> = {
  long_leaf: '/images/leaf-long.jpg',
  round_leaf: '/images/leaf-round.jpg',
  tooth_leaf: '/images/leaf-tooth.jpg',
  big_leaf: '/images/leaf-big.jpg',
};

interface LeafIconProps {
  category: LeafCategoryKey;
  size?: number;
  animated?: boolean;
}

export function LeafIcon({ category, size = 48, animated = false }: LeafIconProps) {
  return (
    <div
      className={`leaf-icon-wrapper ${animated ? 'leaf-animated' : ''}`}
      style={{ width: size, height: size }}
    >
      <img
        src={LEAF_IMAGES[category]}
        alt={LEAF_CATEGORIES[category].name}
        className="leaf-icon-img"
      />
    </div>
  );
}
