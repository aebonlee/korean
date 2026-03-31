import useTTS from '../hooks/useTTS';

/**
 * TTS Button - plays Korean text aloud
 * Props:
 *   text: string - Korean text to speak
 *   size: 'sm' | 'md' (default 'sm')
 *   showSlow: boolean - show slow speed button (default false)
 */
interface TTSButtonProps { text: string; size?: 'sm' | 'md'; showSlow?: boolean; }

export default function TTSButton({ text, size = 'sm', showSlow = false }: TTSButtonProps) {
  const { speak, speakSlow, stop, isSpeaking } = useTTS();

  if (!text) return null;

  const iconSize = size === 'sm' ? 16 : 20;

  return (
    <span className={`tts-buttons tts-buttons--${size}`}>
      <button
        type="button"
        className={`tts-btn${isSpeaking ? ' tts-btn--active' : ''}`}
        onClick={() => isSpeaking ? stop() : speak(text)}
        aria-label={isSpeaking ? 'Stop' : 'Listen'}
        title={isSpeaking ? 'Stop' : 'Listen'}
      >
        {isSpeaking ? (
          <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="6" width="12" height="12" rx="2" />
          </svg>
        ) : (
          <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          </svg>
        )}
      </button>
      {showSlow && !isSpeaking && (
        <button
          type="button"
          className="tts-btn tts-btn--slow"
          onClick={() => speakSlow(text)}
          aria-label="Listen slowly"
          title="Listen slowly"
        >
          <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          </svg>
          <span className="tts-btn__label">Slow</span>
        </button>
      )}
    </span>
  );
}
