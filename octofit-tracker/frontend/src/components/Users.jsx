import { useEffect, useState } from 'react'
import { fetchItems } from '../api.js'

function Users() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    fetchItems('users', controller.signal).then(setUsers).catch((reason) => {
      if (reason.name !== 'AbortError') setError(reason.message)
    })
    return () => controller.abort()
  }, [])

  return <ResourceTable title="Users" error={error} columns={['Name', 'Email', 'Role']} rows={users.map((user) => [user.name, user.email, user.role])} />
}

function ResourceTable({ title, error, columns, rows }) {
  return <section><div className="d-flex justify-content-between align-items-center mb-3"><h1 className="h2 mb-0">{title}</h1><span className="badge text-bg-secondary">{rows.length} records</span></div>{error && <div className="alert alert-warning">{error}</div>}<div className="table-responsive"><table className="table table-striped align-middle"><thead><tr>{columns.map((column) => <th key={column}>{column}</th>)}</tr></thead><tbody>{rows.length ? rows.map((row, index) => <tr key={index}>{row.map((value, cellIndex) => <td key={cellIndex}>{value ?? '-'}</td>)}</tr>) : <tr><td className="text-body-secondary" colSpan={columns.length}>No records available.</td></tr>}</tbody></table></div></section>
}

export default Users