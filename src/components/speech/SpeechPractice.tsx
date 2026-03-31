import { useState, useRef, useCallback } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

interface SpeechPracticeProps { targetText?: string; targetMeaning?: string; }

export default function SpeechPractice({ targetText, targetMeaning }: SpeechPracticeProps) {
  const { t } = useLanguage();
  const [isListening, setIsListening] = useState(false);
  const [result, setResult] = useState('');
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const [error, setError] = useState('');
  const recognitionRef = useRef<any>(null);

  const calculateAccuracy = useCallback((spoken: string, target: string) => {
    const spokenClean = spoken.replace(/\s+/g, '').toLowerCase();
    const targetClean = target.replace(/\s+/g, '').toLowerCase();

    if (spokenClean === targetClean) return 100;

    let matches = 0;
    const maxLen = Math.max(spokenClean.length, targetClean.length);

    for (let i = 0; i < Math.min(spokenClean.length, targetClean.length); i++) {
      if (spokenClean[i] === targetClean[i]) {
        matches++;
      }
    }

    return Math.round((matches / maxLen) * 100);
  }, []);

  const startListening = useCallback(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setError(String(t(
        '이 브라우저에서는 음성 인식이 지원되지 않습니다. Chrome 브라우저를 사용해주세요.',
        'Speech recognition is not supported in this browser. Please use Chrome.'
      )));
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = 'ko-KR';
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
      setResult('');
      setAccuracy(null);
      setError('');
    };

    recognition.onresult = (event: any) => {
      const spoken = event.results[0][0].transcript;
      setResult(spoken);
      if (targetText) {
        setAccuracy(calculateAccuracy(spoken, targetText));
      }
    };

    recognition.onerror = (event: any) => {
      setIsListening(false);
      if (event.error === 'no-speech') {
        setError(String(t('음성이 감지되지 않았습니다. 다시 시도해주세요.', 'No speech detected. Please try again.')));
      } else {
        setError(String(t(`오류: ${event.error}`, `Error: ${event.error}`)));
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
  }, [targetText, calculateAccuracy, t]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  }, []);

  const getAccuracyColor = () => {
    if (accuracy === null) return '';
    if (accuracy >= 80) return 'text-success';
    if (accuracy >= 50) return 'text-warning';
    return 'text-error';
  };

  const getAccuracyMessage = () => {
    if (accuracy === null) return '';
    if (accuracy === 100) return t('완벽합니다! 🎉', 'Perfect! 🎉');
    if (accuracy >= 80) return t('아주 좋습니다! 👍', 'Very good! 👍');
    if (accuracy >= 50) return t('괜찮습니다. 다시 해보세요! 💪', 'Not bad. Try again! 💪');
    return t('다시 연습해보세요 🔄', 'Let\'s practice again 🔄');
  };

  return (
    <div className="speech-practice">
      <div className="speech-target">
        <h4 className="speech-target__label">
          {t('따라 읽어보세요:', 'Read aloud:')}
        </h4>
        <p className="speech-target__text">{targetText}</p>
        {targetMeaning && (
          <p className="speech-target__meaning">{targetMeaning}</p>
        )}
      </div>

      <div className="speech-controls">
        <button
          className={`speech-mic-btn${isListening ? ' listening' : ''}`}
          onClick={isListening ? stopListening : startListening}
          aria-label={isListening ? String(t('녹음 중지', 'Stop recording')) : String(t('녹음 시작', 'Start recording'))}
        >
          {isListening ? (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="6" width="12" height="12" rx="2" />
            </svg>
          ) : (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
              <line x1="12" y1="19" x2="12" y2="23" />
              <line x1="8" y1="23" x2="16" y2="23" />
            </svg>
          )}
        </button>
        <span className="speech-status">
          {isListening
            ? t('듣고 있습니다... 🎙️', 'Listening... 🎙️')
            : t('마이크를 눌러 시작하세요', 'Press the mic to start')
          }
        </span>
      </div>

      {error && (
        <div className="speech-error" role="alert">
          {error}
        </div>
      )}

      {result && (
        <div className="speech-result">
          <h4>{t('인식 결과:', 'Recognition result:')}</h4>
          <p className="speech-result__text">{result}</p>
          {accuracy !== null && (
            <div className="speech-accuracy">
              <div className="speech-accuracy__bar">
                <div
                  className="speech-accuracy__fill"
                  style={{ width: `${accuracy}%` }}
                />
              </div>
              <span className={`speech-accuracy__value ${getAccuracyColor()}`}>
                {accuracy}%
              </span>
              <span className="speech-accuracy__message">
                {getAccuracyMessage()}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
