import { ACTION_TYPE } from "./actionType"

export function setPostData(postData) {
  return {
    type: ACTION_TYPE.SET_POST_DATA,
    payload: postData,
  }
}
