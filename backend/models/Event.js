const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const eventSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  startDateTime: {
    type: Date,
    required: true
  },
  endDateTime: { type: Date }, // Optional end date and time
  placeName: { type: String }, // Name of the place or venue
  address: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    postalCode: { type: String },
    country: { type: String },
  },
  image: {
    type: String // URL to an image (optional) 
  },
  organizers: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  foodVenue: [{
    type: Schema.Types.ObjectId,
    ref: 'FoodVenue' // Reference to the food venue if applicable
  }],
  tags: [{ type: String }],
  status: {
    type: String,
    enum: ['upcoming', 'completed', 'canceled']
  },
}, {
  timestamps: true
});

module.exports = model('Event', eventSchema);
