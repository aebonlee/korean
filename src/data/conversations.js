export const GREETING_DIALOGUES = [
  {
    title: '처음 만났을 때',
    titleEn: 'Meeting for the first time',
    lines: [
      { speaker: 'A', ko: '안녕하세요! 저는 김민수입니다.', en: 'Hello! I am Kim Minsu.' },
      { speaker: 'B', ko: '안녕하세요! 만나서 반갑습니다. 저는 사라입니다.', en: 'Hello! Nice to meet you. I am Sara.' },
      { speaker: 'A', ko: '어디에서 오셨어요?', en: 'Where are you from?' },
      { speaker: 'B', ko: '미국에서 왔어요. 한국에 온 지 3개월 됐어요.', en: 'I\'m from America. I\'ve been in Korea for 3 months.' },
      { speaker: 'A', ko: '한국어를 잘 하시네요!', en: 'You speak Korean well!' },
      { speaker: 'B', ko: '아직 많이 부족해요. 열심히 공부하고 있어요.', en: 'I\'m still lacking a lot. I\'m studying hard.' },
    ],
    vocabulary: [
      { word: '만나다', meaning: 'to meet' },
      { word: '반갑다', meaning: 'to be glad/pleased' },
      { word: '오다', meaning: 'to come' },
      { word: '잘 하다', meaning: 'to do well' },
      { word: '부족하다', meaning: 'to be lacking' },
      { word: '열심히', meaning: 'diligently, hard' },
    ]
  },
  {
    title: '직장 동료에게 인사',
    titleEn: 'Greeting a colleague',
    lines: [
      { speaker: 'A', ko: '좋은 아침이에요!', en: 'Good morning!' },
      { speaker: 'B', ko: '네, 안녕하세요! 오늘 날씨가 좋네요.', en: 'Yes, hello! The weather is nice today.' },
      { speaker: 'A', ko: '맞아요. 주말에 뭐 하셨어요?', en: 'That\'s right. What did you do on the weekend?' },
      { speaker: 'B', ko: '가족이랑 한강에 갔어요. 정말 좋았어요.', en: 'I went to the Han River with my family. It was really nice.' },
    ],
    vocabulary: [
      { word: '아침', meaning: 'morning' },
      { word: '날씨', meaning: 'weather' },
      { word: '주말', meaning: 'weekend' },
      { word: '가족', meaning: 'family' },
    ]
  }
];

export const DAILY_DIALOGUES = [
  {
    title: '택시 타기',
    titleEn: 'Taking a taxi',
    lines: [
      { speaker: '승객', ko: '기사님, 강남역으로 가주세요.', en: 'Driver, please go to Gangnam Station.' },
      { speaker: '기사', ko: '네, 알겠습니다. 어떤 길로 갈까요?', en: 'Yes, understood. Which way should I go?' },
      { speaker: '승객', ko: '빠른 길로 가주세요.', en: 'Please take the fastest route.' },
      { speaker: '기사', ko: '네, 약 20분 정도 걸릴 거예요.', en: 'Yes, it will take about 20 minutes.' },
      { speaker: '승객', ko: '여기서 세워 주세요. 얼마예요?', en: 'Please stop here. How much is it?' },
      { speaker: '기사', ko: '만 오천 원입니다.', en: 'It\'s 15,000 won.' },
    ],
    vocabulary: [
      { word: '기사님', meaning: 'driver (polite)' },
      { word: '역', meaning: 'station' },
      { word: '길', meaning: 'road, way' },
      { word: '빠르다', meaning: 'fast' },
      { word: '걸리다', meaning: 'to take (time)' },
      { word: '세우다', meaning: 'to stop (a vehicle)' },
    ]
  }
];

export const SHOPPING_DIALOGUES = [
  {
    title: '옷 가게에서',
    titleEn: 'At a clothing store',
    lines: [
      { speaker: '손님', ko: '이 옷 다른 색깔 있어요?', en: 'Do you have this in a different color?' },
      { speaker: '직원', ko: '네, 검정색과 흰색이 있어요.', en: 'Yes, we have black and white.' },
      { speaker: '손님', ko: '검정색으로 입어봐도 될까요?', en: 'Can I try on the black one?' },
      { speaker: '직원', ko: '네, 탈의실은 저쪽입니다.', en: 'Yes, the fitting room is over there.' },
      { speaker: '손님', ko: '이거 얼마예요?', en: 'How much is this?' },
      { speaker: '직원', ko: '삼만 원인데, 지금 20% 세일 중이에요.', en: 'It\'s 30,000 won, but it\'s currently 20% off.' },
    ],
    vocabulary: [
      { word: '색깔', meaning: 'color' },
      { word: '입다', meaning: 'to wear' },
      { word: '탈의실', meaning: 'fitting room' },
      { word: '세일', meaning: 'sale' },
    ]
  }
];

