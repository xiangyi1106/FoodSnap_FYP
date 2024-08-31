import axios from "axios";
export const createPost = async (
  type,
  text,
  media,
  tag,
  location,
  // rating,
  privacy,
  user,
  token
) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/createPost`,
      {
        type,
        text,
        media,
        tag,
        location,
        // rating,
        privacy,
        user,
      },
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
