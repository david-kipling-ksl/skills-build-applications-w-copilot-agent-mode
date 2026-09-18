const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

export function getItems(payload) {
  if (Array.isArray(payload)) return payload
  if (!payload || typeof payload !== 'object') return []

  for (const key of ['items', 'data', 'results', 'docs']) {
    if (Array.isArray(payload[key])) return payload[key]
  }

  return []
}

export async function fetchItems(resource, signal) {
  const response = await fetch(`${apiBaseUrl}/${resource}/`, { signal })
  if (!response.ok) throw new Error(`Unable to load ${resource} (${response.status})`)
  return getItems(await response.json())
}