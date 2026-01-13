import { ROLE } from "../constants"
import { getUsers } from "../api"
import { sessions } from "../sessions"

export async function fetchUsers(hash) {
  const accessRoles = [ROLE.ADMIN]

  const access = await sessions.access(hash, accessRoles)

  if (!access) {
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
