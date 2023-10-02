import { atom, useAtom } from 'jotai';
import { LAYOUT_OPTIONS } from '@/lib/constants';

// 1. set initial atom for Askify layout
const AskifyLayoutAtom = atom(
  typeof window !== 'undefined'
    ? localStorage.getItem('Askify-layout')
    : LAYOUT_OPTIONS.MODERN
);

const AskifyLayoutAtomWithPersistence = atom(
  (get) => get(AskifyLayoutAtom),
  (get, set, newStorage: any) => {
    set(AskifyLayoutAtom, newStorage);
    localStorage.setItem('Askify-layout', newStorage);
  }
);

// 2. useLayout hook to check which layout is available
export function useLayout() {
  const [layout, setLayout] = useAtom(AskifyLayoutAtomWithPersistence);
  return {
    layout,
    setLayout,
  };
}
