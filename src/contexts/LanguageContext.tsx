import React from "react";
import { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react';

interface LanguageContextType {
  language: string;
  lang: string;
  setLanguage: (l: string) => void;
  toggleLanguage: () => void;
  t: (ko: React.ReactNode, en?: React.ReactNode) => React.ReactNode;
  isKo: boolean;
  isEn: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'korean-pro-lang';
const VALID_LANGUAGES = ['ko', 'en'];

function getStoredLanguage() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && VALID_LANGUAGES.includes(stored)) {
      return stored;
    }
  } catch {
    // localStorage not available
  }
  return 'ko';
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState(getStoredLanguage);

  const setLanguage = useCallback((lang: string) => {
    if (!VALID_LANGUAGES.includes(lang)) {
      console.warn(`Invalid language "${lang}". Must be one of: ${VALID_LANGUAGES.join(', ')}`);
      return;
    }

    setLanguageState(lang);

    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // localStorage not available
    }

    document.documentElement.setAttribute('lang', lang);
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguage(language === 'ko' ? 'en' : 'ko');
  }, [language, setLanguage]);

  const t = useCallback((ko: React.ReactNode, en?: React.ReactNode) => {
    return language === 'ko' ? ko : en;
  }, [language]);

  useEffect(() => {
    document.documentElement.setAttribute('lang', language);
  }, [language]);

  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue && VALID_LANGUAGES.includes(e.newValue)) {
        setLanguageState(e.newValue);
        document.documentElement.setAttribute('lang', e.newValue);
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const value = useMemo(() => ({
    language,
    lang: language,
    setLanguage,
    toggleLanguage,
    t,
    isKo: language === 'ko',
    isEn: language === 'en'
  }), [language, setLanguage, toggleLanguage, t]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export default LanguageContext;
