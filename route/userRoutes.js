const express = require("express");
const {
  register,
  login,
  profile,
} = require("../controllers/userController.js");
const authMiddleware = require("../middleware/authMiddleware.js");

const route = express();

route.post("/register", register);

route.post("/login", login);

route.get("/me", authMiddleware, profile);

module.exports = route;