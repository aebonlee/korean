# Korean Pro - 개발 문서

> **사이트**: https://korean.dreamitbiz.com
> **저장소**: https://github.com/aebonlee/korean
> **버전**: 1.5.0
> **최종 업데이트**: 2026-03-26

---

## 프로젝트 개요

Korean Pro는 한국어를 배우는 외국인을 위한 종합 학습 플랫폼입니다. React + Vite 기반의 SPA로, 한글 기초부터 TOPIK 시험 준비까지 체계적인 커리큘럼을 제공합니다.

### 기술 스택

| 항목 | 기술 |
|------|------|
| 프레임워크 | React 19 |
| 빌드 도구 | Vite 8 |
| 라우팅 | React Router DOM 7 |
| 백엔드 | Supabase (인증, DB) |
| 배포 | GitHub Pages (gh-pages) |
| 아이콘 | Font Awesome 6 (CDN) |
| 애니메이션 | AOS (Animate On Scroll) |
| TTS | Web Speech API (ko-KR) |

---

## 프로젝트 구조

```
korean/
├── public/              # 정적 파일 (CNAME, favicon 등)
├── src/
│   ├── components/      # 공용 컴포넌트
│   │   ├── PageLayout.jsx    # 사이드바 + 콘텐츠 레이아웃
│   │   ├── SubNav.jsx        # 카테고리 네비게이션 (navData export)
│   │   ├── SectionNav.jsx    # 섹션 앵커 네비게이션
│   │   ├── SEOHead.jsx       # SEO 메타태그
│   │   ├── TTSButton.jsx     # TTS 버튼
│   │   ├── GlobalTTS.jsx     # 전역 TTS 관리
│   │   ├── ai/               # AI 채팅 컴포넌트
│   │   └── speech/           # 발음 연습 컴포넌트
│   ├── pages/           # 페이지 컴포넌트
│   │   ├── hangul/           # 한글 기초 (4페이지)
│   │   ├── conversation/     # 일상 회화 (6페이지)
│   │   ├── grammar/          # 문법 (4페이지)
│   │   ├── vocabulary/       # 어휘 (4페이지)
│   │   ├── writing/          # 작문 (3페이지)
│   │   ├── topik/            # TOPIK (3페이지)
│   │   ├── culture/          # 한국 문화 (2페이지)
│   │   ├── ai-chat/          # AI 채팅
│   │   └── speech/           # 발음 연습
│   ├── contexts/        # React Context
│   │   └── LanguageContext.jsx  # 한/영 언어 전환
│   ├── config/          # 설정
│   │   └── site.js           # 사이트 설정, NAV_MENU, 커리큘럼 카드
│   ├── data/            # 데이터 파일
│   │   ├── vocabBasicData.js      # 기초 500 단어
│   │   ├── vocabDailyData.js      # 일상 500 단어
│   │   ├── vocabBusinessData.js   # 비즈니스 500 단어
│   │   ├── vocabTopikData.js      # TOPIK 800 단어
│   │   └── topikData.js           # TOPIK 시험 정보
│   ├── hooks/           # 커스텀 훅
│   │   └── useAOS.js         # AOS 애니메이션 훅
│   ├── styles/          # CSS 파일
│   │   ├── site.css          # 메인 스타일시트
│   │   ├── dark-mode.css     # 다크모드
│   │   └── responsive.css    # 반응형 (1024/768/640/480px)
│   └── utils/           # 유틸리티
│       └── translations.js   # 공통 번역 레이블
├── DEVELOPMENT.md       # 이 문서
├── package.json
├── vite.config.js
└── eslint.config.js
```

---

## 핵심 컴포넌트

### PageLayout.jsx — 사이드바 + 콘텐츠 레이아웃

영어 사이트(English Pro)와 동일한 패턴의 레이아웃 컴포넌트입니다.

**Props:**
- `sections`: `{id, ko, en}[]` — 페이지 내 섹션 배열
- `category`: `string` — 카테고리 키 (hangul, conversation, grammar, vocabulary, writing, topik, culture)
- `children`: 콘텐츠

