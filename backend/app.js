// libs
require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")

// routes
const authRoutes = require("./routes/auth")
const postRoutes = require("./routes/post")
const userRoutes = require("./routes/user")

const port = 3001
const app = express()

app.use(express.static("../frontend/dist"))

app.use(cookieParser())
app.use(express.json())

app.use("/api", authRoutes)
app.use("/api/posts", postRoutes)
app.use("/api/users", userRoutes)

// подключение к бд
mongoose.connect(process.env.DB_CONNECTION_STRING).then(() => {
  app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`)
  })
})
