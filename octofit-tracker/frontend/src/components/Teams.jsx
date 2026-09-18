import { useEffect, useState } from 'react'
import { fetchItems } from '../api.js'

function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { const controller = new AbortController(); fetchItems('teams', controller.signal).then(setTeams).catch((reason) => { if (reason.name !== 'AbortError') setError(reason.message) }); return () => controller.abort() }, [])
  return <section><h1 className="h2 mb-3">Teams</h1>{error && <div className="alert alert-warning">{error}</div>}<div className="row g-3">{teams.map((team) => <article className="col-md-6 col-xl-4" key={team._id}><div className="card h-100"><div className="card-body"><h2 className="h5">{team.name}</h2><p className="mb-1">Focus: {team.focus}</p><p className="text-body-secondary mb-0">{team.members ?? 0} members</p></div></div></article>)}{!teams.length && <p className="text-body-secondary">No teams available.</p>}</div></section>
}
export default Teams