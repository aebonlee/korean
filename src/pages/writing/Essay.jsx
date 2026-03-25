import { Link } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';
import PageLayout from '../../components/PageLayout';
import { useLanguage } from '../../contexts/LanguageContext';
import useAOS from '../../hooks/useAOS';

const ESSAY_CONNECTORS = {
  introKo: ['먼저', '우선', '일반적으로', '최근에', '~에 대해 이야기하겠습니다'],
  introEn: ['First', 'First of all', 'Generally', 'Recently', 'I will talk about ~'],
  bodyKo: ['첫째,', '둘째,', '셋째,', '또한', '게다가', '반면에', '한편', '예를 들어', '그 이유는'],
  bodyEn: ['First,', 'Second,', 'Third,', 'Also', 'Moreover', 'On the other hand', 'Meanwhile', 'For example', 'The reason is'],
  conclusionKo: ['결론적으로', '따라서', '요약하면', '이상으로', '위에서 살펴본 바와 같이'],
  conclusionEn: ['In conclusion', 'Therefore', 'In summary', 'As discussed above', 'As we have seen above'],
};

const TOPIK_WRITING_INFO = [
  {
    questionKo: 'TOPIK II 51번 (실용문)',
    questionEn: 'TOPIK II Q51 (Practical Writing)',
    descKo: '광고, 안내문, 이메일 등의 빈칸을 채우는 문제입니다. 상황에 맞는 적절한 표현을 사용해야 합니다.',
    descEn: 'Fill in blanks for ads, notices, emails, etc. You must use appropriate expressions for the situation.',
    points: '10점',
  },
  {
    questionKo: 'TOPIK II 52번 (설명문)',
    questionEn: 'TOPIK II Q52 (Descriptive Writing)',
    descKo: '그래프나 도표를 보고 200~300자로 설명하는 문제입니다. 객관적인 사실 묘사가 중요합니다.',
    descEn: 'Describe graphs or charts in 200-300 characters. Objective description of facts is important.',
    points: '10점',
  },
  {
    questionKo: 'TOPIK II 53번 (논술형 에세이)',
    questionEn: 'TOPIK II Q53 (Argumentative Essay)',
    descKo: '주어진 주제에 대해 600~700자로 자신의 의견을 논리적으로 서술하는 문제입니다. 서론-본론-결론 구조가 필수입니다.',
    descEn: 'Write a 600-700 character argumentative essay on a given topic. Introduction-body-conclusion structure is required.',
    points: '30점',
  },
];

const sections = [
  { id: 'writing-overview', ko: 'TOPIK II 쓰기 구성', en: 'TOPIK II Writing Overview' },
  { id: 'essay-structure', ko: '에세이 구조', en: 'Essay Structure' },
  { id: 'essay-connectors', ko: '유용한 접속사', en: 'Useful Connectors' },
  { id: 'sample-essay', ko: '에세이 예시', en: 'Sample Essay' },
  { id: 'writing-tips', ko: '쓰기 주의사항', en: 'Writing Tips' },
];

