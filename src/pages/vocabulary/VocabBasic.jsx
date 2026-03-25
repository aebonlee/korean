import { Link } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';
import { useLanguage } from '../../contexts/LanguageContext';
import useAOS from '../../hooks/useAOS';

const WORDS = [
  { ko: '사람', en: 'person', rom: 'saram', ex: '그 사람은 한국 사람이에요.', exEn: 'That person is Korean.' },
  { ko: '물', en: 'water', rom: 'mul', ex: '물 주세요.', exEn: 'Water, please.' },
  { ko: '시간', en: 'time', rom: 'sigan', ex: '시간이 없어요.', exEn: "I don't have time." },
  { ko: '학교', en: 'school', rom: 'hakgyo', ex: '학교에 가요.', exEn: 'I go to school.' },
  { ko: '집', en: 'house/home', rom: 'jip', ex: '집에 갈 거예요.', exEn: "I'm going to go home." },
  { ko: '음식', en: 'food', rom: 'eumsik', ex: '한국 음식이 맛있어요.', exEn: 'Korean food is delicious.' },
  { ko: '친구', en: 'friend', rom: 'chingu', ex: '친구를 만났어요.', exEn: 'I met a friend.' },
  { ko: '나라', en: 'country', rom: 'nara', ex: '어느 나라에서 왔어요?', exEn: 'Which country are you from?' },
  { ko: '돈', en: 'money', rom: 'don', ex: '돈이 필요해요.', exEn: 'I need money.' },
  { ko: '책', en: 'book', rom: 'chaek', ex: '책을 읽어요.', exEn: 'I read a book.' },
  { ko: '말', en: 'language/word', rom: 'mal', ex: '한국말을 배워요.', exEn: "I'm learning Korean." },
  { ko: '일', en: 'work/thing', rom: 'il', ex: '일이 많아요.', exEn: 'I have a lot of work.' },
  { ko: '오늘', en: 'today', rom: 'oneul', ex: '오늘 날씨가 좋아요.', exEn: 'The weather is nice today.' },
  { ko: '내일', en: 'tomorrow', rom: 'naeil', ex: '내일 뭐 해요?', exEn: 'What are you doing tomorrow?' },
  { ko: '어제', en: 'yesterday', rom: 'eoje', ex: '어제 영화를 봤어요.', exEn: 'I watched a movie yesterday.' },
  { ko: '좋다', en: 'good/like', rom: 'jota', ex: '한국이 좋아요.', exEn: 'I like Korea.' },
  { ko: '크다', en: 'big/tall', rom: 'keuda', ex: '이 가방이 커요.', exEn: 'This bag is big.' },
  { ko: '작다', en: 'small', rom: 'jakda', ex: '이 신발이 작아요.', exEn: 'These shoes are small.' },
  { ko: '많다', en: 'many/much', rom: 'manta', ex: '사람이 많아요.', exEn: 'There are many people.' },
  { ko: '빠르다', en: 'fast', rom: 'ppareuda', ex: 'KTX가 빨라요.', exEn: 'The KTX is fast.' },
];

export default function VocabBasic() {
  const { t } = useLanguage();
  useAOS();

  return (
    <>
      <SEOHead title={t('기초 필수 500 - Korean Pro', 'Basic 500 - Korean Pro')} description={t('한국어 기초 필수 단어 500개를 학습하세요.', 'Study 500 essential basic Korean words.')} />
      <section className="page-header" data-aos="fade-up">
        <div className="container">
          <div className="page-header__breadcrumb">
            <Link to="/">{t('홈', 'Home')}</Link><i className="fas fa-chevron-right"></i>
            <Link to="/vocabulary">{t('어휘', 'Vocabulary')}</Link><i className="fas fa-chevron-right"></i>
            <span>{t('기초 필수 500', 'Basic 500')}</span>
          </div>
          <h1 className="page-header__title">{t('기초 필수 단어 500', 'Basic Essential 500')}</h1>
          <p className="page-header__description">
            {t('한국어 학습의 기본이 되는 필수 단어를 학습하세요.', 'Study the essential words that form the foundation of Korean learning.')}
            <br />
            {t('카드를 클릭하면 한국어 발음을 들을 수 있습니다.', 'Click cards to hear Korean pronunciation.')}
          </p>
        </div>
      </section>

      <section className="lesson-section" data-aos="fade-up">
        <div className="container">
          <div className="vocab-grid">
            {WORDS.map((w, i) => (
              <div key={i} className="vocab-card" data-aos="fade-up" data-aos-delay={Math.min(i * 50, 300)}>
                <div className="vocab-card__word" data-tts={w.ko}>{w.ko}</div>
                <div className="vocab-card__romanization">{w.rom}</div>
                <div className="vocab-card__meaning">{w.en}</div>
                <div className="vocab-card__example">
                  <span data-tts={w.ex}>{w.ex}</span>
                  <div className="vocab-card__example-en">{w.exEn}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="tip-box" data-aos="fade-up">
            <p>{t('* 여기에는 20개만 표시됩니다.', '* Only 20 words are shown here.')}<br />{t('전체 500개는 앱에서 확인하세요.', 'See the full 500 in the app.')}</p>
          </div>
        </div>
      </section>

      <section className="lesson-section" data-aos="fade-up">
        <div className="container">
          <div className="lesson-nav">
            <Link to="/vocabulary" className="btn btn-secondary">{t('← 목록으로', '← Back to List')}</Link>
            <Link to="/vocabulary/daily" className="btn btn-primary">{t('다음: 일상 500 →', 'Next: Daily 500 →')}</Link>
          </div>
        </div>
      </section>
    </>
  );
}
