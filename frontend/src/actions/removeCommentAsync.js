import { request } from "../utils/request"
import { removeComment } from "./removeComment"

export function removeCommentAsync(id, postId) {
  return function (dispatch) {
    return request(`/api/posts/${postId}/comments/${id}`, "DELETE").then(() => {
      dispatch(removeComment(id))
    })
  }
}
