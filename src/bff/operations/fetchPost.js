import { getPost } from "../api"

export async function fetchPost(postId) {
  const post = await getPost(postId)

  return {
    error: null,
    response: post,
  }
}
