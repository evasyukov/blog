import { request } from "../utils/request"
import { setPostData } from "./setPostData"

export function loadPostAsync(postId) {
  return async function (dispatch) {
    const postData = await request(`/api/posts/${postId}`)
    if (postData.data) {
      dispatch(setPostData(postData.data))
    }
    return postData
  }
}
