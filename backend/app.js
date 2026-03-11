// libs
require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")

// middlewares
const hasRole = require("./middlewares/hasRole")
const authenticated = require("./middlewares/authenticated")
const ROLES = require("./constants/roles")

// controllers
const {
  register,
  login,
  getUsers,
  getRoles,
  deleteUser,
  updateUserRole,
} = require("./controllers/user")

const {
  addPost,
  updatePost,
  deletePost,
  getPosts,
  getPost,
} = require("./controllers/post")

const { addComment, deleteComment } = require("./controllers/comment")

// helpers
const mapUser = require("./helpers/mapUser")
const mapPost = require("./helpers/mapPost")
const mapComment = require("./helpers/mapComment")

const port = 3001
const app = express()

app.use(express.static("../frontend/dist"))

app.use(cookieParser())
app.use(express.json())

app.post("/register", async (req, res) => {
  console.log("Body:", req.body)
  try {
    const { user, token } = await register(req.body.login, req.body.password)

    res
      .cookie("token", token, { httpOnly: true })
      .send({ error: null, user: mapUser(user) })
  } catch (e) {
    console.error(e)
    res.status(400).send({ error: e.message || "Неизвестная ошибка" })
  }
})

app.post("/login", async (req, res) => {
  try {
    const { user, token } = await login(req.body.login, req.body.password)

    res
      .cookie("token", token, { httpOnly: true })
      .send({ error: null, user: mapUser(user) })
  } catch (e) {
    res.status(400).send({ error: e.message || "Неизвестная ошибка" })
  }
})

app.post("/logout", async (req, res) => {
  res.cookie("token", "", { httpOnly: true }).send({})
})

// получение постов
app.get("/posts", async (req, res) => {
  const { posts, lastPage } = await getPosts(
    req.query.search,
    req.query.limit,
    req.query.page,
  )

  res.send({ data: { lastPage, posts: posts.map(mapPost) } })
})

app.get("/posts/:id", async (req, res) => {
  try {
    const post = await getPost(req.params.id)

    if (!post) {
      return res.status(404).send({ error: "Пост не найден" })
    }

    res.send({ data: mapPost(post) })
  } catch (e) {
    console.error("Ошибка получения поста:", e)
    res.status(500).send({ error: e.message })
  }
})

// аунтификация
app.use(authenticated)

// посты
app.post("/posts/:id/comments", async (req, res) => {
  const newComment = await addComment(req.params.id, {
    content: req.body.content,
    author: req.user.id,
  })

  res.send({ data: mapComment(newComment) })
})

app.delete(
  "/posts/:postId/comments/:commentId",
  hasRole([ROLES.ADMIN, ROLES.MODERATOR]),
  async (req, res) => {
    await deleteComment(req.params.postId, req.params.commentId)

    res.send({ error: null })
  },
)

app.post("/posts", hasRole([ROLES.ADMIN]), async (req, res) => {
  const newPost = await addPost({
    title: req.body.title,
    content: req.body.content,
    image: req.body.imageUrl,
  })

  res.send({ data: mapPost(newPost) })
})

app.patch("/posts/:id", hasRole([ROLES.ADMIN]), async (req, res) => {
  const updatedPost = await updatePost(req.params.id, {
    title: req.body.title,
    content: req.body.content,
    image: req.body.imageUrl,
  })

  res.send({ data: mapPost(updatedPost) })
})

app.delete("/posts/:id", hasRole([ROLES.ADMIN]), async (req, res) => {
  await deletePost(req.params.id)

  res.send({ error: null })
})

// пользователи
app.get("/users", hasRole([ROLES.ADMIN]), async (req, res) => {
  const users = await getUsers()

  res.send({ data: users.map(mapUser) })
})

app.patch("/users/:id", hasRole([ROLES.ADMIN]), async (req, res) => {
  const newUser = await updateUserRole(req.params.id, {
    role: req.body.roleId,
  })

  res.send({ data: mapUser(newUser) })
})

app.delete("/users/:id", hasRole([ROLES.ADMIN]), async (req, res) => {
  await deleteUser(req.params.id)

  res.send({ error: null })
})

app.get("/users/roles", hasRole([ROLES.ADMIN]), async (req, res) => {
  const roles = getRoles()

  res.send({ data: roles })
})

// подключение к бд
mongoose.connect(process.env.DB_CONNECTION_STRING).then(() => {
  app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`)
  })
})
