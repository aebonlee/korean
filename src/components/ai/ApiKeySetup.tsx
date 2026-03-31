import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

const STORAGE_KEY = 'korean-pro-openai-key';

export default function ApiKeySetup({ onApiKeySet }: { onApiKeySet: (key: string) => void }) {
  const { t } = useLanguage();
  const [apiKey, setApiKey] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) || '';
    } catch {
      return '';
    }
  });
  const [saved, setSaved] = useState(!!apiKey);

  const handleSave = () => {
    if (!apiKey.trim()) return;

    try {
      localStorage.setItem(STORAGE_KEY, apiKey.trim());
    } catch {
      // localStorage not available
    }

    setSaved(true);
    onApiKeySet(apiKey.trim());
  };

  const handleClear = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // localStorage not available
    }

    setApiKey('');
    setSaved(false);
    onApiKeySet('');
  };

  if (saved) {
    return (
      <div className="api-key-setup api-key-setup--saved">
        <div className="api-key-status">
          <span className="api-key-status__icon">✓</span>
          <span>{t('API 키가 설정되었습니다', 'API key is configured')}</span>
        </div>
        <button className="btn btn-sm btn-ghost" onClick={handleClear}>
          {t('키 변경', 'Change Key')}
        </button>
      </div>
    );
  }

  return (
    <div className="api-key-setup">
      <h3 className="api-key-setup__title">
        {t('OpenAI API 키 설정', 'OpenAI API Key Setup')}
      </h3>
      <p className="api-key-setup__description">
        {t(
          'AI 한국어 대화 연습을 위해 OpenAI API 키를 입력해주세요. 키는 브라우저에만 저장됩니다.',
          'Enter your OpenAI API key for AI Korean conversation practice. The key is stored locally in your browser only.'
        )}
      </p>
      <div className="api-key-setup__form">
        <input
          type="password"
          className="api-key-setup__input"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="sk-..."
        />
        <button
          className="btn btn--primary btn-sm"
          onClick={handleSave}
          disabled={!apiKey.trim()}
        >
          {t('저장', 'Save')}
        </button>
      </div>
    </div>
  );
}
