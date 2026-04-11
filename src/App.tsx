import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import React, { useState } from 'react';
import { Menu, X, Globe, Check, Clock, Users, Calendar, Sparkles, Lock, MessageCircle, BookOpen, Headphones, PenTool, ArrowRight, RotateCcw, MapPin, UsersRound, PartyPopper, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import './App.css';

// Navigation Component - Logo banner style
function Navigation() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/classes', label: 'Classes' },
    { path: '/events', label: 'Events' },
    { path: '/how-it-works', label: 'How It Works' },
    { path: '/level-guide', label: 'Level Guide' },
    { path: '/about', label: 'About' },
    { path: '/student-login', label: 'Student Login' },
    { path: '/teacher-login', label: 'Teacher Login' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-[#fcc4be]">
      {/* Logo Banner Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3">
          {/* Logo - Wide banner style */}
          <Link to="/" className="flex items-center flex-1">
            <img 
              src="/logo-banner.png" 
              alt="Roam Learning" 
              className="h-16 sm:h-20 w-auto object-contain"
            />
          </Link>

          {/* CTA Button - Desktop */}
          <div className="hidden md:block ml-4">
            <Link to="/classes">
              <Button className="bg-[#d4867a] hover:bg-[#c2756a] text-white rounded-xl px-6 py-6 text-lg font-medium">
                Book a<br/>class
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 ml-2"
          >
            {isOpen ? (
              <X className="h-6 w-6 text-[#5a3d2a]" />
            ) : (
              <Menu className="h-6 w-6 text-[#5a3d2a]" />
            )}
          </button>
        </div>
      </div>

      {/* Navigation Links Row */}
      <div className="bg-[#faf6f3] border-t border-[#5a3d2a]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center space-x-8 py-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors ${
                  isActive(link.path) 
                    ? 'text-[#d4867a] border-b-2 border-[#d4867a] pb-1' 
                    : 'text-[#5a3d2a]/70 hover:text-[#5a3d2a]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu - Horizontal Dropdown */}
          {isOpen && (
            <div className="md:hidden">
              <div className="flex flex-wrap items-center justify-center gap-2 py-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      isActive(link.path) 
                        ? 'bg-[#d4867a] text-white' 
                        : 'bg-white text-[#5a3d2a] hover:bg-[#fcc4be]'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link to="/classes" onClick={() => setIsOpen(false)}>
                  <Button className="bg-[#d4867a] hover:bg-[#c2756a] text-white rounded-full text-sm">
                    Book a class
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

// Floating Translate Button with More Languages
function FloatingTranslateButton() {
  const [isOpen, setIsOpen] = useState(false);
  const languages = [
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' },
    { code: 'zh', name: '中文' },
    { code: 'ar', name: 'العربية' },
    { code: 'hi', name: 'हिन्दी' },
    { code: 'pt', name: 'Português' },
    { code: 'ru', name: 'Русский' },
    { code: 'tr', name: 'Türkçe' },
    { code: 'ja', name: '日本語' },
    { code: 'ko', name: '한국어' },
    { code: 'it', name: 'Italiano' },
    { code: 'pl', name: 'Polski' },
    { code: 'uk', name: 'Українська' },
    { code: 'vi', name: 'Tiếng Việt' },
    { code: 'th', name: 'ไทย' },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[400px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-center text-[#5a3d2a]">Translate to your language</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  alert(`Translating to ${lang.name}... (Google Translate integration would go here)`);
                  setIsOpen(false);
                }}
                className="p-3 text-sm rounded-lg bg-[#faf6f3] hover:bg-[#d4867a] hover:text-white transition-colors text-[#5a3d2a]"
              >
                {lang.name}
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
      
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 bg-[#d4867a] hover:bg-[#c2756a] text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
      >
        <Globe className="h-5 w-5 group-hover:rotate-12 transition-transform" />
        <span className="text-sm font-medium hidden sm:inline">Translate</span>
      </button>
    </div>
  );
}

// Book Now Banner
function BookNowBanner() {
  const [isVisible, setIsVisible] = useState(true);
  if (!isVisible) return null;

  return (
    <div className="bg-[#5a3d2a] text-white px-4 py-3 relative">
      <div className="max-w-7xl mx-auto flex items-center justify-center text-center">
        <Sparkles className="h-5 w-5 mr-2 hidden sm:inline" />
        <Link to="/classes" className="text-sm sm:text-base hover:underline">
          <strong>Book Now!</strong> Spots available in all levels for May!
        </Link>
        <button 
          onClick={() => setIsVisible(false)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

// Stylized Footer Component with Large Contact Banner
function Footer() {
  return (
    <footer className="bg-[#5a3d2a] text-white">
      {/* Large Contact Banner */}
      <div className="bg-[#d4867a] py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif mb-8">
            Questions? Call or Text Now!
          </h2>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-8">
            <a 
              href="tel:216-465-8084" 
              className="flex items-center gap-3 text-white hover:text-white/90 transition-colors"
            >
              <div className="bg-white/20 p-4 rounded-full">
                <Phone className="h-8 w-8" />
              </div>
              <span className="text-3xl sm:text-4xl font-medium">216-465-8084</span>
            </a>
            
            <a 
              href="mailto:help@roamlearning.org" 
              className="flex items-center gap-3 text-white hover:text-white/90 transition-colors"
            >
              <div className="bg-white/20 p-4 rounded-full">
                <Mail className="h-8 w-8" />
              </div>
              <span className="text-2xl sm:text-3xl font-medium">help@roamlearning.org</span>
            </a>
          </div>
          
          <p className="text-white/80 text-sm max-w-2xl mx-auto leading-relaxed">
            *Unfortunately calls are supported in English only at this time. Feel free to reach out 
            by text message, email, or by our contact form with written questions in your native language. 
            Standard Message & Data rates apply.
          </p>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-2xl font-serif mb-2">Roam Learning</h3>
          <p className="text-white/70 italic mb-4">English happens outside</p>
          <div className="text-sm text-white/50">
            © 2026 Roam Learning. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

// Home Page
function HomePage() {
  const features = [
    { icon: '🌳', text: 'Outdoor classes at Edgewater Park' },
    { icon: '💻', text: 'Virtual classes on Zoom' },
    { icon: '🏛️', text: 'Business English specialist' },
    { icon: '✍️', text: 'Curriculum developer' },
    { icon: '🌍', text: '6 years professional experience' },
  ];

  return (
    <div className="min-h-screen bg-[#faf6f3]">
      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 mb-8 shadow-sm">
            <span className="w-2 h-2 bg-[#d4867a] rounded-full animate-pulse"></span>
            <span className="text-sm text-[#5a3d2a]">Now enrolling — Cleveland, Ohio · May 2026</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#5a3d2a] mb-4">
            Real life learning
          </h1>
          <p className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#d4867a] italic mb-8">
            on your schedule
          </p>
          
          <p className="text-lg text-[#8b6b5c] max-w-2xl mx-auto mb-10 leading-relaxed">
            Conversational English at Edgewater Park, on field trips around Cleveland, 
            and one-on-one. English happens outside the classroom. Real conversations 
            in real places, on your schedule.
          </p>
          
          <Link to="/level-guide">
            <Button variant="outline" className="border-[#d4867a] text-[#d4867a] hover:bg-[#d4867a] hover:text-white rounded-full px-8 py-6 text-lg">
              Find your level free
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-2xl mx-auto">
          <div className="space-y-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-4 p-4 rounded-xl hover:bg-[#faf6f3] transition-colors">
                <span className="text-3xl">{feature.icon}</span>
                <span className="text-[#5a3d2a] font-medium">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery Placeholders */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto space-y-6">
          {[
            { icon: '🌳', title: 'Park class photo', subtitle: 'Replace with real photo' },
            { icon: '📷', title: 'Field trip photo', subtitle: 'Replace with real photo' },
            { icon: '📷', title: 'Tutor in action', subtitle: 'Replace with real photo' },
          ].map((photo, index) => (
            <div key={index} className="bg-[#f5ebe5] rounded-3xl p-12 text-center">
              <div className="text-5xl mb-4">{photo.icon}</div>
              <h3 className="text-[#d4867a] text-xl font-medium mb-2">{photo.title}</h3>
              <p className="text-[#8b6b5c]">{photo.subtitle}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// Class Types Data with Detailed Info
const classTypeData: Record<string, {
  title: string;
  description: string;
  singlePrice: number;
  bundlePrice: number;
  bundleSize: number;
  format: string;
  location: string;
  maxStudents: number;
  duration: string;
  schedule: string;
  details: string[];
}> = {
  'inperson-group': {
    title: 'In-Person Group Classes',
    description: 'Learn English outdoors in a supportive group environment at beautiful Edgewater Park.',
    singlePrice: 18,
    bundlePrice: 15,
    bundleSize: 5,
    format: 'In-Person Group',
    location: 'Edgewater Park, Cleveland',
    maxStudents: 8,
    duration: '45-50 minutes',
    schedule: 'Saturday & Sunday mornings',
    details: [
      'Classes held outdoors at Edgewater Park, weather permitting',
      'Up to 8 students per group for personalized attention',
      'Engaging conversations in real-world settings',
      'Build confidence speaking with peers at your level',
      'Practice English while enjoying Cleveland\'s beautiful lakefront',
    ],
  },
  'virtual-group': {
    title: 'Virtual Group Classes',
    description: 'Join interactive group sessions from anywhere via Zoom.',
    singlePrice: 16,
    bundlePrice: 14,
    bundleSize: 5,
    format: 'Virtual Group (Zoom)',
    location: 'Online via Zoom',
    maxStudents: 12,
    duration: '45-50 minutes',
    schedule: 'Flexible scheduling available',
    details: [
      'Join from anywhere with an internet connection',
      'Up to 12 students per virtual group',
      'Interactive breakout rooms for pair practice',
      'Screen sharing for collaborative learning',
      'Recording available for review (upon request)',
    ],
  },
  'inperson-individual': {
    title: 'In-Person Individual Classes',
    description: 'One-on-one personalized instruction tailored to your specific goals.',
    singlePrice: 23,
    bundlePrice: 19,
    bundleSize: 5,
    format: 'In-Person Individual',
    location: 'Flexible location in Cleveland area',
    maxStudents: 1,
    duration: '45-50 minutes',
    schedule: 'By appointment',
    details: [
      'Fully personalized curriculum based on your goals',
      'Flexible scheduling to fit your busy life',
      'Meet at a convenient location in the Cleveland area',
      'Focus on your specific challenges and interests',
      'Rapid progress with dedicated attention',
    ],
  },
  'virtual-individual': {
    title: 'Virtual Individual Classes',
    description: 'Private one-on-one sessions via Zoom, customized for you.',
    singlePrice: 21,
    bundlePrice: 18,
    bundleSize: 5,
    format: 'Virtual Individual (Zoom)',
    location: 'Online via Zoom',
    maxStudents: 1,
    duration: '45-50 minutes',
    schedule: 'By appointment',
    details: [
      'Personalized instruction from the comfort of your home',
      'Flexible scheduling across time zones',
      'Shared documents and resources in real-time',
      'Focus on your specific learning objectives',
      'Ideal for busy professionals',
    ],
  },
  'business-english': {
    title: 'Business English / Industry Specific',
    description: 'Professional English tailored to your industry and career goals.',
    singlePrice: 30,
    bundlePrice: 25,
    bundleSize: 5,
    format: 'Individual (In-Person or Virtual)',
    location: 'Flexible',
    maxStudents: 1,
    duration: '45-50 minutes',
    schedule: 'By appointment',
    details: [
      'In-depth intake to understand your industry and goals',
      'Review and improve professional emails and communications',
      'Presentation preparation and delivery coaching',
      'Mock meetings and negotiation practice',
      'Industry-specific vocabulary and terminology',
      'Professional writing and documentation support',
    ],
  },
  'interview-prep': {
    title: 'Interview Prep',
    description: 'Intensive role-play focused preparation for job interviews.',
    singlePrice: 28,
    bundlePrice: 28,
    bundleSize: 1,
    format: 'Individual (In-Person or Virtual)',
    location: 'Flexible',
    maxStudents: 1,
    duration: '45-50 minutes',
    schedule: 'By appointment',
    details: [
      'Practice top interview questions for your industry',
      'Real-time feedback on responses and delivery',
      'Role-play scenarios with constructive critique',
      'Build confidence for high-stakes interviews',
      'Learn techniques to handle difficult questions',
      'Polish your professional introduction and closing',
    ],
  },
  'social-events': {
    title: 'Social English Events',
    description: 'Casual group meetups to practice English in social settings.',
    singlePrice: 0,
    bundlePrice: 0,
    bundleSize: 1,
    format: 'Group Social Events',
    location: 'Various locations around Cleveland',
    maxStudents: 20,
    duration: 'Varies by event',
    schedule: 'Monthly events',
    details: [
      'Small participation fee to join (covers organization)',
      'You are responsible for your own cover charge and purchases at events',
      'Many events are low-cost or free (parks, coffee shops, etc.)',
      'Practice English in relaxed, real-world social settings',
      'Meet fellow learners and build community',
      'Events include coffee meetups, park walks, museum visits, and more',
    ],
  },
};

// Level-specific curriculum data
const levelCurriculum: Record<string, {
  grammar: string[];
  vocabulary: string[];
  outcomes: string[];
  culture: string[];
}> = {
  'A1 — True Beginner': {
    grammar: [
      'Subject pronouns (I, you, he, she, it, we, they)',
      'To be — am, is, are',
      'Simple yes/no questions',
      'Articles — a, an, the',
      'Have / has',
      'Simple present tense',
      'Basic negatives (not)',
    ],
    vocabulary: [
      'Greetings and introductions',
      'Numbers, colors, sizes',
      'Food and drink basics',
      'Everyday feelings',
      'Common objects',
      'Days of the week and time',
    ],
    outcomes: [
      'Introduce yourself confidently',
      'Order food and drinks',
      'Say what you like and don\'t like',
      'Ask for help or repetition',
    ],
    culture: [
      'American greetings and customs',
      'Reading signs and menus',
      'Emoji and basic text language',
      'Memes using simple structures',
    ],
  },
  'A1–A2 — Elementary': {
    grammar: [
      'Past simple tense (regular and irregular verbs)',
      'Future with going to and will',
      'Comparatives and superlatives',
      'Countable and uncountable nouns',
      'Modal verbs: can, could for ability',
      'Present continuous for actions now',
      'There is / There are',
    ],
    vocabulary: [
      'Daily routines and activities',
      'Weather and seasons',
      'Transportation and directions',
      'Shopping and money',
      'Family and relationships',
      'Hobbies and free time',
    ],
    outcomes: [
      'Talk about past experiences',
      'Make simple future plans',
      'Compare things and people',
      'Ask for and give directions',
    ],
    culture: [
      'Small talk topics in America',
      'Understanding American humor',
      'Social media expressions',
      'Common slang and idioms',
    ],
  },
  'A2–B1 — Pre-Intermediate': {
    grammar: [
      'Present perfect experiences',
      'Past continuous vs. past simple',
      'Modal verbs: should, must, might',
      'First conditional (if + will)',
      'Passive voice (basic forms)',
      'Reported speech (basic)',
      'Question tags',
    ],
    vocabulary: [
      'Work and career terms',
      'Health and body',
      'Travel and accommodation',
      'Technology and internet',
      'Environment and nature',
      'Emotions and personality',
    ],
    outcomes: [
      'Describe experiences and achievements',
      'Give advice and make suggestions',
      'Talk about hypothetical situations',
      'Express opinions on various topics',
    ],
    culture: [
      'American workplace culture',
      'Dating and social norms',
      'Popular TV and film phrases',
      'Regional accents and dialects',
    ],
  },
  'B1 — Intermediate': {
    grammar: [
      'Present perfect continuous',
      'Second conditional (if + would)',
      'Used to and would for past habits',
      'Passive voice (all tenses)',
      'Reported speech (full)',
      'Relative clauses (who, which, that)',
      'Gerunds and infinitives',
    ],
    vocabulary: [
      'Business and professional English',
      'News and current events',
      'Education and learning',
      'Arts and entertainment',
      'Science and technology',
      'Social issues and debates',
    ],
    outcomes: [
      'Discuss complex topics fluently',
      'Negotiate and persuade effectively',
      'Understand main ideas of complex text',
      'Interact with native speakers comfortably',
    ],
    culture: [
      'American politics and media',
      'Subtle humor and sarcasm',
      'Professional email etiquette',
      'Networking and social events',
    ],
  },
  'B2 — Upper Intermediate': {
    grammar: [
      'Third conditional (if + would have)',
      'Mixed conditionals',
      'Modal verbs of deduction (must have, can\'t have)',
      'Passive voice (advanced)',
      'Wish and if only',
      'Phrasal verbs in context',
      'Emphasis with cleft sentences',
    ],
    vocabulary: [
      'Advanced business terminology',
      'Academic and formal language',
      'Idioms and colloquialisms',
      'Abstract concepts and ideas',
      'Nuanced emotions and attitudes',
      'Professional presentations',
    ],
    outcomes: [
      'Express yourself fluently and spontaneously',
      'Use language flexibly for social and professional purposes',
      'Produce clear, well-structured detailed text',
      'Understand extended speech and lectures',
    ],
    culture: [
      'Understanding cultural references',
      'American history and its impact on language',
      'Subtext and implied meaning',
      'Professional negotiation styles',
    ],
  },
  'C1 — Advanced & Business': {
    grammar: [
      'Advanced conditionals and subjunctive',
      'Inversion for emphasis',
      'Ellipsis and substitution',
      'Complex noun phrases',
      'Discourse markers and connectors',
      'Nominalization',
      'Advanced reported speech patterns',
    ],
    vocabulary: [
      'Executive and leadership language',
      'Legal and financial terminology',
      'Rhetorical devices',
      'Register and tone adjustment',
      'Cross-cultural communication',
      'Crisis and conflict language',
    ],
    outcomes: [
      'Express ideas fluently and spontaneously without searching for words',
      'Use language flexibly and effectively for social, academic, and professional purposes',
      'Produce clear, well-structured, detailed text on complex subjects',
      'Understand with ease virtually everything heard or read',
    ],
    culture: [
      'Boardroom dynamics and power language',
      'American corporate culture',
      'Subtle persuasion techniques',
      'Building rapport across cultures',
    ],
  },
};

// Class Type Icons Component
function ClassTypeIcon({ type }: { type: string }) {
  const icons: Record<string, React.ReactNode> = {
    'inperson-group': (
      <div className="flex items-center justify-center gap-1">
        <span className="text-2xl">🌳</span>
        <span className="text-xl">👥</span>
      </div>
    ),
    'virtual-group': (
      <div className="flex items-center justify-center gap-1">
        <span className="text-xl">💻</span>
        <span className="text-xl">💻</span>
        <span className="text-xl">💻</span>
      </div>
    ),
    'inperson-individual': (
      <div className="flex items-center justify-center gap-1">
        <span className="text-2xl">👤</span>
        <span className="text-xl">☕</span>
      </div>
    ),
    'virtual-individual': (
      <div className="flex items-center justify-center">
        <span className="text-2xl">🖥️</span>
      </div>
    ),
    'business-english': (
      <div className="flex items-center justify-center">
        <span className="text-2xl">💼</span>
      </div>
    ),
    'interview-prep': (
      <div className="flex items-center justify-center">
        <span className="text-2xl">🎯</span>
      </div>
    ),
    'social-events': (
      <div className="flex items-center justify-center">
        <span className="text-2xl">🎉</span>
      </div>
    ),
  };
  return icons[type] || <span className="text-2xl">📚</span>;
}

// Classes Page with New Pricing Display
function ClassesPage() {
  const [selectedClassType, setSelectedClassType] = useState<string | null>(null);

  const classTypes = [
    { id: 'inperson-group', label: 'In-Person Group', price: '$18' },
    { id: 'virtual-group', label: 'Virtual Group', price: '$16' },
    { id: 'inperson-individual', label: 'In-Person Individual', price: '$23' },
    { id: 'virtual-individual', label: 'Virtual Individual', price: '$21' },
    { id: 'business-english', label: 'Business English', price: '$30' },
    { id: 'interview-prep', label: 'Interview Prep', price: '$28' },
    { id: 'social-events', label: 'Social Events', price: 'Fee' },
  ];

  const levels = [
    { level: 'A1 — True Beginner', name: 'True Beginners', time: 'Saturday 10:00 AM', color: 'bg-emerald-100 text-emerald-700' },
    { level: 'A1–A2 — Elementary', name: 'Elementary', time: 'Saturday 11:00 AM', color: 'bg-green-100 text-green-700' },
    { level: 'A2–B1 — Pre-Intermediate', name: 'Pre-Intermediate', time: 'Saturday 12:30 PM', color: 'bg-sky-100 text-sky-700' },
    { level: 'B1 — Intermediate', name: 'Intermediate', time: 'Sunday 10:00 AM', color: 'bg-blue-100 text-blue-700' },
    { level: 'B2 — Upper Intermediate', name: 'Upper Intermediate', time: 'Sunday 11:00 AM', color: 'bg-amber-100 text-amber-700' },
    { level: 'C1 — Advanced & Business', name: 'Advanced and Business', time: 'Sunday 12:30 PM', color: 'bg-purple-100 text-purple-700' },
  ];

  return (
    <div className="min-h-screen bg-[#faf6f3] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-white rounded-full px-4 py-2 text-sm text-[#d4867a] mb-4 border border-[#d4867a]/20">
            CLASSES AND PRICING
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif text-[#5a3d2a] mb-4">Find your class</h1>
          <p className="text-[#8b6b5c] max-w-2xl mx-auto">
            Select a class type to see details and pricing. 
            New students get <span className="text-[#d4867a] font-medium">50% off</span> their first group session with code <span className="text-[#d4867a] font-medium">ROAM50</span>.
          </p>
        </div>

        {/* Click Banner */}
        <div className="bg-[#d4867a] text-white rounded-2xl p-4 mb-6 text-center">
          <p className="font-medium">👆 Click a class type below to learn more!</p>
        </div>

        {/* Class Type Selector with Prices */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {classTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedClassType(selectedClassType === type.id ? null : type.id)}
              className={`p-4 rounded-2xl text-left transition-all ${
                selectedClassType === type.id 
                  ? 'bg-[#d4867a] text-white' 
                  : 'bg-white text-[#5a3d2a] hover:bg-[#f5ebe5]'
              }`}
            >
              <div className="mb-2">
                <ClassTypeIcon type={type.id} />
              </div>
              <span className="text-sm font-medium block">{type.label}</span>
              <span className={`text-lg font-bold ${selectedClassType === type.id ? 'text-white' : 'text-[#d4867a]'}`}>
                {type.price}
              </span>
            </button>
          ))}
        </div>

        {/* Selected Class Type Details */}
        {selectedClassType && (
          <div className="bg-white rounded-3xl p-8 mb-12">
            {(() => {
              const data = classTypeData[selectedClassType];
              return (
                <>
                  <h2 className="text-2xl font-serif text-[#5a3d2a] mb-2">{data.title}</h2>
                  <p className="text-[#8b6b5c] mb-6">{data.description}</p>
                  
                  {/* Pricing */}
                  <div className="bg-[#f5ebe5] rounded-2xl p-6 mb-6">
                    {data.singlePrice > 0 ? (
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        <div>
                          <span className="text-4xl font-serif text-[#d4867a]">${data.singlePrice}</span>
                          <span className="text-[#8b6b5c] ml-2">per session</span>
                        </div>
                        {data.bundlePrice !== data.singlePrice && (
                          <div className="flex items-center gap-3">
                            <span className="text-[#8b6b5c]">or</span>
                            <div className="bg-white rounded-xl px-4 py-2">
                              <span className="text-2xl font-medium text-[#d4867a]">${data.bundlePrice}</span>
                              <span className="text-[#8b6b5c] text-sm ml-1">when you book {data.bundleSize}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <p className="text-[#5a3d2a] font-medium">Small participation fee applies. See details below.</p>
                    )}
                  </div>

                  {/* Details Grid */}
                  <div className="grid sm:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-[#d4867a]" />
                      <span className="text-[#5a3d2a]">{data.duration}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-[#d4867a]" />
                      <span className="text-[#5a3d2a]">{data.location}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users className="h-5 w-5 text-[#d4867a]" />
                      <span className="text-[#5a3d2a]">Up to {data.maxStudents} {data.maxStudents === 1 ? 'student' : 'students'}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-[#d4867a]" />
                      <span className="text-[#5a3d2a]">{data.schedule}</span>
                    </div>
                  </div>

                  {/* What's Included */}
                  <h3 className="text-sm text-[#8b6b5c] uppercase tracking-wide mb-4">What's Included</h3>
                  <ul className="space-y-2 mb-6">
                    {data.details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-3 text-[#5a3d2a]">
                        <Check className="h-5 w-5 text-[#d4867a] mt-0.5 flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>

                  <Button className="bg-[#d4867a] hover:bg-[#c2756a] text-white rounded-full w-full sm:w-auto">
                    Book This Class →
                  </Button>
                </>
              );
            })()}
          </div>
        )}

        {/* Level Selection - Only show for group/individual classes */}
        {(!selectedClassType || 
          ['inperson-group', 'virtual-group', 'inperson-individual', 'virtual-individual'].includes(selectedClassType)) && (
          <div className="mb-8">
            <p className="text-[#8b6b5c] mb-6">Select your level to see exactly what is covered in your class, then book your spot below.</p>
            
            <Accordion type="single" collapsible className="space-y-3">
              {levels.map((item, index) => {
                const curriculum = levelCurriculum[item.level];
                return (
                  <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-2xl border-none overflow-hidden">
                    <AccordionTrigger className="px-6 py-4 hover:no-underline">
                      <div className="flex items-center gap-4 w-full">
                        <span className={`px-4 py-2 rounded-full text-sm font-medium ${item.color}`}>
                          {item.level}
                        </span>
                        <span className="text-[#5a3d2a] font-medium flex-1 text-left">{item.name}</span>
                        <span className="text-[#8b6b5c] text-sm">{item.time}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6">
                      <div className="pt-4 border-t border-gray-100">
                        <h4 className="text-sm text-[#8b6b5c] uppercase tracking-wide mb-4">Grammar Focus</h4>
                        <ul className="space-y-2 mb-6">
                          {curriculum.grammar.map((grammar, i) => (
                            <li key={i} className="flex items-center gap-2 text-[#5a3d2a]">
                              <Check className="h-4 w-4 text-[#d4867a]" /> {grammar}
                            </li>
                          ))}
                        </ul>
                        
                        <h4 className="text-sm text-[#8b6b5c] uppercase tracking-wide mb-4">Vocabulary Themes</h4>
                        <ul className="space-y-2 mb-6">
                          {curriculum.vocabulary.map((vocab, i) => (
                            <li key={i} className="flex items-center gap-2 text-[#5a3d2a]">
                              <Check className="h-4 w-4 text-[#d4867a]" /> {vocab}
                            </li>
                          ))}
                        </ul>

                        <h4 className="text-sm text-[#8b6b5c] uppercase tracking-wide mb-4">By the End You Will</h4>
                        <ul className="space-y-2 mb-6">
                          {curriculum.outcomes.map((outcome, i) => (
                            <li key={i} className="flex items-center gap-2 text-[#5a3d2a]">
                              <Check className="h-4 w-4 text-[#d4867a]" /> {outcome}
                            </li>
                          ))}
                        </ul>

                        <h4 className="text-sm text-[#8b6b5c] uppercase tracking-wide mb-4">Culture and Real-World</h4>
                        <ul className="space-y-2 mb-6">
                          {curriculum.culture.map((culture, i) => (
                            <li key={i} className="flex items-center gap-2 text-[#5a3d2a]">
                              <Check className="h-4 w-4 text-[#d4867a]" /> {culture}
                            </li>
                          ))}
                        </ul>

                        <Button className="bg-[#d4867a] hover:bg-[#c2756a] text-white rounded-full w-full sm:w-auto">
                          Book this class →
                        </Button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
        )}

        {/* Promo Banner */}
        <div className="bg-[#f5ebe5] rounded-2xl p-6 flex items-center gap-4 mb-8">
          <Sparkles className="h-6 w-6 text-[#d4867a]" />
          <p className="text-[#5a3d2a]">
            First group session 50% off. Use code <span className="text-[#d4867a] font-medium">ROAM50</span> at checkout.
          </p>
        </div>

        {/* Payment Info */}
        <div className="bg-white rounded-2xl p-6 flex items-start gap-4">
          <Lock className="h-6 w-6 text-[#d4867a] mt-1" />
          <div>
            <p className="text-[#5a3d2a] font-medium">Secure payment via Stripe.</p>
            <p className="text-[#8b6b5c] text-sm">
              All major credit and debit cards accepted. After payment you will receive a confirmation email with next steps. 
              To book a bundle or if you have questions before paying, use the <a href="#" className="text-[#d4867a] underline">inquiry form →</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// How It Works Page with Added Content
function HowItWorksPage() {
  const features = [
    {
      icon: <MessageCircle className="h-8 w-8" />,
      title: 'Student talk time comes first',
      description: 'Most language classes have the teacher talking for 60% of the lesson. At Roam it is the opposite. You speak, we build on it, you speak again. Every session is designed so you leave having used more English than you walked in with.',
    },
    {
      icon: <Headphones className="h-8 w-8" />,
      title: 'Listening is built in',
      description: 'Real English is fast and full of contractions. We use audio clips, current podcasts, news moments, and read-aloud exercises so your ear adjusts to natural English speed and rhythm — not just the slow, simplified classroom version.',
    },
    {
      icon: <PenTool className="h-8 w-8" />,
      title: 'Writing that is relevant to you',
      description: 'Writing tasks are tied to your real life — a quick text, a professional email, a caption, a journal entry. When we do use structured materials, they are chosen because they are relevant to you, not just to fill time.',
    },
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: 'Reading with purpose',
      description: 'We read real materials — menus, signs, news articles, short stories — and discuss them together. You learn vocabulary in context, not from flashcards.',
    },
    {
      icon: <UsersRound className="h-8 w-8" />,
      title: 'A community of learners',
      description: 'Learning English is hard, but you don\'t have to do it alone. At Roam, you join a supportive community of people who understand the struggle. We learn together, laugh at our mistakes together, and celebrate each other\'s progress. It\'s a social support system — a place where you can bring real issues you\'ve faced throughout the week and work through them with people who get it.',
    },
    {
      icon: <PartyPopper className="h-8 w-8" />,
      title: 'Finding humor in the journey',
      description: 'Mistakes are not failures — they\'re stepping stones. We create a safe space where you can try, mess up, and try again without judgment. Some of the best learning happens when we find the humor in our mistakes and grow from them together. Every "oops" moment is an opportunity to learn something you\'ll never forget.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#faf6f3] py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block bg-white rounded-full px-4 py-2 text-sm text-[#d4867a] mb-4 border border-[#d4867a]/20">
            HOW IT WORKS
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif text-[#5a3d2a] mb-4">What to expect in a Roam class</h1>
          <p className="text-[#8b6b5c] text-lg">
            Every class has the same philosophy: you do most of the talking, and the language comes from the world you actually live in.
          </p>
        </div>

        <div className="space-y-6">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-3xl p-8">
              <div className="text-[#d4867a] mb-4">{feature.icon}</div>
              <h3 className="text-xl font-medium text-[#5a3d2a] mb-3">{feature.title}</h3>
              <p className="text-[#8b6b5c] leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// New Placement Test - Multiple Choice Format
const placementTestSets = [
  {
    id: 1,
    instruction: "Select ALL sentences that are grammatically CORRECT:",
    sentences: [
      { text: "She doesn't like coffee.", correct: true },
      { text: "She don't like coffee.", correct: false },
      { text: "She isn't liking coffee.", correct: false },
      { text: "She hasn't liked coffee.", correct: true },
      { text: "She no likes coffee.", correct: false },
    ],
    explanation: "Use present simple (doesn't like) for preferences, or present perfect (hasn't liked) for experiences. 'Don't' is wrong for third person. 'Is liking' is wrong because 'like' is a state verb."
  },
  {
    id: 2,
    instruction: "Select ALL sentences that are grammatically CORRECT:",
    sentences: [
      { text: "I have lived here since 2020.", correct: true },
      { text: "I am living here since 2020.", correct: false },
      { text: "I live here since 2020.", correct: false },
      { text: "I lived here since 2020.", correct: false },
      { text: "I have been living here since 2020.", correct: true },
    ],
    explanation: "Use present perfect or present perfect continuous with 'since' for actions starting in the past and continuing to now."
  },
  {
    id: 3,
    instruction: "Select ALL sentences that are grammatically CORRECT:",
    sentences: [
      { text: "If I see him, I will tell him.", correct: true },
      { text: "If I will see him, I tell him.", correct: false },
      { text: "If I see him, I tell him.", correct: false },
      { text: "If I saw him, I would tell him.", correct: true },
      { text: "If I had seen him, I would have told him.", correct: true },
    ],
    explanation: "First conditional: If + present, will + verb. Second conditional: If + past, would + verb. Third conditional: If + past perfect, would have + past participle."
  },
  {
    id: 4,
    instruction: "Select ALL sentences that are grammatically CORRECT:",
    sentences: [
      { text: "They went to the park yesterday.", correct: true },
      { text: "They have gone to the park yesterday.", correct: false },
      { text: "They are going to the park yesterday.", correct: false },
      { text: "They did go to the park yesterday.", correct: true },
      { text: "They was going to the park yesterday.", correct: false },
    ],
    explanation: "Use past simple for completed actions at a specific time in the past. 'Did go' is emphatic but correct."
  },
  {
    id: 5,
    instruction: "Select ALL sentences that are grammatically CORRECT:",
    sentences: [
      { text: "The book was written by Shakespeare.", correct: true },
      { text: "The book is written by Shakespeare.", correct: true },
      { text: "The book wrote by Shakespeare.", correct: false },
      { text: "The book has been written by Shakespeare.", correct: true },
      { text: "The book had been written by Shakespeare.", correct: true },
    ],
    explanation: "Passive voice uses 'be' + past participle. Can be used in any tense: was written (past), is written (present), has been written (present perfect), had been written (past perfect)."
  },
  {
    id: 6,
    instruction: "Select ALL sentences that are grammatically CORRECT:",
    sentences: [
      { text: "She can speak three languages.", correct: true },
      { text: "She can speaks three languages.", correct: false },
      { text: "She could speak three languages when she was young.", correct: true },
      { text: "She can speaking three languages.", correct: false },
      { text: "She can to speak three languages.", correct: false },
    ],
    explanation: "After modal verbs (can, could, should, would, etc.), always use the base form of the verb without 'to'."
  },
];

// Level Guide Page with Lesson Plans
function LevelGuidePage() {
  const [selectedLevel, setSelectedLevel] = useState('A1');
  const [testStarted, setTestStarted] = useState(false);
  const [currentSet, setCurrentSet] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number[]>>({});
  const [showResults, setShowResults] = useState(false);

  const levels = ['A1', 'A2', 'B1', 'B2', 'C1'];
  
  const levelData: Record<string, { title: string; description: string; grammar: string[] }> = {
    A1: {
      title: 'A1 — True Beginner',
      description: 'Starting from scratch. We build confidence first.',
      grammar: [
        'Subject pronouns (I, you, he, she)',
        'To be — am, is, are',
        'Simple yes/no questions',
        'Articles — a, an, the',
        'Have / has',
        'Simple present tense',
      ],
    },
    A2: {
      title: 'A2 — Elementary',
      description: 'Building basic communication skills for everyday situations.',
      grammar: [
        'Past simple tense',
        'Future with going to',
        'Comparatives and superlatives',
        'Countable and uncountable nouns',
        'Modal verbs: can, could',
        'Present continuous',
      ],
    },
    B1: {
      title: 'B1 — Intermediate',
      description: 'Expressing opinions and handling most travel situations.',
      grammar: [
        'Present perfect',
        'Past continuous',
        'Modal verbs: should, must, might',
        'First conditional',
        'Passive voice (basic)',
        'Reported speech (basic)',
      ],
    },
    B2: {
      title: 'B2 — Upper Intermediate',
      description: 'Complex discussions and professional communication.',
      grammar: [
        'All conditionals',
        'Modal verbs of deduction',
        'Passive voice (advanced)',
        'Reported speech',
        'Phrasal verbs',
        'Relative clauses',
      ],
    },
    C1: {
      title: 'C1 — Advanced',
      description: 'Fluent expression and nuanced communication.',
      grammar: [
        'Advanced conditionals',
        'Inversion',
        'Ellipsis and substitution',
        'Complex noun phrases',
        'Cleft sentences',
        'Discourse markers',
      ],
    },
  };

  const handleAnswerSelect = (sentenceIndex: number) => {
    const currentSelections = selectedAnswers[currentSet] || [];
    const newSelections = currentSelections.includes(sentenceIndex)
      ? currentSelections.filter(i => i !== sentenceIndex)
      : [...currentSelections, sentenceIndex];
    
    setSelectedAnswers({ ...selectedAnswers, [currentSet]: newSelections });
  };

  const handleNext = () => {
    if (currentSet < placementTestSets.length - 1) {
      setCurrentSet(currentSet + 1);
    } else {
      setShowResults(true);
    }
  };

  const resetTest = () => {
    setTestStarted(false);
    setCurrentSet(0);
    setSelectedAnswers({});
    setShowResults(false);
  };

  const calculateScore = () => {
    let correct = 0;
    placementTestSets.forEach((set, setIndex) => {
      const selected = selectedAnswers[setIndex] || [];
      const correctIndices = set.sentences.map((s, i) => s.correct ? i : -1).filter(i => i !== -1);
      const isCorrect = selected.length === correctIndices.length && 
        selected.every(i => correctIndices.includes(i));
      if (isCorrect) correct++;
    });
    return correct;
  };

  const getRecommendedLevel = () => {
    const score = calculateScore();
    if (score <= 1) return 'A1';
    if (score <= 2) return 'A2';
    if (score <= 3) return 'B1';
    if (score <= 4) return 'B2';
    return 'C1';
  };

  return (
    <div className="min-h-screen bg-[#faf6f3] py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block bg-white rounded-full px-4 py-2 text-sm text-[#d4867a] mb-4 border border-[#d4867a]/20">
            LEVEL GUIDE AND PLACEMENT
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif text-[#5a3d2a] mb-4">Find your level, know your path</h1>
          <p className="text-[#8b6b5c]">
            Take the placement test below or browse the curriculum by level.
          </p>
        </div>

        {/* Quick Placement Test */}
        <div className="bg-white rounded-3xl p-8 mb-8">
          {!testStarted && !showResults && (
            <>
              <h2 className="text-2xl font-serif text-[#5a3d2a] mb-2">Quick placement test</h2>
              <p className="text-[#8b6b5c] mb-4">
                For each question, select ALL sentences that are grammatically correct. Some questions have multiple correct answers!
              </p>
              <div className="bg-[#f5ebe5] rounded-2xl p-4 mb-6">
                <p className="text-sm text-[#5a3d2a]">
                  <strong>Tip:</strong> This test provides a general guideline. We recommend reviewing the <Link to="/classes" className="text-[#d4867a] underline">lesson plans for each level</Link> to choose the best placement. We'll work together throughout the process to adjust your level as needed. Note that adjusting your level may change your class time for group sessions.
                </p>
              </div>
              <Button 
                onClick={() => setTestStarted(true)}
                className="bg-[#d4867a] hover:bg-[#c2756a] text-white rounded-full w-full"
              >
                Start Placement Test
              </Button>
            </>
          )}

          {testStarted && !showResults && (
            <>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-serif text-[#5a3d2a]">Question {currentSet + 1} of {placementTestSets.length}</h2>
                <button 
                  onClick={resetTest}
                  className="text-[#8b6b5c] hover:text-[#d4867a] flex items-center gap-1 text-sm"
                >
                  <RotateCcw className="h-4 w-4" /> Restart
                </button>
              </div>
              
              <div className="bg-[#f5ebe5] rounded-2xl p-4 mb-6">
                <div className="h-2 bg-white rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#d4867a] rounded-full transition-all duration-300"
                    style={{ width: `${((currentSet + 1) / placementTestSets.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="mb-8">
                <p className="text-lg text-[#5a3d2a] mb-4 font-medium">
                  {placementTestSets[currentSet].instruction}
                </p>
                
                <div className="space-y-3">
                  {placementTestSets[currentSet].sentences.map((sentence, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswerSelect(idx)}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                        (selectedAnswers[currentSet] || []).includes(idx)
                          ? 'border-[#d4867a] bg-[#d4867a]/10'
                          : 'border-gray-200 hover:border-[#d4867a]/50'
                      }`}
                    >
                      <span className="text-[#5a3d2a]">"{sentence.text}"</span>
                      {(selectedAnswers[currentSet] || []).includes(idx) && (
                        <Check className="h-5 w-5 text-[#d4867a] inline ml-2" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <Button 
                onClick={handleNext}
                className="bg-[#d4867a] hover:bg-[#c2756a] text-white rounded-full w-full"
              >
                {currentSet < placementTestSets.length - 1 ? 'Next Question' : 'See Results'} →
              </Button>
            </>
          )}

          {showResults && (
            <>
              <h2 className="text-2xl font-serif text-[#5a3d2a] mb-4 text-center">Your Results</h2>
              
              <div className="text-center mb-6">
                <p className="text-5xl font-serif text-[#d4867a] mb-2">
                  {calculateScore()}/{placementTestSets.length}
                </p>
                <p className="text-[#8b6b5c]">correct</p>
              </div>

              <div className="bg-[#f5ebe5] rounded-2xl p-6 mb-6 text-center">
                <p className="text-sm text-[#8b6b5c] mb-2">Recommended Level</p>
                <p className="text-3xl font-serif text-[#5a3d2a]">{getRecommendedLevel()}</p>
              </div>

              <div className="bg-[#faf6f3] rounded-2xl p-4 mb-6">
                <p className="text-sm text-[#5a3d2a]">
                  <strong>Remember:</strong> This is a general guideline. Please review the <Link to="/classes" className="text-[#d4867a] underline">lesson plans for each level</Link> to choose your best placement. We'll work together to adjust your level as needed throughout your learning journey. Note that changing levels may affect your class time for group sessions.
                </p>
              </div>

              <div className="flex gap-4">
                <Button 
                  onClick={resetTest}
                  variant="outline"
                  className="flex-1 border-[#d4867a] text-[#d4867a] hover:bg-[#d4867a] hover:text-white rounded-full"
                >
                  <RotateCcw className="h-4 w-4 mr-2" /> Retake Test
                </Button>
                <Link to="/classes" className="flex-1">
                  <Button className="w-full bg-[#d4867a] hover:bg-[#c2756a] text-white rounded-full">
                    Book Your Class <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>

        {/* Full Lesson Plans Section */}
        <h2 className="text-2xl font-serif text-[#5a3d2a] mb-6">Lesson Plans by Level</h2>
        <p className="text-[#8b6b5c] mb-6">Select a level to see the complete curriculum.</p>

        {/* Level Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {levels.map((level) => (
            <button
              key={level}
              onClick={() => setSelectedLevel(level)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedLevel === level
                  ? 'bg-[#d4867a] text-white'
                  : 'bg-white text-[#5a3d2a] hover:bg-[#f5ebe5]'
              }`}
            >
              {level} — {level === 'A1' ? 'Beginner' : level === 'A2' ? 'Elementary' : level === 'B1' ? 'Intermediate' : level === 'B2' ? 'Upper Int.' : 'Advanced'}
            </button>
          ))}
        </div>

        {/* Full Level Content */}
        {(() => {
          const fullLevelKey = selectedLevel === 'A1' ? 'A1 — True Beginner' :
            selectedLevel === 'A2' ? 'A1–A2 — Elementary' :
            selectedLevel === 'B1' ? 'A2–B1 — Pre-Intermediate' :
            selectedLevel === 'B2' ? 'B1 — Intermediate' :
            selectedLevel === 'C1' ? 'C1 — Advanced & Business' : 'A1 — True Beginner';
          const curriculum = levelCurriculum[fullLevelKey];
          
          return (
            <div className="space-y-6">
              {/* Level Header */}
              <div className="bg-[#f5ebe5] rounded-3xl p-8">
                <h3 className="text-2xl font-serif text-[#5a3d2a] mb-2">{levelData[selectedLevel].title}</h3>
                <p className="text-[#8b6b5c]">{levelData[selectedLevel].description}</p>
              </div>

              {/* Grammar */}
              <div className="bg-white rounded-3xl p-8">
                <h4 className="text-sm text-[#8b6b5c] uppercase tracking-wide mb-4">Grammar Focus</h4>
                <ul className="space-y-2">
                  {curriculum.grammar.map((grammar, i) => (
                    <li key={i} className="flex items-center gap-2 text-[#5a3d2a]">
                      <Check className="h-4 w-4 text-[#d4867a]" /> {grammar}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Vocabulary */}
              <div className="bg-white rounded-3xl p-8">
                <h4 className="text-sm text-[#8b6b5c] uppercase tracking-wide mb-4">Vocabulary Themes</h4>
                <ul className="space-y-2">
                  {curriculum.vocabulary.map((vocab, i) => (
                    <li key={i} className="flex items-center gap-2 text-[#5a3d2a]">
                      <Check className="h-4 w-4 text-[#d4867a]" /> {vocab}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Outcomes */}
              <div className="bg-white rounded-3xl p-8">
                <h4 className="text-sm text-[#8b6b5c] uppercase tracking-wide mb-4">By the End You Will</h4>
                <ul className="space-y-2">
                  {curriculum.outcomes.map((outcome, i) => (
                    <li key={i} className="flex items-center gap-2 text-[#5a3d2a]">
                      <Check className="h-4 w-4 text-[#d4867a]" /> {outcome}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Culture */}
              <div className="bg-white rounded-3xl p-8">
                <h4 className="text-sm text-[#8b6b5c] uppercase tracking-wide mb-4">Culture and Real-World</h4>
                <ul className="space-y-2">
                  {curriculum.culture.map((culture, i) => (
                    <li key={i} className="flex items-center gap-2 text-[#5a3d2a]">
                      <Check className="h-4 w-4 text-[#d4867a]" /> {culture}
                    </li>
                  ))}
                </ul>
              </div>

              <Link to="/classes">
                <Button className="bg-[#d4867a] hover:bg-[#c2756a] text-white rounded-full w-full">
                  Book This Level →
                </Button>
              </Link>
            </div>
          );
        })()}
      </div>
    </div>
  );
}

// About Page - Removed Personal Info
function AboutPage() {
  return (
    <div className="min-h-screen bg-[#faf6f3] py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block bg-white rounded-full px-4 py-2 text-sm text-[#d4867a] mb-4 border border-[#d4867a]/20">
            THE PHILOSOPHY
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif text-[#5a3d2a]">
            Why does English happen outside?
          </h1>
        </div>

        <div className="prose prose-lg max-w-none">
          <p className="text-[#5a3d2a] text-lg leading-relaxed mb-6">
            Most people spend years in a classroom learning English. They can conjugate verbs, 
            pass tests, and explain grammar rules — but the moment a native speaker talks at 
            natural speed, or they have to order food, navigate a conversation, or respond 
            without thinking, everything falls apart.
          </p>

          <p className="text-[#5a3d2a] text-lg leading-relaxed mb-6">
            That gap between classroom English and real English is not a failure of effort. 
            It is a failure of environment. The classroom teaches you <em>about</em> the language. 
            Immersion is what makes the language <em>yours</em>.
          </p>

          <p className="text-[#5a3d2a] text-lg leading-relaxed mb-6">
            At Roam Learning, we take English out of the classroom and into the real world. 
            Our classes happen at Edgewater Park, on field trips around Cleveland, and in 
            one-on-one sessions tailored to your life. You learn by doing — ordering coffee, 
            asking for directions, making small talk with strangers.
          </p>

          <p className="text-[#5a3d2a] text-lg leading-relaxed">
            Because the best way to learn a language is to live it.
          </p>
        </div>

        <div className="mt-12 bg-white rounded-3xl p-8 text-center">
          <h2 className="text-2xl font-serif text-[#5a3d2a] mb-4">About Roam Learning</h2>
          <p className="text-[#8b6b5c] mb-6">
            Roam Learning is built on the belief that language learning should be immersive, 
            practical, and connected to real life. We combine proven teaching methods with 
            real-world experiences to help you gain confidence and fluency in English.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <span className="bg-[#f5ebe5] text-[#5a3d2a] px-3 py-1 rounded-full text-sm">TEFL Certified Instruction</span>
            <span className="bg-[#f5ebe5] text-[#5a3d2a] px-3 py-1 rounded-full text-sm">Outdoor Learning</span>
            <span className="bg-[#f5ebe5] text-[#5a3d2a] px-3 py-1 rounded-full text-sm">Business English Specialist</span>
            <span className="bg-[#f5ebe5] text-[#5a3d2a] px-3 py-1 rounded-full text-sm">Customized Curriculum</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Events Data
const eventsData = [
  {
    id: 1,
    date: 'MON MAY 5',
    time: '10:00 AM',
    category: 'FREE VENUE',
    level: 'A1–A2',
    levelLabel: 'Beginners',
    title: 'Edgewater Park Walk',
    venue: 'Edgewater Park Lakefront',
    address: '6500 Memorial Shoreway, Cleveland',
    venueUrl: 'https://www.clevelandmetroparks.com/parks/visit/parks/edgewater-park',
    grammarFocus: {
      A1: 'I see, I hear, It is',
      A2: 'There is / there are, It looks like...'
    },
    vocabulary: 'Nature, weather, colors, directions, I can see / hear',
    duration: 1.5,
    roamFee: 15,
    entryFeeOhio: 0,
    entryFeeNonOhio: 0,
    additionalCosts: 'None',
    menuUrl: null,
    color: 'bg-emerald-700',
    tags: ['Free', 'A1–A2'],
    costDisplay: '$15',
    costBreakdown: '($15 Roam fee + $0 venue fee)'
  },
  {
    id: 2,
    date: 'TUE MAY 6',
    time: '10:30 AM',
    category: 'FREE ENTRY',
    level: 'B1–B2',
    levelLabel: 'Intermediate',
    title: 'Cleveland Museum of Art',
    venue: 'Cleveland Museum of Art',
    address: '11150 East Blvd, University Circle',
    venueUrl: 'https://www.clevelandart.org/',
    grammarFocus: {
      B1: 'Present perfect — This has been here since...',
      B2: 'Passive voice — It is believed that...'
    },
    vocabulary: 'Art vocabulary, opinions, describing what you see',
    duration: 2,
    roamFee: 19,
    entryFeeOhio: 0,
    entryFeeNonOhio: 0,
    additionalCosts: 'Optional cafe: $5–$12',
    menuUrl: 'https://www.clevelandart.org/visit/dining',
    color: 'bg-blue-700',
    tags: ['Free', 'B1–B2'],
    costDisplay: '$19 + optional café and gift shop',
    costBreakdown: '($19 Roam fee + $0 venue fee + optional purchases)'
  },
  {
    id: 3,
    date: 'WED MAY 7',
    time: '11:00 AM',
    category: '$6 WITH OHIO ID',
    level: 'C1',
    levelLabel: 'Advanced & Business',
    title: 'Rock & Roll Hall of Fame',
    venue: 'Rock & Roll Hall of Fame',
    address: '1100 Rock and Roll Blvd, Downtown',
    venueUrl: 'https://www.rockhall.com/',
    grammarFocus: {
      C1: 'Hedging — It could be argued that..., This tends to reflect...'
    },
    vocabulary: 'Music and culture, persuasive language, nuanced opinions',
    duration: 2.5,
    roamFee: 24,
    entryFeeOhio: 6,
    entryFeeNonOhio: 39.50,
    additionalCosts: 'Gift shop, cafe available',
    menuUrl: null,
    color: 'bg-indigo-700',
    tags: ['$6 Ohio ID', 'C1'],
    costDisplay: '$30 with Ohio ID / $63 without Ohio ID',
    costBreakdown: '($24 Roam fee + $6 entry with OH ID / $39.50 without OH ID)'
  },
  {
    id: 4,
    date: 'MON MAY 12',
    time: '10:00 AM',
    category: 'DINING',
    level: 'A1–A2',
    levelLabel: 'Beginners',
    title: 'Coffee Shop',
    venue: 'Rising Star Coffee Roasters',
    address: '1455 W 29th St, Ohio City',
    venueUrl: 'https://risingstarcoffee.com/',
    grammarFocus: {
      A1: 'I want, I have, I like — ordering with help',
      A2: 'Can I have...? How much is...?'
    },
    vocabulary: 'Coffee drinks, sizes, hot/cold, prices, please/thank you',
    duration: 1.5,
    roamFee: 15,
    entryFeeOhio: 0,
    entryFeeNonOhio: 0,
    additionalCosts: 'Coffee/snack: $5–$12',
    menuUrl: 'https://risingstarcoffee.com/',
    color: 'bg-rose-400',
    tags: ['Cafe', 'A1–A2'],
    costDisplay: '$15 + coffee/snack purchase',
    costBreakdown: '($15 Roam fee + $0 venue fee + $5–$12 purchase)'
  },
  {
    id: 5,
    date: 'TUE MAY 13',
    time: '10:00 AM',
    category: 'FREE ENTRY',
    level: 'B1–B2',
    levelLabel: 'Intermediate',
    title: 'West Side Market',
    venue: 'West Side Market',
    address: '1979 W 25th St, Ohio City',
    venueUrl: 'https://westsidemarket.org/',
    grammarFocus: {
      B1: 'Going to / will for plans',
      B2: 'Conditionals — If I had known about this place...'
    },
    vocabulary: 'Produce, quantities, vendor interactions, comparing items',
    duration: 1.5,
    roamFee: 15,
    entryFeeOhio: 0,
    entryFeeNonOhio: 0,
    additionalCosts: 'Market purchases: your choice',
    menuUrl: null,
    color: 'bg-teal-600',
    tags: ['Free entry', 'B1–B2'],
    costDisplay: '$15 + optional market purchases',
    costBreakdown: '($15 Roam fee + $0 venue fee + optional purchases)'
  },
  {
    id: 6,
    date: 'WED MAY 14',
    time: '12:00 PM',
    category: 'DINING',
    level: 'B1–B2',
    levelLabel: 'Intermediate',
    title: 'The Stoplight Game',
    venue: 'Bar Cento',
    address: '1948 W 25th St, Ohio City',
    venueUrl: 'https://www.biermarkt.com/bar-cento/',
    grammarFocus: {
      B1: 'Past continuous + interruption: I was talking when...',
      B2: 'Stoplight Game practice'
    },
    vocabulary: 'Italian cuisine, polished ordering, expressions for interruption',
    duration: 2,
    roamFee: 19,
    entryFeeOhio: 0,
    entryFeeNonOhio: 0,
    additionalCosts: 'Lunch: $18–$30',
    menuUrl: 'https://www.yelp.com/menu/bar-cento-cleveland',
    color: 'bg-amber-600',
    tags: ['Dining', 'B1–B2'],
    costDisplay: '$19 + lunch purchase',
    costBreakdown: '($19 Roam fee + $0 venue fee + $18–$30 lunch)'
  },
  {
    id: 7,
    date: 'WED MAY 21',
    time: '12:30 PM',
    category: 'DINING',
    level: 'C1',
    levelLabel: 'Advanced & Business',
    title: 'Professional Lunch',
    venue: 'Greenhouse Tavern',
    address: '2038 E 4th St, Downtown Cleveland',
    venueUrl: 'http://www.greenhousetaverns.com/',
    grammarFocus: {
      C1: 'Hedging and professional register, Networking simulation: introductions and small talk'
    },
    vocabulary: 'Professional small talk, networking, upscale menu vocabulary',
    duration: 2,
    roamFee: 19,
    entryFeeOhio: 0,
    entryFeeNonOhio: 0,
    additionalCosts: 'Lunch: $20–$40',
    menuUrl: 'http://places.singleplatform.com/the-greenhouse-tavern/menu',
    color: 'bg-violet-700',
    tags: ['Dining', 'C1'],
    costDisplay: '$19 + lunch purchase',
    costBreakdown: '($19 Roam fee + $0 venue fee + $20–$40 lunch)'
  }
];

// Events Page
function EventsPage() {
  const [filter, setFilter] = useState<string>('all');

  const filters = [
    { id: 'all', label: 'All events' },
    { id: 'free', label: '💚 Under $20' },
    { id: 'dining', label: '🍴 Dining' },
    { id: 'A1-A2', label: 'Beginner (A1–A2)' },
    { id: 'B1-B2', label: 'Intermediate (B1–B2)' },
    { id: 'C1', label: 'Advanced / Business' },
  ];

  const filteredEvents = eventsData.filter(event => {
    if (filter === 'all') return true;
    if (filter === 'free') return event.entryFeeOhio === 0 && event.entryFeeNonOhio === 0;
    if (filter === 'dining') return event.category === 'DINING';
    if (filter === 'A1-A2') return event.level === 'A1–A2';
    if (filter === 'B1-B2') return event.level === 'B1–B2';
    if (filter === 'C1') return event.level === 'C1';
    return true;
  });

  return (
    <div className="min-h-screen bg-[#faf6f3] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-white rounded-full px-4 py-2 text-sm text-[#d4867a] mb-4 border border-[#d4867a]/20">
            UPCOMING EVENTS
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif text-[#5a3d2a] mb-4">Field trips and events</h1>
          <p className="text-[#8b6b5c] max-w-2xl mx-auto">
            One optional outing per group per month, Monday through Wednesday. 
            First 10 minutes: grammar review. The rest: real English in the real world.
          </p>
        </div>

        {/* How it works & Pricing info cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white rounded-3xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">📋</span>
              <h3 className="text-lg font-medium text-[#5a3d2a]">How it works</h3>
            </div>
            <p className="text-[#8b6b5c]">
              10 minutes of grammar review relevant to the setting, then relaxed conversation, 
              vocabulary building, and real-world practice.
            </p>
          </div>
          <div className="bg-white rounded-3xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">💰</span>
              <h3 className="text-lg font-medium text-[#5a3d2a]">Pricing</h3>
            </div>
            <p className="text-[#8b6b5c]">
              Each outing has a session fee paid to Roam Learning plus whatever you choose to 
              spend at the venue. See individual events for estimated total costs.
            </p>
          </div>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap gap-3 mb-8">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === f.id
                  ? 'bg-[#d4867a] text-white'
                  : 'bg-white text-[#5a3d2a] hover:bg-[#f5ebe5] border border-gray-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Events list */}
        <div className="space-y-6">
          {filteredEvents.map((event) => (
            <div key={event.id} className="bg-white rounded-3xl overflow-hidden">
              {/* Event header */}
              <div className={`${event.color} text-white p-6 relative`}>
                {/* Price badge in top right */}
                <div className="absolute top-4 right-4 bg-white/90 text-[#5a3d2a] px-3 py-1.5 rounded-full text-sm font-bold">
                  {event.category === 'DINING' ? `$${event.roamFee} + Lunch` : `$${event.roamFee}`}
                </div>
                <div className="text-sm opacity-90 mb-2 pr-16">
                  {event.date} · {event.time} · {event.category}
                </div>
                <h2 className="text-2xl font-bold mb-4">
                  {event.levelLabel} ({event.level}) — {event.title}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {/* Venue entry tag */}
                  {event.entryFeeOhio === 0 && event.entryFeeNonOhio === 0 && (
                    <span className="bg-white/30 px-3 py-1 rounded-full text-sm">
                      {event.category === 'DINING' ? 'Free Entry' : 'Free Venue'}
                    </span>
                  )}
                  {/* Level tag */}
                  <span className="bg-white/30 px-3 py-1 rounded-full text-sm">
                    {event.level}
                  </span>
                </div>
              </div>

              {/* Event details */}
              <div className="p-6 space-y-6">
                {/* Location */}
                <div>
                  <div className="flex items-center gap-2 text-[#d4867a] mb-2">
                    <MapPin className="h-5 w-5" />
                    <span className="text-sm font-medium uppercase tracking-wide">Location</span>
                  </div>
                  <a 
                    href={event.venueUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#5a3d2a] font-medium hover:text-[#d4867a] transition-colors"
                  >
                    {event.venue}
                  </a>
                  <p className="text-[#8b6b5c]">{event.address}</p>
                </div>

                {/* Grammar Focus */}
                <div>
                  <div className="flex items-center gap-2 text-[#d4867a] mb-2">
                    <span className="text-xl">🔤</span>
                    <span className="text-sm font-medium uppercase tracking-wide">Grammar Focus</span>
                  </div>
                  <div className="space-y-1">
                    {Object.entries(event.grammarFocus).map(([level, grammar]) => (
                      <p key={level} className="text-[#5a3d2a]">
                        <span className="font-bold">{level}:</span> {grammar}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Vocabulary */}
                <div>
                  <div className="flex items-center gap-2 text-[#d4867a] mb-2">
                    <span className="text-xl">📚</span>
                    <span className="text-sm font-medium uppercase tracking-wide">Vocabulary</span>
                  </div>
                  <p className="text-[#5a3d2a]">{event.vocabulary}</p>
                </div>

                {/* Costs */}
                <div>
                  <div className="flex items-center gap-2 text-[#d4867a] mb-2">
                    <span className="text-xl">💰</span>
                    <span className="text-sm font-medium uppercase tracking-wide">Costs</span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[#5a3d2a] font-medium">
                      {event.title} — {event.duration} hours — {event.costDisplay}
                    </p>
                    <p className="text-[#8b6b5c] text-sm">
                      {event.costBreakdown}
                    </p>
                    {event.menuUrl && (
                      <a 
                        href={event.menuUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#d4867a] underline text-sm inline-block mt-1"
                      >
                        View menu →
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* RSVP CTA */}
        <div className="mt-12 bg-[#f5ebe5] rounded-3xl p-8 text-center">
          <h2 className="text-2xl font-serif text-[#5a3d2a] mb-4">Want to join an event?</h2>
          <p className="text-[#8b6b5c] mb-6">
            RSVP through the booking form. Spots are capped to keep the group small and the conversation natural.
          </p>
          <Link to="/classes">
            <Button className="bg-[#d4867a] hover:bg-[#c2756a] text-white rounded-full px-8 py-6 text-lg">
              RSVP →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

// Under Construction Page Component
function UnderConstructionPage() {
  return (
    <div className="min-h-screen bg-[#faf6f3] py-20 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-white rounded-3xl p-12">
          <div className="text-8xl mb-6">🚧</div>
          <h1 className="text-3xl sm:text-4xl font-serif text-[#5a3d2a] mb-4">
            Uh-Oh! We're still roaming.
          </h1>
          <p className="text-lg text-[#8b6b5c] mb-2">
            This page is under construction.
          </p>
          <p className="text-[#8b6b5c]">
            Please check back soon.
          </p>
          <Link to="/" className="inline-block mt-8">
            <Button className="bg-[#d4867a] hover:bg-[#c2756a] text-white rounded-full px-8 py-4">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

// Main App Component
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#faf6f3]">
        <BookNowBanner />
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/classes" element={<ClassesPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/level-guide" element={<LevelGuidePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/student-login" element={<UnderConstructionPage />} />
            <Route path="/teacher-login" element={<UnderConstructionPage />} />
          </Routes>
        </main>
        <Footer />
        <FloatingTranslateButton />
      </div>
    </Router>
  );
}

export default App;
