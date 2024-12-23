const express = require("express");
const { authUser } = require("../middleware/auth");
const { addFoodVenueToProfileMap, getFoodVenuesProfileMap } = require("../controllers/foodVenueMap");
const router = express.Router();

router.post("/addFoodVenueToProfileMap", authUser, addFoodVenueToProfileMap);
router.get("/getFoodVenuesProfileMap", authUser, getFoodVenuesProfileMap);

module.exports = router;