'use client';

import { useTable } from '@/context/TableContext';

export default function Header() {
  const { label } = useTable();

  return (
    <header className="header">
      <div className="header__brand">
        <div className="header__name">Shaukhaloves Cake</div>
        <div className="header__location">Sunzha, TC &quot;SIG&quot;</div>
      </div>
      <div className="header__table">{label}</div>
    </header>
  );
}
