const Post = require("../models/Post");
const Hashtag = require("../models/Hashtag");
const User = require("../models/User");
const Notification = require("../models/Notification");

// const { User, Post, Hashtag } = require("../models/models");

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

    let { text, user } = req.body;

    // Remove text from req.body before proceeding further
    delete req.body.text;

    // Initialize an empty array for mentions
    let mentions = [];

    // Check if mentions exist in the text
    if (text.includes('@')) {
      // mentions = extractMentions(text);  // Extract mentions only if present
      // text = cleanMentions(text);        // Clean mentions from the text
      // Extract and add usernames to mentions
      const rawMentions = extractMentions(text); // Extract mentions without usernames
      mentions = await addUsernamesToMentions(rawMentions); // Add usernames
      // Clean mentions before saving
      text = cleanMentions(text);
    }

    // Extract hashtags from text, if any
    const hashtags = extractHashtags(text);

    // Initialize an empty array for hashtag IDs
    let hashtagIds = [];

    // Save or update hashtags and convert to IDs only if there are hashtags
    if (hashtags.length > 0) {
      // Save or update hashtags in the database
      await saveHashtags(hashtags);

      // Convert hashtags to their respective IDs
      const hashtagDocs = await Hashtag.find({ name: { $in: hashtags } }).select('_id');
      hashtagIds = hashtagDocs.map(doc => doc._id);
    }

    // Create a new post with hashtags
    const post = await new Post({
      ...req.body,
      text: text,
      hashtag: hashtagIds,
      mentions: mentions,
    }).save();

    const postOwner = await User.findById(user).populate("followers", "name picture username");

    if (mentions && mentions.length > 0) {
      const mentionNotifications = mentions.map((mention) => ({
        userId: mention.userId, // User mentioned
        type: 'mention',
        fromUserId: req.user.id,
        postId: post._id,
        message: `${postOwner.name} mentioned you in a post`,
      }));

      await Notification.insertMany(mentionNotifications);
    }

    // Check if the user has followers
    if (postOwner.followers && postOwner.followers.length > 0) {
      // Notify followers about the new post
      const notifications = postOwner.followers.map((followerId) => ({
        userId: followerId, // Follower's ID
        type: 'new_post', // Notification type
        fromUserId: user, // ID of the user who created the post
        postId: post._id, // ID of the new post
        message: `${postOwner.name} added a new post`, // Custom message
      }));

      // Save notifications to the database
      await Notification.insertMany(notifications);
    }

    res.json(post);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// exports.getAllPosts = async (req, res) => {
//   try {
//     const posts = await Post.find()
//       .populate("user", "name picture username gender")
//       //get the data from user database
//       .populate({
//         path: "sharedPost", // Populate the sharedPost field
//         populate: {
//           path: "user", // Populate the user inside sharedPost
//           select: "name picture username gender _id" // Select fields to retrieve from user
//         }
//       })
//       .sort({ createdAt: -1 });
//     //sort by newest to oldest
//     res.json(posts);
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };

