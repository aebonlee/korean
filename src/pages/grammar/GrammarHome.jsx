import { Link } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';
import { useLanguage } from '../../contexts/LanguageContext';
import useAOS from '../../hooks/useAOS';

const LEVEL_LABELS = { beginner: { ko: '초급', en: 'Beginner' }, intermediate: { ko: '중급', en: 'Intermediate' }, advanced: { ko: '고급', en: 'Advanced' } };

const TOPIC_CARDS = [
  { id: 'particles', titleKo: '조사 (Particles)', titleEn: 'Particles', descKo: '은/는, 이/가, 을/를 등 한국어 핵심 조사를 배웁니다.', descEn: 'Learn essential Korean particles: 은/는, 이/가, 을/를, and more.', icon: 'fa-solid fa-link', link: '/grammar/particles', color: '#4A8FE7', level: 'intermediate' },
  { id: 'verb', titleKo: '동사 활용 (Verb Conjugation)', titleEn: 'Verb Conjugation', descKo: '현재, 과거, 미래 시제와 다양한 동사 활용법을 배웁니다.', descEn: 'Learn present, past, future tenses and various verb conjugation patterns.', icon: 'fa-solid fa-rotate', link: '/grammar/verb-conjugation', color: '#22C55E', level: 'intermediate' },
  { id: 'honorifics', titleKo: '존댓말 (Honorifics)', titleEn: 'Honorifics', descKo: '한국어의 존대법 체계와 격식체/비격식체를 배웁니다.', descEn: 'Learn the Korean honorific system, formal and informal speech levels.', icon: 'fa-solid fa-crown', link: '/grammar/honorifics', color: '#F59E0B', level: 'advanced' },
  { id: 'patterns', titleKo: '문장 패턴 (Sentence Patterns)', titleEn: 'Sentence Patterns', descKo: '~고 싶다, ~(으)ㄹ 수 있다 등 핵심 문장 패턴을 배웁니다.', descEn: 'Learn key sentence patterns like ~고 싶다, ~(으)ㄹ 수 있다, and more.', icon: 'fa-solid fa-diagram-project', link: '/grammar/sentence-patterns', color: '#A855F7', level: 'intermediate' },
];

export default function GrammarHome() {
  const { t } = useLanguage();
  useAOS();

  return (
    <>
      <SEOHead title={t('한국어 문법 - Korean Pro', 'Korean Grammar - Korean Pro')} description={t('조사, 동사 활용, 존댓말, 문장 패턴 등 한국어 핵심 문법을 배우세요.', 'Learn Korean grammar: particles, verb conjugation, honorifics, and sentence patterns.')} />

      <div className="content-page">
        <section className="page-header" data-aos="fade-up">
          <div className="container">
            <div className="page-header__breadcrumb">
              <Link to="/">{t('홈', 'Home')}</Link><i className="fas fa-chevron-right"></i>
              <span>{t('문법', 'Grammar')}</span>
            </div>
            <h1 className="page-header__title">{t('한국어 문법', 'Korean Grammar')}</h1>
            <p className="page-header__description">{t('한국어의 핵심 문법을 체계적으로 학습하세요.', 'Study Korean grammar systematically.')}<br />{t('조사, 동사 활용, 존댓말, 문장 패턴을 단계별로 배울 수 있습니다.', 'Learn particles, verb conjugation, honorifics, and sentence patterns step by step.')}</p>
          </div>
        </section>

        <section className="content-section" data-aos="fade-up">
          <h2 className="content-section__title">{t('학습 과정', 'Learning Path')}</h2>
          <div className="card-grid card-grid--2">
            {TOPIC_CARDS.map((card, index) => (
              <Link to={card.link} key={card.id} className={`topic-card topic-card--${card.level}`} data-aos="fade-up" data-aos-delay={index * 100}>
                <div className="topic-card__icon" style={{ backgroundColor: `${card.color}20`, color: card.color }}><i className={card.icon}></i></div>
                <h3 className="topic-card__title">{t(card.titleKo, card.titleEn)}</h3>
                <p className="topic-card__desc">{t(card.descKo, card.descEn)}</p>
                <div className="topic-card__meta">
                  <span className="topic-card__level"><i className="fas fa-signal"></i> {t(LEVEL_LABELS[card.level].ko, LEVEL_LABELS[card.level].en)}</span>
                </div>
                <span className="topic-card__cta">{t('학습하기 →', 'Start →')}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="content-section" data-aos="fade-up">
          <div className="tip-box">
            <h4>{t(<><i className="fas fa-lightbulb"></i> 문법 학습 팁</>, <><i className="fas fa-lightbulb"></i> Grammar Study Tips</>)}</h4>
            <p>{t('문법 규칙만 외우지 말고, 반드시 예문과 함께 학습하세요.', 'Do not just memorize grammar rules. Always study with example sentences.')}<br />{t('직접 문장을 만들어 보는 연습이 가장 효과적입니다.', 'Making your own sentences is the most effective practice.')}</p>
          </div>
        </section>
      </div>
    </>
  );
}
