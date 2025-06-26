const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const eventSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    endDate: { type: Date }, // Optional end date and time
    endTime: { type: String }, // Optional end date and time
    location: {
      type: {
        place_id: { type: String },
        name: { type: String }, // Display name or place name
        address: {
          type: String, // Instead of Map
        },
        latitude: { type: Number },
        longitude: { type: Number },
      },
      required: true,
    },
    image: {
      type: String, // URL to an image (optional)
    },
    organizer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    foodVenue: {
      type: Schema.Types.ObjectId,
      ref: "FoodVenue", // Reference to the FoodVenue collection
      default: null, // Set to null if no FoodVenue is provided
    },
    status: {
      type: String,
      enum: ["upcoming", "completed", "canceled"],
    },
    privacy: {
      type: String,
      enum: ["public", "followers", "private"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Event", eventSchema);
