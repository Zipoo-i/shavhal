'use client';

import { useRef } from 'react';
import { Category } from '@/data/categories';

interface CategoryBarProps {
  categories: Category[];
  activeId: string;
  onSelect: (id: string) => void;
}

export default function CategoryBar({
  categories,
  activeId,
  onSelect,
}: CategoryBarProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  return (
    <nav className="category-bar" aria-label="Menu categories">
      <div className="category-bar__scroller" ref={scrollerRef}>
        {categories.map((cat) => {
          const isActive = cat.id === activeId;
          return (
            <button
              key={cat.id}
              type="button"
              className={`category-chip${isActive ? ' category-chip--active' : ''}`}
              aria-current={isActive ? 'true' : undefined}
              onClick={(e) => {
                onSelect(cat.id);
                e.currentTarget.scrollIntoView({
                  behavior: 'smooth',
                  inline: 'center',
                  block: 'nearest',
                });
              }}
            >
              {cat.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
