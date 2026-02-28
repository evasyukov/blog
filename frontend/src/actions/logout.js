import { request } from "../utils/request"
import { ACTION_TYPE } from "./actionType"

export function logout() {
  request("/api/logout", "POST")

  return {
    type: ACTION_TYPE.LOGOUT,
  }
}
