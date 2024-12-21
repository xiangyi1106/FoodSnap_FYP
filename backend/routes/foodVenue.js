const express = require("express");
const { saveFoodVenues, getFoodVenues, getFoodVenueDetails, updateFoodVenueDetails, updateMenu, searchFoodVenue, getAllFoodVenues, createFoodVenue } = require("../controllers/foodVenue");
const { authUser } = require("../middleware/auth")
const router = express.Router();

router.post("/saveFoodVenues", authUser, saveFoodVenues);

router.post("/createFoodVenue", authUser, createFoodVenue);

router.get("/getFoodVenues", authUser, getFoodVenues);

router.get("/getAllFoodVenues", authUser, getAllFoodVenues);

router.get("/api/foodVenue/:id", authUser, getFoodVenueDetails);

router.put("/api/food-venue/update/:id", authUser, updateFoodVenueDetails);

router.put("/api/food-venue/menu/update/:placeId", authUser, updateMenu);

router.get("/api/search/foodVenue", authUser, searchFoodVenue);

module.exports = router;