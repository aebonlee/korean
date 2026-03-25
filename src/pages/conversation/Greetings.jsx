import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';
import { useLanguage } from '../../contexts/LanguageContext';
import useAOS from '../../hooks/useAOS';

export default function Greetings() {
  const { language, t } = useLanguage();
  const [showAnswers, setShowAnswers] = useState(false);
  useAOS();

  return (
    <>
      <SEOHead title={t('인사 & 소개 - Korean Pro', 'Greetings & Introductions - Korean Pro')} description={t('한국어 인사와 자기소개 표현을 배워보세요.', 'Learn Korean greetings and self-introduction expressions.')} />

      <section className="page-header" data-aos="fade-up">
        <div className="container">
          <div className="page-header__breadcrumb">
            <Link to="/">{t('홈', 'Home')}</Link><i className="fas fa-chevron-right"></i>
            <Link to="/conversation">{t('일상 회화', 'Conversation')}</Link><i className="fas fa-chevron-right"></i>
            <span>{t('인사 & 소개', 'Greetings')}</span>
          </div>
          <h1 className="page-header__title">{language === 'ko' ? <>인사 & 소개 <span className="page-header__en">(Greetings & Introductions)</span></> : 'Greetings & Introductions'}</h1>
          <p className="page-header__description">{t('한국어에서 인사는 관계와 상황에 따라 달라집니다.', 'Korean greetings vary based on relationships and situations.')}<br />{t('존댓말과 반말의 차이, 상황별 인사법을 배워보세요.', 'Learn the differences between formal and informal speech.')}</p>
        </div>
      </section>

      <section className="lesson-section" data-aos="fade-up">
        <div className="container">
          <h2>{t('1. 기본 인사', '1. Basic Greetings')}</h2>
          <div className="example-box" data-aos="fade-up">
            <table className="expression-table">
              <thead><tr><th>{t('한국어', 'Korean')}</th><th>{t('발음', 'Romanization')}</th><th>{t('영어', 'English')}</th><th>{t('격식', 'Formality')}</th></tr></thead>
              <tbody>
                <tr><td><strong>안녕하세요</strong></td><td>annyeonghaseyo</td><td>Hello</td><td>{t('존댓말', 'Formal')}</td></tr>
                <tr><td><strong>안녕</strong></td><td>annyeong</td><td>Hi / Bye</td><td>{t('반말', 'Informal')}</td></tr>
                <tr><td><strong>안녕히 가세요</strong></td><td>annyeonghi gaseyo</td><td>Goodbye (to one leaving)</td><td>{t('존댓말', 'Formal')}</td></tr>
                <tr><td><strong>안녕히 계세요</strong></td><td>annyeonghi gyeseyo</td><td>Goodbye (to one staying)</td><td>{t('존댓말', 'Formal')}</td></tr>
                <tr><td><strong>감사합니다</strong></td><td>gamsahamnida</td><td>Thank you</td><td>{t('존댓말', 'Formal')}</td></tr>
                <tr><td><strong>죄송합니다</strong></td><td>joesonghamnida</td><td>I am sorry</td><td>{t('존댓말', 'Formal')}</td></tr>
                <tr><td><strong>잘 지내세요?</strong></td><td>jal jinaeseyo?</td><td>How are you?</td><td>{t('존댓말', 'Formal')}</td></tr>
              </tbody>
            </table>
          </div>
          <div className="tip-box" data-aos="fade-up">
            <h4>{t('💡 문화 팁', '💡 Cultural Tip')}</h4>
            <p>{t('한국에서는 나이가 많거나 처음 만나는 사람에게 반드시 존댓말을 사용합니다.', 'In Korea, you must use formal speech with older people or strangers.')}<br />{t('인사할 때 가볍게 고개를 숙이는 것도 중요한 예절입니다.', 'Bowing slightly when greeting is also important etiquette.')}</p>
          </div>
        </div>
      </section>

      <section className="lesson-section" data-aos="fade-up">
        <div className="container">
          <h2>{t('2. 자기소개', '2. Self-Introduction')}</h2>
          <div className="example-box" data-aos="fade-up">
            <table className="expression-table">
              <thead><tr><th>{t('한국어', 'Korean')}</th><th>{t('발음', 'Romanization')}</th><th>{t('영어', 'English')}</th></tr></thead>
              <tbody>
                <tr><td><strong>저는 [이름]입니다.</strong></td><td>jeoneun [name]-imnida</td><td>I am [name].</td></tr>
                <tr><td><strong>저는 [나라]에서 왔습니다.</strong></td><td>jeoneun [country]-eseo wasseumnida</td><td>I am from [country].</td></tr>
                <tr><td><strong>만나서 반갑습니다.</strong></td><td>mannaseo bangapseumnida</td><td>Nice to meet you.</td></tr>
                <tr><td><strong>한국어를 공부하고 있어요.</strong></td><td>hangugeoreul gongbuhago isseoyo</td><td>I am studying Korean.</td></tr>
                <tr><td><strong>잘 부탁드립니다.</strong></td><td>jal butakdeurimnida</td><td>Please take care of me.</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="lesson-section" data-aos="fade-up">
        <div className="container">
          <h2>{t('3. 실전 대화', '3. Real Conversation')}</h2>
          <div className="example-box" data-aos="fade-up">
            <h4>{t('대화 - 교실에서 처음 만남', 'Dialogue - Meeting in Class')}</h4>
            <div className="dialogue">
              <p><span className="speaker a">민수:</span> 안녕하세요! 저는 김민수입니다.</p>
              <p><span className="speaker b">Linh:</span> 안녕하세요! 저는 Linh이에요. 베트남에서 왔어요.</p>
              <p><span className="speaker a">민수:</span> 아, 반가워요! 한국어 공부한 지 얼마나 됐어요?</p>
              <p><span className="speaker b">Linh:</span> 3개월 됐어요. 아직 많이 부족해요.</p>
              <p><span className="speaker a">민수:</span> 아니에요, 한국어 잘하시네요! 잘 부탁드립니다.</p>
              <p><span className="speaker b">Linh:</span> 감사합니다! 저도 잘 부탁드려요.</p>
            </div>
            <p className="translation dialogue-translation">{t('', 'Minsu: Hello! I am Kim Minsu.\nLinh: Hello! I am Linh. I am from Vietnam.\nMinsu: Oh, nice to meet you! How long have you been studying Korean?\nLinh: It has been 3 months. I still have a lot to learn.\nMinsu: No, your Korean is great! Nice to meet you.\nLinh: Thank you! Nice to meet you too.')}</p>
          </div>
        </div>
      </section>

      <section className="lesson-section" data-aos="fade-up">
        <div className="container">
          <h2>{t('4. 연습 문제', '4. Practice')}</h2>
          <div className="practice-questions" data-aos="fade-up">
            <div className="practice-item">
              <p className="practice-question"><strong>Q1.</strong> {t('"안녕하세요"는 어떤 상황에서 사용하나요?', 'When do you use "안녕하세요"?')}</p>
              {showAnswers && <p className="practice-answer"><strong>{t('정답', 'Answer')}:</strong> {t('존댓말 인사. 누구에게나 사용 가능.', 'Formal greeting. Can be used with anyone.')}</p>}
            </div>
            <div className="practice-item">
              <p className="practice-question"><strong>Q2.</strong> {t('떠나는 사람에게 하는 인사는?', 'What do you say to someone who is leaving?')}</p>
              {showAnswers && <p className="practice-answer"><strong>{t('정답', 'Answer')}:</strong> 안녕히 가세요</p>}
            </div>
            <div className="practice-item">
              <p className="practice-question"><strong>Q3.</strong> {t('"만나서 반갑습니다"를 영어로 번역하면?', 'Translate "만나서 반갑습니다" to English.')}</p>
              {showAnswers && <p className="practice-answer"><strong>{t('정답', 'Answer')}:</strong> Nice to meet you.</p>}
            </div>
          </div>
          <button className="btn btn-primary mt-lg" onClick={() => setShowAnswers(!showAnswers)}>
            {showAnswers ? t('정답 숨기기', 'Hide Answers') : t('정답 보기', 'Show Answers')}
          </button>
        </div>
      </section>

      <section className="lesson-section" data-aos="fade-up">
        <div className="container">
          <div className="lesson-nav">
            <Link to="/conversation" className="btn btn-secondary">{t('← 목록으로', '← Back to List')}</Link>
            <Link to="/conversation/daily-life" className="btn btn-primary">{t('다음: 일상생활 →', 'Next: Daily Life →')}</Link>
          </div>
        </div>
      </section>
    </>
  );
}
