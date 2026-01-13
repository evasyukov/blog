import { ROLE } from "../constants"
import { getRoles } from "../api"
import { sessions } from "../sessions"

export async function fetchRoles(hash) {
  const accessRoles = [ROLE.ADMIN]

 const access = await sessions.access(hash, accessRoles)

  if (!access) {
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
