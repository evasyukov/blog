import { addComment, getPost } from "../api"
import { ROLE } from "../constants"
import { sessions } from "../sessions"
import { getAuthorComments } from "../utils"

export async function addPostComment(hash, postId, userId, content) {
  const accessRoles = [ROLE.ADMIN, ROLE.MODERATOR, ROLE.READER]

  const access = await sessions.access(hash, accessRoles)

  if (!access) {
    return {
      error: "Допуступ запрещен",
      response: null,
    }
  }

  await addComment(postId, userId, content)

  const post = await getPost(postId)

  const authorComments = await getAuthorComments(postId)

  return {
    error: null,
    response: {
      ...post,
      comments: authorComments,
    },
  }
}
