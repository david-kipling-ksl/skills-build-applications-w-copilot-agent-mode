import { useEffect, useState } from 'react'
import { fetchItems } from '../api.js'

function Leaderboard() {
  const [entries, setEntries] = useState([]); const [error, setError] = useState('')
  useEffect(() => { const controller = new AbortController(); fetchItems('leaderboard', controller.signal).then(setEntries).catch((reason) => { if (reason.name !== 'AbortError') setError(reason.message) }); return () => controller.abort() }, [])
  return <section><h1 className="h2 mb-3">Leaderboard</h1>{error && <div className="alert alert-warning">{error}</div>}<div className="list-group">{entries.length ? entries.map((entry) => <div className="list-group-item d-flex justify-content-between" key={entry._id}><span><strong>#{entry.rank}</strong> {entry.name}</span><span>{entry.points} points</span></div>) : <p className="text-body-secondary">No leaderboard entries available.</p>}</div></section>
}
export default Leaderboard