const express = require("express");
const { addEvent, getPublicEvents, getEventDetails, searchEvent, updateEvent } = require("../controllers/event");
const { authUser } = require("../middleware/auth")
const router = express.Router();

router.post("/addEvent", authUser, addEvent);
router.get("/getPublicEvents", getPublicEvents);
router.get("/api/event/search", searchEvent);
router.get("/api/event/:id", getEventDetails);
router.put('/api/event/update/:id', authUser, updateEvent);

module.exports = router;