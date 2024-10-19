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
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  endDate: { type: Date }, // Optional end date and time
  endTime: { type: String }, // Optional end date and time
  // placeName: { type: String }, // Name of the place or venue
  // address: {
  //   street: { type: String },
  //   city: { type: String },
  //   state: { type: String },
  //   postalCode: { type: String },
  //   country: { type: String },
  // },
  location: {
    type: {
      place_id: { type: String, 
        // required: true 
      },
      name: { type: String,
        //  required: true 
        }, // Display name or place name
      address: {
        type: Object, // Instead of Map
        // required: true
      },
      latitude: { type: Number, 
        // required: true 
      },
      longitude: { type: Number,
        //  required: true 
        }
    },
    required: true
  },
  image: {
    type: String // URL to an image (optional) 
  },
  // organizers: [{
  //   type: Schema.Types.ObjectId,
  //   ref: 'User'
  // }],
  organizer: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  // foodVenue: [{
  //   type: Schema.Types.ObjectId,
  //   ref: 'FoodVenue' // Reference to the food venue if applicable
  // }],
  // tags: [{ type: String }],
  status: {
    type: String,
    enum: ['upcoming', 'completed', 'canceled']
  },
  privacy: {
    type: String,
    enum: ['public', 'followers', 'private']
  },
}, {
  timestamps: true
});

module.exports = model('Event', eventSchema);