export const TRAVEL_DIALOGUES = [
  {
    title: '호텔 체크인',
    titleEn: 'Hotel check-in',
    lines: [
      { speaker: '손님', ko: '안녕하세요, 예약한 김사라입니다.', en: 'Hello, I have a reservation. My name is Kim Sara.' },
      { speaker: '직원', ko: '네, 확인하겠습니다. 여권 보여주시겠어요?', en: 'Yes, let me check. May I see your passport?' },
      { speaker: '손님', ko: '네, 여기 있습니다.', en: 'Yes, here it is.' },
      { speaker: '직원', ko: '3박 4일 맞으시죠? 방은 7층 702호입니다.', en: '3 nights and 4 days, correct? Your room is 702 on the 7th floor.' },
      { speaker: '손님', ko: '조식은 몇 시부터예요?', en: 'What time does breakfast start?' },
      { speaker: '직원', ko: '아침 7시부터 10시까지입니다.', en: 'From 7 AM to 10 AM.' },
    ],
    vocabulary: [
      { word: '예약', meaning: 'reservation' },
      { word: '여권', meaning: 'passport' },
      { word: '층', meaning: 'floor' },
      { word: '조식', meaning: 'breakfast (formal)' },
    ]
  }
];

export const RESTAURANT_DIALOGUES = [
  {
    title: '식당에서 주문하기',
    titleEn: 'Ordering at a restaurant',
    lines: [
      { speaker: '손님', ko: '저기요, 메뉴판 좀 주세요.', en: 'Excuse me, may I have the menu please?' },
      { speaker: '직원', ko: '네, 여기 있습니다. 주문하시겠어요?', en: 'Yes, here you are. Would you like to order?' },
      { speaker: '손님', ko: '비빔밥 하나랑 된장찌개 하나 주세요.', en: 'One bibimbap and one doenjang jjigae, please.' },
      { speaker: '직원', ko: '음료는 어떤 걸로 하시겠어요?', en: 'What would you like to drink?' },
      { speaker: '손님', ko: '물이면 됩니다. 반찬 좀 더 주실 수 있어요?', en: 'Water is fine. Can I get more side dishes?' },
      { speaker: '직원', ko: '네, 바로 가져다 드리겠습니다.', en: 'Yes, I\'ll bring them right away.' },
    ],
    vocabulary: [
      { word: '메뉴판', meaning: 'menu' },
      { word: '주문하다', meaning: 'to order' },
      { word: '음료', meaning: 'beverage' },
      { word: '반찬', meaning: 'side dish' },
    ]
  }
];

export const PHONE_DIALOGUES = [
  {
    title: '전화 예약하기',
    titleEn: 'Making a phone reservation',
    lines: [
      { speaker: 'A', ko: '여보세요, 거기 한식당이죠?', en: 'Hello, is this the Korean restaurant?' },
      { speaker: 'B', ko: '네, 맞습니다. 무엇을 도와드릴까요?', en: 'Yes, that\'s right. How can I help you?' },
      { speaker: 'A', ko: '오늘 저녁 6시에 4명 예약하고 싶은데요.', en: 'I\'d like to make a reservation for 4 people at 6 PM tonight.' },
      { speaker: 'B', ko: '잠시만요... 네, 가능합니다. 성함이 어떻게 되세요?', en: 'One moment... Yes, it\'s available. What is your name?' },
      { speaker: 'A', ko: '이민호입니다.', en: 'It\'s Lee Minho.' },
      { speaker: 'B', ko: '네, 이민호 님 4명 6시로 예약되었습니다.', en: 'Yes, reservation confirmed for Mr. Lee Minho, 4 people at 6 PM.' },
    ],
    vocabulary: [
      { word: '여보세요', meaning: 'hello (on the phone)' },
      { word: '예약하다', meaning: 'to make a reservation' },
      { word: '명', meaning: 'counter for people' },
      { word: '성함', meaning: 'name (honorific)' },
    ]
  }
];
