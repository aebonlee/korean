import { Link } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';
import PageLayout from '../../components/PageLayout';
import { useLanguage } from '../../contexts/LanguageContext';
import useAOS from '../../hooks/useAOS';

export default function Shopping() {
  const { language, t } = useLanguage();
  useAOS();

  const sections = [
    { id: 'basic-shopping', ko: '기본 쇼핑 표현', en: 'Basic Shopping Expressions' },
    { id: 'shopping-dialogue', ko: '실전 대화', en: 'Dialogue' },
  ];

  return (
    <>
      <SEOHead title={t('쇼핑 & 주문 - Korean Pro', 'Shopping & Ordering - Korean Pro')} description={t('한국어 쇼핑 표현을 배우세요.', 'Learn Korean shopping expressions.')} />
      <section className="page-header" data-aos="fade-up">
        <div className="container">
          <div className="page-header__breadcrumb">
            <Link to="/">{t('홈', 'Home')}</Link><i className="fas fa-chevron-right"></i>
            <Link to="/conversation">{t('일상 회화', 'Conversation')}</Link><i className="fas fa-chevron-right"></i>
            <span>{t('쇼핑 & 주문', 'Shopping')}</span>
          </div>
          <h1 className="page-header__title">{language === 'ko' ? <>쇼핑 & 주문 <span className="page-header__en">(Shopping)</span></> : 'Shopping & Ordering'}</h1>
          <p className="page-header__description">{t('한국에서 쇼핑할 때 필요한 필수 표현을 배워보세요.', 'Learn essential expressions for shopping in Korea.')}</p>
        </div>
      </section>

      <PageLayout sections={sections} category="conversation">
      <section className="lesson-section" id="basic-shopping" data-aos="fade-up">
        <div className="container">
          <h2>{t('1. 기본 쇼핑 표현', '1. Basic Shopping Expressions')}</h2>
          <div className="example-box" data-aos="fade-up">
            <table className="expression-table">
              <thead><tr><th>{t('한국어', 'Korean')}</th><th>{t('발음', 'Romanization')}</th><th>{t('영어', 'English')}</th></tr></thead>
              <tbody>
                <tr><td><strong>이거 얼마예요?</strong></td><td>igeo eolmayeyo?</td><td>How much is this?</td></tr>
                <tr><td><strong>좀 더 싸게 해주세요.</strong></td><td>jom deo ssage haejuseyo</td><td>Please make it cheaper.</td></tr>
                <tr><td><strong>카드 돼요?</strong></td><td>kadeu dwaeyo?</td><td>Can I pay by card?</td></tr>
                <tr><td><strong>이거 주세요.</strong></td><td>igeo juseyo</td><td>Give me this, please.</td></tr>
                <tr><td><strong>다른 색 있어요?</strong></td><td>dareun saek isseoyo?</td><td>Do you have another color?</td></tr>
                <tr><td><strong>입어 봐도 돼요?</strong></td><td>ibeo bwado dwaeyo?</td><td>Can I try it on?</td></tr>
                <tr><td><strong>교환/환불 가능해요?</strong></td><td>gyohwan/hwanbul ganeunghaeyo?</td><td>Can I exchange/refund?</td></tr>
                <tr><td><strong>영수증 주세요.</strong></td><td>yeongsujeung juseyo</td><td>Receipt, please.</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="lesson-section" id="shopping-dialogue" data-aos="fade-up">
        <div className="container">
          <h2>{t('2. 실전 대화 - 명동에서 쇼핑', '2. Dialogue - Shopping in Myeongdong')}</h2>
          <div className="example-box" data-aos="fade-up">
            <div className="dialogue">
              <p><span className="speaker a">{t('손님', 'Customer')}:</span> 안녕하세요, 이 티셔츠 얼마예요?</p>
              <p><span className="speaker b">{t('직원', 'Staff')}:</span> 25,000원이에요.</p>
              <p><span className="speaker a">{t('손님', 'Customer')}:</span> 좀 비싸네요. 할인 돼요?</p>
              <p><span className="speaker b">{t('직원', 'Staff')}:</span> 두 개 사시면 40,000원에 해드릴게요.</p>
              <p><span className="speaker a">{t('손님', 'Customer')}:</span> 좋아요! 이 두 개 주세요. 카드 돼요?</p>
              <p><span className="speaker b">{t('직원', 'Staff')}:</span> 네, 카드도 되고 현금도 돼요.</p>
            </div>
            <p className="translation dialogue-translation">{t('', 'Customer: Hello, how much is this T-shirt?\nStaff: It is 25,000 won.\nCustomer: That is expensive. Any discount?\nStaff: If you buy two, I can give them for 40,000 won.\nCustomer: Great! Give me these two. Card OK?\nStaff: Yes, we accept both card and cash.')}</p>
          </div>
        </div>
      </section>

      <section className="lesson-section" data-aos="fade-up">
        <div className="container">
          <div className="lesson-nav">
            <Link to="/conversation/daily-life" className="btn btn-secondary">{t('← 이전: 일상생활', '← Previous: Daily Life')}</Link>
            <Link to="/conversation/travel" className="btn btn-primary">{t('다음: 여행 →', 'Next: Travel →')}</Link>
          </div>
        </div>
      </section>
      </PageLayout>
    </>
  );
}
