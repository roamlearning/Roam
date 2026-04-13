import { useState, useCallback } from 'react';
import { 
  BookOpen, Gamepad2, CheckCircle, Clock, 
  Trophy, Flame, Calendar, Bell,
  ChevronRight, Play, Check,
  ArrowLeft, Volume2,
  User,
  Home, ClipboardList,
  TrendingUp, Target,
  Sparkles, Zap,
  RotateCcw, ChevronLeft, VolumeX
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

// ==================== TEXT-TO-SPEECH HOOK ====================
function useTextToSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const speak = useCallback((text: string) => {
    if (isMuted || !window.speechSynthesis) return;
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    utterance.pitch = 1;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    window.speechSynthesis.speak(utterance);
  }, [isMuted]);

  const stop = useCallback(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => {
      if (!prev) stop();
      return !prev;
    });
  }, [stop]);

  return { speak, stop, isSpeaking, isMuted, toggleMute };
}

// ==================== TYPES ====================
interface StudentAssignment {
  id: string;
  title: string;
  type: 'homework' | 'game' | 'lesson';
  assignedDate: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'graded' | 'late';
  score?: number;
  feedback?: string;
  content?: string;
  teacherName: string;
}

interface GameActivity {
  id: string;
  title: string;
  type: 'flashcards' | 'matching' | 'fill-blank' | 'word-scramble' | 'sentence-builder' | 'quiz-battle';
  topics: string[];
  verbTenses: string[];
  mode: 'synchronous' | 'asynchronous';
  status: 'not-started' | 'in-progress' | 'completed';
  score?: number;
}

interface StudentProgress {
  lessonId: string;
  title: string;
  status: 'not-started' | 'in-progress' | 'completed' | 'mastered';
  score?: number;
  lastAccessed?: string;
}

interface TopicMastery {
  topic: string;
  status: 'not-started' | 'learning' | 'familiar' | 'strong' | 'mastered';
  score: number;
  lessonsCompleted: number;
}

interface TangibleSkill {
  id: string;
  title: string;
  description: string;
  requiredLevel: string;
  requiredTopics: string[];
  unlocked: boolean;
  completed: boolean;
  category: 'daily' | 'social' | 'professional' | 'academic';
}

interface GrowthGoal {
  id: string;
  title: string;
  description: string;
  requiredLevel: string;
  unlocked: boolean;
  selected: boolean;
  category: 'personal' | 'career' | 'social';
}

interface StudentData {
  id: string;
  name: string;
  email: string;
  level: string;
  teacherName: string;
  className: string;
  streakDays: number;
  totalPoints: number;
  attendance: number;
  joinDate: string;
  assignments: StudentAssignment[];
  games: GameActivity[];
  progress: StudentProgress[];
  topicMastery: TopicMastery[];
  tangibleSkills: TangibleSkill[];
  growthGoals: GrowthGoal[];
  achievements: string[];
}

