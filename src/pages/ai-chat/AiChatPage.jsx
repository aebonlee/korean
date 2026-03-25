import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';
import { useLanguage } from '../../contexts/LanguageContext';
import ChatBot from '../../components/ai/ChatBot';
import ApiKeySetup from '../../components/ai/ApiKeySetup';
import useAOS from '../../hooks/useAOS';

const STORAGE_KEY = 'korean-pro-openai-key';

const CONVERSATION_STARTERS = [
  { ko: '안녕하세요! 자기소개를 해 주세요.', en: 'Hello! Please introduce yourself.' },
  { ko: '오늘 날씨가 어때요?', en: "How's the weather today?" },
  { ko: '한국 음식 중에 뭐가 제일 맛있어요?', en: "What's the most delicious Korean food?" },
  { ko: '주말에 보통 뭐 해요?', en: 'What do you usually do on weekends?' },
  { ko: '한국어를 배우는 이유가 뭐예요?', en: 'Why are you learning Korean?' },
  { ko: '"감사합니다"와 "고마워요"의 차이가 뭐예요?', en: 'What\'s the difference between "감사합니다" and "고마워요"?' },
];

export default function AiChatPage() {
  const { t } = useLanguage();
  const [apiKey, setApiKey] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) || '';
    } catch {
      return '';
    }
  });
  useAOS();

  const handleApiKeySet = (key) => {
    setApiKey(key);
  };

  return (
    <>
      <SEOHead
        title={t('AI 한국어 튜터 - Korean Pro', 'AI Korean Tutor - Korean Pro')}
        description={t('AI와 한국어로 대화하며 실시간 피드백을 받으세요.', 'Practice Korean by chatting with AI and get real-time feedback.')}
      />

      <section className="page-header" data-aos="fade-up">
        <div className="container">
          <div className="page-header__breadcrumb">
            <Link to="/">{t('홈', 'Home')}</Link>
            <i className="fas fa-chevron-right"></i>
            <span>{t('AI 채팅', 'AI Chat')}</span>
          </div>
          <h1 className="page-header__title">{t('AI 한국어 튜터', 'AI Korean Tutor')}</h1>
          <p className="page-header__description">
            {t(
              'AI 튜터와 한국어로 대화하며 실시간으로 피드백을 받으세요. 문법 교정, 어휘 제안, 발음 도움 등을 받을 수 있습니다.',
              'Chat with an AI tutor in Korean and get real-time feedback. Get grammar corrections, vocabulary suggestions, and pronunciation help.'
            )}
          </p>
        </div>
      </section>

      {/* API Key Setup */}
      <section className="lesson-section" data-aos="fade-up">
        <div className="container">
          <ApiKeySetup onApiKeySet={handleApiKeySet} />
        </div>
      </section>

      {/* Instructions */}
      {!apiKey && (
        <section className="lesson-section" data-aos="fade-up">
          <div className="container">
            <div className="example-box">
              <h3>{t('사용 방법', 'How to Use')}</h3>
              <ol>
                <li>{t('위에서 OpenAI API 키를 입력하세요.', 'Enter your OpenAI API key above.')}</li>
                <li>{t('한국어로 메시지를 입력하세요.', 'Type a message in Korean.')}</li>
                <li>{t('AI가 답변하고 실수를 교정해 줍니다.', 'AI will respond and correct your mistakes.')}</li>
                <li>{t('자연스러운 대화를 통해 한국어 실력을 향상시키세요!', 'Improve your Korean through natural conversation!')}</li>
              </ol>
            </div>
          </div>
        </section>
      )}

      {/* Chat Interface */}
      {apiKey && (
        <section className="lesson-section" data-aos="fade-up">
          <div className="container">
            <ChatBot apiKey={apiKey} />
          </div>
        </section>
      )}

      {/* Conversation Starters */}
      <section className="lesson-section" data-aos="fade-up">
        <div className="container">
          <h2>{t('대화 시작 아이디어', 'Conversation Starter Ideas')}</h2>
          <p>{t('무엇을 말해야 할지 모르겠다면, 아래 문장을 시도해 보세요:', "If you're not sure what to say, try these sentences:")}</p>
          <div className="expression-grid">
            {CONVERSATION_STARTERS.map((starter, index) => (
              <div key={index} className="expression-card" data-aos="fade-up" data-aos-delay={index * 50}>
                <p className="expression-card__korean">{starter.ko}</p>
                <p className="expression-card__english">{starter.en}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="lesson-section" data-aos="fade-up">
        <div className="container">
          <div className="tip-box">
            <h4>{t('💡 AI 채팅 팁', '💡 AI Chat Tips')}</h4>
            <ul>
              <li>{t('틀리는 것을 두려워하지 마세요! AI가 친절하게 교정해 줍니다.', "Don't be afraid of making mistakes! The AI will kindly correct you.")}</li>
              <li>{t('한국어와 영어를 섞어서 사용해도 괜찮습니다.', "It's okay to mix Korean and English.")}</li>
              <li>{t('"이 문장이 맞아요?"라고 물어보면 AI가 확인해 줍니다.', 'Ask "이 문장이 맞아요?" and the AI will check for you.')}</li>
              <li>{t('새로운 단어를 배우면 대화에서 바로 사용해 보세요.', 'When you learn new words, try using them right away in conversation.')}</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
