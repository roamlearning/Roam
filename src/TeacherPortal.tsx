import { useState } from 'react';
import { 
  Lock, Users, BarChart3, Calendar as CalendarIcon,
  CheckCircle, Circle, Plus, ArrowLeft,
  Send, GraduationCap, UserCog,
  BookMarked, AlertTriangle, BookOpen,
  ChevronRight, Filter, Gamepad2, Clock,
  MessageSquare, TrendingUp, Target,
  Type, Grid3X3, Dices,
  Monitor, Smartphone, Sparkles,
  History, FolderCheck,
  CheckSquare, Zap,
  ChevronLeft, ChevronRight as ChevronRightIcon,
  FileText, Award
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';


// ==================== TYPES ====================
type UserRole = 'teacher' | 'content-creator';
type TabType = 'classes' | 'calendar' | 'students' | 'progress' | 'games';
type GameType = 'flashcards' | 'matching' | 'fill-blank' | 'word-scramble' | 'sentence-builder' | 'quiz-battle';
type GameMode = 'synchronous' | 'asynchronous';

interface StudentProgress {
  lessonId: string;
  status: 'not-started' | 'in-progress' | 'completed' | 'struggling';
  lastAttempt?: string;
  score?: number;
  notes?: string;
}

interface StudentAssignment {
  id: string;
  title: string;
  type: 'homework' | 'game' | 'lesson';
  assignedDate: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'graded' | 'late';
  score?: number;
  feedback?: string;
}

interface Student {
  id: string;
  name: string;
  email: string;
  level: string;
  joinDate: string;
  attendance: number;
  completedLessons: string[];
  understoodLessons: string[];
  notes: string;
  progress: StudentProgress[];
  strugglingTopics: string[];
  strongTopics: string[];
  assignments: StudentAssignment[];
  lastActive: string;
  streakDays: number;
}



interface Class {
  id: string;
  name: string;
  type: 'private' | 'semi-private' | 'small-group' | 'group';
  level: string;
  schedule: string;
  nextClassDate: string;
  students: Student[];
  completedLessons: string[];
  mode: 'structured' | 'modular';
  prepConfirmedLessons: string[];
  assignedCurriculum: string[];
}

interface CalendarEvent {
  id: string;
  date: string;
  time: string;
  title: string;
  type: 'lesson' | 'homework-due' | 'grading-due' | 'prep-confirm' | 'event';
  classId?: string;
  lessonId?: string;
  description: string;
}

interface HomeworkSubmission {
  id: string;
  studentId: string;
  studentName: string;
  classId: string;
  className: string;
  assignmentTitle: string;
  assignmentType: 'homework' | 'game';
  submittedDate: string;
  dueDate: string;
  content: string;
  status: 'pending' | 'graded';
  score?: number;
  feedback?: string;
}

interface GameConfig {
  id: string;
  type: GameType;
  title: string;
  topics: string[];
  verbTenses: string[];
  mode: GameMode;
  classId: string;
  createdAt: string;
}

interface GradingRubric {
  id: string;
  name: string;
  criteria: { name: string; points: number; description: string }[];
}

// ==================== GRADING RUBRICS ====================
const gradingRubrics: GradingRubric[] = [
  {
    id: 'writing',
    name: 'Writing Assignment',
    criteria: [
      { name: 'Grammar & Structure', points: 30, description: 'Correct grammar, sentence structure' },
      { name: 'Vocabulary Usage', points: 25, description: 'Appropriate word choice and variety' },
      { name: 'Content & Ideas', points: 25, description: 'Clear, relevant, well-developed ideas' },
      { name: 'Organization', points: 20, description: 'Logical flow and structure' },
    ]
  },
  {
    id: 'speaking',
    name: 'Speaking/Introduction',
    criteria: [
      { name: 'Pronunciation', points: 30, description: 'Clear, understandable pronunciation' },
      { name: 'Fluency', points: 25, description: 'Smooth speech without long pauses' },
      { name: 'Vocabulary', points: 25, description: 'Appropriate word choice' },
      { name: 'Completeness', points: 20, description: 'All required information included' },
    ]
  },
  {
    id: 'game',
    name: 'Game/Quiz',
    criteria: [
      { name: 'Accuracy', points: 50, description: 'Correct answers' },
      { name: 'Completion', points: 30, description: 'Finished all questions' },
      { name: 'Effort', points: 20, description: 'Demonstrated effort and engagement' },
    ]
  },
];

// ==================== GAME TEMPLATES ====================
const gameTemplates: { id: GameType; name: string; description: string; icon: typeof BookMarked; supports: string[] }[] = [
  { id: 'flashcards', name: 'Flashcards', description: 'Digital flashcards with pronunciation', icon: BookMarked, supports: ['vocabulary', 'phrases'] },
  { id: 'matching', name: 'Matching Game', description: 'Match words to definitions/images', icon: Grid3X3, supports: ['vocabulary', 'collocations'] },
  { id: 'fill-blank', name: 'Fill in the Blank', description: 'Complete sentences with correct words', icon: Type, supports: ['grammar', 'vocabulary'] },
  { id: 'word-scramble', name: 'Word Scramble', description: 'Unscramble letters to form words', icon: Dices, supports: ['vocabulary', 'spelling'] },
  { id: 'sentence-builder', name: 'Sentence Builder', description: 'Arrange words to form sentences', icon: MessageSquare, supports: ['grammar', 'word-order'] },
  { id: 'quiz-battle', name: 'Quiz Battle', description: 'Competitive quiz for live play', icon: Zap, supports: ['all-topics'] },
];

const allTopics = ['Greetings', 'Introductions', 'Family', 'Daily Routines', 'Food', 'Travel', 'Shopping', 'Work', 'Hobbies', 'Weather', 'Directions', 'Time', 'Numbers', 'Colors', 'Body Parts', 'Clothing', 'House', 'School'];
const allVerbTenses = ['Simple Present', 'Present Continuous', 'Simple Past', 'Past Continuous', 'Present Perfect', 'Past Perfect', 'Future (will)', 'Future (going to)', 'Conditionals', 'Passive Voice', 'Modal Verbs', 'Phrasal Verbs'];

// ==================== MOCK DATA ====================
const mockAssignments: StudentAssignment[] = [
  { id: 'A001', title: 'Introduce Yourself', type: 'homework', assignedDate: '2025-05-08', dueDate: '2025-05-15', status: 'submitted', score: 85 },
  { id: 'A002', title: 'Alphabet Flashcards', type: 'game', assignedDate: '2025-05-10', dueDate: '2025-05-17', status: 'pending' },
  { id: 'A003', title: 'Daily Routines Writing', type: 'homework', assignedDate: '2025-05-12', dueDate: '2025-05-19', status: 'graded', score: 92 },
  { id: 'A004', title: 'Family Vocabulary Match', type: 'game', assignedDate: '2025-05-13', dueDate: '2025-05-20', status: 'submitted' },
];

const mockStudents: Student[] = [
  { id: 'S001', name: 'Maria Garcia', email: 'maria@email.com', level: 'A1', joinDate: '2025-01-15', attendance: 92, completedLessons: ['A1-L01'], understoodLessons: [], notes: 'Quick learner, very motivated', progress: [{ lessonId: 'A1-L01', status: 'completed', score: 85 }, { lessonId: 'A1-L02', status: 'struggling', lastAttempt: '2025-05-10' }], strugglingTopics: ['Alphabet pronunciation', 'Letter sounds'], strongTopics: ['Greetings', 'Introductions'], assignments: mockAssignments, lastActive: '2025-05-13', streakDays: 5 },
  { id: 'S002', name: 'Chen Wei', email: 'chen@email.com', level: 'A2', joinDate: '2025-02-01', attendance: 88, completedLessons: ['A1-L01', 'A1-L02', 'A1-L03'], understoodLessons: ['A1-L02'], notes: 'Strong grammar foundation', progress: [{ lessonId: 'A1-L01', status: 'completed', score: 95 }, { lessonId: 'A1-L02', status: 'completed', score: 90 }, { lessonId: 'A1-L03', status: 'completed', score: 88 }], strugglingTopics: [], strongTopics: ['Numbers', 'Counting', 'Grammar'], assignments: mockAssignments.slice(1), lastActive: '2025-05-14', streakDays: 12 },
  { id: 'S003', name: 'Ahmed Hassan', email: 'ahmed@email.com', level: 'B1', joinDate: '2025-03-01', attendance: 85, completedLessons: ['B1-L01'], understoodLessons: [], notes: 'Needs more practice with tenses', progress: [{ lessonId: 'B1-L01', status: 'struggling', lastAttempt: '2025-05-12' }], strugglingTopics: ['Present Perfect', 'Ever/Never usage'], strongTopics: ['Reading comprehension'], assignments: [mockAssignments[0]], lastActive: '2025-05-12', streakDays: 3 },
];

const mockClasses: Class[] = [
  { id: 'C001', name: 'Morning A1 Group', type: 'group', level: 'A1', schedule: 'Mon/Wed 10:00 AM', nextClassDate: '2025-05-15', students: [mockStudents[0], mockStudents[1]], completedLessons: ['A1-L01'], mode: 'structured', prepConfirmedLessons: [], assignedCurriculum: ['A1-L01', 'A1-L02', 'A1-L03', 'A1-L04', 'A1-L05'] },
  { id: 'C002', name: 'Private B1', type: 'private', level: 'B1', schedule: 'Tue/Thu 2:00 PM', nextClassDate: '2025-05-14', students: [mockStudents[2]], completedLessons: [], mode: 'modular', prepConfirmedLessons: [], assignedCurriculum: ['B1-L01', 'B1-L02', 'B1-L03'] },
];

const mockCalendarEvents: CalendarEvent[] = [
  { id: 'e1', date: '2025-05-14', time: '14:00', title: 'Private B1 - Lesson', type: 'lesson', classId: 'C002', lessonId: 'B1-L01', description: 'Present Perfect Experiences' },
  { id: 'e2', date: '2025-05-13', time: '10:00', title: 'Grade: Intro & Greetings HW', type: 'grading-due', classId: 'C001', description: 'Grade homework from 48 hours ago' },
  { id: 'e3', date: '2025-05-14', time: '09:00', title: 'Confirm Prep: Daily Routines', type: 'prep-confirm', classId: 'C002', lessonId: 'A1-L04', description: 'Push lesson content to students' },
  { id: 'e4', date: '2025-05-15', time: '10:00', title: 'Morning A1 - Lesson', type: 'lesson', classId: 'C001', lessonId: 'A1-L02', description: 'Alphabet & Spelling' },
  { id: 'e5', date: '2025-05-16', time: '23:59', title: 'HW Due: Alphabet Practice', type: 'homework-due', classId: 'C001', description: 'Students submit homework' },
];

const mockHomeworkSubmissions: HomeworkSubmission[] = [
  { id: 'HS001', studentId: 'S001', studentName: 'Maria Garcia', classId: 'C001', className: 'Morning A1 Group', assignmentTitle: 'Introduce Yourself', assignmentType: 'homework', submittedDate: '2025-05-13', dueDate: '2025-05-15', content: 'Hello! My name is Maria. I am from Mexico. I am 25 years old...', status: 'pending' },
  { id: 'HS002', studentId: 'S002', studentName: 'Chen Wei', classId: 'C001', className: 'Morning A1 Group', assignmentTitle: 'Introduce Yourself', assignmentType: 'homework', submittedDate: '2025-05-12', dueDate: '2025-05-15', content: 'Hi! I am Chen Wei. I come from China. I like to study English...', status: 'pending' },
  { id: 'HS003', studentId: 'S001', studentName: 'Maria Garcia', classId: 'C001', className: 'Morning A1 Group', assignmentTitle: 'Family Vocabulary Match', assignmentType: 'game', submittedDate: '2025-05-14', dueDate: '2025-05-20', content: 'Score: 8/10', status: 'pending' },
];

const mockGames: GameConfig[] = [
  { id: 'G001', type: 'flashcards', title: 'Alphabet Flashcards', topics: ['Alphabet'], verbTenses: [], mode: 'asynchronous', classId: 'C001', createdAt: '2025-05-10' },
  { id: 'G002', type: 'matching', title: 'Family Matching', topics: ['Family'], verbTenses: [], mode: 'synchronous', classId: 'C001', createdAt: '2025-05-12' },
];

// ==================== LOGIN ====================
function LoginPage({ onLogin }: { onLogin: (role: UserRole) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('teacher');
  return (
    <div className="min-h-screen bg-[#faf6f3] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#d4867a] rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
          <h1 className="text-xl sm:text-2xl font-serif text-[#5a3d2a]">Teacher Portal</h1>
        </div>
        <div className="flex gap-2 mb-6">
          {(['teacher', 'content-creator'] as const).map((r) => (
            <button key={r} onClick={() => setRole(r)} className={`flex-1 py-2.5 sm:py-3 px-2 sm:px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-1 sm:gap-2 transition-colors ${role === r ? 'bg-[#d4867a] text-white' : 'bg-gray-100 text-[#5a3d2a]'}`}>
              {r === 'teacher' ? <GraduationCap className="w-4 h-4" /> : <UserCog className="w-4 h-4" />}
              <span className="hidden sm:inline">{r === 'teacher' ? 'Teacher' : 'Content Creator'}</span>
              <span className="sm:hidden">{r === 'teacher' ? 'Teach' : 'Create'}</span>
            </button>
          ))}
        </div>
        <form onSubmit={(e) => { e.preventDefault(); if (email && password) onLogin(role); }} className="space-y-4">
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="rounded-xl h-12" />
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="rounded-xl h-12" />
          <Button type="submit" className="w-full bg-[#d4867a] hover:bg-[#c2756a] text-white rounded-full h-12">Sign In</Button>
        </form>
      </div>
    </div>
  );
}

// ==================== STUDENT PROFILE VIEW ====================
function StudentProfileView({ student, onBack, classes }: { student: Student; onBack: () => void; classes: Class[]; }) {
  const studentClasses = classes.filter(c => c.students.some(s => s.id === student.id));
  const sevenDaysAgo = new Date(); sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const recentAssignments = student.assignments.filter(a => new Date(a.assignedDate) >= sevenDaysAgo);

  return (
    <div className="space-y-6">
      <button onClick={onBack} className="flex items-center text-[#d4867a] text-sm"><ArrowLeft className="w-4 h-4 mr-1" /> Back</button>
      <div className="bg-white rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row items-start gap-4">
          <div className="w-20 h-20 bg-[#fcc4be] rounded-full flex items-center justify-center text-2xl font-medium text-[#5a3d2a]">{student.name.split(' ').map(n => n[0]).join('')}</div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-[#5a3d2a]">{student.name}</h2>
            <p className="text-[#8b6b5c]">{student.email}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              <Badge variant="secondary">{student.level}</Badge>
              <Badge className="bg-green-500">{student.streakDays} day streak</Badge>
              <Badge className="bg-blue-500">{student.attendance}% attendance</Badge>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-[#8b6b5c]">Last Active</p>
            <p className="font-medium text-[#5a3d2a]">{student.lastActive}</p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="bg-white p-1 rounded-xl w-full flex flex-wrap h-auto">
          <TabsTrigger value="overview" className="rounded-lg data-[state=active]:bg-[#d4867a] data-[state=active]:text-white">Overview</TabsTrigger>
          <TabsTrigger value="assignments" className="rounded-lg data-[state=active]:bg-[#d4867a] data-[state=active]:text-white">Assignments ({recentAssignments.length} new)</TabsTrigger>
          <TabsTrigger value="progress" className="rounded-lg data-[state=active]:bg-[#d4867a] data-[state=active]:text-white">Progress</TabsTrigger>
          <TabsTrigger value="strengths" className="rounded-lg data-[state=active]:bg-[#d4867a] data-[state=active]:text-white">Strengths & Weaknesses</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4 mt-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-4 text-center"><p className="text-2xl font-bold text-[#5a3d2a]">{student.completedLessons.length}</p><p className="text-xs text-[#8b6b5c]">Lessons Completed</p></div>
            <div className="bg-white rounded-xl p-4 text-center"><p className="text-2xl font-bold text-[#5a3d2a]">{student.assignments.filter(a => a.status === 'submitted' || a.status === 'graded').length}</p><p className="text-xs text-[#8b6b5c]">Assignments Done</p></div>
            <div className="bg-white rounded-xl p-4 text-center"><p className="text-2xl font-bold text-[#5a3d2a]">{student.streakDays}</p><p className="text-xs text-[#8b6b5c]">Day Streak</p></div>
            <div className="bg-white rounded-xl p-4 text-center"><p className="text-2xl font-bold text-[#5a3d2a]">{student.attendance}%</p><p className="text-xs text-[#8b6b5c]">Attendance</p></div>
          </div>
          <div className="bg-white rounded-2xl p-5">
            <h3 className="font-medium text-[#5a3d2a] mb-3 flex items-center gap-2"><Users className="w-5 h-5 text-[#d4867a]" /> Enrolled Classes</h3>
            <div className="space-y-2">
              {studentClasses.map(cls => (
                <div key={cls.id} className="p-3 bg-gray-50 rounded-xl flex justify-between items-center">
                  <div><p className="font-medium text-[#5a3d2a]">{cls.name}</p><p className="text-xs text-[#8b6b5c]">{cls.schedule}</p></div>
                  <Badge variant="secondary">{cls.level}</Badge>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-2xl p-5">
            <h3 className="font-medium text-[#5a3d2a] mb-3 flex items-center gap-2"><History className="w-5 h-5 text-[#d4867a]" /> Recent Activity</h3>
            <div className="space-y-2">
              {recentAssignments.slice(0, 3).map(a => (
                <div key={a.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  {a.type === 'homework' ? <BookMarked className="w-4 h-4 text-[#d4867a]" /> : <Gamepad2 className="w-4 h-4 text-green-500" />}
                  <div className="flex-1"><p className="text-sm text-[#5a3d2a]">{a.title}</p><p className="text-xs text-[#8b6b5c]">Assigned {a.assignedDate}</p></div>
                  <Badge className={a.status === 'graded' ? 'bg-green-500' : a.status === 'submitted' ? 'bg-blue-500' : a.status === 'late' ? 'bg-red-500' : 'bg-gray-400'}>{a.status}</Badge>
                </div>
              ))}
            </div>
          </div>
          {student.notes && (
            <div className="bg-yellow-50 rounded-2xl p-5 border border-yellow-200">
              <h3 className="font-medium text-[#5a3d2a] mb-2 flex items-center gap-2"><MessageSquare className="w-5 h-5 text-yellow-600" /> Teacher Notes</h3>
              <p className="text-sm text-[#5a3d2a]">{student.notes}</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="assignments" className="space-y-4 mt-4">
          {recentAssignments.length > 0 && (
            <div className="bg-[#faf6f3] rounded-2xl p-5 border-2 border-[#d4867a]/30">
              <h3 className="font-medium text-[#5a3d2a] mb-3 flex items-center gap-2"><Sparkles className="w-5 h-5 text-[#d4867a]" /> New Assignments (Last 7 Days)</h3>
              <div className="space-y-2">
                {recentAssignments.map(a => (
                  <div key={a.id} className="bg-white p-4 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {a.type === 'homework' ? <BookMarked className="w-5 h-5 text-[#d4867a]" /> : <Gamepad2 className="w-5 h-5 text-green-500" />}
                      <div><p className="font-medium text-[#5a3d2a]">{a.title}</p><p className="text-xs text-[#8b6b5c]">Due: {a.dueDate}</p></div>
                    </div>
                    <Badge className={a.status === 'graded' ? 'bg-green-500' : a.status === 'submitted' ? 'bg-blue-500' : a.status === 'late' ? 'bg-red-500' : 'bg-orange-500'}>{a.status === 'pending' ? 'Pending' : a.status}</Badge>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="bg-white rounded-2xl p-5">
            <h3 className="font-medium text-[#5a3d2a] mb-3">All Assignments</h3>
            <div className="space-y-2">
              {student.assignments.map(a => (
                <div key={a.id} className="p-3 bg-gray-50 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {a.type === 'homework' ? <BookMarked className="w-4 h-4 text-[#d4867a]" /> : <Gamepad2 className="w-4 h-4 text-green-500" />}
                    <div><p className="text-sm text-[#5a3d2a]">{a.title}</p><p className="text-xs text-[#8b6b5c]">Assigned: {a.assignedDate} • Due: {a.dueDate}</p></div>
                  </div>
                  <div className="flex items-center gap-2">
                    {a.score && <span className="text-sm font-medium text-green-600">{a.score}%</span>}
                    <Badge className={a.status === 'graded' ? 'bg-green-500' : a.status === 'submitted' ? 'bg-blue-500' : a.status === 'late' ? 'bg-red-500' : 'bg-gray-400'}>{a.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="progress" className="space-y-4 mt-4">
          <div className="bg-white rounded-2xl p-5">
            <h3 className="font-medium text-[#5a3d2a] mb-3">Lesson Progress</h3>
            <div className="space-y-2">
              {student.progress.map(p => {
                const lesson = { A1: { L01: 'Introductions', L02: 'Alphabet', L03: 'Numbers' }, B1: { L01: 'Present Perfect' } }[p.lessonId.split('-')[0] as 'A1' | 'B1']?.[p.lessonId.split('-')[1] as 'L01' | 'L02' | 'L03'] || 'Lesson';
                return (
                  <div key={p.lessonId} className={`p-4 rounded-xl ${p.status === 'completed' ? 'bg-green-50 border border-green-200' : p.status === 'struggling' ? 'bg-orange-50 border border-orange-200' : p.status === 'in-progress' ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {p.status === 'completed' ? <CheckCircle className="w-5 h-5 text-green-500" /> : p.status === 'struggling' ? <AlertTriangle className="w-5 h-5 text-orange-500" /> : p.status === 'in-progress' ? <Clock className="w-5 h-5 text-blue-500" /> : <Circle className="w-5 h-5 text-gray-400" />}
                        <div><p className="font-medium text-[#5a3d2a]">{p.lessonId} - {lesson}</p>{p.lastAttempt && <p className="text-xs text-[#8b6b5c]">Last attempt: {p.lastAttempt}</p>}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        {p.score && <p className={`text-lg font-bold ${p.score >= 80 ? 'text-green-600' : p.score >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>{p.score}%</p>}
                        <Badge className={p.status === 'completed' ? 'bg-green-500' : p.status === 'struggling' ? 'bg-orange-500' : p.status === 'in-progress' ? 'bg-blue-500' : 'bg-gray-400'}>{p.status === 'completed' ? 'Completed' : p.status === 'struggling' ? 'Struggling' : p.status === 'in-progress' ? 'In Progress' : 'Not Started'}</Badge>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="strengths" className="space-y-4 mt-4">
          <div className="bg-green-50 rounded-2xl p-5 border border-green-200">
            <h3 className="font-medium text-green-800 mb-3 flex items-center gap-2"><TrendingUp className="w-5 h-5" /> Strong Topics</h3>
            {student.strongTopics.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {student.strongTopics.map(topic => <span key={topic} className="px-3 py-1.5 bg-green-200 text-green-800 rounded-full text-sm font-medium">{topic}</span>)}
              </div>
            ) : <p className="text-sm text-green-700">No strong topics identified yet.</p>}
          </div>
          <div className="bg-orange-50 rounded-2xl p-5 border border-orange-200">
            <h3 className="font-medium text-orange-800 mb-3 flex items-center gap-2"><Target className="w-5 h-5" /> Areas for Improvement</h3>
            {student.strugglingTopics.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {student.strugglingTopics.map(topic => <span key={topic} className="px-3 py-1.5 bg-orange-200 text-orange-800 rounded-full text-sm font-medium">{topic}</span>)}
              </div>
            ) : <p className="text-sm text-orange-700">No struggling topics - great job!</p>}
          </div>
          <div className="bg-white rounded-2xl p-5">
            <h3 className="font-medium text-[#5a3d2a] mb-3 flex items-center gap-2"><Sparkles className="w-5 h-5 text-[#d4867a]" /> Recommended Focus</h3>
            <div className="space-y-2">
              {student.strugglingTopics.length > 0 ? student.strugglingTopics.map(topic => (
                <div key={topic} className="p-3 bg-[#faf6f3] rounded-xl flex items-center gap-3"><BookOpen className="w-4 h-4 text-[#d4867a]" /><p className="text-sm text-[#5a3d2a]">Practice more: <strong>{topic}</strong></p></div>
              )) : <p className="text-sm text-[#8b6b5c]">Student is doing well! Consider advancing to next level topics.</p>}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// ==================== TO-DO GRADING VIEW ====================
function TodoGradingView({ submissions, onGrade }: { submissions: HomeworkSubmission[]; onGrade: (id: string, score: number, feedback: string) => void }) {
  const [filterClass, setFilterClass] = useState<string>('all');
  const [filterAssignment, setFilterAssignment] = useState<string>('all');
  const [gradingId, setGradingId] = useState<string | null>(null);
  const [score, setScore] = useState<number>(0);
  const [feedback, setFeedback] = useState('');
  const [selectedRubric, setSelectedRubric] = useState<string>('writing');
  const [rubricScores, setRubricScores] = useState<Record<string, number>>({});

  const classes = Array.from(new Set(submissions.map(s => s.className)));
  const assignments = Array.from(new Set(submissions.map(s => s.assignmentTitle)));
  let filtered = submissions.filter(s => s.status === 'pending');
  if (filterClass !== 'all') filtered = filtered.filter(s => s.className === filterClass);
  if (filterAssignment !== 'all') filtered = filtered.filter(s => s.assignmentTitle === filterAssignment);
  const groupedByAssignment = filtered.reduce((acc, sub) => { if (!acc[sub.assignmentTitle]) acc[sub.assignmentTitle] = []; acc[sub.assignmentTitle].push(sub); return acc; }, {} as Record<string, HomeworkSubmission[]>);

  const currentRubric = gradingRubrics.find(r => r.id === selectedRubric);
  const totalRubricPoints = currentRubric?.criteria.reduce((sum, c) => sum + c.points, 0) || 100;
  const currentRubricScore = Object.values(rubricScores).reduce((sum, s) => sum + (s || 0), 0);

  const handleRubricChange = (rubricId: string) => {
    setSelectedRubric(rubricId);
    setRubricScores({});
  };

  const handleGrade = () => { 
    if (gradingId) { 
      const finalScore = currentRubric ? Math.round((currentRubricScore / totalRubricPoints) * 100) : score;
      onGrade(gradingId, finalScore, feedback); 
      setGradingId(null); 
      setScore(0); 
      setFeedback(''); 
      setRubricScores({});
    } 
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-medium text-[#5a3d2a] flex items-center gap-2"><FolderCheck className="w-6 h-6 text-[#d4867a]" /> To-Do: Grade Submissions</h2>
      <div className="bg-white rounded-2xl p-4 flex flex-wrap gap-3">
        <div className="flex items-center gap-2"><Filter className="w-4 h-4 text-[#8b6b5c]" /><Select value={filterClass} onValueChange={setFilterClass}><SelectTrigger className="w-40 rounded-xl"><SelectValue placeholder="All Classes" /></SelectTrigger><SelectContent><SelectItem value="all">All Classes</SelectItem>{classes.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select></div>
        <Select value={filterAssignment} onValueChange={setFilterAssignment}><SelectTrigger className="w-48 rounded-xl"><SelectValue placeholder="All Assignments" /></SelectTrigger><SelectContent><SelectItem value="all">All Assignments</SelectItem>{assignments.map(a => <SelectItem key={a} value={a}>{a}</SelectItem>)}</SelectContent></Select>
      </div>
      <div className="space-y-6">
        {Object.entries(groupedByAssignment).length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center"><CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" /><p className="text-[#5a3d2a] font-medium">All caught up!</p><p className="text-sm text-[#8b6b5c]">No pending submissions to grade.</p></div>
        ) : Object.entries(groupedByAssignment).map(([assignmentTitle, subs]) => (
          <div key={assignmentTitle} className="bg-white rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4"><div><h3 className="font-medium text-[#5a3d2a]">{assignmentTitle}</h3><p className="text-sm text-[#8b6b5c]">{subs[0].className} • {subs.length} to grade</p></div><Badge className="bg-orange-500">{subs.length} pending</Badge></div>
            <div className="space-y-2">
              {subs.map(sub => (
                <div key={sub.id} className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#fcc4be] rounded-full flex items-center justify-center text-sm font-medium">{sub.studentName.split(' ').map(n => n[0]).join('')}</div>
                      <p className="font-medium text-[#5a3d2a]">{sub.studentName}</p>
                    </div>
                    <div className="flex items-center gap-2"><span className="text-xs text-[#8b6b5c]">Submitted {sub.submittedDate}</span><Button size="sm" onClick={() => { setGradingId(sub.id); setScore(0); setFeedback(''); setRubricScores({}); }} className="bg-[#d4867a]"><CheckSquare className="w-4 h-4 mr-1" /> Grade</Button></div>
                  </div>
                  <div className="bg-white p-3 rounded-lg text-sm text-[#5a3d2a]">{sub.content}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <Dialog open={!!gradingId} onOpenChange={() => setGradingId(null)}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle className="flex items-center gap-2"><Award className="w-5 h-5" /> Grade Submission</DialogTitle></DialogHeader>
          <div className="space-y-4 mt-4">
            {/* Rubric Selection */}
            <div>
              <Label className="text-sm font-medium mb-2 block">Grading Rubric</Label>
              <Select value={selectedRubric} onValueChange={handleRubricChange}>
                <SelectTrigger className="rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {gradingRubrics.map(r => (
                    <SelectItem key={r.id} value={r.id}>{r.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Rubric Criteria */}
            {currentRubric && (
              <div className="bg-[#faf6f3] rounded-xl p-4 space-y-3">
                <p className="text-sm font-medium text-[#5a3d2a]">Criteria Scores</p>
                {currentRubric.criteria.map(criterion => (
                  <div key={criterion.name} className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm text-[#5a3d2a]">{criterion.name}</p>
                      <p className="text-xs text-[#8b6b5c]">{criterion.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        min={0}
                        max={criterion.points}
                        value={rubricScores[criterion.name] || ''}
                        onChange={(e) => setRubricScores(prev => ({ ...prev, [criterion.name]: Number(e.target.value) }))}
                        className="w-20 rounded-lg text-right"
                      />
                      <span className="text-sm text-[#8b6b5c]">/ {criterion.points}</span>
                    </div>
                  </div>
                ))}
                <div className="border-t pt-2 flex justify-between items-center">
                  <p className="text-sm font-medium text-[#5a3d2a]">Total Score</p>
                  <p className="text-lg font-bold text-[#d4867a]">{currentRubricScore} / {totalRubricPoints} ({Math.round((currentRubricScore / totalRubricPoints) * 100)}%)</p>
                </div>
              </div>
            )}

            {/* Manual Score Override */}
            <div>
              <Label className="text-sm font-medium mb-2 block">Final Score (0-100)</Label>
              <Input 
                type="number" 
                min="0" 
                max="100" 
                value={score || Math.round((currentRubricScore / totalRubricPoints) * 100)} 
                onChange={(e) => setScore(Number(e.target.value))} 
                className="rounded-xl" 
              />
            </div>

            {/* Feedback */}
            <div>
              <Label className="text-sm font-medium mb-2 block">Feedback</Label>
              <Textarea 
                value={feedback} 
                onChange={(e) => setFeedback(e.target.value)} 
                placeholder="Enter feedback for student..." 
                className="rounded-xl h-24" 
              />
            </div>

            {/* Quick Feedback Buttons */}
            <div className="flex flex-wrap gap-2">
              {['Great job!', 'Keep practicing!', 'Excellent work!', 'Good effort!', 'Needs more practice'].map(quickFeedback => (
                <button
                  key={quickFeedback}
                  onClick={() => setFeedback(prev => prev ? prev + ' ' + quickFeedback : quickFeedback)}
                  className="px-3 py-1.5 bg-gray-100 rounded-full text-sm text-[#5a3d2a] hover:bg-gray-200 transition-colors"
                >
                  {quickFeedback}
                </button>
              ))}
            </div>

            <Button onClick={handleGrade} className="w-full bg-[#d4867a]">
              <CheckCircle className="w-4 h-4 mr-2" /> Submit Grade
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ==================== CALENDAR VIEW ====================
function CalendarView({ events }: { events: CalendarEvent[] }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  const getEventsForDay = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(e => e.date === dateStr);
  };
  
  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  
  return (
    <div className="space-y-4">
      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <button onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h3 className="text-lg font-medium text-[#5a3d2a]">{monthNames[month]} {year}</h3>
        <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <ChevronRightIcon className="w-5 h-5" />
        </button>
      </div>
      
      {/* Day Headers */}
      <div className="grid grid-cols-7 gap-1">
        {dayNames.map(day => (
          <div key={day} className="text-center text-xs text-[#8b6b5c] py-2 font-medium">
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Empty cells for days before the first day of month */}
        {Array.from({ length: firstDayOfMonth }).map((_, i) => (
          <div key={`empty-${i}`} className="aspect-square" />
        ))}
        
        {/* Days */}
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
          const dayEvents = getEventsForDay(day);
          const isToday = new Date().toDateString() === new Date(year, month, day).toDateString();
          
          return (
            <button
              key={day}
              onClick={() => dayEvents.length > 0 && setSelectedEvent(dayEvents[0])}
              className={`aspect-square p-1 rounded-lg border transition-colors relative ${
                isToday ? 'border-[#d4867a] bg-[#faf6f3]' : 'border-gray-100 hover:border-gray-200'
              } ${dayEvents.length > 0 ? 'cursor-pointer' : ''}`}
            >
              <span className={`text-sm ${isToday ? 'font-bold text-[#d4867a]' : 'text-[#5a3d2a]'}`}>{day}</span>
              {dayEvents.length > 0 && (
                <div className="absolute bottom-1 left-1 right-1 flex gap-0.5">
                  {dayEvents.slice(0, 3).map((e, i) => (
                    <div 
                      key={i} 
                      className={`h-1.5 flex-1 rounded-full ${
                        e.type === 'lesson' ? 'bg-blue-400' : 
                        e.type === 'grading-due' ? 'bg-orange-400' : 
                        e.type === 'homework-due' ? 'bg-red-400' : 
                        'bg-green-400'
                      }`} 
                    />
                  ))}
                </div>
              )}
            </button>
          );
        })}
      </div>
      
      {/* Legend */}
      <div className="flex flex-wrap gap-3 text-xs">
        <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-blue-400" /> Lesson</div>
        <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-orange-400" /> Grading Due</div>
        <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-red-400" /> Homework Due</div>
        <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-green-400" /> Prep Confirm</div>
      </div>
      
      {/* Upcoming Events List */}
      <div className="bg-[#faf6f3] rounded-2xl p-4">
        <h4 className="font-medium text-[#5a3d2a] mb-3 flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#d4867a]" /> Upcoming Events
        </h4>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {events
            .filter(e => new Date(e.date) >= new Date())
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
            .slice(0, 5)
            .map(event => (
              <div key={event.id} className="bg-white p-3 rounded-xl flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${
                  event.type === 'lesson' ? 'bg-blue-400' : 
                  event.type === 'grading-due' ? 'bg-orange-400' : 
                  event.type === 'homework-due' ? 'bg-red-400' : 
                  'bg-green-400'
                }`} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-[#5a3d2a]">{event.title}</p>
                  <p className="text-xs text-[#8b6b5c]">{event.date} • {event.time}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
      
      {/* Event Detail Dialog */}
      <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedEvent?.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 mt-4">
            <div className="flex items-center gap-2 text-sm text-[#8b6b5c]">
              <CalendarIcon className="w-4 h-4" />
              <span>{selectedEvent?.date} at {selectedEvent?.time}</span>
            </div>
            <Badge className={
              selectedEvent?.type === 'lesson' ? 'bg-blue-500' : 
              selectedEvent?.type === 'grading-due' ? 'bg-orange-500' : 
              selectedEvent?.type === 'homework-due' ? 'bg-red-500' : 
              'bg-green-500'
            }>
              {selectedEvent?.type}
            </Badge>
            <p className="text-sm text-[#5a3d2a]">{selectedEvent?.description}</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ==================== GAME CREATOR ====================
function GameCreator({ classes, onCreateGame }: { classes: Class[]; onCreateGame: (game: GameConfig) => void }) {
  const [selectedType, setSelectedType] = useState<GameType | null>(null);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [selectedTenses, setSelectedTenses] = useState<string[]>([]);
  const [selectedMode, setSelectedMode] = useState<GameMode>('asynchronous');
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [gameTitle, setGameTitle] = useState('');

  const handleCreate = () => {
    if (selectedType && selectedClass && gameTitle) {
      const newGame: GameConfig = { id: `G${Date.now()}`, type: selectedType, title: gameTitle, topics: selectedTopics, verbTenses: selectedTenses, mode: selectedMode, classId: selectedClass, createdAt: new Date().toISOString() };
      onCreateGame(newGame);
      setSelectedType(null); setSelectedTopics([]); setSelectedTenses([]); setGameTitle('');
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-medium text-[#5a3d2a] flex items-center gap-2"><Gamepad2 className="w-6 h-6 text-[#d4867a]" /> Create Learning Game</h2>
      <div className="bg-white rounded-2xl p-5">
        <h3 className="font-medium text-[#5a3d2a] mb-3">1. Choose Game Type</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {gameTemplates.map(game => (
            <div key={game.id} onClick={() => setSelectedType(game.id)} className={`p-4 rounded-xl border-2 cursor-pointer transition-colors ${selectedType === game.id ? 'border-[#d4867a] bg-[#faf6f3]' : 'border-gray-200 hover:border-gray-300'}`}>
              <game.icon className={`w-8 h-8 mb-2 ${selectedType === game.id ? 'text-[#d4867a]' : 'text-gray-400'}`} />
              <p className="font-medium text-[#5a3d2a] text-sm">{game.name}</p>
              <p className="text-xs text-[#8b6b5c]">{game.description}</p>
            </div>
          ))}
        </div>
      </div>
      {selectedType && (
        <div className="bg-white rounded-2xl p-5">
          <h3 className="font-medium text-[#5a3d2a] mb-3">2. Select Vocabulary Topics</h3>
          <div className="flex flex-wrap gap-2">
            {allTopics.map(topic => (
              <button key={topic} onClick={() => setSelectedTopics(prev => prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic])} className={`px-3 py-1.5 rounded-full text-sm transition-colors ${selectedTopics.includes(topic) ? 'bg-[#d4867a] text-white' : 'bg-gray-100 text-[#5a3d2a] hover:bg-gray-200'}`}>{topic}</button>
            ))}
          </div>
        </div>
      )}
      {selectedType && (
        <div className="bg-white rounded-2xl p-5">
          <h3 className="font-medium text-[#5a3d2a] mb-3">3. Select Target Grammar / Verb Tenses</h3>
          <div className="flex flex-wrap gap-2">
            {allVerbTenses.map(tense => (
              <button key={tense} onClick={() => setSelectedTenses(prev => prev.includes(tense) ? prev.filter(t => t !== tense) : [...prev, tense])} className={`px-3 py-1.5 rounded-full text-sm transition-colors ${selectedTenses.includes(tense) ? 'bg-blue-500 text-white' : 'bg-gray-100 text-[#5a3d2a] hover:bg-gray-200'}`}>{tense}</button>
            ))}
          </div>
        </div>
      )}
      {selectedType && selectedTopics.length > 0 && (
        <div className="bg-white rounded-2xl p-5">
          <h3 className="font-medium text-[#5a3d2a] mb-3">4. Game Settings</h3>
          <div className="mb-4">
            <p className="text-sm text-[#8b6b5c] mb-2">Play Mode</p>
            <div className="flex gap-3">
              <div onClick={() => setSelectedMode('synchronous')} className={`flex-1 p-4 rounded-xl border-2 cursor-pointer ${selectedMode === 'synchronous' ? 'border-[#d4867a] bg-[#faf6f3]' : 'border-gray-200'}`}>
                <Monitor className={`w-6 h-6 mb-2 ${selectedMode === 'synchronous' ? 'text-[#d4867a]' : 'text-gray-400'}`} />
                <p className="font-medium text-[#5a3d2a] text-sm">Synchronous (Live)</p>
                <p className="text-xs text-[#8b6b5c]">Play together in class</p>
              </div>
              <div onClick={() => setSelectedMode('asynchronous')} className={`flex-1 p-4 rounded-xl border-2 cursor-pointer ${selectedMode === 'asynchronous' ? 'border-[#d4867a] bg-[#faf6f3]' : 'border-gray-200'}`}>
                <Smartphone className={`w-6 h-6 mb-2 ${selectedMode === 'asynchronous' ? 'text-[#d4867a]' : 'text-gray-400'}`} />
                <p className="font-medium text-[#5a3d2a] text-sm">Asynchronous</p>
                <p className="text-xs text-[#8b6b5c]">Students play on their own time</p>
              </div>
            </div>
          </div>
          <div className="mb-4">
            <p className="text-sm text-[#8b6b5c] mb-2">Assign to Class</p>
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger className="rounded-xl"><SelectValue placeholder="Select a class" /></SelectTrigger>
              <SelectContent>{classes.map(c => <SelectItem key={c.id} value={c.id}>{c.name} ({c.level})</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div>
            <p className="text-sm text-[#8b6b5c] mb-2">Game Title</p>
            <Input value={gameTitle} onChange={(e) => setGameTitle(e.target.value)} placeholder="e.g., Family Vocabulary Practice" className="rounded-xl" />
          </div>
        </div>
      )}
      {selectedType && selectedTopics.length > 0 && selectedClass && gameTitle && (
        <Button onClick={handleCreate} className="w-full bg-[#d4867a] h-12 text-lg"><Send className="w-5 h-5 mr-2" /> Create & Push to Students</Button>
      )}
    </div>
  );
}

// ==================== CREATE CLASS DIALOG ====================
function CreateClassDialog({ isOpen, onClose, onCreate }: { isOpen: boolean; onClose: () => void; onCreate: (cls: Class) => void }) {
  const [name, setName] = useState('');
  const [type, setType] = useState<Class['type']>('group');
  const [level, setLevel] = useState('A1');
  const [schedule, setSchedule] = useState('');
  const [mode, setMode] = useState<Class['mode']>('structured');

  const handleSubmit = () => {
    if (name && schedule) {
      const newClass: Class = {
        id: `C${Date.now()}`,
        name,
        type,
        level,
        schedule,
        nextClassDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        students: [],
        completedLessons: [],
        mode,
        prepConfirmedLessons: [],
        assignedCurriculum: [],
      };
      onCreate(newClass);
      onClose();
      setName('');
      setSchedule('');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2"><Plus className="w-5 h-5" /> Create New Class</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <div>
            <Label className="text-sm font-medium mb-2 block">Class Name</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Evening A2 Group" className="rounded-xl" />
          </div>
          <div>
            <Label className="text-sm font-medium mb-2 block">Class Type</Label>
            <div className="grid grid-cols-2 gap-2">
              {(['private', 'semi-private', 'small-group', 'group'] as const).map(t => (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  className={`p-3 rounded-xl border-2 text-sm transition-colors ${type === t ? 'border-[#d4867a] bg-[#faf6f3]' : 'border-gray-200'}`}
                >
                  {t.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </button>
              ))}
            </div>
          </div>
          <div>
            <Label className="text-sm font-medium mb-2 block">Level</Label>
            <Select value={level} onValueChange={setLevel}>
              <SelectTrigger className="rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map(l => (
                  <SelectItem key={l} value={l}>{l}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-sm font-medium mb-2 block">Schedule</Label>
            <Input value={schedule} onChange={(e) => setSchedule(e.target.value)} placeholder="e.g., Mon/Wed 10:00 AM" className="rounded-xl" />
          </div>
          <div>
            <Label className="text-sm font-medium mb-2 block">Teaching Mode</Label>
            <div className="flex gap-2">
              <button
                onClick={() => setMode('structured')}
                className={`flex-1 p-3 rounded-xl border-2 text-sm transition-colors ${mode === 'structured' ? 'border-[#d4867a] bg-[#faf6f3]' : 'border-gray-200'}`}
              >
                <FileText className="w-5 h-5 mx-auto mb-1" />
                Structured
              </button>
              <button
                onClick={() => setMode('modular')}
                className={`flex-1 p-3 rounded-xl border-2 text-sm transition-colors ${mode === 'modular' ? 'border-[#d4867a] bg-[#faf6f3]' : 'border-gray-200'}`}
              >
                <Grid3X3 className="w-5 h-5 mx-auto mb-1" />
                Modular
              </button>
            </div>
          </div>
          <Button onClick={handleSubmit} className="w-full bg-[#d4867a]">
            <CheckCircle className="w-4 h-4 mr-2" /> Create Class
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ==================== MAIN TEACHER DASHBOARD ====================
function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('classes');
  const [classes, setClasses] = useState<Class[]>(mockClasses);
  const [students] = useState<Student[]>(mockStudents);
  const [submissions, setSubmissions] = useState<HomeworkSubmission[]>(mockHomeworkSubmissions);
  const [games, setGames] = useState<GameConfig[]>(mockGames);
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>(mockCalendarEvents);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [viewingStudent, setViewingStudent] = useState<Student | null>(null);
  const [calendarSubTab, setCalendarSubTab] = useState<'calendar' | 'todo'>('calendar');

  const handleGrade = (id: string, score: number, feedback: string) => {
    setSubmissions(prev => prev.map(s => s.id === id ? { ...s, status: 'graded', score, feedback } : s));
  };

  const handleCreateGame = (game: GameConfig) => {
    setGames(prev => [...prev, game]);
    const targetClass = classes.find(c => c.id === game.classId);
    const studentCount = targetClass?.students.length || 0;
    alert(`Game "${game.title}" created and pushed to ${studentCount} student${studentCount !== 1 ? 's' : ''} in ${targetClass?.name}!\n\nStudents will see this as a new assignment in their portal.`);
  };

  const handleCreateClass = (newClass: Class) => {
    setClasses(prev => [...prev, newClass]);
    // Add a calendar event for the first class
    const firstClassEvent: CalendarEvent = {
      id: `e${Date.now()}`,
      date: newClass.nextClassDate,
      time: newClass.schedule.split(' ').pop() || '10:00',
      title: `${newClass.name} - First Lesson`,
      type: 'lesson',
      classId: newClass.id,
      description: 'First class session',
    };
    setCalendarEvents(prev => [...prev, firstClassEvent]);
  };

  if (viewingStudent) {
    return (
      <div className="min-h-screen bg-[#faf6f3]">
        <header className="bg-[#fcc4be] sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
            <div className="flex items-center justify-between h-16 sm:h-20">
              <div className="flex items-center gap-3">
                <BookOpen className="w-8 h-8 text-[#d4867a]" />
                <span className="font-serif text-[#5a3d2a] text-xl">Roam Learning</span>
              </div>
            </div>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-8">
          <StudentProfileView student={viewingStudent} onBack={() => setViewingStudent(null)} classes={classes} />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf6f3]">
      <header className="bg-[#fcc4be] sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <div className="flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-[#d4867a]" />
              <span className="font-serif text-[#5a3d2a] text-xl hidden sm:block">Roam Learning</span>
            </div>
            <p className="text-xs text-[#5a3d2a]/70">Teacher Portal</p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="bg-white rounded-2xl p-4 sm:p-5"><div className="text-2xl sm:text-3xl font-bold text-[#5a3d2a]">{classes.length}</div><p className="text-xs sm:text-sm text-[#8b6b5c]">Classes</p></div>
          <div className="bg-white rounded-2xl p-4 sm:p-5"><div className="text-2xl sm:text-3xl font-bold text-[#5a3d2a]">{students.length}</div><p className="text-xs sm:text-sm text-[#8b6b5c]">Students</p></div>
          <div className="bg-white rounded-2xl p-4 sm:p-5"><div className="text-2xl sm:text-3xl font-bold text-[#5a3d2a]">90%</div><p className="text-xs sm:text-sm text-[#8b6b5c]">Attendance</p></div>
          <div className="bg-white rounded-2xl p-4 sm:p-5"><div className="text-2xl sm:text-3xl font-bold text-[#5a3d2a]">{games.length}</div><p className="text-xs sm:text-sm text-[#8b6b5c]">Active Games</p></div>
          <div className="bg-white rounded-2xl p-4 sm:p-5"><div className="text-2xl sm:text-3xl font-bold text-[#5a3d2a]">{submissions.filter(s => s.status === 'pending').length}</div><p className="text-xs sm:text-sm text-[#8b6b5c]">To Grade</p></div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl p-2 mb-6">
          <div className="flex overflow-x-auto gap-1">
            {[
              { id: 'classes' as TabType, label: 'Classes', icon: Users },
              { id: 'calendar' as TabType, label: 'Calendar', icon: CalendarIcon },
              { id: 'students' as TabType, label: 'Students', icon: Users },
              { id: 'progress' as TabType, label: 'Progress', icon: BarChart3 },
              { id: 'games' as TabType, label: 'Games', icon: Gamepad2 },
            ].map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-4 sm:px-6 py-3 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${activeTab === tab.id ? 'bg-[#d4867a] text-white' : 'text-[#5a3d2a] hover:bg-gray-100'}`}>
                <tab.icon className="w-4 h-4" />{tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {/* Classes Tab */}
          {activeTab === 'classes' && (
            <>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg sm:text-xl font-medium text-[#5a3d2a]">Your Classes</h2>
                <Button onClick={() => setShowCreateDialog(true)} className="bg-[#d4867a] h-10 text-sm"><Plus className="w-4 h-4 mr-2" /> Create Class</Button>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {classes.map(cls => (
                  <div key={cls.id} className="bg-white rounded-2xl p-5 cursor-pointer hover:shadow-lg transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-[#5a3d2a]">{cls.name}</h3>
                      <Badge className={`text-xs ${cls.mode === 'structured' ? 'bg-blue-500' : 'bg-purple-500'}`}>{cls.mode}</Badge>
                    </div>
                    <p className="text-sm text-[#8b6b5c]">{cls.schedule}</p>
                    <p className="text-sm text-[#8b6b5c]">{cls.students.length} students</p>
                    <Progress value={(cls.completedLessons.length / (cls.assignedCurriculum.length || 24)) * 100} className="h-2 mt-3" />
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Calendar Tab with Sub-tabs */}
          {activeTab === 'calendar' && (
            <div className="bg-white rounded-2xl p-5 sm:p-6">
              <div className="flex gap-2 mb-4">
                <button onClick={() => setCalendarSubTab('calendar')} className={`px-4 py-2 rounded-xl text-sm font-medium ${calendarSubTab === 'calendar' ? 'bg-[#d4867a] text-white' : 'bg-gray-100 text-[#5a3d2a]'}`}>Calendar</button>
                <button onClick={() => setCalendarSubTab('todo')} className={`px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 ${calendarSubTab === 'todo' ? 'bg-[#d4867a] text-white' : 'bg-gray-100 text-[#5a3d2a]'}`}>
                  <FolderCheck className="w-4 h-4" /> To-Do ({submissions.filter(s => s.status === 'pending').length})
                </button>
              </div>
              {calendarSubTab === 'calendar' ? (
                <CalendarView events={calendarEvents} />
              ) : (
                <TodoGradingView submissions={submissions} onGrade={handleGrade} />
              )}
            </div>
          )}

          {/* Students Tab */}
          {activeTab === 'students' && (
            <div className="bg-white rounded-2xl p-5 sm:p-6">
              <h2 className="text-lg sm:text-xl font-medium text-[#5a3d2a] mb-4">All Students</h2>
              <p className="text-sm text-[#8b6b5c] mb-4">Click on a student to view their full profile.</p>
              <div className="space-y-3">
                {students.map(s => (
                  <div key={s.id} onClick={() => setViewingStudent(s)} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#fcc4be] rounded-full flex items-center justify-center text-base sm:text-lg font-medium">{s.name.split(' ').map(n => n[0]).join('')}</div>
                      <div>
                        <p className="font-medium text-[#5a3d2a]">{s.name}</p>
                        <p className="text-xs sm:text-sm text-[#8b6b5c]">{s.email} • {s.level}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 sm:gap-6">
                      <div className="text-right"><p className="font-medium">{s.attendance}%</p><p className="text-xs text-[#8b6b5c]">Attendance</p></div>
                      <div className="text-right"><p className="font-medium">{s.completedLessons.length}</p><p className="text-xs text-[#8b6b5c]">Lessons</p></div>
                      <ChevronRight className="w-5 h-5 text-[#8b6b5c]" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Progress Tab */}
          {activeTab === 'progress' && (
            <div className="space-y-4">
              <h2 className="text-lg sm:text-xl font-medium text-[#5a3d2a]">Class Progress</h2>
              <p className="text-sm text-[#8b6b5c]">Click on a class to see detailed progress and student struggles.</p>
              <div className="space-y-4">
                {classes.map(cls => {
                  const totalLessons = cls.assignedCurriculum.length || 24;
                  const completed = cls.completedLessons.length;
                  const percent = (completed / totalLessons) * 100;
                  const strugglingCount = cls.students.filter(s => s.strugglingTopics.length > 0).length;
                  return (
                    <div key={cls.id} className="bg-white rounded-2xl p-5 cursor-pointer hover:shadow-lg transition-shadow">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <h3 className="font-medium text-[#5a3d2a]">{cls.name}</h3>
                          <Badge variant="secondary" className="text-xs">{cls.level}</Badge>
                        </div>
                        <div className="flex items-center gap-3">
                          {strugglingCount > 0 && <Badge className="bg-orange-500 flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> {strugglingCount} need help</Badge>}
                          <ChevronRight className="w-5 h-5 text-[#8b6b5c]" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between mb-2"><span className="text-sm text-[#8b6b5c]">{completed} / {totalLessons} lessons</span><span className="text-sm font-medium text-[#5a3d2a]">{Math.round(percent)}%</span></div>
                      <Progress value={percent} className="h-3" />
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Games Tab */}
          {activeTab === 'games' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-5">
                <h2 className="text-lg font-medium text-[#5a3d2a] mb-4">Active Games</h2>
                {games.length === 0 ? (
                  <p className="text-sm text-[#8b6b5c]">No active games. Create one below!</p>
                ) : (
                  <div className="space-y-2">
                    {games.map(game => (
                      <div key={game.id} className="p-4 bg-gray-50 rounded-xl flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Gamepad2 className="w-5 h-5 text-[#d4867a]" />
                          <div>
                            <p className="font-medium text-[#5a3d2a]">{game.title}</p>
                            <p className="text-xs text-[#8b6b5c]">{game.type} • {game.topics.slice(0, 2).join(', ')} • {game.mode}</p>
                          </div>
                        </div>
                        <Badge className={game.mode === 'synchronous' ? 'bg-green-500' : 'bg-blue-500'}>{game.mode}</Badge>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <GameCreator classes={classes} onCreateGame={handleCreateGame} />
            </div>
          )}
        </div>
      </main>

      {/* Create Class Dialog */}
      <CreateClassDialog 
        isOpen={showCreateDialog} 
        onClose={() => setShowCreateDialog(false)} 
        onCreate={handleCreateClass} 
      />
    </div>
  );
}

// ==================== MAIN EXPORT ====================
export default function TeacherPortal() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [, setUserRole] = useState<UserRole>('teacher');
  const handleLogin = (role: UserRole) => { setUserRole(role); setIsLoggedIn(true); };
  if (!isLoggedIn) return <LoginPage onLogin={handleLogin} />;
  return <TeacherDashboard />;
}
