import { useEffect, useState } from 'react'
import { fetchItems } from '../api.js'

function Activities() {
  const [activities, setActivities] = useState([]); const [error, setError] = useState('')
  useEffect(() => { const controller = new AbortController(); fetchItems('activities', controller.signal).then(setActivities).catch((reason) => { if (reason.name !== 'AbortError') setError(reason.message) }); return () => controller.abort() }, [])
  return <section><h1 className="h2 mb-3">Activities</h1>{error && <div className="alert alert-warning">{error}</div>}<div className="table-responsive"><table className="table table-striped"><thead><tr><th>Activity</th><th>User</th><th>Duration</th><th>Calories</th></tr></thead><tbody>{activities.length ? activities.map((activity) => <tr key={activity._id}><td>{activity.type}</td><td>{activity.userId?.name ?? activity.userId ?? '-'}</td><td>{activity.durationMinutes} min</td><td>{activity.calories}</td></tr>) : <tr><td colSpan="4" className="text-body-secondary">No activities available.</td></tr>}</tbody></table></div></section>
}
export default Activities