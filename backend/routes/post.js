const express = require("express")
const router = express.Router()

const hasRole = require("../middlewares/hasRole")
const authenticated = require("../middlewares/authenticated")
const ROLES = require("../constants/roles")

const {
  addPost,
  updatePost,
  deletePost,
  getPosts,
  getPost,
} = require("../controllers/post")

const { addComment, deleteComment } = require("../controllers/comment")

const mapPost = require("../helpers/mapPost")
const mapComment = require("../helpers/mapComment")

router.get("/", async (req, res) => {
  const { posts, lastPage } = await getPosts(
    req.query.search,
    req.query.limit,
    req.query.page,
  )

  res.send({
    data: {
      lastPage,
      posts: posts.map(mapPost),
    },
  })
})

router.get("/:id", async (req, res) => {
  try {
    const post = await getPost(req.params.id)

    if (!post) {
      return res.status(404).send({ error: "Пост не найден" })
    }

    res.send({
      data: mapPost(post),
    })
  } catch (e) {
    res.status(500).send({
      error: e.message,
    })
  }
})


router.use(authenticated)

router.post("/:id/comments", async (req, res) => {
  const comment = await addComment(req.params.id, {
    content: req.body.content,
    author: req.user.id,
  })

  res.send({
    data: mapComment(comment),
  })
})

router.delete(
  "/:postId/comments/:commentId",
  hasRole([ROLES.ADMIN, ROLES.MODERATOR]),
  async (req, res) => {
    await deleteComment(req.params.postId, req.params.commentId)

    res.send({ error: null })
  },
)

router.post("/", hasRole([ROLES.ADMIN]), async (req, res) => {
  const post = await addPost({
    title: req.body.title,
    content: req.body.content,
    image: req.body.imageUrl,
  })

  res.send({
    data: mapPost(post),
  })
})

router.patch("/:id", hasRole([ROLES.ADMIN]), async (req, res) => {
  const post = await updatePost(req.params.id, {
    title: req.body.title,
    content: req.body.content,
    image: req.body.imageUrl,
  })

  res.send({
    data: mapPost(post),
  })
})

router.delete("/:id", hasRole([ROLES.ADMIN]), async (req, res) => {
  await deletePost(req.params.id)
  res.send({ error: null })
})

module.exports = router
