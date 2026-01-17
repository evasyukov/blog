import { deletePost, getComments, deleteComment } from "../api"
import { ROLE } from "../constants"
import { sessions } from "../sessions"

export async function removePost(hash, id) {
  const accessRoles = [ROLE.ADMIN]

  const access = await sessions.access(hash, accessRoles)

  if (!access) {
    return {
      error: "Допуступ запрещен",
      response: null,
    }
  }

  await deletePost(id)

  const comments = await getComments(id)

  Promise.all(comments.map(({ id: commentId }) => deleteComment(commentId)))

  return {
    error: null,
    response: true,
  }
}
