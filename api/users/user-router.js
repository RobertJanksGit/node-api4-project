const express = require("express");
const Users = require("./users-model");
const {
  validatePassword,
  validateUsername,
  authenticateUser,
} = require("../middleware/middleware");

const router = express.Router();

router.get("/users", async (req, res, next) => {
  try {
    req.body = await Users.get();
    res.status(200).json(req.body);
  } catch (err) {
    next(err);
  }
});

router.post(
  "/users",
  [validatePassword, validateUsername],
  async (req, res, next) => {
    try {
      const newUser = await Users.register(req.body);
      res.status(200).json(newUser);
    } catch (err) {
      next(err);
    }
  }
);
router.post("/login", authenticateUser, async (req, res, next) => {
  try {
    res.status(200).json(`Welcome ${req.body.username}`);
  } catch (err) {
    next(err);
  }
});

router.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
});
module.exports = router;