// ==================== MOCK STUDENT DATA ====================
const mockStudentData: StudentData = {
  id: 'S001',
  name: 'Maria Garcia',
  email: 'maria@email.com',
  level: 'A1',
  teacherName: 'Ms. Johnson',
  className: 'Morning A1 Group',
  streakDays: 5,
  totalPoints: 1250,
  attendance: 92,
  joinDate: '2025-01-15',
  assignments: [
    { id: 'A001', title: 'Introduce Yourself - Writing', type: 'homework', assignedDate: '2025-05-08', dueDate: '2025-05-15', status: 'submitted', score: 85, feedback: 'Great work! Try to use more descriptive adjectives.', teacherName: 'Ms. Johnson' },
    { id: 'A002', title: 'Alphabet Flashcards', type: 'game', assignedDate: '2025-05-10', dueDate: '2025-05-17', status: 'pending', teacherName: 'Ms. Johnson' },
    { id: 'A003', title: 'Family Vocabulary Practice', type: 'game', assignedDate: '2025-05-13', dueDate: '2025-05-20', status: 'pending', teacherName: 'Ms. Johnson' },
    { id: 'A004', title: 'Numbers & Counting Worksheet', type: 'homework', assignedDate: '2025-05-14', dueDate: '2025-05-21', status: 'pending', teacherName: 'Ms. Johnson' },
  ],
  games: [
    { id: 'G001', title: 'Alphabet Flashcards', type: 'flashcards', topics: ['Alphabet'], verbTenses: [], mode: 'asynchronous', status: 'not-started' },
    { id: 'G002', title: 'Family Matching Game', type: 'matching', topics: ['Family'], verbTenses: [], mode: 'asynchronous', status: 'not-started' },
    { id: 'G003', title: 'Number Practice', type: 'fill-blank', topics: ['Numbers'], verbTenses: [], mode: 'asynchronous', status: 'not-started' },
    { id: 'G004', title: 'Greetings Quiz Battle', type: 'quiz-battle', topics: ['Greetings'], verbTenses: [], mode: 'synchronous', status: 'not-started' },
  ],
  progress: [
    { lessonId: 'L01', title: 'Introductions & Greetings', status: 'completed', score: 85, lastAccessed: '2025-05-10' },
    { lessonId: 'L02', title: 'The Alphabet', status: 'in-progress', lastAccessed: '2025-05-13' },
    { lessonId: 'L03', title: 'Numbers & Counting', status: 'not-started' },
    { lessonId: 'L04', title: 'Daily Routines', status: 'not-started' },
  ],
  topicMastery: [
    { topic: 'Greetings', status: 'mastered', score: 95, lessonsCompleted: 3 },
    { topic: 'Introductions', status: 'strong', score: 88, lessonsCompleted: 2 },
    { topic: 'Alphabet', status: 'learning', score: 65, lessonsCompleted: 1 },
    { topic: 'Numbers', status: 'familiar', score: 72, lessonsCompleted: 1 },
    { topic: 'Family', status: 'not-started', score: 0, lessonsCompleted: 0 },
    { topic: 'Daily Routines', status: 'not-started', score: 0, lessonsCompleted: 0 },
  ],
  tangibleSkills: [
    { id: 'TS001', title: 'Introduce yourself to someone new', description: 'Say your name, where you are from, and what you do', requiredLevel: 'A1', requiredTopics: ['Greetings', 'Introductions'], unlocked: true, completed: true, category: 'social' },
    { id: 'TS002', title: 'Order food at a restaurant', description: 'Read a menu and order your meal', requiredLevel: 'A1', requiredTopics: ['Food', 'Numbers'], unlocked: true, completed: false, category: 'daily' },
    { id: 'TS003', title: 'Ask for and give directions', description: 'Navigate to a location and help others find their way', requiredLevel: 'A1', requiredTopics: ['Directions', 'Places'], unlocked: false, completed: false, category: 'daily' },
    { id: 'TS004', title: 'Talk about your daily routine', description: 'Describe what you do from morning to evening', requiredLevel: 'A1', requiredTopics: ['Daily Routines', 'Time'], unlocked: false, completed: false, category: 'daily' },
    { id: 'TS005', title: 'Describe your family members', description: 'Talk about who is in your family and their relationships', requiredLevel: 'A1', requiredTopics: ['Family'], unlocked: true, completed: false, category: 'social' },
    { id: 'TS006', title: 'Explain what activities you enjoy', description: 'Share your hobbies and why you like them', requiredLevel: 'A2', requiredTopics: ['Hobbies', 'Likes/Dislikes'], unlocked: false, completed: false, category: 'social' },
    { id: 'TS007', title: 'Discuss future plans', description: 'Talk about what you want to do tomorrow, next week, or next year', requiredLevel: 'A2', requiredTopics: ['Future Tenses', 'Plans'], unlocked: false, completed: false, category: 'professional' },
    { id: 'TS008', title: 'Present data from a graph', description: 'Describe trends and numbers from visual information', requiredLevel: 'B1', requiredTopics: ['Numbers', 'Comparisons'], unlocked: false, completed: false, category: 'professional' },
    { id: 'TS009', title: 'Write a professional email', description: 'Compose formal correspondence for work or school', requiredLevel: 'B1', requiredTopics: ['Writing', 'Formal Language'], unlocked: false, completed: false, category: 'professional' },
    { id: 'TS010', title: 'Participate in a job interview', description: 'Answer questions about your experience and skills', requiredLevel: 'B2', requiredTopics: ['Work', 'Experience', 'Modal Verbs'], unlocked: false, completed: false, category: 'professional' },
  ],
  growthGoals: [
    { id: 'GG001', title: 'Have a 5-minute conversation with a native speaker', description: 'Practice speaking without fear of mistakes', requiredLevel: 'A1', unlocked: true, selected: false, category: 'personal' },
    { id: 'GG002', title: 'Watch an English movie without subtitles', description: 'Understand the main plot and key dialogue', requiredLevel: 'A2', unlocked: true, selected: true, category: 'personal' },
    { id: 'GG003', title: 'Read a short English book', description: 'Finish a book and understand the story', requiredLevel: 'A2', unlocked: false, selected: false, category: 'personal' },
    { id: 'GG004', title: 'Give a presentation in English', description: 'Present a topic to your class or colleagues', requiredLevel: 'B1', unlocked: false, selected: false, category: 'career' },
    { id: 'GG005', title: 'Write a blog post in English', description: 'Share your thoughts on a topic you care about', requiredLevel: 'B1', unlocked: false, selected: false, category: 'personal' },
    { id: 'GG006', title: 'Negotiate a price or deal', description: 'Discuss terms and reach an agreement', requiredLevel: 'B2', unlocked: false, selected: false, category: 'career' },
    { id: 'GG007', title: 'Make friends who only speak English', description: 'Build genuine relationships through language', requiredLevel: 'B1', unlocked: false, selected: false, category: 'social' },
    { id: 'GG008', title: 'Travel to an English-speaking country', description: 'Navigate daily life using only English', requiredLevel: 'B2', unlocked: false, selected: false, category: 'personal' },
  ],
  achievements: ['First Assignment', '5-Day Streak', 'Perfect Score'],
};

// ==================== LOGIN ====================
function StudentLogin({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="min-h-screen bg-[#faf6f3] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-[#d4867a] rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-serif text-[#5a3d2a]">Student Portal</h1>
          <p className="text-[#8b6b5c] mt-1">Welcome back! Continue your learning journey.</p>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); if (email && password) onLogin(); }} className="space-y-4">
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="rounded-xl h-12" />
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="rounded-xl h-12" />
          <Button type="submit" className="w-full bg-[#d4867a] hover:bg-[#c2756a] text-white rounded-full h-12">
            Sign In
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-[#8b6b5c]">Don't have an account?</p>
          <button className="text-[#d4867a] font-medium mt-1">Contact your teacher</button>
        </div>
      </div>
    </div>
  );
}

