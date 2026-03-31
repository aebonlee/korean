import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

export const categoryTitles = {
  hangul: { ko: '한글 기초', en: 'Hangul' },
  conversation: { ko: '일상 회화', en: 'Conversation' },
  grammar: { ko: '문법', en: 'Grammar' },
  vocabulary: { ko: '어휘', en: 'Vocabulary' },
  writing: { ko: '작문', en: 'Writing' },
  topik: { ko: 'TOPIK', en: 'TOPIK' },
  culture: { ko: '한국 문화', en: 'Culture' },
};

export const navData = {
  hangul: [
    { path: '/hangul/consonants', ko: '자음', en: 'Consonants' },
    { path: '/hangul/vowels', ko: '모음', en: 'Vowels' },
    { path: '/hangul/syllables', ko: '음절 구조', en: 'Syllables' },
    { path: '/hangul/pronunciation', ko: '발음 규칙', en: 'Pronunciation' },
  ],
  conversation: [
    { path: '/conversation/greetings', ko: '인사 & 소개', en: 'Greetings' },
    { path: '/conversation/daily-life', ko: '일상생활', en: 'Daily Life' },
    { path: '/conversation/shopping', ko: '쇼핑', en: 'Shopping' },
    { path: '/conversation/travel', ko: '여행', en: 'Travel' },
    { path: '/conversation/restaurant', ko: '음식점', en: 'Restaurant' },
    { path: '/conversation/phone', ko: '전화', en: 'Phone' },
  ],
  grammar: [
    { path: '/grammar/particles', ko: '조사', en: 'Particles' },
    { path: '/grammar/verb-conjugation', ko: '동사 활용', en: 'Verb Conjugation' },
    { path: '/grammar/honorifics', ko: '존댓말', en: 'Honorifics' },
    { path: '/grammar/sentence-patterns', ko: '문장 패턴', en: 'Sentence Patterns' },
  ],
  vocabulary: [
    { path: '/vocabulary/basic', ko: '기초 필수', en: 'Basic' },
    { path: '/vocabulary/daily', ko: '일상', en: 'Daily' },
    { path: '/vocabulary/business', ko: '비즈니스', en: 'Business' },
    { path: '/vocabulary/topik', ko: 'TOPIK', en: 'TOPIK' },
  ],
  writing: [
    { path: '/writing/basic', ko: '기초 문장', en: 'Basic Sentence' },
    { path: '/writing/paragraph', ko: '문단 작성', en: 'Paragraph' },
    { path: '/writing/essay', ko: '에세이', en: 'Essay' },
  ],
  topik: [
    { path: '/topik/listening', ko: '듣기', en: 'Listening' },
    { path: '/topik/reading', ko: '읽기', en: 'Reading' },
    { path: '/topik/mock-test', ko: '모의 테스트', en: 'Mock Test' },
  ],
  culture: [
    { path: '/culture/kdrama', ko: 'K-드라마', en: 'K-Drama' },
    { path: '/culture/kpop', ko: 'K-팝', en: 'K-Pop' },
  ],
};

export default function SubNav({ category }: { category: string }) {
  const { t } = useLanguage();
  const { pathname } = useLocation();
  const items = navData[category as keyof typeof navData];
  const scrollRef = useRef<HTMLDivElement>(null);
  const [fadeLeft, setFadeLeft] = useState(false);
  const [fadeRight, setFadeRight] = useState(false);

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

  if (!items) return null;

  const cls = ['sub-nav'];
  if (fadeLeft) cls.push('sub-nav--fade-left');
  if (fadeRight) cls.push('sub-nav--fade-right');

  return (
    <nav className={cls.join(' ')}>
      <div className="container" ref={scrollRef}>
        <div className="sub-nav__list">
          {items.map((item: { path: string; ko: string; en: string }) => (
            <Link
              key={item.path}
              to={item.path}
              className={`sub-nav__item${pathname === item.path ? ' sub-nav__item--active' : ''}`}
            >
              {t(item.ko, item.en)}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
