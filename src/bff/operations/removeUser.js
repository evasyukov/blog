import { deleteUser } from "../api"
import { ROLE } from "../constants"
import { sessions } from "../sessions"

export async function removeUser(userSession, userId) {
  const accessRoles = [ROLE.ADMIN]

  if (!sessions.access(userSession, accessRoles)) {
    return {
      error: "Допуступ запрещен",
      response: null,
    }
  }

  deleteUser(userId)

  return {
    error: null,
    response: true,
  }
}
