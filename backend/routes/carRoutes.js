const express = require("express");
const router = express.Router();
const {
  getCars,
  createCar,
  deleteCar,
  modifyCar,
} = require("../controllers/carControllers.js");
const {
  authenticate,
  adminOrContributor,
} = require("../middleware/authMiddleware");

router.get("/", getCars);
router.post("/", authenticate, adminOrContributor, createCar);
router.delete("/:id", authenticate, adminOrContributor, deleteCar);
router.put("/:id", authenticate, adminOrContributor, modifyCar);

module.exports = router;
