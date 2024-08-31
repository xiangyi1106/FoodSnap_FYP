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
    res.json(media);
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
  const { path, sort, max } = req.body;

  cloudinary.v2.search
    .expression(`${path} AND resource_type:image`)
    .sort_by("created_at", `${sort}`)
    .max_results(max)
    .execute()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err.error.message);
      res.status(500).json({ error: err.error.message });
    });
};

// exports.listImages = async (req, res) => {
//   const { path, sort, max } = req.body;

//   cloudinary.v2.search
//     .expression(`${path}`)
//     .sort_by("created_at", `${sort}`)
//     .max_results(max)
//     .execute()
//     .then((result) => {
//       res.json(result);
//     })
//     .catch((err) => {
//       console.log(err.error.message);
//       res.status(500).json({ error: err.error.message });
//     });
// };

// exports.listImages = async (req, res) => {
//   const { path, sort, max } = req.body;

//   try {
//     const result = await cloudinary.v2.search
//       .expression(`${path}`)
//       .sort_by("created_at", `${sort}`)
//       .max_results(max)
//       .execute();

//     // Filter the results to include only images and extract URLs
//     const images = result.resources
//       .filter(resource => resource.resource_type === "image")
//       .map(resource => ({ url: resource.secure_url }));

//     res.json(images);
//   } catch (err) {
//     console.log(err.error.message);
//     res.status(500).json({ error: err.error.message });
//   }
// };

// exports.listImages = async (req, res) => {
//   const { path, sort, max } = req.body;

//   try {
//     const result = await cloudinary.v2.search
//       .expression(`${path}`)
//       .sort_by("created_at", `${sort}`)
//       .max_results(max)
//       .execute();

//     console.log('Cloudinary response:', result.resources); // Debugging line

//     // Filter the results to include only images
//     const images = result.resources.filter(resource => resource.resource_type === "image");
//     console.log(images);
//     res.json(images);
//   } catch (err) {
//     console.log(err.error.message);
//     res.status(500).json({ error: err.error.message });
//   }
// };



const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};
