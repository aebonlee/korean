import { Link } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';
import { useLanguage } from '../../contexts/LanguageContext';
import useAOS from '../../hooks/useAOS';

export default function BasicSentence() {
  const { language, t } = useLanguage();
  useAOS();

  return (
    <>
      <SEOHead title={t('기초 문장 - Korean Pro', 'Basic Sentence - Korean Pro')} description={t('한국어 기본 문장 구조를 학습하세요.', 'Learn basic Korean sentence structures.')} />
      <section className="page-header" data-aos="fade-up">
        <div className="container">
          <div className="page-header__breadcrumb">
            <Link to="/">{t('홈', 'Home')}</Link><i className="fas fa-chevron-right"></i>
            <Link to="/writing">{t('작문', 'Writing')}</Link><i className="fas fa-chevron-right"></i>
            <span>{t('기초 문장', 'Basic Sentence')}</span>
          </div>
          <h1 className="page-header__title">{language === 'ko' ? <>기초 문장 구조 <span className="page-header__en">(Basic Sentence)</span></> : 'Basic Korean Sentence Structure'}</h1>
          <p className="page-header__description">{t('한국어는 SOV 어순으로, 동사가 문장 끝에 옵니다.', 'Korean uses SOV word order, with the verb at the end.')}</p>
        </div>
      </section>

      <section className="lesson-section" data-aos="fade-up">
        <div className="container">
          <h2>{t('1. SOV 어순', '1. SOV Word Order')}</h2>
          <p>{t('한국어: 주어(S) + 목적어(O) + 동사(V)', 'Korean: Subject(S) + Object(O) + Verb(V)')}</p>
          <div className="example-box" data-aos="fade-up">
            <table className="expression-table">
              <thead><tr><th>{t('한국어', 'Korean')}</th><th>{t('구조', 'Structure')}</th><th>{t('영어', 'English')}</th></tr></thead>
              <tbody>
                <tr><td><strong>저는 밥을 먹어요.</strong></td><td>S + O + V</td><td>I eat rice.</td></tr>
                <tr><td><strong>학생이 책을 읽어요.</strong></td><td>S + O + V</td><td>The student reads a book.</td></tr>
                <tr><td><strong>우리는 한국어를 공부해요.</strong></td><td>S + O + V</td><td>We study Korean.</td></tr>
                <tr><td><strong>비가 와요.</strong></td><td>S + V</td><td>It rains.</td></tr>
                <tr><td><strong>한국은 아름다워요.</strong></td><td>S + Adj</td><td>Korea is beautiful.</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="lesson-section" data-aos="fade-up">
        <div className="container">
          <h2>{t('2. 부정문', '2. Negative Sentences')}</h2>
          <div className="example-box" data-aos="fade-up">
            <table className="expression-table">
              <thead><tr><th>{t('긍정', 'Affirmative')}</th><th>{t('부정 (안)', 'Negative (안)')}</th><th>{t('영어', 'English')}</th></tr></thead>
              <tbody>
                <tr><td>가요</td><td><strong>안 가요</strong></td><td>I do not go.</td></tr>
                <tr><td>먹어요</td><td><strong>안 먹어요</strong></td><td>I do not eat.</td></tr>
                <tr><td>좋아요</td><td><strong>안 좋아요</strong></td><td>It is not good.</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="lesson-section" data-aos="fade-up">
        <div className="container">
          <h2>{t('3. 의문문', '3. Question Sentences')}</h2>
          <div className="example-box" data-aos="fade-up">
            <table className="expression-table">
              <thead><tr><th>{t('한국어', 'Korean')}</th><th>{t('영어', 'English')}</th></tr></thead>
              <tbody>
                <tr><td><strong>뭐 먹어요?</strong></td><td>What do you eat?</td></tr>
                <tr><td><strong>어디에 가요?</strong></td><td>Where do you go?</td></tr>
                <tr><td><strong>언제 와요?</strong></td><td>When do you come?</td></tr>
                <tr><td><strong>왜 안 해요?</strong></td><td>Why don't you do it?</td></tr>
                <tr><td><strong>어떻게 해요?</strong></td><td>How do you do it?</td></tr>
              </tbody>
            </table>
          </div>
          <div className="tip-box" data-aos="fade-up">
            <h4>{t('💡 팁', '💡 Tip')}</h4>
            <p>{t('한국어 의문문은 영어처럼 어순이 바뀌지 않습니다. 문장 끝을 올려서 발음하면 됩니다.', 'Korean questions do not change word order like English. Just raise the intonation at the end.')}</p>
          </div>
        </div>
      </section>

      <section className="lesson-section" data-aos="fade-up">
        <div className="container">
          <div className="lesson-nav">
            <Link to="/writing" className="btn btn-secondary">{t('← 목록으로', '← Back to List')}</Link>
            <Link to="/writing/paragraph" className="btn btn-primary">{t('다음: 문단 작성 →', 'Next: Paragraph →')}</Link>
          </div>
        </div>
      </section>
    </>
  );
}
