import { updatePost } from "../api"
import { ROLE } from "../constants"
import { sessions } from "../sessions"

export async function savePost(hash, newPostData) {
  const accessRoles = [ROLE.ADMIN]

  const access = await sessions.access(hash, accessRoles)

  if (!access) {
    return {
      error: "Допуступ запрещен",
      response: null,
    }
  }

  const updatedPost = await updatePost(newPostData)

  return {
    error: null,
    response: updatedPost,
  }
}
