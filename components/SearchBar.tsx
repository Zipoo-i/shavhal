'use client';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="search">
      <svg
        className="search__icon"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
        <line
          x1="21"
          y1="21"
          x2="16.65"
          y2="16.65"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      <input
        className="search__input"
        type="search"
        inputMode="search"
        placeholder="Search dishes..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search dishes"
      />
      {value && (
        <button
          type="button"
          className="search__clear"
          aria-label="Clear search"
          onClick={() => onChange('')}
        >
          ×
        </button>
      )}
    </div>
  );
}
