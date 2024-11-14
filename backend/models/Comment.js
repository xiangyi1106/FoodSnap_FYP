const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;
const { Schema, model } = mongoose;

const commentReplySchema = new Schema({
  userId: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  likes: [{
    type: ObjectId,
    ref: 'User', // Array of user IDs who liked the reply
  }],
  image: { type: String }, // URL to an image (optional)
}, {
  timestamps: true,
});

const commentSchema = new Schema({
  postId: { type: ObjectId, ref: 'Post', required: true },
  userId: { type: ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  image: { type: String }, // URL to an image (optional)
  likes: [{ type: ObjectId, ref: 'User' }], // Array of user IDs who liked the comment
  replies: [commentReplySchema], // Array of replies
}, { 
  timestamps: true 
});

module.exports = model('Comment', commentSchema);
