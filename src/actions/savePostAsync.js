import { setPostData } from "./setPostData"

export function savePostAsync(requestServer, newPostData) {
  return function (dispatch) {
    return requestServer("savePost", newPostData).then((updatedPost) => {
      dispatch(setPostData(updatedPost.response))
    })
  }
}
