const cloudinary = require("cloudinary");
const fs = require("fs");
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});
exports.uploadImagesAndVideos = async (req, res) => {
  try {
    const { path } = req.body;
    let files = Object.values(req.files).flat();
    let media = [];

    for (const file of files) {
      // Determine file type
      const fileType = file.mimetype.match(/^video/) ? "video" : "image";
      // Upload to Cloudinary with metadata
      const result = await uploadToCloudinary(file, path, fileType);

      media.push({ url: result.url, type: fileType });

      // Optionally, remove temporary file
      removeTmp(file.tempFilePath);
    }
    // res.json(media);
    // Send response only once after all uploads succeed
    return res.json(media);

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const uploadToCloudinary = async (file, path, resourceType) => {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(
      file.tempFilePath,
      {
        folder: path,
        resource_type: resourceType, // Set resource type based on file type
      },
      (err, res) => {
        if (err) {
          removeTmp(file.tempFilePath);
          const message = `An error has occurred: ${err.message}`;
          reject(new Error(message));
        } else {
          resolve({
            url: res.secure_url,
          });
        }
      }
    );
  });
};

exports.listImages = async (req, res) => {
  const { path, sort, max, user } = req.body;
  // Create the search expression to include images under the specified path
  let searchExpression = `${path} AND resource_type:image`;

  // Exclude images from the comment_images folder for the specific user
  const excludePath = `${user.username}/comment_images/*`;
  searchExpression += ` AND NOT public_id:${excludePath}`;

  // Exclude images from multiple folders
  // const excludePaths = [
  //   `${user.username}/comment_images/*`,
  //   `${user.username}/promotion/*`,  // Exclude another folder
  //   `${user.username}/event/*` // Exclude yet another folder
  // ];

  // // Add exclusions to the search expression
  // excludePaths.forEach(excludePath => {
  //   searchExpression += ` AND NOT public_id:${excludePath}`;
  // });

  // Define an array of folders to exclude
  // const excludePaths = [
  //   `${user.username}/comment_images/*`,
  //   `${user.username}/promotion/*`,
  //   `${user.username}/event/*`
  // ];

  // // Build the exclusion part of the search expression
  // let exclusionExpression = excludePaths.map(path => `NOT public_id:${path}`).join(' AND ');

  // // Incorporate the exclusion expression into the search expression
  // searchExpression += ` AND (${exclusionExpression})`;


  cloudinary.v2.search
    // .expression(`${path} AND resource_type:image`)
    .expression(searchExpression)
    .sort_by("created_at", `${sort}`)
    // .max_results(max)
    .execute()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err.error.message);
      res.status(500).json({ error: err.error.message });
    });
};

const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};
