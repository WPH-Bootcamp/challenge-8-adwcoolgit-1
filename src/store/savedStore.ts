import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { STORAGE_KEYS } from '@/lib/constants';
import type { SavedMovie } from '@/types/movie';

interface SavedStore {
  savedMovies: SavedMovie[];
  isSaved: (id: number) => boolean;
  addMovie: (movie: SavedMovie) => void;
  removeMovie: (id: number) => void;
  clearAll: () => void;
}

export const useSavedStore = create<SavedStore>()(
  persist(
    (set, get) => ({
      savedMovies: [],
      isSaved: (id) => get().savedMovies.some((m) => m.id === id),
      addMovie: (movie) =>
        set((state) => ({
          savedMovies: state.isSaved(movie.id)
            ? state.savedMovies
            : [{ ...movie, savedAt: Date.now() }, ...state.savedMovies],
        })),
      removeMovie: (id) =>
        set((state) => ({
          savedMovies: state.savedMovies.filter((m) => m.id !== id),
        })),
      clearAll: () => set({ savedMovies: [] }),
    }),
    { name: STORAGE_KEYS.saved }
  )
);
