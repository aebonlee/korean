import React from "react";
import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

export default function ChatBot({ apiKey }: { apiKey?: string }) {
  const { t } = useLanguage();
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: t(
        '안녕하세요! 저는 한국어 학습 AI 도우미입니다. 한국어로 대화를 연습해 보세요! 질문이 있으면 편하게 물어보세요.',
        'Hello! I\'m your Korean learning AI assistant. Practice Korean conversation with me! Feel free to ask any questions.'
      )
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    try {
      if (!apiKey) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: t(
            'API 키가 설정되지 않았습니다. 설정에서 OpenAI API 키를 입력해주세요.',
            'API key is not set. Please enter your OpenAI API key in settings.'
          )
        }]);
        setLoading(false);
        return;
      }

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: 'You are a friendly Korean language tutor. Help students learn Korean. Respond in Korean with English translations in parentheses when helpful. Correct any Korean mistakes gently. Keep responses concise and educational.'
            },
            ...messages.map(m => ({ role: m.role, content: m.content })),
            { role: 'user', content: userMessage }
          ],
          max_tokens: 500,
          temperature: 0.7
        })
      });

      const data = await response.json();

      if (data.choices && data.choices[0]) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: data.choices[0].message.content
        }]);
      } else {
        throw new Error(data.error?.message || 'Failed to get response');
      }
    } catch (error: unknown) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: t(
          `오류가 발생했습니다: ${(error as Error).message}`,
          `An error occurred: ${(error as Error).message}`
        )
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chat-messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`chat-message chat-message--${msg.role}`}>
            <div className="chat-message__avatar">
              {msg.role === 'assistant' ? '🤖' : '👤'}
            </div>
            <div className="chat-message__bubble">
              <p>{msg.content}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="chat-message chat-message--assistant">
            <div className="chat-message__avatar">🤖</div>
            <div className="chat-message__bubble">
              <div className="chat-typing">
                <span></span><span></span><span></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form className="chat-input-area" onSubmit={sendMessage}>
        <input
          type="text"
          className="chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={String(t('한국어로 메시지를 입력하세요...', 'Type a message in Korean...'))}
          disabled={loading}
        />
        <button
          type="submit"
          className="chat-send-btn"
          disabled={loading || !input.trim()}
          aria-label={String(t('전송', 'Send'))}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </form>
    </div>
  );
}
