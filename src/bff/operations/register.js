import { getUser, addUser } from "../api"
import { sessions } from "../sessions"

export async function register(regLogin, regPassword) {
  const user = await getUser(regLogin)

  if (user) {
    return {
      error: "Такой логин уже занят",
      response: null,
    }
  }

  const newUser = await addUser(regLogin, regPassword)

  return {
    error: null,
    response: {
      id: newUser.id,
      login: newUser.login,
      roleId: newUser.role_id,
      session: sessions.create(newUser),
    },
  }
}
