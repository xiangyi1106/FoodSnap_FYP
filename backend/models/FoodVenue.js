const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const { ObjectId } = Schema;

// const MenuItemSchema = new Schema({
//     name: { type: String, required: true },
//     description: { type: String },
//     price: { type: Number, required: true },
//     category: { type: String },
//     image: { type: String }
// }, {
//     timestamps: true,
// });

const openingHoursSchema = new mongoose.Schema({
    open: String,
    close: String
});

// Define the FoodVenue schema with embedded Menu
const foodVenueSchema = new Schema({
    name: { type: String, required: true }, // Name of the food venue
    picture: { type: String }, // URL to a picture of the venue
    cover: { type: String }, // URL to a cover image of the venue
    phone: { type: String }, // Contact phone number
    website: { type: String }, // Website URL
    description: { type: String }, // Description of the venue
    address: { type: String }, // Description of the venue
    // address: [{
    //     street: { type: String },
    //     city: { type: String },
    //     state: { type: String },
    //     postalCode: { type: Number },
    //     country: { type: String },
    //     fullAddress: { type: String } // Full address as a single string
    // }],

    latitude: { type: Number },
    longitude: { type: Number },

    openingHours: {
        mon: [openingHoursSchema],
        tue: [openingHoursSchema],
        wed: [openingHoursSchema],
        thu: [openingHoursSchema],
        fri: [openingHoursSchema],
        sat: [openingHoursSchema],
        sun: [openingHoursSchema]
    },

    rating: { type: Number, default: 0 }, // Rating of the venue
    priceRange: { type: String }, // Price level (e.g., "$", "$$", "$$$")
    category: [{ type: String }], //tags
    dishesType: [{ type: String, default: [] }],
    otherinfo: [{
        halalOptions: { type: String, default: 'No' }, // Halal options (e.g., "Yes", "No")
        vegetarianOptions: { type: String, default: 'No' }, // Vegetarian options (e.g., "Yes", "No")
        airConditioning: { type: String, default: 'No' }, // Air conditioning information (e.g., "Yes", "No")
        wifi: { type: String, default: 'Yes' }, // Wi-Fi availability (e.g., "Free", "Paid")
        offersTakeout: { type: String, default: 'Yes' }, // Takeout options (e.g., "Yes", "No")
        needsReservations: { type: String, default: 'No' }, // Reservations needed (e.g., "Yes", "No")
        alcoholicDrinks: { type: String, default: 'No' }, // Alcoholic drinks available (e.g., "Yes", "No")
        wheelchairAccessible: { type: String, default: 'No' },
        dogsAllowed: { type: String, default: 'No' },
        acceptsDebitCards: { type: String, default: 'Yes' },
        acceptsCreditCards: { type: String, default: 'Yes' },
        acceptsTNGBoostQRPayment: { type: String, default: 'Yes' },

    }],

    serviceCharge: { type: Number, default: 0 },
    SSTCharge: { type: Number, default: 0 },
    // Reference to MenuItem
    menuItems: [{ type: ObjectId, ref: 'MenuItem' }]

}, {
    timestamps: true // Automatically manage createdAt and updatedAt fields
});

// Create and export the FoodVenue model
const FoodVenue = model('FoodVenue', foodVenueSchema);

module.exports = FoodVenue;

