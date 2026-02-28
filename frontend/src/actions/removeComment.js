import { ACTION_TYPE } from "./actionType"

export function removeComment(commentId) {
  return {
    type: ACTION_TYPE.REMOVE_COMMENT,
    payload: commentId,
  }
}
