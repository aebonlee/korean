export const TOPIK_LISTENING = [
  {
    id: 1,
    level: 'TOPIK I',
    question: '다음을 듣고 맞는 그림을 고르세요.',
    questionEn: 'Listen and choose the correct picture.',
    audio: null,
    transcript: '여자: 오늘 날씨가 정말 좋아요. 산책하러 가요.',
    transcriptEn: 'Woman: The weather is really nice today. Let\'s go for a walk.',
    options: [
      '공원에서 산책하는 사람들',
      '비가 오는 날',
      '눈이 오는 날',
      '바람이 많이 부는 날'
    ],
    answer: 0,
    explanation: '날씨가 좋아서 산책하러 가자는 내용입니다.'
  },
  {
    id: 2,
    level: 'TOPIK I',
    question: '다음을 듣고 이어질 말을 고르세요.',
    questionEn: 'Listen and choose what comes next.',
    audio: null,
    transcript: '남자: 주말에 뭐 할 거예요?',
    transcriptEn: 'Man: What are you going to do on the weekend?',
    options: [
      '친구를 만날 거예요.',
      '어제 영화를 봤어요.',
      '지금 공부하고 있어요.',
      '작년에 한국에 왔어요.'
    ],
    answer: 0,
    explanation: '주말 계획을 묻는 질문이므로 미래 계획으로 답합니다.'
  }
];

export const TOPIK_READING = [
  {
    id: 1,
    level: 'TOPIK I',
    passage: '저는 베트남에서 온 응우옌입니다. 한국에 온 지 6개월이 됐어요. 지금 대학교에서 한국어를 공부하고 있어요. 한국어가 어렵지만 재미있어요. 특히 한국 드라마를 보면서 공부하는 것이 좋아요.',
    passageEn: 'I am Nguyen from Vietnam. I\'ve been in Korea for 6 months. I\'m studying Korean at a university now. Korean is difficult but fun. I especially like studying while watching Korean dramas.',
    question: '이 사람은 누구입니까?',
    questionEn: 'Who is this person?',
    options: [
      '한국에서 공부하는 베트남 학생',
      '베트남에서 일하는 한국 사람',
      '한국어 선생님',
      '드라마 배우'
    ],
    answer: 0,
    explanation: '베트남에서 와서 한국에서 한국어를 공부하고 있다고 했으므로 베트남 학생입니다.'
  },
  {
    id: 2,
    level: 'TOPIK I',
    passage: '한국에서 식당에 가면 기본 반찬을 무료로 줍니다. 김치, 콩나물, 시금치 등 다양한 반찬이 있어요. 반찬이 부족하면 더 달라고 할 수 있어요. 이것은 한국 식당의 특별한 문화입니다.',
    passageEn: 'When you go to a restaurant in Korea, they give you basic side dishes for free. There are various side dishes like kimchi, bean sprouts, and spinach. If you need more, you can ask for more. This is a special culture of Korean restaurants.',
    question: '이 글의 내용과 같은 것은?',
    questionEn: 'Which matches the content of this passage?',
    options: [
      '한국 식당에서 반찬은 무료이다.',
      '반찬을 더 달라고 하면 안 된다.',
      '한국 식당에는 반찬이 없다.',
      '김치는 반찬이 아니다.'
    ],
    answer: 0,
    explanation: '한국 식당에서 기본 반찬을 무료로 제공한다는 내용입니다.'
  }
];

export const TOPIK_LEVELS = {
  TOPIK_I: {
    name: 'TOPIK I',
    levels: ['1급', '2급'],
    description: '초급 수준. 기본적인 생활 한국어를 평가합니다.',
    descriptionEn: 'Beginner level. Evaluates basic everyday Korean.',
  },
  TOPIK_II: {
    name: 'TOPIK II',
    levels: ['3급', '4급', '5급', '6급'],
    description: '중·고급 수준. 학문적·전문적 한국어를 평가합니다.',
    descriptionEn: 'Intermediate to advanced level. Evaluates academic and professional Korean.',
  }
};
