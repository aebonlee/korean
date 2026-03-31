import { Link } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';
import PageLayout from '../../components/PageLayout';
import { useLanguage } from '../../contexts/LanguageContext';
import useAOS from '../../hooks/useAOS';

export default function SentencePatterns() {
  const { language, t } = useLanguage();
  useAOS();

  const patterns = [
    { id: 'want-to', pattern: '~고 싶다', meaning: 'want to ~', examples: [{ ko: '한국에 가고 싶어요.', en: 'I want to go to Korea.' }, { ko: '김치를 먹고 싶어요.', en: 'I want to eat kimchi.' }] },
    { id: 'can-cannot', pattern: '~(으)ㄹ 수 있다/없다', meaning: 'can / cannot ~', examples: [{ ko: '한국어를 할 수 있어요.', en: 'I can speak Korean.' }, { ko: '매운 음식을 먹을 수 없어요.', en: 'I cannot eat spicy food.' }] },
    { id: 'if', pattern: '~(으)면', meaning: 'if ~', examples: [{ ko: '시간이 있으면 같이 가요.', en: 'If you have time, let\'s go together.' }, { ko: '비가 오면 집에 있을 거예요.', en: 'If it rains, I will stay home.' }] },
    { id: 'because', pattern: '~아/어서', meaning: 'because ~ / and then ~', examples: [{ ko: '피곤해서 일찍 잤어요.', en: 'I slept early because I was tired.' }, { ko: '집에 가서 쉬었어요.', en: 'I went home and rested.' }] },
    { id: 'will', pattern: '~(으)ㄹ 거예요', meaning: 'will ~ / plan to ~', examples: [{ ko: '내일 서울에 갈 거예요.', en: 'I will go to Seoul tomorrow.' }, { ko: '주말에 공부할 거예요.', en: 'I will study on the weekend.' }] },
    { id: 'progressive', pattern: '~고 있다', meaning: 'be ~ing (progressive)', examples: [{ ko: '지금 밥을 먹고 있어요.', en: 'I am eating now.' }, { ko: '한국어를 배우고 있어요.', en: 'I am learning Korean.' }] },
  ];

  const sections = patterns.map((p, index) => ({
    id: p.id,
    ko: `${index + 1}. ${p.pattern}`,
    en: `${index + 1}. ${p.pattern} (${p.meaning})`,
  }));

  return (
    <>
      <SEOHead title={String(t('문장 패턴 - Korean Pro', 'Sentence Patterns - Korean Pro'))} description={String(t('핵심 한국어 문장 패턴을 배우세요.', 'Learn key Korean sentence patterns.'))} />
      <section className="page-header" data-aos="fade-up">
        <div className="container">
          <div className="page-header__breadcrumb">
            <Link to="/">{t('홈', 'Home')}</Link><i className="fas fa-chevron-right"></i>
            <Link to="/grammar">{t('문법', 'Grammar')}</Link><i className="fas fa-chevron-right"></i>
            <span>{t('문장 패턴', 'Sentence Patterns')}</span>
          </div>
          <h1 className="page-header__title">{language === 'ko' ? <>문장 패턴 <span className="page-header__en">(Sentence Patterns)</span></> : 'Korean Sentence Patterns'}</h1>
          <p className="page-header__description">{t('자주 사용되는 한국어 문장 패턴을 예문과 함께 배워보세요.', 'Learn frequently used Korean sentence patterns with examples.')}</p>
        </div>
      </section>

      <PageLayout sections={sections} category="grammar">
        {patterns.map((p, index) => (
          <section key={index} id={p.id} className="lesson-section" data-aos="fade-up">
            <div className="container">
              <h2>{index + 1}. {p.pattern} ({p.meaning})</h2>
              <div className="example-box" data-aos="fade-up">
                <table className="expression-table">
                  <thead><tr><th>{t('한국어', 'Korean')}</th><th>{t('영어', 'English')}</th></tr></thead>
                  <tbody>
                    {p.examples.map((ex, i) => (
                      <tr key={i}><td><strong>{ex.ko}</strong></td><td>{ex.en}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        ))}

        <section className="lesson-section" data-aos="fade-up">
          <div className="container">
            <div className="lesson-nav">
              <Link to="/grammar/honorifics" className="btn btn-secondary">{t('← 이전: 존댓말', '← Previous: Honorifics')}</Link>
              <Link to="/vocabulary" className="btn btn-primary">{t('다음: 어휘 →', 'Next: Vocabulary →')}</Link>
            </div>
          </div>
        </section>
      </PageLayout>
    </>
  );
}
