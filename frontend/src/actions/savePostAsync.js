import { request } from "../utils/request"
import { setPostData } from "./setPostData"

export function savePostAsync(id, newPostData) {
  return function (dispatch) {
    const saveRequest = id
      ? request(`/api/posts/${id}`, "PATCH", newPostData)
      : request(`/api/posts/`, "POST", newPostData)

    return saveRequest.then(function (updatedPost) {
      dispatch(setPostData(updatedPost.data))
      return updatedPost.data
    })
  }
}
