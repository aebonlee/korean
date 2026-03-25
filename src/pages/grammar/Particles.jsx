import { Link } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';
import PageLayout from '../../components/PageLayout';
import { useLanguage } from '../../contexts/LanguageContext';
import useAOS from '../../hooks/useAOS';

export default function Particles() {
  const { language, t } = useLanguage();
  useAOS();

  const sections = [
    { id: 'subject-particles', ko: '1. 주격 조사: 이/가', en: '1. Subject Particles: 이/가' },
    { id: 'topic-particles', ko: '2. 주제 조사: 은/는', en: '2. Topic Particles: 은/는' },
    { id: 'object-particles', ko: '3. 목적격 조사: 을/를', en: '3. Object Particles: 을/를' },
    { id: 'other-particles', ko: '4. 기타 중요 조사', en: '4. Other Important Particles' },
  ];

  return (
    <>
      <SEOHead title={t('조사 - Korean Pro', 'Particles - Korean Pro')} description={t('한국어 핵심 조사를 배우세요: 은/는, 이/가, 을/를 등.', 'Learn essential Korean particles: 은/는, 이/가, 을/를, and more.')} />
      <section className="page-header" data-aos="fade-up">
        <div className="container">
          <div className="page-header__breadcrumb">
            <Link to="/">{t('홈', 'Home')}</Link><i className="fas fa-chevron-right"></i>
            <Link to="/grammar">{t('문법', 'Grammar')}</Link><i className="fas fa-chevron-right"></i>
            <span>{t('조사', 'Particles')}</span>
          </div>
          <h1 className="page-header__title">{language === 'ko' ? <>조사 <span className="page-header__en">(Particles)</span></> : 'Korean Particles'}</h1>
          <p className="page-header__description">{t('한국어 조사는 명사 뒤에 붙어 문장에서의 역할을 나타냅니다.', 'Korean particles attach to nouns to indicate their role in a sentence.')}<br />{t('영어에는 없는 개념이므로 잘 익혀야 합니다.', 'This concept does not exist in English, so it requires focused study.')}</p>
        </div>
      </section>

      <PageLayout sections={sections} category="grammar">
        <section id="subject-particles" className="lesson-section" data-aos="fade-up">
          <div className="container">
            <h2>{t('1. 주격 조사: 이/가', '1. Subject Particles: 이/가')}</h2>
            <p>{t('주어를 나타냅니다. 받침 있으면 "이", 없으면 "가"를 씁니다.', 'Marks the subject. Use "이" after a consonant ending, "가" after a vowel ending.')}</p>
            <div className="example-box" data-aos="fade-up">
              <table className="expression-table">
                <thead><tr><th>{t('예문', 'Example')}</th><th>{t('영어', 'English')}</th></tr></thead>
                <tbody>
                  <tr><td><strong>날씨가</strong> 좋아요.</td><td>The weather is nice.</td></tr>
                  <tr><td><strong>학생이</strong> 많아요.</td><td>There are many students.</td></tr>
                  <tr><td><strong>비가</strong> 와요.</td><td>It is raining.</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section id="topic-particles" className="lesson-section" data-aos="fade-up">
          <div className="container">
            <h2>{t('2. 주제 조사: 은/는', '2. Topic Particles: 은/는')}</h2>
            <p>{t('문장의 주제/화제를 나타냅니다. 받침 있으면 "은", 없으면 "는"을 씁니다.', 'Marks the topic of the sentence. Use "은" after a consonant ending, "는" after a vowel ending.')}</p>
            <div className="example-box" data-aos="fade-up">
              <table className="expression-table">
                <thead><tr><th>{t('예문', 'Example')}</th><th>{t('영어', 'English')}</th></tr></thead>
                <tbody>
                  <tr><td><strong>저는</strong> 학생이에요.</td><td>I am a student.</td></tr>
                  <tr><td><strong>한국은</strong> 아름다워요.</td><td>Korea is beautiful.</td></tr>
                  <tr><td><strong>이것은</strong> 책이에요.</td><td>This is a book.</td></tr>
                </tbody>
              </table>
            </div>
            <div className="tip-box" data-aos="fade-up">
              <h4>{t(<><i className="fas fa-lightbulb"></i> 이/가 vs 은/는 차이</>, <><i className="fas fa-lightbulb"></i> 이/가 vs 은/는 Difference</>)}</h4>
              <p>{t('이/가는 새로운 정보(주어)를 소개할 때, 은/는은 이미 알려진 화제에 대해 말할 때 사용합니다.', '이/가 introduces new information (subject), while 은/는 is used for known/contrasting topics.')}<br />{t('"누가 왔어요?" → "민수가 왔어요." / "민수는 학생이에요."', '"누가 왔어요?" (Who came?) → "민수가 왔어요." (Minsu came.) / "민수는 학생이에요." (As for Minsu, he is a student.)')}</p>
            </div>
          </div>
        </section>

        <section id="object-particles" className="lesson-section" data-aos="fade-up">
          <div className="container">
            <h2>{t('3. 목적격 조사: 을/를', '3. Object Particles: 을/를')}</h2>
            <p>{t('목적어를 나타냅니다. 받침 있으면 "을", 없으면 "를"을 씁니다.', 'Marks the object. Use "을" after consonant, "를" after vowel.')}</p>
            <div className="example-box" data-aos="fade-up">
              <table className="expression-table">
                <thead><tr><th>{t('예문', 'Example')}</th><th>{t('영어', 'English')}</th></tr></thead>
                <tbody>
                  <tr><td><strong>밥을</strong> 먹어요.</td><td>I eat rice.</td></tr>
                  <tr><td><strong>커피를</strong> 마셔요.</td><td>I drink coffee.</td></tr>
                  <tr><td><strong>한국어를</strong> 공부해요.</td><td>I study Korean.</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section id="other-particles" className="lesson-section" data-aos="fade-up">
          <div className="container">
            <h2>{t('4. 기타 중요 조사', '4. Other Important Particles')}</h2>
            <div className="example-box" data-aos="fade-up">
              <table className="expression-table">
                <thead><tr><th>{t('조사', 'Particle')}</th><th>{t('기능', 'Function')}</th><th>{t('예문', 'Example')}</th><th>{t('영어', 'English')}</th></tr></thead>
                <tbody>
                  <tr><td><strong>에</strong></td><td>{t('장소/시간', 'place/time')}</td><td>학교<strong>에</strong> 가요.</td><td>I go to school.</td></tr>
                  <tr><td><strong>에서</strong></td><td>{t('장소(행위)', 'place (action)')}</td><td>집<strong>에서</strong> 공부해요.</td><td>I study at home.</td></tr>
                  <tr><td><strong>도</strong></td><td>{t('~도', 'also/too')}</td><td>저<strong>도</strong> 한국어를 배워요.</td><td>I also learn Korean.</td></tr>
                  <tr><td><strong>와/과, (이)랑, 하고</strong></td><td>{t('~와/과', 'and/with')}</td><td>친구<strong>와</strong> 같이 가요.</td><td>I go with a friend.</td></tr>
                  <tr><td><strong>의</strong></td><td>{t('~의', 'possessive (of)')}</td><td>한국<strong>의</strong> 문화</td><td>Korean culture</td></tr>
                  <tr><td><strong>(으)로</strong></td><td>{t('방향/수단', 'direction/means')}</td><td>버스<strong>로</strong> 가요.</td><td>I go by bus.</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="lesson-section" data-aos="fade-up">
          <div className="container">
            <div className="lesson-nav">
              <Link to="/grammar" className="btn btn-secondary">{t('← 목록으로', '← Back to List')}</Link>
              <Link to="/grammar/verb-conjugation" className="btn btn-primary">{t('다음: 동사 활용 →', 'Next: Verb Conjugation →')}</Link>
            </div>
          </div>
        </section>
      </PageLayout>
    </>
  );
}
