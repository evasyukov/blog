import { ROLE } from "../constans"
import { getRoles } from "../api"
import { sessions } from "../sessions"

export async function fetchRoles(userSession) {
  const accessRoles = [ROLE.ADMIN]

  if (!sessions.access(userSession, accessRoles)) {
    return {
      error: "Допуступ запрещен",
      response: null,
    }
  }

  const roles = await getRoles()

  return {
    error: null,
    response: roles,
  }
}
