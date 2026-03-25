import { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import SectionNav from './SectionNav';
import SubNav from './SubNav';
import { navData, categoryTitles } from './SubNav';

export default function PageLayout({ sections = [], category, children }) {
  const { t } = useLanguage();
  const { pathname } = useLocation();
  const [activeId, setActiveId] = useState(sections[0]?.id || '');
  const [navOpen, setNavOpen] = useState(true);
  const sidebarRef = useRef(null);

  const items = category ? navData[category] : null;
  const catTitle = category ? categoryTitles[category] : null;

  useEffect(() => {
    const ids = sections.map((s) => s.id);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-150px 0px -60% 0px', threshold: 0 }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  useEffect(() => {
    if (!sidebarRef.current) return;
    const activeLink = sidebarRef.current.querySelector('.sidebar-nav__section-link.active');
    if (activeLink) {
      activeLink.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [activeId]);

  const handleClick = useCallback((e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const offset = 100;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }, []);

  const contentRef = useRef(null);

  // Global TTS: Auto-insert speaker button next to Korean text
  useEffect(() => {
    const root = contentRef.current;
    if (!root) return;

    const speak = (text) => {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'ko-KR';
      u.rate = 0.9;
      window.speechSynthesis.speak(u);
    };

    const makeBtn = (text) => {
      const btn = document.createElement('button');
      btn.className = 'tts-play-btn';
      btn.title = '발음 듣기';
      btn.innerHTML = '<i class="fas fa-volume-up"></i>';
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        speak(text);
      });
      return btn;
    };

    // expression-table Korean text cells
    root.querySelectorAll('.expression-table tbody td:first-child strong').forEach((el) => {
      if (el.parentElement.querySelector('.tts-play-btn')) return;
      const text = el.textContent.trim();
      if (text) el.after(makeBtn(text));
    });

    // dialogue p elements
    root.querySelectorAll('.dialogue p').forEach((p) => {
      if (p.querySelector('.tts-play-btn')) return;
      const speaker = p.querySelector('.speaker');
      let text = p.textContent;
      if (speaker) text = text.replace(speaker.textContent, '').trim();
      if (text) p.appendChild(makeBtn(text));
    });

    return () => {
      root.querySelectorAll('.tts-play-btn').forEach((btn) => btn.remove());
    };
  }, []);

  if (!sections || sections.length === 0) return children;

  const hasCategoryNav = items && catTitle;

  return (
    <>
      {/* Mobile: SubNav horizontal bar */}
      {category && (
        <div className="sub-nav-mobile">
          <SubNav category={category} />
        </div>
      )}

      {/* Mobile: SectionNav chips */}
      <div className="section-nav-mobile">
        <SectionNav sections={sections} />
      </div>

      <div className="page-layout">
        <div className="container">
          <div className="content-layout">
            <aside className="content-sidebar" ref={sidebarRef}>
              {hasCategoryNav ? (
                <nav className="sidebar-nav">
                  <button
                    className="sidebar-nav__toggle"
                    onClick={() => setNavOpen((v) => !v)}
                  >
                    {t(catTitle.ko, catTitle.en)}
                    <i className={`fas fa-chevron-${navOpen ? 'up' : 'down'}`} />
                  </button>
                  {navOpen && (
                    <ul className="sidebar-nav__list">
                      {items.map((item) => {
                        const isActive = pathname === item.path;
                        return (
                          <li key={item.path}>
                            {isActive ? (
                              <>
                                <span className="sidebar-nav__link sidebar-nav__link--active">
                                  {t(item.ko, item.en)}
                                </span>
                                <ul className="sidebar-nav__sections">
                                  {sections.map((s) => (
                                    <li key={s.id}>
                                      <a
                                        className={`sidebar-nav__section-link${activeId === s.id ? ' active' : ''}`}
                                        href={`#${s.id}`}
                                        onClick={(e) => handleClick(e, s.id)}
                                      >
                                        {t(s.ko, s.en)}
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              </>
                            ) : (
                              <Link
                                className="sidebar-nav__link"
                                to={item.path}
                              >
                                {t(item.ko, item.en)}
                              </Link>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </nav>
              ) : (
                <nav className="sidebar-nav">
                  <h3 className="sidebar-nav__toc-title">{t('목차', 'Contents')}</h3>
                  <ul className="sidebar-nav__sections">
                    {sections.map((s) => (
                      <li key={s.id}>
                        <a
                          className={`sidebar-nav__section-link${activeId === s.id ? ' active' : ''}`}
                          href={`#${s.id}`}
                          onClick={(e) => handleClick(e, s.id)}
                        >
                          {t(s.ko, s.en)}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
            </aside>

            <main className="content-main" ref={contentRef}>
              {children}
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
