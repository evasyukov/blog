import { getUser, addUser, createSession } from "./bff"

export const server = {
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
      response: createSession(user.role_id),
    }
  },
  async registration(regLogin, regPassword) {
    const user = await getUser(regPassword)

    if (user) {
      return {
        error: "Такой логин уже занят",
        response: null,
      }
    }

    await addUser(regLogin, regPassword)

    return {
      error: null,
      response: createSession(user.role_id),
    }
  },
}
