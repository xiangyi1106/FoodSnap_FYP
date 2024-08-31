const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const placeSchema = new mongoose.Schema({
    user: {
        type: ObjectId,
        ref: "User",
        required: true,

    },
    name: { type: String },
    address: [{
        address1: {
            type: String,
        },
        city: {
            type: String,
        },
        state: {
            type: String,
        },
        postalCode: {
            type: Number,
        },
        country: {
            type: String,
        },
        fullAddress: {
            type: String,
        }
    }],
    visited: { type: Boolean, default: false }

}, {
    timestamps: true
});
module.exports = mongoose.model("Place", placeSchema);
