import { deleteComment, getPost } from "../api"
import { ROLE } from "../constants"
import { sessions } from "../sessions"
import { getAuthorComments } from "../utils"

export async function removePostComment(hash, id, postId) {
  const accessRoles = [ROLE.ADMIN, ROLE.MODERATOR]

  const access = await sessions.access(hash, accessRoles)

  if (!access) {
    return {
      error: "Допуступ запрещен",
      response: null,
    }
  }

  await deleteComment(id)

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
