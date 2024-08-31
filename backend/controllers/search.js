const User = require('../models/User'); // Adjust the path as necessary
const Post = require('../models/Post'); // Adjust the path as necessary

exports.search = async (req, res) => {
    try {
      const searchTerm = req.params.searchTerm;
  
      // Find users based on text search
      const userResults = await User.find({ $text: { $search: searchTerm } })
        .select('first_name last_name username picture');
  
      // Find posts based on text search, hashtags, and location
      const postResults = await Post.find({
        $or: [
          { $text: { $search: searchTerm } },
          { hashtags: { $in: [searchTerm] } },
          { 'location.name': { $regex: searchTerm, $options: 'i' } },
          { 'location.displayName': { $regex: searchTerm, $options: 'i' } },
          { 'location.address': { $in: [searchTerm] } }
        ]
      });
  
      // Combine results
      const results = {
        users: userResults,
        posts: postResults,
      };
  
      res.json(results);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  exports.searchUser = async (req, res) => {
    try {
      const searchTerm = req.params.searchTerm;
      const results = await User.find({ $text: { $search: searchTerm } }).select(
        "username name picture"
      );
      res.json(results);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  exports.addToSearchHistory = async (req, res) => {
    try {
      const { searchUser } = req.body;
      const search = {
        user: searchUser,
        createdAt: new Date(),
      };
      const user = await User.findById(req.user.id);
      const check = user.search.find((x) => x.user.toString() === searchUser);
      if (check) {
        await User.updateOne(
          {
            _id: req.user.id,
            "search._id": check._id,
          },
          {
            $set: { "search.$.createdAt": new Date() },
          }
        );
      } else {
        await User.findByIdAndUpdate(req.user.id, {
          $push: {
            search,
          },
        });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  exports.getSearchHistory = async (req, res) => {
    try {
      const results = await User.findById(req.user.id)
        .select("search")
        .populate("search.user", "first_name last_name username picture");
      res.json(results.search);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
