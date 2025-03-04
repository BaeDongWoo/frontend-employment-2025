import { create } from 'zustand';

interface ThemeState {
  isMode: boolean;
  setIsMode: (mode: boolean) => void;
}

const useThemeStore = create<ThemeState>((set) => ({
  isMode: localStorage.getItem('isMode') === 'dark' ? true : false,
  setIsMode: (mode) => set({ isMode: mode }),
}));

export { useThemeStore };
