import Dexie, { type EntityTable } from 'dexie';
import type { AppSettings, Exercise, UserPreferences, WorkoutSession, WorkoutTemplate } from '../types';
import { seedExercises, templates } from '../data/seed';

export class GymratsDB extends Dexie {
  exercises!: EntityTable<Exercise, 'id'>;
  templates!: EntityTable<WorkoutTemplate, 'id'>;
  sessions!: EntityTable<WorkoutSession, 'id'>;
  preferences!: EntityTable<UserPreferences, 'id'>;
  settings!: EntityTable<AppSettings, 'id'>;

  constructor() {
    super('gymrats');
    this.version(1).stores({
      exercises: 'id,workout,name,order',
      templates: 'id',
      sessions: 'id,status,letter,startedAt,completedAt',
      preferences: 'id',
      settings: 'id',
    });
  }
}

export const db = new GymratsDB();

export async function initializeDatabase() {
  await db.open();

  const state = await db.settings.get('settings');
  if (state?.seeded) return;

  await db.transaction('rw', [db.exercises, db.templates, db.preferences, db.settings], async () => {
    await db.exercises.bulkPut(seedExercises);
    await db.templates.bulkPut(templates);
    await db.preferences.put({
      id: 'user',
      name: 'Atleta',
      goal: 'Hipertrofia',
      weeklyFrequency: 5,
      soundEnabled: true,
      defaultTimerSeconds: 90,
    });
    await db.settings.put({ id: 'settings', schemaVersion: 1, seeded: true });
  });
}
