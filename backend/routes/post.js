const express = require("express");
const { createPost, getAllPosts, getPublicPosts } = require("../controllers/post");
const { authUser } = require("../middleware/auth")
const router = express.Router();

router.post("/createPost", authUser, createPost);
router.get("/getAllPosts", authUser, getAllPosts);
router.get("/getPublicPosts", getPublicPosts);

module.exports = router;