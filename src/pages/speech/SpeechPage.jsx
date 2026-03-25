import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';
import { useLanguage } from '../../contexts/LanguageContext';
import SpeechPractice from '../../components/speech/SpeechPractice';
import useAOS from '../../hooks/useAOS';

const PRACTICE_SENTENCES = [
  {
    categoryKo: '기본 인사',
    categoryEn: 'Basic Greetings',
    sentences: [
      { text: '안녕하세요', meaning: 'Hello (formal)', meaningEn: 'Hello (formal)' },
      { text: '감사합니다', meaning: 'Thank you (formal)', meaningEn: 'Thank you (formal)' },
      { text: '만나서 반갑습니다', meaning: 'Nice to meet you', meaningEn: 'Nice to meet you' },
      { text: '안녕히 가세요', meaning: 'Goodbye (to person leaving)', meaningEn: 'Goodbye (to person leaving)' },
    ],
  },
  {
    categoryKo: '일상 대화',
    categoryEn: 'Daily Conversation',
    sentences: [
      { text: '오늘 날씨가 좋아요', meaning: 'The weather is nice today', meaningEn: 'The weather is nice today' },
      { text: '밥 먹었어요?', meaning: 'Have you eaten?', meaningEn: 'Have you eaten?' },
      { text: '어디에 가요?', meaning: 'Where are you going?', meaningEn: 'Where are you going?' },
      { text: '지금 몇 시예요?', meaning: 'What time is it now?', meaningEn: 'What time is it now?' },
    ],
  },
  {
    categoryKo: '주문하기',
    categoryEn: 'Ordering',
    sentences: [
      { text: '커피 한 잔 주세요', meaning: 'One coffee, please', meaningEn: 'One coffee, please' },
      { text: '메뉴 좀 보여주세요', meaning: 'Please show me the menu', meaningEn: 'Please show me the menu' },
      { text: '이거 얼마예요?', meaning: 'How much is this?', meaningEn: 'How much is this?' },
      { text: '계산해 주세요', meaning: 'Check, please', meaningEn: 'Check, please' },
    ],
  },
  {
    categoryKo: '한국어 학습',
    categoryEn: 'Korean Study',
    sentences: [
      { text: '한국어를 공부하고 있어요', meaning: 'I am studying Korean', meaningEn: 'I am studying Korean' },
      { text: '다시 한 번 말해 주세요', meaning: 'Please say it one more time', meaningEn: 'Please say it one more time' },
      { text: '천천히 말해 주세요', meaning: 'Please speak slowly', meaningEn: 'Please speak slowly' },
      { text: '이 단어는 무슨 뜻이에요?', meaning: 'What does this word mean?', meaningEn: 'What does this word mean?' },
    ],
  },
];

export default function SpeechPage() {
  const { language, t } = useLanguage();
  const [selectedSentence, setSelectedSentence] = useState(PRACTICE_SENTENCES[0].sentences[0]);
  const [selectedCategory, setSelectedCategory] = useState(0);
  useAOS();

  return (
    <>
      <SEOHead
        title={t('발음 연습 - Korean Pro', 'Speech Practice - Korean Pro')}
        description={t('한국어 발음을 연습하고 실시간 피드백을 받으세요. 마이크를 사용하여 발음 정확도를 확인합니다.', 'Practice Korean pronunciation and get real-time feedback. Use your microphone to check pronunciation accuracy.')}
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
              '한국어 문장을 소리 내어 읽고 발음 정확도를 확인하세요. 마이크 버튼을 누르고 문장을 따라 읽으면 AI가 정확도를 측정합니다.',
              'Read Korean sentences aloud and check your pronunciation accuracy. Press the mic button and read the sentence to measure accuracy.'
            )}
          </p>
        </div>
      </section>

      {/* Speech Practice Component */}
      <section className="lesson-section" data-aos="fade-up">
        <div className="container">
          <SpeechPractice
            targetText={selectedSentence.text}
            targetMeaning={t(selectedSentence.meaning, selectedSentence.meaningEn)}
          />
        </div>
      </section>

      {/* Category Selection */}
      <section className="lesson-section" data-aos="fade-up">
        <div className="container">
          <h2>{t('연습 문장 선택', 'Select Practice Sentence')}</h2>

          {/* Category Tabs */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            {PRACTICE_SENTENCES.map((cat, idx) => (
              <button
                key={idx}
                className={`btn btn-sm ${selectedCategory === idx ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => {
                  setSelectedCategory(idx);
                  setSelectedSentence(PRACTICE_SENTENCES[idx].sentences[0]);
                }}
              >
                {language === 'ko' ? cat.categoryKo : cat.categoryEn}
              </button>
            ))}
          </div>

          {/* Sentence List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {PRACTICE_SENTENCES[selectedCategory].sentences.map((sentence, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedSentence(sentence)}
                data-aos="fade-up"
                data-aos-delay={idx * 50}
                style={{
                  textAlign: 'left',
                  padding: '1rem 1.25rem',
                  border: '2px solid',
                  borderColor: selectedSentence.text === sentence.text ? 'var(--primary)' : 'var(--border-color, #ddd)',
                  borderRadius: '8px',
                  backgroundColor: selectedSentence.text === sentence.text ? 'var(--bg-secondary, #e3f2fd)' : 'transparent',
                  cursor: 'pointer',
                }}
              >
                <p style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.25rem' }}>{sentence.text}</p>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  {t(sentence.meaning, sentence.meaningEn)}
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Pronunciation Tips */}
      <section className="lesson-section" data-aos="fade-up">
        <div className="container">
          <div className="tip-box">
            <h4>{t(<><i className="fas fa-lightbulb"></i> 발음 연습 팁</>, <><i className="fas fa-lightbulb"></i> Pronunciation Practice Tips</>)}</h4>
            <ul>
              <li>{t('조용한 환경에서 연습하면 더 정확한 결과를 얻을 수 있습니다.', 'Practicing in a quiet environment gives more accurate results.')}</li>
              <li>{t('Chrome 브라우저에서 가장 잘 작동합니다.', 'Works best in Chrome browser.')}</li>
              <li>{t('천천히, 또렷하게 발음하세요.', 'Speak slowly and clearly.')}<br />{t('속도보다 정확성이 중요합니다.', 'Accuracy is more important than speed.')}</li>
              <li>{t('같은 문장을 여러 번 반복하면 발음이 자연스러워집니다.', 'Repeating the same sentence multiple times makes pronunciation more natural.')}</li>
              <li>{t('80% 이상의 정확도가 나올 때까지 연습하세요.', 'Practice until you achieve 80% or higher accuracy.')}</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Key Pronunciation Rules */}
      <section className="lesson-section" data-aos="fade-up">
        <div className="container">
          <h2>{t('핵심 발음 규칙', 'Key Pronunciation Rules')}</h2>
          <div className="example-box" data-aos="fade-up">
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
    </>
  );
}
