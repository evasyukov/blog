const User = require("../models/User")
const { verify } = require("../helpers/token")

module.exports = async function (req, res, next) {
  try {
    const token = req.cookies.token

    if (!token) {
      return res.status(401).send({ error: "Токен отсутствует" })
    }

    const tokenData = verify(token)

    const user = await User.findOne({ _id: tokenData.id })

    if (!user) {
      return res.send({ error: "Авторизованный пользователь не найден" })
    }

    req.user = user

    next()
  } catch (e) {
    return res.status(401).send({ error: "Неверный токен" })
  }
}