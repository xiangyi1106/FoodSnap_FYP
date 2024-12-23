const { text } = require("express");
const { url } = require("inspector");
const mongoose = require("mongoose");
const { type } = require("os");
const { searchTerm } = require("../controllers/search");

const { ObjectId } = mongoose.Schema;

const ImageSchema = new mongoose.Schema({
    url: {
        type: String,       // URL of the image stored in Cloudinary
        required: true      // Ensure each image has a URL
    },
    uploadedAt: {
        type: Date,         // Timestamp for when the image was uploaded
        default: Date.now   // Default to the current date/time
    }
});

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        trim: true,
        text: true,
        unique: true,
    },
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        text: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    picture: {
        type: String,
        default: "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
    },
    cover: {
        type: String,
        trim: true,
    },
    gender: {
        type: String,
        required: [true, "Gender is required"],
        trim: true,
    },
    bYear: {
        type: Number,
        required: true,
        trim: true,
    },
    bMonth: {
        type: Number,
        required: true,
        trim: true,
    },
    bDay: {
        type: Number,
        required: true,
        trim: true,
    },
    verified: {
        type: Boolean,
        default: false,
    },
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: []
    }],
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: []
    }],
    search: [
        {
            // termType: {
            //     type: String,
            //     required: true,
            //     enum: ['user', 'term'], // Restrict to specific categories
            // },
            // termValue: {
            //     type: String,
            //     required: true,
            // },
            searchTerm: {
                type: String,
                required: true,
            },
            createdAt: {
                type: Date,
                default: Date.now,
            },
        }
    ],
    details: {
        about: {
            type: String,
        },
        currentCity: {
            type: String,
        },
        favouriteFood: {
            type: String,
        },
        facebook: {
            type: String,
        },
        instagram: {
            type: String,
        },
        youtube: {
            type: String,
        },
    },
    savedPosts: [{
        post: {
            type: ObjectId,
            ref: "Post",
        },
        savedAt: {
            type: Date,
            default: new Date(),
        },
    }],
    likedPosts: [{
        post: {
            type: ObjectId,
            ref: "Post",
        },
        likedAt: {
            type: Date,
            default: new Date(),
        },
    }],
    profileImageList: [ImageSchema],  // Replaces `picture` field with a list of profile images
    coverImageList: [ImageSchema],  // Replaces `cover` field with a list of cover images
    foodVenueWishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FoodVenue', default: [] }],
    role: {
        type: String,
        enum: ['user', 'admin', 'business_account'],
        default: 'user'
    },
    foodVenueOwned: { type: mongoose.Schema.Types.ObjectId, ref: 'FoodVenue', default: null },
    // foodVenueMapList: {
    //     type: Array,
    //     default: [],
    // },
}, {
    timestamps: true,
});

module.exports = mongoose.model("User", userSchema);

// const User = mongoose.model("User", userSchema);
// module.exports = User;