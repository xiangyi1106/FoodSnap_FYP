const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const promotionSchema = new Schema({
  title: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String 
  },
  startDate: { 
    type: Date, 
    required: true 
  },
  endDate: { 
    type: Date, 
    required: true 
  },
  image: { 
    type: String // URL to an image (optional) 
  },
  isActive: { 
    type: Boolean, 
    default: true 
  },
  termsAndConditions: { 
    type: String // Optional field for any additional terms and conditions
  },
  createdBy: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  foodVenue: { 
    type: Schema.Types.ObjectId, 
    ref: 'FoodVenue' // Reference to the food venue if applicable
  },
}, { 
  timestamps: true 
});

module.exports = model('Promotion', promotionSchema);
