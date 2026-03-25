import { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';
import { useLanguage } from '../../contexts/LanguageContext';
import SpeechPractice from '../../components/speech/SpeechPractice';
import useAOS from '../../hooks/useAOS';

const PRACTICE_SENTENCES = [
  {
    id: 'greetings',
    categoryKo: '기본 인사',
    categoryEn: 'Basic Greetings',
    icon: 'fa-hand-wave',
    sentences: [
      { text: '안녕하세요', meaning: 'Hello (formal)', meaningEn: 'Hello (formal)' },
      { text: '감사합니다', meaning: 'Thank you (formal)', meaningEn: 'Thank you (formal)' },
      { text: '만나서 반갑습니다', meaning: 'Nice to meet you', meaningEn: 'Nice to meet you' },
      { text: '안녕히 가세요', meaning: 'Goodbye (to person leaving)', meaningEn: 'Goodbye (to person leaving)' },
      { text: '죄송합니다', meaning: 'I am sorry (formal)', meaningEn: 'I am sorry (formal)' },
      { text: '실례합니다', meaning: 'Excuse me', meaningEn: 'Excuse me' },
    ],
  },
  {
    id: 'daily',
    categoryKo: '일상 대화',
    categoryEn: 'Daily Conversation',
    icon: 'fa-comments',
    sentences: [
      { text: '오늘 날씨가 좋아요', meaning: 'The weather is nice today', meaningEn: 'The weather is nice today' },
      { text: '밥 먹었어요?', meaning: 'Have you eaten?', meaningEn: 'Have you eaten?' },
      { text: '어디에 가요?', meaning: 'Where are you going?', meaningEn: 'Where are you going?' },
      { text: '지금 몇 시예요?', meaning: 'What time is it now?', meaningEn: 'What time is it now?' },
      { text: '주말에 뭐 해요?', meaning: 'What do you do on weekends?', meaningEn: 'What do you do on weekends?' },
      { text: '요즘 어떻게 지내요?', meaning: 'How have you been?', meaningEn: 'How have you been lately?' },
    ],
  },
  {
    id: 'ordering',
    categoryKo: '주문하기',
    categoryEn: 'Ordering',
    icon: 'fa-utensils',
    sentences: [
      { text: '커피 한 잔 주세요', meaning: 'One coffee, please', meaningEn: 'One coffee, please' },
      { text: '메뉴 좀 보여주세요', meaning: 'Please show me the menu', meaningEn: 'Please show me the menu' },
      { text: '이거 얼마예요?', meaning: 'How much is this?', meaningEn: 'How much is this?' },
      { text: '계산해 주세요', meaning: 'Check, please', meaningEn: 'Check, please' },
      { text: '포장해 주세요', meaning: 'To go, please', meaningEn: 'To go, please' },
      { text: '맵지 않게 해 주세요', meaning: 'Not too spicy, please', meaningEn: 'Please make it not spicy' },
    ],
  },
  {
    id: 'study',
    categoryKo: '한국어 학습',
    categoryEn: 'Korean Study',
    icon: 'fa-book-open',
    sentences: [
      { text: '한국어를 공부하고 있어요', meaning: 'I am studying Korean', meaningEn: 'I am studying Korean' },
      { text: '다시 한 번 말해 주세요', meaning: 'Please say it one more time', meaningEn: 'Please say it one more time' },
      { text: '천천히 말해 주세요', meaning: 'Please speak slowly', meaningEn: 'Please speak slowly' },
      { text: '이 단어는 무슨 뜻이에요?', meaning: 'What does this word mean?', meaningEn: 'What does this word mean?' },
      { text: '한국어로 어떻게 말해요?', meaning: 'How do you say it in Korean?', meaningEn: 'How do you say it in Korean?' },
      { text: '발음이 맞아요?', meaning: 'Is the pronunciation correct?', meaningEn: 'Is my pronunciation correct?' },
    ],
  },
  {
    id: 'travel',
    categoryKo: '여행 회화',
    categoryEn: 'Travel',
    icon: 'fa-plane-departure',
    sentences: [
      { text: '화장실이 어디에 있어요?', meaning: 'Where is the restroom?', meaningEn: 'Where is the restroom?' },
      { text: '이 근처에 지하철역이 있어요?', meaning: 'Is there a subway station nearby?', meaningEn: 'Is there a subway station nearby?' },
      { text: '사진 찍어 주실 수 있어요?', meaning: 'Can you take a photo for me?', meaningEn: 'Could you take a photo for me?' },
      { text: '여기서 얼마나 걸려요?', meaning: 'How long does it take from here?', meaningEn: 'How long does it take from here?' },
      { text: '와이파이 비밀번호가 뭐예요?', meaning: 'What is the Wi-Fi password?', meaningEn: 'What is the Wi-Fi password?' },
      { text: '택시 불러 주세요', meaning: 'Please call a taxi', meaningEn: 'Please call me a taxi' },
    ],
  },
];

export default function SpeechPage() {
  const { language, t } = useLanguage();
  const [selectedSentence, setSelectedSentence] = useState(PRACTICE_SENTENCES[0].sentences[0]);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const sidebarRef = useRef(null);
  useAOS();

  // Scroll active sentence into view in sidebar
  useEffect(() => {
    if (!sidebarRef.current) return;
    const active = sidebarRef.current.querySelector('.speech-sidebar__sentence--active');
    if (active) active.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [selectedSentence]);

  const handleSelect = useCallback((catIdx, sentence) => {
    setSelectedCategory(catIdx);
    setSelectedSentence(sentence);
  }, []);

  return (
    <>
      <SEOHead
        title={t('발음 연습 - Korean Pro', 'Speech Practice - Korean Pro')}
        description={t('한국어 발음을 연습하고 실시간 피드백을 받으세요.', 'Practice Korean pronunciation and get real-time feedback.')}
      />

      <section className="page-header" data-aos="fade-up">
        <div className="container">
          <div className="page-header__breadcrumb">
            <Link to="/">{t('홈', 'Home')}</Link>
            <i className="fas fa-chevron-right"></i>
            <span>{t('발음 연습', 'Speech Practice')}</span>
          </div>
          <h1 className="page-header__title">{t('발음 연습', 'Speech Practice')}</h1>
          <p className="page-header__description">
            {t(
              '마이크 버튼을 누르고 문장을 따라 읽으면 AI가 정확도를 측정합니다.',
              'Press the mic button and read the sentence aloud. AI will measure your accuracy.'
            )}
          </p>
        </div>
      </section>

      {/* Mobile: Category chips (horizontal scroll) */}
      <div className="speech-mobile-nav">
        <div className="container">
          <div className="speech-mobile-nav__cats">
            {PRACTICE_SENTENCES.map((cat, idx) => (
              <button
                key={cat.id}
                className={`speech-mobile-nav__cat${selectedCategory === idx ? ' speech-mobile-nav__cat--active' : ''}`}
                onClick={() => {
                  setSelectedCategory(idx);
                  setSelectedSentence(PRACTICE_SENTENCES[idx].sentences[0]);
                }}
              >
                <i className={`fas ${cat.icon}`}></i> {language === 'ko' ? cat.categoryKo : cat.categoryEn}
              </button>
            ))}
          </div>
          <div className="speech-mobile-nav__sentences">
            {PRACTICE_SENTENCES[selectedCategory].sentences.map((s, idx) => (
              <button
                key={idx}
                className={`speech-mobile-nav__sentence${selectedSentence.text === s.text ? ' speech-mobile-nav__sentence--active' : ''}`}
                onClick={() => setSelectedSentence(s)}
              >
                {s.text}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="page-layout">
        <div className="container">
          <div className="content-layout">
            {/* Desktop Sidebar: Sentence selector */}
            <aside className="content-sidebar" ref={sidebarRef}>
              <nav className="sidebar-nav">
                <button
                  className="sidebar-nav__toggle"
                  onClick={() => setSidebarOpen((v) => !v)}
                >
                  <i className="fas fa-microphone"></i>&nbsp;
                  {t('연습 문장', 'Practice Sentences')}
                  <i className={`fas fa-chevron-${sidebarOpen ? 'up' : 'down'}`} />
                </button>
                {sidebarOpen && (
                  <div className="speech-sidebar">
                    {PRACTICE_SENTENCES.map((cat, catIdx) => (
                      <div key={cat.id} className="speech-sidebar__group">
                        <div
                          className={`speech-sidebar__cat${selectedCategory === catIdx ? ' speech-sidebar__cat--active' : ''}`}
                          onClick={() => {
                            setSelectedCategory(catIdx);
                            setSelectedSentence(PRACTICE_SENTENCES[catIdx].sentences[0]);
                          }}
                        >
                          <i className={`fas ${cat.icon}`}></i>
                          <span>{language === 'ko' ? cat.categoryKo : cat.categoryEn}</span>
                          <span className="speech-sidebar__count">{cat.sentences.length}</span>
                        </div>
                        {selectedCategory === catIdx && (
                          <ul className="speech-sidebar__sentences">
                            {cat.sentences.map((s, sIdx) => (
                              <li key={sIdx}>
                                <button
                                  className={`speech-sidebar__sentence${selectedSentence.text === s.text ? ' speech-sidebar__sentence--active' : ''}`}
                                  onClick={() => handleSelect(catIdx, s)}
                                >
                                  {s.text}
                                </button>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </nav>
            </aside>

            {/* Main Content */}
            <main className="content-main">
              {/* Speech Practice Widget */}
              <section id="practice" className="lesson-section">
                <div className="container">
                  <SpeechPractice
                    targetText={selectedSentence.text}
                    targetMeaning={t(selectedSentence.meaning, selectedSentence.meaningEn)}
                  />
                </div>
              </section>

              {/* Pronunciation Tips */}
              <section id="tips" className="lesson-section">
                <div className="container">
                  <div className="tip-box">
                    <h4>{t(<><i className="fas fa-lightbulb"></i> 발음 연습 팁</>, <><i className="fas fa-lightbulb"></i> Pronunciation Tips</>)}</h4>
                    <ul>
                      <li>{t('조용한 환경에서 연습하면 더 정확한 결과를 얻을 수 있습니다.', 'Practicing in a quiet environment gives more accurate results.')}</li>
                      <li>{t('Chrome 브라우저에서 가장 잘 작동합니다.', 'Works best in Chrome browser.')}</li>
                      <li>{t('천천히, 또렷하게 발음하세요. 속도보다 정확성이 중요합니다.', 'Speak slowly and clearly. Accuracy is more important than speed.')}</li>
                      <li>{t('같은 문장을 여러 번 반복하면 발음이 자연스러워집니다.', 'Repeating the same sentence makes pronunciation more natural.')}</li>
                      <li>{t('80% 이상의 정확도가 나올 때까지 연습하세요.', 'Practice until you achieve 80% or higher accuracy.')}</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Key Pronunciation Rules */}
              <section id="rules" className="lesson-section">
                <div className="container">
                  <h2>{t('핵심 발음 규칙', 'Key Pronunciation Rules')}</h2>
                  <div className="example-box">
                    <table className="expression-table">
                      <thead>
                        <tr>
                          <th>{t('규칙', 'Rule')}</th>
                          <th>{t('예시', 'Example')}</th>
                          <th>{t('발음', 'Pronunciation')}</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{t('연음 (Liaison)', 'Liaison')}</td>
                          <td>한국어</td>
                          <td>[한구거]</td>
                        </tr>
                        <tr>
                          <td>{t('경음화 (Tensification)', 'Tensification')}</td>
                          <td>학교</td>
                          <td>[학꾜]</td>
                        </tr>
                        <tr>
                          <td>{t('비음화 (Nasalization)', 'Nasalization')}</td>
                          <td>감사합니다</td>
                          <td>[감사함니다]</td>
                        </tr>
                        <tr>
                          <td>{t('구개음화 (Palatalization)', 'Palatalization')}</td>
                          <td>같이</td>
                          <td>[가치]</td>
                        </tr>
                        <tr>
                          <td>{t('ㅎ 탈락 (H-deletion)', 'H-deletion')}</td>
                          <td>좋아요</td>
                          <td>[조아요]</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
