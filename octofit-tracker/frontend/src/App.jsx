import { NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

function App() {
  return (
    <div className="app-shell">
      <header className="navbar navbar-expand-lg bg-dark navbar-dark">
        <div className="container">
          <NavLink className="navbar-brand fw-bold" to="/">Octofit Tracker</NavLink>
          <nav className="navbar-nav flex-row flex-wrap gap-2" aria-label="Primary navigation">
            {[
              ['Users', '/users'],
              ['Teams', '/teams'],
              ['Activities', '/activities'],
              ['Leaderboard', '/leaderboard'],
              ['Workouts', '/workouts'],
            ].map(([label, path]) => (
              <NavLink
                className={({ isActive }) => `nav-link px-2 ${isActive ? 'active' : ''}`}
                key={path}
                to={path}
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main className="container py-4">
        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
