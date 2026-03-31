import { Link } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';
import PageLayout from '../../components/PageLayout';
import { useLanguage } from '../../contexts/LanguageContext';
import useAOS from '../../hooks/useAOS';

const BASIC_CONSONANTS = [
  { char: 'ㄱ', name: '기역', romanization: 'g/k', example: '가방', exampleRom: 'gabang', meaning: 'bag' },
  { char: 'ㄴ', name: '니은', romanization: 'n', example: '나라', exampleRom: 'nara', meaning: 'country' },
  { char: 'ㄷ', name: '디귿', romanization: 'd/t', example: '다리', exampleRom: 'dari', meaning: 'bridge / leg' },
  { char: 'ㄹ', name: '리을', romanization: 'r/l', example: '라면', exampleRom: 'ramyeon', meaning: 'ramen' },
  { char: 'ㅁ', name: '미음', romanization: 'm', example: '모자', exampleRom: 'moja', meaning: 'hat' },
  { char: 'ㅂ', name: '비읍', romanization: 'b/p', example: '바다', exampleRom: 'bada', meaning: 'sea' },
  { char: 'ㅅ', name: '시옷', romanization: 's', example: '사람', exampleRom: 'saram', meaning: 'person' },
  { char: 'ㅇ', name: '이응', romanization: 'silent/ng', example: '아이', exampleRom: 'ai', meaning: 'child' },
  { char: 'ㅈ', name: '지읒', romanization: 'j', example: '자동차', exampleRom: 'jadongcha', meaning: 'car' },
  { char: 'ㅊ', name: '치읓', romanization: 'ch', example: '치마', exampleRom: 'chima', meaning: 'skirt' },
  { char: 'ㅋ', name: '키읔', romanization: 'k', example: '커피', exampleRom: 'keopi', meaning: 'coffee' },
  { char: 'ㅌ', name: '티읕', romanization: 't', example: '토마토', exampleRom: 'tomato', meaning: 'tomato' },
  { char: 'ㅍ', name: '피읖', romanization: 'p', example: '포도', exampleRom: 'podo', meaning: 'grape' },
  { char: 'ㅎ', name: '히읗', romanization: 'h', example: '하늘', exampleRom: 'haneul', meaning: 'sky' },
];

const DOUBLE_CONSONANTS = [
  { char: 'ㄲ', name: '쌍기역', romanization: 'kk', example: '꽃', exampleRom: 'kkot', meaning: 'flower' },
  { char: 'ㄸ', name: '쌍디귿', romanization: 'tt', example: '떡', exampleRom: 'tteok', meaning: 'rice cake' },
  { char: 'ㅃ', name: '쌍비읍', romanization: 'pp', example: '빵', exampleRom: 'ppang', meaning: 'bread' },
  { char: 'ㅆ', name: '쌍시옷', romanization: 'ss', example: '쌀', exampleRom: 'ssal', meaning: 'rice (uncooked)' },
  { char: 'ㅉ', name: '쌍지읒', romanization: 'jj', example: '짜다', exampleRom: 'jjada', meaning: 'salty' },
];

