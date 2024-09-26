import axios from "axios";

export const getFoodRecommendations = async (
    mealType,
    mood,
    dietaryPreference,
    spicyLevelValue,
    loveIngredients,
    avoidIngredients,
    location,
    token
) => {
    try {
        const { data } = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/foodRecommendations`,
            {
                mealType,
                mood,
                dietaryPreference,
                spicyLevelValue,
                loveIngredients,
                avoidIngredients,
                location,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log(data); // This contains the suggestions from the AI
        return data; // Return the data for further use
    } catch (error) {
        console.error("Error fetching food recommendations:", error);
        return error.response?.data?.message || "An error occurred"; // Improved error handling
    }
};

export const getRestaurantRecommendations = async (
    food,
    location,
    token
) => {
    try {
        const { data } = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/restaurantRecommendations`, // Assuming it's for restaurants, update URL
            {
                food,
                location,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log(data); // This contains the restaurant suggestions from the AI
        return data; // Return the data for further use
    } catch (error) {
        console.error("Error fetching restaurant recommendations:", error);
        return error.response?.data?.message || "An error occurred"; // Improved error handling
    }
};
