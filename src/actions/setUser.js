import { ACTION_TYPE } from "./actionType"
export function setUser(user) {
  return {
    type: ACTION_TYPE.SET_USER,
    payload: user,
  }
}
