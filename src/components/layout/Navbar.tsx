import React from "react";
import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { NAV_MENU } from '../../config/site';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import UserMenu from '../auth/UserMenu';

const COLOR_OPTIONS = [
  { name: 'blue', color: '#1A365D' },
  { name: 'red', color: '#B91C1C' },
  { name: 'green', color: '#047857' },
  { name: 'purple', color: '#6D28D9' },
  { name: 'orange', color: '#B45309' },
];

export default function Navbar() {
  const { theme, toggleTheme, resolvedTheme, colorTheme, setColorTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();
  const { isAuthenticated } = useAuth();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string|null>(null);
  const [colorPickerOpen, setColorPickerOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const colorPickerRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (mobileMenuRef.current && mobileMenuRef.current.contains(e.target as Node)) return;
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
      if (colorPickerRef.current && !colorPickerRef.current.contains(e.target as Node)) {
        setColorPickerOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, []);

  const handleDropdownToggle = useCallback((path: string) => {
    setOpenDropdown((prev: string | null) => (prev === path ? null : path));
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent, path: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleDropdownToggle(path);
    } else if (e.key === 'Escape') {
      setOpenDropdown(null);
    }
  }, [handleDropdownToggle]);

  const getLabel = useCallback((item: { label: string; labelEn?: string }) => {
    return t(item.label, item.labelEn || item.label);
  }, [t]);

  const getThemeIcon = () => {
    if (theme === 'auto') {
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2" /><path d="M12 20v2" />
          <path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" />
          <path d="M2 12h2" /><path d="M20 12h2" />
          <path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" />
        </svg>
      );
    }
    if (resolvedTheme === 'dark') {
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      );
    }
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    );
  };

  const getThemeLabel = () => {
    if (theme === 'auto') return 'Auto theme';
    if (resolvedTheme === 'dark') return 'Switch to auto';
    return 'Switch to dark mode';
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`navbar${scrolled ? ' scrolled' : ''}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="navbar-inner">
          <Link to="/" className="navbar-brand" onClick={closeMobile}>
            <span className="navbar-logo" aria-hidden="true">K</span>
            <span className="navbar-brand-text">Korean Pro</span>
          </Link>

          <div className="navbar-desktop" ref={dropdownRef}>
            <ul className="navbar-menu">
              {NAV_MENU.map((item) => (
                <li
                  key={item.path}
                  className={`navbar-menu-item${item.children ? ' has-dropdown' : ''}`}
                >
                  {item.children ? (
                    <>
                      <button
                        className={`navbar-menu-link dropdown-toggle${openDropdown === item.path ? ' active' : ''}`}
                        onClick={() => handleDropdownToggle(item.path)}
                        onKeyDown={(e) => handleKeyDown(e, item.path)}
                        aria-expanded={openDropdown === item.path}
                        aria-haspopup="true"
                      >
                        {item.icon && <span className="nav-icon">{item.icon}</span>}
                        {getLabel(item)}
                        <svg
                          className={`dropdown-arrow${openDropdown === item.path ? ' rotated' : ''}`}
                          width="10"
                          height="6"
                          viewBox="0 0 10 6"
                          fill="none"
                          aria-hidden="true"
                        >
                          <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                      {openDropdown === item.path && (
                        <ul className="navbar-dropdown" role="menu">
                          {item.children.map((child) => (
                            <li key={child.path} role="none">
                              <NavLink
                                to={child.path}
                                className={({ isActive }) =>
                                  `navbar-dropdown-link${isActive ? ' active' : ''}`
                                }
                                onClick={() => setOpenDropdown(null)}
                                role="menuitem"
                              >
                                {child.icon && <span className="nav-icon">{child.icon}</span>}
                                <span className="dropdown-link-title">{getLabel(child)}</span>
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `navbar-menu-link${isActive ? ' active' : ''}`
                      }
                    >
                      {item.icon && <span className="nav-icon">{item.icon}</span>}
                      {getLabel(item)}
                    </NavLink>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="navbar-actions">
            <button
              className="navbar-icon-btn"
              onClick={toggleTheme}
              aria-label={getThemeLabel()}
              title={getThemeLabel()}
            >
              {getThemeIcon()}
            </button>

            <div className="color-picker-wrapper" ref={colorPickerRef}>
              <button
                className="navbar-icon-btn"
                onClick={() => setColorPickerOpen(!colorPickerOpen)}
                aria-label="Change color theme"
                title="Color theme"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="13.5" cy="6.5" r="2.5" />
                  <circle cx="17.5" cy="10.5" r="2.5" />
                  <circle cx="8.5" cy="7.5" r="2.5" />
                  <circle cx="6.5" cy="12.5" r="2.5" />
                  <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
                </svg>
              </button>
              {colorPickerOpen && (
                <div className="color-picker-tooltip">
                  <div className="color-picker-arrow" />
                  {COLOR_OPTIONS.map((opt) => (
                    <button
                      key={opt.name}
                      className={`color-dot${colorTheme === opt.name ? ' active' : ''}`}
                      style={{ background: opt.color }}
                      onClick={() => {
                        setColorTheme(opt.name);
                        setColorPickerOpen(false);
                      }}
                      aria-label={`${opt.name} theme`}
                      title={opt.name}
                    />
                  ))}
                </div>
              )}
            </div>

            <button
              className="navbar-lang-btn"
              onClick={toggleLanguage}
              aria-label={`Switch to ${language === 'ko' ? 'English' : 'Korean'}`}
              title={language === 'ko' ? 'English' : '한국어'}
            >
              {language === 'ko' ? 'EN' : 'KO'}
            </button>

            {isAuthenticated ? (
              <UserMenu />
            ) : (
              <Link to="/login" className="navbar-login-btn">
                {t('로그인', 'Login')}
              </Link>
            )}

            <button
              className={`navbar-hamburger${mobileOpen ? ' open' : ''}`}
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              <span className="hamburger-line" />
              <span className="hamburger-line" />
              <span className="hamburger-line" />
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`mobile-overlay${mobileOpen ? ' visible' : ''}`}
        onClick={closeMobile}
        aria-hidden="true"
      />
      <aside
        ref={mobileMenuRef}
        className={`mobile-menu${mobileOpen ? ' open' : ''}`}
        aria-label="Mobile navigation"
        role="dialog"
        aria-modal={mobileOpen}
      >
        <div className="mobile-menu-header">
          <Link to="/" className="navbar-brand" onClick={closeMobile}>
            <span className="navbar-logo" aria-hidden="true">K</span>
            <span className="navbar-brand-text">Korean Pro</span>
          </Link>
          <button
            className="mobile-close-btn"
            onClick={closeMobile}
            aria-label="Close menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <nav className="mobile-menu-nav">
          <ul className="mobile-menu-list">
            {NAV_MENU.map((item) => (
              <li key={item.path} className="mobile-menu-item">
                {item.children ? (
                  <>
                    <button
                      className={`mobile-menu-link dropdown-toggle${openDropdown === item.path ? ' active' : ''}`}
                      onClick={() => handleDropdownToggle(item.path)}
                      aria-expanded={openDropdown === item.path}
                    >
                      {item.icon && <span className="nav-icon">{item.icon}</span>}
                      {getLabel(item)}
                      <svg
                        className={`dropdown-arrow${openDropdown === item.path ? ' rotated' : ''}`}
                        width="10"
                        height="6"
                        viewBox="0 0 10 6"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    {openDropdown === item.path && (
                      <ul className="mobile-dropdown show">
                        {item.children.map((child) => (
                          <li key={child.path}>
                            <NavLink
                              to={child.path}
                              className={({ isActive }) =>
                                `mobile-dropdown-link${isActive ? ' active' : ''}`
                              }
                              onClick={closeMobile}
                            >
                              {child.icon && <span className="nav-icon">{child.icon}</span>}
                              {getLabel(child)}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `mobile-menu-link${isActive ? ' active' : ''}`
                    }
                    onClick={closeMobile}
                  >
                    {item.icon && <span className="nav-icon">{item.icon}</span>}
                    {getLabel(item)}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="mobile-menu-footer">
          <div className="mobile-menu-actions">
            <button className="navbar-icon-btn" onClick={toggleTheme} aria-label="Toggle theme">
              {getThemeIcon()}
            </button>
            <button className="navbar-lang-btn" onClick={toggleLanguage} aria-label="Toggle language">
              {language === 'ko' ? 'EN' : 'KO'}
            </button>
            <div style={{ display: 'flex', gap: '6px', marginLeft: '8px' }}>
              {COLOR_OPTIONS.map((opt) => (
                <button
                  key={opt.name}
                  className={`color-dot${colorTheme === opt.name ? ' active' : ''}`}
                  style={{ background: opt.color, width: '20px', height: '20px', borderRadius: '50%', border: colorTheme === opt.name ? '2px solid var(--text-primary)' : '2px solid transparent', padding: 0, cursor: 'pointer' }}
                  onClick={() => setColorTheme(opt.name)}
                  aria-label={`${opt.name} theme`}
                />
              ))}
            </div>
          </div>
          {!isAuthenticated && (
            <Link to="/login" className="mobile-login-btn" onClick={closeMobile}>
              {t('로그인', 'Login')}
            </Link>
          )}
        </div>
      </aside>
    </>
  );
}
