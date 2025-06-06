const mongoose = require("mongoose");
const { Schema, model } = mongoose;

// Notification Schema
const notificationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true }, // e.g., 'like', 'new_post', 'follow', etc.
    fromUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: false },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
  }, { 
    timestamps: true 
  });
  
module.exports = model('Notification', notificationSchema);
