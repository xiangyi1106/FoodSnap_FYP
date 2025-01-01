const express = require("express");
const { 
    register, 
    login, 
    searchPeople, 
    findUser, 
    sendResetPasswordCode, 
    validateResetCode, 
    changePassword, 
    getProfile, 
    updateProfilePicture, 
    getListImages, 
    updateCover, 
    updateDetails, 
    follow, 
    unfollow, 
    searchTerm, 
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
} = require("../controllers/user");

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

router.put("/updateProfile", authUser, updateProfile);

router.put("/follow/:id", authUser, follow);

router.put("/unfollow/:id", authUser, unfollow);

router.post("/search/:searchTerm", authUser, searchTerm);

router.put("/saveSearchTermAndHistory/:searchTerm", authUser, saveSearchTermAndHistory);

router.get("/getSearchHistory", authUser, getSearchHistory);

router.put("/removeFromSearch", authUser, removeFromSearch);

router.delete('/clearSearchHistory', authUser, clearSearchHistory);

router.get('/searchResult/:term', authUser, searchResult);

router.put("/addToFoodVenueWishlist/:id", authUser, addToFoodVenueWishlist );

router.put("/removeFromFoodVenueWishlist/:id", authUser, removeFromFoodVenueWishlist );

router.get('/getFoodVenueWishlist', authUser, getFoodVenueWishlist);

router.get("/checkFoodVenueInWishlist/:id", authUser, checkFoodVenueInWishlist );

router.get('/getFoodVenueMapList/:username', authUser, getFoodVenueMapList);

router.get("/getSavedPost/:username", authUser, getSavedPost);

module.exports = router;