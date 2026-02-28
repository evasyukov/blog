import { ACTION_TYPE } from "./actionType"

export function addComment(comment) {
  return {
    type: ACTION_TYPE.ADD_COMMENT,
    payload: comment,
  }
}
