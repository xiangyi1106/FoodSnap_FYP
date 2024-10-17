const express = require("express");
const { addEvent, getPublicEvents, getEventDetails, searchEvent } = require("../controllers/event");
const { authUser } = require("../middleware/auth")
const router = express.Router();

router.post("/addEvent", authUser, addEvent);
router.get("/getPublicEvents", getPublicEvents);
router.get("/api/event/search", searchEvent);
router.get("/api/event/:id", getEventDetails);

module.exports = router;