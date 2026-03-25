import { Link } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';
import PageLayout from '../../components/PageLayout';
import { useLanguage } from '../../contexts/LanguageContext';
import useAOS from '../../hooks/useAOS';

const DRAMA_PHRASES = [
  { ko: '사랑해요', romanization: 'saranghaeyo', en: 'I love you', context: '로맨스 드라마 필수 표현', contextEn: 'Essential expression in romance dramas' },
  { ko: '보고 싶었어요', romanization: 'bogo sipeoesseoyo', en: 'I missed you', context: '오랜만에 만났을 때', contextEn: 'When meeting after a long time' },
  { ko: '화이팅!', romanization: 'hwaiting!', en: 'Fighting! / You can do it!', context: '응원할 때 사용하는 콩글리시', contextEn: 'Konglish cheering expression' },
  { ko: '대박!', romanization: 'daebak!', en: 'Awesome! / Jackpot!', context: '놀랍거나 대단한 일에 감탄', contextEn: 'Exclamation for something amazing' },
  { ko: '진짜?', romanization: 'jinjja?', en: 'Really?', context: '놀랐을 때 자주 사용', contextEn: 'Used frequently when surprised' },
  { ko: '미쳤어?', romanization: 'michyeosseo?', en: 'Are you crazy?', context: '놀라거나 화날 때 (친한 사이)', contextEn: 'When surprised or angry (close friends)' },
  { ko: '어떡해', romanization: 'eotteokhae', en: 'What should I do? / Oh no!', context: '곤란한 상황에서 사용', contextEn: 'Used in difficult situations' },
  { ko: '왜 이래?', romanization: 'wae irae?', en: 'Why are you like this?', context: '불만을 표현할 때', contextEn: 'Expressing displeasure' },
  { ko: '괜찮아요', romanization: 'gwaenchanayo', en: "It's okay / Are you okay?", context: '위로하거나 걱정할 때', contextEn: 'Comforting or expressing concern' },
  { ko: '가지 마', romanization: 'gaji ma', en: "Don't go", context: '이별 장면에서 자주 등장', contextEn: 'Frequently appears in farewell scenes' },
  { ko: '헐!', romanization: 'heol!', en: 'OMG!', context: '놀랐을 때 감탄사', contextEn: 'Exclamation of surprise' },
  { ko: '아이고', romanization: 'aigo', en: 'Oh my / Oh dear', context: '다양한 감정 표현 (한숨, 놀람 등)', contextEn: 'Various emotional expressions (sighing, surprise, etc.)' },
];

const CULTURAL_VOCAB = [
  { ko: '재벌', romanization: 'jaebeol', en: 'Chaebol / Conglomerate family', desc: '대기업 총수 집안 - 드라마 단골 소재', descEn: 'Rich corporate family - common drama theme' },
  { ko: '선배', romanization: 'seonbae', en: 'Senior (school/work)', desc: '학교나 직장에서 먼저 온 사람', descEn: 'Someone who came before you at school or work' },
  { ko: '후배', romanization: 'hubae', en: 'Junior (school/work)', desc: '학교나 직장에서 나중에 온 사람', descEn: 'Someone who came after you' },
  { ko: '소주', romanization: 'soju', en: 'Soju (Korean liquor)', desc: '한국의 대표적인 술', descEn: "Korea's representative alcoholic drink" },
  { ko: '편의점', romanization: 'pyeonuijeom', en: 'Convenience store', desc: '드라마에 자주 등장하는 장소', descEn: 'A location frequently appearing in dramas' },
  { ko: '치맥', romanization: 'chimaek', en: 'Chicken + Beer', desc: '치킨과 맥주의 줄임말', descEn: 'Short for chicken and beer' },
  { ko: '한강', romanization: 'hangang', en: 'Han River', desc: '서울의 드라마 단골 배경', descEn: "Seoul's common drama backdrop" },
  { ko: '고백', romanization: 'gobaek', en: 'Confession (of love)', desc: '사랑 고백의 줄임말', descEn: 'Short for confessing love' },
];

