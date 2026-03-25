import { Link } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';
import { useLanguage } from '../../contexts/LanguageContext';
import useAOS from '../../hooks/useAOS';

const WORDS = [
  { ko: '경험', en: 'experience', rom: 'gyeongheom', ex: '좋은 경험이었어요.' },
  { ko: '환경', en: 'environment', rom: 'hwangyeong', ex: '환경을 보호해야 해요.' },
  { ko: '전통', en: 'tradition', rom: 'jeontong', ex: '한국의 전통 문화가 좋아요.' },
  { ko: '발전', en: 'development', rom: 'baljeon', ex: '기술이 빠르게 발전하고 있어요.' },
  { ko: '사회', en: 'society', rom: 'sahoe', ex: '사회 문제에 관심이 있어요.' },
  { ko: '경제', en: 'economy', rom: 'gyeongje', ex: '경제가 좋아지고 있어요.' },
  { ko: '문화', en: 'culture', rom: 'munhwa', ex: '한국 문화를 배우고 싶어요.' },
  { ko: '교육', en: 'education', rom: 'gyoyuk', ex: '교육이 중요해요.' },
  { ko: '관계', en: 'relationship', rom: 'gwangye', ex: '좋은 관계를 유지하고 싶어요.' },
  { ko: '의견', en: 'opinion', rom: 'uigyeon', ex: '당신의 의견을 말해 주세요.' },
  { ko: '결과', en: 'result', rom: 'gyeolgwa', ex: '시험 결과가 나왔어요.' },
  { ko: '원인', en: 'cause', rom: 'wonin', ex: '사고의 원인을 조사하고 있어요.' },
  { ko: '해결', en: 'solution', rom: 'haegyeol', ex: '문제를 해결해야 해요.' },
  { ko: '참여', en: 'participation', rom: 'chamyeo', ex: '행사에 참여하고 싶어요.' },
  { ko: '성공', en: 'success', rom: 'seonggong', ex: '성공을 축하합니다.' },
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
          <p className="page-header__description">{t('TOPIK 시험에 자주 출제되는 핵심 어휘를 학습하세요.', 'Study key vocabulary words frequently tested on TOPIK.')}</p>
        </div>
      </section>

      <section className="lesson-section" data-aos="fade-up">
        <div className="container">
          <div className="example-box">
            <table className="expression-table">
              <thead><tr><th>#</th><th>{t('한국어', 'Korean')}</th><th>{t('발음', 'Rom.')}</th><th>{t('영어', 'English')}</th><th>{t('예문', 'Example')}</th></tr></thead>
              <tbody>
                {WORDS.map((w, i) => (
                  <tr key={i}><td>{i + 1}</td><td><strong>{w.ko}</strong></td><td>{w.rom}</td><td>{w.en}</td><td>{w.ex}</td></tr>
                ))}
              </tbody>
            </table>
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
