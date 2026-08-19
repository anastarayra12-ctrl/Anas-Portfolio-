import React, { createContext, useContext, useEffect } from 'react';
import useAppStore from '../store/useAppStore';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const { theme, toggleTheme: storeToggleTheme, setTheme } = useAppStore();

  useEffect(() => {
    const savedTheme = localStorage.getItem('anas_portfolio_theme');
    if (savedTheme && savedTheme !== theme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
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
