const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.get("/", adminController.getAllAdminUser);
router.get("/:admin_id", adminController.getAdminById);

module.exports = router;
