export interface Subject {
  id: string;
  name: string;
  icon: string;
  topicCount: number;
  learnedCount: number;
  color: string;
  gradient: string;
}

export interface Topic {
  id: string;
  subject: string;
  title: string;
  content: string;
  difficulty: number;
  learned: boolean;
  lastReviewed: string | null;
  nextReview: string | null;
}

export interface ReviewItem {
  id: string;
  topicId: string;
  subject: string;
  question: string;
  answer: string;
  explanation: string;
  dueDate: string;
  interval: number;
  easeFactor: number;
}

export interface QuizQuestion {
  id: string;
  type: 'multiple_choice' | 'true_false' | 'fill_blank';
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
}

export interface DailyPlan {
  reviewsDue: number;
  newTopics: number;
  subjects: string[];
}

export interface ProgressStats {
  totalTopics: number;
  learnedTopics: number;
  streakDays: number;
  reviewsDue: number;
  todayLearned: number;
  weeklyActivity: number[];
  heatmap: Record<string, number>;
}

export interface ActivityItem {
  id: string;
  topicTitle: string;
  subject: string;
  action: string;
  timestamp: string;
}

export const SUBJECTS: Subject[] = [
  { id: 'mathematics', name: 'Mathematics', icon: '🧮', topicCount: 45, learnedCount: 12, color: '#7C3AED', gradient: 'from-purple-600 to-purple-800' },
  { id: 'science', name: 'Science', icon: '🔬', topicCount: 52, learnedCount: 8, color: '#06B6D4', gradient: 'from-cyan-500 to-cyan-700' },
  { id: 'language', name: 'Language', icon: '📖', topicCount: 38, learnedCount: 15, color: '#F59E0B', gradient: 'from-amber-500 to-amber-700' },
  { id: 'history', name: 'History', icon: '🏛️', topicCount: 41, learnedCount: 5, color: '#EF4444', gradient: 'from-red-500 to-red-700' },
  { id: 'health', name: 'Health', icon: '💊', topicCount: 30, learnedCount: 10, color: '#10B981', gradient: 'from-emerald-500 to-emerald-700' },
  { id: 'computer-science', name: 'Computer Science', icon: '💻', topicCount: 60, learnedCount: 22, color: '#3B82F6', gradient: 'from-blue-500 to-blue-700' },
  { id: 'geography', name: 'Geography', icon: '🌍', topicCount: 35, learnedCount: 7, color: '#22C55E', gradient: 'from-green-500 to-green-700' },
  { id: 'music', name: 'Music', icon: '🎵', topicCount: 28, learnedCount: 3, color: '#EC4899', gradient: 'from-pink-500 to-pink-700' },
  { id: 'art', name: 'Art', icon: '🎨', topicCount: 25, learnedCount: 6, color: '#F97316', gradient: 'from-orange-500 to-orange-700' },
  { id: 'philosophy', name: 'Philosophy', icon: '🤔', topicCount: 32, learnedCount: 4, color: '#8B5CF6', gradient: 'from-violet-500 to-violet-700' },
  { id: 'economics', name: 'Economics', icon: '📈', topicCount: 36, learnedCount: 9, color: '#14B8A6', gradient: 'from-teal-500 to-teal-700' },
  { id: 'psychology', name: 'Psychology', icon: '🧠', topicCount: 33, learnedCount: 11, color: '#A855F7', gradient: 'from-purple-500 to-fuchsia-700' },
  { id: 'environmental', name: 'Environmental', icon: '🌱', topicCount: 29, learnedCount: 2, color: '#84CC16', gradient: 'from-lime-500 to-lime-700' },
];

