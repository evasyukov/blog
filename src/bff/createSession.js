import { removeComment } from "./session"
import { ROLE } from "../constans"

export function createSession(roleId) {
  let session = {
    logout() {
      Object.keys(session).forEach((key) => {
        delete session[key]
      })
    },
  }

  switch (roleId) {
    case ROLE.ADMIN: {
      session.removeComment = removeComment
      break
    }

    case ROLE.MODERATOR: {
      session.removeComment = removeComment
      break
    }

    case ROLE.READER: {
      break
    }

    default:
      console.log("Ошибка выбора роли")
  }

  return session
}
