import { Link } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';
import { useLanguage } from '../../contexts/LanguageContext';
import useAOS from '../../hooks/useAOS';

const LEVEL_LABELS = { beginner: { ko: '초급', en: 'Beginner' }, intermediate: { ko: '중급', en: 'Intermediate' }, advanced: { ko: '고급', en: 'Advanced' } };

const topicCards = [
  { id: 'basic', titleKo: '기초 문장', titleEn: 'Basic Sentence', descKo: '한국어 기본 문장 구조와 어순을 익히세요 (SOV)', descEn: 'Learn basic Korean sentence structure and word order (SOV)', icon: 'fa-solid fa-pen', link: '/writing/basic', color: '#4A8FE7', level: 'beginner' },
  { id: 'paragraph', titleKo: '문단 작성', titleEn: 'Paragraph Writing', descKo: '주제문, 뒷받침 문장으로 문단을 구성하세요', descEn: 'Compose paragraphs with topic and supporting sentences', icon: 'fa-solid fa-file-lines', link: '/writing/paragraph', color: '#22C55E', level: 'intermediate' },
  { id: 'essay', titleKo: '에세이', titleEn: 'Essay Writing', descKo: '서론, 본론, 결론 구조로 한국어 에세이를 쓰세요', descEn: 'Write Korean essays with introduction, body, and conclusion', icon: 'fa-solid fa-scroll', link: '/writing/essay', color: '#A855F7', level: 'advanced' },
];

export default function WritingHome() {
  const { t } = useLanguage();
  useAOS();

  return (
    <>
      <SEOHead title={String(t('한국어 작문 - Korean Pro', 'Korean Writing - Korean Pro'))} description={String(t('기초 문장부터 에세이까지 체계적인 한국어 작문 학습', 'Systematic Korean writing from basic sentences to essays'))} />
      <div className="content-page">
        <section className="page-header" data-aos="fade-up">
          <div className="container">
            <div className="page-header__breadcrumb">
              <Link to="/">{t('홈', 'Home')}</Link><i className="fas fa-chevron-right"></i>
              <span>{t('작문', 'Writing')}</span>
            </div>
            <h1 className="page-header__title">{t('한국어 작문', 'Korean Writing')}</h1>
            <p className="page-header__description">{t('기초 문장 구조부터 에세이까지 단계별로 작문 실력을 향상시키세요.', 'Improve your writing skills step by step, from basic sentences to essays.')}</p>
          </div>
        </section>

        <section className="content-section" data-aos="fade-up">
          <h2 className="content-section__title">{t('학습 과정', 'Learning Path')}</h2>
          <div className="card-grid card-grid--3">
            {topicCards.map((card, index) => (
              <Link to={card.link} key={card.id} className={`topic-card topic-card--${card.level}`} data-aos="fade-up" data-aos-delay={index * 100}>
                <div className="topic-card__icon" style={{ backgroundColor: `${card.color}20`, color: card.color }}><i className={card.icon}></i></div>
                <h3 className="topic-card__title">{t(card.titleKo, card.titleEn)}</h3>
                <p className="topic-card__desc">{t(card.descKo, card.descEn)}</p>
                <div className="topic-card__meta">
                  <span className="topic-card__level"><i className="fas fa-signal"></i> {t((LEVEL_LABELS as any)[card.level].ko, (LEVEL_LABELS as any)[card.level].en)}</span>
                </div>
                <span className="topic-card__cta">{t('학습하기 →', 'Start →')}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="content-section" data-aos="fade-up">
          <div className="tip-box">
            <h4>{t(<><i className="fas fa-lightbulb"></i> 작문 핵심</>, <><i className="fas fa-lightbulb"></i> Writing Keys</>)}</h4>
            <p>{t('한국어는 SOV(주어-목적어-동사) 어순입니다.', 'Korean uses SOV (Subject-Object-Verb) word order.')}<br />{t('영어와 어순이 다르므로 주의하세요.', 'Be careful as it differs from English.')}<br />{t('예: "나는 한국어를 공부해요" (I Korean study)', 'Example: "나는 한국어를 공부해요" (I Korean study)')}</p>
          </div>
        </section>
      </div>
    </>
  );
}
