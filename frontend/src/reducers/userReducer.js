import Cookies from "js-cookie";

export function userReducer(state = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null, action) {
  switch (action.type) {
    case "LOGIN":
      return action.payload;
    case "LOGOUT":
      return null;
    //Update the profile picture in everywhere including header
    case "UPDATEPICTURE":
      return { ...state, picture: action.payload };
      // const updatedState = { ...state, picture: action.payload };
      // Cookies.set('user', JSON.stringify(updatedState)); // Set the cookie here as well
      // console.log("Updated state in reducer:", updatedState); // Log to debug
      // return updatedState;
    case "VERIFY":
      return { ...state, verified: action.payload };
    default:
      return state;
  }
}

export function photoReducer(state, action) {
  switch (action.type) {
    case "PHOTOS_REQUEST":
      return { ...state, loading: true, error: "" };
    case "PHOTOS_SUCCESS":
      return {
        ...state,
        loading: false,
        profile: action.payload,
        error: "",
      };
    case "PHOTOS_ERROR":
      return { ...state, loading: false, error: action.payload }
    default: return state;
  }
}
