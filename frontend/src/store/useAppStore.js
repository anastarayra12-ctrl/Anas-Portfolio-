import { create } from 'zustand';

const useAppStore = create((set) => ({
  theme: 'dark', // 'dark' | 'light'
  lang: 'en', // 'en' | 'ar'
  direction: 'ltr', // 'ltr' | 'rtl'
  
  toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
  setTheme: (theme) => set({ theme }),
  
  setLang: (lang) => set({
    lang,
    direction: lang === 'ar' ? 'rtl' : 'ltr'
  }),
}));

export default useAppStore;
