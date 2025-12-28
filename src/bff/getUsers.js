export async function getUsers() {
  const loadedUsers = await fetch("http://localhost:3005/users")
  return loadedUsers.json()
}
