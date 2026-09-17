import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models/index.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      { name: 'Ada Lovelace', email: 'ada@example.com', role: 'admin' },
      { name: 'Grace Hopper', email: 'grace@example.com', role: 'coach' },
      { name: 'Linus Torvalds', email: 'linus@example.com', role: 'member' },
    ]);

    await Team.insertMany([
      { name: 'Trailblazers', members: 12, focus: 'endurance' },
      { name: 'Velocity', members: 9, focus: 'strength' },
      { name: 'Recovery Crew', members: 7, focus: 'mobility' },
    ]);

    await Activity.insertMany([
      { userId: users[0]._id, type: 'run', durationMinutes: 35, calories: 420 },
      { userId: users[1]._id, type: 'strength', durationMinutes: 50, calories: 510 },
      { userId: users[2]._id, type: 'cycling', durationMinutes: 40, calories: 390 },
    ]);

    await LeaderboardEntry.insertMany([
      { rank: 1, name: 'Ada Lovelace', points: 1240 },
      { rank: 2, name: 'Grace Hopper', points: 1185 },
      { rank: 3, name: 'Linus Torvalds', points: 1120 },
    ]);

    await Workout.insertMany([
      { title: '5K Tempo Run', difficulty: 'intermediate', durationMinutes: 30 },
      { title: 'Upper Body Builder', difficulty: 'advanced', durationMinutes: 45 },
      { title: 'Mobility Reset', difficulty: 'beginner', durationMinutes: 20 },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
