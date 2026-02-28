const { default: mongoose } = require("mongoose")
const mapComment = require("./mapComment")

module.exports = function (post) {
  return {
    id: post._id,
    title: post.title || "",
    imageUrl: post.image || null,
    content: post.content || "",
    publishedAt: post.createdAt || null,
    comments:
      post.comments.map((comment) =>
        mongoose.isObjectIdOrHexString(comment) ? comment : mapComment(comment),
      ) || [],
  }
}
