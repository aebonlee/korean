import { Link } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';
import { useLanguage } from '../../contexts/LanguageContext';
import useAOS from '../../hooks/useAOS';

const LYRICS_VOCAB = [
  { ko: '사랑', romanization: 'sarang', en: 'Love', usage: '가장 많이 등장하는 단어', usageEn: 'Most frequently appearing word' },
  { ko: '꿈', romanization: 'kkum', en: 'Dream', usage: '희망과 꿈을 노래하는 가사', usageEn: 'Lyrics about hopes and dreams' },
  { ko: '별', romanization: 'byeol', en: 'Star', usage: '사랑하는 사람을 별에 비유', usageEn: 'Comparing a loved one to a star' },
  { ko: '눈물', romanization: 'nunmul', en: 'Tears', usage: '슬픈 발라드에서 자주 등장', usageEn: 'Frequently appears in sad ballads' },
  { ko: '마음', romanization: 'maeum', en: 'Heart / Mind', usage: '감정을 표현하는 가사', usageEn: 'Lyrics expressing emotions' },
  { ko: '하늘', romanization: 'haneul', en: 'Sky', usage: '자유와 희망의 상징', usageEn: 'Symbol of freedom and hope' },
  { ko: '그리움', romanization: 'girieum', en: 'Longing / Missing', usage: '이별 후의 감정', usageEn: 'Emotions after a breakup' },
  { ko: '영원히', romanization: 'yeongwonhi', en: 'Forever', usage: '영원한 사랑을 약속하는 가사', usageEn: 'Lyrics promising eternal love' },
  { ko: '함께', romanization: 'hamkke', en: 'Together', usage: '팬과의 유대를 표현', usageEn: 'Expressing bond with fans' },
  { ko: '빛', romanization: 'bit', en: 'Light', usage: '희망과 긍정의 메시지', usageEn: 'Messages of hope and positivity' },
  { ko: '길', romanization: 'gil', en: 'Road / Path', usage: '인생의 여정을 비유', usageEn: "Metaphor for life's journey" },
  { ko: '기억', romanization: 'gieok', en: 'Memory', usage: '추억과 그리움을 노래', usageEn: 'Songs about memories and longing' },
];

const FAN_TERMS = [
  { ko: '아이돌', romanization: 'aidol', en: 'Idol', desc: 'K-Pop 가수/그룹', descEn: 'K-Pop singer/group' },
  { ko: '팬덤', romanization: 'paendeom', en: 'Fandom', desc: '팬 집단', descEn: 'Fan community' },
  { ko: '컴백', romanization: 'keombaek', en: 'Comeback', desc: '새 앨범/노래 발표', descEn: 'New album/song release' },
  { ko: '음원', romanization: 'eumwon', en: 'Digital music', desc: '디지털 음악 발매', descEn: 'Digital music release' },
  { ko: '총공', romanization: 'chonggong', en: 'Mass streaming', desc: '팬들이 함께 스트리밍', descEn: 'Fans streaming together' },
  { ko: '덕질', romanization: 'deokjil', en: 'Fangirling/Fanboying', desc: '팬 활동', descEn: 'Doing fan activities' },
  { ko: '최애', romanization: 'choeae', en: 'Bias / Ultimate favorite', desc: '가장 좋아하는 멤버', descEn: 'Favorite member' },
  { ko: '응원봉', romanization: 'eungwonbong', en: 'Light stick', desc: '콘서트 응원 도구', descEn: 'Concert cheering tool' },
  { ko: '막내', romanization: 'maknae', en: 'Youngest member', desc: '그룹에서 가장 어린 멤버', descEn: 'Youngest member of a group' },
  { ko: '리더', romanization: 'rideo', en: 'Leader', desc: '그룹의 리더', descEn: 'Group leader' },
  { ko: '뮤비', romanization: 'myubi', en: 'Music Video (MV)', desc: '뮤직비디오의 줄임말', descEn: 'Short for music video' },
  { ko: '음방', romanization: 'eumbang', en: 'Music show', desc: '음악 방송의 줄임말', descEn: 'Short for music broadcast show' },
];

