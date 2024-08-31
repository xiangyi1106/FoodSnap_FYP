const express = require("express");
const { register, login, searchPeople, findUser, sendResetPasswordCode, validateResetCode, changePassword, getProfile, updateProfilePicture, getListImages, updateCover, updateDetails, follow, unfollow} = require("../controllers/user");
const { authUser } = require("../middleware/auth");

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get("/searchPeople", searchPeople);

router.post("/findUser", findUser);

router.post("/sendResetPasswordCode", sendResetPasswordCode);

router.post("/validateResetCode", validateResetCode);

router.post("/changePassword", changePassword);

router.get("/getProfile/:username", authUser, getProfile);

router.get('/getImages/:userId', getListImages);

router.put("/updateProfilePicture", authUser, updateProfilePicture);

router.put("/updateCover", authUser, updateCover);

router.put("/updateDetails", authUser, updateDetails);

router.put("/follow/:id", authUser, follow);

router.put("/unfollow/:id", authUser, unfollow);

module.exports = router;