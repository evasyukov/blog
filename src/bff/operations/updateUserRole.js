import { setUserRole } from "../api"
import { ROLE } from "../constants"
import { sessions } from "../sessions"

export async function updateUserRole(hash, userId, newUserRoleId) {
  const accessRoles = [ROLE.ADMIN]

  const access = await sessions.access(hash, accessRoles)

  if (!access) {
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
