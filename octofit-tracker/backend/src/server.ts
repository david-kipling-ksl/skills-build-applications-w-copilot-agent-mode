import express from 'express';
import './config/database.js';
import { Activity, LeaderboardEntry, Team, User, Workout } from './models/index.js';

const app = express();
const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;

const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use(express.json()); 

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', service: 'octofit-backend', baseUrl });
});

app.get(['/api/users', '/api/users/'], async (_request, response) => {
  const users = await User.find({}).lean();
  response.json(users);
});

app.get(['/api/teams', '/api/teams/'], async (_request, response) => {
  const teams = await Team.find({}).lean();
  response.json(teams);
});

app.get(['/api/activities', '/api/activities/'], async (_request, response) => {
  const activities = await Activity.find({}).populate('userId').lean();
  response.json(activities);
});

app.get(['/api/leaderboard', '/api/leaderboard/'], async (_request, response) => {
  const leaderboard = await LeaderboardEntry.find({}).sort({ rank: 1 }).lean();
  response.json(leaderboard);
});

app.get(['/api/workouts', '/api/workouts/'], async (_request, response) => {
  const workouts = await Workout.find({}).lean();
  response.json(workouts);
});

app.listen(port, () => {
  console.log(`Octofit backend listening on port ${port}`);
  console.log(`API base URL: ${baseUrl}`);
});
