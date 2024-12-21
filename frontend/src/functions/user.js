import axios from "axios";

export const follow = async (id, token) => {
  try {
    const { data } = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/follow/${id}`,
      {},

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return "ok";
  } catch (error) {
    console.log(error.response.data.message);
    return error.response.data.message;
  }
};
export const unfollow = async (id, token) => {
  try {
    const { data } = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/unfollow/${id}`,
      {},

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return "ok";
  } catch (error) {
    return error.response.data.message;
  }
};

export const search = async (searchTerm, token) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/search/${searchTerm}`,
      {},

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};

export const saveSearchTermAndHistory = async (searchTerm, token) => {
  try {
    const { data } = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/saveSearchTermAndHistory/${searchTerm}`,
      {},

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};

export const getSearchHistory = async (token) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/getSearchHistory`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};

export const getSearchResult = async (term, token) => {
  console.log(term);
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/searchResult/${term}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};

export const removeFromSearch = async (searchTerm, token) => {
  try {
    const { data } = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/removeFromSearch/${searchTerm}`,
      {},

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    console.log(error.response.data.message);

    return error.response.data.message;
  }
};

export const clearSearchHistory = async (token) => {
  try {
    const { data } = await axios.delete(
      `${process.env.REACT_APP_BACKEND_URL}/clearSearchHistory`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    return error.response?.data?.message || "Error occurred";
  }
};


export const addToFoodVenueWishlist = async (id, token) => {
  try {
    const { data } = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/addToFoodVenueWishlist/${id}`,
      {},

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return "ok";

  } catch (error) {
    console.log(error.response.data.message);
    return error.response.data.message;
  }
};

export const removeFromFoodVenueWishlist = async (id, token) => {
  try {
    const { data } = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/removeFromFoodVenueWishlist/${id}`,
      {},

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return "ok";
  } catch (error) {
    console.log(error.response.data.message);
    return error.response.data.message;
  }
};

export const getFoodVenueWishlist = async (token) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/getFoodVenueWishlist`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    console.log("token2", error.response.data.message);
    console.log(error.response.data.message);
    return error.response.data.message;
  }
};

export const checkFoodVenueInWishlist = async (id, token) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/checkFoodVenueInWishlist/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data.isInWishlist;

  } catch (error) {
    console.log(error.response.data.message);
    return false;
  }
};

export const getNotifications = async (userId, token) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/getNotifications/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    
    if (error.response && error.response.status === 401) {
      console.log("401 error: Session timed out.");
      throw error; // Throw the error so it can be caught in useEffect
    }
    return error.response.data.message;
  }
};

export const markNotificationAsRead = async (notificationId, token) => {
  try {
    const { data } = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/notifications/${notificationId}/mark-as-read`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};

export const getSavedPost = async (token) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/getSavedPost`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};