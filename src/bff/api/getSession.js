import { transformSession } from "../transformers"

export async function getSession(hash) {
  return fetch(`http://localhost:3005/sessions?hash=${hash}`)
    .then((loadedSession) => loadedSession.json())
    .then(([loadedSession]) => loadedSession && transformSession(loadedSession))
}
