const express = require("express");
const authMiddleware = require("../middleware/authMiddleware.js");
const adminMiddleware = require("../middleware/roleMiddleware.js");
const { deleteUser, allUser } = require("../controller/adminController.js");

const route = express();

route.post("/users", authMiddleware, adminMiddleware, allUser);
route.delete("/user:id", authMiddleware, adminMiddleware, deleteUser);

module.exports = route;