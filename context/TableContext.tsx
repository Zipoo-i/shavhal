'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { useSearchParams } from 'next/navigation';

const STORAGE_KEY = 'shaukhaloves-table';

interface TableContextValue {
  table: string | null;
  label: string;
}

const TableContext = createContext<TableContextValue>({
  table: null,
  label: 'Table Unspecified',
});

export function TableProvider({ children }: { children: ReactNode }) {
  const searchParams = useSearchParams();
  const [table, setTable] = useState<string | null>(null);

  useEffect(() => {
    const fromUrl = searchParams.get('table');
    if (fromUrl) {
      // A fresh scan always wins and overwrites whatever was stored before,
      // so a guest who moves tables is never stuck on the old one.
      setTable(fromUrl);
      window.sessionStorage.setItem(STORAGE_KEY, fromUrl);
      return;
    }
    // No query param this load (e.g. user navigated within the app) — fall
    // back to whatever table was captured earlier this session so we never
    // re-prompt.
    const stored = window.sessionStorage.getItem(STORAGE_KEY);
    if (stored) setTable(stored);
  }, [searchParams]);

  const label = table ? `Table #${table}` : 'Table Unspecified';

  return (
    <TableContext.Provider value={{ table, label }}>
      {children}
    </TableContext.Provider>
  );
}

export function useTable() {
  return useContext(TableContext);
}
