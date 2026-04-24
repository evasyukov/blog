const express = require("express")
const router = express.Router()

const authenticated = require("../middlewares/authenticated")
const hasRole = require("../middlewares/hasRole")
const ROLES = require("../constants/roles")

const {
  getUsers,
  getRoles,
  deleteUser,
  updateUserRole,
} = require("../controllers/user")

const mapUser = require("../helpers/mapUser")

router.use(authenticated)
router.use(hasRole([ROLES.ADMIN]))

router.get("/", async (req, res) => {
  const users = await getUsers()

  res.send({
    data: users.map(mapUser),
  })
})

router.patch("/:id", async (req, res) => {
  const user = await updateUserRole(req.params.id, {
    role: req.body.roleId,
  })

  res.send({
    data: mapUser(user),
  })
})

router.delete("/:id", async (req, res) => {
  await deleteUser(req.params.id)

  res.send({
    error: null,
  })
})

router.get("/roles", (req, res) => {
  res.send({
    data: getRoles(),
  })
})

module.exports = router
