import { useState, useEffect, useCallback, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export default function SectionNav({ sections }) {
  const { t } = useLanguage();
  const [activeId, setActiveId] = useState(sections[0]?.id || '');
  const scrollRef = useRef(null);
  const [fadeLeft, setFadeLeft] = useState(false);
  const [fadeRight, setFadeRight] = useState(false);

  const handleClick = useCallback((e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const offset = 140;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }, []);

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

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setFadeLeft(el.scrollLeft > 4);
    setFadeRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [checkScroll]);

  if (!sections || sections.length === 0) return null;

  const cls = ['section-nav'];
  if (fadeLeft) cls.push('section-nav--fade-left');
  if (fadeRight) cls.push('section-nav--fade-right');

  return (
    <nav className={cls.join(' ')}>
      <div className="container" ref={scrollRef}>
        <div className="section-nav__list">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={`section-nav__item${activeId === s.id ? ' section-nav__item--active' : ''}`}
              onClick={(e) => handleClick(e, s.id)}
            >
              {t(s.ko, s.en)}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
