import axios from "axios";

export const uploadMedias = async (formData, path, token) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/uploadMedias`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "multipart/form-data",
        },
      }
    );
    return data;
  } catch (error) {
    console.error('Upload medias error:', error);
    return error.response.data.message;
  }
};
