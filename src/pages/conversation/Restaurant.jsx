import { Link } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';
import PageLayout from '../../components/PageLayout';
import { useLanguage } from '../../contexts/LanguageContext';
import useAOS from '../../hooks/useAOS';

export default function Restaurant() {
  const { language, t } = useLanguage();
  useAOS();

  const sections = [
    { id: 'ordering', ko: '주문하기', en: 'Ordering' },
    { id: 'restaurant-dialogue', ko: '실전 대화', en: 'Dialogue' },
  ];

  return (
    <>
      <SEOHead title={t('음식점 한국어 - Korean Pro', 'Restaurant Korean - Korean Pro')} description={t('한국 식당에서 주문, 추천, 계산 표현을 배우세요.', 'Learn Korean expressions for ordering and paying at restaurants.')} />
      <section className="page-header" data-aos="fade-up">
        <div className="container">
          <div className="page-header__breadcrumb">
            <Link to="/">{t('홈', 'Home')}</Link><i className="fas fa-chevron-right"></i>
            <Link to="/conversation">{t('일상 회화', 'Conversation')}</Link><i className="fas fa-chevron-right"></i>
            <span>{t('음식점', 'Restaurant')}</span>
          </div>
          <h1 className="page-header__title">{language === 'ko' ? <>음식점 한국어 <span className="page-header__en">(Restaurant)</span></> : 'At the Restaurant'}</h1>
          <p className="page-header__description">{t('한국 식당에서 자신 있게 주문할 수 있는 표현을 배워보세요.', 'Learn expressions to confidently order at Korean restaurants.')}</p>
        </div>
      </section>

      <PageLayout sections={sections} category="conversation">
      <section className="lesson-section" id="ordering" data-aos="fade-up">
        <div className="container">
          <h2>{t('1. 주문하기', '1. Ordering')}</h2>
          <div className="example-box" data-aos="fade-up">
            <table className="expression-table">
              <thead><tr><th>{t('한국어', 'Korean')}</th><th>{t('발음', 'Romanization')}</th><th>{t('영어', 'English')}</th></tr></thead>
              <tbody>
                <tr><td><strong>메뉴판 주세요.</strong></td><td>menyupan juseyo</td><td>Menu, please.</td></tr>
                <tr><td><strong>뭐가 맛있어요?</strong></td><td>mwoga masisseoyo?</td><td>What is delicious?</td></tr>
                <tr><td><strong>이거 하나 주세요.</strong></td><td>igeo hana juseyo</td><td>One of this, please.</td></tr>
                <tr><td><strong>김치찌개 2인분 주세요.</strong></td><td>gimchijjigae i-inbun juseyo</td><td>Two servings of kimchi stew, please.</td></tr>
                <tr><td><strong>덜 맵게 해주세요.</strong></td><td>deol maepge haejuseyo</td><td>Less spicy, please.</td></tr>
                <tr><td><strong>물 좀 주세요.</strong></td><td>mul jom juseyo</td><td>Water, please.</td></tr>
                <tr><td><strong>계산해 주세요.</strong></td><td>gyesanhae juseyo</td><td>Bill, please.</td></tr>
                <tr><td><strong>잘 먹겠습니다!</strong></td><td>jal meokgesseumnida!</td><td>I will eat well! (before eating)</td></tr>
                <tr><td><strong>잘 먹었습니다!</strong></td><td>jal meogeosseumnida!</td><td>I ate well! (after eating)</td></tr>
              </tbody>
            </table>
          </div>
          <div className="tip-box" data-aos="fade-up">
            <h4>{t(<><i className="fas fa-lightbulb"></i> 한국 식당 문화</>, <><i className="fas fa-lightbulb"></i> Korean Restaurant Culture</>)}</h4>
            <p>{t('한국 식당에서는 반찬이 무료로 제공되며 리필도 가능합니다.', 'Korean restaurants serve free side dishes (banchan) with free refills.')}<br />{t('"반찬 더 주세요"라고 하면 됩니다.', 'Just say "반찬 더 주세요".')}<br />{t('팁 문화는 없습니다.', 'There is no tipping culture.')}</p>
          </div>
        </div>
      </section>

      <section className="lesson-section" id="restaurant-dialogue" data-aos="fade-up">
        <div className="container">
          <h2>{t('2. 실전 대화', '2. Dialogue')}</h2>
          <div className="example-box" data-aos="fade-up">
            <div className="dialogue">
              <p><span className="speaker b">{t('직원', 'Staff')}:</span> 어서오세요! 몇 분이세요?</p>
              <p><span className="speaker a">{t('손님', 'Customer')}:</span> 두 명이요.</p>
              <p><span className="speaker b">{t('직원', 'Staff')}:</span> 이쪽으로 앉으세요. 메뉴판 여기 있습니다.</p>
              <p><span className="speaker a">{t('손님', 'Customer')}:</span> 여기 인기 메뉴가 뭐예요?</p>
              <p><span className="speaker b">{t('직원', 'Staff')}:</span> 비빔밥이랑 불고기가 인기 많아요.</p>
              <p><span className="speaker a">{t('손님', 'Customer')}:</span> 비빔밥 하나, 불고기 하나 주세요.</p>
              <p><span className="speaker b">{t('직원', 'Staff')}:</span> 네, 잠시만 기다려 주세요.</p>
            </div>
            <p className="translation dialogue-translation">{t('', 'Staff: Welcome! How many?\nCustomer: Two.\nStaff: Please sit here. Here is the menu.\nCustomer: What is popular here?\nStaff: Bibimbap and bulgogi are popular.\nCustomer: One bibimbap and one bulgogi, please.\nStaff: OK, please wait a moment.')}</p>
          </div>
        </div>
      </section>

      <section className="lesson-section" data-aos="fade-up">
        <div className="container">
          <div className="lesson-nav">
            <Link to="/conversation/travel" className="btn btn-secondary">{t('← 이전: 여행', '← Previous: Travel')}</Link>
            <Link to="/conversation/phone" className="btn btn-primary">{t('다음: 전화 →', 'Next: Phone →')}</Link>
          </div>
        </div>
      </section>
      </PageLayout>
    </>
  );
}
