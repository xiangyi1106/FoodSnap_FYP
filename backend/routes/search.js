const express = require("express");
const { searchTerm, addToSearchHistory, getSearchHistory, removeFromSearch } = require("../controllers/search");
const { authUser } = require("../middleware/auth");

const router = express.Router();

// router.post("/search/:searchTerm", authUser, searchTerm);
// router.put("/addToSearchHistory", authUser, addToSearchHistory);
// router.get("/getSearchHistory", authUser, getSearchHistory);
// router.put("/removeFromSearch", authUser, removeFromSearch);

module.exports = router;