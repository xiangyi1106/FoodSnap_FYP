// models/Comment.js
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const ReplySchema = new mongoose.Schema({
    user: {
        type: ObjectId,
        ref: "User",
        required: true,
    },
    text: String,
}, {
    timestamps: true,
});

const foodVenueCommentSchema = new mongoose.Schema({
    user: {
        type: ObjectId,
        ref: "User",
        required: true,
    },
    text: String,
    media: {
        type: Array,
        default: [],
    },
    rating: Number,
    replies: [ReplySchema], // Array of replies
    placeId: String,

}, {
    timestamps: true,
});

module.exports = mongoose.model('FoodVenueComment', foodVenueCommentSchema);
