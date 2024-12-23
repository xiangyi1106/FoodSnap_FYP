const FoodVenueMap = require('../models/FoodVenueMap');
const User = require('../models/User');

exports.addFoodVenueToProfileMap = async (req, res) => {
    const { name, address, latitude, longitude, description, venueImage } = req.body;
    const userId = req.user.id;
  
    // Validate the input data
    if (!name || !address || !latitude || !longitude) {
      return res.status(400).json({ message: "All fields except description are required." });
    }

    const existingVenue = await FoodVenueMap.findOne({
        name: { $regex: `^${name.trim()}$`, $options: 'i' }, // Case-insensitive name match
        address: { $regex: `^${address.trim()}$`, $options: 'i' }, // Case-insensitive address match
      });
  
      if (existingVenue) {
        return res.status(400).json({
          message: 'A food venue with the same name and address already exists.',
          foodVenue: existingVenue,
        });
      }
  
    try {
      // Create a new food venue
      const newFoodVenue = new FoodVenueMap({
        user: userId,
        name,
        address,
        latitude,
        longitude,
        description,
        venueImage,
      });
  
      // Save to the database
      await newFoodVenue.save();
  
      // Respond with the saved food venue
      res.status(201).json({
        success: true,
        foodVenue: newFoodVenue,
      });
    } catch (err) {
      console.error("Error adding food venue:", err);
      res.status(500).json({ message: "Error adding food venue:", err });
    }
  };

  exports.getFoodVenuesProfileMap = async (req, res) => {
    try {
        const foodVenues = await FoodVenueMap.find({ user: req.user.id }); // Fetch food venues for the authenticated user
        res.json({ success: true, foodVenues });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error, please try again" });
    }
  }