**동작:**
- **데스크톱 (>1024px)**: CSS Grid `260px | 1fr` 레이아웃
  - 좌측: Sticky 사이드바 (카테고리 토글 + 형제 페이지 링크 + 현재 페이지 섹션 앵커)
  - 우측: 흰색 박스 콘텐츠 영역 (border, border-radius, box-shadow)
- **모바일 (≤1024px)**: 사이드바 숨김, SubNav 가로바 + SectionNav 칩으로 대체
- IntersectionObserver로 스크롤 시 활성 섹션 자동 추적
- Web Speech API로 한국어 텍스트에 TTS 버튼 자동 삽입

### SubNav.jsx — 카테고리 네비게이션

**Export:**
- `categoryTitles`: 카테고리별 한/영 타이틀 객체
- `navData`: 카테고리별 `{path, ko, en}` 배열 (site.js NAV_MENU 기반)
- `SubNav` 컴포넌트: `category` prop으로 동작, 가로 스크롤 + 페이드 인디케이터

### SectionNav.jsx — 섹션 앵커 네비게이션

- `sections` prop으로 `{id, ko, en}` 배열 수신
- `<a href="#id">` 앵커 링크 (NavLink 대신)
- IntersectionObserver로 활성 섹션 추적
- 가로 스크롤 칩 UI (모바일용)

---

## 페이지 구조 패턴

### Hub 페이지 (카테고리 인덱스)

7개 Hub 페이지: HangulHome, ConversationHome, GrammarHome, VocabHome, WritingHome, TopikHome, CultureHome

```jsx
// 패턴: TOPIC_CARDS 배열 + level 필드 + topic-card 렌더링
const TOPIC_CARDS = [
  { path, icon, titleKo, titleEn, descKo, descEn, lessons, level },
];

<Link className={`topic-card topic-card--${card.level}`}>
  <span className="topic-card__level">
    <i className="fas fa-signal"></i> {levelLabel}
  </span>
</Link>
```

### Content 페이지 (학습 콘텐츠)

26개 Content 페이지: 각 카테고리의 개별 학습 페이지

```jsx
// 패턴: sections 배열 정의 → PageLayout 래핑 → section id 할당
const sections = [
  { id: 'section-id', ko: '섹션 제목', en: 'Section Title' },
];

<>
  <section className="page-header">...</section>
  <PageLayout sections={sections} category="category-key">
    <section id="section-id" className="lesson-section">...</section>
    ...
  </PageLayout>
</>
```

### 단독 페이지

2개: AiChatPage, SpeechPage — PageLayout 미사용 (사이드바 불필요)

---

## 레벨 시스템

| 레벨 | 한국어 | 영어 | 카드 보더 | 배지 배경 | 배지 텍스트 |
|------|--------|------|-----------|-----------|-------------|
| Beginner | 초급 | Beginner | #059669 | #ECFDF5 | #059669 |
| Intermediate | 중급 | Intermediate | #D97706 | #FFFBEB | #D97706 |
| Advanced | 고급 | Advanced | #7C3AED | #F5F3FF | #7C3AED |

**카테고리별 레벨 배정:**
- 한글: 모두 초급
- 회화: Greetings 초급, 나머지 중급
- 문법: Honorifics 고급, 나머지 중급
- 어휘: Basic 초급, Daily 중급, Business 고급, TOPIK 고급
- 작문: BasicSentence 초급, Paragraph 중급, Essay 고급
- TOPIK: 모두 고급
- 문화: 모두 중급

---

## CSS 아키텍처

### site.css — 메인 스타일시트

주요 섹션:
- 레이아웃: `.page-layout`, `.content-layout`, `.content-sidebar`, `.content-main`
- 사이드바: `.sidebar-nav`, `.sidebar-nav__toggle`, `.sidebar-nav__link`, `.sidebar-nav__sections`
- 모바일 네비: `.sub-nav-mobile`, `.section-nav-mobile`, `.sub-nav__list`, `.section-nav__list`
- 카드: `.topic-card--beginner/intermediate/advanced`, `.topic-card__level`
- 콘텐츠: `.lesson-section`, `.example-box`, `.tip-box`, `.expression-table`
- 컴포넌트: `.btn`, `.badge`, `.card`, `.expression-card`, `.dialogue`

