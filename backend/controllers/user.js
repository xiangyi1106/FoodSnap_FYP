const { generateToken } = require("../helpers/tokens");
const { validateEmail, validateLength, validateUsername, validatePassword } = require("../helpers/validation");
const { generateCode } = require("../helpers/generateCode");
const User = require("../models/User");
const Code = require("../models/Code");
const Post = require('../models/Post');
const FoodVenue = require('../models/FoodVenue');
const SearchTerm = require('../models/SearchTerm');
const bcrypt = require("bcrypt");
const Notification = require("../models/Notification");
// const { User, Post, Code } = require("../models/models");

const register = async (req, res) => {

    try {
        const {
            username,
            name,
            email,
            password,
            // bYear,
            // bMonth,
            // bDay,
            // gender,
        } = req.body;

        const isUsernameTaken = await User.exists({ username });

        if (isUsernameTaken) {
            return res.status(400).json({ errorName: "username", message: 'Sorry, this username is already taken. Please choose another one.' });
        }


        if (!validateUsername(username)) {
            return res.status(400).json({
                message: "Invalid username.",
            });
        }

        //Check the email in database to ensure the email is unique and havent registed yet
        const check = await User.findOne({ email });
        if (check) {
            return res.status(400).json({
                errorName: "email",
                message: "Oops! This email address is already registered. Please use a different one.",
            });
        }

        if (!validateEmail(email)) {
            return res.status(400).json({
                message: "Invalid email address",
            });
        }

        if (!validateLength(name, 1, 30)) {
            return res.status(400).json({
                message: "Name must be between 1 and 30",
            });
        }

        if (!validatePassword(password)) {
            return res.status(400).json({
                message: "Invalid password",
            });
        }

        const cryptedPassword = await bcrypt.hash(password, 12);

        const user = await new User({
            username,
            name,
            email,
            password: cryptedPassword,
            role: 'user',
            foodVenueOwned: null,
            // bYear,
            // bMonth,
            // bDay,
            // gender,
        }).save();

        const emailVerificationToken = generateToken(
            { id: user._id.toString() }, "30m"
        );

        const token = generateToken({ id: user._id.toString() }, "7d");

        res.send({
            id: user._id,
            username: user.username,
            picture: user.picture,
            name: user.name,
            token: token,
            verified: user.verified,
            role: user.role,
            foodVenueOwned: user.foodVenueOwned || null,
            // message: "Register successfully! Please activation your email to start."
            message: "Register successfully!"
        });

    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ message: "Internal Server Error, please try again" });
    }
}

const login = async (req, res) => {
    try {
        // Destructure the single field (username/email) and password from the request body
        const { emailOrUsername, password } = req.body;

        // Finding a user in the database by their email or username
        const user = await User.findOne({
            $or: [
                { email: emailOrUsername },
                { username: emailOrUsername }
            ]
        });

        // If the user does not exist, return a 400 Bad Request response
        if (!user) {
            return res.status(400).json({
                errorName: "emailOrUsername",
                message: "The email address or username you entered is not connected to an account."
            });
        }

        // Comparing the provided password with the hashed password stored in the database
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({
                errorName: "password",
                message: "Invalid password. Please try again."
            });
        }

        // Sending a successful response with user data and the generated token
        const token = generateToken({ id: user._id.toString() }, "7d");

        res.send({
            id: user._id,
            username: user.username,
            picture: user.picture,
            name: user.name,
            token: token,
            verified: user.verified,
            role: user.role,
            foodVenueOwned: user.foodVenueOwned,
        });

    } catch (error) {
        res.status(500).json({ message: error.message });

    }
}


