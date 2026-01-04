import { sessions } from "../sessions"

export async function logout(session) {
  return sessions.remove(session)
}