// ==================== FLASHCARD GAME ====================
function FlashcardGame({ onComplete, reviewMode = false }: { onComplete: (score: number) => void; reviewMode?: boolean }) {
  const [currentCard, setCurrentCard] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const { speak, isSpeaking, isMuted, toggleMute } = useTextToSpeech();

  const cards = [
    { front: 'A', back: '/eɪ/ as in "apple"', example: 'Apple, Ant, Arrow', audioText: 'A. Apple. Ant. Arrow.' },
    { front: 'B', back: '/biː/ as in "ball"', example: 'Ball, Book, Bird', audioText: 'B. Ball. Book. Bird.' },
    { front: 'C', back: '/siː/ as in "cat"', example: 'Cat, Car, Cup', audioText: 'C. Cat. Car. Cup.' },
    { front: 'D', back: '/diː/ as in "dog"', example: 'Dog, Door, Desk', audioText: 'D. Dog. Door. Desk.' },
    { front: 'E', back: '/iː/ as in "egg"', example: 'Egg, Elephant, Eagle', audioText: 'E. Egg. Elephant. Eagle.' },
  ];

  const handleNext = () => {
    if (currentCard < cards.length - 1) {
      setCurrentCard(c => c + 1);
      setFlipped(false);
      setScore(s => s + 20);
    } else {
      setCompleted(true);
      onComplete(score + 20);
    }
  };

  const handlePrevious = () => {
    if (currentCard > 0) {
      setCurrentCard(c => c - 1);
      setFlipped(false);
    }
  };

  const handleListen = (e: React.MouseEvent) => {
    e.stopPropagation();
    const card = cards[currentCard];
    speak(card.audioText);
  };

  if (completed) {
    return (
      <div className="text-center py-8">
        <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-[#5a3d2a] mb-2">{reviewMode ? 'Review Complete!' : 'Great Job!'}</h3>
        <p className="text-[#8b6b5c] mb-4">{reviewMode ? 'You reviewed all the flashcards!' : 'You completed the flashcards!'}</p>
        <div className="bg-[#faf6f3] rounded-2xl p-6 mb-4">
          <p className="text-sm text-[#8b6b5c]">Your Score</p>
          <p className="text-4xl font-bold text-[#d4867a]">{score + 20}%</p>
        </div>
        <Button onClick={() => onComplete(score + 20)} className="bg-[#d4867a]">Continue</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-[#8b6b5c]">Card {currentCard + 1} of {cards.length}</p>
        <div className="flex items-center gap-2">
          <button 
            onClick={toggleMute}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="w-5 h-5 text-[#8b6b5c]" /> : <Volume2 className="w-5 h-5 text-[#d4867a]" />}
          </button>
          <Progress value={((currentCard + 1) / cards.length) * 100} className="w-32 h-2" />
        </div>
      </div>

      <div 
        onClick={() => setFlipped(!flipped)}
        className="relative h-64 cursor-pointer"
        style={{ perspective: '1000px' }}
      >
        <div className={`absolute inset-0 bg-white rounded-3xl shadow-lg flex flex-col items-center justify-center transition-all duration-500 ${flipped ? 'opacity-0' : 'opacity-100'}`}>
          <p className="text-6xl font-bold text-[#d4867a]">{cards[currentCard].front}</p>
          <p className="text-sm text-[#8b6b5c] mt-4">Tap to flip</p>
        </div>
        <div className={`absolute inset-0 bg-[#faf6f3] rounded-3xl shadow-lg flex flex-col items-center justify-center transition-all duration-500 ${flipped ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-2xl font-medium text-[#5a3d2a]">{cards[currentCard].back}</p>
          <p className="text-sm text-[#8b6b5c] mt-2">Examples: {cards[currentCard].example}</p>
          <Button onClick={(e) => { e.stopPropagation(); handleNext(); }} className="mt-6 bg-[#d4867a]">
            <Check className="w-4 h-4 mr-2" /> Got it!
          </Button>
        </div>
      </div>

      <div className="flex justify-center gap-3">
        <Button 
          variant="outline" 
          onClick={handlePrevious} 
          disabled={currentCard === 0}
          className="rounded-full"
        >
          <ChevronLeft className="w-4 h-4 mr-2" /> Back
        </Button>
        <Button 
          variant="outline" 
          onClick={handleListen} 
          disabled={isSpeaking || isMuted}
          className="rounded-full"
        >
          <Volume2 className="w-4 h-4 mr-2" /> {isSpeaking ? 'Playing...' : 'Listen'}
        </Button>
      </div>
    </div>
  );
}

// ==================== MATCHING GAME ====================
function MatchingGame({ onComplete, reviewMode = false }: { onComplete: (score: number) => void; reviewMode?: boolean }) {
  const [matched, setMatched] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [moves, setMoves] = useState(0);
  const { speak, isMuted, toggleMute } = useTextToSpeech();

  const pairs = [
    { id: '1', word: 'Mother', match: 'Mom' },
    { id: '2', word: 'Father', match: 'Dad' },
    { id: '3', word: 'Sister', match: 'Sibling (F)' },
    { id: '4', word: 'Brother', match: 'Sibling (M)' },
  ];

  const allCards = [...pairs.map(p => ({ id: p.id + 'w', text: p.word, matchId: p.id + 'm' })),
                   ...pairs.map(p => ({ id: p.id + 'm', text: p.match, matchId: p.id + 'w' }))]
                   .sort(() => Math.random() - 0.5);

  const handleCardClick = (card: typeof allCards[0]) => {
    if (matched.includes(card.id) || selected === card.id) return;
    
    // Speak the word when clicked
    if (!isMuted) {
      speak(card.text);
    }
    
    if (!selected) {
      setSelected(card.id);
    } else {
      setMoves(m => m + 1);
      const prevCard = allCards.find(c => c.id === selected);
      if (prevCard && (prevCard.matchId === card.id || card.matchId === prevCard.id)) {
        setMatched(m => [...m, card.id, selected]);
        // Play success sound feedback
        if (!isMuted) {
          setTimeout(() => speak('Great match!'), 300);
        }
        if (matched.length + 2 === allCards.length) {
          setTimeout(() => onComplete(100), 500);
        }
      }
      setSelected(null);
    }
  };

  const handleReset = () => {
    setMatched([]);
    setSelected(null);
    setMoves(0);
  };

  if (matched.length === allCards.length) {
    return (
      <div className="text-center py-8">
        <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-[#5a3d2a] mb-2">Perfect Match!</h3>
        <p className="text-[#8b6b5c] mb-4">You matched all the pairs in {moves} moves!</p>
        <div className="bg-[#faf6f3] rounded-2xl p-6 mb-4">
          <p className="text-sm text-[#8b6b5c]">Your Score</p>
          <p className="text-4xl font-bold text-[#d4867a]">100%</p>
        </div>
        <div className="flex justify-center gap-3">
          {reviewMode && (
            <Button onClick={handleReset} variant="outline" className="rounded-full">
              <RotateCcw className="w-4 h-4 mr-2" /> Play Again
            </Button>
          )}
          <Button onClick={() => onComplete(100)} className="bg-[#d4867a]">Continue</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-[#8b6b5c]">Matches: {matched.length / 2} / {pairs.length}</p>
        <div className="flex items-center gap-2">
          <button 
            onClick={toggleMute}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="w-5 h-5 text-[#8b6b5c]" /> : <Volume2 className="w-5 h-5 text-[#d4867a]" />}
          </button>
          <Progress value={(matched.length / allCards.length) * 100} className="w-32 h-2" />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {allCards.map(card => (
          <button
            key={card.id}
            onClick={() => handleCardClick(card)}
            disabled={matched.includes(card.id)}
            className={`p-4 rounded-xl text-sm font-medium transition-all ${
              matched.includes(card.id) 
                ? 'bg-green-100 text-green-700 border-2 border-green-300' 
                : selected === card.id
                ? 'bg-[#d4867a] text-white border-2 border-[#d4867a]'
                : 'bg-white border-2 border-gray-200 text-[#5a3d2a] hover:border-[#d4867a]'
            }`}
          >
            {card.text}
          </button>
        ))}
      </div>

      {reviewMode && (
        <div className="flex justify-center">
          <Button onClick={handleReset} variant="outline" className="rounded-full">
            <RotateCcw className="w-4 h-4 mr-2" /> Reset Game
          </Button>
        </div>
      )}
    </div>
  );
}

// ==================== GAME PLAYER ====================
function GamePlayer({ game, onClose, onComplete, reviewMode = false }: { game: GameActivity; onClose: () => void; onComplete: (score: number) => void; reviewMode?: boolean }) {
  return (
    <div className="fixed inset-0 bg-[#faf6f3] z-50 flex flex-col">
      <header className="bg-white border-b px-4 py-3 flex items-center justify-between">
        <Button variant="outline" size="sm" onClick={onClose}><ArrowLeft className="w-4 h-4 mr-2" /> {reviewMode ? 'Back to Review' : 'Exit'}</Button>
        <h1 className="font-medium text-[#5a3d2a]">{reviewMode ? `Review: ${game.title}` : game.title}</h1>
        <div className="w-20" />
      </header>
      <main className="flex-1 p-4 sm:p-8 max-w-2xl mx-auto w-full">
        {game.type === 'flashcards' && <FlashcardGame onComplete={onComplete} reviewMode={reviewMode} />}
        {game.type === 'matching' && <MatchingGame onComplete={onComplete} reviewMode={reviewMode} />}
        {game.type === 'fill-blank' && (
          <div className="text-center py-12">
            <p className="text-[#8b6b5c]">Fill in the Blank game coming soon!</p>
          </div>
        )}
      </main>
    </div>
  );
}

// ==================== PERSONAL GROWTH TAB ====================
function PersonalGrowthTab({ student }: { student: StudentData }) {
  const [activeSection, setActiveSection] = useState<'overview' | 'skills' | 'topics' | 'goals'>('overview');
  const [goals, setGoals] = useState(student.growthGoals);

  const masteredTopics = student.topicMastery.filter(t => t.status === 'mastered');
  const strongTopics = student.topicMastery.filter(t => t.status === 'strong');
  const familiarTopics = student.topicMastery.filter(t => t.status === 'familiar');
  const learningTopics = student.topicMastery.filter(t => t.status === 'learning');

  const unlockedSkills = student.tangibleSkills.filter(s => s.unlocked);
  const completedSkills = student.tangibleSkills.filter(s => s.completed);
  const readySkills = unlockedSkills.filter(s => !s.completed);

  const unlockedGoals = goals.filter(g => g.unlocked);
  const selectedGoalsCount = goals.filter(g => g.selected).length;

  const handleSelectGoal = (goal: GrowthGoal) => {
    setGoals(prev => prev.map(g => g.id === goal.id ? { ...g, selected: !g.selected } : g));
  };

  // Overview Section - Simple and encouraging
  if (activeSection === 'overview') {
    return (
      <div className="space-y-6">
        {/* Calm Welcome */}
        <div className="bg-white rounded-2xl p-6 text-center">
          <div className="w-16 h-16 bg-[#faf6f3] rounded-full flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-8 h-8 text-[#d4867a]" />
          </div>
          <h3 className="text-xl font-medium text-[#5a3d2a] mb-2">Your Learning Journey</h3>
          <p className="text-[#8b6b5c] text-sm">Take it one step at a time. You're doing great!</p>
        </div>

        {/* Simple Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl p-5 text-center">
            <p className="text-3xl font-bold text-[#d4867a]">{completedSkills.length}</p>
            <p className="text-sm text-[#8b6b5c] mt-1">Skills Learned</p>
          </div>
          <div className="bg-white rounded-2xl p-5 text-center">
            <p className="text-3xl font-bold text-green-600">{masteredTopics.length}</p>
            <p className="text-sm text-[#8b6b5c] mt-1">Topics Mastered</p>
          </div>
        </div>

        {/* Navigation Cards */}
        <div className="space-y-3">
          <button 
            onClick={() => setActiveSection('skills')}
            className="w-full bg-white rounded-2xl p-5 flex items-center justify-between hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#faf6f3] rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-[#d4867a]" />
              </div>
              <div className="text-left">
                <p className="font-medium text-[#5a3d2a]">Skills to Practice</p>
                <p className="text-sm text-[#8b6b5c]">{readySkills.length} ready for you</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-[#8b6b5c]" />
          </button>

          <button 
            onClick={() => setActiveSection('topics')}
            className="w-full bg-white rounded-2xl p-5 flex items-center justify-between hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#faf6f3] rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-[#d4867a]" />
              </div>
              <div className="text-left">
                <p className="font-medium text-[#5a3d2a]">Topic Progress</p>
                <p className="text-sm text-[#8b6b5c]">See how you're doing</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-[#8b6b5c]" />
          </button>

          <button 
            onClick={() => setActiveSection('goals')}
            className="w-full bg-white rounded-2xl p-5 flex items-center justify-between hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#faf6f3] rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-[#d4867a]" />
              </div>
              <div className="text-left">
                <p className="font-medium text-[#5a3d2a]">Your Goals</p>
                <p className="text-sm text-[#8b6b5c]">{selectedGoalsCount} selected</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-[#8b6b5c]" />
          </button>
        </div>

        {/* Encouragement */}
        <div className="bg-gradient-to-r from-[#d4867a]/10 to-[#fcc4be]/10 rounded-2xl p-5 text-center">
          <p className="text-[#5a3d2a] font-medium">"Every expert was once a beginner."</p>
          <p className="text-sm text-[#8b6b5c] mt-1">Keep going, {student.name.split(' ')[0]}!</p>
        </div>
      </div>
    );
  }

  // Skills Section
  if (activeSection === 'skills') {
    return (
      <div className="space-y-4">
        <button 
          onClick={() => setActiveSection('overview')}
          className="flex items-center gap-2 text-[#d4867a] font-medium"
        >
          <ArrowLeft className="w-5 h-5" /> Back
        </button>

        <h3 className="text-lg font-medium text-[#5a3d2a]">Skills Ready to Practice</h3>
        
        {readySkills.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center">
            <p className="text-[#8b6b5c]">Complete more lessons to unlock new skills!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {readySkills.map(skill => (
              <div key={skill.id} className="bg-white rounded-2xl p-5">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-[#5a3d2a]">{skill.title}</p>
                    <p className="text-sm text-[#8b6b5c] mt-1">{skill.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {completedSkills.length > 0 && (
          <>
            <h3 className="text-lg font-medium text-[#5a3d2a] mt-6">Skills You've Mastered</h3>
            <div className="space-y-3">
              {completedSkills.map(skill => (
                <div key={skill.id} className="bg-green-50 rounded-2xl p-5 border border-green-200">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <p className="font-medium text-green-800">{skill.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    );
  }

  // Topics Section
  if (activeSection === 'topics') {
    return (
      <div className="space-y-4">
        <button 
          onClick={() => setActiveSection('overview')}
          className="flex items-center gap-2 text-[#d4867a] font-medium"
        >
          <ArrowLeft className="w-5 h-5" /> Back
        </button>

        <h3 className="text-lg font-medium text-[#5a3d2a]">Your Topics</h3>

        {/* Simple Progress Bar */}
        <div className="bg-white rounded-2xl p-5">
          <p className="text-sm text-[#8b6b5c] mb-3">Overall Progress</p>
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#d4867a] to-green-500 rounded-full transition-all"
              style={{ width: `${(student.topicMastery.filter(t => t.status !== 'not-started').length / student.topicMastery.length) * 100}%` }}
            />
          </div>
          <p className="text-sm text-[#8b6b5c] mt-2 text-center">
            {student.topicMastery.filter(t => t.status !== 'not-started').length} of {student.topicMastery.length} topics started
          </p>
        </div>

        {/* Topic List */}
        <div className="space-y-2">
          {masteredTopics.length > 0 && (
            <div className="bg-green-50 rounded-2xl p-4">
              <p className="text-sm font-medium text-green-700 mb-2">Mastered</p>
              <div className="flex flex-wrap gap-2">
                {masteredTopics.map(t => (
                  <span key={t.topic} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    {t.topic}
                  </span>
                ))}
              </div>
            </div>
          )}

          {strongTopics.length > 0 && (
            <div className="bg-blue-50 rounded-2xl p-4">
              <p className="text-sm font-medium text-blue-700 mb-2">Strong</p>
              <div className="flex flex-wrap gap-2">
                {strongTopics.map(t => (
                  <span key={t.topic} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {t.topic}
                  </span>
                ))}
              </div>
            </div>
          )}

          {[...familiarTopics, ...learningTopics].length > 0 && (
            <div className="bg-orange-50 rounded-2xl p-4">
              <p className="text-sm font-medium text-orange-700 mb-2">Learning</p>
              <div className="flex flex-wrap gap-2">
                {[...familiarTopics, ...learningTopics].map(t => (
                  <span key={t.topic} className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">
                    {t.topic}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Goals Section
  if (activeSection === 'goals') {
    return (
      <div className="space-y-4">
        <button 
          onClick={() => setActiveSection('overview')}
          className="flex items-center gap-2 text-[#d4867a] font-medium"
        >
          <ArrowLeft className="w-5 h-5" /> Back
        </button>

        <div className="bg-white rounded-2xl p-5">
          <h3 className="text-lg font-medium text-[#5a3d2a] mb-2">Your Goals</h3>
          <p className="text-sm text-[#8b6b5c]">Pick goals that excite you. We'll help you get there!</p>
        </div>

        <div className="space-y-3">
          {unlockedGoals.map(goal => (
            <button
              key={goal.id}
              onClick={() => handleSelectGoal(goal)}
              className={`w-full text-left rounded-2xl p-5 transition-all ${
                goal.selected 
                  ? 'bg-[#d4867a] text-white' 
                  : 'bg-white hover:bg-[#faf6f3]'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                  goal.selected ? 'border-white bg-white' : 'border-[#d4867a]'
                }`}>
                  {goal.selected && <CheckCircle className="w-4 h-4 text-[#d4867a]" />}
                </div>
                <div>
                  <p className={`font-medium ${goal.selected ? 'text-white' : 'text-[#5a3d2a]'}`}>{goal.title}</p>
                  <p className={`text-sm mt-1 ${goal.selected ? 'text-white/80' : 'text-[#8b6b5c]'}`}>{goal.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {selectedGoalsCount > 0 && (
          <div className="bg-[#faf6f3] rounded-2xl p-5 text-center">
            <p className="text-[#5a3d2a] font-medium">{selectedGoalsCount} goal{selectedGoalsCount > 1 ? 's' : ''} selected!</p>
            <p className="text-sm text-[#8b6b5c] mt-1">You're on your way!</p>
          </div>
        )}
      </div>
    );
  }

  return null;
}

// ==================== STUDENT DASHBOARD ====================
function StudentDashboard({ student }: { student: StudentData }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [playingGame, setPlayingGame] = useState<GameActivity | null>(null);
  const [reviewingGame, setReviewingGame] = useState<GameActivity | null>(null);
  const [assignments, setAssignments] = useState(student.assignments);
  const [showAssignmentDetail, setShowAssignmentDetail] = useState<StudentAssignment | null>(null);

  const pendingAssignments = assignments.filter(a => a.status === 'pending');
  const completedAssignments = assignments.filter(a => a.status === 'submitted' || a.status === 'graded');
  const newAssignments = assignments.filter(a => {
    const assigned = new Date(a.assignedDate);
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    return assigned >= sevenDaysAgo && a.status === 'pending';
  });

  const handleGameComplete = (score: number) => {
    if (playingGame) {
      setAssignments(prev => prev.map(a => 
        a.title === playingGame.title ? { ...a, status: 'submitted', score } : a
      ));
      setPlayingGame(null);
    }
  };

  const handleReviewComplete = () => {
    setReviewingGame(null);
  };

  // Find game by assignment title
  const findGameByTitle = (title: string): GameActivity | null => {
    // Try exact match first
    let game = student.games.find(g => g.title === title);
    if (game) return game;
    
    // Try partial match
    game = student.games.find(g => 
      title.toLowerCase().includes(g.title.toLowerCase()) ||
      g.title.toLowerCase().includes(title.toLowerCase())
    );
    if (game) return game;
    
    // Return first game as fallback for demo
    return student.games[0] || null;
  };

  // Handle start assignment
  const handleStartAssignment = (assignment: StudentAssignment) => {
    if (assignment.type === 'game') {
      const game = findGameByTitle(assignment.title);
      if (game) {
        setPlayingGame(game);
      }
    } else {
      setShowAssignmentDetail(assignment);
    }
  };

  // Handle review completed assignment
  const handleReviewAssignment = (assignment: StudentAssignment) => {
    const game = findGameByTitle(assignment.title);
    if (game) {
      setReviewingGame(game);
    }
  };

  if (playingGame) {
    return <GamePlayer game={playingGame} onClose={() => setPlayingGame(null)} onComplete={handleGameComplete} />;
  }

  if (reviewingGame) {
    return <GamePlayer game={reviewingGame} onClose={() => setReviewingGame(null)} onComplete={handleReviewComplete} reviewMode />;
  }

  return (
    <div className="min-h-screen bg-[#faf6f3]">
      {/* Header - Single Logo */}
      <header className="bg-[#fcc4be] sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-[#d4867a]" />
              </div>
              <span className="font-serif text-[#5a3d2a] text-lg hidden sm:block">Roam Learning</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="font-medium text-[#5a3d2a]">{student.name}</p>
                <p className="text-xs text-[#8b6b5c]">{student.className}</p>
              </div>
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-[#d4867a]" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Nav */}
      <nav className="sm:hidden bg-white border-b px-4 py-2 flex justify-around">
        <button onClick={() => setActiveTab('dashboard')} className={`flex flex-col items-center p-2 ${activeTab === 'dashboard' ? 'text-[#d4867a]' : 'text-[#8b6b5c]'}`}>
          <Home className="w-5 h-5" /><span className="text-xs mt-1">Home</span>
        </button>
        <button onClick={() => setActiveTab('assignments')} className={`flex flex-col items-center p-2 ${activeTab === 'assignments' ? 'text-[#d4867a]' : 'text-[#8b6b5c]'}`}>
          <ClipboardList className="w-5 h-5" /><span className="text-xs mt-1">Work</span>
        </button>
        <button onClick={() => setActiveTab('growth')} className={`flex flex-col items-center p-2 ${activeTab === 'growth' ? 'text-[#d4867a]' : 'text-[#8b6b5c]'}`}>
          <TrendingUp className="w-5 h-5" /><span className="text-xs mt-1">Growth</span>
        </button>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-4 sm:py-8">
        {/* Desktop Tabs */}
        <div className="hidden sm:block mb-6">
          <div className="bg-white rounded-2xl p-2 inline-flex">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: Home },
              { id: 'assignments', label: 'My Assignments', icon: ClipboardList },
              { id: 'games', label: 'Games', icon: Gamepad2 },
              { id: 'growth', label: 'Personal Growth', icon: TrendingUp },
            ].map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === tab.id ? 'bg-[#d4867a] text-white' : 'text-[#5a3d2a] hover:bg-gray-100'}`}>
                <tab.icon className="w-4 h-4" />{tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dashboard Tab */}
        {(activeTab === 'dashboard' || activeTab === 'home') && (
          <div className="space-y-6">
            {/* Welcome & Stats */}
            <div className="bg-white rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-[#5a3d2a]">Hello, {student.name.split(' ')[0]}!</h2>
                  <p className="text-[#8b6b5c]">Keep up the great work!</p>
                </div>
                <div className="flex items-center gap-2 bg-orange-100 px-4 py-2 rounded-full">
                  <Flame className="w-5 h-5 text-orange-500" />
                  <span className="font-bold text-orange-600">{student.streakDays}</span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-[#faf6f3] rounded-xl">
                  <Trophy className="w-6 h-6 text-yellow-500 mx-auto mb-1" />
                  <p className="text-xl font-bold text-[#5a3d2a]">{student.totalPoints}</p>
                  <p className="text-xs text-[#8b6b5c]">Points</p>
                </div>
                <div className="text-center p-4 bg-[#faf6f3] rounded-xl">
                  <CheckCircle className="w-6 h-6 text-green-500 mx-auto mb-1" />
                  <p className="text-xl font-bold text-[#5a3d2a]">{completedAssignments.length}</p>
                  <p className="text-xs text-[#8b6b5c]">Done</p>
                </div>
                <div className="text-center p-4 bg-[#faf6f3] rounded-xl">
                  <Clock className="w-6 h-6 text-[#d4867a] mx-auto mb-1" />
                  <p className="text-xl font-bold text-[#5a3d2a]">{pendingAssignments.length}</p>
                  <p className="text-xs text-[#8b6b5c]">To Do</p>
                </div>
              </div>
            </div>

            {/* New Assignments */}
            {newAssignments.length > 0 && (
              <div className="bg-[#faf6f3] rounded-2xl p-5 border-2 border-[#d4867a]/30">
                <h3 className="font-medium text-[#5a3d2a] mb-3 flex items-center gap-2">
                  <Bell className="w-5 h-5 text-[#d4867a]" /> New This Week ({newAssignments.length})
                </h3>
                <div className="space-y-2">
                  {newAssignments.map(a => (
                    <div key={a.id} className="bg-white p-4 rounded-xl flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {a.type === 'homework' ? <BookOpen className="w-5 h-5 text-[#d4867a]" /> : <Gamepad2 className="w-5 h-5 text-green-500" />}
                        <div>
                          <p className="font-medium text-[#5a3d2a]">{a.title}</p>
                          <p className="text-xs text-[#8b6b5c]">Due: {a.dueDate}</p>
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        className="bg-[#d4867a]"
                        onClick={() => handleStartAssignment(a)}
                      >
                        <Play className="w-4 h-4 mr-1" /> Start
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Pending Assignments */}
            <div className="bg-white rounded-2xl p-5">
              <h3 className="font-medium text-[#5a3d2a] mb-3">Pending Assignments</h3>
              {pendingAssignments.length === 0 ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                  <p className="text-[#5a3d2a] font-medium">All caught up!</p>
                  <p className="text-sm text-[#8b6b5c]">You have no pending assignments.</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {pendingAssignments.slice(0, 3).map(a => (
                    <div key={a.id} className="p-3 bg-gray-50 rounded-xl flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {a.type === 'homework' ? <BookOpen className="w-4 h-4 text-[#d4867a]" /> : <Gamepad2 className="w-4 h-4 text-green-500" />}
                        <p className="text-sm text-[#5a3d2a]">{a.title}</p>
                      </div>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => handleStartAssignment(a)}
                        className="text-[#d4867a] hover:text-[#c2756a] hover:bg-[#fcc4be]/20"
                      >
                        <Play className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  {pendingAssignments.length > 3 && (
                    <button onClick={() => setActiveTab('assignments')} className="w-full text-center text-sm text-[#d4867a] py-2">
                      View all {pendingAssignments.length} assignments
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Assignments Tab */}
        {(activeTab === 'assignments' || activeTab === 'work') && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-5">
              <h2 className="text-lg font-medium text-[#5a3d2a] mb-4">My Assignments</h2>
              <Tabs defaultValue="pending">
                <TabsList className="mb-4">
                  <TabsTrigger value="pending">To Do ({pendingAssignments.length})</TabsTrigger>
                  <TabsTrigger value="completed">Completed ({completedAssignments.length})</TabsTrigger>
                </TabsList>
                <TabsContent value="pending" className="space-y-2">
                  {pendingAssignments.map(a => (
                    <div key={a.id} className="p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          {a.type === 'homework' ? <BookOpen className="w-5 h-5 text-[#d4867a] mt-1" /> : <Gamepad2 className="w-5 h-5 text-green-500 mt-1" />}
                          <div>
                            <p className="font-medium text-[#5a3d2a]">{a.title}</p>
                            <p className="text-xs text-[#8b6b5c]">Assigned: {a.assignedDate} • Due: {a.dueDate}</p>
                            <p className="text-xs text-[#8b6b5c]">From: {a.teacherName}</p>
                          </div>
                        </div>
                        <Button 
                          size="sm" 
                          onClick={() => handleStartAssignment(a)}
                          className="bg-[#d4867a] hover:bg-[#c2756a]"
                        >
                          <Play className="w-4 h-4 mr-1" /> Start
                        </Button>
                      </div>
                    </div>
                  ))}
                </TabsContent>
                <TabsContent value="completed" className="space-y-2">
                  {completedAssignments.map(a => (
                    <div key={a.id} className="p-4 bg-green-50 rounded-xl border border-green-200">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                          <div>
                            <p className="font-medium text-green-800">{a.title}</p>
                            <p className="text-xs text-green-600">Completed</p>
                          </div>
                        </div>
                        {a.score && (
                          <div className="text-right">
                            <p className="text-2xl font-bold text-green-600">{a.score}%</p>
                          </div>
                        )}
                      </div>
                      <div className="mt-3 flex gap-2">
                        {a.type === 'game' && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleReviewAssignment(a)}
                            className="flex-1 border-green-300 text-green-700 hover:bg-green-100"
                          >
                            <RotateCcw className="w-4 h-4 mr-1" /> Review
                          </Button>
                        )}
                      </div>
                      {a.feedback && (
                        <div className="mt-3 p-3 bg-white rounded-lg">
                          <p className="text-xs text-[#8b6b5c]">Teacher Feedback:</p>
                          <p className="text-sm text-[#5a3d2a]">{a.feedback}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        )}

        {/* Games Tab */}
        {activeTab === 'games' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-5">
              <h2 className="text-lg font-medium text-[#5a3d2a] mb-4">Learning Games</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {student.games.map(game => (
                  <div key={game.id} className="p-5 bg-[#faf6f3] rounded-2xl border-2 border-transparent hover:border-[#d4867a] transition-colors cursor-pointer" onClick={() => setPlayingGame(game)}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                        <Gamepad2 className="w-6 h-6 text-[#d4867a]" />
                      </div>
                      <Badge className={game.mode === 'synchronous' ? 'bg-green-500' : 'bg-blue-500'}>
                        {game.mode}
                      </Badge>
                    </div>
                    <h3 className="font-medium text-[#5a3d2a]">{game.title}</h3>
                    <p className="text-sm text-[#8b6b5c]">{game.topics.join(', ')}</p>
                    <div className="mt-3 flex flex-wrap gap-1">
                      {game.verbTenses.map(t => (
                        <span key={t} className="text-[10px] px-2 py-0.5 bg-white rounded-full">{t}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Personal Growth Tab */}
        {activeTab === 'growth' && (
          <PersonalGrowthTab student={student} />
        )}
      </main>

      {/* Assignment Detail Dialog */}
      <Dialog open={!!showAssignmentDetail} onOpenChange={() => setShowAssignmentDetail(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{showAssignmentDetail?.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="flex items-center gap-2 text-sm text-[#8b6b5c]">
              <Calendar className="w-4 h-4" />
              <span>Due: {showAssignmentDetail?.dueDate}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#8b6b5c]">
              <User className="w-4 h-4" />
              <span>From: {showAssignmentDetail?.teacherName}</span>
            </div>
            {showAssignmentDetail?.content && (
              <div className="bg-gray-50 p-4 rounded-xl">
                <p className="text-sm text-[#5a3d2a]">{showAssignmentDetail.content}</p>
              </div>
            )}
            <Button 
              className="w-full bg-[#d4867a] hover:bg-[#c2756a]"
              onClick={() => {
                if (showAssignmentDetail) {
                  setShowAssignmentDetail(null);
                  handleStartAssignment(showAssignmentDetail);
                }
              }}
            >
              <Play className="w-4 h-4 mr-2" /> Start Assignment
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ==================== MAIN EXPORT ====================
export default function StudentPortal() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return <StudentLogin onLogin={() => setIsLoggedIn(true)} />;
  }

  return <StudentDashboard student={mockStudentData} />;
}
