import { Link } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';
import { useLanguage } from '../../contexts/LanguageContext';
import useAOS from '../../hooks/useAOS';

const WORDS = [
  { ko: '아침', en: 'morning/breakfast', rom: 'achim', ex: '아침에 일찍 일어나요.', exEn: 'I wake up early in the morning.' },
  { ko: '점심', en: 'lunch', rom: 'jeomsim', ex: '점심 먹었어요?', exEn: 'Did you eat lunch?' },
  { ko: '저녁', en: 'evening/dinner', rom: 'jeonyeok', ex: '저녁에 뭐 먹을 거예요?', exEn: 'What will you eat for dinner?' },
  { ko: '날씨', en: 'weather', rom: 'nalssi', ex: '오늘 날씨가 좋아요.', exEn: 'The weather is nice today.' },
  { ko: '전화', en: 'phone call', rom: 'jeonhwa', ex: '전화해도 돼요?', exEn: 'Can I call you?' },
  { ko: '약속', en: 'appointment/promise', rom: 'yaksok', ex: '내일 약속이 있어요.', exEn: 'I have plans tomorrow.' },
  { ko: '병원', en: 'hospital', rom: 'byeongwon', ex: '병원에 가야 해요.', exEn: 'I need to go to the hospital.' },
  { ko: '운동', en: 'exercise', rom: 'undong', ex: '매일 운동해요.', exEn: 'I exercise every day.' },
  { ko: '요리', en: 'cooking', rom: 'yori', ex: '요리를 좋아해요.', exEn: 'I like cooking.' },
  { ko: '청소', en: 'cleaning', rom: 'cheongso', ex: '주말에 청소해요.', exEn: 'I clean on weekends.' },
  { ko: '빨래', en: 'laundry', rom: 'ppallae', ex: '빨래를 해야 해요.', exEn: 'I have to do laundry.' },
  { ko: '쇼핑', en: 'shopping', rom: 'syoping', ex: '같이 쇼핑 갈까요?', exEn: 'Shall we go shopping together?' },
  { ko: '지하철', en: 'subway', rom: 'jihacheol', ex: '지하철로 출근해요.', exEn: 'I commute by subway.' },
  { ko: '마트', en: 'mart/supermarket', rom: 'mateu', ex: '마트에서 장을 봐요.', exEn: 'I shop at the mart.' },
  { ko: '공원', en: 'park', rom: 'gongwon', ex: '공원에서 산책해요.', exEn: 'I take a walk in the park.' },
];

export default function VocabDaily() {
  const { t } = useLanguage();
  useAOS();

  return (
    <>
      <SEOHead title={t('일상 필수 500 - Korean Pro', 'Daily 500 - Korean Pro')} description={t('일상생활 필수 한국어 단어 500개를 학습하세요.', 'Study 500 essential daily Korean words.')} />
      <section className="page-header" data-aos="fade-up">
        <div className="container">
          <div className="page-header__breadcrumb">
            <Link to="/">{t('홈', 'Home')}</Link><i className="fas fa-chevron-right"></i>
            <Link to="/vocabulary">{t('어휘', 'Vocabulary')}</Link><i className="fas fa-chevron-right"></i>
            <span>{t('일상 필수 500', 'Daily 500')}</span>
          </div>
          <h1 className="page-header__title">{t('일상 필수 단어 500', 'Daily Essential 500')}</h1>
          <p className="page-header__description">
            {t('일상생활에서 매일 사용하는 실용적인 한국어 어휘를 학습하세요.', 'Study practical Korean vocabulary used in everyday life.')}
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
            <Link to="/vocabulary/basic" className="btn btn-secondary">{t('← 이전: 기초 500', '← Previous: Basic 500')}</Link>
            <Link to="/vocabulary/business" className="btn btn-primary">{t('다음: 비즈니스 500 →', 'Next: Business 500 →')}</Link>
          </div>
        </div>
      </section>
    </>
  );
}