const LYRIC_PATTERNS = [
  { pattern: '너를 사랑해', en: 'I love you', desc: '가장 기본적인 사랑 표현', descEn: 'Most basic love expression' },
  { pattern: '이 밤이 지나면', en: 'When this night passes', desc: '시간의 흐름을 표현', descEn: 'Expressing the passage of time' },
  { pattern: '너 없이는 못 살아', en: "I can't live without you", desc: '강한 사랑을 표현', descEn: 'Expressing strong love' },
  { pattern: '우리 함께 걸어가자', en: "Let's walk together", desc: '동반자의 의미', descEn: 'Meaning of companionship' },
  { pattern: '다시 만날 수 있을까', en: 'Will we meet again?', desc: '이별 후의 그리움', descEn: 'Longing after separation' },
  { pattern: '꿈을 향해 달려가', en: 'Run toward your dream', desc: '희망과 도전의 메시지', descEn: 'Message of hope and challenge' },
];

const FAN_CHANTS = [
  { ko: '우리 ___는 최고!', romanization: 'uri ___neun choego!', en: 'Our ___ is the best!' },
  { ko: '앙코르! 앙코르!', romanization: 'angkoreu! angkoreu!', en: 'Encore! Encore!' },
  { ko: '사랑해요!', romanization: 'saranghaeyo!', en: 'We love you!' },
  { ko: '오빠/언니 멋있어!', romanization: 'oppa/eonni meossisseo!', en: "Oppa/Eonni, you're cool!" },
  { ko: '다시 한 번!', romanization: 'dasi han beon!', en: 'One more time!' },
];