const DRAMA_DIALOGUES = [
  {
    titleKo: '첫 만남 장면',
    titleEn: 'First Meeting Scene',
    lines: [
      { speaker: 'A', ko: '실례지만, 혹시 이 근처에 카페 있어요?', en: 'Excuse me, is there a cafe nearby?' },
      { speaker: 'B', ko: '네, 저쪽으로 가시면 있어요.', en: 'Yes, if you go that way, there is one.' },
      { speaker: 'A', ko: '감사합니다. 혹시... 저 어디서 본 것 같은데요.', en: 'Thank you. Have we... met somewhere before?' },
      { speaker: 'B', ko: '그런 것 같기도 하고... 아닌 것 같기도 하고.', en: 'Maybe... or maybe not.' },
    ],
  },
  {
    titleKo: '오해 장면',
    titleEn: 'Misunderstanding Scene',
    lines: [
      { speaker: 'A', ko: '내 말 좀 들어봐!', en: 'Listen to me!' },
      { speaker: 'B', ko: '더 이상 할 말 없어.', en: 'I have nothing more to say.' },
      { speaker: 'A', ko: '오해야. 그게 아니라...', en: "It's a misunderstanding. That's not what..." },
      { speaker: 'B', ko: '그럼 뭔데? 설명해 봐.', en: 'Then what? Try explaining.' },
    ],
  },
  {
    titleKo: '화해 장면',
    titleEn: 'Reconciliation Scene',
    lines: [
      { speaker: 'A', ko: '미안해. 내가 잘못했어.', en: "I'm sorry. I was wrong." },
      { speaker: 'B', ko: '...나도 미안해.', en: "...I'm sorry too." },
      { speaker: 'A', ko: '다시는 그러지 않을게.', en: "I won't do it again." },
      { speaker: 'B', ko: '알겠어. 이번만 봐줄게.', en: "Okay. I'll let it go this time." },
    ],
  },
];

const sections = [
  { id: 'drama-expressions', ko: '드라마 필수 표현', en: 'Essential Drama Expressions' },
  { id: 'cultural-vocab', ko: '드라마 문화 어휘', en: 'Drama Cultural Vocabulary' },
  { id: 'dialogue-practice', ko: '드라마 대화 연습', en: 'Drama Dialogue Practice' },
  { id: 'study-tips', ko: '학습 팁', en: 'Study Tips' },
];

