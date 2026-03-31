import React from "react";
import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';


interface ThemeContextType {
  theme: string;
  resolvedTheme: string;
  colorTheme: string;
  setTheme: (t: string) => void;
  setColorTheme: (c: string) => void;
  toggleTheme: () => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = 'korean-pro-theme';
const COLOR_STORAGE_KEY = 'korean-pro-color';
const VALID_THEMES = ['auto', 'light', 'dark'];
const VALID_COLORS = ['blue', 'red', 'green', 'purple', 'orange'];

function getSystemTheme() {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function getStoredTheme() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && VALID_THEMES.includes(stored)) {
      return stored;
    }
  } catch {
    // localStorage not available
  }
  return 'auto';
}

function getStoredColor() {
  try {
    const stored = localStorage.getItem(COLOR_STORAGE_KEY);
    if (stored && VALID_COLORS.includes(stored)) {
      return stored;
    }
  } catch {
    // localStorage not available
  }
  return 'blue';
}

function resolveTheme(theme: string) {
  if (theme === 'auto') {
    return getSystemTheme();
  }
  return theme;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState(getStoredTheme);
  const [resolvedTheme, setResolvedTheme] = useState(() => resolveTheme(getStoredTheme()));
  const [colorTheme, setColorThemeState] = useState(getStoredColor);

  const applyTheme = useCallback((resolved: string) => {
    setResolvedTheme(resolved);
    document.documentElement.setAttribute('data-theme', resolved);

    if (resolved === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const applyColor = useCallback((color: string) => {
    if (color === 'blue') {
      document.documentElement.removeAttribute('data-color');
    } else {
      document.documentElement.setAttribute('data-color', color);
    }
  }, []);

  const setTheme = useCallback((newTheme: string) => {
    if (!VALID_THEMES.includes(newTheme)) {
      console.warn(`Invalid theme "${newTheme}". Must be one of: ${VALID_THEMES.join(', ')}`);
      return;
    }

    setThemeState(newTheme);

    try {
      localStorage.setItem(STORAGE_KEY, newTheme);
    } catch {
      // localStorage not available
    }

    applyTheme(resolveTheme(newTheme));
  }, [applyTheme]);

  const setColorTheme = useCallback((newColor: string) => {
    if (!VALID_COLORS.includes(newColor)) {
      console.warn(`Invalid color "${newColor}". Must be one of: ${VALID_COLORS.join(', ')}`);
      return;
    }

    setColorThemeState(newColor);

    try {
      localStorage.setItem(COLOR_STORAGE_KEY, newColor);
    } catch {
      // localStorage not available
    }

    applyColor(newColor);
  }, [applyColor]);

  const toggleTheme = useCallback(() => {
    const order = ['auto', 'light', 'dark'];
    const currentIndex = order.indexOf(theme);
    const nextTheme = order[(currentIndex + 1) % order.length];
    setTheme(nextTheme);
  }, [theme, setTheme]);

  useEffect(() => {
    applyTheme(resolveTheme(theme));
    applyColor(colorTheme);
  }, [theme, colorTheme, applyTheme, applyColor]);

  useEffect(() => {
    if (theme !== 'auto') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e: MediaQueryListEvent) => {
      applyTheme(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme, applyTheme]);

  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue && VALID_THEMES.includes(e.newValue)) {
        setThemeState(e.newValue);
        applyTheme(resolveTheme(e.newValue));
      }
      if (e.key === COLOR_STORAGE_KEY && e.newValue && VALID_COLORS.includes(e.newValue)) {
        setColorThemeState(e.newValue);
        applyColor(e.newValue);
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [applyTheme, applyColor]);

  const value = useMemo(() => ({
    theme,
    resolvedTheme,
    colorTheme,
    setTheme,
    setColorTheme,
    toggleTheme,
    isDark: resolvedTheme === 'dark'
  }), [theme, resolvedTheme, colorTheme, setTheme, setColorTheme, toggleTheme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export default ThemeContext;
