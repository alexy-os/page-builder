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