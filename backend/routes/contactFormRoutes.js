const express = require("express");
const router = express.Router();
const {
  getContactForms,
  createForm,
  modifyForm,
  deleteForm,
} = require("../controllers/contactFormControllers");
const { authenticate, adminOnly } = require("../middleware/authMiddleware");

router.get("/", authenticate, adminOnly, getContactForms);
router.post("/", createForm);
router.put("/:id", authenticate, adminOnly, modifyForm);
router.delete("/:id", authenticate, adminOnly, deleteForm);

module.exports = router;