### dark-mode.css — 다크모드 오버라이드

`[data-theme="dark"]` 셀렉터 기반:
- 사이드바: 배경 #1F2937, 보더 #374151
- 콘텐츠: 배경 #111827
- 레벨 배지: 다크 배경 조정
- 섹션 네비: 칩 스타일 다크 조정

### responsive.css — 반응형 브레이크포인트

| 브레이크포인트 | 주요 변경 |
|---------------|-----------|
| ≤1024px | 사이드바 숨김, 모바일 네비 표시, 그리드 1열 |
| ≤768px | 네비 햄버거 메뉴, 폰트 축소 |
| ≤640px | 단일 열, 컴팩트 UI |
| ≤480px | 최소 사이즈, 15px 기본 폰트 |

---

## 개발 명령어

```bash
# 개발 서버
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 미리보기
npm run preview

# 린트
npm run lint

# 배포 (GitHub Pages)
npm run deploy
```

---

## 배포 프로세스

1. `npm run build` → `dist/` 폴더에 프로덕션 빌드 생성
2. 빌드 후 자동으로 `404.html`과 `CNAME` 복사
3. `npm run deploy` → `gh-pages` 패키지로 `dist/` 폴더를 `gh-pages` 브랜치에 푸시
4. GitHub Pages가 자동으로 `korean.dreamitbiz.com`에 배포

---

## 다국어 지원

`LanguageContext`를 통한 한/영 전환:

```jsx
const { language, t } = useLanguage();

// t(한국어, 영어) 패턴
<h1>{t('발음 연습', 'Speech Practice')}</h1>

// language 직접 참조
{language === 'ko' ? cat.categoryKo : cat.categoryEn}
```

---

## 변경 이력

### v1.5.0 (2026-03-26) — UI 대폭 개선

**레이아웃:**
- PageLayout 컴포넌트 전면 재작성 (데스크톱 사이드바 + 콘텐츠 박스 레이아웃)
- SubNav 컴포넌트 재작성 (categoryTitles, navData export, 가로 스크롤)
- SectionNav 컴포넌트 재작성 (앵커 링크, IntersectionObserver, 칩 UI)
- 26개 콘텐츠 페이지에 PageLayout 적용 + 섹션 ID 할당

**디자인:**
- 레벨 카드 시스템 도입 (초급 초록, 중급 주황, 고급 보라)
- 7개 Hub 페이지에 레벨 배지 추가
- 모든 이모지(💡) → Font Awesome 아이콘 교체 (42개 파일)
- 팁 박스 좌측 보더 강조 + FA lightbulb 아이콘

**CSS:**
- site.css: 사이드바, 콘텐츠 레이아웃, 레벨 카드, 섹션 네비 스타일 추가
- dark-mode.css: 사이드바, 레벨 배지, 섹션 네비 다크모드 추가
- responsive.css: 1024px 브레이크포인트에서 사이드바 숨김/모바일 네비 표시

**변경 파일 수: 42개**
- 컴포넌트: 3개 (SubNav, SectionNav, PageLayout)
- CSS: 3개 (site.css, dark-mode.css, responsive.css)
- Hub 페이지: 7개
- Content 페이지: 26개
- 단독 페이지: 2개 (AiChatPage, SpeechPage)
- 유틸리티: 1개 (translations.js)

### v1.4.0 — TTS 스피커 버튼 + 어휘 확장

- TTS 스피커 버튼 가시화
- 어휘 800개 확장 및 페이지네이션

### v1.3.0 — 전체 TTS 지원 확대

- 전체 페이지 한국어 TTS 지원

### v1.2.0 — CSS 보완

- Dashboard, Settings, 레이아웃, 다크모드, 반응형 CSS 전면 보완

### v1.1.0 — TTS + CSS + 다국어

- TTS 기능 강화 + 누락 CSS + 줄간격/다국어 정렬

### v1.0.0 — 초기 릴리스

- Korean Pro 한국어 학습 사이트 초기 릴리스
