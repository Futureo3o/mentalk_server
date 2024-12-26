const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.post("/", adminController.createAdminUser);

module.exports = router;
