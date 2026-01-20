import { getPost, getComments, getUsers } from "../api"

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

  const comments = await getComments(postId)
  const users = await getUsers()

  const authorComments = comments.map((comment) => {
    const user = users.find(({ id }) => id === comment.authorId)

    return {
      ...comment,
      author: user?.login,
    }
  })

  return {
    error: null,
    response: {
      ...post,
      comments: authorComments,
    },
  }
}
