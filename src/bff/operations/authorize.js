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

  if (authPassword !== user.password) {
    return {
      error: "Пароль неверный",
      response: null,
    }
  }

  return {
    error: null,
    response: {
      id: user.id,
      login: user.login,
      roleId: user.role_id,
      session: sessions.create(user),
    },
  }
}
