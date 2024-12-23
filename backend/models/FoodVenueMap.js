const mongoose = require("mongoose");

const foodVenueMapSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: { type: String, required: true },
  address: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  description: { type: String},
  venueImage: { type: String, default: "" },
}, {
    timestamps: true,
});

module.exports = mongoose.model("FoodVenueMap", foodVenueMapSchema);
