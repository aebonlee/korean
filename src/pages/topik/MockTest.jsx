import { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';
import PageLayout from '../../components/PageLayout';
import { useLanguage } from '../../contexts/LanguageContext';
import { TOPIK_LISTENING, TOPIK_READING } from '../../data/topikData';
import useAOS from '../../hooks/useAOS';

const ALL_QUESTIONS = [
  ...TOPIK_LISTENING.map((q) => ({ ...q, type: 'listening' })),
  ...TOPIK_READING.map((q) => ({ ...q, type: 'reading' })),
];

const TOTAL_TIME_SECONDS = 30 * 60; // 30 minutes for the mock test

const sections = [
  { id: 'test-info', ko: '시험 정보', en: 'Test Information' },
];

export default function MockTest() {
  const { language, t } = useLanguage();
  const [testStarted, setTestStarted] = useState(false);
  const [testFinished, setTestFinished] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(TOTAL_TIME_SECONDS);
  const timerRef = useRef(null);
  useAOS();

  const startTest = () => {
    setTestStarted(true);
    setTestFinished(false);
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setTimeRemaining(TOTAL_TIME_SECONDS);
  };

  const finishTest = useCallback(() => {
    setTestFinished(true);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (testStarted && !testFinished) {
      timerRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            finishTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [testStarted, testFinished, finishTest]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleSelectAnswer = (optionIndex) => {
    const qId = ALL_QUESTIONS[currentQuestion].id + '-' + ALL_QUESTIONS[currentQuestion].type;
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optionIndex }));
  };

  const getScore = () => {
    let correct = 0;
    ALL_QUESTIONS.forEach((q) => {
      const qId = q.id + '-' + q.type;
      if (selectedAnswers[qId] === q.answer) correct++;
    });
    return correct;
  };

  const question = ALL_QUESTIONS[currentQuestion];
  const qId = question ? question.id + '-' + question.type : '';

  // Not started yet
  if (!testStarted) {
    return (
      <>
        <SEOHead
          title={t('TOPIK 모의 시험 - Korean Pro', 'TOPIK Mock Test - Korean Pro')}
          description={t(
            'TOPIK 모의 시험으로 실력을 테스트하세요. 타이머와 함께 실전 연습을 합니다.',
            'Test your skills with a TOPIK mock test. Practice with a timer for a real exam experience.'
          )}
        />

        <section className="page-header" data-aos="fade-up">
          <div className="container">
            <div className="page-header__breadcrumb">
              <Link to="/">{t('홈', 'Home')}</Link>
              <i className="fas fa-chevron-right"></i>
              <Link to="/topik">{t('TOPIK', 'TOPIK')}</Link>
              <i className="fas fa-chevron-right"></i>
              <span>{t('모의 시험', 'Mock Test')}</span>
            </div>
            <h1 className="page-header__title">{t('TOPIK 모의 시험', 'TOPIK Mock Test')}</h1>
            <p className="page-header__description">
              {t(
                '실전처럼 시간을 재며 문제를 풀어보세요. 듣기와 읽기 문제가 혼합되어 있습니다.',
                'Solve questions with a timer like the real exam. Listening and reading questions are mixed.'
              )}
            </p>
          </div>
        </section>

        <PageLayout sections={sections} category="topik">
          <section id="test-info" className="lesson-section" data-aos="fade-up">
            <div className="container">
              <div className="example-box" style={{ textAlign: 'center', padding: '3rem' }}>
                <h2>{t('시험 정보', 'Test Information')}</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1.5rem', margin: '2rem 0' }}>
                  <div>
                    <p style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--primary)' }}>{ALL_QUESTIONS.length}</p>
                    <p>{t('문항 수', 'Questions')}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--primary)' }}>30{t('분', 'min')}</p>
                    <p>{t('제한 시간', 'Time Limit')}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--primary)' }}>TOPIK I</p>
                    <p>{t('난이도', 'Level')}</p>
                  </div>
                </div>
                <ul style={{ textAlign: 'left', maxWidth: '500px', margin: '0 auto 2rem' }}>
                  <li>{t('듣기와 읽기 문제가 혼합되어 있습니다.', 'Listening and reading questions are mixed.')}</li>
                  <li>{t('시간이 끝나면 자동으로 제출됩니다.', 'The test auto-submits when time runs out.')}</li>
                  <li>{t('문제 번호를 클릭하여 이동할 수 있습니다.', 'Click question numbers to navigate.')}</li>
                </ul>
                <button className="btn btn-primary" onClick={startTest} style={{ fontSize: '1.2rem', padding: '0.75rem 2rem' }}>
                  {t('시험 시작', 'Start Test')}
                </button>
              </div>
            </div>
          </section>
        </PageLayout>
      </>
    );
  }

  // Test finished - show results
  if (testFinished) {
    const score = getScore();
    const total = ALL_QUESTIONS.length;
    const percentage = Math.round((score / total) * 100);

    return (
      <>
        <SEOHead title={t('시험 결과 - Korean Pro', 'Test Results - Korean Pro')} />

        <section className="page-header" data-aos="fade-up">
          <div className="container">
            <div className="page-header__breadcrumb">
              <Link to="/">{t('홈', 'Home')}</Link>
              <i className="fas fa-chevron-right"></i>
              <Link to="/topik">{t('TOPIK', 'TOPIK')}</Link>
              <i className="fas fa-chevron-right"></i>
              <span>{t('시험 결과', 'Results')}</span>
            </div>
            <h1 className="page-header__title">{t('시험 결과', 'Test Results')}</h1>
          </div>
        </section>

        <section className="lesson-section" data-aos="fade-up">
          <div className="container">
            <div className="example-box" style={{ textAlign: 'center', padding: '3rem' }}>
              <p style={{ fontSize: '4rem', fontWeight: '700', color: percentage >= 60 ? '#4CAF50' : '#f44336' }}>
                {percentage}%
              </p>
              <p style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
                {score} / {total} {t('정답', 'correct')}
              </p>
              <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>
                {percentage >= 80
                  ? t('훌륭합니다! 매우 좋은 점수입니다.', 'Excellent! Very good score.')
                  : percentage >= 60
                  ? t('잘하셨습니다! 조금 더 연습하면 완벽합니다.', 'Good job! A little more practice and you\'ll be perfect.')
                  : t('더 많은 연습이 필요합니다. 포기하지 마세요!', 'More practice needed. Don\'t give up!')
                }
              </p>

              {/* Review Answers */}
              <div style={{ textAlign: 'left', marginTop: '2rem' }}>
                <h3>{t('문제별 결과', 'Results by Question')}</h3>
                {ALL_QUESTIONS.map((q, idx) => {
                  const id = q.id + '-' + q.type;
                  const isCorrect = selectedAnswers[id] === q.answer;
                  return (
                    <div key={id} style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--border-color, #eee)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span>
                        {t('문제', 'Q')} {idx + 1} ({q.type === 'listening' ? t('듣기', 'Listening') : t('읽기', 'Reading')})
                      </span>
                      <span style={{ fontWeight: '600', color: isCorrect ? '#4CAF50' : '#f44336' }}>
                        {isCorrect ? t('정답', 'Correct') : t('오답', 'Wrong')}
                        {!isCorrect && ` (${t('정답', 'Answer')}: ${q.answer + 1})`}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button className="btn btn-primary" onClick={startTest}>
                  {t('다시 시험 보기', 'Retake Test')}
                </button>
                <Link to="/topik" className="btn btn-secondary">
                  {t('TOPIK 홈으로', 'Back to TOPIK')}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  // Test in progress
  return (
    <>
      <SEOHead title={t('TOPIK 모의 시험 진행 중', 'TOPIK Mock Test In Progress')} />

      {/* Timer & Navigation Bar */}
      <div style={{ position: 'sticky', top: 0, zIndex: 100, backgroundColor: 'var(--bg-primary, #fff)', borderBottom: '2px solid var(--border-color, #eee)', padding: '0.75rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
            {/* Timer */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <i className="fas fa-clock" style={{ color: timeRemaining < 300 ? '#f44336' : 'var(--primary)' }}></i>
              <span style={{ fontSize: '1.3rem', fontWeight: '700', fontFamily: 'monospace', color: timeRemaining < 300 ? '#f44336' : 'inherit' }}>
                {formatTime(timeRemaining)}
              </span>
            </div>

            {/* Question Number Navigation */}
            <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap' }}>
              {ALL_QUESTIONS.map((q, idx) => {
                const id = q.id + '-' + q.type;
                const answered = selectedAnswers[id] !== undefined;
                return (
                  <button
                    key={id}
                    onClick={() => setCurrentQuestion(idx)}
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '4px',
                      border: idx === currentQuestion ? '2px solid var(--primary)' : '1px solid var(--border-color, #ddd)',
                      backgroundColor: answered ? 'var(--primary)' : 'transparent',
                      color: answered ? 'white' : 'inherit',
                      fontWeight: idx === currentQuestion ? '700' : '400',
                      cursor: 'pointer',
                      fontSize: '0.8rem',
                    }}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            <button className="btn btn-sm btn-primary" onClick={finishTest}>
              {t('시험 종료', 'Finish')}
            </button>
          </div>
        </div>
      </div>

      {/* Current Question */}
      <section className="lesson-section">
        <div className="container">
          <div className="example-box" style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ margin: 0 }}>
                {t('문제', 'Question')} {currentQuestion + 1} / {ALL_QUESTIONS.length}
              </h3>
              <div>
                <span className="badge" style={{ marginRight: '0.5rem' }}>{question.level}</span>
                <span className="badge">
                  {question.type === 'listening' ? t('듣기', 'Listening') : t('읽기', 'Reading')}
                </span>
              </div>
            </div>

            {/* Show passage for reading / transcript for listening */}
            {question.type === 'reading' && question.passage && (
              <div style={{ padding: '1.5rem', backgroundColor: 'var(--bg-secondary, #f5f5f5)', borderRadius: '8px', marginBottom: '1rem', lineHeight: '1.8' }}>
                <p style={{ fontSize: '1.05rem' }}>{question.passage}</p>
              </div>
            )}

            {question.type === 'listening' && question.transcript && (
              <div style={{ padding: '1rem', backgroundColor: 'var(--bg-secondary, #f5f5f5)', borderRadius: '8px', marginBottom: '1rem' }}>
                <p style={{ fontWeight: '500' }}>{question.transcript}</p>
              </div>
            )}

            <p><strong>{language === 'ko' ? question.question : question.questionEn}</strong></p>

            {/* Options */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {question.options.map((option, optIdx) => (
                <button
                  key={optIdx}
                  onClick={() => handleSelectAnswer(optIdx)}
                  style={{
                    textAlign: 'left',
                    padding: '0.75rem 1rem',
                    border: '2px solid',
                    borderColor: selectedAnswers[qId] === optIdx ? 'var(--primary)' : 'var(--border-color, #ddd)',
                    borderRadius: '8px',
                    backgroundColor: selectedAnswers[qId] === optIdx ? 'var(--bg-secondary, #e3f2fd)' : 'transparent',
                    cursor: 'pointer',
                  }}
                >
                  <span style={{ fontWeight: '600', marginRight: '0.5rem' }}>{optIdx + 1}.</span>
                  {option}
                </button>
              ))}
            </div>

            {/* Navigation Buttons */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem' }}>
              <button
                className="btn btn-secondary"
                onClick={() => setCurrentQuestion((prev) => Math.max(0, prev - 1))}
                disabled={currentQuestion === 0}
              >
                {t('← 이전', '← Previous')}
              </button>
              {currentQuestion < ALL_QUESTIONS.length - 1 ? (
                <button
                  className="btn btn-primary"
                  onClick={() => setCurrentQuestion((prev) => Math.min(ALL_QUESTIONS.length - 1, prev + 1))}
                >
                  {t('다음 →', 'Next →')}
                </button>
              ) : (
                <button className="btn btn-primary" onClick={finishTest}>
                  {t('시험 종료', 'Finish Test')}
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
