import { request } from "../utils/request"
import { addComment } from "./addComment"

export function addCommentAsync(postId, content) {
  console.log({ content })

  return async function (dispatch) {
    const comment = await request(`/api/posts/${postId}/comments`, "POST", {
      content,
    })
    dispatch(addComment(comment.data))
  }
}