const searchPeople = async (req, res) => {
    try {
        const userID = req.headers['user_id']; // Assuming you have the current user object available in the request
        // const page = parseInt(req.query.page) || 1;
        // const limit = 4;
        // const skip = (page - 1) * limit;

        // Check if userID is undefined or null
        if (!userID) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        // Use aggregation to handle case-insensitive sorting
        const users = await User.aggregate([
            {
                $addFields: {
                    lowerCaseName: { $toLower: "$name" }
                }
            },
            {
                $sort: { lowerCaseName: 1 }
            },
            // {
            //     $skip: skip
            // },
            // {
            //     $limit: limit
            // }
        ]);

        // Filter out the current user
        const filteredUsers = users.filter(user => user._id.toString() !== userID.toString());

        // Remove the temporary lowerCaseName field
        const sanitizedUsers = filteredUsers.map(({ lowerCaseName, ...user }) => user);

        res.json(sanitizedUsers);

        // Check if there are more users available
        // const hasMore = sanitizedUsers.length === limit;
        // res.json({ userLists: sanitizedUsers, hasMore});

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
}


const findUser = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email }).select("-password");
        if (!user) {
            return res.status(400).json({
                message: "Account does not exists.",
            });
        }
        return res.status(200).json({
            email: user.email,
            picture: user.picture,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

// const verifyBusinessOwner = async (req, res) => {
//     try {
//         const userId = req.user.id;
//         const user = await User.findOne({ userId }).select("-password");
//         if (!user) {
//             return res.status(400).json({
//                 message: "Account does not exists.",
//             });
//         }
//         return res.status(200).json({
//             foodVenueOwned: user.foodVenueOwned,
//             role: user.picture,
//         });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }

// }

const sendResetPasswordCode = async (req, res) => {
    try {
        const { email } = req.body;
        //remove the password field from the user model
        const user = await User.findOne({ email }).select("-password");
        //Delete the previous code of the user
        await Code.findOneAndDelete({ user: user._id });
        const code = generateCode(6);
        const savedCode = await new Code({
            code,
            user: user._id,
        }).save();
        //   sendResetCode(user.email, user.first_name, code);
        return res.status(200).json({
            // message: "Email reset code has been sent to your email",
            message: `Email reset code ${code} has been sent to your email`,

        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const validateResetCode = async (req, res) => {
    try {
        const { email, code } = req.body;
        const user = await User.findOne({ email });
        const Dbcode = await Code.findOne({ user: user._id });
        if (Dbcode.code !== code) {
            return res.status(400).json({
                message: "Verification code is wrong..",
            });
        }
        return res.status(200).json({ message: "ok" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const changePassword = async (req, res) => {
    const { email, password } = req.body;

    const cryptedPassword = await bcrypt.hash(password, 12);
    await User.findOneAndUpdate(
        { email },
        {
            password: cryptedPassword,
        }
    );
    return res.status(200).json({ message: "ok" });
};

const DEFAULT_PROFILE_IMAGE_URL = "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg";
const DEFAULT_COVER_IMAGE_URL = "https://mewitti.com/wp-content/themes/miyazaki/assets/images/default-fallback-image.png";

const getProfile = async (req, res) => {
    try {
        const { username } = req.params;
        const user = await User.findById(req.user.id);

        const profile = await User.findOne({ username })
            .select("-password")
            .populate('following', 'username name picture') // Adjust the fields as needed
            .populate('followers', 'username name picture') // Adjust the fields as needed
            .populate({
                path: 'savedPosts', // Populate savedPosts
                populate: {
                    path: 'post', // Populate the post inside savedPosts
                    populate: [
                        {
                            path: 'user', // Populate user inside post
                            select: 'name picture username _id', // Choose fields to select
                        },
                        {
                            path: 'sharedPost', // Populate sharedPost inside post
                            populate: {
                                path: 'user', // Populate user inside sharedPost
                                select: 'name picture username _id', // Choose fields to select
                            },
                        },
                    ],
                },
            });

        if (!profile) {
            return res.status(404).json({ ok: false, message: "Profile not found" });
        }

        const follow = {
            following: false,
        };

        if (user.following.includes(profile._id)) {
            follow.following = true;
        }

        const posts = await Post.find({ user: profile._id })
            .populate("user")
            .populate({
                path: "sharedPost", // Populate the sharedPost field
                populate: {
                    path: "user", // Populate the user inside sharedPost
                    select: "name picture username gender _id" // Select fields to retrieve from user
                }
            })
            .sort({ createdAt: -1 });

        // await profile.populate("friends", "first_name last_name username picture");

        //wait to fix
        // Get the most recent profile image
        // const latestProfileImage = user.profileImageList.length > 0
        //     ? user.profileImageList[user.profileImageList.length - 1].url
        //     : DEFAULT_PROFILE_IMAGE_URL; // Fallback to default if no profile image exists
        // const latestCoverImage = user.coverImageList.length > 0
        //     ? user.coverImageList[user.coverImageList.length - 1].url
        //     : DEFAULT_COVER_IMAGE_URL; // Fallback to default if no profile image exists

        res.json({
            ...profile.toObject(),
            posts, follow,
            postsCount: posts.length,
            followersCount: profile.followers.length,
            followingCount: profile.following.length,
            // latestProfileImage
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// const getProfile = async (req, res) => {
//     try {
//         const { username } = req.params;
//         const user = await User.findById(req.user.id);

//         // Find the profile user
//         const profile = await User.findOne({ username })
//             .select("-password")
//             .populate('following', 'username name picture') // Adjust the fields as needed
//             .populate('followers', 'username name picture'); // Adjust the fields as needed

//         if (!profile) {
//             return res.status(404).json({ ok: false, message: "Profile not found" });
//         }

//         const follow = {
//             following: user.following.includes(profile._id), // Check if the user follows this profile
//         };

//         // Now, we filter savedPosts by checking if the post still exists
//         const savedPosts = await Promise.all(
//             profile.savedPosts.map(async (savedPost) => {
//                 const post = await Post.findById(savedPost.post);

//                 // If the post exists, keep it, otherwise skip it
//                 if (post) {
//                     // Populate the necessary fields in the saved post
//                     await savedPost.populate({
//                         path: 'post',
//                         populate: [
//                             {
//                                 path: 'user', 
//                                 select: 'name picture username _id'
//                             },
//                             {
//                                 path: 'sharedPost',
//                                 populate: {
//                                     path: 'user',
//                                     select: 'name picture username _id',
//                                 },
//                             },
//                         ],
//                     });

//                     return savedPost; // Return the saved post if the post exists
//                 }

//                 // If the post doesn't exist, return null or a custom message indicating it's deleted
//                 return null;
//             })
//         );

//         // Filter out any null savedPosts (posts that were deleted)
//         const filteredSavedPosts = savedPosts.filter(savedPost => savedPost !== null);

//         const posts = await Post.find({ user: profile._id })
//             .populate("user")
//             .populate({
//                 path: "sharedPost",
//                 populate: {
//                     path: "user",
//                     select: "name picture username gender _id"
//                 }
//             })
//             .sort({ createdAt: -1 });

//         res.json({
//             ...profile.toObject(),
//             posts,
//             follow,
//             postsCount: posts.length,
//             followersCount: profile.followers.length,
//             followingCount: profile.following.length,
//             savedPosts: filteredSavedPosts, // Send only the valid savedPosts
//         });

//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };


const getListImages = async (req, res) => {
    try {
        const { userId } = req.params;

        // Find posts created by the user, populate the user field, and sort by creation date in descending order
        const posts = await Post.find({ user: userId })
            .populate("user")
            .sort({ createdAt: -1 });

        // Initialize an empty array to collect image URLs
        let images = [];
        // Iterate through each post and filter out image media items
        posts.forEach(post => {
            post.media.forEach(mediaItem => {
                if (mediaItem.type === 'image') {
                    images.push(mediaItem.url);
                }
            });
        });

        res.json({
            images,
            imagesCount: images.length,
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateProfilePicture = async (req, res) => {
    try {
        const { url } = req.body;

        await User.findByIdAndUpdate(req.user.id, {
            picture: url,
        });
        //waiting to fix
        // Find the user and update profileImageList
        // const user = await User.findById(req.user.id);
        // user.profileImageList.push({ url: url });

        res.json(url);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateCover = async (req, res) => {
    try {
        const { url } = req.body;

        await User.findByIdAndUpdate(req.user.id, {
            cover: url,
        });
        res.json(url);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteProfileImage = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);

        // Find and remove the image from Cloudinary
        const imageToDelete = user.profileImageList.id(imageId);
        if (imageToDelete) {
            const publicId = imageToDelete.url.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(publicId);

            // Remove the image from the profileImageList
            imageToDelete.remove();
            await user.save();
        }

        // return { success: true, profileImageList: user.profileImageList };
        res.json(user.profileImageList);
    } catch (error) {
        // console.error("Error deleting profile image: ", error);
        // return { success: false, error: "Failed to delete profile image" };
        res.status(500).json({ message: "Failed to delete profile image: " + error.message });
    }
}


const updateDetails = async (req, res) => {
    try {
        const { infos } = req.body;
        const updated = await User.findByIdAndUpdate(
            req.user.id,
            {
                details: infos,
            },
            {
                new: true,
            }
        );
        res.json(updated.details);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateProfile = async (req, res) => {
    try {

        const { about, birthday, currentCity, favouriteFood, facebook, instagram, youtube, gender } = req.body;
        console.log(about, birthday, currentCity, favouriteFood, facebook, instagram, youtube, gender);
        // Find the user by ID
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // // Update profile information
        // user.details.about = about || user.details.about;
        // user.birthday = birthday ? new Date(birthday) : user.birthday;
        // user.details.currentCity = currentCity || user.details.currentCity;
        // user.details.favouriteFood = favouriteFood || user.details.favouriteFood;
        // user.details.facebook = facebook || user.details.facebook;
        // user.details.instagram = instagram || user.details.instagram;
        // user.details.youtube = youtube || user.details.youtube;
        // user.gender = gender || user.gender;

        // Track the updated fields
        const updatedFields = {};

        // Update profile information only if the field is provided
        if (about !== undefined) {
            user.details.about = about;
            updatedFields.about = about;
        }
        if (birthday !== undefined) {
            user.birthday = new Date(birthday);
            updatedFields.birthday = user.birthday;
        }
        if (currentCity !== undefined) {
            user.details.currentCity = currentCity;
            updatedFields.currentCity = currentCity;
        }
        if (favouriteFood !== undefined) {
            user.details.favouriteFood = favouriteFood;
            updatedFields.favouriteFood = favouriteFood;
        }
        if (facebook !== undefined) {
            user.details.facebook = facebook;
            updatedFields.facebook = facebook;
        }
        if (instagram !== undefined) {
            user.details.instagram = instagram;
            updatedFields.instagram = instagram;
        }
        if (youtube !== undefined) {
            user.details.youtube = youtube;
            updatedFields.youtube = youtube;
        }
        if (gender !== undefined) {
            user.gender = gender;
            updatedFields.gender = gender;
        }

        // Save the updated user profile
        await user.save();

        // Respond with updated user profile
        res.status(200).json({ success: true, message: "Profile updated successfully", updatedFields: updatedFields, });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
};

const follow = async (req, res) => {
    try {
        if (req.user.id !== req.params.id) {
            const sender = await User.findById(req.user.id);
            const receiver = await User.findById(req.params.id);
            if (
                !receiver.followers.includes(sender._id) &&
                !sender.following.includes(receiver._id)
            ) {
                await receiver.updateOne({
                    $push: { followers: sender._id },
                });

                await sender.updateOne({
                    $push: { following: receiver._id },
                });

                // Add notification for the followed user
                const notification = {
                    userId: receiver._id,
                    type: 'new_follower',
                    fromUserId: sender._id,
                    message: `${sender.name} started following you.`,
                };

                await Notification.create(notification);

                res.json({ message: "Following successfully", sender: sender });
            } else {
                return res.status(400).json({ message: "Already following" });
            }
        } else {
            return res.status(400).json({ message: "Following failed" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const unfollow = async (req, res) => {
    try {
        if (req.user.id !== req.params.id) {
            const sender = await User.findById(req.user.id);
            const receiver = await User.findById(req.params.id);
            if (
                receiver.followers.includes(sender._id) &&
                sender.following.includes(receiver._id)
            ) {
                await receiver.updateOne({
                    $pull: { followers: sender._id },
                });

                await sender.updateOne({
                    $pull: { following: receiver._id },
                });
                res.json({ message: "Unfollow successfully" });
            } else {
                return res.status(400).json({ message: "Already not following" });
            }
        } else {
            return res.status(400).json({ message: "Unfollow failed" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const searchTerm = async (req, res) => {
    try {
        const searchTermParam = req.params.searchTerm;
        const userId = req.user.id; // Assuming you get user ID from auth middleware

        // Search in User model for matching users
        const userResults = await User.find({ name: { $regex: searchTermParam, $options: 'i' } }).select(
            "name username picture"
        );

        // Search in SearchTerm model for matching search terms using a regex for partial matches
        const termResults = await SearchTerm.find({
            term: { $regex: searchTermParam, $options: 'i' } // Case-insensitive search
        }).select("term searchCount");

        // Combine results into a single response object
        const combinedResults = [...userResults, ...termResults];
        res.json(combinedResults);

    } catch (error) {
        console.error("Error in searchTerm:", error);  // Log error details
        res.status(500).json({ message: error.message });
    }
};

const saveSearchTerm = async (req, res) => {
    try {
        const searchTermParam = req.params.searchTerm;
        const userId = req.user.id; // Assuming you get user ID from auth middleware

        // Save or update the search term in the SearchTerm model
        let searchTermDoc = await SearchTerm.findOne({ term: searchTermParam });

        if (searchTermDoc) {
            // If the term already exists, update the user searches
            const userSearch = { user: userId, timestamp: new Date() };
            const existingUserSearch = searchTermDoc.searches.find(search => search.user.toString() === userId);

            if (existingUserSearch) {
                // If the user already searched this term, update the timestamp
                existingUserSearch.timestamp = new Date();
            } else {
                // If it's a new search by the user, push the new search
                searchTermDoc.searches.push(userSearch);
            }
        } else {
            // If the term does not exist, create a new entry
            searchTermDoc = new SearchTerm({
                term: searchTermParam,
                searches: [{ user: userId }],
            });
        }

        // Save the updated or new search term document
        await searchTermDoc.save();

        res.json("ok");

    } catch (error) {
        console.error("Error in searchTerm:", error);  // Log error details
        res.status(500).json({ message: error.message });
    }
}

const addToSearchHistory = async (req, res) => {
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

const saveSearchTermAndHistory = async (req, res) => {
    try {
        const searchTermParam = req.params.searchTerm; // Get the search term from the request params
        const userId = req.user.id; // Assuming you get user ID from auth middleware

        // Save or update the search term in the SearchTerm model
        let searchTermDoc = await SearchTerm.findOne({ term: searchTermParam });

        if (searchTermDoc) {
            // If the term already exists, update the user searches
            const userSearch = { user: userId, timestamp: new Date() };
            const existingUserSearch = searchTermDoc.searches.find(search => search.user.toString() === userId);

            if (existingUserSearch) {
                // If the user already searched this term, update the timestamp
                existingUserSearch.timestamp = new Date();
            } else {
                // If it's a new search by the user, push the new search
                searchTermDoc.searches.push(userSearch);
            }
        } else {
            // If the term does not exist, create a new entry
            searchTermDoc = new SearchTerm({
                term: searchTermParam,
                searches: [{ user: userId, timestamp: new Date() }], // Initialize with the user's search
            });
        }

        // Save the updated or new search term document
        await searchTermDoc.save();

        // Update user's search history
        const searchHistoryEntry = {
            searchTerm: searchTermParam,
            createdAt: new Date(),
        };

        const user = await User.findById(userId);
        const existingHistoryEntry = user.search.find(entry => entry.searchTerm === searchTermParam);

        if (existingHistoryEntry) {
            // If the search term already exists in user's history, update the timestamp
            await User.updateOne(
                {
                    _id: userId,
                    "search._id": existingHistoryEntry._id,
                },
                {
                    $set: { "search.$.createdAt": new Date() },
                }
            );
        } else {
            // If it's a new search, push the new entry into user's search history
            await User.findByIdAndUpdate(userId, {
                $push: { search: searchHistoryEntry },
            });
        }

        res.json("ok");

    } catch (error) {
        console.error("Error in saveSearchTermAndHistory:", error);  // Log error details
        res.status(500).json({ message: error.message });
    }
};

const getSearchHistory = async (req, res) => {
    try {
        const results = await User.findById(req.user.id)
            .select("search")
        res.json(results.search);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const removeFromSearch = async (req, res) => {
    try {
        const searchTerm = req.params.searchTerm; // Get the search term from the request params
        // const { searchTerm } = req.body;
        const userId = req.user.id;

        console.log("Removing search term:", searchTerm);
        console.log("User ID:", userId);

        const updateResult = await User.updateOne(
            { _id: userId },
            { $pull: { search: { searchTerm: searchTerm } } }
        );

        if (updateResult.nModified > 0) {
            res.json({ message: "Search term removed successfully." });
        } else {
            res.status(404).json({ message: "Search term not found." });
        }
    } catch (error) {
        console.error("Error in removeFromSearch:", error);
        res.status(500).json({ message: error.message });
    }
};

const clearSearchHistory = async (req, res) => {
    try {
        const userId = req.user.id; // Ensure user ID is retrieved from auth middleware

        // Update the user's document by setting the search array to an empty array
        await User.findByIdAndUpdate(userId, { search: [] });

        res.json({ message: 'Search history cleared successfully.' });
    } catch (error) {
        console.error("Error in clearSearchHistory:", error);
        res.status(500).json({ message: error.message });
    }
};

const searchResult = async (req, res) => {
    try {
        const searchTermParam = req.params.term;
        // console.log(searchTermParam);
        const userId = req.user.id; // Assuming you get user ID from auth middleware

        // Step 1: Search in User model for matching users
        const userResults = await User.find({
            // name: { $regex: `\\b${searchTermParam}\\b`, $options: 'i' }
            name: { $regex: searchTermParam, $options: 'i' }
        })
            .select("name username picture")
            .lean()
            .exec();

        // Step 2: Search in Post model for matching posts
        const postResults = await Post.find({
            $or: [
                // { text: { $regex: `\\b${searchTermParam}\\b`, $options: 'i' } },
                // { hashtag: { $regex: `#${searchTermParam}\\b`, $options: 'i' } }
                { text: { $regex: searchTermParam, $options: 'i' } },
                { hashtag: { $regex: searchTermParam, $options: 'i' } }
            ]
        })
            .populate('user', 'name username picture')
            .populate({
                path: 'sharedPost', // Populate the sharedPost field
                populate: {
                    path: 'user', // Populate the user inside sharedPost
                    select: 'name picture username gender _id' // Select fields to retrieve from user
                }
            })
            .sort({ likes: -1, createdAt: -1 })  // Sort by likes and recency for relevance
            .lean()
            .exec();

        // Step 3: Combine results and sort by custom relevance criteria
        const combinedResults = [
            ...userResults.map(user => ({ ...user, type: 'user' })),
            ...postResults.map(post => ({ ...post, type: 'post' }))
        ];

        res.json(combinedResults);
        console.log(combinedResults);

    } catch (error) {
        console.error("Error in searchTerm:", error);  // Log error details
        res.status(500).json({ message: error.message });
    }
};

const addToFoodVenueWishlist = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming you get user ID from auth middleware
        const { id } = req.params;

        //Add attribute if database does not have
        // await User.updateMany({ foodVenueWishlist: { $exists: false } }, { foodVenueWishlist: [] });
        console.log("userid", userId);
        console.log("id", id);

        const user = await User.findByIdAndUpdate(
            userId,
            { $addToSet: { foodVenueWishlist: id } }, // Avoids duplicates
            { new: true }
        ).populate("foodVenueWishlist");

        res.status(200).json(user.foodVenueWishlist);
        console.log(user.foodVenueWishlist);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Error adding to wishlist" });
    }
};

const removeFromFoodVenueWishlist = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming authentication middleware
        const { id } = req.params;

        const user = await User.findByIdAndUpdate(
            userId,
            { $pull: { foodVenueWishlist: id } },
            { new: true }
        ).populate("foodVenueWishlist");

        res.status(200).json(user.foodVenueWishlist);
    } catch (error) {
        res.status(500).json({ message: "Error adding to wishlist" });
    }
};

const getFoodVenueWishlist = async (req, res) => {
    try {
        // Assuming user is authenticated and we have req.user.id
        const user = await User.findById(req.user.id).populate("foodVenueWishlist"); // Populate wishlist with restaurant details
        if (!user) return res.status(404).json({ message: "User not found" });

        res.json(user.foodVenueWishlist); // Respond with populated wishlist
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// In your wishlist controller file
const checkFoodVenueInWishlist = async (req, res) => {
    try {
        const { id } = req.params; // ID of the food venue to check
        const userId = req.user.id; // Authenticated user's ID

        const user = await User.findById(userId);

        if (!user) return res.status(404).json({ message: "User not found" });

        // Check if the foodVenue ID exists in the user's wishlist
        const isInWishlist = user.foodVenueWishlist.includes(id);

        res.json({ isInWishlist });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error checking wishlist" });
    }
};

const getFoodVenueMapList = async (req, res) => {
    try {
        const { username } = req.params;
        const user = await User.findOne({ username });
        // Assuming user is authenticated and we have req.user.id
        // const user = await User.findById(req.user.id); // Populate wishlist with restaurant details
        if (!user) return res.status(404).json({ message: "User not found" });

        res.json(user.foodVenueMaplist); // Respond with populated wishlist

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" + error });
    }
};

// const getSavedPost = async (req, res) => {
//     try {
//       // Find the user by their ID and populate the saved posts' post details
//       const user = await User.findById(req.user.id)
//         .populate('savedPost.post');  // Populate the post field within savedPost
//         // .exec();

//       if (!user) {
//         return res.status(404).json({ message: 'User not found' });
//       }

//       // You may want to transform the data before sending it back
//       const savedPosts = user.savedPost.map(saved => ({
//         post: saved.post,  // This is the populated post document
//         savedAt: saved.savedAt
//       }));

//       res.json({ savedPosts });
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   };
const getSavedPost = async (req, res) => {
    try {
        const { username } = req.params;
        // const profile = await User.findOne({ username })
        // Find the user by their ID and populate the saved posts' post details
        const user = await User.findOne({ username })
            .populate('savedPost.post');  // Populate the post field within savedPost

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Filter out any saved posts where the post does not exist
        const savedPosts = user.savedPost
            .filter(saved => saved.post !== null && saved.post !== undefined)  // Only keep saved posts with a valid post
            .map(saved => ({
                post: saved.post,  // This is the populated post document
                savedAt: saved.savedAt
            }));

        console.log(savedPosts);
        // Return the filtered list of saved posts
        res.json({ savedPosts });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateName = async (req, res) => {
    const { userId } = req.params
    const { name } = req.body

    if (!name || name.trim() === "") {
        return res.status(400).json({ message: "Name cannot be empty" })
    }

    try {
        // Find the user by ID and update their name
        const user = await User.findByIdAndUpdate(
            userId,
            { name },
            { new: true } // Return the updated user
        )

        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        // Send back the updated user
        res.status(200).json(user);

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "An error occurred while updating the name" })
    }
}

module.exports = {
    register,
    login,
    searchPeople,
    findUser,
    sendResetPasswordCode,
    validateResetCode,
    changePassword,
    getProfile,
    updateProfilePicture,
    updateCover,
    updateDetails,
    getListImages,
    follow,
    unfollow,
    searchTerm,
    saveSearchTerm,
    addToSearchHistory,
    saveSearchTermAndHistory,
    getSearchHistory,
    removeFromSearch,
    clearSearchHistory,
    searchResult,
    addToFoodVenueWishlist,
    removeFromFoodVenueWishlist,
    getFoodVenueWishlist,
    checkFoodVenueInWishlist,
    getFoodVenueMapList,
    getSavedPost,
    updateProfile,
    updateName,
    // auth,
};