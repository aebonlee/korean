import { Link } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';
import { useLanguage } from '../../contexts/LanguageContext';
import useAOS from '../../hooks/useAOS';

const TOPICS = [
  { path: '/culture/kdrama', icon: 'fa-solid fa-tv', title: 'K-드라마', titleEn: 'K-Drama', desc: '인기 한국 드라마에서 자주 나오는 표현, 문화 어휘, 대화 패턴을 배웁니다.', descEn: 'Learn popular expressions, cultural vocabulary, and dialogue patterns from K-Dramas.', lessons: 12, level: 'intermediate' },
  { path: '/culture/kpop', icon: 'fa-solid fa-music', title: 'K-POP', titleEn: 'K-Pop', desc: 'K-Pop 가사에 자주 나오는 단어, 팬 용어, 가사 패턴을 배웁니다.', descEn: 'Learn vocabulary from K-Pop lyrics, fan terminology, and common lyric patterns.', lessons: 12, level: 'intermediate' },
];

export default function CultureHome() {
  const { t } = useLanguage();
  useAOS();

  return (
    <>
      <SEOHead
        title={t('한국 문화 - Korean Pro', 'Korean Culture - Korean Pro')}
        description={t('K-Drama와 K-Pop을 통해 한국어를 재미있게 배우세요.', 'Learn Korean in a fun way through K-Drama and K-Pop.')}
      />

      <section className="page-header" data-aos="fade-up">
        <div className="container">
          <div className="page-header__breadcrumb">
            <Link to="/">{t('홈', 'Home')}</Link>
            <i className="fas fa-chevron-right"></i>
            <span>{t('한국 문화', 'Korean Culture')}</span>
          </div>
          <h1 className="page-header__title">{t('한국 문화', 'Korean Culture')}</h1>
          <p className="page-header__description">
            {t('언어는 문화와 함께 배울 때 가장 효과적입니다.', 'Language learning is most effective when combined with culture.')}
            <br />
            {t('K-Drama와 K-Pop을 통해 생생한 한국어 표현과 한국 문화를 동시에 배워보세요.', 'Learn vivid Korean expressions and Korean culture simultaneously through K-Drama and K-Pop.')}
          </p>
        </div>
      </section>

      <section className="lesson-section" data-aos="fade-up">
        <div className="container">
          <div className="topic-grid">
            {TOPICS.map((topic, idx) => (
              <Link to={topic.path} key={idx} className={`topic-card card topic-card--${topic.level}`} data-aos="fade-up" data-aos-delay={idx * 100}>
                <div className="topic-card__icon">
                  <i className={topic.icon}></i>
                </div>
                <h3 className="topic-card__title">{t(topic.title, topic.titleEn)}</h3>
                <p className="topic-card__desc">{t(topic.desc, topic.descEn)}</p>
                <div className="topic-card__meta">
                  <span className="topic-card__level"><i className="fas fa-signal"></i> {t('중급', 'Intermediate')}</span>
                  <span className="badge">{topic.lessons} {t('표현', 'expressions')}</span>
                </div>
                <span className="topic-card__cta">{t('학습하기 →', 'Start Learning →')}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="lesson-section" data-aos="fade-up">
        <div className="container">
          <h2>{t('왜 문화로 배울까요?', 'Why Learn Through Culture?')}</h2>
          <div className="example-box">
            <ul>
              <li>{t('교과서에서 배우기 어려운 살아있는 표현(슬랭, 유행어)을 배울 수 있습니다.', 'You can learn living expressions (slang, trending words) that are hard to find in textbooks.')}</li>
              <li>{t('문화적 맥락을 이해하면 한국어의 뉘앙스를 더 잘 파악할 수 있습니다.', 'Understanding cultural context helps you better grasp the nuances of Korean.')}</li>
              <li>{t('흥미로운 콘텐츠를 통해 학습 동기가 유지됩니다.', 'Learning motivation stays high through interesting content.')}</li>
              <li>{t('듣기 능력이 자연스럽게 향상됩니다.', 'Listening skills improve naturally.')}</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="lesson-section" data-aos="fade-up">
        <div className="container">
          <div className="tip-box">
            <h4>{t(<><i className="fas fa-lightbulb"></i> 문화 학습 팁</>, <><i className="fas fa-lightbulb"></i> Culture Learning Tips</>)}</h4>
            <ul>
              <li>{t('처음에는 한국어 자막과 함께, 나중에는 자막 없이 드라마를 보세요.', 'Watch dramas with Korean subtitles first, then try without subtitles.')}</li>
              <li>{t('좋아하는 K-Pop 노래의 가사를 번역해 보세요.', 'Try translating the lyrics of your favorite K-Pop songs.')}</li>
              <li>{t('드라마에서 새로운 표현이 나오면 메모하고 따라 말해 보세요.', 'When you hear new expressions in dramas, write them down and practice saying them.')}</li>
              <li>{t('한국 문화를 이해하면 존댓말, 호칭 등의 사용법이 더 자연스러워집니다.', 'Understanding Korean culture makes your use of honorifics and titles more natural.')}</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
