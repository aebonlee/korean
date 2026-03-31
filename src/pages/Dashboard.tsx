import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

const DEFAULT_PROGRESS = {
  hangul: 0,
  conversation: 0,
  grammar: 0,
  vocabulary: 0,
  writing: 0,
  topik: 0,
};

function Dashboard() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [progress, setProgress] = useState(DEFAULT_PROGRESS);
  const [recentActivity, setRecentActivity] = useState<{icon: string; title: string; time: string}[]>([]);

  useEffect(() => {
    try {
      const savedProgress = localStorage.getItem('koreanpro_progress');
      if (savedProgress) {
        setProgress({ ...DEFAULT_PROGRESS, ...JSON.parse(savedProgress) });
      }
    } catch {
      // Use default progress
    }

    try {
      const savedActivity = localStorage.getItem('koreanpro_activity');
      if (savedActivity) {
        setRecentActivity(JSON.parse(savedActivity));
      }
    } catch {
      // Use empty activity
    }
  }, []);

  const progressCards = [
    {
      id: 'hangul',
      title: t('한글 기초 진도', 'Hangul Progress'),
      subtitle: 'Hangul Basics',
      progress: progress.hangul,
      color: '#2C5282',
      link: '/hangul',
      icon: 'fa-solid fa-language',
    },
    {
      id: 'conversation',
      title: t('일상 회화 진도', 'Conversation Progress'),
      subtitle: 'Daily Conversation',
      progress: progress.conversation,
      color: '#2B6CB0',
      link: '/conversation',
      icon: 'fa-solid fa-comments',
    },
    {
      id: 'grammar',
      title: t('문법 학습', 'Grammar Progress'),
      subtitle: 'Korean Grammar',
      progress: progress.grammar,
      color: '#22C55E',
      link: '/grammar',
      icon: 'fa-solid fa-spell-check',
    },
    {
      id: 'vocabulary',
      title: t('어휘 학습', 'Vocabulary Progress'),
      subtitle: 'Vocabulary',
      progress: progress.vocabulary,
      color: '#F59E0B',
      link: '/vocabulary',
      icon: 'fa-solid fa-book',
    },
    {
      id: 'writing',
      title: t('작문 학습', 'Writing Progress'),
      subtitle: 'Korean Writing',
      progress: progress.writing,
      color: '#A855F7',
      link: '/writing',
      icon: 'fa-solid fa-pen-nib',
    },
    {
      id: 'topik',
      title: t('TOPIK 대비', 'TOPIK Prep'),
      subtitle: 'TOPIK Preparation',
      progress: progress.topik,
      color: '#EF4444',
      link: '/topik',
      icon: 'fa-solid fa-graduation-cap',
    },
  ];

  const quickActions = [
    {
      id: 'chat',
      title: t('AI 한국어 대화', 'AI Korean Chat'),
      description: t('AI와 한국어 대화 연습', 'Practice Korean with AI'),
      icon: 'fa-solid fa-robot',
      link: '/ai-chat',
      color: '#06B6D4',
    },
    {
      id: 'pronunciation',
      title: t('발음 연습', 'Speech Practice'),
      description: t('음성 인식으로 발음 교정', 'Pronunciation correction with speech recognition'),
      icon: 'fa-solid fa-microphone',
      link: '/speech',
      color: '#8B5CF6',
    },
    {
      id: 'settings',
      title: t('설정', 'Settings'),
      description: t('API 키 및 환경 설정', 'API key and preferences'),
      icon: 'fa-solid fa-gear',
      link: '/settings',
      color: '#757575',
    },
  ];

  return (
    <>
      <SEOHead
        title={String(t('대시보드 - Korean Pro', 'Dashboard - Korean Pro'))}
        description={String(t('Korean Pro 학습 대시보드. 학습 진도와 활동을 확인하세요.', 'Korean Pro learning dashboard. Check your progress and activity.'))}
      />

      <div className="dashboard">
        {/* Welcome Header */}
        <section className="dashboard__welcome">
          <div className="dashboard__welcome-content">
            <h1 className="dashboard__title">
              {t('안녕하세요!', 'Hello!')}
            </h1>
            <p className="dashboard__subtitle">
              {user?.email
                ? t(`${user.email}님, 오늘도 한국어 학습을 시작해볼까요?`, `${user.email}, ready to continue learning Korean?`)
                : t('오늘도 한국어 학습을 시작해볼까요?', 'Ready to start learning Korean today?')}
            </p>
          </div>
        </section>

        {/* Study Stats */}
        <section className="dashboard__section">
          <h2 className="dashboard__section-title">{t('학습 통계', 'Study Stats')}</h2>
          <div className="dashboard__stats-grid">
            <div className="stat-card">
              <div className="stat-card__value">0</div>
              <div className="stat-card__label">{t('연속 학습일', 'Day Streak')}</div>
            </div>
            <div className="stat-card">
              <div className="stat-card__value">0</div>
              <div className="stat-card__label">{t('학습한 단어', 'Words Learned')}</div>
            </div>
            <div className="stat-card">
              <div className="stat-card__value">0</div>
              <div className="stat-card__label">{t('완료한 레슨', 'Lessons Done')}</div>
            </div>
            <div className="stat-card">
              <div className="stat-card__value">0h</div>
              <div className="stat-card__label">{t('총 학습 시간', 'Total Study Time')}</div>
            </div>
          </div>
        </section>

        {/* Progress Cards */}
        <section className="dashboard__section">
          <h2 className="dashboard__section-title">{t('학습 진도', 'Learning Progress')}</h2>
          <div className="dashboard__progress-grid">
            {progressCards.map((card) => (
              <Link to={card.link} key={card.id} className="progress-card">
                <div className="progress-card__header">
                  <span className="progress-card__icon" style={{ color: card.color }}>
                    <i className={card.icon}></i>
                  </span>
                  <div className="progress-card__info">
                    <h3 className="progress-card__title">{card.title}</h3>
                    <p className="progress-card__subtitle">{card.subtitle}</p>
                  </div>
                </div>
                <div className="progress-card__bar-container">
                  <div
                    className="progress-card__bar"
                    style={{ width: `${card.progress}%`, backgroundColor: card.color }}
                  />
                </div>
                <div className="progress-card__footer">
                  <span className="progress-card__percentage">{card.progress}% {t('완료', 'complete')}</span>
                  <span className="progress-card__action">{t('계속하기 →', 'Continue →')}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section className="dashboard__section">
          <h2 className="dashboard__section-title">{t('빠른 실행', 'Quick Actions')}</h2>
          <div className="dashboard__actions-grid">
            {quickActions.map((action) => (
              <Link to={action.link} key={action.id} className="action-card">
                <span className="action-card__icon" style={{ color: action.color }}>
                  <i className={action.icon}></i>
                </span>
                <h3 className="action-card__title">{action.title}</h3>
                <p className="action-card__description">{action.description}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Recent Activity */}
        <section className="dashboard__section">
          <h2 className="dashboard__section-title">{t('최근 활동', 'Recent Activity')}</h2>
          <div className="dashboard__activity">
            {recentActivity.length > 0 ? (
              <ul className="activity-list">
                {recentActivity.map((item, index) => (
                  <li key={index} className="activity-list__item">
                    <span className="activity-list__icon">{item.icon || '📌'}</span>
                    <div className="activity-list__content">
                      <p className="activity-list__title">{item.title}</p>
                      <span className="activity-list__time">{item.time}</span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="dashboard__empty">
                <p className="dashboard__empty-text">
                  {t('아직 학습 활동이 없습니다.', 'No learning activity yet.')}
                </p>
                <p className="dashboard__empty-hint">
                  {t('학습을 시작하면 여기에 활동 내역이 표시됩니다.', 'Your activity will appear here once you start learning.')}
                </p>
                <Link to="/hangul" className="btn btn--primary">
                  {t('첫 학습 시작하기', 'Start Your First Lesson')}
                </Link>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}

export default Dashboard;
