import { getPosts, getComments } from "../api"
import { getCommentsCount } from "../utils"

export async function fetchPosts() {
  const [posts, comments] = await Promise.all([getPosts(), getComments()])

  return {
    error: null,
    response: posts.map((post) => ({
      ...post,
      commentsCount: getCommentsCount(comments, post.id),
    })),
  }
}
