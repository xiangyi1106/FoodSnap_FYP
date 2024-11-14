const express = require("express");
const { createPost, getAllPosts, getPublicPosts, getPostDetails, toggleLike, getLikeStatus, sharePost, savePost, deletePost, getPostsWithLocation, getPostsByFoodVenue } = require("../controllers/post");
const { authUser } = require("../middleware/auth")
const router = express.Router();

router.post("/createPost", authUser, createPost);
router.get("/getAllPosts", authUser, getAllPosts);
router.get("/getPublicPosts", getPublicPosts);
router.get("/api/post/:id", getPostDetails);
// Route for liking/unliking a post
router.put("/likePost/:postId", authUser, toggleLike);
router.get("/getLikeStatus/:postId", authUser, getLikeStatus);
router.post("/api/posts/share/:postId", authUser, sharePost);
router.put("/savePost/:id", authUser, savePost);
router.delete("/deletePost/:id", authUser, deletePost);
router.get("/posts/user/:userId/location", authUser, getPostsWithLocation);
router.get("/getPostsByFoodVenue", getPostsByFoodVenue);


module.exports = router;