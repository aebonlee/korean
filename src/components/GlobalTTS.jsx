import { useEffect, useCallback, useState } from 'react';

/**
 * GlobalTTS - Adds click-to-speak functionality to Korean text site-wide
 *
 * Targets:
 * - .expression-table td:first-child (Korean text in tables)
 * - .expression-card__korean (Korean text in cards)
 * - .dialogue-line__korean (Korean dialogue lines)
 * - .dialogue p (dialogue paragraphs)
 * - .hangul-card__character (Hangul characters)
 * - .grammar-example__korean (Grammar examples)
 * - .speech-target__text (Speech practice target)
 * - [data-tts] (any element with data-tts attribute)
 */

const TTS_SELECTORS = [
  '.expression-table td:first-child',
  '.expression-card__korean',
  '.dialogue-line__korean',
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
    if (!window.speechSynthesis || !text) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ko-KR';
    utterance.rate = rate;
    utterance.pitch = 1;

    const voices = window.speechSynthesis.getVoices();
    const koVoice = voices.find(v => v.lang.startsWith('ko'));
    if (koVoice) utterance.voice = koVoice;

    utterance.onend = () => setActiveEl(null);
    utterance.onerror = () => setActiveEl(null);

    window.speechSynthesis.speak(utterance);
  }, []);

  useEffect(() => {
    // Preload voices
    window.speechSynthesis?.getVoices();

    const handleClick = (e) => {
      const target = e.target.closest(TTS_SELECTORS);
      if (!target) return;

      // Get the Korean text
      let text = target.getAttribute('data-tts') || '';
      if (!text) {
        // Extract only Korean text from the element
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
      window.speechSynthesis.addEventListener?.('end', cleanup, { once: true });
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [speak]);

  // Cleanup on unmount
  useEffect(() => {
    return () => window.speechSynthesis?.cancel();
  }, []);

  return null; // This component renders nothing - it's pure behavior
}
