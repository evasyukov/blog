module.exports = function (comment) {
  return {
    content: comment.content,
    author: comment.author?.login || "Удалённый пользователь",
    id: comment._id,
    publishedAt: comment.createdAt,
  }
}
