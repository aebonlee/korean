import { Link } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';
import { useLanguage } from '../../contexts/LanguageContext';
import useAOS from '../../hooks/useAOS';

const WORDS = [
  { ko: '경험', en: 'experience', rom: 'gyeongheom', ex: '좋은 경험이었어요.', exEn: 'It was a good experience.' },
  { ko: '환경', en: 'environment', rom: 'hwangyeong', ex: '환경을 보호해야 해요.', exEn: 'We must protect the environment.' },
  { ko: '전통', en: 'tradition', rom: 'jeontong', ex: '한국의 전통 문화가 좋아요.', exEn: 'I like Korean traditional culture.' },
  { ko: '발전', en: 'development', rom: 'baljeon', ex: '기술이 빠르게 발전하고 있어요.', exEn: 'Technology is developing rapidly.' },
  { ko: '사회', en: 'society', rom: 'sahoe', ex: '사회 문제에 관심이 있어요.', exEn: "I'm interested in social issues." },
  { ko: '경제', en: 'economy', rom: 'gyeongje', ex: '경제가 좋아지고 있어요.', exEn: 'The economy is improving.' },
  { ko: '문화', en: 'culture', rom: 'munhwa', ex: '한국 문화를 배우고 싶어요.', exEn: 'I want to learn Korean culture.' },
  { ko: '교육', en: 'education', rom: 'gyoyuk', ex: '교육이 중요해요.', exEn: 'Education is important.' },
  { ko: '관계', en: 'relationship', rom: 'gwangye', ex: '좋은 관계를 유지하고 싶어요.', exEn: 'I want to maintain good relationships.' },
  { ko: '의견', en: 'opinion', rom: 'uigyeon', ex: '당신의 의견을 말해 주세요.', exEn: 'Please share your opinion.' },
  { ko: '결과', en: 'result', rom: 'gyeolgwa', ex: '시험 결과가 나왔어요.', exEn: 'The exam results are out.' },
  { ko: '원인', en: 'cause', rom: 'wonin', ex: '사고의 원인을 조사하고 있어요.', exEn: 'They are investigating the cause of the accident.' },
  { ko: '해결', en: 'solution', rom: 'haegyeol', ex: '문제를 해결해야 해요.', exEn: 'We need to solve the problem.' },
  { ko: '참여', en: 'participation', rom: 'chamyeo', ex: '행사에 참여하고 싶어요.', exEn: 'I want to participate in the event.' },
  { ko: '성공', en: 'success', rom: 'seonggong', ex: '성공을 축하합니다.', exEn: 'Congratulations on your success.' },
];

export default function VocabTopik() {
  const { t } = useLanguage();
  useAOS();

  return (
    <>
      <SEOHead title={t('TOPIK 800 - Korean Pro', 'TOPIK 800 - Korean Pro')} description={t('TOPIK 시험 필수 어휘 800개를 학습하세요.', 'Study 800 essential TOPIK vocabulary words.')} />
      <section className="page-header" data-aos="fade-up">
        <div className="container">
          <div className="page-header__breadcrumb">
            <Link to="/">{t('홈', 'Home')}</Link><i className="fas fa-chevron-right"></i>
            <Link to="/vocabulary">{t('어휘', 'Vocabulary')}</Link><i className="fas fa-chevron-right"></i>
            <span>TOPIK 800</span>
          </div>
          <h1 className="page-header__title">{t('TOPIK 필수 어휘 800', 'TOPIK Essential 800')}</h1>
          <p className="page-header__description">
            {t('TOPIK 시험에 자주 출제되는 핵심 어휘를 학습하세요.', 'Study key vocabulary words frequently tested on TOPIK.')}
            <br />
            {t('한국어를 클릭하면 발음을 들을 수 있습니다.', 'Click Korean text to hear pronunciation.')}
          </p>
        </div>
      </section>

      <section className="lesson-section" data-aos="fade-up">
        <div className="container">
          <div className="vocab-grid">
            {WORDS.map((w, i) => (
              <div key={i} className="vocab-card" data-aos="fade-up" data-aos-delay={Math.min(i * 50, 300)}>
                <div className="vocab-card__word" data-tts={w.ko}>{w.ko}</div>
                <div className="vocab-card__romanization">{w.rom}</div>
                <div className="vocab-card__meaning">{w.en}</div>
                <div className="vocab-card__example">
                  <span data-tts={w.ex}>{w.ex}</span>
                  <div className="vocab-card__example-en">{w.exEn}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="lesson-section" data-aos="fade-up">
        <div className="container">
          <div className="lesson-nav">
            <Link to="/vocabulary/business" className="btn btn-secondary">{t('← 이전: 비즈니스 500', '← Previous: Business 500')}</Link>
            <Link to="/writing" className="btn btn-primary">{t('다음: 작문 →', 'Next: Writing →')}</Link>
          </div>
        </div>
      </section>
    </>
  );
}
