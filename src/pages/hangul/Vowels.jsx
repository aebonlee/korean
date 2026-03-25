import { Link } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';
import { useLanguage } from '../../contexts/LanguageContext';
import useAOS from '../../hooks/useAOS';

const BASIC_VOWELS = [
  { char: 'ㅏ', romanization: 'a', example: '아버지', exampleRom: 'abeoji', meaning: 'father' },
  { char: 'ㅑ', romanization: 'ya', example: '야구', exampleRom: 'yagu', meaning: 'baseball' },
  { char: 'ㅓ', romanization: 'eo', example: '어머니', exampleRom: 'eomeoni', meaning: 'mother' },
  { char: 'ㅕ', romanization: 'yeo', example: '여자', exampleRom: 'yeoja', meaning: 'woman' },
  { char: 'ㅗ', romanization: 'o', example: '오이', exampleRom: 'oi', meaning: 'cucumber' },
  { char: 'ㅛ', romanization: 'yo', example: '요리', exampleRom: 'yori', meaning: 'cooking' },
  { char: 'ㅜ', romanization: 'u', example: '우유', exampleRom: 'uyu', meaning: 'milk' },
  { char: 'ㅠ', romanization: 'yu', example: '유리', exampleRom: 'yuri', meaning: 'glass' },
  { char: 'ㅡ', romanization: 'eu', example: '으른', exampleRom: 'eureun', meaning: 'adult' },
  { char: 'ㅣ', romanization: 'i', example: '이름', exampleRom: 'ireum', meaning: 'name' },
];

const COMPOUND_VOWELS = [
  { char: 'ㅐ', romanization: 'ae', example: '개', exampleRom: 'gae', meaning: 'dog' },
  { char: 'ㅔ', romanization: 'e', example: '세계', exampleRom: 'segye', meaning: 'world' },
  { char: 'ㅘ', romanization: 'wa', example: '과일', exampleRom: 'gwail', meaning: 'fruit' },
  { char: 'ㅙ', romanization: 'wae', example: '왜', exampleRom: 'wae', meaning: 'why' },
  { char: 'ㅚ', romanization: 'oe', example: '외국', exampleRom: 'oeguk', meaning: 'foreign country' },
  { char: 'ㅝ', romanization: 'wo', example: '원', exampleRom: 'won', meaning: 'won (currency)' },
  { char: 'ㅞ', romanization: 'we', example: '웨딩', exampleRom: 'weding', meaning: 'wedding' },
  { char: 'ㅟ', romanization: 'wi', example: '위', exampleRom: 'wi', meaning: 'above / stomach' },
  { char: 'ㅢ', romanization: 'ui', example: '의사', exampleRom: 'uisa', meaning: 'doctor' },
];