export default function KPop() {
  const { language, t } = useLanguage();
  useAOS();

  return (
    <>
      <SEOHead
        title={t('K-Pop 한국어 - Korean Pro', 'Learn Korean through K-Pop - Korean Pro')}
        description={t('K-Pop 가사에 나오는 한국어 단어와 팬 용어를 배우세요.', 'Learn Korean words from K-Pop lyrics and fan terminology.')}
      />

      <section className="page-header" data-aos="fade-up">
        <div className="container">
          <div className="page-header__breadcrumb">
            <Link to="/">{t('홈', 'Home')}</Link>
            <i className="fas fa-chevron-right"></i>
            <Link to="/culture">{t('한국 문화', 'Culture')}</Link>
            <i className="fas fa-chevron-right"></i>
            <span>K-Pop</span>
          </div>
          <h1 className="page-header__title">
            {language === 'ko' ? <>K-Pop으로 배우는 한국어</> : 'Learn Korean through K-Pop'}
          </h1>
          <p className="page-header__description">
            {t(
              'K-Pop 가사에서 자주 사용되는 단어, 팬 용어, 가사 패턴을 배워보세요. 좋아하는 노래를 더 깊이 이해하면서 한국어 실력도 향상시킬 수 있습니다.',
              'Learn vocabulary used in K-Pop lyrics, fan terminology, and lyric patterns. Understand your favorite songs more deeply while improving Korean.'
            )}
          </p>
        </div>
      </section>

      <section className="lesson-section" data-aos="fade-up">
        <div className="container">
          <h2>{t('1. 가사에 자주 나오는 단어', '1. Words Frequently Found in Lyrics')}</h2>
          <p>{t('이 단어들은 K-Pop 가사에서 가장 자주 등장합니다.', 'These words appear most frequently in K-Pop lyrics.')}</p>
          <div className="expression-grid">
            {LYRICS_VOCAB.map((item, index) => (
              <div key={index} className="expression-card" data-aos="fade-up" data-aos-delay={(index % 6) * 50}>
                <p className="expression-card__korean" style={{ fontSize: '1.5rem' }}>{item.ko}</p>
                <p className="expression-card__romanization">{item.romanization}</p>
                <p className="expression-card__english">{item.en}</p>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                  {language === 'ko' ? item.usage : item.usageEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="lesson-section" data-aos="fade-up">
        <div className="container">
          <h2>{t('2. K-Pop 팬 용어', '2. K-Pop Fan Terminology')}</h2>
          <p>{t('K-Pop 팬이라면 반드시 알아야 할 필수 용어입니다.', 'Essential terms every K-Pop fan should know.')}</p>
          <div className="example-box" data-aos="fade-up">
            <table className="expression-table">
              <thead>
                <tr>
                  <th>{t('용어', 'Term')}</th>
                  <th>{t('발음', 'Pronunciation')}</th>
                  <th>{t('영어', 'English')}</th>
                  <th>{t('설명', 'Description')}</th>
                </tr>
              </thead>
              <tbody>
                {FAN_TERMS.map((term, i) => (
                  <tr key={i}>
                    <td><strong>{term.ko}</strong></td>
                    <td>{term.romanization}</td>
                    <td>{term.en}</td>
                    <td>{language === 'ko' ? term.desc : term.descEn}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="lesson-section" data-aos="fade-up">
        <div className="container">
          <h2>{t('3. 자주 나오는 가사 패턴', '3. Common Lyric Patterns')}</h2>
          <div className="example-box" data-aos="fade-up">
            <table className="expression-table">
              <thead>
                <tr>
                  <th>{t('가사 패턴', 'Lyric Pattern')}</th>
                  <th>{t('영어', 'English')}</th>
                  <th>{t('설명', 'Description')}</th>
                </tr>
              </thead>
              <tbody>
                {LYRIC_PATTERNS.map((item, i) => (
                  <tr key={i}>
                    <td><strong>{item.pattern}</strong></td>
                    <td>{item.en}</td>
                    <td>{language === 'ko' ? item.desc : item.descEn}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="lesson-section" data-aos="fade-up">
        <div className="container">
          <h2>{t('4. 응원 표현 & 팬 챈트', '4. Fan Chants & Expressions')}</h2>
          <div className="expression-grid">
            {FAN_CHANTS.map((chant, idx) => (
              <div key={idx} className="expression-card" data-aos="fade-up" data-aos-delay={idx * 50}>
                <p className="expression-card__korean">{chant.ko}</p>
                <p className="expression-card__romanization">{chant.romanization}</p>
                <p className="expression-card__english">{chant.en}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="lesson-section" data-aos="fade-up">
        <div className="container">
          <h2>{t('5. 학습 활동: 가사 분석', '5. Study Activity: Lyric Analysis')}</h2>
          <div className="example-box" data-aos="fade-up">
            <p>{t('아래 단계를 따라 좋아하는 K-Pop 노래로 한국어를 공부해 보세요:', 'Follow these steps to study Korean using your favorite K-Pop song:')}</p>
            <ol>
              <li>{t('좋아하는 K-Pop 노래 하나를 선택하세요.', 'Choose one of your favorite K-Pop songs.')}</li>
              <li>{t('한국어 가사를 찾아서 적어보세요.', 'Find and write down the Korean lyrics.')}</li>
              <li>{t('모르는 단어를 사전에서 찾아보세요.', 'Look up unknown words in a dictionary.')}</li>
              <li>{t('가사를 문장 단위로 해석해 보세요.', 'Translate the lyrics sentence by sentence.')}</li>
              <li>{t('노래를 들으며 가사를 따라 읽어보세요.', 'Read along with the lyrics while listening.')}</li>
              <li>{t('노래를 따라 불러보세요!', 'Sing along with the song!')}</li>
            </ol>
          </div>
        </div>
      </section>

      <section className="lesson-section" data-aos="fade-up">
        <div className="container">
          <div className="tip-box">
            <h4>{t('💡 K-Pop 학습 팁', '💡 K-Pop Study Tips')}</h4>
            <ul>
              <li>{t('발라드(느린 노래)부터 시작하세요. 가사가 더 명확하게 들립니다.', 'Start with ballads (slow songs). The lyrics are clearer to hear.')}</li>
              <li>{t('뮤직비디오의 한국어 자막을 활용하세요.', 'Use Korean subtitles in music videos.')}</li>
              <li>{t('K-Pop 가사 번역 사이트를 참고하되, 직접 번역도 시도해 보세요.', 'Reference lyric translation sites, but also try translating on your own.')}</li>
              <li>{t('K-Pop 관련 한국어 콘텐츠(인터뷰, 예능)도 시청하세요.', 'Also watch Korean content related to K-Pop (interviews, variety shows).')}</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="lesson-section" data-aos="fade-up">
        <div className="container">
          <div className="lesson-nav">
            <Link to="/culture/kdrama" className="btn btn-secondary">{t('← K-Drama', '← K-Drama')}</Link>
            <Link to="/culture" className="btn btn-primary">{t('문화 홈으로 →', 'Culture Home →')}</Link>
          </div>
        </div>
      </section>
    </>
  );
}
