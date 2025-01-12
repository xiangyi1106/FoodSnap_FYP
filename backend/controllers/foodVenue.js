
const MenuItem = require('../models/MenuItem');
const FoodVenue = require('../models/FoodVenue');
const User = require('../models/User');

// Route to add new menu item to a food venue
exports.addMenuItem = async (req, res) => {
  const { foodVenueId, name, description, price, category, image } = req.body;

  try {
    // Create a new MenuItem document
    const newMenuItem = new MenuItem({
      name,
      description,
      price,
      category,
      image,
    });

    // Save the MenuItem to the database
    const savedMenuItem = await newMenuItem.save();

    // Update the FoodVenue document with the new MenuItem's ObjectId
    await FoodVenue.findByIdAndUpdate(
      foodVenueId,
      { $push: { menuItems: savedMenuItem._id } },
      { new: true }
    );

    res.status(200).json({ message: 'MenuItem added successfully', menuItem: savedMenuItem });

  } catch (err) {
    console.error('Error adding MenuItem:', err);
    res.status(500).json({ message: 'Server error', error: err });
  }
};

exports.getActivePromotions = async () => {
  const now = new Date();
  const promotions = await Promotion.find({
    startDate: { $lte: now },
    endDate: { $gte: now },
    isActive: true
  });

  // Update `isActive` field if necessary
  await Promotion.updateMany(
    { endDate: { $lt: now }, isActive: true },
    { $set: { isActive: false } }
  );

  return promotions;
};

exports.getActiveEvents = async () => {
  const now = new Date();
  const events = await Event.find({
    startDate: { $lte: now },
    endDate: { $gte: now },
    isActive: true
  });

  // Update `isActive` field if necessary
  await Event.updateMany(
    { endDate: { $lt: now }, isActive: true },
    { $set: { isActive: false } }
  );

  return events;
};

exports.saveFoodVenues = async (req, res) => {
  try {
    // Access the data sent from the frontend
    const { foodVenues } = req.body;

    if (!foodVenues || !Array.isArray(foodVenues)) {
      return res.status(400).json({ error: "Invalid data format" });
    }

    // Initialize default values for each food venue
    const initializedFoodVenues = foodVenues.map(venue => ({
      ...venue,
      picture: venue.picture || "",
      cover: venue.cover || "", // URL to a cover image of the venue
      phone: "",
      website: "",
      address: venue.address || "",
      priceRange: venue.priceRange || "",
      description: venue.description || "",
      latitude: venue.latitude || 0,
      longitude: venue.longitude || 0,
      openingHours: venue.openingHours || {},
      category: venue.category || [], // Default category if not provided
      otherinfo: venue.otherinfo || [{
        halalOptions: 'No',
        vegetarianOptions: 'No',
        airConditioning: 'No',
        wifi: 'Yes',
        offersTakeout: 'Yes',
        needsReservations: 'No',
        alcoholicDrinks: 'No',
        wheelchairAccessible: 'No',
        dogsAllowed: 'No',
        acceptsDebitCards: 'Yes',
        acceptsCreditCards: 'Yes',
        acceptsTNGBoostQRPayment: 'Yes',
      }],
      // dishesType: venue.dishesType || [], // Default to an empty array if not provided
    }));

    // Save the array of foodVenues to the database
    await FoodVenue.insertMany(initializedFoodVenues)

    return res.status(200).json("FoodVenues saved successfully!");

  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to save foodVenues.");
  }
}

exports.getFoodVenues = async (req, res) => {
  try {
    // Get the address keyword from the request query
    const { address } = req.query;

    // Check if address keyword is provided
    if (!address) {
      return res.status(400).json({ error: "Address keyword is required." });
    }

    // Use regex to perform a case-insensitive search on the address field
    const foodVenues = await FoodVenue.find({
      address: { $regex: address, $options: 'i' } // 'i' makes it case-insensitive
    }).sort({ rating: -1 });

    // Check if any food venues were found
    if (foodVenues.length === 0) {
      return res.status(404).json({ message: "No food venues found." });
    }

    // Return the found food venues
    return res.status(200).json(foodVenues);

  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to retrieve food venues.");
  }
};

exports.getFoodVenueDetails = async (req, res) => {
  try {

    const id = req.params.id;
    const foodVenue = await FoodVenue.findById(id);
    if (!foodVenue) {
      return res.status(404).json({ message: 'Food venue not found' });
    }

    res.json(foodVenue);

  } catch (error) {
    console.error('Error fetching food venue:', error);
    res.status(500).json({ message: 'Server error:' + error });
  }
};

