const express = require("express");
const menteeRouter = require("../controllers/menteeController");
const router = express.Router();

router.get("/", menteeRouter.getAllMenteeUser);
router.get("/:mentee_id", menteeRouter.getMenteeUserById);
router.put("/:mentee_id", menteeRouter.updateMenteeUserById);
router.delete("/:mentee_id", menteeRouter.deleteMenteeUserById);

module.exports = router;
