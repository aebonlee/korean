import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';
import { useLanguage } from '../../contexts/LanguageContext';
import useAOS from '../../hooks/useAOS';
import BUSINESS_WORDS from '../../data/vocabBusinessData';

const PER_PAGE = 30;

export default function VocabBusiness() {
  const { t } = useLanguage();
  useAOS();
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(BUSINESS_WORDS.length / PER_PAGE);
  const start = (page - 1) * PER_PAGE;
  const currentWords = BUSINESS_WORDS.slice(start, start + PER_PAGE);

  const goTo = (p) => {
    setPage(p);
    window.scrollTo({ top: 320, behavior: 'smooth' });
  };

  return (
    <>
      <SEOHead title={t('비즈니스 어휘 - Korean Pro', 'Business Vocabulary - Korean Pro')} description={t(`비즈니스 한국어 어휘 ${BUSINESS_WORDS.length}개를 학습하세요.`, `Study ${BUSINESS_WORDS.length} business Korean vocabulary words.`)} />
      <section className="page-header" data-aos="fade-up">
        <div className="container">
          <div className="page-header__breadcrumb">
            <Link to="/">{t('홈', 'Home')}</Link><i className="fas fa-chevron-right"></i>
            <Link to="/vocabulary">{t('어휘', 'Vocabulary')}</Link><i className="fas fa-chevron-right"></i>
            <span>{t('비즈니스', 'Business')}</span>
          </div>
          <h1 className="page-header__title">{t(`비즈니스 필수 단어 ${BUSINESS_WORDS.length}`, `Business Essential ${BUSINESS_WORDS.length}`)}</h1>
          <p className="page-header__description">
            {t('직장 생활과 비즈니스 환경에서 필요한 전문 어휘를 학습하세요.', 'Study professional vocabulary for the workplace and business environment.')}
            <br />
            {t('스피커 버튼을 클릭하면 한국어 발음을 들을 수 있습니다.', 'Click the speaker button to hear Korean pronunciation.')}
          </p>
        </div>
      </section>

      <section className="lesson-section" data-aos="fade-up">
        <div className="container">
          <div className="vocab-pagination__info">
            <span>{t(`총 ${BUSINESS_WORDS.length}개`, `Total ${BUSINESS_WORDS.length} words`)} &middot; {t(`페이지 ${page} / ${totalPages}`, `Page ${page} / ${totalPages}`)}</span>
            <span>{t(`${start + 1} - ${Math.min(start + PER_PAGE, BUSINESS_WORDS.length)}번`, `#${start + 1} - ${Math.min(start + PER_PAGE, BUSINESS_WORDS.length)}`)}</span>
          </div>

          <div className="vocab-grid">
            {currentWords.map((w, i) => (
              <div key={start + i} className="vocab-card" data-aos="fade-up" data-aos-delay={Math.min(i * 30, 200)}>
                <div className="vocab-card__word" data-tts={w.ko}>{w.ko}</div>
                <div className="vocab-card__romanization">{w.rom}</div>
                <div className="vocab-card__meaning">{w.en}</div>
                <div className="vocab-card__example">
                  <span data-tts={w.ex}>{w.ex}</span>
                  <div className="vocab-card__example-en">{w.exEn}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="vocab-pagination">
            <button className="vocab-pagination__btn" onClick={() => goTo(page - 1)} disabled={page === 1}>
              <i className="fas fa-chevron-left"></i>
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button
                key={p}
                className={`vocab-pagination__btn${p === page ? ' vocab-pagination__btn--active' : ''}`}
                onClick={() => goTo(p)}
              >
                {p}
              </button>
            ))}
            <button className="vocab-pagination__btn" onClick={() => goTo(page + 1)} disabled={page === totalPages}>
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </section>

      <section className="lesson-section" data-aos="fade-up">
        <div className="container">
          <div className="lesson-nav">
            <Link to="/vocabulary/daily" className="btn btn-secondary">{t('← 이전: 일상 필수', '← Previous: Daily Essential')}</Link>
            <Link to="/vocabulary/topik" className="btn btn-primary">{t('다음: TOPIK 어휘 →', 'Next: TOPIK Vocabulary →')}</Link>
          </div>
        </div>
      </section>
    </>
  );
}
