import { sessions } from "../sessions"

export async function logout(userSession) {
  return sessions.remove(userSession)
}
