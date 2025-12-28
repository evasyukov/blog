import { getUser } from "./getUser"
import { addUser } from "./addUser"
import { sessions } from "./sessions"

export const server = {
  async logout(session) {
    sessions.remove(session)
  },
  async authorize(authLogin, authPassword) {
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
  },
  async registration(regLogin, regPassword) {
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
  },
}
