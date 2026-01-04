import { getUser } from "../api"
import { sessions } from "../sessions"

export async function authorize(authLogin, authPassword) {
  const user = await getUser(authLogin)

  if (!user) {
    return {
      error: "Пользователь не найден",
      response: null,
    }
  }

  const { id, login, password, roleId } = user

  if (authPassword !== password) {
    return {
      error: "Пароль неверный",
      response: null,
    }
  }

  return {
    error: null,
    response: {
      id,
      login,
      roleId,
      session: sessions.create(user),
    },
  }
}
