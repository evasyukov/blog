export async function getComments(postId) {
  const loadedComments = await fetch(
    `http://localhost:3005/comments?post_id=${postId}`
  )
  return loadedComments.json()
}
