import { Link } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';
import PageLayout from '../../components/PageLayout';
import { useLanguage } from '../../contexts/LanguageContext';
import useAOS from '../../hooks/useAOS';

export default function Phone() {
  const { language, t } = useLanguage();
  useAOS();

  const sections = [
    { id: 'basic-phone', ko: '전화 기본 표현', en: 'Basic Phone Expressions' },
    { id: 'reservation-dialogue', ko: '실전 대화', en: 'Dialogue' },
  ];

  return (
    <>
      <SEOHead title={t('전화 한국어 - Korean Pro', 'Phone Korean - Korean Pro')} description={t('전화 한국어를 배우세요.', 'Learn Korean phone conversation expressions.')} />
      <section className="page-header" data-aos="fade-up">
        <div className="container">
          <div className="page-header__breadcrumb">
            <Link to="/">{t('홈', 'Home')}</Link><i className="fas fa-chevron-right"></i>
            <Link to="/conversation">{t('일상 회화', 'Conversation')}</Link><i className="fas fa-chevron-right"></i>
            <span>{t('전화 한국어', 'Phone')}</span>
          </div>
          <h1 className="page-header__title">{language === 'ko' ? <>전화 한국어 <span className="page-header__en">(Phone Korean)</span></> : 'Phone Korean'}</h1>
          <p className="page-header__description">{t('한국어로 전화 통화하는 법을 배워보세요.', 'Learn how to have phone conversations in Korean.')}</p>
        </div>
      </section>

      <PageLayout sections={sections} category="conversation">
      <section className="lesson-section" id="basic-phone" data-aos="fade-up">
        <div className="container">
          <h2>{t('1. 전화 기본 표현', '1. Basic Phone Expressions')}</h2>
          <div className="example-box" data-aos="fade-up">
            <table className="expression-table">
              <thead><tr><th>{t('한국어', 'Korean')}</th><th>{t('발음', 'Romanization')}</th><th>{t('영어', 'English')}</th></tr></thead>
              <tbody>
                <tr><td><strong>여보세요?</strong></td><td>yeoboseyo?</td><td>Hello? (phone)</td></tr>
                <tr><td><strong>[이름] 씨 계세요?</strong></td><td>[name]-ssi gyeseyo?</td><td>Is [name] there?</td></tr>
                <tr><td><strong>잠깐만요.</strong></td><td>jamkkanmanyo</td><td>Just a moment.</td></tr>
                <tr><td><strong>메시지 남겨도 될까요?</strong></td><td>mesiji namgyeodo doelkkayo?</td><td>May I leave a message?</td></tr>
                <tr><td><strong>나중에 다시 전화할게요.</strong></td><td>najunge dasi jeonhwahalgeyo</td><td>I will call back later.</td></tr>
                <tr><td><strong>잘 안 들려요.</strong></td><td>jal an deullyeoyo</td><td>I cannot hear well.</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="lesson-section" id="reservation-dialogue" data-aos="fade-up">
        <div className="container">
          <h2>{t('2. 실전 대화 - 예약 전화', '2. Dialogue - Reservation Call')}</h2>
          <div className="example-box" data-aos="fade-up">
            <div className="dialogue">
              <p><span className="speaker b">{t('직원', 'Staff')}:</span> 여보세요, 서울 레스토랑입니다.</p>
              <p><span className="speaker a">{t('손님', 'Customer')}:</span> 안녕하세요. 예약하고 싶은데요.</p>
              <p><span className="speaker b">{t('직원', 'Staff')}:</span> 네, 몇 분이시고 언제로 하시겠어요?</p>
              <p><span className="speaker a">{t('손님', 'Customer')}:</span> 4명이요. 이번 토요일 저녁 7시요.</p>
              <p><span className="speaker b">{t('직원', 'Staff')}:</span> 네, 성함이 어떻게 되세요?</p>
              <p><span className="speaker a">{t('손님', 'Customer')}:</span> 김민수입니다.</p>
              <p><span className="speaker b">{t('직원', 'Staff')}:</span> 김민수 님, 토요일 7시 4명 예약되었습니다.</p>
            </div>
            <p className="translation dialogue-translation">{t('', 'Staff: Hello, Seoul Restaurant.\nCustomer: Hello. I would like to make a reservation.\nStaff: How many and when?\nCustomer: 4 people. This Saturday at 7 PM.\nStaff: What is your name?\nCustomer: Kim Minsu.\nStaff: Mr. Kim, reservation confirmed for 4 at 7 PM Saturday.')}</p>
          </div>
        </div>
      </section>

      <section className="lesson-section" data-aos="fade-up">
        <div className="container">
          <div className="lesson-nav">
            <Link to="/conversation/restaurant" className="btn btn-secondary">{t('← 이전: 음식점', '← Previous: Restaurant')}</Link>
            <Link to="/grammar" className="btn btn-primary">{t('다음: 문법 →', 'Next: Grammar →')}</Link>
          </div>
        </div>
      </section>
      </PageLayout>
    </>
  );
}
