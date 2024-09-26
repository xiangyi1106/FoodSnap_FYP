// import { GoogleGenerativeAI } from "@google/generative-ai";
exports.getFoodRecommendation = async (req, res) => {
    // Extract preferences from the request body
    let { mealType, mood, dietaryPreference, spicyLevelValue, loveIngredients, avoidIngredients, location } = req.body;

    // Set default values to 'none' if the fields are empty or not provided
    mealType = mealType || 'none';
    mood = mood || 'none';
    dietaryPreference = dietaryPreference || 'none';
    spicyLevelValue = (spicyLevelValue !== undefined && spicyLevelValue !== null) ? spicyLevelValue : 'none';
    // loveIngredients = (loveIngredients && loveIngredients.trim() !== '') ? loveIngredients.split(',').map(ingredient => ingredient.trim()) : ['none'];
    // avoidIngredients = (avoidIngredients && avoidIngredients.trim() !== '') ? avoidIngredients.split(',').map(ingredient => ingredient.trim()) : ['none'];
    loveIngredients = loveIngredients || 'none';
    avoidIngredients = avoidIngredients || 'none';

    try {
        // Initialize the Google Generative AI client
        // const genAI = new GoogleGenerativeAI(process.env.API_KEY);
        // const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Create the prompt to request exactly two restaurant suggestions
        const prompt = `
            You are an advanced AI food recommendation expert. Based on the following user preferences, provide an array of food recommendations based on Malaysian styles and its location:
            
            Meal Type: ${mealType}
            Mood: ${mood}
            Dietary Preference: ${dietaryPreference}
            Spicy Level: ${spicyLevelValue}%
            Loved Ingredients: ${loveIngredients.join(', ')}
            Avoided Ingredients: ${avoidIngredients.join(', ')}
            Location: ${location}

            Format the response as a array with max six items. Example format:
            ["Laksa", "Sandwiches", "Roti Canai", 'Nasi Lemak', 
            'Char Kway Teow' ]
        `;

        // Send the prompt to the generative model
        const response = await model.generateText({
            prompt: prompt,
            max_tokens: 200 // Adjust token limit based on expected response size
        });

        // Parse response and send suggestions back to the frontend
        const suggestions = JSON.parse(response.data.text); // Ensure it's an array of strings
        res.json(suggestions);

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
        // const genAI = new GoogleGenerativeAI(process.env.API_KEY);
        // const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Create the prompt to request exactly two restaurant suggestions
        const prompt = `
            You are an advanced AI food recommendation expert. Based on the following selected food, provide exactly two restaurant recommendations:
            
            Food: ${food}
            Location: ${location}

            For each restaurant, include the following details:
            - Name
            - Rating
            - Opening Hours
            - Address
            - Description
            - Reason why this restaurant is suggested

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
        `;

        // Send the prompt to the generative model
        const response = await model.generateText({
            prompt: prompt,
            max_tokens: 1000 // Adjust token limit based on expected response size
        });

        // Parse the response assuming it's in JSON format
        const restaurants = JSON.parse(response.data.text); // Adjust if the response is structured differently

        // Process the response to generate suggestions
        const suggestions = restaurants.map(restaurant => ({
            name: restaurant.name,
            rating: restaurant.rating,
            openHour: restaurant.opening_hours, // Ensure this field matches your data
            address: restaurant.address,
            description: restaurant.description,
            reason: restaurant.reason || 'Suggested based on your preferences' // Use AI-generated reason or fallback
        }));

        // Send the suggestions back to the frontend
        res.json(suggestions);

    } catch (error) {
        console.error('Error fetching restaurant suggestions:', error);
        res.status(500).json({ error: 'Failed to fetch restaurant suggestions' });
    }
};