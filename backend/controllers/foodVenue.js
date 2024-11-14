
const MenuItem = require('../models/MenuItem');
const FoodVenue = require('../models/FoodVenue');

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
      phone: venue.phone || "",
      website: venue.website || "",
      description: venue.description || "",
      latitude: venue.latitude || 0,
      longitude: venue.longitude || 0,
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
      dishesType: venue.dishesType || [], // Default to an empty array if not provided
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
      });

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
          return res.status(404).json({ message: 'Event not found' });
      }

      res.json(foodVenue);

  } catch (error) {
      console.error('Error fetching food venue:', error);
      res.status(500).json({ message: 'Server error:' + error });
  }
};