exports.updateFoodVenueDetails = async (req, res) => {
  const { id } = req.params;
  const {
    restaurantName,
    address,
    latitude,
    longitude,
    phone,
    website,
    description,
    otherInfo,
    serviceCharge,
    sstCharge,
    priceRange,
    openingHours,
    category,
    // profilePicture,
    // coverPicture,
  } = req.body;

  try {
    // Find the existing food venue by its ID
    const foodVenue = await FoodVenue.findById(id);
    if (!foodVenue) {
      return res.status(404).json({ success: false, message: 'Food venue not found' });
    }

    const userId = req.user.id; // For example, from a JWT token
    const user = await User.findById(userId);

    // If user doesn't exist or their role isn't 'business_owner', reject the request
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.',
      });
    }

    // if (user.role !== 'business' || user.foodVenueOwned !== id) {
    //   return res.status(403).json({
    //     success: false,
    //     message: 'You must be the business owner to edit the information.',
    //   });
    // }

    let categoryArray = [];

    if (category) {
      if (typeof category === 'string') {
        categoryArray = category.includes(',')
          ? category.split(',').map((item) => item.trim()).filter((item) => item.length > 0)
          : [category.trim()];
      }
    } else {
      categoryArray = foodVenue.category || [];
    }

    // Update the food venue with new data
    foodVenue.name = restaurantName;
    foodVenue.address = address;
    foodVenue.latitude = latitude;
    foodVenue.longitude = longitude;
    foodVenue.phone = phone;
    foodVenue.website = website;
    foodVenue.description = description;
    foodVenue.otherinfo = otherInfo;
    foodVenue.serviceCharge = serviceCharge;
    foodVenue.sstCharge = sstCharge;
    foodVenue.priceRange = priceRange;
    foodVenue.openingHours = openingHours;
    foodVenue.category = categoryArray;

    // Check for file uploads and update image URLs if new files were uploaded
    if (req.body.profilePicture) {
      foodVenue.picture = req.body.profilePicture; // Assume you're saving the file path
    }
    if (req.body.coverPicture) {
      foodVenue.cover = req.body.coverPicture; // Same as above
    }

    // Save the updated food venue to the database
    await foodVenue.save();

    // Return the updated food venue data
    res.json({ success: true, message: 'Food venue updated successfully', updatedFoodVenue: foodVenue });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' + error });
  }
};

exports.updateMenu = async (req, res) => {
  const { placeId } = req.params;
  const { medias } = req.body; // Expecting an array of image URLs

  // Check if the menu is an array
  if (!Array.isArray(medias)) {
    return res.status(400).json({ error: 'Menu must be an array of image URLs.' });
  }

  try {
    // Find the food venue by ID
    const foodVenue = await FoodVenue.findById(placeId);

    if (!foodVenue) {
      return res.status(404).json({ error: 'Food venue not found.' });
    }

    // If the food venue already has a menu, we append the new items
    if (foodVenue.menu && foodVenue.menu.length > 0) {
      // Append the new menu items to the existing menu array
      foodVenue.menu = [...foodVenue.menu, ...medias];
    } else {
      // If the menu doesn't exist or is empty, create a new menu with the provided items
      foodVenue.menu = medias;
    }

    // Save the updated food venue
    const updatedFoodVenue = await foodVenue.save();

    // Return the updated food venue
    // res.status(200).json(foodVenue.menu);
    // Return the updated food venue with the menu array
    res.status(200).json({
      success: true,
      message: 'Menu updated successfully',
      foodVenue: updatedFoodVenue,  // Optionally, return the full updated food venue
      menu: updatedFoodVenue.menu   // Return just the updated menu
    });

  } catch (error) {
    console.error("Error updating menu:", error);
    res.status(500).json({ error: 'Failed to update menu.' + error.message });
  }
};

