import React, { createContext, useContext, useEffect } from 'react';
import useAppStore from '../store/useAppStore';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const { theme, toggleTheme: storeToggleTheme, setTheme } = useAppStore();

  useEffect(() => {
    // Always reset to dark mode on every page load/refresh
    setTheme('dark');
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('anas_portfolio_theme', 'dark');
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('anas_portfolio_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const nextTheme = theme === 'dark' ? 'light' : 'dark';

    const updateDOM = () => {
      document.documentElement.setAttribute('data-theme', nextTheme);
      localStorage.setItem('anas_portfolio_theme', nextTheme);
      document.body.classList.add('theme-transitioning');
      storeToggleTheme();
      setTimeout(() => {
        document.body.classList.remove('theme-transitioning');
      }, 350);
    };

    if (!prefersReducedMotion && document.startViewTransition) {
      document.startViewTransition(() => {
        updateDOM();
      });
    } else {
      updateDOM();
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
