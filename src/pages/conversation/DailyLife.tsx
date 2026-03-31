import { Link } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';
import PageLayout from '../../components/PageLayout';
import { useLanguage } from '../../contexts/LanguageContext';
import useAOS from '../../hooks/useAOS';

export default function DailyLife() {
  const { language, t } = useLanguage();
  useAOS();

  const sections = [
    { id: 'morning-routine', ko: '아침 루틴', en: 'Morning Routine' },
    { id: 'making-plans', ko: '약속 잡기', en: 'Making Plans' },
    { id: 'key-expressions', ko: '핵심 표현', en: 'Key Expressions' },
  ];

  return (
    <>
      <SEOHead title={String(t('일상생활 표현 - Korean Pro', 'Daily Life Expressions - Korean Pro'))} description={String(t('아침 루틴, 날씨, 약속 잡기 등 일상 한국어 표현을 배우세요.', 'Learn everyday Korean expressions for routines, weather, and plans.'))} />

      <section className="page-header" data-aos="fade-up">
        <div className="container">
          <div className="page-header__breadcrumb">
            <Link to="/">{t('홈', 'Home')}</Link><i className="fas fa-chevron-right"></i>
            <Link to="/conversation">{t('일상 회화', 'Conversation')}</Link><i className="fas fa-chevron-right"></i>
            <span>{t('일상생활', 'Daily Life')}</span>
          </div>
          <h1 className="page-header__title">{language === 'ko' ? <>일상생활 표현 <span className="page-header__en">(Daily Life)</span></> : 'Daily Life Expressions'}</h1>
          <p className="page-header__description">{t('매일 사용하는 한국어 일상 표현을 배워보세요.', 'Learn Korean expressions you can use every day.')}</p>
        </div>
      </section>

      <PageLayout sections={sections} category="conversation">
      <section className="lesson-section" id="morning-routine" data-aos="fade-up">
        <div className="container">
          <h2>{t('1. 아침 루틴', '1. Morning Routine')}</h2>
          <div className="example-box" data-aos="fade-up">
            <table className="expression-table">
              <thead><tr><th>{t('한국어', 'Korean')}</th><th>{t('발음', 'Romanization')}</th><th>{t('영어', 'English')}</th></tr></thead>
              <tbody>
                <tr><td><strong>일어나다</strong></td><td>ireonada</td><td>to wake up</td></tr>
                <tr><td><strong>세수하다</strong></td><td>sesuhada</td><td>to wash face</td></tr>
                <tr><td><strong>이를 닦다</strong></td><td>ireul dakda</td><td>to brush teeth</td></tr>
                <tr><td><strong>아침을 먹다</strong></td><td>achimeul meokda</td><td>to eat breakfast</td></tr>
                <tr><td><strong>출근하다 / 등교하다</strong></td><td>chulgeunhada / deunggyohada</td><td>to go to work / school</td></tr>
                <tr><td><strong>오늘 날씨가 좋네요.</strong></td><td>oneul nalssiga jonneyo</td><td>The weather is nice today.</td></tr>
                <tr><td><strong>비가 올 것 같아요.</strong></td><td>biga ol geot gatayo</td><td>It looks like it will rain.</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="lesson-section" id="making-plans" data-aos="fade-up">
        <div className="container">
          <h2>{t('2. 약속 잡기', '2. Making Plans')}</h2>
          <div className="example-box" data-aos="fade-up">
            <div className="dialogue">
              <p><span className="speaker a">A:</span> 이번 주말에 시간 있어요?</p>
              <p><span className="speaker b">B:</span> 네, 토요일은 괜찮아요. 뭐 할까요?</p>
              <p><span className="speaker a">A:</span> 같이 영화 볼까요?</p>
              <p><span className="speaker b">B:</span> 좋아요! 몇 시에 만날까요?</p>
              <p><span className="speaker a">A:</span> 오후 2시에 강남역에서 만나요.</p>
              <p><span className="speaker b">B:</span> 알겠어요. 토요일에 봐요!</p>
            </div>
            <p className="translation dialogue-translation">{t('', 'A: Are you free this weekend?\nB: Yes, Saturday works. What should we do?\nA: Shall we watch a movie together?\nB: Sounds good! What time shall we meet?\nA: Let\'s meet at Gangnam Station at 2 PM.\nB: Got it. See you Saturday!')}</p>
          </div>
        </div>
      </section>

      <section className="lesson-section" id="key-expressions" data-aos="fade-up">
        <div className="container">
          <h2>{t('3. 핵심 표현', '3. Key Expressions')}</h2>
          <div className="example-box" data-aos="fade-up">
            <table className="expression-table">
              <thead><tr><th>{t('한국어', 'Korean')}</th><th>{t('영어', 'English')}</th></tr></thead>
              <tbody>
                <tr><td><strong>시간 있어요?</strong></td><td>Do you have time?</td></tr>
                <tr><td><strong>같이 ~할까요?</strong></td><td>Shall we ~ together?</td></tr>
                <tr><td><strong>몇 시에 만날까요?</strong></td><td>What time shall we meet?</td></tr>
                <tr><td><strong>알겠어요.</strong></td><td>I understand. / Got it.</td></tr>
                <tr><td><strong>피곤해요.</strong></td><td>I am tired.</td></tr>
                <tr><td><strong>배가 고파요.</strong></td><td>I am hungry.</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="lesson-section" data-aos="fade-up">
        <div className="container">
          <div className="lesson-nav">
            <Link to="/conversation/greetings" className="btn btn-secondary">{t('← 이전: 인사', '← Previous: Greetings')}</Link>
            <Link to="/conversation/shopping" className="btn btn-primary">{t('다음: 쇼핑 →', 'Next: Shopping →')}</Link>
          </div>
        </div>
      </section>
      </PageLayout>
    </>
  );
}
