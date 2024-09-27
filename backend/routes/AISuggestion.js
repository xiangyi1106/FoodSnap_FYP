const express = require("express");
const { getFoodRecommendation, getRestaurantsRecommendation } = require("../controllers/AISuggestion");
const { authUser } = require("../middleware/auth")
const router = express.Router();

router.post("/foodRecommendations", getFoodRecommendation);
router.post("/restaurantRecommendations", getRestaurantsRecommendation);

module.exports = router;