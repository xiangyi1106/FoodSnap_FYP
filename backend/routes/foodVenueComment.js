const express = require("express");
const {  } = require("../controllers/foodVenue");
const { authUser } = require("../middleware/auth");
const { getFoodVenueComments, addFoodVenueComment, addFoodVenueReview, addFoodVenueReply } = require("../controllers/foodVenueComment");
const router = express.Router();

router.post("/:placeId/comments/:commentId?", authUser, addFoodVenueComment);
router.post("/:placeId/addReview", authUser, addFoodVenueReview);
router.get("/:placeId/comments", authUser, getFoodVenueComments);
router.post('/comment/:reviewId/reply', addFoodVenueReply);

module.exports = router;