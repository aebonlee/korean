import { useState, useEffect } from 'react';
import SEOHead from '../components/SEOHead';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

const API_KEY_STORAGE_KEY = 'koreanpro_openai_api_key';

function Settings() {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  const [apiKey, setApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [apiKeyStatus, setApiKeyStatus] = useState('not_registered');
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    try {
      const storedKey = localStorage.getItem(API_KEY_STORAGE_KEY);
      if (storedKey) {
        setApiKey(storedKey);
        setApiKeyStatus('registered');
      }
    } catch {
      setApiKeyStatus('not_registered');
    }
  }, []);

  const handleSaveApiKey = () => {
    if (!apiKey.trim()) {
      setSaveMessage(t('API 키를 입력해주세요.', 'Please enter your API key.'));
      return;
    }

    if (!apiKey.trim().startsWith('sk-')) {
      setSaveMessage(t('올바른 OpenAI API 키 형식이 아닙니다. (sk-로 시작해야 합니다)', 'Invalid OpenAI API key format. (Must start with sk-)'));
      return;
    }

    try {
      localStorage.setItem(API_KEY_STORAGE_KEY, apiKey.trim());
      setApiKeyStatus('registered');
      setSaveMessage(t('API 키가 저장되었습니다.', 'API key saved.'));
      setTimeout(() => setSaveMessage(''), 3000);
    } catch {
      setSaveMessage(t('API 키 저장에 실패했습니다.', 'Failed to save API key.'));
    }
  };

  const handleDeleteApiKey = () => {
    try {
      localStorage.removeItem(API_KEY_STORAGE_KEY);
      setApiKey('');
      setApiKeyStatus('not_registered');
      setShowApiKey(false);
      setSaveMessage(t('API 키가 삭제되었습니다.', 'API key deleted.'));
      setTimeout(() => setSaveMessage(''), 3000);
    } catch {
      setSaveMessage(t('API 키 삭제에 실패했습니다.', 'Failed to delete API key.'));
    }
  };

  return (
    <>
      <SEOHead
        title={t('설정 - Korean Pro', 'Settings - Korean Pro')}
        description={t('Korean Pro 설정. API 키, 테마, 언어를 관리하세요.', 'Korean Pro settings. Manage your API key, theme, and language.')}
      />

      <div className="settings">
        <h1 className="settings__title">{t('설정', 'Settings')}</h1>

        {/* API Key Management */}
        <section className="settings__section">
          <h2 className="settings__section-title">{t('API 키 관리', 'API Key Management')}</h2>
          <p className="settings__section-description">
            {t(
              'AI 채팅 기능을 사용하려면 OpenAI API 키가 필요합니다. API 키는 브라우저의 로컬 스토리지에 안전하게 저장됩니다.',
              'An OpenAI API key is required to use AI chat features. Your API key is securely stored in browser local storage.'
            )}
          </p>

          <div className="settings__status">
            <span className={`settings__status-dot ${apiKeyStatus === 'registered' ? 'settings__status-dot--active' : 'settings__status-dot--inactive'}`} />
            <span className="settings__status-text">
              {apiKeyStatus === 'registered' ? t('API 키 등록됨', 'API Key Registered') : t('API 키 미등록', 'API Key Not Registered')}
            </span>
          </div>

          <div className="settings__field">
            <label htmlFor="api-key" className="settings__label">OpenAI API Key</label>
            <div className="settings__input-group">
              <input
                id="api-key"
                type={showApiKey ? 'text' : 'password'}
                className="settings__input"
                placeholder="sk-..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                autoComplete="off"
              />
              <button
                type="button"
                className="settings__toggle-btn"
                onClick={() => setShowApiKey(!showApiKey)}
              >
                {showApiKey ? t('숨기기', 'Hide') : t('보기', 'Show')}
              </button>
            </div>
          </div>

          {saveMessage && (
            <p className={`settings__message ${saveMessage.includes('실패') || saveMessage.includes('형식') || saveMessage.includes('입력') || saveMessage.includes('Failed') || saveMessage.includes('Invalid') || saveMessage.includes('Please') ? 'settings__message--error' : 'settings__message--success'}`} role="alert">
              {saveMessage}
            </p>
          )}

          <div className="settings__actions">
            <button type="button" className="btn btn--primary" onClick={handleSaveApiKey}>
              {t('저장', 'Save')}
            </button>
            {apiKeyStatus === 'registered' && (
              <button type="button" className="btn btn--danger" onClick={handleDeleteApiKey}>
                {t('키 삭제', 'Delete Key')}
              </button>
            )}
          </div>

          <div className="settings__guide">
            <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="settings__guide-link">
              {t('OpenAI API 키 발급 가이드 →', 'OpenAI API Key Guide →')}
            </a>
          </div>
        </section>

        {/* Theme Settings */}
        <section className="settings__section">
          <h2 className="settings__section-title">{t('테마 설정', 'Theme Settings')}</h2>
          <p className="settings__section-description">{t('앱의 테마를 선택하세요.', 'Choose your app theme.')}</p>
          <div className="settings__options">
            {['light', 'dark', 'system'].map((themeOption) => (
              <button
                key={themeOption}
                type="button"
                className={`settings__option ${theme === themeOption ? 'settings__option--active' : ''}`}
                onClick={() => setTheme(themeOption)}
              >
                <span className="settings__option-icon">
                  {themeOption === 'light' ? '☀️' : themeOption === 'dark' ? '🌙' : '💻'}
                </span>
                <span className="settings__option-label">
                  {themeOption === 'light' ? t('라이트 모드', 'Light Mode') : themeOption === 'dark' ? t('다크 모드', 'Dark Mode') : t('시스템 설정', 'System')}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Language Settings */}
        <section className="settings__section">
          <h2 className="settings__section-title">{t('언어 설정', 'Language Settings')}</h2>
          <p className="settings__section-description">{t('인터페이스 언어를 선택하세요.', 'Choose your interface language.')}</p>
          <div className="settings__options">
            <button
              type="button"
              className={`settings__option ${language === 'ko' ? 'settings__option--active' : ''}`}
              onClick={() => setLanguage('ko')}
            >
              <span className="settings__option-label">한국어</span>
            </button>
            <button
              type="button"
              className={`settings__option ${language === 'en' ? 'settings__option--active' : ''}`}
              onClick={() => setLanguage('en')}
            >
              <span className="settings__option-label">English</span>
            </button>
          </div>
        </section>
      </div>
    </>
  );
}

export default Settings;
