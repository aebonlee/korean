import { Link } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';
import { useLanguage } from '../../contexts/LanguageContext';
import useAOS from '../../hooks/useAOS';

const TOPIC_CARDS = [
  {
    icon: 'fa-solid fa-font',
    titleKo: '자음 (Consonants)',
    titleEn: 'Consonants',
    descKo: '14개 기본 자음과 5개 쌍자음의 발음과 쓰기를 배웁니다.',
    descEn: 'Learn pronunciation and writing of 14 basic consonants and 5 double consonants.',
    lessons: 2,
    path: '/hangul/consonants',
    level: 'beginner',
  },
  {
    icon: 'fa-solid fa-circle-dot',
    titleKo: '모음 (Vowels)',
    titleEn: 'Vowels',
    descKo: '10개 기본 모음과 11개 복합 모음의 소리와 형태를 익힙니다.',
    descEn: 'Master the sounds and shapes of 10 basic vowels and 11 compound vowels.',
    lessons: 2,
    path: '/hangul/vowels',
    level: 'beginner',
  },
  {
    icon: 'fa-solid fa-puzzle-piece',
    titleKo: '음절 구조 (Syllables)',
    titleEn: 'Syllable Structure',
    descKo: 'CV, CVC 패턴과 받침 규칙으로 한글 음절 조합을 이해합니다.',
    descEn: 'Understand Hangul syllable composition with CV, CVC patterns and final consonant rules.',
    lessons: 3,
    path: '/hangul/syllables',
    level: 'beginner',
  },
  {
    icon: 'fa-solid fa-volume-high',
    titleKo: '발음 규칙 (Pronunciation Rules)',
    titleEn: 'Pronunciation Rules',
    descKo: '연음, 경음화, 비음화, 구개음화 등 핵심 발음 규칙을 학습합니다.',
    descEn: 'Learn key pronunciation rules: liaison, fortition, nasalization, palatalization, and more.',
    lessons: 4,
    path: '/hangul/pronunciation',
    level: 'beginner',
  },
];

export default function HangulHome() {
  const { language, t } = useLanguage();
  useAOS();

  return (
    <>
      <SEOHead
        title={t('한글 기초 - Korean Pro', 'Hangul Basics - Korean Pro')}
        description={t(
          '한글의 자음, 모음, 음절 구조, 발음 규칙을 체계적으로 배워보세요.',
          'Learn Hangul consonants, vowels, syllable structure, and pronunciation rules systematically.'
        )}
      />

      {/* Page Header */}
      <section className="page-header" data-aos="fade-up">
        <div className="container">
          <div className="page-header__breadcrumb">
            <Link to="/">{t('홈', 'Home')}</Link>
            <i className="fas fa-chevron-right"></i>
            <span>{t('한글 기초', 'Hangul')}</span>
          </div>
          <h1 className="page-header__title">{t('한글 기초', 'Hangul Basics')}</h1>
          <p className="page-header__description">
            {t(
              '한글은 세종대왕이 1443년에 창제한 과학적인 문자입니다.',
              'Hangul is a scientific writing system created by King Sejong in 1443.'
            )}
            <br />
            {t(
              '자음과 모음의 조합으로 모든 소리를 표현할 수 있으며, 세계에서 가장 체계적인 문자로 인정받고 있습니다.',
              'It can represent all sounds through combinations of consonants and vowels, and is recognized as one of the most systematic writing systems in the world.'
            )}
          </p>
        </div>
      </section>

      {/* Topic Grid */}
      <section className="lesson-section" data-aos="fade-up">
        <div className="container">
          <div className="topic-grid">
            {TOPIC_CARDS.map((card, index) => (
              <Link
                to={card.path}
                key={card.path}
                className={`topic-card card topic-card--${card.level}`}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="topic-card__icon">
                  <i className={card.icon}></i>
                </div>
                <h3 className="topic-card__title">
                  {language === 'ko' ? card.titleKo : card.titleEn}
                </h3>
                <p className="topic-card__desc">
                  {language === 'ko' ? card.descKo : card.descEn}
                </p>
                <div className="topic-card__meta">
                  <span className="topic-card__level">
                    <i className="fas fa-signal"></i> {t('초급', 'Beginner')}
                  </span>
                  <span className="badge">
                    {card.lessons} {t('레슨', 'Lessons')}
                  </span>
                </div>
                <span className="topic-card__cta">
                  {t('학습하기 →', 'Start Learning →')}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Tips */}
      <section className="lesson-section" data-aos="fade-up">
        <div className="container">
          <div className="tip-box">
            <h4>{t(<><i className="fas fa-lightbulb"></i> 한글 학습 팁</>, <><i className="fas fa-lightbulb"></i> Hangul Study Tips</>)}</h4>
            <ul>
              <li>
                {t(
                  '자음과 모음을 먼저 외운 후 음절 조합 연습을 하세요.',
                  'Memorize consonants and vowels first, then practice syllable combinations.'
                )}
                <br />
                {t(
                  '소리를 내면서 쓰기 연습을 하면 더 빨리 익힐 수 있습니다.',
                  'Writing while speaking aloud helps you learn faster.'
                )}
              </li>
              <li>
                {t(
                  '한글 자음은 입, 혀, 목의 모양을 본떠 만들어졌습니다.',
                  'Hangul consonants are modeled after the shapes of mouth, tongue, and throat.'
                )}
                <br />
                {t(
                  '발음 원리를 이해하면 기억하기 쉽습니다.',
                  'Understanding the pronunciation principles makes memorization easier.'
                )}
              </li>
              <li>
                {t(
                  '매일 10-15분씩 꾸준히 연습하는 것이 가장 효과적입니다.',
                  'Practicing 10-15 minutes daily is the most effective approach.'
                )}
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
