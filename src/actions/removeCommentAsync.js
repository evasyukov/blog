import { setPostData } from "./setPostData"

export function removeCommentAsync(requestServer, id, postId) {
  return function (dispatch) {
    return requestServer("removePostComment", id, postId).then(
      (postData) => {
        dispatch(setPostData(postData.response))
      }
    )
  }
}
