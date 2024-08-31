const express = require("express");
const { uploadImagesAndVideos, listImages } = require("../controllers/uploadMedia");
const mediaUpload = require("../middleware/mediaUpload");
const router = express.Router();
const { authUser } = require("../middleware/auth");

router.post("/uploadMedias", authUser, mediaUpload, uploadImagesAndVideos);
router.post("/listImages", authUser, listImages);

module.exports = router;