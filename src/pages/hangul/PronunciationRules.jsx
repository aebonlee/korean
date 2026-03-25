import { Link } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';
import PageLayout from '../../components/PageLayout';
import { useLanguage } from '../../contexts/LanguageContext';
import useAOS from '../../hooks/useAOS';

export default function PronunciationRules() {
  const { language, t } = useLanguage();
  useAOS();

  const sections = [
    { id: 'liaison', ko: '연음', en: 'Liaison' },
    { id: 'fortition', ko: '경음화', en: 'Fortition' },
    { id: 'nasalization', ko: '비음화', en: 'Nasalization' },
    { id: 'palatalization', ko: '구개음화', en: 'Palatalization' },
    { id: 'h-rules', ko: 'ㅎ 탈락 및 축약', en: 'ㅎ Deletion & Contraction' },
  ];

  return (
    <>
      <SEOHead
        title={t('발음 규칙 - Korean Pro', 'Pronunciation Rules - Korean Pro')}
        description={t(
          '연음, 경음화, 비음화, 구개음화 등 한국어 핵심 발음 규칙을 배우세요.',
          'Learn key Korean pronunciation rules: liaison, fortition, nasalization, palatalization, and more.'
        )}
      />

      <section className="page-header" data-aos="fade-up">
        <div className="container">
          <div className="page-header__breadcrumb">
            <Link to="/">{t('홈', 'Home')}</Link>
            <i className="fas fa-chevron-right"></i>
            <Link to="/hangul">{t('한글 기초', 'Hangul')}</Link>
            <i className="fas fa-chevron-right"></i>
            <span>{t('발음 규칙', 'Pronunciation Rules')}</span>
          </div>
          <h1 className="page-header__title">
            {language === 'ko'
              ? <>발음 규칙 <span className="page-header__en">(Pronunciation Rules)</span></>
              : 'Korean Pronunciation Rules'}
          </h1>
          <p className="page-header__description">
            {t(
              '한국어에는 글자 그대로 발음하지 않는 다양한 발음 규칙이 있습니다. 자연스러운 한국어를 위해 꼭 알아야 할 핵심 규칙들을 배워보세요.',
              'Korean has various pronunciation rules where words are not pronounced as written. Learn these essential rules for natural Korean speech.'
            )}
          </p>
        </div>
      </section>

      <PageLayout sections={sections} category="hangul">
        {/* 연음 (Liaison) */}
        <section className="lesson-section" id="liaison" data-aos="fade-up">
          <div className="container">
            <h2>{t('1. 연음 (Liaison)', '1. Liaison (연음)')}</h2>
            <p>
              {t(
                '받침 뒤에 모음으로 시작하는 음절이 오면, 받침이 다음 음절의 초성으로 옮겨가 발음됩니다.',
                'When a syllable ending with a batchim is followed by a syllable starting with a vowel, the batchim moves to become the initial consonant of the next syllable.'
              )}
            </p>
            <div className="example-box" data-aos="fade-up">
              <table className="expression-table">
                <thead>
                  <tr>
                    <th>{t('표기', 'Written')}</th>
                    <th>{t('발음', 'Pronounced')}</th>
                    <th>{t('뜻', 'Meaning')}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>음악</td><td>[으막]</td><td>music</td></tr>
                  <tr><td>한국어</td><td>[한구거]</td><td>Korean language</td></tr>
                  <tr><td>먹어요</td><td>[머거요]</td><td>I eat</td></tr>
                  <tr><td>읽어요</td><td>[일거요]</td><td>I read</td></tr>
                  <tr><td>있어요</td><td>[이써요]</td><td>there is / I have</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 경음화 (Fortition) */}
        <section className="lesson-section" id="fortition" data-aos="fade-up">
          <div className="container">
            <h2>{t('2. 경음화 (Fortition / Tensification)', '2. Fortition (경음화)')}</h2>
            <p>
              {t(
                '받침 ㄱ, ㄷ, ㅂ 뒤에 ㄱ, ㄷ, ㅂ, ㅅ, ㅈ이 오면 된소리(ㄲ, ㄸ, ㅃ, ㅆ, ㅉ)로 발음됩니다.',
                'When ㄱ, ㄷ, ㅅ, ㅈ come after batchim ㄱ, ㄷ, ㅂ, they become tense sounds (ㄲ, ㄸ, ㅃ, ㅆ, ㅉ).'
              )}
            </p>
            <div className="example-box" data-aos="fade-up">
              <table className="expression-table">
                <thead>
                  <tr>
                    <th>{t('표기', 'Written')}</th>
                    <th>{t('발음', 'Pronounced')}</th>
                    <th>{t('뜻', 'Meaning')}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>학교</td><td>[학꾜]</td><td>school</td></tr>
                  <tr><td>식당</td><td>[식땅]</td><td>restaurant</td></tr>
                  <tr><td>입구</td><td>[입꾸]</td><td>entrance</td></tr>
                  <tr><td>숙제</td><td>[숙쩨]</td><td>homework</td></tr>
                  <tr><td>국수</td><td>[국쑤]</td><td>noodles</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 비음화 (Nasalization) */}
        <section className="lesson-section" id="nasalization" data-aos="fade-up">
          <div className="container">
            <h2>{t('3. 비음화 (Nasalization)', '3. Nasalization (비음화)')}</h2>
            <p>
              {t(
                '받침 ㄱ, ㄷ, ㅂ 뒤에 ㄴ, ㅁ이 오면, 받침이 비음(ㅇ, ㄴ, ㅁ)으로 변합니다.',
                'When ㄴ or ㅁ follows batchim ㄱ, ㄷ, ㅂ, the batchim becomes a nasal sound (ㅇ, ㄴ, ㅁ).'
              )}
            </p>
            <div className="example-box" data-aos="fade-up">
              <table className="expression-table">
                <thead>
                  <tr>
                    <th>{t('표기', 'Written')}</th>
                    <th>{t('발음', 'Pronounced')}</th>
                    <th>{t('규칙', 'Rule')}</th>
                    <th>{t('뜻', 'Meaning')}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>한국말</td><td>[한궁말]</td><td>ㄱ → ㅇ</td><td>Korean language</td></tr>
                  <tr><td>십만</td><td>[심만]</td><td>ㅂ → ㅁ</td><td>100,000</td></tr>
                  <tr><td>있는</td><td>[인는]</td><td>ㄷ → ㄴ</td><td>that exists</td></tr>
                  <tr><td>먹는</td><td>[멍는]</td><td>ㄱ → ㅇ</td><td>eating</td></tr>
                  <tr><td>합니다</td><td>[함니다]</td><td>ㅂ → ㅁ</td><td>I do (formal)</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 구개음화 (Palatalization) */}
        <section className="lesson-section" id="palatalization" data-aos="fade-up">
          <div className="container">
            <h2>{t('4. 구개음화 (Palatalization)', '4. Palatalization (구개음화)')}</h2>
            <p>
              {t(
                '받침 ㄷ, ㅌ 뒤에 모음 "이"가 오면, ㄷ → ㅈ, ㅌ → ㅊ으로 변합니다.',
                'When the vowel "이" follows batchim ㄷ or ㅌ, they change to ㅈ and ㅊ respectively.'
              )}
            </p>
            <div className="example-box" data-aos="fade-up">
              <table className="expression-table">
                <thead>
                  <tr>
                    <th>{t('표기', 'Written')}</th>
                    <th>{t('발음', 'Pronounced')}</th>
                    <th>{t('뜻', 'Meaning')}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>같이</td><td>[가치]</td><td>together</td></tr>
                  <tr><td>굳이</td><td>[구지]</td><td>deliberately</td></tr>
                  <tr><td>해돋이</td><td>[해도지]</td><td>sunrise</td></tr>
                  <tr><td>붙이다</td><td>[부치다]</td><td>to attach</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ㅎ 관련 규칙 */}
        <section className="lesson-section" id="h-rules" data-aos="fade-up">
          <div className="container">
            <h2>{t('5. ㅎ 탈락 및 축약', '5. ㅎ Deletion and Contraction')}</h2>
            <p>
              {t(
                'ㅎ은 다른 자음과 만나면 축약되거나 탈락합니다.',
                'ㅎ is contracted or dropped when it meets other consonants.'
              )}
            </p>
            <div className="example-box" data-aos="fade-up">
              <table className="expression-table">
                <thead>
                  <tr>
                    <th>{t('표기', 'Written')}</th>
                    <th>{t('발음', 'Pronounced')}</th>
                    <th>{t('규칙', 'Rule')}</th>
                    <th>{t('뜻', 'Meaning')}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>좋다</td><td>[조타]</td><td>ㅎ + ㄷ → ㅌ</td><td>good</td></tr>
                  <tr><td>놓고</td><td>[노코]</td><td>ㅎ + ㄱ → ㅋ</td><td>to put and...</td></tr>
                  <tr><td>좋아요</td><td>[조아요]</td><td>{t('ㅎ 탈락', 'ㅎ dropped')}</td><td>it is good</td></tr>
                  <tr><td>놓아요</td><td>[노아요]</td><td>{t('ㅎ 탈락', 'ㅎ dropped')}</td><td>I put</td></tr>
                </tbody>
              </table>
            </div>

            <div className="tip-box" data-aos="fade-up">
              <h4>{t(<><i className="fas fa-lightbulb"></i> 발음 연습 팁</>, <><i className="fas fa-lightbulb"></i> Pronunciation Practice Tips</>)}</h4>
              <p>
                {t(
                  '발음 규칙이 많아 처음에는 복잡하게 느껴질 수 있습니다.',
                  'The many pronunciation rules may seem complex at first.'
                )}
                <br />
                {t(
                  '규칙을 외우기보다 많은 한국어를 듣고 따라 말하면서 자연스럽게 체득하는 것이 좋습니다.',
                  'Rather than memorizing rules, it is better to listen to a lot of Korean and repeat it to naturally acquire proper pronunciation.'
                )}
                <br />
                {t(
                  '발음 연습 페이지에서 음성 인식 기능을 활용해 보세요.',
                  'Try the speech recognition feature on the Speech Practice page.'
                )}
              </p>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <section className="lesson-section" data-aos="fade-up">
          <div className="container">
            <div className="lesson-nav">
              <Link to="/hangul/syllables" className="btn btn-secondary">
                {t('← 이전: 음절 구조', '← Previous: Syllables')}
              </Link>
              <Link to="/conversation" className="btn btn-primary">
                {t('다음: 일상 회화 →', 'Next: Conversation →')}
              </Link>
            </div>
          </div>
        </section>
      </PageLayout>
    </>
  );
}
