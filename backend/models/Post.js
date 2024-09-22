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
        // media: [
        //     {
        //         type: {
        //             type: String,
        //             enum: ["image", "video"],
        //             required: true,
        //         },
        //         url: {
        //             type: String,
        //             required: true,
        //         },
        //         type: Array,
        //         default: [],
        //     }
        // ],
        //media should be no array bracket but need to change a lot
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
            // address: [{
            //     address1: {
            //         type: String,
            //     },
            //     city: {
            //         type: String,
            //     },
            //     state: {
            //         type: String,
            //     },
            //     postalCode: {
            //         type: Number,
            //     },
            //     country: {
            //         type: String,
            //     },
            //     fullAddress:{
            //         type: String,
            //     }
            // }],
            latitude: {
                type: Number,
            },
            longitude: {
                type: Number,
            },
            //not important
            license: {
                type: String,
            }
        }],
        // //not important
        // rating: {
        //     type: Number,
        // },
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
                ref: "User",//contain the _id of a user document from the "User" collection
            },
            likeAt: {
                type: Date,
                default: new Date(),
            }
        }],
        comments: [{ 
            type: ObjectId,
            ref: 'Comment' }],
        // comments: [{
        //     comment: {
        //         type: String,
        //     },
        //     image: {
        //         type: String,
        //     },
        //     commentBy: {
        //         type: ObjectId,
        //         ref: "User",//contain the _id of a user document from the "User" collection
        //     },
        //     commentAt: {
        //         type: Date,
        //         default: new Date(),
        //     }
        // }],
        shares: [{
            shareBy: {
                type: ObjectId,
                ref: "User",//contain the _id of a user document from the "User" collection
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
