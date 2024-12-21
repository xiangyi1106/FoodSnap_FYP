const User = require("../models/User");
const Promotion = require("../models/Promotion");

exports.addPromotion = async (req, res) => {
    const {
        promotionName,
        date,
        time,
        endDate,
        endTime,
        promotionImage,
        location,
        description,
        termsAndConditions,
        privacy,
        foodVenue,
    } = req.body;

    try {
        // Automatically use the current logged-in user as the organizer
        const organizer = req.user.id;

        // Check if an promotion with the same name, date, and location already exists
        const existingPromotion = await Promotion.findOne({
            name: promotionName,
            date: date,
            "location.address": location.address
        });

        if (existingPromotion) {
            return res.status(400).json({ message: "Promotion already exists at this location and date" });
        }

        // If no such promotion exists, create a new promotion
        const newPromotion = new Promotion({
            name: promotionName,
            date,
            time,
            endDate,
            endTime,
            image: promotionImage,
            location: {
                name: location.name,
                address: location.address, // Full address
                latitude: location.latitude, // Latitude from the selected place
                longitude: location.longitude, // Longitude from the selected place
            },
            description,
            termsAndConditions,
            organizer, // Save current user as the organizer
            privacy,
            foodVenue,
        });

        await newPromotion.save();
        res.status(201).json(newPromotion);
    } catch (error) {
        console.error('Error saving promotion:', error);
        res.status(500).json({ message: 'Server error, unable to save promotion' });
    }
};

exports.getPublicPromotions = async (req, res) => {
    try {
        const promotions = await Promotion.find() // Fetch only public promotions
            .sort({ createdAt: -1 }); // Sort by newest to oldest
        res.json(promotions);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.getPromotionsByID = async (req, res) => {
    try {
        console.log("Request Params:", req.params); // Debugging
        const id = req.params.id;
        console.log(id);
        let promotions;

        if (id) {
            promotions = await Promotion.find({ foodVenue: id }) // Fetch promotions matching the given foodVenue ID
                .sort({ createdAt: -1 });

        }

        if (promotions.length === 0) {
            return res.status(404).json({ message: "No public promotions found." }); // Handle empty result
        }
        console.log(promotions);

        return res.json(promotions); // Return the promotions


    } catch (error) {
        console.error("Error fetching promotions:", error);
        return res.status(500).json({ message: error.message }); // Handle server error
    }
};


exports.getPromotionDetails = async (req, res) => {
    try {

        const promotionId = req.params.id;

        const promotion = await Promotion.findById(promotionId).populate("organizer", "name picture username gender");

        if (!promotion) {
            return res.status(404).json({ message: 'Promotion not found' });
        }

        res.json(promotion);

    } catch (error) {
        console.error('Error fetching promotion:', error);
        res.status(500).json({ message: 'Server error:' + error });
    }
};

exports.searchPromotion = async (req, res) => {
    try {
        const { keyword, location, startDate } = req.query;

        // Initialize query object
        let query = {};

        // Keyword search (e.g., search in promotion title or description)
        if (keyword) {
            query.$or = [
                { name: { $regex: keyword, $options: 'i' } }, // Case-insensitive search
                { description: { $regex: keyword, $options: 'i' } }
            ];
        }

        // Location filter (if provided)
        if (location && location !== 'none') {
            query['location.name'] = { $regex: location, $options: 'i' }; // Partial match for location with case insensitive
        }

        // Date filter (if provided)
        if (startDate && startDate !== 'Any Date') {
            const now = new Date();
            let startOfDay, endOfDay;

            switch (startDate) {
                case 'Today':
                    // Start and end of today in UTC
                    startOfDay = new Date(now.setUTCHours(0, 0, 0, 0)); // Midnight UTC
                    endOfDay = new Date(now.setUTCHours(23, 59, 59, 999)); // End of day UTC
                    query.date = { $gte: startOfDay, $lt: endOfDay };
                    break;

                case 'Tomorrow':
                    const tomorrow = new Date(now);
                    tomorrow.setUTCDate(now.getUTCDate() + 1); // Tomorrow's date
                    startOfDay = new Date(tomorrow.setUTCHours(0, 0, 0, 0));
                    endOfDay = new Date(tomorrow.setUTCHours(23, 59, 59, 999));
                    query.date = { $gte: startOfDay, $lt: endOfDay };
                    break;

                case 'This Week':
                    const startOfWeek = new Date(now.setUTCHours(0, 0, 0, 0));
                    startOfWeek.setUTCDate(startOfWeek.getUTCDate() - startOfWeek.getUTCDay()); // Start of this week (Sunday)
                    const endOfWeek = new Date(startOfWeek);
                    endOfWeek.setUTCDate(endOfWeek.getUTCDate() + 7); // End of this week (next Sunday)
                    query.date = { $gte: startOfWeek, $lt: endOfWeek };
                    break;

                case 'Next Week':
                    const startOfNextWeek = new Date(now);
                    startOfNextWeek.setUTCDate(now.getUTCDate() + 7 - now.getUTCDay()); // Start of next week (Sunday)
                    const endOfNextWeek = new Date(startOfNextWeek);
                    endOfNextWeek.setUTCDate(endOfNextWeek.getUTCDate() + 7); // End of next week (Sunday)
                    query.date = { $gte: startOfNextWeek, $lt: endOfNextWeek };
                    break;

                case 'This Month':
                    const startOfMonth = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1)); // Start of this month
                    const endOfMonth = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 0)); // End of this month
                    query.date = { $gte: startOfMonth, $lt: endOfMonth };
                    break;

                case 'Next Month':
                    const startOfNextMonth = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1)); // Start of next month
                    const endOfNextMonth = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 2, 0)); // End of next month
                    query.date = { $gte: startOfNextMonth, $lt: endOfNextMonth };
                    break;

                default:
                    break;
            }
        }
        // console.log(query);

        // Query the database for matching promotions
        const promotions = await Promotion.find(query).sort({ date: -1 });;
        console.log(promotions);

        res.status(200).json(promotions);
    } catch (error) {
        console.error('Error fetching promotions:', error);
        res.status(500).json({ message: 'Error fetching promotions', error });
    }
};

