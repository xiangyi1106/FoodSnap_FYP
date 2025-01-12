const Notification = require("../models/Notification");
const User = require("../models/User");

exports.getNotifications = async (req, res) => {
    try {
        const { userId } = req.params;
        // console.log("Received userId:", userId);

        const notifications = await Notification.find({ userId })
            .sort({ createdAt: -1 })
            .populate("fromUserId", "name picture username gender");
        if (notifications.length === 0) {
            return res.json([]);
        }

        res.json(notifications);
    } catch (error) {
        console.error("Error fetching notifications:", error);
        return res.status(500).json({ message: error.message });
    }
};


exports.markNotificationAsRead = async (req, res) => {
    try {
        const { id } = req.params;
    
        const updatedNotification = await Notification.findByIdAndUpdate(
          id,
          { isRead: true },
          { new: true }
        );
    
        if (!updatedNotification) {
          return res.status(404).json({ message: "Notification not found" });
        }
    
        res.json(updatedNotification);
      } catch (err) {
        res.status(500).json({ message: "Failed to update notification", error: err });
      }
};
