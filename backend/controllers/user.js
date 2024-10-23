const { generateToken } = require("../helpers/tokens");
const { validateEmail, validateLength, validateUsername, validatePassword } = require("../helpers/validation");
const { generateCode } = require("../helpers/generateCode");
const User = require("../models/User");
const Code = require("../models/Code");
const Post = require('../models/Post');
const bcrypt = require("bcrypt");


const register = async (req, res) => {

    try {
        const {
            username,
            name,
            email,
            password,
            bYear,
            bMonth,
            bDay,
            gender,
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
            bYear,
            bMonth,
            bDay,
            gender,
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
            message: "Register successfully! Please activation your email to start."
        });

    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ message: "Internal Server Error" });
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
        });

    } catch (error) {
        res.status(500).json({ message: error.message });

    }
}

// const searchPeople = async (req, res) => {

//     try {
//         const userID = req.headers['user_id'];// Assuming you have the current user object available in the request
//         // Check if userID is undefined or null
//         if (!userID) {
//             return res.status(400).json({ message: 'User ID is required' });
//         }

//         const users = await User.find().sort({ name: 1 }); // Sort by username in ascending order
//         const filteredUsers = users.filter(user => user._id.toString() !== userID.toString()); // Filter out the current user
//         console.log(filteredUsers);
//         res.json(filteredUsers);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Server Error' });
//     }
// }

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


// const getProfile = async (req, res) => {
//     try {
//       const { username } = req.params;
//     //   console.log(`Fetching profile for username: ${username}`);

//       const profile = await User.findOne({ username }).select("-password");
//       if (!profile) {
//         // console.log(`Profile not found for username: ${username}`);
//         return res.status(404).json({ ok: false, message: "Profile not found" });
//       }

//       const posts = await Post.find({ user: profile._id })
//         .populate("user")
//         .sort({ createdAt: -1 });
//     //   console.log(`Found posts for user: ${profile._id}`);

//       res.json({ ...profile.toObject(), posts });
//     } catch (error) {
//     //   console.error(`Error fetching profile: ${error.message}`);
//       res.status(500).json({ message: error.message });
//     }
//   };
const DEFAULT_PROFILE_IMAGE_URL = "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg";
const DEFAULT_COVER_IMAGE_URL = "https://mewitti.com/wp-content/themes/miyazaki/assets/images/default-fallback-image.png";

const getProfile = async (req, res) => {
    try {
        const { username } = req.params;
        const user = await User.findById(req.user.id);

        const profile = await User.findOne({ username })
        .select("-password")
        .populate('following', 'username name picture') // Adjust the fields as needed
        .populate('followers', 'username name picture'); // Adjust the fields as needed

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

const deleteProfileImage= async (req, res) => {
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
                res.json({ message: "Following successfully" });
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
    // auth,
};