import { getPost } from "../api"
import { getAuthorComments } from "../utils"

export async function fetchPost(postId) {
  let post
  let error

  try {
    post = await getPost(postId)
  } catch (postError) {
    error = postError
  }

  if (error) {
    return {
      error,
      response: null,
    }
  }

  const authorComments = await getAuthorComments(postId)

  return {
    error: null,
    response: {
      ...post,
      comments: authorComments,
    },
  }
}
