import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { FAMILY_SITES } from '../../config/site';

const QUICK_LINKS = [
  { path: '/hangul', labelKo: '한글 기초', labelEn: 'Hangul' },
  { path: '/conversation', labelKo: '일상 회화', labelEn: 'Conversation' },
  { path: '/grammar', labelKo: '문법', labelEn: 'Grammar' },
  { path: '/vocabulary', labelKo: '어휘', labelEn: 'Vocabulary' },
  { path: '/writing', labelKo: '작문', labelEn: 'Writing' },
  { path: '/topik', labelKo: 'TOPIK', labelEn: 'TOPIK' },
  { path: '/culture', labelKo: '한국 문화', labelEn: 'Culture' },
  { path: '/ai-chat', labelKo: 'AI 학습', labelEn: 'AI Chat' },
  { path: '/speech', labelKo: '발음 연습', labelEn: 'Speech' },
];

export default function Footer() {
  const { t } = useLanguage();

  const handleFamilySite = (e) => {
    const url = e.target.value;
    if (url) {
      window.open(url, '_blank', 'noopener');
      e.target.value = '';
    }
  };

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-inner">
        <div className="footer-grid">
          <div className="footer-col footer-brand-col">
            <Link to="/" className="footer-brand">
              <span className="footer-logo" aria-hidden="true">K</span>
              <span className="footer-brand-text">Korean Pro</span>
            </Link>
            <p className="footer-description">
              {t(
                'AI 기반 한국어 학습으로 한국어를 마스터하세요. 한글 기초부터 TOPIK 대비까지 맞춤형 학습을 제공합니다.',
                'Master Korean with AI-powered learning. From Hangul basics to TOPIK prep with personalized guidance.'
              )}
            </p>
            <div className="footer-family">
              <select onChange={handleFamilySite} defaultValue="">
                <option value="" disabled>Family Site</option>
                {FAMILY_SITES.map((s, i) => (
                  <option key={i} value={s.url}>{s.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="footer-col">
            <h3 className="footer-heading">
              {t('바로가기', 'Quick Links')}
            </h3>
            <ul className="footer-links">
              {QUICK_LINKS.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="footer-link">
                    {t(link.labelKo, link.labelEn)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h3 className="footer-heading">
              {t('연락처', 'Contact')}
            </h3>
            <div className="footer-contact-list">
              <a href="mailto:aebon@dreamitbiz.com" className="footer-contact-row">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                <span>aebon@dreamitbiz.com</span>
              </a>
              <a href="tel:010-3700-0629" className="footer-contact-row">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <span>010-3700-0629</span>
              </a>
              <div className="footer-contact-row">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/></svg>
                <span>{t('카카오톡: aebon', 'KakaoTalk: aebon')}</span>
              </div>
              <div className="footer-contact-row">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                <span>{t('평일 09:00 ~ 18:00', 'Weekdays 09:00 ~ 18:00')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-copyright">
        <div className="footer-copyright-inner">
          <p>&copy; 2025 {t('드림아이티비즈(DreamIT Biz). All rights reserved.', 'DreamIT Biz. All rights reserved.')}</p>
          <p className="footer-meta">
            Designed by Ph.D Aebon Lee
            <span className="footer-divider">|</span>
            {t('대표이사: 이애본', 'CEO: Aebon Lee')}
            <span className="footer-divider">|</span>
            {t('사업자등록번호: 601-45-20154', 'Business Reg: 601-45-20154')}
            <span className="footer-divider">|</span>
            {t('통신판매신고번호: 제2024-수원팔달-0584호', 'Sales Reg: 2024-수원팔달-0584')}
            <span className="footer-divider">|</span>
            {t('출판사 신고번호: 제2026-000026호', 'Publisher Reg: 2026-000026')}
          </p>
        </div>
      </div>
    </footer>
  );
}
