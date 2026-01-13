import { setPostData } from "./setPostData"

export function addCommentAsync(requestServer, postId, userId, content) {
  return function (dispatch) {
    return requestServer("addPostComment", postId, userId, content).then(
      (postData) => {
        dispatch(setPostData(postData.response))
      }
    )
  }
}