exports.searchFoodVenue = async (req, res) => {
  try {
    const foodVenueName = decodeURIComponent(req.query.term);
    const location = decodeURIComponent(req.query.location);
    // const { location } = req.body;
    // Validate that both 'term' and 'location' are provided
    console.log(foodVenueName);
    console.log(location);

     // Escape special characters for regex
     const escapeRegex = (text) => {
      return text.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    };

    var foodVenues = [];
    if (foodVenueName !== "") {
      foodVenues = await FoodVenue.find({
        $and: [
          // { name: { $regex: `^${foodVenueName}`, $options: 'i' } }, // Match in text
          { name: { $regex: escapeRegex(foodVenueName), $options: 'i' } },
          { address: { $regex: escapeRegex(location), $options: 'i' } }, // Match in text
        ],
      })
        .sort({ rating: -1 }); // Sort by newest to oldest
    } else {
      foodVenues = await FoodVenue.find({
        address: { $regex: location, $options: 'i' } // 'i' makes it case-insensitive
      })
        .sort({ rating: -1 }); // Sort by newest to oldest
    }
    res.json(foodVenues);

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getAllFoodVenues = async (req, res) => {
  try {

    // Use regex to perform a case-insensitive search on the address field
    const foodVenues = await FoodVenue.find();

    // Check if any food venues were found
    if (foodVenues.length === 0) {
      return res.status(404).json([]);
    }

    // Return the found food venues
    return res.status(200).json(foodVenues);

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Failed to retrieve food venues.");
  }
};


exports.createFoodVenue = async (req, res) => {
  const {
    restaurantName,
    address,
    latitude,
    longitude,
    phone,
    website,
    description,
    otherInfo,
    serviceCharge,
    sstCharge,
    priceRange,
    openingHours,
    category,
  } = req.body;

  // Assuming you have the userId in req.user after authentication
  const userId = req.user.id; // For example, from a JWT token

  try {
    // Step 1: Check for existing restaurant by name and address
    const existingVenue = await FoodVenue.findOne({
      name: { $regex: `^${restaurantName.trim()}$`, $options: 'i' }, // Case-insensitive name match
      address: { $regex: `^${address.trim()}$`, $options: 'i' }, // Case-insensitive address match
    });

    if (existingVenue) {
      return res.status(400).json({
        message: 'A food venue with the same name and address already exists.',
        foodVenue: existingVenue,
      });
    }

    // Fetch the user from the database to check if they are a business owner
    const user = await User.findById(userId);

    // If user doesn't exist or their role isn't 'business_owner', reject the request
    if (!user) {
      return res.status(404).json({
        message: 'User not found.',
      });
    }

    if (user.role !== 'business' || user.foodVenueOwned !== null) {
      return res.status(403).json({
        message: 'You must be a business owner and not already own a food venue to create one.',
      });
    }

    let categoryArray = [];

    if (typeof category === 'string') {
      // Check if the category string contains a comma
      if (category.includes(',')) {
        // Split by commas and trim whitespace
        categoryArray = category.split(',').map((item) => item.trim());
        // Filter out any empty strings in the array
        categoryArray = categoryArray.filter((item) => item.length > 0);
      } else {
        // Save as a single-item array if there's no comma
        categoryArray = [category.trim()];
      }
    } else {
      // Default to an empty array if not a string
      categoryArray = [];
    }

    // Create the food venue with the provided data
    const foodVenue = new FoodVenue({
      name: restaurantName,
      address,
      latitude,
      longitude,
      phone,
      website,
      description,
      otherinfo: otherInfo,
      serviceCharge,
      sstCharge,
      priceRange,
      openingHours,
      category: categoryArray,
    });

    // Save the food venue to the database
    const savedFoodVenue = await foodVenue.save();

    // Associate the food venue with the user
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        foodVenueOwned: savedFoodVenue._id,  // Associate foodVenue ID with the user
      },
      { new: true } // Return the updated document
    );

    // Return a success response with the updated user and food venue
    return res.status(201).json({
      // message: 'Food venue created successfully and associated with the user.',
      user: updatedUser,
      foodVenue: savedFoodVenue,
    });

  } catch (error) {
    console.error('Error creating food venue:', error);
    return res.status(500).json({
      message: 'Error creating food venue',
      error: error.message,
    });
  }
};

exports.searchFoodVenuesByFilter = async (req, res) => {
  const { categories, priceLevel, location } = req.body;

  const query = {};

  // Handle categories filter
  if (categories && categories.length > 0) {
    query.category = { $in: categories };
  }

  // Handle priceLevel filter
  if (priceLevel) {
    if (priceLevel === 'RM1-20') {
      // Show only RM0-10 price range venues
      query.priceRange = 'RM1-20';
    } else if (priceLevel === 'RM20-40') {
      // Exclude RM0-10 price range venues, show RM10-20 only
      query.priceRange = { $ne: 'RM1-20' }; // Exclude RM0-10
    } else {
      // For other price levels, use them as-is
      query.priceRange = priceLevel;
    }
  }

  if (location) {
    query.address = { $regex: new RegExp(location, 'i') }; // Case-insensitive regex match for location
  }

  try {
    // Find venues with the query filters applied
    const venues = await FoodVenue.find(query);
    res.json(venues);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching venues' });
  }
};
