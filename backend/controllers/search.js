// const SearchTerm = require('../models/SearchTerm'); // Adjust the path as necessary
const { User, SearchTerm } = require("../models/models");
// console.log(User); // Should output the User model definition
exports.searchTerm = async (req, res) => {
  try {
    const searchTerm = req.params.searchTerm;
    console.log(searchTerm);
    const results = await User.find({ $text: { $search: searchTerm } }).select(
      "name username picture"
    );
    res.json(results);
  } catch (error) {
    console.error("Error in searchTerm:", error);  // Log error details
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
    const { searchTerm } = req.body;
    const search = {
      searchTerm: searchTerm,
      createdAt: new Date(),
    };
    const user = await User.findById(req.user.id);
    const check = user.search.find((x) => x.user.toString() === searchTerm);
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

exports.removeFromSearch = async (req, res) => {
  try {
    const { searchUser } = req.body;
    await User.updateOne(
      {
        _id: req.user.id,
      },
      { $pull: { search: { user: searchUser } } }
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getPopularSearchTerms = async (req, res) => {
  const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000); // Calculate the date one week ago

  const popularTerms = await SearchTerm.aggregate([
    { $unwind: "$searches" }, // Flatten the searches array
    { $match: { "searches.timestamp": { $gte: oneWeekAgo } } }, // Filter by timestamp
    {
      $group: {
        _id: "$term",
        searchCount: { $sum: 1 }, // Count the number of searches
      },
    },
    { $sort: { searchCount: -1 } }, // Sort by search count descending
    { $limit: 10 }, // Limit to the top 10 popular terms
  ]);

  return popularTerms;
};

