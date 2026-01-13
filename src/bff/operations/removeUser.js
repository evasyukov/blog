import { deleteUser } from "../api"
import { ROLE } from "../constants"
import { sessions } from "../sessions"

export async function removeUser(hash, userId) {
  const accessRoles = [ROLE.ADMIN]

  const access = await sessions.access(hash, accessRoles)

  if (!access) {
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
