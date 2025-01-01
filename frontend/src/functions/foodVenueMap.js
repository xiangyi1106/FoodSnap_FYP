import axios from "axios";

export const addFoodVenueToProfileMap = async (formData, user) => {
    try {
        const { data } = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/addFoodVenueToProfileMap`,
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


export const getFoodVenuesMap = async (user, id) => {
    try {
        const { data } = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/getFoodVenuesProfileMap/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            }
        );
        return data;

    } catch (error) {
        console.error("Error:", error.response?.data?.message || "Unknown error");
        return error.response.data.message;
    }
};

export const getFoodVenueMapDetails = async (id, user) => {
    try {
        const { data } = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/getFoodVenueMapDetails/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            }
        );
        return data;

    } catch (error) {
        console.error("Error:", error.response?.data?.message || "Unknown error");
        return error.response.data.message;
    }
};