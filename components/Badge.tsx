import { Badge as BadgeType } from '@/types/product';

const LABELS: Record<Exclude<BadgeType, null>, string> = {
  hit: 'Hit',
  new: 'New',
  popular: 'Popular',
};

export default function Badge({ type }: { type: BadgeType }) {
  if (!type) return null;
  return <span className="badge">{LABELS[type]}</span>;
}
