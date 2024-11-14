const Hashtag = require("../models/Hashtag");
const User = require("../models/User");

exports.addHashtag = async (hashtagName) => {
    try {
      // Find the hashtag or create a new one
      const hashtag = await Hashtag.findOneAndUpdate(
        { name: hashtagName },
        { $inc: { postCount: 1 }, $set: { updatedAt: new Date() } },
        { upsert: true, new: true }
      );
      return hashtag;
    } catch (error) {
      console.error('Error adding/updating hashtag:', error);
    }
  };
  

  // Example: Express.js backend route
  exports.getHashtags = async (req, res) => {
    try {
      const hashtags = await Hashtag.find(); // Fetch all hashtags
      res.json(hashtags.map(tag => ({
        id: tag._id.toString(), // Use MongoDB ObjectId as id
        name: tag.name // Use the name field for display
      })));
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch hashtags' });
    }
  };


  exports.mentionPeople = async (req, res) => {
    try {
        const userID = req.headers['user_id'];
        const searchTerm = req.query.search || ""; // Get the search term if provided

        if (!userID) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        const users = await User.aggregate([
            {
                $addFields: {
                    lowerCaseName: { $toLower: "$name" }
                }
            },
            {
                $match: {
                    lowerCaseName: { $regex: searchTerm.toLowerCase(), $options: 'i' } // Filter by search term
                }
            },
            {
                $sort: { lowerCaseName: 1 }
            }
        ]);

        const filteredUsers = users.filter(user => user._id.toString() !== userID.toString());

        const formattedUsers = filteredUsers.map(user => ({
            id: user._id.toString(),
            display: user.name,
            // username: user.username,
        }));

        res.json(formattedUsers);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
}


  