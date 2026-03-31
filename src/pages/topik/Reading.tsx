import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';
import PageLayout from '../../components/PageLayout';
import { useLanguage } from '../../contexts/LanguageContext';
import { TOPIK_READING } from '../../data/topikData';
import useAOS from '../../hooks/useAOS';

const sections = [
  { id: 'reading-questions', ko: '읽기 문제', en: 'Reading Questions' },
  { id: 'reading-tips', ko: '읽기 시험 팁', en: 'Reading Tips' },
];

export default function Reading() {
  const { language, t } = useLanguage();
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState<Record<number, boolean>>({});
  const [showTranslations, setShowTranslations] = useState<Record<number, boolean>>({});
  useAOS();

  const handleSelectAnswer = (questionId: number, optionIndex: number) => {
    if (showResults[questionId]) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleCheckAnswer = (questionId: number) => {
    if (selectedAnswers[questionId] === undefined) return;
    setShowResults((prev) => ({ ...prev, [questionId]: true }));
  };

  const handleToggleTranslation = (questionId: number) => {
    setShowTranslations((prev) => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  const getOptionClass = (questionId: number, optionIndex: number) => {
    if (!showResults[questionId]) {
      return selectedAnswers[questionId] === optionIndex ? 'selected' : '';
    }
    const question = TOPIK_READING.find((q) => q.id === questionId);
    if (optionIndex === question?.answer) return 'correct';
    if (selectedAnswers[questionId] === optionIndex) return 'incorrect';
    return '';
  };

  return (
    <>
      <SEOHead
        title={String(t('TOPIK 읽기 연습 - Korean Pro', 'TOPIK Reading Practice - Korean Pro'))}
        description={String(t(
          'TOPIK 읽기 영역 연습 문제를 풀어보세요. 지문과 해설이 포함되어 있습니다.',
          'Practice TOPIK reading questions. Includes passages and explanations.'
        ))}
      />

      {/* Page Header */}
      <section className="page-header" data-aos="fade-up">
        <div className="container">
          <div className="page-header__breadcrumb">
            <Link to="/">{t('홈', 'Home')}</Link>
            <i className="fas fa-chevron-right"></i>
            <Link to="/topik">{t('TOPIK', 'TOPIK')}</Link>
            <i className="fas fa-chevron-right"></i>
            <span>{t('읽기', 'Reading')}</span>
          </div>
          <h1 className="page-header__title">
            {language === 'ko'
              ? <>읽기 연습 <span className="page-header__en">(Reading Practice)</span></>
              : 'TOPIK Reading Practice'}
          </h1>
          <p className="page-header__description">
            {t(
              'TOPIK 읽기 영역의 연습 문제입니다. 지문을 주의 깊게 읽고 문제를 풀어보세요.',
              'Practice questions for the TOPIK reading section. Read the passages carefully and answer the questions.'
            )}
          </p>
        </div>
      </section>

      <PageLayout sections={sections} category="topik">
        {/* Questions */}
        <section id="reading-questions" className="lesson-section" data-aos="fade-up">
          <div className="container">
            {TOPIK_READING.map((question, index) => (
              <div key={question.id} className="example-box" data-aos="fade-up" style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h3 style={{ margin: 0 }}>
                    {t('문제', 'Question')} {index + 1}
                  </h3>
                  <span className="badge">{question.level}</span>
                </div>

                {/* Passage */}
                <div style={{ padding: '1.5rem', backgroundColor: 'var(--bg-secondary, #f5f5f5)', borderRadius: '8px', marginBottom: '1rem', lineHeight: '1.8' }}>
                  <p style={{ fontSize: '1.05rem' }}>{question.passage}</p>
                  {showTranslations[question.id] && (
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '1rem', borderTop: '1px solid var(--border-color, #ddd)', paddingTop: '0.75rem' }}>
                      {question.passageEn}
                    </p>
                  )}
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={() => handleToggleTranslation(question.id)}
                    style={{ marginTop: '0.75rem' }}
                  >
                    {showTranslations[question.id]
                      ? t('번역 숨기기', 'Hide Translation')
                      : t('번역 보기', 'Show Translation')
                    }
                  </button>
                </div>

                {/* Question */}
                <p><strong>{language === 'ko' ? question.question : question.questionEn}</strong></p>

                {/* Options */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {question.options.map((option, optIdx) => (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectAnswer(question.id, optIdx)}
                      className={`btn ${getOptionClass(question.id, optIdx)}`}
                      style={{
                        textAlign: 'left',
                        padding: '0.75rem 1rem',
                        border: '2px solid var(--border-color, #ddd)',
                        borderRadius: '8px',
                        backgroundColor:
                          getOptionClass(question.id, optIdx) === 'correct' ? '#e8f5e9' :
                          getOptionClass(question.id, optIdx) === 'incorrect' ? '#ffebee' :
                          getOptionClass(question.id, optIdx) === 'selected' ? 'var(--bg-secondary, #e3f2fd)' :
                          'transparent',
                        borderColor:
                          getOptionClass(question.id, optIdx) === 'correct' ? '#4CAF50' :
                          getOptionClass(question.id, optIdx) === 'incorrect' ? '#f44336' :
                          getOptionClass(question.id, optIdx) === 'selected' ? 'var(--primary)' :
                          'var(--border-color, #ddd)',
                        cursor: showResults[question.id] ? 'default' : 'pointer',
                      }}
                    >
                      <span style={{ fontWeight: '600', marginRight: '0.5rem' }}>{optIdx + 1}.</span>
                      {option}
                    </button>
                  ))}
                </div>

                {/* Check Button */}
                {!showResults[question.id] && (
                  <button
                    className="btn btn-primary"
                    onClick={() => handleCheckAnswer(question.id)}
                    disabled={selectedAnswers[question.id] === undefined}
                    style={{ marginTop: '1rem' }}
                  >
                    {t('정답 확인', 'Check Answer')}
                  </button>
                )}

                {/* Result */}
                {showResults[question.id] && (
                  <div style={{ marginTop: '1rem', padding: '1rem', borderRadius: '8px', backgroundColor: selectedAnswers[question.id] === question.answer ? '#e8f5e9' : '#ffebee' }}>
                    <p style={{ fontWeight: '600', color: selectedAnswers[question.id] === question.answer ? '#2e7d32' : '#c62828' }}>
                      {selectedAnswers[question.id] === question.answer
                        ? t('정답입니다!', 'Correct!')
                        : t('틀렸습니다.', 'Incorrect.')
                      }
                    </p>
                    <p style={{ marginTop: '0.5rem' }}>
                      <strong>{t('해설', 'Explanation')}:</strong> {question.explanation}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Reading Tips */}
        <section id="reading-tips" className="lesson-section" data-aos="fade-up">
          <div className="container">
            <div className="tip-box">
              <h4>{t(<><i className="fas fa-lightbulb"></i> 읽기 시험 팁</>, <><i className="fas fa-lightbulb"></i> Reading Test Tips</>)}</h4>
              <ul>
                <li>{t('지문을 읽기 전에 먼저 문제를 읽으세요. 무엇을 찾아야 하는지 알 수 있습니다.', 'Read the question before the passage. This helps you know what to look for.')}</li>
                <li>{t('모르는 단어가 있어도 문맥(context)으로 의미를 추측하세요.', 'Even if there are unknown words, guess the meaning from context.')}</li>
                <li>{t('핵심 문장(주로 첫 문장이나 마지막 문장)에 주목하세요.', 'Pay attention to key sentences (usually the first or last sentence).')}</li>
                <li>{t('시간 관리가 중요합니다. 어려운 문제에 너무 오래 머물지 마세요.', 'Time management is important. Don\'t spend too long on difficult questions.')}</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <section className="lesson-section" data-aos="fade-up">
          <div className="container">
            <div className="lesson-nav">
              <Link to="/topik/listening" className="btn btn-secondary">
                {t('← 듣기', '← Listening')}
              </Link>
              <Link to="/topik/mock-test" className="btn btn-primary">
                {t('다음: 모의 시험 →', 'Next: Mock Test →')}
              </Link>
            </div>
          </div>
        </section>
      </PageLayout>
    </>
  );
}
