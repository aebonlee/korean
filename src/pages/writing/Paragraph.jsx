import { Link } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';
import { useLanguage } from '../../contexts/LanguageContext';
import useAOS from '../../hooks/useAOS';

const CONNECTORS = [
  { ko: '그리고', en: 'And', usage: '정보 추가', usageEn: 'Adding information' },
  { ko: '그래서', en: 'So / Therefore', usage: '결과/이유', usageEn: 'Result/Reason' },
  { ko: '그러나 / 하지만', en: 'But / However', usage: '대조', usageEn: 'Contrast' },
  { ko: '그런데', en: 'By the way / But', usage: '화제 전환 / 대조', usageEn: 'Topic change / Contrast' },
  { ko: '예를 들어', en: 'For example', usage: '예시', usageEn: 'Example' },
  { ko: '또한', en: 'Also / Moreover', usage: '추가 정보', usageEn: 'Additional info' },
  { ko: '즉', en: 'That is / In other words', usage: '설명/요약', usageEn: 'Explanation/Summary' },
  { ko: '마지막으로', en: 'Finally / Lastly', usage: '마무리', usageEn: 'Conclusion' },
];

const SAMPLE_PARAGRAPH = {
  titleKo: '예시 문단: 한국 음식',
  titleEn: 'Sample Paragraph: Korean Food',
  topicKo: '한국 음식은 세계적으로 인기가 많습니다.',
  topicEn: 'Korean food is popular worldwide.',
  supportKo: [
    '예를 들어, 김치는 건강에 좋은 발효 음식으로 유명합니다.',
    '또한, 비빔밥은 다양한 채소와 고추장이 어우러진 영양 만점 음식입니다.',
    '불고기와 삼겹살 같은 고기 요리도 외국인들에게 큰 인기를 얻고 있습니다.',
  ],
  supportEn: [
    'For example, kimchi is famous as a healthy fermented food.',
    'Also, bibimbap is a nutritious dish that combines various vegetables and gochujang.',
    'Meat dishes like bulgogi and samgyeopsal are also very popular among foreigners.',
  ],
  conclusionKo: '이처럼 한국 음식은 맛과 건강을 모두 갖춘 훌륭한 음식 문화입니다.',
  conclusionEn: 'In this way, Korean food is an excellent food culture that has both taste and health.',
};

