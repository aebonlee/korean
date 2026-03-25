import { useEffect, useCallback, useState } from 'react';

/**
 * GlobalTTS - Adds click-to-speak functionality to Korean text site-wide
 *
 * Targets:
 * - .expression-table td (all table cells — Korean regex filters non-Korean)
 * - .expression-card__korean (Korean text in cards)
 * - .dialogue-line__korean (Korean dialogue lines)
 * - .dialogue p (conversation dialogue paragraphs)
 * - .hangul-card__character (Hangul characters)
 * - .grammar-example__korean (Grammar examples)
 * - .speech-target__text (Speech practice target)
 * - [data-tts] (any element with data-tts attribute)
 */

const TTS_SELECTORS = [
  '.expression-table td',
  '.expression-card__korean',
  '.dialogue-line__korean',
  '.dialogue p',
  '.hangul-card__character',
  '.grammar-example__korean',
  '.speech-target__text',
  '[data-tts]',
].join(', ');

// Korean text detection regex
const KOREAN_REGEX = /[\u3131-\u3163\uac00-\ud7a3]/;

export default function GlobalTTS() {
  const [activeEl, setActiveEl] = useState(null);

  const speak = useCallback((text, rate = 0.9) => {
    const synth = window.speechSynthesis;
    if (!synth || !text) return;
    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ko-KR';
    utterance.rate = rate;
    utterance.pitch = 1;

    // Find the best Korean voice
    const voices = synth.getVoices();
    const koVoice = voices.find(v => v.lang === 'ko-KR')
      || voices.find(v => v.lang.startsWith('ko'));
    if (koVoice) utterance.voice = koVoice;

    utterance.onend = () => setActiveEl(null);
    utterance.onerror = () => setActiveEl(null);

    synth.speak(utterance);
  }, []);

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (!synth) return;

    // Preload voices (Chrome loads asynchronously)
    synth.getVoices();
    const onVoicesChanged = () => synth.getVoices();
    synth.addEventListener?.('voiceschanged', onVoicesChanged);

    const handleClick = (e) => {
      // Skip clicks on buttons, links, inputs
      if (e.target.closest('a, button, input, select, textarea')) return;

      const target = e.target.closest(TTS_SELECTORS);
      if (!target) return;

      // Get the Korean text
      let text = target.getAttribute('data-tts') || '';
      if (!text) {
        const fullText = target.textContent?.trim();
        if (fullText && KOREAN_REGEX.test(fullText)) {
          text = fullText;
        }
      }

      if (!text) return;

      // Clean up the text (remove emoji, extra spaces)
      text = text.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '').trim();

      if (!text) return;

      e.preventDefault();
      setActiveEl(target);
      target.classList.add('tts-speaking');
      speak(text);

      // Remove class after speech ends
      const cleanup = () => {
        target.classList.remove('tts-speaking');
      };
      setTimeout(cleanup, 5000); // fallback cleanup
    };

    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
      synth.removeEventListener?.('voiceschanged', onVoicesChanged);
    };
  }, [speak]);

  // Cleanup on unmount
  useEffect(() => {
    return () => window.speechSynthesis?.cancel();
  }, []);

  return null; // This component renders nothing - it's pure behavior
}
