const express = require("express");
const router = express.Router();
const {
  getUsers,
  createUser,
  modifyUser,
  deleteUser,
} = require("../controllers/userControllers");
const { authenticate, adminOnly } = require("../middleware/authMiddleware");

router.get("/", authenticate, adminOnly, getUsers);
router.post("/", authenticate, adminOnly, createUser);
router.put("/:id", authenticate, adminOnly, modifyUser);
router.delete("/:id", authenticate, adminOnly, deleteUser);

module.exports = router;
