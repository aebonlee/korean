export const SITE_CONFIG = {
  name: 'Korean Pro',
  tagline: '한국어 학습의 새로운 시작',
  description: '베트남, 인도, 일본, 영어권 학생을 위한 체계적 한국어 학습 사이트',
  url: 'https://korean.dreamitbiz.com/',
  ogImage: 'https://korean.dreamitbiz.com/og-image.png',
  github: 'https://github.com/aebonlee/korean',
  version: '1.0.0'
};

interface NavChild {
  label: string;
  labelEn: string;
  path: string;
  icon?: string;
}

interface NavItem {
  label: string;
  labelEn: string;
  path: string;
  icon?: string;
  children?: NavChild[];
}

export const NAV_MENU: NavItem[] = [
  {
    label: '한글 기초',
    labelEn: 'Hangul',
    path: '/hangul',
    children: [
      { label: '자음', labelEn: 'Consonants', path: '/hangul/consonants' },
      { label: '모음', labelEn: 'Vowels', path: '/hangul/vowels' },
      { label: '음절 구조', labelEn: 'Syllables', path: '/hangul/syllables' },
      { label: '발음 규칙', labelEn: 'Pronunciation Rules', path: '/hangul/pronunciation' }
    ]
  },
  {
    label: '일상 회화',
    labelEn: 'Conversation',
    path: '/conversation',
    children: [
      { label: '인사 & 소개', labelEn: 'Greetings', path: '/conversation/greetings' },
      { label: '일상생활', labelEn: 'Daily Life', path: '/conversation/daily-life' },
      { label: '쇼핑 & 주문', labelEn: 'Shopping', path: '/conversation/shopping' },
      { label: '여행 한국어', labelEn: 'Travel', path: '/conversation/travel' },
      { label: '음식점', labelEn: 'Restaurant', path: '/conversation/restaurant' },
      { label: '전화 한국어', labelEn: 'Phone', path: '/conversation/phone' }
    ]
  },
  {
    label: '문법',
    labelEn: 'Grammar',
    path: '/grammar',
    children: [
      { label: '조사', labelEn: 'Particles', path: '/grammar/particles' },
      { label: '동사 활용', labelEn: 'Verb Conjugation', path: '/grammar/verb-conjugation' },
      { label: '존댓말', labelEn: 'Honorifics', path: '/grammar/honorifics' },
      { label: '문장 패턴', labelEn: 'Sentence Patterns', path: '/grammar/sentence-patterns' }
    ]
  },
  {
    label: '어휘',
    labelEn: 'Vocabulary',
    path: '/vocabulary',
    children: [
      { label: '기초 필수 500', labelEn: 'Basic 500', path: '/vocabulary/basic' },
      { label: '일상 500', labelEn: 'Daily 500', path: '/vocabulary/daily' },
      { label: '비즈니스 500', labelEn: 'Business 500', path: '/vocabulary/business' },
      { label: 'TOPIK 800', labelEn: 'TOPIK 800', path: '/vocabulary/topik' }
    ]
  },
  {
    label: '작문',
    labelEn: 'Writing',
    path: '/writing',
    children: [
      { label: '기초 문장', labelEn: 'Basic Sentence', path: '/writing/basic' },
      { label: '문단 작성', labelEn: 'Paragraph', path: '/writing/paragraph' },
      { label: '에세이', labelEn: 'Essay', path: '/writing/essay' }
    ]
  },
  {
    label: 'TOPIK',
    labelEn: 'TOPIK',
    path: '/topik',
    children: [
      { label: '듣기', labelEn: 'Listening', path: '/topik/listening' },
      { label: '읽기', labelEn: 'Reading', path: '/topik/reading' },
      { label: '모의 테스트', labelEn: 'Mock Test', path: '/topik/mock-test' }
    ]
  },
  {
    label: '한국 문화',
    labelEn: 'Culture',
    path: '/culture',
    children: [
      { label: 'K-드라마 한국어', labelEn: 'K-Drama Korean', path: '/culture/kdrama' },
      { label: 'K-팝 한국어', labelEn: 'K-Pop Korean', path: '/culture/kpop' }
    ]
  },
  { label: 'AI 학습', labelEn: 'AI Chat', path: '/ai-chat' },
  { label: '발음 연습', labelEn: 'Speech', path: '/speech' }
];

export const CURRICULUM_CARDS = [
  { title: '한글 기초', titleEn: 'Hangul Basics', desc: '자음, 모음, 음절 구조와 발음 규칙 마스터', path: '/hangul', color: '#2C5282', icon: 'fa-solid fa-language' },
  { title: '일상 회화', titleEn: 'Daily Conversation', desc: '인사, 쇼핑, 여행 등 실생활 필수 한국어 표현', path: '/conversation', color: '#2B6CB0', icon: 'fa-solid fa-comments' },
  { title: '한국어 문법', titleEn: 'Korean Grammar', desc: '조사, 동사 활용, 존댓말 등 핵심 문법 학습', path: '/grammar', color: '#22C55E', icon: 'fa-solid fa-spell-check' },
  { title: '필수 어휘', titleEn: 'Vocabulary', desc: '기초·일상·비즈니스·TOPIK 필수 2,300 단어', path: '/vocabulary', color: '#F59E0B', icon: 'fa-solid fa-book' },
  { title: '한국어 작문', titleEn: 'Korean Writing', desc: '문장 구조부터 에세이까지 체계적 작문 연습', path: '/writing', color: '#A855F7', icon: 'fa-solid fa-pen-nib' },
  { title: 'TOPIK 대비', titleEn: 'TOPIK Prep', desc: '듣기·읽기 파트별 전략과 모의 테스트', path: '/topik', color: '#EF4444', icon: 'fa-solid fa-graduation-cap' },
  { title: '한국 문화', titleEn: 'Korean Culture', desc: 'K-드라마, K-팝으로 재미있게 배우는 한국어', path: '/culture', color: '#EC4899', icon: 'fa-solid fa-masks-theater' },
  { title: 'AI 한국어 대화', titleEn: 'AI Chat', desc: 'AI와 실시간 한국어 대화 연습', path: '/ai-chat', color: '#06B6D4', icon: 'fa-solid fa-robot' },
  { title: '발음 연습', titleEn: 'Speech Practice', desc: '음성 인식으로 한국어 발음 정확도 확인', path: '/speech', color: '#8B5CF6', icon: 'fa-solid fa-microphone' }
];

export const FAMILY_SITES = [
  { name: 'DreamIT Biz (본사이트)', url: 'https://www.dreamitbiz.com' },
  { name: 'KoreaTech 컴퓨팅 사고', url: 'https://koreatech.dreamitbiz.com' },
  { name: 'DB Study 데이터베이스', url: 'https://db-study.dreamitbiz.com' },
  { name: 'English Pro 영어 학습', url: 'https://english.dreamitbiz.com' },
  { name: 'Korean Pro 한국어 학습', url: 'https://korean.dreamitbiz.com' }
];
