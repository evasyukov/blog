export async function getUser(loginProps) {
  return fetch(`http://localhost:3005/users?login=${loginProps}`)
    .then((loadedUser) => loadedUser.json())
    .then(([loadedUser]) => loadedUser)
}