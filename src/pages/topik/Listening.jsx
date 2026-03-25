import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';
import PageLayout from '../../components/PageLayout';
import { useLanguage } from '../../contexts/LanguageContext';
import { TOPIK_LISTENING } from '../../data/topikData';
import useAOS from '../../hooks/useAOS';

const sections = [
  { id: 'listening-questions', ko: '듣기 문제', en: 'Listening Questions' },
  { id: 'listening-tips', ko: '듣기 시험 팁', en: 'Listening Tips' },
];

export default function Listening() {
  const { language, t } = useLanguage();
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState({});
  const [showTranscripts, setShowTranscripts] = useState({});
  useAOS();

  const handleSelectAnswer = (questionId, optionIndex) => {
    if (showResults[questionId]) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleCheckAnswer = (questionId) => {
    if (selectedAnswers[questionId] === undefined) return;
    setShowResults((prev) => ({ ...prev, [questionId]: true }));
  };

  const handleToggleTranscript = (questionId) => {
    setShowTranscripts((prev) => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  const getOptionClass = (questionId, optionIndex) => {
    if (!showResults[questionId]) {
      return selectedAnswers[questionId] === optionIndex ? 'selected' : '';
    }
    const question = TOPIK_LISTENING.find((q) => q.id === questionId);
    if (optionIndex === question.answer) return 'correct';
    if (selectedAnswers[questionId] === optionIndex) return 'incorrect';
    return '';
  };

  return (
    <>
      <SEOHead
        title={t('TOPIK 듣기 연습 - Korean Pro', 'TOPIK Listening Practice - Korean Pro')}
        description={t(
          'TOPIK 듣기 영역 연습 문제를 풀어보세요. 대화 스크립트와 해설이 포함되어 있습니다.',
          'Practice TOPIK listening questions. Includes dialogue transcripts and explanations.'
        )}
      />

      {/* Page Header */}
      <section className="page-header" data-aos="fade-up">
        <div className="container">
          <div className="page-header__breadcrumb">
            <Link to="/">{t('홈', 'Home')}</Link>
            <i className="fas fa-chevron-right"></i>
            <Link to="/topik">{t('TOPIK', 'TOPIK')}</Link>
            <i className="fas fa-chevron-right"></i>
            <span>{t('듣기', 'Listening')}</span>
          </div>
          <h1 className="page-header__title">
            {language === 'ko'
              ? <>듣기 연습 <span className="page-header__en">(Listening Practice)</span></>
              : 'TOPIK Listening Practice'}
          </h1>
          <p className="page-header__description">
            {t(
              'TOPIK 듣기 영역의 연습 문제입니다. 스크립트를 읽고 문제를 풀어보세요. 실제 시험에서는 음성을 듣게 됩니다.',
              'Practice questions for the TOPIK listening section. Read the transcript and answer the questions. In the actual exam, you will listen to audio.'
            )}
          </p>
        </div>
      </section>

      <PageLayout sections={sections} category="topik">
        {/* Questions */}
        <section id="listening-questions" className="lesson-section" data-aos="fade-up">
          <div className="container">
            {TOPIK_LISTENING.map((question, index) => (
              <div key={question.id} className="example-box" data-aos="fade-up" style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h3 style={{ margin: 0 }}>
                    {t('문제', 'Question')} {index + 1}
                  </h3>
                  <span className="badge">{question.level}</span>
                </div>

                <p><strong>{language === 'ko' ? question.question : question.questionEn}</strong></p>

                {/* Transcript Toggle */}
                <div style={{ marginBottom: '1rem' }}>
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={() => handleToggleTranscript(question.id)}
                    style={{ marginBottom: '0.5rem' }}
                  >
                    {showTranscripts[question.id]
                      ? t('스크립트 숨기기', 'Hide Transcript')
                      : t('스크립트 보기', 'Show Transcript')
                    }
                  </button>
                  {showTranscripts[question.id] && (
                    <div style={{ padding: '1rem', backgroundColor: 'var(--bg-secondary, #f5f5f5)', borderRadius: '8px', marginTop: '0.5rem' }}>
                      <p style={{ fontWeight: '500' }}>{question.transcript}</p>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{question.transcriptEn}</p>
                    </div>
                  )}
                </div>

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

        {/* Tips */}
        <section id="listening-tips" className="lesson-section" data-aos="fade-up">
          <div className="container">
            <div className="tip-box">
              <h4>{t(<><i className="fas fa-lightbulb"></i> 듣기 시험 팁</>, <><i className="fas fa-lightbulb"></i> Listening Test Tips</>)}</h4>
              <ul>
                <li>{t('문제를 먼저 읽고 무엇을 들어야 하는지 파악하세요.', 'Read the questions first to understand what to listen for.')}</li>
                <li>{t('핵심 단어에 집중하세요. 모든 단어를 다 이해할 필요는 없습니다.', 'Focus on key words. You don\'t need to understand every word.')}</li>
                <li>{t('시간 표현(언제), 장소 표현(어디), 인물 표현(누구)에 특히 주의하세요.', 'Pay special attention to time (when), place (where), and person (who) expressions.')}</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <section className="lesson-section" data-aos="fade-up">
          <div className="container">
            <div className="lesson-nav">
              <Link to="/topik" className="btn btn-secondary">
                {t('← TOPIK 홈', '← TOPIK Home')}
              </Link>
              <Link to="/topik/reading" className="btn btn-primary">
                {t('다음: 읽기 →', 'Next: Reading →')}
              </Link>
            </div>
          </div>
        </section>
      </PageLayout>
    </>
  );
}