// Update promotion controller without validationResult
exports.updatePromotion = async (req, res) => {
    const { promotionName, date, time, endDate, endTime, location, description, promotionImage, privacy } = req.body;
    const promotionId = req.params.id;

    try {
        // Find the promotion by ID
        let promotion = await Promotion.findById(promotionId).populate("organizer", "name picture username gender");

        if (!promotion) {
            return res.status(404).json({ message: 'Promotion not found' });
        }

        // Ensure the promotion has an organizer and the user is the owner of the promotion
        if (!promotion.organizer || promotion.organizer.id.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        // Update only the fields that are provided (patch-like behavior)
        if (promotionName) promotion.name = promotionName;
        if (date) promotion.date = date;
        if (time) promotion.time = time;
        if (endDate) promotion.endDate = endDate;
        if (endTime) promotion.endTime = endTime;
        // Check if the location has changed and update accordingly
        if (location) {
            if (location.name !== promotion.location.name ||
                location.latitude !== promotion.location.latitude ||
                location.longitude !== promotion.location.longitude) {
                promotion.location = {
                    name: location.name || promotion.location.name,
                    address: location.address || promotion.location.address,
                    latitude: location.latitude || promotion.location.latitude,
                    longitude: location.longitude || promotion.location.longitude,
                    place_id: location.place_id || promotion.location.place_id,
                };
            }
        }
        if (description) promotion.description = description;
        if (termsAndConditions) promotion.termsAndConditions = termsAndConditions;
        if (promotionImage) promotion.image = promotionImage;
        if (privacy) promotion.privacy = privacy;

        // Save the updated promotion
        await promotion.save();

        // Send back the updated promotion details
        res.status(200).json({ message: 'Promotion updated successfully', promotion });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


