const Comment = require("../models/Comment");

exports.getComments = async (req, res) => {
    try {
      const comments = await Comment.find({
        postId,
        parentCommentId,
      })
        .populate("user", "name picture username gender")
        //get the data from user database
        .sort({ createdAt: -1 });
        //sort by newest to oldest
      res.json(comments);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };