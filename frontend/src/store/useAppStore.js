import { create } from 'zustand';

const useAppStore = create((set) => ({
  theme: 'dark', // 'dark' | 'light'
  lang: 'en', // 'en' | 'ar'
  direction: 'ltr', // 'ltr' | 'rtl'
  isMenuOpen: false,
  
  toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
  setTheme: (theme) => set({ theme }),
  
  setLang: (lang) => set({
    lang,
    direction: lang === 'ar' ? 'rtl' : 'ltr'
  }),

  toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
  closeMenu: () => set({ isMenuOpen: false }),
}));

export const useUIStore = useAppStore;
export default useAppStore;
