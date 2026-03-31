import React from "react";
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';

interface LoginModalProps { isOpen: boolean; onClose: () => void; }

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const { login, signup, loginWithGoogle, loginWithKakao } = useAuth();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = activeTab === 'login'
        ? await login(email, password)
        : await signup(email, password);

      if (result?.error) {
        setError(result.error.message);
      } else {
        onClose();
      }
    } catch (err: unknown) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        <h2>{t('로그인', 'Login')}</h2>

        <div className="login-tabs">
          <button
            className={`login-tabs__tab ${activeTab === 'login' ? 'login-tabs__tab--active' : ''}`}
            onClick={() => setActiveTab('login')}
          >
            {t('로그인', 'Login')}
          </button>
          <button
            className={`login-tabs__tab ${activeTab === 'register' ? 'login-tabs__tab--active' : ''}`}
            onClick={() => setActiveTab('register')}
          >
            {t('회원가입', 'Register')}
          </button>
        </div>

        {error && <div className="login-error" role="alert">{error}</div>}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder={String(t('이메일', 'Email'))}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
          <input
            type="password"
            placeholder={String(t('비밀번호', 'Password'))}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
          <button type="submit" className="btn btn--primary btn--full" disabled={loading}>
            {loading ? '...' : t(activeTab === 'login' ? '로그인' : '회원가입', activeTab === 'login' ? 'Login' : 'Register')}
          </button>
        </form>

        <div className="login-divider"><span>{t('또는', 'or')}</span></div>

        <button className="btn btn--google btn--full" onClick={loginWithGoogle} disabled={loading}>
          Google {t('로그인', 'Login')}
        </button>
        <button className="btn btn--kakao btn--full" onClick={loginWithKakao} disabled={loading} style={{ marginTop: '8px' }}>
          Kakao {t('로그인', 'Login')}
        </button>
      </div>
    </div>
  );
}
