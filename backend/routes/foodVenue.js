const express = require("express");
const { saveFoodVenues, getFoodVenues, getFoodVenueDetails } = require("../controllers/foodVenue");
const { authUser } = require("../middleware/auth")
const router = express.Router();

router.post("/saveFoodVenues", authUser, saveFoodVenues);

router.get("/getFoodVenues", authUser, getFoodVenues);

router.get("/api/foodVenue/:id", authUser, getFoodVenueDetails);

module.exports = router;