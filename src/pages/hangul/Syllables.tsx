import { Link } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';
import PageLayout from '../../components/PageLayout';
import { useLanguage } from '../../contexts/LanguageContext';
import useAOS from '../../hooks/useAOS';

export default function Syllables() {
  const { language, t } = useLanguage();
  useAOS();

  const sections = [
    { id: 'cv-pattern', ko: 'CV 패턴', en: 'CV Pattern' },
    { id: 'cvc-pattern', ko: 'CVC 패턴', en: 'CVC Pattern' },
    { id: 'batchim-rules', ko: '받침 규칙', en: 'Batchim Rules' },
  ];

  return (
    <>
      <SEOHead
        title={String(t('음절 구조 - Korean Pro', 'Syllable Structure - Korean Pro'))}
        description={String(t(
          '한글 음절의 CV, CVC 패턴과 받침 규칙을 배우세요.',
          'Learn Korean syllable CV, CVC patterns and final consonant (batchim) rules.'
        ))}
      />

      <section className="page-header" data-aos="fade-up">
        <div className="container">
          <div className="page-header__breadcrumb">
            <Link to="/">{t('홈', 'Home')}</Link>
            <i className="fas fa-chevron-right"></i>
            <Link to="/hangul">{t('한글 기초', 'Hangul')}</Link>
            <i className="fas fa-chevron-right"></i>
            <span>{t('음절 구조', 'Syllables')}</span>
          </div>
          <h1 className="page-header__title">
            {language === 'ko'
              ? <>음절 구조 <span className="page-header__en">(Syllable Structure)</span></>
              : 'Korean Syllable Structure'}
          </h1>
          <p className="page-header__description">
            {t(
              '한글 음절은 초성(자음) + 중성(모음) 또는 초성 + 중성 + 종성(받침)으로 구성됩니다.',
              'Korean syllables consist of initial consonant + vowel (CV) or initial consonant + vowel + final consonant (CVC).'
            )}
          </p>
        </div>
      </section>

      <PageLayout sections={sections} category="hangul">
        {/* CV Pattern */}
        <section className="lesson-section" id="cv-pattern" data-aos="fade-up">
          <div className="container">
            <h2>{t('1. CV 패턴 (초성 + 중성)', '1. CV Pattern (Consonant + Vowel)')}</h2>
            <p>
              {t(
                '가장 기본적인 음절 구조입니다. 자음 하나와 모음 하나가 결합합니다.',
                'The most basic syllable structure. One consonant combines with one vowel.'
              )}
            </p>
            <div className="example-box" data-aos="fade-up">
              <h4>{t('예시', 'Examples')}</h4>
              <table className="expression-table">
                <thead>
                  <tr>
                    <th>{t('초성', 'Initial')}</th>
                    <th>+</th>
                    <th>{t('중성', 'Vowel')}</th>
                    <th>=</th>
                    <th>{t('음절', 'Syllable')}</th>
                    <th>{t('발음', 'Sound')}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>ㄱ</td><td>+</td><td>ㅏ</td><td>=</td><td><strong>가</strong></td><td>ga</td></tr>
                  <tr><td>ㄴ</td><td>+</td><td>ㅏ</td><td>=</td><td><strong>나</strong></td><td>na</td></tr>
                  <tr><td>ㅁ</td><td>+</td><td>ㅓ</td><td>=</td><td><strong>머</strong></td><td>meo</td></tr>
                  <tr><td>ㅎ</td><td>+</td><td>ㅏ</td><td>=</td><td><strong>하</strong></td><td>ha</td></tr>
                  <tr><td>ㅇ</td><td>+</td><td>ㅏ</td><td>=</td><td><strong>아</strong></td><td>a</td></tr>
                </tbody>
              </table>
            </div>

            <div className="tip-box" data-aos="fade-up">
              <h4>{t(<><i className="fas fa-lightbulb"></i> ㅇ(이응)의 역할</>, <><i className="fas fa-lightbulb"></i> Role of ㅇ (ieung)</>)}</h4>
              <p>
                {t(
                  '초성 위치의 ㅇ은 소리가 없습니다.',
                  'ㅇ in the initial position is silent.'
                )}
                <br />
                {t(
                  '모음으로 시작하는 음절에서 자리 채움 역할을 합니다.',
                  'It acts as a placeholder when a syllable starts with a vowel.'
                )}
                <br />
                {t(
                  '예: 아(a), 어(eo), 우(u).',
                  'Example: 아(a), 어(eo), 우(u).'
                )}
                <br />
                {t(
                  '하지만 종성(받침)에서의 ㅇ은 "ng" 소리를 냅니다.',
                  'However, ㅇ in the final position makes the "ng" sound.'
                )}
              </p>
            </div>
          </div>
        </section>

        {/* CVC Pattern */}
        <section className="lesson-section" id="cvc-pattern" data-aos="fade-up">
          <div className="container">
            <h2>{t('2. CVC 패턴 (초성 + 중성 + 종성)', '2. CVC Pattern (Consonant + Vowel + Final Consonant)')}</h2>
            <p>
              {t(
                '종성(받침)이 있는 음절입니다. 받침은 음절의 마지막에 오는 자음입니다.',
                'Syllables with a final consonant (batchim). Batchim is the consonant at the end of a syllable.'
              )}
            </p>
            <div className="example-box" data-aos="fade-up">
              <h4>{t('예시', 'Examples')}</h4>
              <table className="expression-table">
                <thead>
                  <tr>
                    <th>{t('초성', 'Initial')}</th>
                    <th>{t('중성', 'Vowel')}</th>
                    <th>{t('종성(받침)', 'Final')}</th>
                    <th>{t('음절', 'Syllable')}</th>
                    <th>{t('발음', 'Sound')}</th>
                    <th>{t('뜻', 'Meaning')}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>ㅎ</td><td>ㅏ</td><td>ㄴ</td><td><strong>한</strong></td><td>han</td><td>one / Korean</td></tr>
                  <tr><td>ㄱ</td><td>ㅜ</td><td>ㄱ</td><td><strong>국</strong></td><td>guk</td><td>soup / country</td></tr>
                  <tr><td>ㅁ</td><td>ㅏ</td><td>ㄹ</td><td><strong>말</strong></td><td>mal</td><td>language / horse</td></tr>
                  <tr><td>ㅂ</td><td>ㅏ</td><td>ㅂ</td><td><strong>밥</strong></td><td>bap</td><td>rice (cooked)</td></tr>
                  <tr><td>ㅅ</td><td>ㅏ</td><td>ㅁ</td><td><strong>삼</strong></td><td>sam</td><td>three</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Batchim Rules */}
        <section className="lesson-section" id="batchim-rules" data-aos="fade-up">
          <div className="container">
            <h2>{t('3. 받침 규칙 (7개 대표음)', '3. Batchim Rules (7 Representative Sounds)')}</h2>
            <p>
              {t(
                '받침에 올 수 있는 자음은 많지만, 실제 발음되는 소리는 7가지뿐입니다.',
                'Many consonants can be in the batchim position, but there are only 7 actual pronunciation sounds.'
              )}
            </p>
            <div className="example-box" data-aos="fade-up">
              <table className="expression-table">
                <thead>
                  <tr>
                    <th>{t('대표음', 'Sound')}</th>
                    <th>{t('해당 받침', 'Batchim Letters')}</th>
                    <th>{t('예시', 'Example')}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td><strong>[ㄱ]</strong></td><td>ㄱ, ㅋ, ㄲ</td><td>{t('약 [약], 부엌 [부억]', '약 [yak], 부엌 [bueok]')}</td></tr>
                  <tr><td><strong>[ㄴ]</strong></td><td>ㄴ</td><td>{t('손 [손], 눈 [눈]', '손 [son], 눈 [nun]')}</td></tr>
                  <tr><td><strong>[ㄷ]</strong></td><td>ㄷ, ㅌ, ㅅ, ㅆ, ㅈ, ㅊ, ㅎ</td><td>{t('옷 [옫], 낮 [낟]', '옷 [ot], 낮 [nat]')}</td></tr>
                  <tr><td><strong>[ㄹ]</strong></td><td>ㄹ</td><td>{t('달 [달], 말 [말]', '달 [dal], 말 [mal]')}</td></tr>
                  <tr><td><strong>[ㅁ]</strong></td><td>ㅁ</td><td>{t('곰 [곰], 감 [감]', '곰 [gom], 감 [gam]')}</td></tr>
                  <tr><td><strong>[ㅂ]</strong></td><td>ㅂ, ㅍ</td><td>{t('집 [집], 숲 [숩]', '집 [jip], 숲 [sup]')}</td></tr>
                  <tr><td><strong>[ㅇ]</strong></td><td>ㅇ</td><td>{t('강 [강], 공 [공]', '강 [gang], 공 [gong]')}</td></tr>
                </tbody>
              </table>
            </div>

            <div className="tip-box" data-aos="fade-up">
              <h4>{t(<><i className="fas fa-lightbulb"></i> 겹받침</>, <><i className="fas fa-lightbulb"></i> Double Batchim</>)}</h4>
              <p>
                {t(
                  '겹받침은 두 개의 자음이 받침에 오는 것입니다 (예: ㄳ, ㄵ, ㄶ, ㄺ, ㄻ, ㄼ, ㄽ, ㄾ, ㄿ, ㅀ, ㅄ).',
                  'Double batchim has two consonants in the final position (e.g., ㄳ, ㄵ, ㄶ, ㄺ, ㄻ, ㄼ, etc.).'
                )}
                <br />
                {t(
                  '홀로 발음할 때는 하나만 발음하고, 뒤에 모음이 오면 나머지 자음이 다음 음절의 초성이 됩니다.',
                  'When alone, only one is pronounced. When followed by a vowel, the other consonant moves to the next syllable.'
                )}
              </p>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <section className="lesson-section" data-aos="fade-up">
          <div className="container">
            <div className="lesson-nav">
              <Link to="/hangul/vowels" className="btn btn-secondary">
                {t('← 이전: 모음', '← Previous: Vowels')}
              </Link>
              <Link to="/hangul/pronunciation" className="btn btn-primary">
                {t('다음: 발음 규칙 →', 'Next: Pronunciation Rules →')}
              </Link>
            </div>
          </div>
        </section>
      </PageLayout>
    </>
  );
}