export default function Essay() {
  const { language, t } = useLanguage();
  useAOS();

  return (
    <>
      <SEOHead
        title={t('에세이 쓰기 - Korean Pro', 'Essay Writing - Korean Pro')}
        description={t(
          'TOPIK 쓰기 영역 대비 에세이 작성법을 배우세요. 서론-본론-결론 구조와 유용한 접속사를 익힙니다.',
          'Learn essay writing for TOPIK preparation. Master introduction-body-conclusion structure and useful connectors.'
        )}
      />

      {/* Page Header */}
      <section className="page-header" data-aos="fade-up">
        <div className="container">
          <div className="page-header__breadcrumb">
            <Link to="/">{t('홈', 'Home')}</Link>
            <i className="fas fa-chevron-right"></i>
            <Link to="/writing">{t('쓰기', 'Writing')}</Link>
            <i className="fas fa-chevron-right"></i>
            <span>{t('에세이', 'Essay')}</span>
          </div>
          <h1 className="page-header__title">
            {language === 'ko'
              ? <>에세이 쓰기 <span className="page-header__en">(Essay Writing)</span></>
              : 'Korean Essay Writing'}
          </h1>
          <p className="page-header__description">
            {t(
              'TOPIK II 쓰기 영역의 에세이 작성법을 배웁니다. 논리적인 구조, 적절한 접속사 사용, 격식적인 문체를 익혀 고득점을 목표로 합니다.',
              'Learn essay writing for the TOPIK II writing section. Aim for high scores by mastering logical structure, appropriate connectors, and formal writing style.'
            )}
          </p>
        </div>
      </section>

      <PageLayout sections={sections} category="writing">
        {/* TOPIK Writing Section Overview */}
        <section id="writing-overview" className="lesson-section" data-aos="fade-up">
          <div className="container">
            <h2>{t('1. TOPIK II 쓰기 영역 구성', '1. TOPIK II Writing Section Overview')}</h2>

            {TOPIK_WRITING_INFO.map((info, index) => (
              <div key={index} className="example-box" data-aos="fade-up" style={{ marginBottom: '1rem' }}>
                <h4>{language === 'ko' ? info.questionKo : info.questionEn} ({info.points})</h4>
                <p>{language === 'ko' ? info.descKo : info.descEn}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Essay Structure */}
        <section id="essay-structure" className="lesson-section" data-aos="fade-up">
          <div className="container">
            <h2>{t('2. 에세이 구조: 서론 - 본론 - 결론', '2. Essay Structure: Introduction - Body - Conclusion')}</h2>

            <div className="example-box" data-aos="fade-up">
              <h4 style={{ color: '#4CAF50' }}>{t('서론 (Introduction) — 약 100~150자', 'Introduction — About 100-150 characters')}</h4>
              <ul>
                <li>{t('주제를 소개하고 배경을 설명합니다.', 'Introduce the topic and explain the background.')}</li>
                <li>{t('자신의 입장(찬성/반대)을 명확히 밝힙니다.', 'Clearly state your position (for/against).')}</li>
                <li>{t('"~에 대해 다양한 의견이 있다" 같은 표현으로 시작할 수 있습니다.', 'You can start with expressions like "There are various opinions about ~".')}</li>
              </ul>
            </div>

            <div className="example-box" data-aos="fade-up">
              <h4 style={{ color: '#2196F3' }}>{t('본론 (Body) — 약 350~450자', 'Body — About 350-450 characters')}</h4>
              <ul>
                <li>{t('"첫째, 둘째, 셋째"를 사용하여 근거를 논리적으로 제시합니다.', 'Present arguments logically using "First, Second, Third".')}</li>
                <li>{t('각 근거마다 예시나 설명을 추가합니다.', 'Add examples or explanations for each argument.')}</li>
                <li>{t('반대 의견을 언급하고 반박하면 더 높은 점수를 받을 수 있습니다.', 'Mentioning and refuting opposing views can earn higher scores.')}</li>
              </ul>
            </div>

            <div className="example-box" data-aos="fade-up">
              <h4 style={{ color: '#FF9800' }}>{t('결론 (Conclusion) — 약 100~150자', 'Conclusion — About 100-150 characters')}</h4>
              <ul>
                <li>{t('본론의 내용을 요약합니다.', 'Summarize the body paragraphs.')}</li>
                <li>{t('자신의 입장을 다시 한번 강조합니다.', 'Reemphasize your position.')}</li>
                <li>{t('제안이나 전망을 덧붙이면 좋습니다.', 'Adding suggestions or outlook is recommended.')}</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Useful Connectors */}
        <section id="essay-connectors" className="lesson-section" data-aos="fade-up">
          <div className="container">
            <h2>{t('3. 에세이에 유용한 접속사', '3. Useful Connectors for Essays')}</h2>

            <div className="example-box" data-aos="fade-up">
              <h4 style={{ color: '#4CAF50' }}>{t('서론용', 'For Introduction')}</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {(language === 'ko' ? ESSAY_CONNECTORS.introKo : ESSAY_CONNECTORS.introEn).map((c, i) => (
                  <span key={i} className="badge" data-tts={ESSAY_CONNECTORS.introKo[i]}>{c}</span>
                ))}
              </div>
            </div>

            <div className="example-box" data-aos="fade-up">
              <h4 style={{ color: '#2196F3' }}>{t('본론용', 'For Body')}</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {(language === 'ko' ? ESSAY_CONNECTORS.bodyKo : ESSAY_CONNECTORS.bodyEn).map((c, i) => (
                  <span key={i} className="badge" data-tts={ESSAY_CONNECTORS.bodyKo[i]}>{c}</span>
                ))}
              </div>
            </div>

            <div className="example-box" data-aos="fade-up">
              <h4 style={{ color: '#FF9800' }}>{t('결론용', 'For Conclusion')}</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {(language === 'ko' ? ESSAY_CONNECTORS.conclusionKo : ESSAY_CONNECTORS.conclusionEn).map((c, i) => (
                  <span key={i} className="badge" data-tts={ESSAY_CONNECTORS.conclusionKo[i]}>{c}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Sample Essay */}
        <section id="sample-essay" className="lesson-section" data-aos="fade-up">
          <div className="container">
            <h2>{t('4. 에세이 예시', '4. Sample Essay')}</h2>
            <h3>{t('주제: 외국어 교육의 중요성에 대해 쓰시오.', 'Topic: Write about the importance of foreign language education.')}</h3>

            <div className="example-box" data-aos="fade-up">
              <div style={{ marginBottom: '1.5rem' }}>
                <span className="badge" style={{ backgroundColor: '#4CAF50', color: 'white', marginBottom: '0.5rem', display: 'inline-block' }}>
                  {t('서론', 'Introduction')}
                </span>
                <p data-tts="세계화 시대에 외국어 교육의 중요성에 대해 다양한 의견이 있습니다. 저는 외국어 교육이 매우 중요하다고 생각합니다. 외국어를 배우면 더 넓은 세계와 소통할 수 있기 때문입니다.">
                  {t(
                    '세계화 시대에 외국어 교육의 중요성에 대해 다양한 의견이 있습니다. 저는 외국어 교육이 매우 중요하다고 생각합니다. 외국어를 배우면 더 넓은 세계와 소통할 수 있기 때문입니다.',
                    'In the era of globalization, there are various opinions about the importance of foreign language education. I believe foreign language education is very important because learning foreign languages enables us to communicate with the wider world.'
                  )}
                </p>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <span className="badge" style={{ backgroundColor: '#2196F3', color: 'white', marginBottom: '0.5rem', display: 'inline-block' }}>
                  {t('본론', 'Body')}
                </span>
                <p data-tts="첫째, 외국어를 배우면 취업 기회가 넓어집니다. 글로벌 기업에서는 외국어 능력을 갖춘 인재를 선호합니다. 둘째, 외국어를 통해 다른 나라의 문화를 깊이 이해할 수 있습니다. 예를 들어, 한국어를 배우면 한국의 문화와 역사를 더 잘 이해할 수 있습니다. 셋째, 외국어 학습은 두뇌 발달에도 도움이 됩니다. 연구에 따르면 이중 언어 사용자는 인지 능력이 더 높다고 합니다.">
                  {t(
                    '첫째, 외국어를 배우면 취업 기회가 넓어집니다. 글로벌 기업에서는 외국어 능력을 갖춘 인재를 선호합니다. 둘째, 외국어를 통해 다른 나라의 문화를 깊이 이해할 수 있습니다. 예를 들어, 한국어를 배우면 한국의 문화와 역사를 더 잘 이해할 수 있습니다. 셋째, 외국어 학습은 두뇌 발달에도 도움이 됩니다. 연구에 따르면 이중 언어 사용자는 인지 능력이 더 높다고 합니다.',
                    'First, learning a foreign language broadens employment opportunities. Global companies prefer talented individuals with foreign language skills. Second, through foreign languages, we can deeply understand other countries\' cultures. For example, learning Korean helps you better understand Korean culture and history. Third, foreign language learning also helps brain development. Research shows that bilingual speakers have higher cognitive abilities.'
                  )}
                </p>
              </div>

              <div>
                <span className="badge" style={{ backgroundColor: '#FF9800', color: 'white', marginBottom: '0.5rem', display: 'inline-block' }}>
                  {t('결론', 'Conclusion')}
                </span>
                <p data-tts="결론적으로, 외국어 교육은 개인의 발전과 사회의 발전을 위해 반드시 필요합니다. 따라서 어린 시절부터 체계적인 외국어 교육이 이루어져야 한다고 생각합니다.">
                  {t(
                    '결론적으로, 외국어 교육은 개인의 발전과 사회의 발전을 위해 반드시 필요합니다. 따라서 어린 시절부터 체계적인 외국어 교육이 이루어져야 한다고 생각합니다.',
                    'In conclusion, foreign language education is essential for both personal and social development. Therefore, I believe systematic foreign language education should begin from an early age.'
                  )}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Writing Style Tips */}
        <section id="writing-tips" className="lesson-section" data-aos="fade-up">
          <div className="container">
            <div className="tip-box">
              <h4>{t(<><i className="fas fa-lightbulb"></i> TOPIK 쓰기 주의사항</>, <><i className="fas fa-lightbulb"></i> TOPIK Writing Tips</>)}</h4>
              <ul>
                <li>{t('격식체(-ㅂ니다/-습니다)를 사용하세요. 반말이나 해요체는 감점됩니다.', 'Use formal style (-ㅂ니다/-습니다). Casual or polite informal speech will result in point deductions.')}</li>
                <li>{t('줄임말("않다" → "안"보다 "않다"를 사용)과 구어체를 피하세요.', 'Avoid contractions and spoken language style. Use formal written expressions.')}</li>
                <li>{t('글자 수를 반드시 지키세요. 너무 짧거나 너무 길면 감점됩니다.', 'Make sure to meet the character count. Too short or too long will result in deductions.')}</li>
                <li>{t('맞춤법과 띄어쓰기에 주의하세요.', 'Pay attention to spelling and spacing.')}</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <section className="lesson-section" data-aos="fade-up">
          <div className="container">
            <div className="lesson-nav">
              <Link to="/writing/paragraph" className="btn btn-secondary">
                {t('← 문단 쓰기', '← Paragraph Writing')}
              </Link>
              <Link to="/writing" className="btn btn-primary">
                {t('쓰기 홈으로 →', 'Writing Home →')}
              </Link>
            </div>
          </div>
        </section>
      </PageLayout>
    </>
  );
}
