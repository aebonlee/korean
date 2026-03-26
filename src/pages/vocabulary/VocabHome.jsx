import { Link } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';
import { useLanguage } from '../../contexts/LanguageContext';
import useAOS from '../../hooks/useAOS';
import BASIC_WORDS from '../../data/vocabBasicData';
import DAILY_WORDS from '../../data/vocabDailyData';
import BUSINESS_WORDS from '../../data/vocabBusinessData';
import TOPIK_WORDS from '../../data/vocabTopikData';

const LEVEL_LABELS = { beginner: { ko: '초급', en: 'Beginner' }, intermediate: { ko: '중급', en: 'Intermediate' }, advanced: { ko: '고급', en: 'Advanced' } };

const categories = [
  { data: BASIC_WORDS, titleKo: '기초 필수', titleEn: 'Basic Essential', descKo: '한국어 학습의 기본이 되는 필수 단어.', descEn: 'Essential words for Korean basics.', path: '/vocabulary/basic', icon: 'fa-solid fa-seedling', color: '#4A90D9', level: 'beginner' },
  { data: DAILY_WORDS, titleKo: '일상 필수', titleEn: 'Daily Essential', descKo: '일상생활에서 매일 사용하는 실용적인 단어.', descEn: 'Practical words for daily life.', path: '/vocabulary/daily', icon: 'fa-solid fa-house', color: '#27AE60', level: 'intermediate' },
  { data: BUSINESS_WORDS, titleKo: '비즈니스', titleEn: 'Business', descKo: '직장 생활과 비즈니스 환경의 전문 어휘.', descEn: 'Professional words for the workplace.', path: '/vocabulary/business', icon: 'fa-solid fa-briefcase', color: '#E67E22', level: 'advanced' },
  { data: TOPIK_WORDS, titleKo: 'TOPIK', titleEn: 'TOPIK', descKo: 'TOPIK 시험에 자주 출제되는 핵심 어휘.', descEn: 'Key words frequently tested on TOPIK.', path: '/vocabulary/topik', icon: 'fa-solid fa-graduation-cap', color: '#8E44AD', level: 'advanced' },
];

const TOTAL = categories.reduce((sum, c) => sum + c.data.length, 0);

export default function VocabHome() {
  const { t } = useLanguage();
  useAOS();

  return (
    <>
      <SEOHead title={t('필수 한국어 어휘 - Korean Pro', 'Essential Korean Vocabulary - Korean Pro')} description={t(`기초, 일상, 비즈니스, TOPIK 필수 한국어 어휘 ${TOTAL}개를 학습하세요.`, `Study ${TOTAL} essential Korean vocabulary across basic, daily, business, and TOPIK categories.`)} />

      <section className="page-header" data-aos="fade-up">
        <div className="container">
          <div className="page-header__breadcrumb">
            <Link to="/">{t('홈', 'Home')}</Link><i className="fas fa-chevron-right"></i>
            <span>{t('어휘', 'Vocabulary')}</span>
          </div>
          <h1 className="page-header__title">{t('필수 한국어 어휘', 'Essential Korean Vocabulary')}</h1>
          <p className="page-header__description">{t(`총 ${TOTAL}개의 필수 한국어 어휘를 카테고리별로 학습하세요.`, `Study ${TOTAL} essential Korean words organized by category.`)}</p>
        </div>
      </section>

      <section className="lesson-section" data-aos="fade-up">
        <div className="container">
          <div className="topic-grid">
            {categories.map((cat, index) => (
              <Link to={cat.path} key={cat.path} className={`topic-card card topic-card--${cat.level}`} data-aos="fade-up" data-aos-delay={index * 100}>
                <div className="topic-card__icon" style={{ color: cat.color }}><i className={cat.icon}></i></div>
                <h3 className="topic-card__title">{t(cat.titleKo, cat.titleEn)}</h3>
                <p className="topic-card__desc">{t(cat.descKo, cat.descEn)}</p>
                <div className="topic-card__meta">
                  <span className="topic-card__level"><i className="fas fa-signal"></i> {t(LEVEL_LABELS[cat.level].ko, LEVEL_LABELS[cat.level].en)}</span>
                  <span className="badge">{cat.data.length}{t('개', ' words')}</span>
                </div>
                <span className="topic-card__cta">{t('학습 시작 →', 'Start Learning →')}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="lesson-section" data-aos="fade-up">
        <div className="container">
          <div className="tip-box">
            <h4>{t(<><i className="fas fa-lightbulb"></i> 어휘 학습 팁</>, <><i className="fas fa-lightbulb"></i> Vocabulary Study Tips</>)}</h4>
            <ul>
              <li>{t('하루에 10-20개씩 꾸준히 외우세요.', 'Memorize 10-20 words consistently every day.')}</li>
              <li>{t('단어만 외우지 말고 예문과 함께 학습하세요.', 'Study words with example sentences, not just isolated words.')}</li>
              <li>{t('스피커 버튼을 클릭하면 한국어 발음을 들을 수 있습니다.', 'Click the speaker button to hear Korean pronunciation.')}</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
