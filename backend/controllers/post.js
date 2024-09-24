const Post = require("../models/Post");
const Hashtag = require("../models/Hashtag");
const User = require("../models/User");


const extractHashtags = (text) => {
  const hashtagRegex = /#(\w+)/g;
  let hashtags = [];
  let match;

  while ((match = hashtagRegex.exec(text)) !== null) {
    hashtags.push(match[1].toLowerCase()); // Extract and normalize hashtag
  }

  console.log(hashtags);

  return hashtags;
};

const saveHashtags = async (hashtags) => {
  const promises = hashtags.map(async (hashtag) => {
    return Hashtag.findOneAndUpdate(
      { name: hashtag },
      { $inc: { postCount: 1 }, updatedAt: new Date() },
      { new: true, upsert: true } // Create if not exists, return the updated document
    );
  });

  await Promise.all(promises);
};

const extractMentions = (text) => {
  const mentionRegex = /@\[([^\]]+)\]\(([^\)]+)\)/g;
  let mentions = [];
  let match;

  while ((match = mentionRegex.exec(text)) !== null) {
    mentions.push({
      name: match[1], // Extract name
      userId: match[2], // Extract userId
    });
  }

  return mentions;
};



const cleanMentions = (text) => {
  // This regex will replace mentions like @[name](id) with @name
  return text.replace(/@\[(.+?)\]\(.+?\)/g, '@$1');
};


exports.createPost = async (req, res) => {
  try {
    const { text, user } = req.body;

    const mentions = extractMentions(text);
    // Clean mentions before saving
    text = cleanMentions(text);

    // Extract hashtags from text
    const hashtags = extractHashtags(text);


    // Save or update hashtags in the database
    await saveHashtags(hashtags);

    // Convert hashtags to their respective IDs
    const hashtagDocs = await Hashtag.find({ name: { $in: hashtags } }).select('_id');
    const hashtagIds = hashtagDocs.map(doc => doc._id);

    // Create a new post with hashtags
    const post = await new Post({
      ...req.body,
      hashtag: hashtagIds,
      mentions: mentions,
    }).save();

    res.json(post);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "name picture username gender")
      //get the data from user database
      .populate({
        path: "sharedPost", // Populate the sharedPost field
        populate: {
          path: "user", // Populate the user inside sharedPost
          select: "name picture username gender _id" // Select fields to retrieve from user
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

    console.log(userId);
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if the userId is in the likes array of objects
    const isLiked = post.likes.some(like => like._id.toString() === userId);

    const user = await User.findById(userId);
    const checkSaved = user?.savedPosts.find(
      (x) => x.post.toString() === postId 
    );

    res.json({ isLiked: isLiked, checkSaved: !!checkSaved  });// Return true if post is saved, otherwise false
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Share post logic
exports.sharePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { text, privacy } = req.body;
    const userId = req.user.id;

    // Extract hashtags from text
    const hashtags = extractHashtags(text);

    const mentions = extractMentions(text);
    // Clean mentions before saving
    text = cleanMentions(text);

    // Save or update hashtags in the database
    await saveHashtags(hashtags);

    // Convert hashtags to their respective IDs
    const hashtagDocs = await Hashtag.find({ name: { $in: hashtags } }).select('_id');
    const hashtagIds = hashtagDocs.map(doc => doc._id);

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
      hashtag: hashtagIds,
      mentions: mentions,
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

exports.savePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const user = await User.findById(req.user.id);
    const check = user?.savedPosts.find(
      (post) => post.post.toString() == postId
    );
    if (check) {
      await User.findByIdAndUpdate(req.user.id, {
        $pull: {
          savedPosts: {
            _id: check._id,
          },
        },
      });
    } else {
      await User.findByIdAndUpdate(req.user.id, {
        $push: {
          savedPosts: {
            post: postId,
            savedAt: new Date(),
          },
        },
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    await Post.findByIdAndRemove(req.params.id);
    res.json({ status: "ok" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};




