const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const postSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            enum: ["profilePicture", "cover", "shared", null],
            default: null,
        },
        text: {
            type: String,
        },
        media: {
                type: Array,
                default: [],
        },
        tag: {
            type: Array,
            default: [],
        },
        hashtag: {
            type: Array,
            default: [],
        },
        mentions: [
            {
              name: String,
              userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
              username: String
            }
          ],
        location: [{
            placeId: {
                type: Number,
            },
            name: {
                type: String,
            },
            displayName: {
                type: String,
            },
            address: {
                type: Array,
                default: [],
            },
            latitude: {
                type: Number,
            },
            longitude: {
                type: Number,
            },
        }],
        privacy: {
            type: String,
            enum: ["public", "private", "followers"],
            default: "public",
        },
        user: {
            type: ObjectId,
            ref: "User",
            required: true,
        },
        likes: [{
            likeBy: {
                type: ObjectId,
                ref: "User",
            },
            likeAt: {
                type: Date,
                default: new Date(),
            }
        }],
        shares: [{
            shareBy: {
                type: ObjectId,
                ref: "User",
            },
            shareAt: {
                type: Date,
                default: new Date(),
            }
        }],
        reported: {
            isReported: {
                type: Boolean,
                default: false
            },
            status: {
                type: String,
                enum: ["locked", "pending", "reviewed", "null"],
                default: "null",
            },
        },
        sharedPost: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', default: null }, // Reference to the original post
    }
    , {
        timestamps: true,
    });

module.exports = mongoose.model("Post", postSchema);
