const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const promotionSchema = new Schema({
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
  image: { 
    type: String // URL to an image (optional) 
  },
  termsAndConditions: { 
    type: String // Optional field for any additional terms and conditions
  },
  organizer: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  location: {
    type: {
      place_id: { type: String, 
        // required: true 
      },
      name: { type: String,
        //  required: true 
        }, // Display name or place name
      address: {
        type: String,
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
  status: {
    type: String,
    enum: ['upcoming', 'completed', 'canceled']
  },
  privacy: {
    type: String,
    enum: ['public', 'followers', 'private']
  },
  foodVenue: {
    type: Schema.Types.ObjectId,
    ref: 'FoodVenue', // Reference to the FoodVenue collection
    default: null // Set to null if no FoodVenue is provided
  },
}, { 
  timestamps: true 
});

module.exports = model('Promotion', promotionSchema);
