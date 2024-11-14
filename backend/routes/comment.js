const express = require("express");
const { addComment, addCommentReply, getComments } = require("../controllers/comment");
const { authUser } = require("../middleware/auth")
const router = express.Router();

router.put("/addComment", authUser, addComment);
router.put("/addCommentReply", authUser, addCommentReply);
router.get("/getComments/:postId", authUser, getComments);

module.exports = router;