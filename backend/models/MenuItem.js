// menuItem.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const menuItemSchema = new Schema({
  name: { type: String, required: true },
  // description: { type: String },
  price: { type: Number, required: true },
  category: { type: String },
  image: [{ type: String }],
}, { 
  timestamps: true 
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);
module.exports = MenuItem;
