import { ROLE } from "../constants"
import { getUsers } from "../api"
import { sessions } from "../sessions"

export async function fetchUsers(userSession) {
  const accessRoles = [ROLE.ADMIN]

  if (!sessions.access(userSession, accessRoles)) {
    return {
      error: "Допуступ запрещен",
      response: null,
    }
  }

  const users = await getUsers()

  return {
    error: null,
    response: users,
  }
}
