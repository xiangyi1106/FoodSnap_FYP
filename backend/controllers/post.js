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
      .populate({
        path: "sharedPost", // Populate the sharedPost field
        populate: {
          path: "user", // Populate the user inside sharedPost
          select: "name picture username gender" // Select fields to retrieve from user
        }
      })
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

exports.getPostDetails = async (req, res) => {
  try {
    const postId = req.params.id;
    // const post = await Post.findById(postId).exec();
    const post = await Post.findById(postId).populate("user", "name picture username gender");

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json(post);
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Like/Unlike Post Controller
exports.toggleLike = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }


    const likeIndex = post.likes.findIndex(like => like._id.toString() === userId);

    if (likeIndex !== -1) {
      // Unlike the post
      post.likes.splice(likeIndex, 1); // Remove the like object at the found index
    } else {
      // Like the post
      post.likes.push({ _id: userId, likeAt: new Date() }); // Add a new like object
    }


    await post.save();
    res.json({ message: likeIndex !== -1 ? 'Post unliked' : 'Post liked', likes: post.likes.length });

  } catch (error) {
    console.error('Error liking post:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.getLikeStatus = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if the userId is in the likes array of objects
    const isLiked = post.likes.some(like => like._id.toString() === userId);

    res.json({ isLiked: isLiked });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Share post logic
exports.sharePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { text, privacy } = req.body;
    const userId = req.user.id;

    // Log incoming data for debugging
    console.log("Request Data:", { postId, text, privacy, userId });

    // Find the original post
    const originalPost = await Post.findById(postId);
    if (!originalPost) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Create a new post, referencing the shared post
    const newPost = new Post({
      type: 'shared',
      user: userId,
      text: text || '', // User can optionally add text
      sharedPost: postId, // Reference to the original post
      privacy: privacy,
    });

    // Log the new post object for debugging
    console.log("New Post Object:", newPost);

    await newPost.save();

    // Optionally, update the original post's share count
    originalPost.shares.push(userId);
    await originalPost.save();

    res.status(201).json({ message: 'Post shared successfully' });
  } catch (error) {
    // Log error details for debugging
    console.error("Error sharing post:", error.message);
    res.status(500).json({ message: 'Error sharing post', error: error.message });
  }
};