export default function Consonants() {
  const { language, t } = useLanguage();
  useAOS();

  const sections = [
    { id: 'basic-consonants', ko: '기본 자음', en: 'Basic Consonants' },
    { id: 'double-consonants', ko: '쌍자음', en: 'Double Consonants' },
  ];

  return (
    <>
      <SEOHead
        title={String(t('한국어 자음 - Korean Pro', 'Korean Consonants - Korean Pro'))}
        description={String(t(
          '한국어 14개 기본 자음과 5개 쌍자음의 발음, 이름, 예시 단어를 배우세요.',
          'Learn the pronunciation, names, and example words for 14 basic and 5 double Korean consonants.'
        ))}
      />

      {/* Page Header */}
      <section className="page-header" data-aos="fade-up">
        <div className="container">
          <div className="page-header__breadcrumb">
            <Link to="/">{t('홈', 'Home')}</Link>
            <i className="fas fa-chevron-right"></i>
            <Link to="/hangul">{t('한글 기초', 'Hangul')}</Link>
            <i className="fas fa-chevron-right"></i>
            <span>{t('자음', 'Consonants')}</span>
          </div>
          <h1 className="page-header__title">
            {language === 'ko'
              ? <>자음 <span className="page-header__en">(Consonants)</span></>
              : 'Korean Consonants'}
          </h1>
          <p className="page-header__description">
            {t(
              '한글에는 14개의 기본 자음(ㄱ~ㅎ)과 5개의 쌍자음(ㄲ,ㄸ,ㅃ,ㅆ,ㅉ)이 있습니다.',
              'Hangul has 14 basic consonants (ㄱ~ㅎ) and 5 double consonants (ㄲ,ㄸ,ㅃ,ㅆ,ㅉ).'
            )}
            <br />
            {t(
              '각 자음은 발음 기관의 모양을 본떠 만들어졌습니다.',
              'Each consonant was designed after the shape of the speech organs.'
            )}
          </p>
        </div>
      </section>

      <PageLayout sections={sections} category="hangul">
        {/* Basic Consonants */}
        <section className="lesson-section" id="basic-consonants" data-aos="fade-up">
          <div className="container">
            <h2>{t('1. 기본 자음 (14개)', '1. Basic Consonants (14)')}</h2>
            <p>
              {t(
                '기본 자음은 ㄱ, ㄴ, ㄷ, ㄹ, ㅁ 5개의 기본 글자에서 획을 추가하여 만들어졌습니다.',
                'Basic consonants were created by adding strokes to the 5 base letters: ㄱ, ㄴ, ㄷ, ㄹ, ㅁ.'
              )}
            </p>

            <div className="example-box" data-aos="fade-up">
              <table className="expression-table">
                <thead>
                  <tr>
                    <th>{t('자음', 'Consonant')}</th>
                    <th>{t('이름', 'Name')}</th>
                    <th>{t('로마자', 'Romanization')}</th>
                    <th>{t('예시 단어', 'Example Word')}</th>
                    <th>{t('발음', 'Pronunciation')}</th>
                    <th>{t('뜻', 'Meaning')}</th>
                  </tr>
                </thead>
                <tbody>
                  {BASIC_CONSONANTS.map((c) => (
                    <tr key={c.char}>
                      <td><strong style={{ fontSize: '1.5rem' }}>{c.char}</strong></td>
                      <td>{c.name}</td>
                      <td>{c.romanization}</td>
                      <td><strong>{c.example}</strong></td>
                      <td>{c.exampleRom}</td>
                      <td>{c.meaning}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="tip-box" data-aos="fade-up">
              <h4>{t(<><i className="fas fa-lightbulb"></i> 자음 만드는 원리</>, <><i className="fas fa-lightbulb"></i> How Consonants Were Created</>)}</h4>
              <ul>
                <li>{t('ㄱ - 혀뿌리가 목구멍을 막는 모양', 'ㄱ - Shape of the tongue root blocking the throat')}</li>
                <li>{t('ㄴ - 혀끝이 윗잇몸에 닿는 모양', 'ㄴ - Shape of the tongue tip touching the upper gum')}</li>
                <li>{t('ㅁ - 입의 모양', 'ㅁ - Shape of the mouth')}</li>
                <li>{t('ㅅ - 이의 모양', 'ㅅ - Shape of the teeth')}</li>
                <li>{t('ㅇ - 목구멍의 모양', 'ㅇ - Shape of the throat')}</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Double Consonants */}
        <section className="lesson-section" id="double-consonants" data-aos="fade-up">
          <div className="container">
            <h2>{t('2. 쌍자음 (5개)', '2. Double Consonants (5)')}</h2>
            <p>
              {t(
                '쌍자음은 기본 자음을 두 번 겹쳐 쓴 것으로, 더 강하고 긴장된 소리를 냅니다. "된소리"라고도 합니다.',
                'Double consonants are written by doubling basic consonants. They produce stronger, tenser sounds, also called "fortis" consonants.'
              )}
            </p>

            <div className="example-box" data-aos="fade-up">
              <table className="expression-table">
                <thead>
                  <tr>
                    <th>{t('쌍자음', 'Double')}</th>
                    <th>{t('이름', 'Name')}</th>
                    <th>{t('로마자', 'Romanization')}</th>
                    <th>{t('예시 단어', 'Example Word')}</th>
                    <th>{t('발음', 'Pronunciation')}</th>
                    <th>{t('뜻', 'Meaning')}</th>
                  </tr>
                </thead>
                <tbody>
                  {DOUBLE_CONSONANTS.map((c) => (
                    <tr key={c.char}>
                      <td><strong style={{ fontSize: '1.5rem' }}>{c.char}</strong></td>
                      <td>{c.name}</td>
                      <td>{c.romanization}</td>
                      <td><strong>{c.example}</strong></td>
                      <td>{c.exampleRom}</td>
                      <td>{c.meaning}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="tip-box" data-aos="fade-up">
              <h4>{t(<><i className="fas fa-lightbulb"></i> 된소리 발음 팁</>, <><i className="fas fa-lightbulb"></i> Tips for Pronouncing Double Consonants</>)}</h4>
              <p>
                {t(
                  '쌍자음을 발음할 때는 성대를 긴장시키고 짧고 강하게 발음하세요.',
                  'When pronouncing double consonants, tense your vocal cords and make a short, strong sound.'
                )}
                <br />
                {t(
                  '영어의 "sky"에서 s 뒤의 k 소리, "star"에서 s 뒤의 t 소리와 비슷합니다.',
                  'Similar to the "k" in "sky" or "t" in "star" after the "s" in English.'
                )}
              </p>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <section className="lesson-section" data-aos="fade-up">
          <div className="container">
            <div className="lesson-nav">
              <Link to="/hangul" className="btn btn-secondary">
                {t('← 목록으로', '← Back to List')}
              </Link>
              <Link to="/hangul/vowels" className="btn btn-primary">
                {t('다음: 모음 →', 'Next: Vowels →')}
              </Link>
            </div>
          </div>
        </section>
      </PageLayout>
    </>
  );
}
