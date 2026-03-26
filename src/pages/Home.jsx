import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { useLanguage } from '../contexts/LanguageContext';
import useAOS from '../hooks/useAOS';
import { CURRICULUM_CARDS } from '../config/site';
import BASIC_WORDS from '../data/vocabBasicData';
import DAILY_WORDS from '../data/vocabDailyData';
import BUSINESS_WORDS from '../data/vocabBusinessData';
import TOPIK_WORDS from '../data/vocabTopikData';

const TOTAL_WORDS = BASIC_WORDS.length + DAILY_WORDS.length + BUSINESS_WORDS.length + TOPIK_WORDS.length;

function Home() {
  const { lang, t } = useLanguage();
  useAOS();

  const scrollToCurriculum = (e) => {
    e.preventDefault();
    const section = document.getElementById('curriculum');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <SEOHead
        title={t('Korean Pro - 체계적 한국어 학습', 'Korean Pro - Systematic Korean Learning')}
        description={t(
          '한글, 회화, 문법, TOPIK 대비까지. AI 기반 맞춤형 한국어 학습 플랫폼',
          'From Hangul to conversation, grammar, and TOPIK prep. AI-powered personalized Korean learning platform'
        )}
      />

      {/* Hero Section */}
      <section className="hero" data-aos="fade-up">
        <div className="hero__content">
          <h1 className="hero__title">
            {t('한국어 마스터', 'Master Korean')}
          </h1>
          <p className="hero__subtitle">
            {t(
              '한글 기초부터 TOPIK 대비까지, AI와 함께하는 체계적인 한국어 학습',
              'From Hangul basics to TOPIK prep, systematic Korean learning with AI'
            )}
          </p>
          <div className="hero__actions">
            <Link to="/hangul" className="btn btn--primary btn--lg">
              {t('학습 시작하기', 'Start Learning')}
            </Link>
            <a
              href="#curriculum"
              className="btn btn--outline btn--lg"
              onClick={scrollToCurriculum}
            >
              {t('커리큘럼 보기', 'View Curriculum')}
            </a>
          </div>
          <div className="hero__stats">
            <div className="hero__stat">
              <span className="hero__stat-value">{TOTAL_WORDS.toLocaleString()}+</span>
              <span className="hero__stat-label">{t('단어', 'Words')}</span>
            </div>
            <div className="hero__stat">
              <span className="hero__stat-value">50+</span>
              <span className="hero__stat-label">{t('레슨', 'Lessons')}</span>
            </div>
            <div className="hero__stat">
              <span className="hero__stat-value">9</span>
              <span className="hero__stat-label">{t('개 카테고리', 'Categories')}</span>
            </div>
            <div className="hero__stat">
              <span className="hero__stat-value">AI</span>
              <span className="hero__stat-label">{t('학습', 'Learning')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Section */}
      <section className="curriculum-section" id="curriculum" data-aos="fade-up">
        <div className="curriculum-section__header">
          <h2 className="curriculum-section__title">
            {t('커리큘럼', 'Curriculum')}
          </h2>
          <p className="curriculum-section__subtitle">
            {t(
              '체계적으로 구성된 한국어 학습 과정을 확인하세요',
              'Explore our systematically structured Korean learning courses'
            )}
          </p>
        </div>
        <div className="curriculum-section__grid">
          {CURRICULUM_CARDS.map((card, index) => (
            <Link
              to={card.path}
              key={index}
              className="curriculum-card"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="curriculum-card__icon" style={{ color: card.color }}>
                <i className={card.icon}></i>
              </div>
              <h3 className="curriculum-card__title">
                {lang === 'ko' ? card.title : card.titleEn}
              </h3>
              <p className="curriculum-card__description">{card.desc}</p>
              <span className="curriculum-card__cta">
                {t('학습하기 →', 'Learn →')}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section" data-aos="fade-up">
        <div className="features-section__header">
          <h2 className="features-section__title">
            {t('Why Korean Pro?', 'Why Korean Pro?')}
          </h2>
          <p className="features-section__subtitle">
            {t(
              '한국어 학습을 더 효과적으로 만드는 핵심 기능들',
              'Core features that make Korean learning more effective'
            )}
          </p>
        </div>
        <div className="features-section__grid">
          <div className="feature-card" data-aos="fade-up" data-aos-delay="0">
            <div className="feature-card__icon">
              <i className="fa-solid fa-robot"></i>
            </div>
            <h3 className="feature-card__title">
              {t('AI 챗봇', 'AI Chatbot')}
            </h3>
            <p className="feature-card__description">
              {t('OpenAI 기반 AI 챗봇과 실시간 한국어 대화 연습.', 'Practice real-time Korean conversation with an OpenAI-powered AI chatbot.')}
              <br />
              {t('상황별 맞춤 피드백을 받으세요.', 'Get contextual feedback.')}
            </p>
          </div>
          <div className="feature-card" data-aos="fade-up" data-aos-delay="100">
            <div className="feature-card__icon">
              <i className="fa-solid fa-microphone-lines"></i>
            </div>
            <h3 className="feature-card__title">
              {t('음성 인식', 'Speech Recognition')}
            </h3>
            <p className="feature-card__description">
              {t('Web Speech API를 활용한 한국어 발음 연습.', 'Practice Korean pronunciation with Web Speech API.')}
              <br />
              {t('실시간으로 발음을 분석하고 교정받으세요.', 'Get real-time pronunciation analysis and correction.')}
            </p>
          </div>
          <div className="feature-card" data-aos="fade-up" data-aos-delay="200">
            <div className="feature-card__icon">
              <i className="fa-solid fa-book-open"></i>
            </div>
            <h3 className="feature-card__title">
              {t('체계적 커리큘럼', 'Structured Curriculum')}
            </h3>
            <p className="feature-card__description">
              {t(
                '한글 기초, 회화, 문법, TOPIK까지 단계별로 구성된 학습 커리큘럼으로 효율적으로 학습하세요.',
                'Learn efficiently with a step-by-step curriculum covering Hangul, conversation, grammar, and TOPIK.'
              )}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
