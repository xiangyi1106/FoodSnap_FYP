
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
  


