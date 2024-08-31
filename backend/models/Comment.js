const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const commentSchema = new Schema({
  postId: { type: ObjectId, ref: 'Post', required: true },
  userId: { type: ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  image: { type: String }, // URL to an image (optional)
  // createdAt: { type: Date, default: Date.now },
  // updatedAt: { type: Date, default: Date.now },
  parentCommentId: { type: ObjectId, ref: 'Comment', default: 'null' },
  // replies: [{ type: ObjectId, ref: 'Comment' }],
  likes: [{ type: ObjectId, ref: 'User' }], // Array of user IDs who liked the comment
  replies: {
    type: Array,
    default: [],
  },
}, { 
  timestamps: true 
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = { Comment };
