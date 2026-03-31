import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';
import PageLayout from '../../components/PageLayout';
import { useLanguage } from '../../contexts/LanguageContext';
import useAOS from '../../hooks/useAOS';
import BASIC_WORDS from '../../data/vocabBasicData';

const PER_PAGE = 30;

const sections = [
  { id: 'word-list', ko: '단어 목록', en: 'Word List' },
];

export default function VocabBasic() {
  const { t } = useLanguage();
  useAOS();
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(BASIC_WORDS.length / PER_PAGE);
  const start = (page - 1) * PER_PAGE;
  const currentWords = BASIC_WORDS.slice(start, start + PER_PAGE);

  const goTo = (p: number) => {
    setPage(p);
    window.scrollTo({ top: 320, behavior: 'smooth' });
  };

  return (
    <>
      <SEOHead title={String(t('기초 필수 단어 - Korean Pro', 'Basic Essential Words - Korean Pro'))} description={String(t(`한국어 기초 필수 단어 ${BASIC_WORDS.length}개를 학습하세요.`, `Study ${BASIC_WORDS.length} essential basic Korean words.`))} />
      <section className="page-header" data-aos="fade-up">
        <div className="container">
          <div className="page-header__breadcrumb">
            <Link to="/">{t('홈', 'Home')}</Link><i className="fas fa-chevron-right"></i>
            <Link to="/vocabulary">{t('어휘', 'Vocabulary')}</Link><i className="fas fa-chevron-right"></i>
            <span>{t('기초 필수', 'Basic Essential')}</span>
          </div>
          <h1 className="page-header__title">{t(`기초 필수 단어 ${BASIC_WORDS.length}`, `Basic Essential ${BASIC_WORDS.length}`)}</h1>
          <p className="page-header__description">
            {t('한국어 학습의 기본이 되는 필수 단어를 학습하세요.', 'Study the essential words that form the foundation of Korean learning.')}
            <br />
            {t('스피커 버튼을 클릭하면 한국어 발음을 들을 수 있습니다.', 'Click the speaker button to hear Korean pronunciation.')}
          </p>
        </div>
      </section>

      <PageLayout sections={sections} category="vocabulary">
        <section id="word-list" className="lesson-section" data-aos="fade-up">
          <div className="container">
            <div className="vocab-pagination__info">
              <span>{t(`총 ${BASIC_WORDS.length}개`, `Total ${BASIC_WORDS.length} words`)} &middot; {t(`페이지 ${page} / ${totalPages}`, `Page ${page} / ${totalPages}`)}</span>
              <span>{t(`${start + 1} - ${Math.min(start + PER_PAGE, BASIC_WORDS.length)}번`, `#${start + 1} - ${Math.min(start + PER_PAGE, BASIC_WORDS.length)}`)}</span>
            </div>

            <div className="vocab-grid">
              {currentWords.map((w, i) => (
                <div key={start + i} className="vocab-card">
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
              <Link to="/vocabulary" className="btn btn-secondary">{t('← 목록으로', '← Back to List')}</Link>
              <Link to="/vocabulary/daily" className="btn btn-primary">{t('다음: 일상 어휘 →', 'Next: Daily Vocabulary →')}</Link>
            </div>
          </div>
        </section>
      </PageLayout>
    </>
  );
}
