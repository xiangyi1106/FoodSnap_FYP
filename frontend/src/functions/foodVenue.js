import axios from "axios";

export const saveRestaurantData = async (foodVenues, token) => {
    try {
        const { data } = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/saveFoodVenues`,
            { foodVenues },

            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return "Restaurants saved successfully!";

    } catch (error) {
        console.log(error.response.data.message);
        return error.response.data.message;
    }
};

export const getFoodVenueData = async (address, token) => {
    try {
        const { data } = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/getFoodVenues`,
            {
                params: { address },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return data;

    } catch (error) {
        // console.log(error.response.data.message);
        // return error.response.data.message;
        if (error.response && error.response.status === 404) {
            // Return the specific 404 message if the response status is 404
            return { message: error.response.data.message, notFound: true };
        }
        // Handle other errors here if needed
        console.error("Error:", error.response?.data?.message || "Unknown error");
        return { message: "Failed to retrieve food venues." };
    }
};

export const getFoodVenueDetails = async (id, token) => {
    try {
        const { data } = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/api/foodVenue/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return data;

    } catch (error) {
        console.error("Error:", error.response?.data?.message || "Unknown error");
        return error.response.data.message;
    }
};

export const getPostsByFoodVenue = async (name, token) => {
    try {
        // Encode the `name` parameter to handle spaces and special characters
        const encodedName = encodeURIComponent(name);

        // Pass `name` as a query parameter in the URL
        const { data } = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/getPostsByFoodVenue?name=${encodedName}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return data;
    } catch (error) {
        console.error("Error:", error.response?.data?.message || "Unknown error");
        return error.response?.data?.message;
    }
};

export const getFoodVenueComments = async (placeId, token) => {
    try {
        // Pass `name` as a query parameter in the URL
        const { data } = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/${placeId}/comments`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return data;
    } catch (error) {
        console.error("Error:", error.response?.data?.message || "Unknown error");
        return error.response?.data?.message;
    }
};

export const addFoodVenueComment = async (placeId, user, text, parentCommentId) => {
    try {
        const { data } = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/${placeId}/comments/${parentCommentId || ''}`,
            {
                author: user.name,
                text,
                avatarUrl: user.picture,
            },

            {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            }
        );
        return data;

    } catch (error) {
        console.log(error.response.data.message);
        return error.response.data.message;
    }
};

export const addFoodVenueReview = async (placeId, user, text, rating, media) => {
    try {
        const { data } = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/${placeId}/addReview`,
            {
                // author: user.name,
                userID: user.id,
                text,
                // avatarUrl: user.picture,
                rating,
                media
            },
            {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            }
        );
        return data;

    } catch (error) {
        console.log(error.response.data.message);
        return error.response.data.message;
    }
};

export const addFoodVenueReviewReply = async (user, text, reviewId) => {

    try {
        const { data } = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/comment/${reviewId}/reply`,
            {
                // author: user.name,
                userID: user.id,
                text,
            },
            {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            }
        );
        return data;

    } catch (error) {
        console.log(error.response.data.message);
        return error.response.data.message;
    }
};

export const updateFoodVenue = async (
    id,
    formData,
    user
) => {

    try {
        const { data } = await axios.put(
            `${process.env.REACT_APP_BACKEND_URL}/api/food-venue/update/${id}`,
                formData,
            {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            }
        );
        return data;

    } catch (error) {
        // console.log(error.response.data.message);
        // return error.response.data.message;
        console.log(error.response.data.message);
        return error.response.data.message;
    }
};

// export const createFoodVenue = async (
//     formData,
//     user
// ) => {

//     try {
//         const { data } = await axios.post(
//             `${process.env.REACT_APP_BACKEND_URL}/createFoodVenue`,
//             {
//                 formData
//             },
//             {
//                 headers: {
//                     Authorization: `Bearer ${user.token}`,
//                 },
//             }
//         );
//         return data;

//     } catch (error) {
//         console.log(error.response.data.message);
//         return error.response.data.message;
//     }
// };
export const createFoodVenue = async (formData, user) => {
    try {
        const { data } = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/createFoodVenue`,
            formData, // Send formData directly
            {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            }
        );
        return data;
    } catch (error) {
        console.log(error.response?.data?.message || "Error occurred");
        return error.response?.data?.message || "Error occurred";
    }
};


export const updateFoodVenueMenu = async (placeId, medias, user) => {
    try {
        const { data } = await axios.put(
            `${process.env.REACT_APP_BACKEND_URL}/api/food-venue/menu/update/${placeId}`,
            {
                medias,
            },

            {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            }
        );
        return data;

    } catch (error) {
        console.log(error.response.data.message);
        return error.response.data.message;
    }
};

export const searchFoodVenue = async (term, location, token) => {
    try {
        // Pass `term` as a query parameter in the URL
        const { data } = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/api/search/foodVenue`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    term: term,
                    location: location,  // This will append the term to the query string
                }
            }
        );
        return data;
    } catch (error) {
        console.error("Error:", error.response?.data?.message || "Unknown error");
        return error.response?.data?.message;
    }
};

export const getAllFoodVenues = async (token) => {
    try {
        const { data } = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/getAllFoodVenues`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return data;

    } catch (error) {
        if (error.response && error.response.status === 404) {
            return [];
        }
        // Handle other errors here if needed
        console.error("Error:", error.response?.data?.message || "Unknown error");
        return { message: "Failed to retrieve food venues." };
    }
};
