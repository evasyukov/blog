import { setPostData } from "./setPostData"

export function loadPostAsync(requestServer, postId) {
  return function (dispatch) {
    return requestServer("fetchPost", postId).then((postData) => {
      dispatch(setPostData(postData.response))
    })
  }
}
