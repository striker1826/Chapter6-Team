const express = require("express");
const router = express.Router();
const MembersController = require("../controller/members");
const membersController = new MembersController();

router.post("/signup", membersController.SignupMember);
router.post("/login", membersController.loginMember);
router.patch("/signup", membersController.updateMember);
router.delete("/signup", membersController.deleteMember);

module.exports = router;
