import Dexie, { type Table } from 'dexie';

export interface Sample {
  id?: number;
  sessionId: string;
  label: string;
  source: 'preset' | 'live';
  imageBlob: Blob;
  imageUrl?: string;
  createdAt: Date;
}

export interface Prediction {
  id?: number;
  sessionId: string;
  predictedLabel: string;
  confidence: number;
  teacherMarkedCorrect?: boolean;
  mistakeReasons?: string[];
  createdAt: Date;
}

class LeafTrainerDB extends Dexie {
  samples!: Table<Sample>;
  predictions!: Table<Prediction>;

  constructor() {
    super('LeafTrainerDB');
    this.version(1).stores({
      samples: '++id, sessionId, label, source, createdAt',
      predictions: '++id, sessionId, createdAt',
    });
  }
}

export const db = new LeafTrainerDB();

export function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
}

export async function getSessionSampleCounts(sessionId: string): Promise<Record<string, number>> {
  const counts: Record<string, number> = {
    long_leaf: 0,
    round_leaf: 0,
    tooth_leaf: 0,
    big_leaf: 0,
  };
  const samples = await db.samples.where('sessionId').equals(sessionId).toArray();
  for (const s of samples) {
    if (counts[s.label] !== undefined) {
      counts[s.label]++;
    }
  }
  return counts;
}

export async function getSessionPredictionStats(sessionId: string): Promise<{
  total: number;
  correct: number;
  wrong: number;
  reasons: Record<string, number>;
}> {
  const preds = await db.predictions.where('sessionId').equals(sessionId).toArray();
  const total = preds.length;
  const correct = preds.filter(p => p.teacherMarkedCorrect === true).length;
  const wrong = preds.filter(p => p.teacherMarkedCorrect === false).length;
  const reasons: Record<string, number> = {};
  for (const p of preds) {
    if (p.mistakeReasons) {
      for (const r of p.mistakeReasons) {
        reasons[r] = (reasons[r] || 0) + 1;
      }
    }
  }
  return { total, correct, wrong, reasons };
}

export async function clearSessionData(sessionId: string): Promise<void> {
  await db.samples.where('sessionId').equals(sessionId).delete();
  await db.predictions.where('sessionId').equals(sessionId).delete();
}

export async function clearAllData(): Promise<void> {
  await db.samples.clear();
  await db.predictions.clear();
}

export async function hasAnyData(): Promise<boolean> {
  const count = await db.samples.count();
  return count > 0;
}

export async function getLatestSessionId(): Promise<string | null> {
  const last = await db.samples.orderBy('createdAt').last();
  return last?.sessionId ?? null;
}