export default function Paragraph() {
  const { language, t } = useLanguage();
  useAOS();

  return (
    <>
      <SEOHead
        title={t('문단 쓰기 - Korean Pro', 'Paragraph Writing - Korean Pro')}
        description={t(
          '한국어 문단 작성법을 배우세요. 주제문, 뒷받침 문장, 마무리 문장 구조를 익힙니다.',
          'Learn Korean paragraph writing. Master topic sentence, supporting sentences, and concluding sentence structure.'
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
            <span>{t('문단 쓰기', 'Paragraph')}</span>
          </div>
          <h1 className="page-header__title">
            {language === 'ko'
              ? <>문단 쓰기 <span className="page-header__en">(Paragraph Writing)</span></>
              : 'Korean Paragraph Writing'}
          </h1>
          <p className="page-header__description">
            {t(
              '좋은 문단은 주제문(topic sentence), 뒷받침 문장(supporting sentences), 마무리 문장(concluding sentence)으로 구성됩니다. 한국어 문단 작성의 기본 구조를 배워보세요.',
              'A good paragraph consists of a topic sentence, supporting sentences, and a concluding sentence. Learn the basic structure of Korean paragraph writing.'
            )}
          </p>
        </div>
      </section>

      {/* Paragraph Structure */}
      <section className="lesson-section" data-aos="fade-up">
        <div className="container">
          <h2>{t('1. 문단의 구조', '1. Paragraph Structure')}</h2>

          <div className="example-box" data-aos="fade-up">
            <h4>{t('주제문 (Topic Sentence)', 'Topic Sentence')}</h4>
            <p>
              {t(
                '문단의 첫 문장으로, 전체 문단에서 말하고자 하는 핵심 내용을 담고 있습니다. 독자에게 이 문단이 무엇에 대한 것인지 알려줍니다.',
                'The first sentence of the paragraph that contains the main idea. It tells the reader what the paragraph is about.'
              )}
            </p>
          </div>

          <div className="example-box" data-aos="fade-up">
            <h4>{t('뒷받침 문장 (Supporting Sentences)', 'Supporting Sentences')}</h4>
            <p>
              {t(
                '주제문을 구체적으로 설명하거나 증거, 예시, 세부 사항을 제공하는 문장들입니다. 보통 2~4개의 뒷받침 문장이 적절합니다.',
                'Sentences that explain the topic sentence in detail or provide evidence, examples, and specifics. Usually 2-4 supporting sentences are appropriate.'
              )}
            </p>
          </div>

          <div className="example-box" data-aos="fade-up">
            <h4>{t('마무리 문장 (Concluding Sentence)', 'Concluding Sentence')}</h4>
            <p>
              {t(
                '문단을 정리하고 주제문의 내용을 다시 한 번 강조하거나 요약합니다. "이처럼", "따라서", "결론적으로" 등의 접속사를 사용합니다.',
                'Wraps up the paragraph and reinforces or summarizes the topic sentence. Uses connectors like "이처럼" (in this way), "따라서" (therefore), "결론적으로" (in conclusion).'
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Connectors */}
      <section className="lesson-section" data-aos="fade-up">
        <div className="container">
          <h2>{t('2. 유용한 접속사 / 연결어', '2. Useful Connectors')}</h2>
          <p>
            {t(
              '접속사(연결어)를 사용하면 문장과 문장의 관계를 명확히 하고 글의 흐름을 자연스럽게 만들 수 있습니다.',
              'Using connectors clarifies the relationship between sentences and makes the writing flow naturally.'
            )}
          </p>

          <div className="example-box" data-aos="fade-up">
            <table className="expression-table">
              <thead>
                <tr>
                  <th>{t('접속사', 'Connector')}</th>
                  <th>{t('영어', 'English')}</th>
                  <th>{t('용도', 'Usage')}</th>
                </tr>
              </thead>
              <tbody>
                {CONNECTORS.map((c, i) => (
                  <tr key={i}>
                    <td><strong>{c.ko}</strong></td>
                    <td>{c.en}</td>
                    <td>{language === 'ko' ? c.usage : c.usageEn}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Sample Paragraph */}
      <section className="lesson-section" data-aos="fade-up">
        <div className="container">
          <h2>{t('3. 예시 문단', '3. Sample Paragraph')}</h2>
          <h3>{language === 'ko' ? SAMPLE_PARAGRAPH.titleKo : SAMPLE_PARAGRAPH.titleEn}</h3>

          <div className="example-box" data-aos="fade-up">
            <div style={{ marginBottom: '1rem' }}>
              <span className="badge" style={{ backgroundColor: '#4CAF50', color: 'white' }}>
                {t('주제문', 'Topic Sentence')}
              </span>
              <p style={{ marginTop: '0.5rem', fontWeight: '600' }} data-tts={SAMPLE_PARAGRAPH.topicKo}>
                {language === 'ko' ? SAMPLE_PARAGRAPH.topicKo : SAMPLE_PARAGRAPH.topicEn}
              </p>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <span className="badge" style={{ backgroundColor: '#2196F3', color: 'white' }}>
                {t('뒷받침 문장', 'Supporting Sentences')}
              </span>
              {(language === 'ko' ? SAMPLE_PARAGRAPH.supportKo : SAMPLE_PARAGRAPH.supportEn).map((s, i) => (
                <p key={i} style={{ marginTop: '0.5rem' }} data-tts={SAMPLE_PARAGRAPH.supportKo[i]}>{s}</p>
              ))}
            </div>

            <div>
              <span className="badge" style={{ backgroundColor: '#FF9800', color: 'white' }}>
                {t('마무리 문장', 'Concluding Sentence')}
              </span>
              <p style={{ marginTop: '0.5rem', fontWeight: '600' }} data-tts={SAMPLE_PARAGRAPH.conclusionKo}>
                {language === 'ko' ? SAMPLE_PARAGRAPH.conclusionKo : SAMPLE_PARAGRAPH.conclusionEn}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Writing Prompts */}
      <section className="lesson-section" data-aos="fade-up">
        <div className="container">
          <h2>{t('4. 쓰기 연습 주제', '4. Writing Practice Topics')}</h2>
          <p>
            {t(
              '아래 주제 중 하나를 선택하여 주제문, 뒷받침 문장 3개, 마무리 문장으로 구성된 문단을 작성해 보세요.',
              'Choose one of the topics below and write a paragraph with a topic sentence, 3 supporting sentences, and a concluding sentence.'
            )}
          </p>

          <div className="example-box" data-aos="fade-up">
            <ol>
              <li><strong>{t('나의 취미', 'My Hobby')}</strong> — {t('좋아하는 취미가 무엇인지, 왜 좋아하는지 쓰세요.', 'Write about what your hobby is and why you like it.')}</li>
              <li><strong>{t('한국어를 배우는 이유', 'Why I Study Korean')}</strong> — {t('한국어를 배우기 시작한 계기와 목표를 쓰세요.', 'Write about why you started learning Korean and your goals.')}</li>
              <li><strong>{t('좋아하는 한국 음식', 'My Favorite Korean Food')}</strong> — {t('가장 좋아하는 한국 음식과 그 이유를 쓰세요.', 'Write about your favorite Korean food and why.')}</li>
              <li><strong>{t('우리 가족', 'My Family')}</strong> — {t('가족을 소개하는 문단을 쓰세요.', 'Write a paragraph introducing your family.')}</li>
            </ol>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="lesson-section" data-aos="fade-up">
        <div className="container">
          <div className="lesson-nav">
            <Link to="/writing/basic-sentence" className="btn btn-secondary">
              {t('← 기초 문장', '← Basic Sentence')}
            </Link>
            <Link to="/writing/essay" className="btn btn-primary">
              {t('다음: 에세이 →', 'Next: Essay →')}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
