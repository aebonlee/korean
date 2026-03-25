import { Link } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';
import { useLanguage } from '../../contexts/LanguageContext';
import useAOS from '../../hooks/useAOS';

const WORDS = [
  { ko: '회의', en: 'meeting', rom: 'hoeui', ex: '오후에 회의가 있어요.', exEn: 'There is a meeting in the afternoon.' },
  { ko: '보고서', en: 'report', rom: 'bogoseo', ex: '보고서를 작성해 주세요.', exEn: 'Please write the report.' },
  { ko: '출장', en: 'business trip', rom: 'chuljang', ex: '다음 주에 출장을 가요.', exEn: "I'm going on a business trip next week." },
  { ko: '계약', en: 'contract', rom: 'gyeyak', ex: '계약서에 서명해 주세요.', exEn: 'Please sign the contract.' },
  { ko: '마감', en: 'deadline', rom: 'magam', ex: '마감이 내일이에요.', exEn: 'The deadline is tomorrow.' },
  { ko: '급여', en: 'salary', rom: 'geupyeo', ex: '급여가 올랐어요.', exEn: 'My salary increased.' },
  { ko: '면접', en: 'interview', rom: 'myeonjeop', ex: '면접을 잘 봤어요.', exEn: 'The interview went well.' },
  { ko: '프로젝트', en: 'project', rom: 'peurojekteu', ex: '새 프로젝트를 시작했어요.', exEn: 'We started a new project.' },
  { ko: '거래처', en: 'client/partner', rom: 'georaecheo', ex: '거래처와 미팅이 있어요.', exEn: 'I have a meeting with a client.' },
  { ko: '이메일', en: 'email', rom: 'imeil', ex: '이메일을 확인해 주세요.', exEn: 'Please check the email.' },
  { ko: '발표', en: 'presentation', rom: 'balpyo', ex: '발표 준비를 해야 해요.', exEn: 'I need to prepare for the presentation.' },
  { ko: '부서', en: 'department', rom: 'buseo', ex: '어느 부서에서 일해요?', exEn: 'Which department do you work in?' },
  { ko: '승진', en: 'promotion', rom: 'seungjin', ex: '승진을 축하합니다!', exEn: 'Congratulations on your promotion!' },
  { ko: '야근', en: 'overtime', rom: 'yageun', ex: '오늘 야근해야 해요.', exEn: 'I have to work overtime today.' },
  { ko: '퇴근', en: 'leaving work', rom: 'toegeun', ex: '몇 시에 퇴근해요?', exEn: 'What time do you leave work?' },
];

export default function VocabBusiness() {
  const { t } = useLanguage();
  useAOS();

  return (
    <>
      <SEOHead title={t('비즈니스 500 - Korean Pro', 'Business 500 - Korean Pro')} description={t('비즈니스 한국어 어휘 500개를 학습하세요.', 'Study 500 business Korean vocabulary words.')} />
      <section className="page-header" data-aos="fade-up">
        <div className="container">
          <div className="page-header__breadcrumb">
            <Link to="/">{t('홈', 'Home')}</Link><i className="fas fa-chevron-right"></i>
            <Link to="/vocabulary">{t('어휘', 'Vocabulary')}</Link><i className="fas fa-chevron-right"></i>
            <span>{t('비즈니스 500', 'Business 500')}</span>
          </div>
          <h1 className="page-header__title">{t('비즈니스 필수 단어 500', 'Business Essential 500')}</h1>
          <p className="page-header__description">
            {t('직장 생활과 비즈니스 환경에서 필요한 전문 어휘를 학습하세요.', 'Study professional vocabulary for the workplace and business environment.')}
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
            <Link to="/vocabulary/daily" className="btn btn-secondary">{t('← 이전: 일상 500', '← Previous: Daily 500')}</Link>
            <Link to="/vocabulary/topik" className="btn btn-primary">{t('다음: TOPIK 800 →', 'Next: TOPIK 800 →')}</Link>
          </div>
        </div>
      </section>
    </>
  );
}