export default function Vowels() {
  const { language, t } = useLanguage();
  useAOS();

  return (
    <>
      <SEOHead
        title={t('한국어 모음 - Korean Pro', 'Korean Vowels - Korean Pro')}
        description={t(
          '한국어 10개 기본 모음과 11개 복합 모음의 발음과 예시를 배우세요.',
          'Learn the pronunciation and examples of 10 basic and 11 compound Korean vowels.'
        )}
      />

      {/* Page Header */}
      <section className="page-header" data-aos="fade-up">
        <div className="container">
          <div className="page-header__breadcrumb">
            <Link to="/">{t('홈', 'Home')}</Link>
            <i className="fas fa-chevron-right"></i>
            <Link to="/hangul">{t('한글 기초', 'Hangul')}</Link>
            <i className="fas fa-chevron-right"></i>
            <span>{t('모음', 'Vowels')}</span>
          </div>
          <h1 className="page-header__title">
            {language === 'ko'
              ? <>모음 <span className="page-header__en">(Vowels)</span></>
              : 'Korean Vowels'}
          </h1>
          <p className="page-header__description">
            {t(
              '한글 모음은 하늘(·), 땅(ㅡ), 사람(ㅣ)을 기본 요소로 조합하여 만들어졌습니다. 10개의 기본 모음과 11개의 복합 모음이 있습니다.',
              'Hangul vowels were created from three base elements: heaven (·), earth (ㅡ), and human (ㅣ). There are 10 basic vowels and 11 compound vowels.'
            )}
          </p>
        </div>
      </section>

      {/* Basic Vowels */}
      <section className="lesson-section" data-aos="fade-up">
        <div className="container">
          <h2>{t('1. 기본 모음 (10개)', '1. Basic Vowels (10)')}</h2>
          <p>
            {t(
              '기본 모음은 양성 모음(ㅏ, ㅑ, ㅗ, ㅛ)과 음성 모음(ㅓ, ㅕ, ㅜ, ㅠ), 그리고 중성 모음(ㅡ, ㅣ)으로 나뉩니다.',
              'Basic vowels are divided into bright vowels (ㅏ, ㅑ, ㅗ, ㅛ), dark vowels (ㅓ, ㅕ, ㅜ, ㅠ), and neutral vowels (ㅡ, ㅣ).'
            )}
          </p>

          <div className="example-box" data-aos="fade-up">
            <table className="expression-table">
              <thead>
                <tr>
                  <th>{t('모음', 'Vowel')}</th>
                  <th>{t('로마자', 'Romanization')}</th>
                  <th>{t('예시 단어', 'Example')}</th>
                  <th>{t('발음', 'Pronunciation')}</th>
                  <th>{t('뜻', 'Meaning')}</th>
                </tr>
              </thead>
              <tbody>
                {BASIC_VOWELS.map((v) => (
                  <tr key={v.char}>
                    <td><strong style={{ fontSize: '1.5rem' }}>{v.char}</strong></td>
                    <td>{v.romanization}</td>
                    <td><strong>{v.example}</strong></td>
                    <td>{v.exampleRom}</td>
                    <td>{v.meaning}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="tip-box" data-aos="fade-up">
            <h4>{t('💡 모음 분류', '💡 Vowel Classification')}</h4>
            <ul>
              <li>{t('양성 모음 (밝은 모음): ㅏ, ㅑ, ㅗ, ㅛ - 밝고 가벼운 느낌', 'Bright vowels: ㅏ, ㅑ, ㅗ, ㅛ - bright and light feeling')}</li>
              <li>{t('음성 모음 (어두운 모음): ㅓ, ㅕ, ㅜ, ㅠ - 어둡고 무거운 느낌', 'Dark vowels: ㅓ, ㅕ, ㅜ, ㅠ - dark and heavy feeling')}</li>
              <li>{t('중성 모음: ㅡ, ㅣ - 양성/음성 어디에도 속하지 않음', 'Neutral vowels: ㅡ, ㅣ - neither bright nor dark')}</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Compound Vowels */}
      <section className="lesson-section" data-aos="fade-up">
        <div className="container">
          <h2>{t('2. 복합 모음 (11개)', '2. Compound Vowels (11)')}</h2>
          <p>
            {t(
              '복합 모음은 기본 모음 두 개를 조합하여 만든 모음입니다. 두 모음을 빠르게 연결하여 발음합니다.',
              'Compound vowels are formed by combining two basic vowels. Pronounce them by quickly connecting two vowel sounds.'
            )}
          </p>

          <div className="example-box" data-aos="fade-up">
            <table className="expression-table">
              <thead>
                <tr>
                  <th>{t('복합 모음', 'Compound')}</th>
                  <th>{t('로마자', 'Romanization')}</th>
                  <th>{t('예시 단어', 'Example')}</th>
                  <th>{t('발음', 'Pronunciation')}</th>
                  <th>{t('뜻', 'Meaning')}</th>
                </tr>
              </thead>
              <tbody>
                {COMPOUND_VOWELS.map((v) => (
                  <tr key={v.char}>
                    <td><strong style={{ fontSize: '1.5rem' }}>{v.char}</strong></td>
                    <td>{v.romanization}</td>
                    <td><strong>{v.example}</strong></td>
                    <td>{v.exampleRom}</td>
                    <td>{v.meaning}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="tip-box" data-aos="fade-up">
            <h4>{t('💡 ㅐ vs ㅔ 차이점', '💡 Difference between ㅐ and ㅔ')}</h4>
            <p>
              {t(
                '현대 한국어에서 ㅐ(ae)와 ㅔ(e)는 거의 같은 소리로 발음됩니다. 원래 ㅐ는 더 넓게, ㅔ는 더 좁게 발음하지만 대부분의 한국 사람들도 구분하지 않습니다. 맞춤법으로 구분하세요.',
                'In modern Korean, ㅐ (ae) and ㅔ (e) are pronounced almost identically. Originally ㅐ had a wider mouth opening and ㅔ narrower, but most Koreans do not distinguish them. Differentiate them through spelling.'
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="lesson-section" data-aos="fade-up">
        <div className="container">
          <div className="lesson-nav">
            <Link to="/hangul/consonants" className="btn btn-secondary">
              {t('← 이전: 자음', '← Previous: Consonants')}
            </Link>
            <Link to="/hangul/syllables" className="btn btn-primary">
              {t('다음: 음절 구조 →', 'Next: Syllables →')}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
