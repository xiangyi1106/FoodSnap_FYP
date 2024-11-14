const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const searchTermSchema = new mongoose.Schema({
    term: {
        type: String,
        required: true,
        unique: true,
    },
    searches: [
        {
            user: {
                type: ObjectId,
                ref: 'User',
                required: true,
            },
            timestamp: {
                type: Date,
                default: Date.now,
            },
        },
    ],
    searchCount: {
        type: Number,
        default: 0, // Initialize the count
    },
});

// Add a text index to the `term` field to allow full-text search
searchTermSchema.index({ term: "text" });

// Update searchCount when a new search is added
searchTermSchema.pre('save', function(next) {
    this.searchCount = this.searches.length; // Count searches from the array
    next();
});

module.exports = mongoose.model("SearchTerm", searchTermSchema);