export default function KDrama() {
  const { language, t } = useLanguage();
  useAOS();

  return (
    <>
      <SEOHead
        title={t('K-Drama 한국어 - Korean Pro', 'Learn Korean through K-Drama - Korean Pro')}
        description={t('K-Drama에서 자주 나오는 한국어 표현과 문화 어휘를 배우세요.', 'Learn Korean expressions and cultural vocabulary commonly heard in K-Dramas.')}
      />

      <section className="page-header" data-aos="fade-up">
        <div className="container">
          <div className="page-header__breadcrumb">
            <Link to="/">{t('홈', 'Home')}</Link>
            <i className="fas fa-chevron-right"></i>
            <Link to="/culture">{t('한국 문화', 'Culture')}</Link>
            <i className="fas fa-chevron-right"></i>
            <span>{t('K-Drama', 'K-Drama')}</span>
          </div>
          <h1 className="page-header__title">
            {language === 'ko' ? <>K-Drama로 배우는 한국어</> : 'Learn Korean through K-Drama'}
          </h1>
          <p className="page-header__description">
            {t(
              '한국 드라마에서 자주 등장하는 표현, 문화 어휘, 대화 패턴을 배워보세요. 드라마를 더 재미있게 보면서 한국어 실력도 향상시킬 수 있습니다.',
              'Learn popular expressions, cultural vocabulary, and dialogue patterns from Korean dramas. Enjoy dramas more while improving your Korean skills.'
            )}
          </p>
        </div>
      </section>

      <PageLayout sections={sections} category="culture">
        <section id="drama-expressions" className="lesson-section" data-aos="fade-up">
          <div className="container">
            <h2>{t('1. 드라마 필수 표현', '1. Essential Drama Expressions')}</h2>
            <p>{t('이 표현들은 거의 모든 한국 드라마에서 들을 수 있습니다.', 'These expressions can be heard in almost every Korean drama.')}</p>
            <div className="expression-grid">
              {DRAMA_PHRASES.map((phrase, index) => (
                <div key={index} className="expression-card" data-aos="fade-up" data-aos-delay={(index % 6) * 50}>
                  <p className="expression-card__korean" style={{ fontSize: '1.3rem' }}>{phrase.ko}</p>
                  <p className="expression-card__romanization">{phrase.romanization}</p>
                  <p className="expression-card__english">{phrase.en}</p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                    {language === 'ko' ? phrase.context : phrase.contextEn}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="cultural-vocab" className="lesson-section" data-aos="fade-up">
          <div className="container">
            <h2>{t('2. 드라마 문화 어휘', '2. Drama Cultural Vocabulary')}</h2>
            <p>{t('한국 드라마를 이해하기 위해 알아야 할 문화적 어휘입니다.', 'Cultural vocabulary you need to know to understand Korean dramas.')}</p>
            <div className="example-box" data-aos="fade-up">
              <table className="expression-table">
                <thead>
                  <tr>
                    <th>{t('단어', 'Word')}</th>
                    <th>{t('발음', 'Pronunciation')}</th>
                    <th>{t('뜻', 'Meaning')}</th>
                    <th>{t('설명', 'Description')}</th>
                  </tr>
                </thead>
                <tbody>
                  {CULTURAL_VOCAB.map((item, i) => (
                    <tr key={i}>
                      <td><strong>{item.ko}</strong></td>
                      <td>{item.romanization}</td>
                      <td>{item.en}</td>
                      <td>{language === 'ko' ? item.desc : item.descEn}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section id="dialogue-practice" className="lesson-section" data-aos="fade-up">
          <div className="container">
            <h2>{t('3. 드라마 대화 연습', '3. Drama Dialogue Practice')}</h2>
            <p>{t('드라마에서 자주 나오는 장면별 대화를 연습해 보세요.', 'Practice dialogues from common drama scenes.')}</p>
            {DRAMA_DIALOGUES.map((dialogue, idx) => (
              <div key={idx} className="dialogue-card" data-aos="fade-up" style={{ marginBottom: '1.5rem' }}>
                <h3 className="dialogue-card__title">{language === 'ko' ? dialogue.titleKo : dialogue.titleEn}</h3>
                <div className="dialogue-lines">
                  {dialogue.lines.map((line, i) => (
                    <div key={i} className={`dialogue-line dialogue-line--${line.speaker === 'A' ? 'a' : 'b'}`}>
                      <span className="dialogue-line__speaker">{line.speaker}</span>
                      <div className="dialogue-line__content">
                        <p className="dialogue-line__korean">{line.ko}</p>
                        <p className="dialogue-line__english">{line.en}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="study-tips" className="lesson-section" data-aos="fade-up">
          <div className="container">
            <div className="tip-box">
              <h4>{t(<><i className="fas fa-lightbulb"></i> K-Drama 학습 팁</>, <><i className="fas fa-lightbulb"></i> K-Drama Study Tips</>)}</h4>
              <ul>
                <li>{t('처음에는 한글 자막으로, 두 번째는 자막 없이 보세요.', 'Watch with Korean subtitles first, then without subtitles.')}</li>
                <li>{t('좋아하는 대사를 따라 말하는 "쉐도잉" 연습을 해보세요.', 'Try "shadowing" practice by repeating your favorite lines.')}</li>
                <li>{t('드라마에서 배운 표현을 실제 대화에서 사용해 보세요.', 'Try using expressions you learned from dramas in real conversations.')}</li>
                <li>{t('같은 장면을 여러 번 반복해서 보면 듣기 능력이 향상됩니다.', 'Watching the same scene multiple times improves listening skills.')}</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="lesson-section" data-aos="fade-up">
          <div className="container">
            <div className="lesson-nav">
              <Link to="/culture" className="btn btn-secondary">{t('← 문화 홈', '← Culture Home')}</Link>
              <Link to="/culture/kpop" className="btn btn-primary">{t('다음: K-Pop →', 'Next: K-Pop →')}</Link>
            </div>
          </div>
        </section>
      </PageLayout>
    </>
  );
}
