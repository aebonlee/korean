import { Link } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';
import { useLanguage } from '../../contexts/LanguageContext';
import useAOS from '../../hooks/useAOS';

const categories = [
  { title: '기초 필수 500', titleEn: 'Basic 500', desc: '한국어 학습의 기본이 되는 필수 단어 500개.', descEn: '500 essential words for Korean basics.', path: '/vocabulary/basic', icon: 'fa-solid fa-seedling', color: '#4A90D9' },
  { title: '일상 필수 500', titleEn: 'Daily 500', desc: '일상생활에서 매일 사용하는 실용적인 단어 500개.', descEn: '500 practical words for daily life.', path: '/vocabulary/daily', icon: 'fa-solid fa-house', color: '#27AE60' },
  { title: '비즈니스 500', titleEn: 'Business 500', desc: '직장 생활과 비즈니스 환경의 전문 어휘 500개.', descEn: '500 professional words for the workplace.', path: '/vocabulary/business', icon: 'fa-solid fa-briefcase', color: '#E67E22' },
  { title: 'TOPIK 800', titleEn: 'TOPIK 800', desc: 'TOPIK 시험에 자주 출제되는 핵심 어휘 800개.', descEn: '800 key words frequently tested on TOPIK.', path: '/vocabulary/topik', icon: 'fa-solid fa-graduation-cap', color: '#8E44AD' },
];

export default function VocabHome() {
  const { t } = useLanguage();
  useAOS();

  return (
    <>
      <SEOHead title={t('필수 한국어 어휘 - Korean Pro', 'Essential Korean Vocabulary - Korean Pro')} description={t('기초, 일상, 비즈니스, TOPIK 필수 한국어 어휘 2,300+개를 학습하세요.', 'Study 2,300+ essential Korean vocabulary across basic, daily, business, and TOPIK categories.')} />

      <section className="page-header" data-aos="fade-up">
        <div className="container">
          <div className="page-header__breadcrumb">
            <Link to="/">{t('홈', 'Home')}</Link><i className="fas fa-chevron-right"></i>
            <span>{t('어휘', 'Vocabulary')}</span>
          </div>
          <h1 className="page-header__title">{t('필수 한국어 어휘', 'Essential Korean Vocabulary')}</h1>
          <p className="page-header__description">{t('총 2,300+개의 필수 한국어 어휘를 카테고리별로 학습하세요.', 'Study 2,300+ essential Korean words organized by category.')}</p>
        </div>
      </section>

      <section className="lesson-section" data-aos="fade-up">
        <div className="container">
          <div className="topic-grid">
            {categories.map((cat, index) => (
              <Link to={cat.path} key={cat.path} className="topic-card card" data-aos="fade-up" data-aos-delay={index * 100}>
                <div className="topic-card__icon" style={{ color: cat.color }}><i className={cat.icon}></i></div>
                <h3 className="topic-card__title">{t(cat.title, cat.titleEn)}</h3>
                <p className="topic-card__desc">{t(cat.desc, cat.descEn)}</p>
                <span className="topic-card__cta">{t('학습 시작 →', 'Start Learning →')}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="lesson-section" data-aos="fade-up">
        <div className="container">
          <div className="tip-box">
            <h4>{t('💡 어휘 학습 팁', '💡 Vocabulary Study Tips')}</h4>
            <ul>
              <li>{t('하루에 10-20개씩 꾸준히 외우세요.', 'Memorize 10-20 words consistently every day.')}</li>
              <li>{t('단어만 외우지 말고 예문과 함께 학습하세요.', 'Study words with example sentences, not just isolated words.')}</li>
              <li>{t('카드를 클릭하면 뜻을 확인할 수 있습니다.', 'Click cards to reveal meanings.')}</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
