export async function getUser(loginProps) {
  return fetch(`http://localhost:3005/users?login=${loginProps}`)
    .then((loadedUser) => loadedUser.json())
    .then(
      ([loadedUser]) =>
        loadedUser && {
          id: loadedUser.id,
          login: loadedUser.login,
          password: loadedUser.password,
          registedAt: loadedUser.registed_at,
          roleId: loadedUser.role_id,
        }
    )
}
