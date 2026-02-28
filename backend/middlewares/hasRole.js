module.exports = function (roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      res.status(401).json({ message: "Unauthorized" })
    } else {
      next()
    }
  }
}
