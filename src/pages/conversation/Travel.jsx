import { Link } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';
import { useLanguage } from '../../contexts/LanguageContext';
import useAOS from '../../hooks/useAOS';

export default function Travel() {
  const { language, t } = useLanguage();
  useAOS();

  return (
    <>
      <SEOHead title={t('여행 한국어 - Korean Pro', 'Travel Korean - Korean Pro')} description={t('한국 여행 필수 표현을 배우세요.', 'Learn essential Korean phrases for travel.')} />
      <section className="page-header" data-aos="fade-up">
        <div className="container">
          <div className="page-header__breadcrumb">
            <Link to="/">{t('홈', 'Home')}</Link><i className="fas fa-chevron-right"></i>
            <Link to="/conversation">{t('일상 회화', 'Conversation')}</Link><i className="fas fa-chevron-right"></i>
            <span>{t('여행 한국어', 'Travel')}</span>
          </div>
          <h1 className="page-header__title">{language === 'ko' ? <>여행 한국어 <span className="page-header__en">(Travel Korean)</span></> : 'Travel Korean'}</h1>
          <p className="page-header__description">{t('한국 여행 시 꼭 필요한 표현들을 배워보세요.', 'Learn essential Korean expressions for traveling in Korea.')}</p>
        </div>
      </section>

      <section className="lesson-section" data-aos="fade-up">
        <div className="container">
          <h2>{t('1. 교통수단', '1. Transportation')}</h2>
          <div className="example-box" data-aos="fade-up">
            <table className="expression-table">
              <thead><tr><th>{t('한국어', 'Korean')}</th><th>{t('발음', 'Romanization')}</th><th>{t('영어', 'English')}</th></tr></thead>
              <tbody>
                <tr><td><strong>지하철역이 어디예요?</strong></td><td>jihacheol-yeogi eodiyeyo?</td><td>Where is the subway station?</td></tr>
                <tr><td><strong>[장소]에 어떻게 가요?</strong></td><td>[place]-e eotteoke gayo?</td><td>How do I get to [place]?</td></tr>
                <tr><td><strong>택시 타고 싶어요.</strong></td><td>taeksi tago sipeoyo</td><td>I want to take a taxi.</td></tr>
                <tr><td><strong>여기에서 멀어요?</strong></td><td>yeogieseo meoreoyo?</td><td>Is it far from here?</td></tr>
                <tr><td><strong>교통카드 어디에서 사요?</strong></td><td>gyotong kadeu eodieseo sayo?</td><td>Where can I buy a transit card?</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="lesson-section" data-aos="fade-up">
        <div className="container">
          <h2>{t('2. 호텔 / 숙소', '2. Hotel / Accommodation')}</h2>
          <div className="example-box" data-aos="fade-up">
            <table className="expression-table">
              <thead><tr><th>{t('한국어', 'Korean')}</th><th>{t('영어', 'English')}</th></tr></thead>
              <tbody>
                <tr><td><strong>예약했습니다.</strong></td><td>I have a reservation.</td></tr>
                <tr><td><strong>체크인 할게요.</strong></td><td>I would like to check in.</td></tr>
                <tr><td><strong>체크아웃 시간이 몇 시예요?</strong></td><td>What time is checkout?</td></tr>
                <tr><td><strong>Wi-Fi 비밀번호가 뭐예요?</strong></td><td>What is the Wi-Fi password?</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="lesson-section" data-aos="fade-up">
        <div className="container">
          <h2>{t('3. 길 찾기 대화', '3. Asking for Directions')}</h2>
          <div className="example-box" data-aos="fade-up">
            <div className="dialogue">
              <p><span className="speaker a">A:</span> 실례합니다. 경복궁이 어디예요?</p>
              <p><span className="speaker b">B:</span> 여기에서 직진하시고 두 번째 사거리에서 오른쪽으로 가세요.</p>
              <p><span className="speaker a">A:</span> 걸어서 얼마나 걸려요?</p>
              <p><span className="speaker b">B:</span> 약 10분 정도 걸려요.</p>
              <p><span className="speaker a">A:</span> 감사합니다!</p>
            </div>
            <p className="translation dialogue-translation">{t('', 'A: Excuse me. Where is Gyeongbokgung Palace?\nB: Go straight and turn right at the second intersection.\nA: How long does it take on foot?\nB: About 10 minutes.\nA: Thank you!')}</p>
          </div>
        </div>
      </section>

      <section className="lesson-section" data-aos="fade-up">
        <div className="container">
          <div className="lesson-nav">
            <Link to="/conversation/shopping" className="btn btn-secondary">{t('← 이전: 쇼핑', '← Previous: Shopping')}</Link>
            <Link to="/conversation/restaurant" className="btn btn-primary">{t('다음: 음식점 →', 'Next: Restaurant →')}</Link>
          </div>
        </div>
      </section>
    </>
  );
}
