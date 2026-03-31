import { Link } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';
import PageLayout from '../../components/PageLayout';
import { useLanguage } from '../../contexts/LanguageContext';
import useAOS from '../../hooks/useAOS';

export default function VerbConjugation() {
  const { language, t } = useLanguage();
  useAOS();

  const sections = [
    { id: 'present-tense', ko: '1. 현재시제 (~아/어요)', en: '1. Present Tense (~아/어요)' },
    { id: 'past-tense', ko: '2. 과거시제 (~았/었어요)', en: '2. Past Tense (~았/었어요)' },
    { id: 'future-tense', ko: '3. 미래시제 (~(으)ㄹ 거예요)', en: '3. Future Tense (~(으)ㄹ 거예요)' },
  ];

  return (
    <>
      <SEOHead title={String(t('동사 활용 - Korean Pro', 'Verb Conjugation - Korean Pro'))} description={String(t('한국어 동사 활용법을 배우세요.', 'Learn Korean verb conjugation patterns.'))} />
      <section className="page-header" data-aos="fade-up">
        <div className="container">
          <div className="page-header__breadcrumb">
            <Link to="/">{t('홈', 'Home')}</Link><i className="fas fa-chevron-right"></i>
            <Link to="/grammar">{t('문법', 'Grammar')}</Link><i className="fas fa-chevron-right"></i>
            <span>{t('동사 활용', 'Verb Conjugation')}</span>
          </div>
          <h1 className="page-header__title">{language === 'ko' ? <>동사 활용 <span className="page-header__en">(Verb Conjugation)</span></> : 'Korean Verb Conjugation'}</h1>
          <p className="page-header__description">{t('한국어 동사는 어간에 다양한 어미를 붙여 시제, 존댓말, 의문 등을 표현합니다.', 'Korean verbs express tense, politeness, and questions by attaching various endings to the verb stem.')}</p>
        </div>
      </section>

      <PageLayout sections={sections} category="grammar">
        <section id="present-tense" className="lesson-section" data-aos="fade-up">
          <div className="container">
            <h2>{t('1. 현재시제 (~아/어요)', '1. Present Tense (~아/어요)')}</h2>
            <div className="example-box" data-aos="fade-up">
              <table className="expression-table">
                <thead><tr><th>{t('기본형', 'Base')}</th><th>{t('어간', 'Stem')}</th><th>{t('현재', 'Present')}</th><th>{t('영어', 'English')}</th></tr></thead>
                <tbody>
                  <tr><td>가다</td><td>가-</td><td><strong>가요</strong></td><td>go</td></tr>
                  <tr><td>먹다</td><td>먹-</td><td><strong>먹어요</strong></td><td>eat</td></tr>
                  <tr><td>마시다</td><td>마시-</td><td><strong>마셔요</strong></td><td>drink</td></tr>
                  <tr><td>하다</td><td>하-</td><td><strong>해요</strong></td><td>do</td></tr>
                  <tr><td>공부하다</td><td>공부하-</td><td><strong>공부해요</strong></td><td>study</td></tr>
                  <tr><td>읽다</td><td>읽-</td><td><strong>읽어요</strong></td><td>read</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section id="past-tense" className="lesson-section" data-aos="fade-up">
          <div className="container">
            <h2>{t('2. 과거시제 (~았/었어요)', '2. Past Tense (~았/었어요)')}</h2>
            <div className="example-box" data-aos="fade-up">
              <table className="expression-table">
                <thead><tr><th>{t('현재', 'Present')}</th><th>{t('과거', 'Past')}</th><th>{t('영어', 'English')}</th></tr></thead>
                <tbody>
                  <tr><td>가요</td><td><strong>갔어요</strong></td><td>went</td></tr>
                  <tr><td>먹어요</td><td><strong>먹었어요</strong></td><td>ate</td></tr>
                  <tr><td>마셔요</td><td><strong>마셨어요</strong></td><td>drank</td></tr>
                  <tr><td>해요</td><td><strong>했어요</strong></td><td>did</td></tr>
                  <tr><td>봐요</td><td><strong>봤어요</strong></td><td>saw</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section id="future-tense" className="lesson-section" data-aos="fade-up">
          <div className="container">
            <h2>{t('3. 미래시제 (~(으)ㄹ 거예요)', '3. Future Tense (~(으)ㄹ 거예요)')}</h2>
            <div className="example-box" data-aos="fade-up">
              <table className="expression-table">
                <thead><tr><th>{t('기본형', 'Base')}</th><th>{t('미래', 'Future')}</th><th>{t('영어', 'English')}</th></tr></thead>
                <tbody>
                  <tr><td>가다</td><td><strong>갈 거예요</strong></td><td>will go</td></tr>
                  <tr><td>먹다</td><td><strong>먹을 거예요</strong></td><td>will eat</td></tr>
                  <tr><td>하다</td><td><strong>할 거예요</strong></td><td>will do</td></tr>
                  <tr><td>보다</td><td><strong>볼 거예요</strong></td><td>will see</td></tr>
                </tbody>
              </table>
            </div>
            <div className="tip-box" data-aos="fade-up">
              <h4>{t(<><i className="fas fa-lightbulb"></i> 활용 규칙</>, <><i className="fas fa-lightbulb"></i> Conjugation Rule</>)}</h4>
              <p>{t('어간의 마지막 모음이 ㅏ/ㅗ이면 아요, 그 외에는 어요를 붙입니다.', 'If the last vowel of the stem is ㅏ/ㅗ, add 아요. Otherwise add 어요.')}<br />{t('하다 동사는 항상 해요가 됩니다.', '하다 verbs always become 해요.')}</p>
            </div>
          </div>
        </section>

        <section className="lesson-section" data-aos="fade-up">
          <div className="container">
            <div className="lesson-nav">
              <Link to="/grammar/particles" className="btn btn-secondary">{t('← 이전: 조사', '← Previous: Particles')}</Link>
              <Link to="/grammar/honorifics" className="btn btn-primary">{t('다음: 존댓말 →', 'Next: Honorifics →')}</Link>
            </div>
          </div>
        </section>
      </PageLayout>
    </>
  );
}
