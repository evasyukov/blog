export function deletePost(postId) {
  return fetch(`http://localhost:3005/posts/${postId}`, {
    method: "DELETE",
  })
}
