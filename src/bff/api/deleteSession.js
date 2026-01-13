export async function deleteSession(sessionId) {
  return fetch(`http://localhost:3005/sessions/${sessionId}`, {
    method: "DELETE",
  })
}
