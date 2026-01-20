import { getPosts, getComments } from "../api"
import { getCommentsCount } from "../utils"

export async function fetchPosts(page, limit) {
  const [{ posts, links }, comments] = await Promise.all([
    getPosts(page, limit),
    getComments(),
  ])

  return {
    error: null,
    response: {
      posts: posts.map((post) => ({
        ...post,
        commentsCount: getCommentsCount(comments, post.id),
      })),
      links,
    },
  }
}
