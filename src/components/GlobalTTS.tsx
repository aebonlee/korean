import { useEffect, useCallback, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * GlobalTTS - Auto-injects visible speaker buttons next to Korean text
 *
 * Following the English site pattern: Font Awesome fa-volume-up buttons
 * are auto-injected into:
 * - .expression-table td:first-child (Korean column in tables)
 * - .expression-card__korean (Korean text in cards)
 * - .dialogue-line__korean (Korean dialogue lines)
 * - .dialogue p (conversation dialogue paragraphs)
 * - .vocab-card__word (vocabulary card words)
 * - [data-tts] span/div elements (explicit TTS targets)
 */

const KOREAN_REGEX = /[\u3131-\u3163\uac00-\ud7a3]/;

// Selectors for elements that should get a speaker button
const INJECT_SELECTORS = [
  '.expression-table td:first-child',
  '.expression-card__korean',
  '.dialogue-line__korean',
  '.vocab-card__word',
];

export default function GlobalTTS() {
  const location = useLocation();
  const speakRef = useRef<((text: string, rate?: number) => void) | null>(null);

  const speak = useCallback((text: string, rate: number = 0.9) => {
    const synth = window.speechSynthesis;
    if (!synth || !text) return;
    synth.cancel();

    // Clean up the text (remove emoji, extra spaces, fix slashes)
    text = text.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '').trim();
    // Replace slash between Korean characters with comma for natural TTS
    text = text.replace(/([\u3131-\u3163\uac00-\ud7a3])\/([\u3131-\u3163\uac00-\ud7a3])/g, '$1, $2');
    if (!text) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ko-KR';
    utterance.rate = rate;
    utterance.pitch = 1;

    const voices = synth.getVoices();
    const koVoice = voices.find(v => v.lang === 'ko-KR')
      || voices.find(v => v.lang.startsWith('ko'));
    if (koVoice) utterance.voice = koVoice;

    synth.speak(utterance);
  }, []);

  // Store speak in ref for use in DOM event handlers
  speakRef.current = speak;

  // Preload voices
  useEffect(() => {
    const synth = window.speechSynthesis;
    if (!synth) return;
    synth.getVoices();
    const onVoicesChanged = () => synth.getVoices();
    synth.addEventListener?.('voiceschanged', onVoicesChanged);
    return () => synth.removeEventListener?.('voiceschanged', onVoicesChanged);
  }, []);

  // Auto-inject speaker buttons after each route change
  useEffect(() => {
    const makeBtn = (text: string) => {
      const btn = document.createElement('button');
      btn.className = 'tts-play-btn';
      btn.type = 'button';
      btn.title = '발음 듣기';
      btn.setAttribute('aria-label', '발음 듣기');
      btn.innerHTML = '<i class="fas fa-volume-up"></i>';
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        // Active state
        document.querySelectorAll('.tts-play-btn--active').forEach(b => b.classList.remove('tts-play-btn--active'));
        btn.classList.add('tts-play-btn--active');
        speakRef.current?.(text);
        // Remove active after speech
        const synth = window.speechSynthesis;
        const checkEnd = setInterval(() => {
          if (!synth?.speaking) {
            btn.classList.remove('tts-play-btn--active');
            clearInterval(checkEnd);
          }
        }, 300);
        setTimeout(() => { btn.classList.remove('tts-play-btn--active'); clearInterval(checkEnd); }, 8000);
      });
      return btn;
    };

    const injectButtons = () => {
      // 1) Expression tables, expression cards, dialogue lines, vocab words
      INJECT_SELECTORS.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
          if (el.querySelector('.tts-play-btn')) return;
          const text = el.getAttribute('data-tts') || el.textContent?.trim();
          if (!text || !KOREAN_REGEX.test(text)) return;
          el.appendChild(makeBtn(text));
        });
      });

      // 2) Dialogue paragraphs (conversation pages)
      document.querySelectorAll('.dialogue p').forEach(p => {
        if (p.querySelector('.tts-play-btn')) return;
        if (p.classList.contains('translation') || p.classList.contains('dialogue-translation')) return;
        const speaker = p.querySelector('.speaker');
        let text = p.textContent?.trim();
        if (speaker && text) text = text.replace(speaker.textContent || '', '').trim();
        if (!text || !KOREAN_REGEX.test(text)) return;
        p.appendChild(makeBtn(text));
      });

      // 3) data-tts span/div elements (vocab examples, writing samples)
      document.querySelectorAll('[data-tts]').forEach(el => {
        if (el.querySelector('.tts-play-btn')) return;
        // Skip if parent already has a button for this text
        if (el.closest('.vocab-card__word, .expression-table td:first-child, .expression-card__korean')) return;
        const text = el.getAttribute('data-tts');
        if (!text || !KOREAN_REGEX.test(text)) return;
        el.appendChild(makeBtn(text));
      });
    };

    // Delay to let React finish rendering
    const timer = setTimeout(injectButtons, 150);

    // Watch for DOM changes (pagination, dynamic content) and re-inject
    const observer = new MutationObserver(() => {
      setTimeout(injectButtons, 100);
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [location.pathname]);

  // Cleanup on unmount
  useEffect(() => {
    return () => window.speechSynthesis?.cancel();
  }, []);

  return null;
}
