const express = require("express");
const { getCoordinates, getLocation } = require("../controllers/Map");
const { authUser } = require("../middleware/auth")
const router = express.Router();

router.post("/api/coordinates", getCoordinates);
router.post("/api/reverse-geocode", getLocation);

module.exports = router;