const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;


const hashtagSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  postCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Hashtag = mongoose.model('Hashtag', hashtagSchema);

module.exports = Hashtag;
