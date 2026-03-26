import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';
import PageLayout from '../../components/PageLayout';
import { useLanguage } from '../../contexts/LanguageContext';
import useAOS from '../../hooks/useAOS';

function getYoutubeId(url) {
  const m = url.match(/[?&]v=([^&]+)/);
  return m ? m[1] : null;
}

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
  { ko: '아이돌', romanization: 'aidol', en: 'Idol', desc: 'K-Pop 가수, 그룹', descEn: 'K-Pop singer/group' },
  { ko: '팬덤', romanization: 'paendeom', en: 'Fandom', desc: '팬 집단', descEn: 'Fan community' },
  { ko: '컴백', romanization: 'keombaek', en: 'Comeback', desc: '새 앨범, 노래 발표', descEn: 'New album/song release' },
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
  { ko: '오빠, 언니 멋있어!', romanization: 'oppa, eonni meossisseo!', en: "Oppa/Eonni, you're cool!" },
  { ko: '다시 한 번!', romanization: 'dasi han beon!', en: 'One more time!' },
];

const FOLK_SONGS = [
  {
    title: '아리랑',
    titleEn: 'Arirang',
    origin: 'Korean national folk song, UNESCO Intangible Cultural Heritage',
    originKo: '대한민국 대표 민요, 유네스코 인류무형문화유산',
    youtube: 'https://www.youtube.com/watch?v=Yrz49xxOC24',
    lyrics: '아리랑 아리랑 아라리요\n아리랑 고개로 넘어간다\n나를 버리고 가시는 님은\n십 리도 못 가서 발병 난다',
    romanization: 'Arirang arirang arariyo\nArirang gogaero neomeoganda\nNareul beorigo gasineun nimeun\nSip rido mot gaseo balbyeong nanda',
    translation: 'Arirang, Arirang, Arariyo\nCrossing over Arirang Pass\nThe one who abandons me and leaves\nWill get sore feet before going ten ri',
    vocab: [
      { ko: '고개', en: 'mountain pass', rom: 'gogae' },
      { ko: '넘어가다', en: 'to cross over', rom: 'neomeogada' },
      { ko: '버리다', en: 'to abandon', rom: 'beorida' },
      { ko: '님', en: 'beloved (poetic)', rom: 'nim' },
      { ko: '발병', en: 'foot disease', rom: 'balbyeong' },
    ]
  },
  {
    title: '도라지 타령',
    titleEn: 'Doraji Taryeong (Bellflower Song)',
    origin: 'Traditional Korean folk song about picking bellflower roots',
    originKo: '도라지 캐기를 노래한 전통 민요',
    youtube: 'https://www.youtube.com/watch?v=ujEVGiGxlyg',
    lyrics: '도라지 도라지 도라지\n심심산천에 백도라지\n한 두 뿌리만 캐어도\n대바구니 반 시르르 담는다\n에헤요 에헤요 에헤야\n에헤야 난다 지화자 좋다\n네가 내 간장 스리살살 녹인다',
    romanization: 'Doraji doraji doraji\nSimsimsancheone baekdoraji\nHan du ppuriman kaeeodo\nDaebaguni ban sireureul damneunda\nEheyo eheyo eheya\nEheya nanda jihwaja jota\nNega nae ganjang seurisalsal noginda',
    translation: 'Bellflower, bellflower, bellflower\nWhite bellflower in the deep mountains\nEven digging just one or two roots\nFills half a large basket\nEheyo, eheyo, eheya\nEheya, how joyful, jihwaja, how good\nYou melt my heart so softly',
    vocab: [
      { ko: '도라지', en: 'bellflower root', rom: 'doraji' },
      { ko: '산천', en: 'mountains and streams', rom: 'sancheon' },
      { ko: '뿌리', en: 'root', rom: 'ppuri' },
      { ko: '캐다', en: 'to dig up', rom: 'kaeda' },
      { ko: '간장', en: 'heart (figurative)', rom: 'ganjang' },
    ]
  },
  {
    title: '밀양 아리랑',
    titleEn: 'Miryang Arirang',
    origin: 'Regional Arirang variant from Miryang, Gyeongsang Province',
    originKo: '경상도 밀양 지역의 아리랑 변형',
    youtube: 'https://www.youtube.com/watch?v=XDIFWqIx9nc',
    lyrics: '날 좀 보소 날 좀 보소 날 좀 보소\n동지섣달 꽃 본 듯이 날 좀 보소\n아리 아리랑 쓰리 쓰리랑 아라리가 났네\n아리랑 고개로 날 넘겨주소',
    romanization: 'Nal jom boso nal jom boso nal jom boso\nDongjiseotdal kkot bon deusi nal jom boso\nAri arirang sseuri sseurirang arariga nassne\nArirang gogaero nal neomgyeojuso',
    translation: 'Look at me, look at me, look at me\nLook at me as if seeing a flower in midwinter\nAri arirang, sseuri sseurirang, arari has come\nPlease let me cross over Arirang Pass',
    vocab: [
      { ko: '동지섣달', en: 'midwinter months', rom: 'dongjiseotdal' },
      { ko: '꽃', en: 'flower', rom: 'kkot' },
      { ko: '넘기다', en: 'to let pass over', rom: 'neomgida' },
      { ko: '보다', en: 'to look / to see', rom: 'boda' },
    ]
  },
  {
    title: '강강술래',
    titleEn: 'Ganggangsullae',
    origin: 'Traditional circle dance song, UNESCO Intangible Cultural Heritage',
    originKo: '전통 강강술래 놀이 노래, 유네스코 인류무형문화유산',
    youtube: 'https://www.youtube.com/watch?v=6D73WBzzEG4',
    lyrics: '강강술래 강강술래\n뛰어보자 강강술래\n손을 잡고 강강술래\n둥글게 둥글게 강강술래',
    romanization: 'Ganggangsullae ganggangsullae\nTtwieoboja ganggangsullae\nSoneul japgo ganggangsullae\nDunggeulge dunggeulge ganggangsullae',
    translation: 'Ganggangsullae, ganggangsullae\nLet us jump, ganggangsullae\nHolding hands, ganggangsullae\nIn a circle, in a circle, ganggangsullae',
    vocab: [
      { ko: '뛰다', en: 'to jump / to run', rom: 'ttwida' },
      { ko: '손', en: 'hand', rom: 'son' },
      { ko: '잡다', en: 'to hold / to grab', rom: 'japda' },
      { ko: '둥글다', en: 'to be round', rom: 'dunggeulda' },
    ]
  },
  {
    title: '옹헤야',
    titleEn: 'Ongheya',
    origin: 'Traditional Korean folk song celebrating the arrival of spring',
    originKo: '봄의 도래를 노래한 전통 민요',
    youtube: 'https://www.youtube.com/results?search_query=%EC%98%B9%ED%97%A4%EC%95%BC+%EC%A0%84%ED%86%B5+%EB%AF%BC%EC%9A%94',
    lyrics: '옹헤야 옹헤야\n이산 저산 꽃이 피니\n분명코 봄이로구나\n옹헤야 옹헤야',
    romanization: 'Ongheya ongheya\nIsan jeosan kkochi pini\nBunmyeongko bomirogun\nOngheya ongheya',
    translation: 'Ongheya, ongheya\nFlowers bloom on this mountain and that\nIt is surely spring\nOngheya, ongheya',
    vocab: [
      { ko: '산', en: 'mountain', rom: 'san' },
      { ko: '꽃', en: 'flower', rom: 'kkot' },
      { ko: '피다', en: 'to bloom', rom: 'pida' },
      { ko: '봄', en: 'spring', rom: 'bom' },
      { ko: '분명히', en: 'surely / clearly', rom: 'bunmyeonghi' },
    ]
  },
  {
    title: '닐리리야',
    titleEn: 'Nilriliya',
    origin: 'Traditional Korean folk song about love',
    originKo: '사랑을 노래한 전통 민요',
    youtube: 'https://www.youtube.com/results?search_query=%EB%8B%90%EB%A6%AC%EB%A6%AC%EC%95%BC+%EA%B2%BD%EA%B8%B0%EB%AF%BC%EC%9A%94',
    lyrics: '닐리리야 닐리리야\n니나노 닐리리야\n사랑 사랑 내 사랑아\n니나노 닐리리야',
    romanization: 'Nilriliya nilriliya\nNinano nilriliya\nSarang sarang nae saranga\nNinano nilriliya',
    translation: 'Nilriliya, nilriliya\nNinano, nilriliya\nLove, love, my love\nNinano, nilriliya',
    vocab: [
      { ko: '사랑', en: 'love', rom: 'sarang' },
      { ko: '내', en: 'my', rom: 'nae' },
    ]
  },
];

