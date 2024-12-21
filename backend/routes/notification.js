const express = require("express");
const { authUser } = require("../middleware/auth");
const { getNotifications, markNotificationAsRead } = require("../controllers/notification");
const router = express.Router();

router.get("/getNotifications/:userId", authUser, getNotifications);
router.put("/notifications/:id/mark-as-read", authUser, markNotificationAsRead);

module.exports = router;