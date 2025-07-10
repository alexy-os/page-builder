// Jotai atoms for local component state
import { atom } from 'jotai';
import type { Template } from '@/types';

// Dialog states
export const selectedTemplateAtom = atom<Template | null>(null);

// Builder sidebar state
export const builderActiveTabAtom = atom<'favorites' | 'all'>('all');

// Pins page state
export const pinsColumnsAtom = atom<2 | 3>(3);

// Loading states
export const isExportingAtom = atom<boolean>(false);
export const isImportingAtom = atom<boolean>(false);

// Form states
export const projectNameInputAtom = atom<string>('');

// Temporary states for optimistic updates
export const optimisticFavoritesAtom = atom<Set<string>>(new Set<string>());

// Stats display
export const showStatsAtom = atom<boolean>(false);

// PageBuilder initialization states
export const initializationErrorAtom = atom<string | null>(null);
export const isInitializedAtom = atom<boolean>(false);

// Block editor states
export const editingBlockAtom = atom<any | null>(null);
export const blockErrorsAtom = atom<Set<string>>(new Set<string>());

// Theme loading states
export const themeLoadingAtom = atom<boolean>(false);
export const themeErrorAtom = atom<string | null>(null);

// Lazy loading state atom
export const lazyLoadingAtom = atom({
  visibleCount: 12,
  isLoading: false
});

// Derived atom for resetting when filters change
export const lazyLoadingWithResetAtom = atom(
  (get) => get(lazyLoadingAtom),
  (get, set, update: Partial<typeof lazyLoadingAtom.init> | 'reset') => {
    if (update === 'reset') {
      set(lazyLoadingAtom, { visibleCount: 12, isLoading: false });
    } else {
      set(lazyLoadingAtom, { ...get(lazyLoadingAtom), ...update });
    }
  }
); 