export const DEMO_TOPICS: Record<string, Topic[]> = {
  mathematics: [
    { id: 'm1', subject: 'mathematics', title: 'Pythagorean Theorem', content: 'In a right triangle, the square of the hypotenuse equals the sum of the squares of the other two sides: a² + b² = c². This fundamental relationship connects the three sides of any right triangle and forms the basis for distance calculations in Euclidean geometry.', difficulty: 2, learned: true, lastReviewed: '2024-03-10', nextReview: '2024-03-17' },
    { id: 'm2', subject: 'mathematics', title: 'Quadratic Formula', content: 'For any quadratic equation ax² + bx + c = 0, the solutions are given by x = (-b ± √(b² - 4ac)) / 2a. The discriminant (b² - 4ac) determines the nature of roots: positive = two real roots, zero = one repeated root, negative = two complex roots.', difficulty: 3, learned: false, lastReviewed: null, nextReview: null },
    { id: 'm3', subject: 'mathematics', title: 'Derivatives', content: 'The derivative of a function f(x) represents its instantaneous rate of change. Common rules include: Power Rule (d/dx xⁿ = nxⁿ⁻¹), Product Rule, Quotient Rule, and Chain Rule. Derivatives are fundamental to calculus and have applications in physics, engineering, and economics.', difficulty: 4, learned: false, lastReviewed: null, nextReview: null },
  ],
  'computer-science': [
    { id: 'cs1', subject: 'computer-science', title: 'Big O Notation', content: 'Big O notation describes the upper bound of an algorithm\'s time or space complexity. Common complexities: O(1) constant, O(log n) logarithmic, O(n) linear, O(n log n) linearithmic, O(n²) quadratic, O(2ⁿ) exponential.', difficulty: 3, learned: true, lastReviewed: '2024-03-12', nextReview: '2024-03-19' },
    { id: 'cs2', subject: 'computer-science', title: 'Binary Search', content: 'Binary search finds an element in a sorted array by repeatedly dividing the search interval in half. Time complexity: O(log n). Compare the target with the middle element; if not equal, eliminate the half where the target cannot lie.', difficulty: 2, learned: false, lastReviewed: null, nextReview: null },
  ],
  science: [
    { id: 's1', subject: 'science', title: 'Newton\'s Laws of Motion', content: '1st Law: An object at rest stays at rest unless acted upon by a force. 2nd Law: F = ma (Force equals mass times acceleration). 3rd Law: For every action, there is an equal and opposite reaction.', difficulty: 2, learned: true, lastReviewed: '2024-03-11', nextReview: '2024-03-18' },
    { id: 's2', subject: 'science', title: 'Periodic Table', content: 'The periodic table organizes elements by atomic number, electron configuration, and chemical properties. Elements in the same group (column) share similar properties. Periods (rows) represent energy levels.', difficulty: 2, learned: false, lastReviewed: null, nextReview: null },
  ],
};

export const DEMO_QUIZ: QuizQuestion[] = [
  { id: 'q1', type: 'multiple_choice', question: 'What is the Pythagorean theorem?', options: ['a² + b² = c²', 'a + b = c', 'a² × b² = c²', '2a + 2b = 2c'], correctAnswer: 'a² + b² = c²', explanation: 'The Pythagorean theorem states that in a right triangle, the square of the hypotenuse (c) equals the sum of the squares of the other two sides (a and b).' },
  { id: 'q2', type: 'true_false', question: 'Binary search requires a sorted array to work correctly.', correctAnswer: 'true', explanation: 'Binary search works by comparing the target with the middle element and eliminating half the array. This only works if the array is sorted.' },
  { id: 'q3', type: 'multiple_choice', question: 'What is the time complexity of binary search?', options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'], correctAnswer: 'O(log n)', explanation: 'Binary search halves the search space with each comparison, resulting in logarithmic time complexity.' },
  { id: 'q4', type: 'fill_blank', question: 'Newton\'s second law states that Force equals _____ times acceleration.', correctAnswer: 'mass', explanation: 'F = ma is Newton\'s second law. Force is the product of an object\'s mass and its acceleration.' },
  { id: 'q5', type: 'true_false', question: 'The derivative of x³ is 3x².', correctAnswer: 'true', explanation: 'Using the power rule: d/dx(xⁿ) = nxⁿ⁻¹, so d/dx(x³) = 3x².' },
];

export const DEMO_REVIEWS: ReviewItem[] = [
  { id: 'r1', topicId: 'm1', subject: 'Mathematics', question: 'State the Pythagorean theorem and explain when it applies.', answer: 'a² + b² = c², where c is the hypotenuse of a right triangle.', explanation: 'This applies to right triangles only. The hypotenuse is always the longest side, opposite the 90° angle.', dueDate: '2024-03-15', interval: 7, easeFactor: 2.5 },
  { id: 'r2', topicId: 'cs1', subject: 'Computer Science', question: 'What does O(log n) time complexity mean?', answer: 'The algorithm\'s running time grows logarithmically with input size.', explanation: 'Each step roughly halves the remaining work. Doubling the input only adds one more step. Examples: binary search, balanced BST lookup.', dueDate: '2024-03-15', interval: 5, easeFactor: 2.3 },
  { id: 'r3', topicId: 's1', subject: 'Science', question: 'State Newton\'s three laws of motion.', answer: '1st: Inertia. 2nd: F=ma. 3rd: Equal and opposite reactions.', explanation: 'These three laws form the foundation of classical mechanics and describe how objects move and interact with forces.', dueDate: '2024-03-15', interval: 4, easeFactor: 2.1 },
];

export const DEMO_ACTIVITY: ActivityItem[] = [
  { id: 'a1', topicTitle: 'Pythagorean Theorem', subject: 'Mathematics', action: 'reviewed', timestamp: '2024-03-14T18:30:00' },
  { id: 'a2', topicTitle: 'Big O Notation', subject: 'Computer Science', action: 'learned', timestamp: '2024-03-14T17:15:00' },
  { id: 'a3', topicTitle: 'Newton\'s Laws', subject: 'Science', action: 'reviewed', timestamp: '2024-03-14T16:00:00' },
  { id: 'a4', topicTitle: 'Binary Search', subject: 'Computer Science', action: 'learned', timestamp: '2024-03-13T20:00:00' },
  { id: 'a5', topicTitle: 'Periodic Table', subject: 'Science', action: 'started', timestamp: '2024-03-13T19:00:00' },
];
