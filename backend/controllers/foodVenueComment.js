const FoodVenueComment = require('../models/FoodVenueComment');
const User = require("../models/User");
const FoodVenue = require("../models/FoodVenue");

// Get all comments for a place
exports.getFoodVenueComments = async (req, res) => {
    try {
        const comments = await FoodVenueComment.find({ placeId: req.params.placeId })
            .populate("user", "name picture username")
            .populate({
                path: "replies", // Populate the sharedPost field
                populate: {
                    path: "user", // Populate the user inside sharedPost
                    select: "name picture username _id" // Select fields to retrieve from user
                }
            })
            .sort({ createdAt: -1 });
        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add a new comment or reply
exports.addFoodVenueComment = async (req, res) => {
    try {
        const { author, text, avatarUrl } = req.body;
        const { commentId } = req.params;

        if (commentId) {
            // Adding a reply to an existing comment
            const parentComment = await Comment.findById(commentId);

            if (!parentComment) {
                return res.status(404).json({ error: 'Comment not found' });
            }

            // Use recursion to add the reply at the correct depth
            const addReply = (replies) => {
                if (replies && replies.length < 3) {
                    replies.push({ author, text, avatarUrl });
                } else {
                    replies[replies.length - 1].replies.push({
                        author,
                        text,
                        avatarUrl,
                    });
                }
            };

            addReply(parentComment.replies);

            await parentComment.save();
            res.json(parentComment);
        } else {
            // Adding a new top-level comment
            const newComment = new Comment({
                placeId: req.params.placeId,
                author,
                text,
                avatarUrl,
                replies: [],
            });
            await newComment.save();
            res.json(newComment);
        }
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Add a new comment or reply
exports.addFoodVenueReview = async (req, res) => {
    try {
         // Validate the rating
         const rating = req.body.rating;
         if (rating < 1 || rating > 5) {
             return res.status(400).json({ message: 'Rating must be between 1 and 5' });
         }

        const newComment = new FoodVenueComment({
            placeId: req.params.placeId,
            user: req.body.userID, // ensure user._id is passed in the body
            text: req.body.text,
            rating: req.body.rating,
            media: req.body.media,
            replies: [],
        });
        await newComment.save();

         // Update the venue's average rating
         const placeId = req.params.placeId;
         const reviews = await FoodVenueComment.find({ placeId });
 
         // Calculate the new average rating
         const totalRatings = reviews.reduce((sum, review) => sum + review.rating, 0);
         const averageRating = totalRatings / reviews.length;
 
         // Update the venue's average rating in the FoodVenue model
         await FoodVenue.findByIdAndUpdate(placeId, { rating: averageRating.toFixed(2) });

        // Populate the user data before sending the response
        const populatedComment = await FoodVenueComment.findById(newComment._id).populate('user', 'username name picture'); // Adjust the fields you want to populate

        // Send response with populated user data
        res.json(populatedComment);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addFoodVenueReply = async (req, res) => {
    const { reviewId } = req.params;
    const { userID, text } = req.body;

    try {
        // Find the comment to which the reply will be added
        const comment = await FoodVenueComment.findById(reviewId);
        if (!comment) return res.status(404).json({ message: "Comment not found" });

        // Create a reply object and push it to replies array
        const reply = { user: userID, text };
        comment.replies.push(reply);

        await comment.save();
        // // Populate 'user' fields for all replies in the saved comment
        // await comment.populate('replies.user', 'name picture');
        await comment.populate([
            { path: 'user', select: 'name picture username' },               // Populate the main user field
            { path: 'replies.user', select: 'name picture username' }        // Populate user field in each reply
        ]);
        res.status(201).json({ message: "Reply added successfully", comment: comment });
    } catch (error) {
        res.status(500).json({ message: "Error adding reply: " + error.message });
    }
};

