const express = require("express");
const { addHashtag, getHashtags, mentionPeople } = require("../controllers/hashtag");
const { authUser } = require("../middleware/auth")
const router = express.Router();

router.post("/addHashtag", addHashtag);
router.get("/getHashtags", getHashtags);
router.get("/mentionPeople", mentionPeople);

module.exports = router;
