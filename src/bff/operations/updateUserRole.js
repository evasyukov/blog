import { setUserRole } from "../api"
import { ROLE } from "../constants"
import { sessions } from "../sessions"

export async function updateUserRole(userSession, userId, newUserRoleId) {
  const accessRoles = [ROLE.ADMIN]

  if (!sessions.access(userSession, accessRoles)) {
    return {
      error: "Допуступ запрещен",
      response: null,
    }
  }

  setUserRole(userId, newUserRoleId)

  return {
    error: null,
    response: true,
  }
}
