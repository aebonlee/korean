import { Link } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';
import { useLanguage } from '../../contexts/LanguageContext';
import useAOS from '../../hooks/useAOS';

export default function Honorifics() {
  const { language, t } = useLanguage();
  useAOS();

  return (
    <>
      <SEOHead title={t('존댓말 - Korean Pro', 'Honorifics - Korean Pro')} description={t('한국어 존대법 체계를 배우세요.', 'Learn the Korean honorific system.')} />
      <section className="page-header" data-aos="fade-up">
        <div className="container">
          <div className="page-header__breadcrumb">
            <Link to="/">{t('홈', 'Home')}</Link><i className="fas fa-chevron-right"></i>
            <Link to="/grammar">{t('문법', 'Grammar')}</Link><i className="fas fa-chevron-right"></i>
            <span>{t('존댓말', 'Honorifics')}</span>
          </div>
          <h1 className="page-header__title">{language === 'ko' ? <>존댓말 <span className="page-header__en">(Honorifics)</span></> : 'Korean Honorifics'}</h1>
          <p className="page-header__description">{t('한국어에는 상대방과의 관계에 따라 다양한 말씨(speech levels)가 있습니다. 존댓말은 한국 문화에서 매우 중요합니다.', 'Korean has various speech levels depending on your relationship with the listener. Honorifics are very important in Korean culture.')}</p>
        </div>
      </section>

      <section className="lesson-section" data-aos="fade-up">
        <div className="container">
          <h2>{t('1. 격식체 vs 비격식체', '1. Formal vs Informal')}</h2>
          <div className="example-box" data-aos="fade-up">
            <table className="expression-table">
              <thead><tr><th>{t('수준', 'Level')}</th><th>{t('어미', 'Ending')}</th><th>{t('예시', 'Example')}</th><th>{t('사용 상황', 'Usage')}</th></tr></thead>
              <tbody>
                <tr><td>{t('격식 높임', 'Formal Polite')}</td><td>~ㅂ니다/습니다</td><td>감사합<strong>니다</strong></td><td>{t('뉴스, 발표, 비즈니스', 'News, presentations, business')}</td></tr>
                <tr><td>{t('비격식 높임', 'Informal Polite')}</td><td>~아/어요</td><td>감사해<strong>요</strong></td><td>{t('일상 대화 (존댓말)', 'Daily conversation (polite)')}</td></tr>
                <tr><td>{t('반말', 'Casual')}</td><td>~아/어</td><td>고마<strong>워</strong></td><td>{t('친구, 후배에게', 'To friends, younger people')}</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="lesson-section" data-aos="fade-up">
        <div className="container">
          <h2>{t('2. 존경 표현', '2. Honorific Expressions')}</h2>
          <div className="example-box" data-aos="fade-up">
            <table className="expression-table">
              <thead><tr><th>{t('일반', 'Normal')}</th><th>{t('존경', 'Honorific')}</th><th>{t('영어', 'English')}</th></tr></thead>
              <tbody>
                <tr><td>먹다</td><td><strong>드시다 / 잡수시다</strong></td><td>to eat (hon.)</td></tr>
                <tr><td>자다</td><td><strong>주무시다</strong></td><td>to sleep (hon.)</td></tr>
                <tr><td>말하다</td><td><strong>말씀하시다</strong></td><td>to speak (hon.)</td></tr>
                <tr><td>있다</td><td><strong>계시다</strong></td><td>to be/exist (hon.)</td></tr>
                <tr><td>나이</td><td><strong>연세</strong></td><td>age (hon.)</td></tr>
                <tr><td>집</td><td><strong>댁</strong></td><td>house (hon.)</td></tr>
                <tr><td>이름</td><td><strong>성함</strong></td><td>name (hon.)</td></tr>
              </tbody>
            </table>
          </div>
          <div className="tip-box" data-aos="fade-up">
            <h4>{t('💡 존댓말 사용 팁', '💡 Honorific Tips')}</h4>
            <p>{t('처음 만나는 사람, 나이가 많은 사람, 직장 상사에게는 반드시 존댓말을 사용하세요. 확실하지 않으면 존댓말을 쓰는 것이 안전합니다.', 'Always use honorifics with strangers, older people, and workplace superiors. When in doubt, using honorifics is the safe choice.')}</p>
          </div>
        </div>
      </section>

      <section className="lesson-section" data-aos="fade-up">
        <div className="container">
          <div className="lesson-nav">
            <Link to="/grammar/verb-conjugation" className="btn btn-secondary">{t('← 이전: 동사 활용', '← Previous: Verb Conjugation')}</Link>
            <Link to="/grammar/sentence-patterns" className="btn btn-primary">{t('다음: 문장 패턴 →', 'Next: Sentence Patterns →')}</Link>
          </div>
        </div>
      </section>
    </>
  );
}