exports.getAllPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default page 1
    const limit = parseInt(req.query.limit) || 10; // Default limit 10
    const skip = (page - 1) * limit;

    const followingTemp = await User.findById(req.user.id).select("following");
    const following = followingTemp.following;

    const promises = following.map((user) => {
      return Post.find({ user: user })
        .populate("user", "name picture username gender")
        .populate({
          path: "sharedPost", // Populate the sharedPost field
          populate: {
            path: "user", // Populate the user inside sharedPost
            select: "name picture username gender _id" // Select fields to retrieve from user
          }
        })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
    });

    const followingPosts = await (await Promise.all(promises)).flat();
    const userPosts = await Post.find({ user: req.user.id })
      .populate("user", "name picture username gender")
      .populate({
        path: "sharedPost", // Populate the sharedPost field
        populate: {
          path: "user", // Populate the user inside sharedPost
          select: "name picture username gender _id" // Select fields to retrieve from user
        }
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const allPosts = [...followingPosts, ...userPosts];

    // Sort the combined posts by createdAt
    allPosts.sort((a, b) => b.createdAt - a.createdAt);

    res.json(allPosts);

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
    const post = await Post.findById(postId)
    .populate("user", "name picture username gender")
    .populate({
      path: 'sharedPost', // Populate the sharedPost field
      populate: {
          path: 'user', // Populate the user inside sharedPost
          select: 'name picture username gender _id' // Select fields to retrieve from user
      }
  });

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json(post);
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.checkSaved = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const checkSaved = user?.savedPosts.find(
      (x) => x.post.toString() === req.params.id
    );
    res.json({
      checkSaved: checkSaved ? true : false,
    });
  
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Like/Unlike Post Controller
exports.toggleLike = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;

    const post = await Post.findById(postId).populate("user", "name picture username gender");
    const likeUser = await User.findById(userId);

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
      // Create a notification
      await Notification.create({
        userId: post.user._id, // post owner's user ID
        type: 'like',
        fromUserId: userId,
        postId: postId,
        message: `${likeUser.name} liked your post`
      });
    }


    await post.save();
    res.json({ success: true, message: likeIndex !== -1 ? 'Post unliked' : 'Post liked', likes: post.likes });

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

    const user = await User.findById(userId);
    const checkSaved = user?.savedPosts.find(
      (x) => x.post.toString() === postId
    );

    res.json({ isLiked: isLiked, checkSaved: !!checkSaved });// Return true if post is saved, otherwise false
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Extracts mentions and adds usernames based on userId
const addUsernamesToMentions = async (mentions) => {
  const userIds = mentions.map((mention) => mention.userId);

  // Find users with matching IDs and return their usernames
  const users = await User.find({ _id: { $in: userIds } }).select('username _id');

  // Map userIds to usernames for easier lookup
  const userMap = users.reduce((map, user) => {
    map[user._id] = user.username;
    return map;
  }, {});

  // Add usernames to mentions
  return mentions.map((mention) => ({
    ...mention,
    username: userMap[mention.userId] || null, // Use null if user not found
  }));
};

// Share post logic
exports.sharePost = async (req, res) => {
  try {
    const { postId } = req.params;
    var { text, privacy } = req.body;
    const userId = req.user.id;

    // Extract hashtags from text
    const hashtags = extractHashtags(text);

    // Extract and add usernames to mentions
    const rawMentions = extractMentions(text); // Extract mentions without usernames
    const mentions = await addUsernamesToMentions(rawMentions); // Add usernames
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

    await newPost.save();

    // Optionally, update the original post's share count
    originalPost.shares.push(userId);
    await originalPost.save();

    const sharedPeople = await User.findById(userId);

    const shareNotification = {
      userId: originalPost.user, // Original post owner
      type: 'shared',
      fromUserId: userId, // User who shared the post
      postId: newPost._id, // Shared post ID
      message: `${sharedPeople.name} shared your post.`,
    };
    
    await Notification.create(shareNotification);

    // Re-fetch the post with the required populations
    const populatedPost = await Post.findById(originalPost._id)
      .populate("user", "picture name username")
      .populate({
        path: "sharedPost", // Populate the sharedPost field
        populate: {
          path: "user", // Populate the user inside sharedPost
          select: "name picture username gender _id" // Select fields to retrieve from user
        }
      });

    res.status(201).json({ message: 'Post shared successfully to your profile page.', post: populatedPost, success: true });
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

// Get all posts that have a location
exports.getPostsWithLocation = async (req, res) => {
  const { userId } = req.params;
  const { month, year } = req.query; // month and year will be passed as query params

  try {
    // Calculate the start and end of the month with time
    const startOfMonth = new Date(Date.UTC(year, month - 1, 1, 0, 0, 0)); // First day of the month, 00:00:00 UTC
    const endOfMonth = new Date(Date.UTC(year, month, 0, 23, 59, 59)); // Last day of the month, 23:59:59 UTC

    // Find posts with a location for the specified user and month
    const postsWithLocation = await Post.find({
      user: userId, // Filter by user ID
      // location: { $exists: true, $ne: null }, // Ensure location exists and is not null
      // location: { $ne: [] }, // Ensure location array is not empty
      location: { $nin: [null, []] },
      createdAt: { $gte: startOfMonth, $lt: endOfMonth }, // Filter by date range
    })
      .populate('user', 'name username picture') // Populate user with specific fields like name and email
      .exec();

    // Check if posts are found
    if (postsWithLocation.length === 0) {
      return res.status(404).json({ message: 'No posts with locations found for the specified month and year.' });
    }

    res.json(postsWithLocation);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching posts with locations for the user' });
  }
};

exports.getPostsByFoodVenue = async (req, res) => {
  try {
    // const foodVenueName = req.query.name;
    // const name = decodeURIComponent(req.query.name);
    const foodVenueName = decodeURIComponent(req.query.name);
    // console.log(name);
    // const foodVenueName = name.match(/[a-zA-Z]+/g); 

    const posts = await Post.find({
      $or: [
        { text: { $regex: foodVenueName, $options: 'i' } }, // Match in text
        { location: { $elemMatch: { name: { $regex: foodVenueName, $options: 'i' } } } } // Match in location array's name field
      ],
      sharedPost: null // Exclude shared posts
    })
      .populate("user", "name picture username gender")
      .sort({ createdAt: -1 }); // Sort by newest to oldest

    console.log("post", posts);
    res.json(posts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};




