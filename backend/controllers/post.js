const Post = require("../models/Post");

exports.createPost = async (req, res) => {
  try {
    const post = await new Post(req.body).save();
    res.json(post);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "name picture username gender")
      //get the data from user database
      .sort({ createdAt: -1 });
    //sort by newest to oldest
    res.json(posts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getPublicPosts = async (req, res) => {
  try {
    const posts = await Post.find({ privacy: "public" }) // Fetch only public posts
      .populate("user", "name picture username gender")
      .sort({ createdAt: -1 }); // Sort by newest to oldest
    res.json(posts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
