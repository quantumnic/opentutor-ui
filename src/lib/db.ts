import { SUBJECTS, DEMO_TOPICS, DEMO_QUIZ, DEMO_REVIEWS, DEMO_ACTIVITY } from './types';
import type { Subject, Topic, QuizQuestion, ReviewItem, DailyPlan, ProgressStats, ActivityItem } from './types';

// SQLite integration is optional — when the DB exists, we read it.
// When it doesn't (most common case), we use rich demo data.

let dbInstance: any = null;
let dbChecked = false;

function getDb() {
  if (dbChecked) return dbInstance;
  dbChecked = true;

  try {
    const fs = require('fs');
    const path = require('path');
    const os = require('os');

    const dbPath = path.join(os.homedir(), '.local', 'share', 'opentutor', 'opentutor.db');
    const fallbackPath = path.join(process.cwd(), 'opentutor.db');
    const finalPath = fs.existsSync(dbPath) ? dbPath : fs.existsSync(fallbackPath) ? fallbackPath : null;

    if (!finalPath) return null;

    // Use sql.js (WASM-based, no native deps)
    const initSqlJs = require('sql.js');
    const SQL = initSqlJs();
    const buffer = fs.readFileSync(finalPath);
    dbInstance = new SQL.Database(buffer);
    return dbInstance;
  } catch {
    return null;
  }
}

function queryAll(sql: string, params: any[] = []): any[] {
  const db = getDb();
  if (!db) return [];
  try {
    const stmt = db.prepare(sql);
    if (params.length) stmt.bind(params);
    const results: any[] = [];
    while (stmt.step()) {
      results.push(stmt.getAsObject());
    }
    stmt.free();
    return results;
  } catch {
    return [];
  }
}

export function getSubjects(): Subject[] {
  const rows = queryAll(`
    SELECT s.id, s.name,
      COUNT(t.id) as topic_count,
      COUNT(CASE WHEN t.learned = 1 THEN 1 END) as learned_count
    FROM subjects s
    LEFT JOIN topics t ON t.subject_id = s.id
    GROUP BY s.id
  `);

  if (rows.length === 0) return SUBJECTS;

  return rows.map((row: any) => {
    const demo = SUBJECTS.find(s => s.id === row.id) || SUBJECTS[0];
    return {
      ...demo,
      id: row.id,
      name: row.name,
      topicCount: row.topic_count,
      learnedCount: row.learned_count,
    };
  });
}

export function getTopicsForSubject(subjectId: string): Topic[] {
  const rows = queryAll(
    `SELECT id, subject_id as subject, title, content, difficulty,
      learned, last_reviewed as lastReviewed, next_review as nextReview
    FROM topics WHERE subject_id = ?`,
    [subjectId]
  );

  if (rows.length > 0) return rows;
  return DEMO_TOPICS[subjectId] || DEMO_TOPICS['mathematics'] || [];
}

export function getQuizQuestions(topicId: string): QuizQuestion[] {
  const rows = queryAll(
    `SELECT id, type, question, options, correct_answer as correctAnswer, explanation
    FROM quiz_questions WHERE topic_id = ?`,
    [topicId]
  );

  if (rows.length > 0) {
    return rows.map((row: any) => ({
      ...row,
      options: row.options ? JSON.parse(row.options) : undefined,
    }));
  }
  return DEMO_QUIZ;
}

export function getReviewItems(): ReviewItem[] {
  const rows = queryAll(`
    SELECT r.id, r.topic_id as topicId, s.name as subject,
      r.question, r.answer, r.explanation,
      r.due_date as dueDate, r.interval_days as interval, r.ease_factor as easeFactor
    FROM reviews r
    JOIN topics t ON t.id = r.topic_id
    JOIN subjects s ON s.id = t.subject_id
    WHERE r.due_date <= date('now')
    ORDER BY r.due_date ASC
  `);

  if (rows.length > 0) return rows;
  return DEMO_REVIEWS;
}

export function getDailyPlan(): DailyPlan {
  const reviews = getReviewItems();
  return {
    reviewsDue: reviews.length,
    newTopics: 5,
    subjects: Array.from(new Set(reviews.map(r => r.subject))),
  };
}

export function getProgressStats(): ProgressStats {
  const subjects = getSubjects();
  const totalTopics = subjects.reduce((sum, s) => sum + s.topicCount, 0);
  const learnedTopics = subjects.reduce((sum, s) => sum + s.learnedCount, 0);

  // Generate deterministic heatmap based on date
  const heatmap: Record<string, number> = {};
  const today = new Date();
  for (let i = 0; i < 90; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const key = date.toISOString().split('T')[0];
    // Simple hash for deterministic values
    const hash = key.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
    heatmap[key] = hash % 3 === 0 ? 0 : (hash % 8) + 1;
  }

  return {
    totalTopics,
    learnedTopics,
    streakDays: 7,
    reviewsDue: getReviewItems().length,
    todayLearned: 3,
    weeklyActivity: [4, 6, 3, 7, 5, 2, 3],
    heatmap,
  };
}

export function getRecentActivity(): ActivityItem[] {
  const rows = queryAll(`
    SELECT a.id, t.title as topicTitle, s.name as subject, a.action, a.timestamp
    FROM activity a
    JOIN topics t ON t.id = a.topic_id
    JOIN subjects s ON s.id = t.subject_id
    ORDER BY a.timestamp DESC LIMIT 5
  `);

  if (rows.length > 0) return rows;
  return DEMO_ACTIVITY;
}

export function searchTopics(query: string): Topic[] {
  const rows = queryAll(
    `SELECT id, subject_id as subject, title, content, difficulty,
      learned, last_reviewed as lastReviewed, next_review as nextReview
    FROM topics WHERE title LIKE ? OR content LIKE ? LIMIT 20`,
    [`%${query}%`, `%${query}%`]
  );

  if (rows.length > 0) return rows;

  // Fallback: search demo data
  const allTopics = Object.values(DEMO_TOPICS).flat();
  return allTopics.filter(t =>
    t.title.toLowerCase().includes(query.toLowerCase()) ||
    t.content.toLowerCase().includes(query.toLowerCase())
  );
}