const sections = [
  { id: 'lyrics-vocab', ko: '가사 단어', en: 'Lyrics Vocabulary' },
  { id: 'fan-terms', ko: '팬 용어', en: 'Fan Terminology' },
  { id: 'lyric-patterns', ko: '가사 패턴', en: 'Lyric Patterns' },
  { id: 'fan-chants', ko: '응원 표현', en: 'Fan Chants' },
  { id: 'folk-songs', ko: '전통 민요', en: 'Traditional Folk Songs' },
  { id: 'lyric-analysis', ko: '가사 분석', en: 'Lyric Analysis' },
  { id: 'study-tips', ko: '학습 팁', en: 'Study Tips' },
];

export default function KPop() {
  const { language, t } = useLanguage();
  useAOS();
  const [videoModal, setVideoModal] = useState(null);

  return (
    <>
      {videoModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.8)' }} onClick={() => setVideoModal(null)}>
          <div style={{ position: 'relative', width: '90%', maxWidth: '800px', aspectRatio: '16/9' }} onClick={e => e.stopPropagation()}>
            <iframe
              src={`https://www.youtube.com/embed/${videoModal}?autoplay=1`}
              title="YouTube"
              allow="autoplay; encrypted-media"
              allowFullScreen
              style={{ width: '100%', height: '100%', border: 'none', borderRadius: '12px' }}
            />
            <button
              onClick={() => setVideoModal(null)}
              style={{ position: 'absolute', top: '-40px', right: '0', background: 'none', border: 'none', color: '#fff', fontSize: '1.5rem', cursor: 'pointer', padding: '0.25rem 0.5rem' }}
              aria-label="Close"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>
      )}
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

      <PageLayout sections={sections} category="culture">
        <section id="lyrics-vocab" className="lesson-section" data-aos="fade-up">
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

        <section id="fan-terms" className="lesson-section" data-aos="fade-up">
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

        <section id="lyric-patterns" className="lesson-section" data-aos="fade-up">
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

        <section id="fan-chants" className="lesson-section" data-aos="fade-up">
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

        <section id="folk-songs" className="lesson-section" data-aos="fade-up">
          <div className="container">
            <h2>{t('전통 민요로 배우는 한국어', 'Learn Korean through Traditional Folk Songs')}</h2>
            <p>{t(
              '저작권 걱정 없이 따라 부를 수 있는 한국 전통 민요입니다. 아름다운 가사를 통해 한국어를 배워보세요.',
              'These are traditional Korean folk songs you can sing along without copyright concerns. Learn Korean through beautiful lyrics.'
            )}</p>
            {FOLK_SONGS.map((song, idx) => (
              <div key={idx} className="example-box" data-aos="fade-up" data-aos-delay={idx * 100} style={{ marginBottom: '2rem' }}>
                <h3 style={{ marginBottom: '0.5rem' }}>
                  <i className="fas fa-music" style={{ color: 'var(--primary)', marginRight: '0.5rem' }}></i>
                  {song.title} ({song.titleEn})
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                  {language === 'ko' ? song.originKo : song.origin}
                </p>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                  {getYoutubeId(song.youtube) ? (
                    <button type="button" className="btn btn-primary" style={{ fontSize: '0.85rem', padding: '0.4rem 1rem' }} onClick={() => setVideoModal(getYoutubeId(song.youtube))}>
                      <i className="fab fa-youtube" style={{ marginRight: '0.4rem' }}></i>
                      {t('노래 듣기', 'Listen')}
                    </button>
                  ) : (
                    <a href={song.youtube} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ fontSize: '0.85rem', padding: '0.4rem 1rem' }}>
                      <i className="fas fa-search" style={{ marginRight: '0.4rem' }}></i>
                      {t('노래 검색', 'Search on YouTube')}
                    </a>
                  )}
                  <button type="button" className="btn btn-secondary" style={{ fontSize: '0.85rem', padding: '0.4rem 1rem' }} onClick={() => {
                    const synth = window.speechSynthesis;
                    if (!synth) return;
                    synth.cancel();
                    const utterance = new SpeechSynthesisUtterance(song.lyrics.replace(/\n/g, '. '));
                    utterance.lang = 'ko-KR';
                    utterance.rate = 0.8;
                    const voices = synth.getVoices();
                    const koVoice = voices.find(v => v.lang === 'ko-KR') || voices.find(v => v.lang.startsWith('ko'));
                    if (koVoice) utterance.voice = koVoice;
                    synth.speak(utterance);
                  }}>
                    <i className="fas fa-volume-up" style={{ marginRight: '0.4rem' }}></i>
                    {t('가사 듣기 (TTS)', 'Listen to Lyrics (TTS)')}
                  </button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <h4 style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>{t('가사', 'Lyrics')}</h4>
                    <p style={{ whiteSpace: 'pre-line', lineHeight: 1.8, fontWeight: 500 }}>{song.lyrics}</p>
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>{t('발음', 'Romanization')}</h4>
                    <p style={{ whiteSpace: 'pre-line', lineHeight: 1.8, fontStyle: 'italic' }}>{song.romanization}</p>
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>{t('번역', 'Translation')}</h4>
                    <p style={{ whiteSpace: 'pre-line', lineHeight: 1.8 }}>{song.translation}</p>
                  </div>
                </div>
                <h4 style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>{t('핵심 어휘', 'Key Vocabulary')}</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {song.vocab.map((v, vi) => (
                    <span key={vi} className="badge" style={{ padding: '0.35rem 0.75rem', fontSize: '0.85rem' }}>
                      {v.ko} ({v.rom}) — {v.en}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="lyric-analysis" className="lesson-section" data-aos="fade-up">
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

        <section id="study-tips" className="lesson-section" data-aos="fade-up">
          <div className="container">
            <div className="tip-box">
              <h4>{t(<><i className="fas fa-lightbulb"></i> K-Pop 학습 팁</>, <><i className="fas fa-lightbulb"></i> K-Pop Study Tips</>)}</h4>
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
      </PageLayout>
    </>
  );
}
