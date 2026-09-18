import { useEffect, useState } from 'react'
import { fetchItems } from '../api.js'

function Workouts() {
  const [workouts, setWorkouts] = useState([]); const [error, setError] = useState('')
  useEffect(() => { const controller = new AbortController(); fetchItems('workouts', controller.signal).then(setWorkouts).catch((reason) => { if (reason.name !== 'AbortError') setError(reason.message) }); return () => controller.abort() }, [])
  return <section><h1 className="h2 mb-3">Workouts</h1>{error && <div className="alert alert-warning">{error}</div>}<div className="row g-3">{workouts.map((workout) => <article className="col-md-6 col-xl-4" key={workout._id}><div className="card h-100"><div className="card-body"><h2 className="h5">{workout.title}</h2><p className="mb-1">{workout.difficulty}</p><p className="text-body-secondary mb-0">{workout.durationMinutes} minutes</p></div></div></article>)}{!workouts.length && <p className="text-body-secondary">No workouts available.</p>}</div></section>
}
export default Workouts