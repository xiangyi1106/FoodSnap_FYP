const express = require("express");
const { addPromotion, getPublicPromotions, getPromotionDetails, searchPromotion, updatePromotion } = require("../controllers/promotion");
const { authUser } = require("../middleware/auth")
const router = express.Router();

router.post("/addPromotion", authUser, addPromotion);
router.get("/getPublicPromotions", getPublicPromotions);
router.get("/api/promotion/search", searchPromotion);
router.get("/api/promotion/:id", getPromotionDetails);
router.put('/api/promotion/update/:id', authUser, updatePromotion);

module.exports = router;