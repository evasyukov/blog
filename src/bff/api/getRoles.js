export async function getRoles() {
  const loadedRoles = await fetch("http://localhost:3005/roles")
  return loadedRoles.json()
}
