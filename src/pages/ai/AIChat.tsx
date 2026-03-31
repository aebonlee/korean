import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';
import { useLanguage } from '../../contexts/LanguageContext';
import ChatBot from '../../components/ai/ChatBot';
import ApiKeySetup from '../../components/ai/ApiKeySetup';

export default function AIChat() {
  const { t } = useLanguage();
  const [hasKey, setHasKey] = useState(() => !!localStorage.getItem('korean-pro-openai-key'));

  return (
    <>
      <SEOHead
        title={String(t('AI 한국어 튜터 - Korean Pro', 'AI Korean Tutor - Korean Pro'))}
        description={String(t('AI와 한국어로 대화하며 연습하세요', 'Practice Korean by chatting with AI'))}
      />

      <div className="page-header">
        <div className="page-header__inner">
          <nav className="page-header__breadcrumb">
            <Link to="/">{t('홈', 'Home')}</Link>
            <span className="breadcrumb-sep">/</span>
            <span className="breadcrumb-current">{t('AI 채팅', 'AI Chat')}</span>
          </nav>
          <h1 className="page-header__title">{t('AI 한국어 튜터', 'AI Korean Tutor')}</h1>
          <p className="page-header__description">
            {t('AI와 한국어로 대화하며 연습하세요', 'Practice Korean by chatting with AI')}
          </p>
        </div>
      </div>

      <div className="page-content">
        <div className="page-content__inner">
          {hasKey ? <ChatBot /> : <ApiKeySetup onApiKeySet={() => setHasKey(true)} />}
        </div>
      </div>
    </>
  );
}
