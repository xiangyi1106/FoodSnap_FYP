const Comment = require("../models/Comment");
const User = require("../models/User");
const Notification = require("../models/Notification");

exports.getComments = async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await Comment.find({
      postId,
      // parentCommentId,
    })
      .populate("userId", "name picture username gender")
      //get the data from user database
      .sort({ createdAt: -1 });
    //sort by newest to oldest
    res.json(comments);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.addComment = async (req, res) => {
  try {
    const { postId, userId, content, image } = req.body;

    // Create and save the new comment
    const newComment = new Comment({
      postId,
      userId,
      content,
      image,
    });

    await newComment.save();

    //bug
    // const originalPost = await Post.findById(postId).populate("user", "picture name username _id");

    // console.log(originalPost.user._id);

    // // Populate the comment's userId field with the name of the user who commented (only once)
    // await newComment.populate("userId", "name");

    // // Notify the post owner
    // const commentNotification = {
    //   userId: originalPost.user._id, // Post owner
    //   type: 'comment',
    //   fromUserId: userId,
    //   postId: postId,
    //   message: `${newComment.userId.name} commented on your post`,
    // };

    // await Notification.create(commentNotification);

    
    // Populate the user details
    await newComment.populate("userId", "picture name username");

    res.status(201).json(newComment);

  } catch (error) {
    res.status(500).json({ error: 'Failed to add comment: ' + error.message });
  }
};


exports.addCommentReply = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { userId, content, image } = req.body;

    const reply = {
      userId,
      content,
      image,
    };

    // Find the comment and push the reply to its replies array
    const comment = await Comment.findByIdAndUpdate(
      commentId,
      { $push: { replies: reply } },
      { new: true, runValidators: true }
    ).populate('replies.userId', 'name picture username');

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add comment ' + error.message });

  }
};