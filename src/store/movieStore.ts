import { create } from 'zustand';

interface MovieStore {
  _placeholder: null;
}

export const useMovieStore = create<MovieStore>()(() => ({
  _placeholder: null,
}));
