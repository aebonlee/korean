import { Link } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';
import { useLanguage } from '../../contexts/LanguageContext';
import { TOPIK_LEVELS } from '../../data/topikData';
import useAOS from '../../hooks/useAOS';

const SECTION_CARDS = [
  {
    icon: 'fa-solid fa-headphones',
    titleKo: '듣기 연습 (Listening)',
    titleEn: 'Listening Practice',
    descKo: 'TOPIK 듣기 영역 연습 문제입니다. 대화를 듣고 질문에 답하는 유형을 연습합니다.',
    descEn: 'TOPIK listening section practice. Practice answering questions based on dialogues and conversations.',
    path: '/topik/listening',
    level: 'advanced',
  },
  {
    icon: 'fa-solid fa-book-open',
    titleKo: '읽기 연습 (Reading)',
    titleEn: 'Reading Practice',
    descKo: 'TOPIK 읽기 영역 연습 문제입니다. 지문을 읽고 내용을 파악하는 유형을 연습합니다.',
    descEn: 'TOPIK reading section practice. Practice comprehending passages and answering related questions.',
    path: '/topik/reading',
    level: 'advanced',
  },
  {
    icon: 'fa-solid fa-clock',
    titleKo: '모의 시험 (Mock Test)',
    titleEn: 'Mock Test',
    descKo: '실전처럼 시간을 재며 듣기와 읽기 문제를 풀어보는 모의 시험입니다.',
    descEn: 'A timed mock test combining listening and reading questions, simulating the real exam.',
    path: '/topik/mock-test',
    level: 'advanced',
  },
];

export default function TopikHome() {
  const { language, t } = useLanguage();
  useAOS();

  return (
    <>
      <SEOHead
        title={t('TOPIK 시험 준비 - Korean Pro', 'TOPIK Exam Prep - Korean Pro')}
        description={t(
          'TOPIK 시험을 준비하세요. 듣기, 읽기 연습과 모의 시험으로 실력을 확인합니다.',
          'Prepare for the TOPIK exam. Check your skills with listening, reading practice, and mock tests.'
        )}
      />

      {/* Page Header */}
      <section className="page-header" data-aos="fade-up">
        <div className="container">
          <div className="page-header__breadcrumb">
            <Link to="/">{t('홈', 'Home')}</Link>
            <i className="fas fa-chevron-right"></i>
            <span>{t('TOPIK', 'TOPIK')}</span>
          </div>
          <h1 className="page-header__title">{t('TOPIK 시험 준비', 'TOPIK Exam Preparation')}</h1>
          <p className="page-header__description">
            {t(
              'TOPIK(한국어능력시험)은 한국어를 모국어로 하지 않는 외국인 및 재외 동포를 대상으로 한국어 능력을 평가하는 시험입니다. 듣기, 읽기 연습과 모의 시험으로 실력을 향상시키세요.',
              'TOPIK (Test of Proficiency in Korean) evaluates Korean language ability for non-native speakers. Improve your skills with listening, reading practice, and mock tests.'
            )}
          </p>
        </div>
      </section>

      {/* TOPIK Level Info */}
      <section className="lesson-section" data-aos="fade-up">
        <div className="container">
          <h2>{t('TOPIK 시험 안내', 'TOPIK Exam Information')}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {Object.values(TOPIK_LEVELS).map((level, index) => (
              <div key={index} className="example-box" data-aos="fade-up" data-aos-delay={index * 100}>
                <h3>{level.name}</h3>
                <p><strong>{t('등급', 'Levels')}:</strong> {level.levels.join(', ')}</p>
                <p>{language === 'ko' ? level.description : level.descriptionEn}</p>
              </div>
            ))}
          </div>

          <div className="example-box" data-aos="fade-up" style={{ marginTop: '1.5rem' }}>
            <h4>{t('시험 구성', 'Exam Structure')}</h4>
            <table className="expression-table">
              <thead>
                <tr>
                  <th>{t('구분', 'Section')}</th>
                  <th>TOPIK I</th>
                  <th>TOPIK II</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{t('듣기', 'Listening')}</td>
                  <td>30{t('문항 / 40분', ' questions / 40 min')}</td>
                  <td>50{t('문항 / 60분', ' questions / 60 min')}</td>
                </tr>
                <tr>
                  <td>{t('읽기', 'Reading')}</td>
                  <td>40{t('문항 / 60분', ' questions / 60 min')}</td>
                  <td>50{t('문항 / 70분', ' questions / 70 min')}</td>
                </tr>
                <tr>
                  <td>{t('쓰기', 'Writing')}</td>
                  <td>-</td>
                  <td>4{t('문항 / 50분', ' questions / 50 min')}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section Cards */}
      <section className="lesson-section" data-aos="fade-up">
        <div className="container">
          <h2>{t('연습 영역', 'Practice Sections')}</h2>
          <div className="topic-grid">
            {SECTION_CARDS.map((card, index) => (
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
                  <span className="topic-card__level"><i className="fas fa-signal"></i> {t('고급', 'Advanced')}</span>
                </div>
                <span className="topic-card__cta">
                  {t('연습하기 →', 'Practice →')}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="lesson-section" data-aos="fade-up">
        <div className="container">
          <div className="tip-box">
            <h4>{t(<><i className="fas fa-lightbulb"></i> TOPIK 시험 준비 팁</>, <><i className="fas fa-lightbulb"></i> TOPIK Study Tips</>)}</h4>
            <ul>
              <li>{t('시험 2~3개월 전부터 체계적으로 준비하세요.', 'Start preparing systematically 2-3 months before the exam.')}</li>
              <li>{t('기출 문제를 반복적으로 풀어보세요. 유형을 파악하는 것이 중요합니다.', 'Solve past exam questions repeatedly. Understanding question types is important.')}</li>
              <li>{t('듣기는 한국 뉴스와 드라마를 꾸준히 들으면 실력이 향상됩니다.', 'Listening skills improve by regularly listening to Korean news and dramas.')}</li>
              <li>{t('읽기 속도를 높이기 위해 매일 한국어 기사를 읽는 습관을 기르세요.', 'Build a habit of reading Korean articles daily to improve reading speed.')}</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
