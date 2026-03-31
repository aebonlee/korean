import React, { Suspense, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import GlobalTTS from '../components/GlobalTTS';

// Lazy-loaded pages
const Home = React.lazy(() => import('../pages/Home'));
const Login = React.lazy(() => import('../pages/Login'));
const Dashboard = React.lazy(() => import('../pages/Dashboard'));
const Settings = React.lazy(() => import('../pages/Settings'));
const NotFound = React.lazy(() => import('../pages/NotFound'));

// Hangul
const HangulHome = React.lazy(() => import('../pages/hangul/HangulHome'));
const Consonants = React.lazy(() => import('../pages/hangul/Consonants'));
const Vowels = React.lazy(() => import('../pages/hangul/Vowels'));
const Syllables = React.lazy(() => import('../pages/hangul/Syllables'));
const PronunciationRules = React.lazy(() => import('../pages/hangul/PronunciationRules'));

// Conversation
const ConversationHome = React.lazy(() => import('../pages/conversation/ConversationHome'));
const Greetings = React.lazy(() => import('../pages/conversation/Greetings'));
const DailyLife = React.lazy(() => import('../pages/conversation/DailyLife'));
const Shopping = React.lazy(() => import('../pages/conversation/Shopping'));
const Travel = React.lazy(() => import('../pages/conversation/Travel'));
const Restaurant = React.lazy(() => import('../pages/conversation/Restaurant'));
const Phone = React.lazy(() => import('../pages/conversation/Phone'));

// Grammar
const GrammarHome = React.lazy(() => import('../pages/grammar/GrammarHome'));
const Particles = React.lazy(() => import('../pages/grammar/Particles'));
const VerbConjugation = React.lazy(() => import('../pages/grammar/VerbConjugation'));
const Honorifics = React.lazy(() => import('../pages/grammar/Honorifics'));
const SentencePatterns = React.lazy(() => import('../pages/grammar/SentencePatterns'));

// Vocabulary
const VocabHome = React.lazy(() => import('../pages/vocabulary/VocabHome'));
const VocabBasic = React.lazy(() => import('../pages/vocabulary/VocabBasic'));
const VocabDaily = React.lazy(() => import('../pages/vocabulary/VocabDaily'));
const VocabBusiness = React.lazy(() => import('../pages/vocabulary/VocabBusiness'));
const VocabTopik = React.lazy(() => import('../pages/vocabulary/VocabTopik'));

// Writing
const WritingHome = React.lazy(() => import('../pages/writing/WritingHome'));
const BasicSentence = React.lazy(() => import('../pages/writing/BasicSentence'));
const Paragraph = React.lazy(() => import('../pages/writing/Paragraph'));
const Essay = React.lazy(() => import('../pages/writing/Essay'));

// TOPIK
const TopikHome = React.lazy(() => import('../pages/topik/TopikHome'));
const Listening = React.lazy(() => import('../pages/topik/Listening'));
const Reading = React.lazy(() => import('../pages/topik/Reading'));
const MockTest = React.lazy(() => import('../pages/topik/MockTest'));

// Culture
const CultureHome = React.lazy(() => import('../pages/culture/CultureHome'));
const KDrama = React.lazy(() => import('../pages/culture/KDrama'));
const KPop = React.lazy(() => import('../pages/culture/KPop'));

// AI & Speech
const AiChatPage = React.lazy(() => import('../pages/ai-chat/AiChatPage'));
const SpeechPage = React.lazy(() => import('../pages/speech/SpeechPage'));

// AOS scroll animation
function useAOS() {
  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry: IntersectionObserverEntry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('aos-animate');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    });

    const elements = document.querySelectorAll('[data-aos]');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);
}

function PageLoader() {
  return (
    <div className="page-loader" role="status" aria-label="Loading page">
      <div className="page-loader-spinner">
        <div className="spinner-ring" />
      </div>
      <p className="page-loader-text">Loading...</p>
    </div>
  );
}

export default function PublicLayout() {
  useAOS();

  return (
    <div className="public-layout">
      <GlobalTTS />
      <Navbar />
      <main className="main-content" id="main-content">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route index element={<Home />} />

            {/* Hangul */}
            <Route path="hangul" element={<HangulHome />} />
            <Route path="hangul/consonants" element={<Consonants />} />
            <Route path="hangul/vowels" element={<Vowels />} />
            <Route path="hangul/syllables" element={<Syllables />} />
            <Route path="hangul/pronunciation" element={<PronunciationRules />} />

            {/* Conversation */}
            <Route path="conversation" element={<ConversationHome />} />
            <Route path="conversation/greetings" element={<Greetings />} />
            <Route path="conversation/daily-life" element={<DailyLife />} />
            <Route path="conversation/shopping" element={<Shopping />} />
            <Route path="conversation/travel" element={<Travel />} />
            <Route path="conversation/restaurant" element={<Restaurant />} />
            <Route path="conversation/phone" element={<Phone />} />

            {/* Grammar */}
            <Route path="grammar" element={<GrammarHome />} />
            <Route path="grammar/particles" element={<Particles />} />
            <Route path="grammar/verb-conjugation" element={<VerbConjugation />} />
            <Route path="grammar/honorifics" element={<Honorifics />} />
            <Route path="grammar/sentence-patterns" element={<SentencePatterns />} />

            {/* Vocabulary */}
            <Route path="vocabulary" element={<VocabHome />} />
            <Route path="vocabulary/basic" element={<VocabBasic />} />
            <Route path="vocabulary/daily" element={<VocabDaily />} />
            <Route path="vocabulary/business" element={<VocabBusiness />} />
            <Route path="vocabulary/topik" element={<VocabTopik />} />

            {/* Writing */}
            <Route path="writing" element={<WritingHome />} />
            <Route path="writing/basic" element={<BasicSentence />} />
            <Route path="writing/paragraph" element={<Paragraph />} />
            <Route path="writing/essay" element={<Essay />} />

            {/* TOPIK */}
            <Route path="topik" element={<TopikHome />} />
            <Route path="topik/listening" element={<Listening />} />
            <Route path="topik/reading" element={<Reading />} />
            <Route path="topik/mock-test" element={<MockTest />} />

            {/* Culture */}
            <Route path="culture" element={<CultureHome />} />
            <Route path="culture/kdrama" element={<KDrama />} />
            <Route path="culture/kpop" element={<KPop />} />

            {/* AI & Speech */}
            <Route path="ai-chat" element={<AiChatPage />} />
            <Route path="speech" element={<SpeechPage />} />

            {/* Auth & Settings */}
            <Route path="login" element={<Login />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="settings" element={<Settings />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
