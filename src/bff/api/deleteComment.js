export function deleteComment(commentId) {
  return fetch(`http://localhost:3005/comments/${commentId}`, {
    method: "DELETE",
  })
}
