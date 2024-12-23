const { GoogleGenerativeAI } = require("@google/generative-ai");

exports.getFoodRecommendation = async (req, res) => {
    // Extract preferences from the request body
    let { mealType, mood, dietaryPreference, spicyLevelValue, loveIngredients, avoidIngredients, location } = req.body;

    // Set default values to 'none' if the fields are empty or not provided
    mealType = mealType || 'none';
    mood = mood || 'none';
    dietaryPreference = dietaryPreference || 'none';
    spicyLevelValue = (spicyLevelValue !== undefined && spicyLevelValue !== null) ? spicyLevelValue : 'none';
    loveIngredients = loveIngredients || 'none';
    avoidIngredients = avoidIngredients || 'none';
    location = location || 'Johor Bahru'

    console.log(mealType, mood, dietaryPreference, spicyLevelValue, loveIngredients, avoidIngredients, location);
    try {
        // Initialize the Google Generative AI client
        const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_AI_API_KEY);
        // const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            maxTokens: 200 // Restrict token output for faster response
        });

        const prompt = `
            You are an advanced AI food recommendation expert with extensive knowledge of Malaysian cuisine. Based on the user's preferences below, provide an array of 1-6 highly relevant food recommendations. These recommendations should:
- Be realistic and region-specific.
- Include dishes commonly available in ${location}.
- Avoid items that may not be locally found or have speculative variants.
- Can search the food that match the food venue name too, for example if loveIngredient is seafood, can also search the food venue with the name seafood.

            Meal Type: ${mealType}
            Mood: ${mood}
            Dietary Preference: ${dietaryPreference}
            Spicy Level: ${spicyLevelValue}%
            Loved Ingredients: ${loveIngredients}
            Avoided Ingredients: ${avoidIngredients}
            Location: ${location}, Johor
            If there’s a conflict:
1. Suggest another food for alternative meal types for the loved ingredient.
2. If no match is found, return an empty array []
            Respond only with an array, e.g., ["Laksa", "Roti Canai", "Nasi Lemak"].
        `;

        // Format the response as a array with max six items. Example format:
        // ["Laksa", "Sandwiches", "Roti Canai", 'Nasi Lemak', 
        // 'Char Kway Teow' ]
        // Please give me only the array but not extra text.

        const result = await model.generateContent(prompt);

        let suggestions = await result.response.text();

        console.log('API response:', suggestions);

        // res.json(suggestions);
        // Return the suggestions array as JSON
        // res.json({ suggestions: JSON.parse(suggestions) });
        const jsonStart = suggestions.indexOf('[');
        const jsonEnd = suggestions.lastIndexOf(']') + 1;

        // Extract the JSON content
        if (jsonStart !== -1 && jsonEnd !== -1) {
            suggestions = suggestions.slice(jsonStart, jsonEnd);
        } else {
            // throw new Error('Invalid JSON format');
            suggestions = [];
        }

        food_suggestions = JSON.parse(suggestions);
        res.json({ food_suggestions });

    } catch (error) {
        console.error('Error fetching food suggestions:', error);
        res.status(500).json({ error: 'Failed to fetch food suggestions' });
    }
};

exports.getRestaurantsRecommendation = async (req, res) => {
    // Extract preferences from the request body
    let { food, location } = req.body;

    location = location || 'Johor Bahru';

    try {
        // Initialize the Google Generative AI client
        const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_AI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Create the prompt to request exactly two restaurant suggestions
        const prompt = `
You are an advanced AI food recommendation expert. Based on the following selected food, provide max three food venues/restaurants recommendations that can find that selected food at that location at Johor, Malaysia:
            Food: ${food}
            Location: ${location}, Johor

            For each food venue/restaurant, include the following details:
            - Name
            - Rating
            - Opening Hours
            - Address
            - Description
            - Reason why this food venue/restaurant is suggested

            Format the response as a JSON array with max two objects. Each object should have the fields: name, rating, openHour, address, description, and reason. Example format:
            [
                {
                    "name": "Restaurant Name 1",
                    "rating": 4.5,
                    "openHour": "10 AM - 10 PM",
                    "address": "123 Example St, City",
                    "description": "A brief description of the restaurant.",
                    "reason": "Suggested based on the user's preference for spicy food."
                },
                {
                    "name": "Restaurant Name 2",
                    "rating": 4.0,
                    "openHour": "11 AM - 11 PM",
                    "address": "456 Another St, City",
                    "description": "Another brief description.",
                    "reason": "Well known for its sandwiches."
                }
            ]
            Please give me only the json.
        `;

        const result = await model.generateContent(prompt);

        let restaurant_suggestion = await result.response.text();

        const jsonStart = restaurant_suggestion.indexOf('[');
        const jsonEnd = restaurant_suggestion.lastIndexOf(']') + 1;

        // Extract the JSON content
        if (jsonStart !== -1 && jsonEnd !== -1) {
            restaurant_suggestion = restaurant_suggestion.slice(jsonStart, jsonEnd);
        } else {
            throw new Error('Invalid JSON format');
        }

        console.log('API response:', restaurant_suggestion);

        restaurant_suggestions = JSON.parse(restaurant_suggestion);
        res.json({ restaurant_suggestions });


    } catch (error) {
        console.error('Error fetching restaurant suggestions:', error);
        res.status(500).json({ error: 'Failed to fetch restaurant suggestions' });
    }
};