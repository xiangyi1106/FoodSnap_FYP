export function postReducer(state, action) {
  // console.log("Reducer action:", action); // Check if this log appears
  switch (action.type) {
    case "POSTS_REQUEST":
      return { ...state, loading: true, error: "" };
    case "POSTS_SUCCESS":
      return {
        ...state,
        loading: false,
        posts: action.payload,
        error: "",
      };
    case "POSTS_ERROR":
      return { ...state, loading: false, error: action.payload };
    case "UPDATE_POST": {
      const updatedPosts = state.posts.map((post) =>
        post._id === action.payload._id ? { ...post, ...action.payload } : post
      );
      return { ...state, posts: updatedPosts };
    }
    case "SET_POSTS":
      return { ...state, posts: action.payload };
    case "ADD_POST":
      const updatedPosts = [action.payload, ...state];
      console.log("Updated posts in reducer:", updatedPosts); // Check if the new post is added
      return {
        ...state,
        posts: updatedPosts,
        loading: false,
        error: "",
      };
    default:
      return state;
  }
}

export function profileReducer(state, action) {
  switch (action.type) {
    case "PROFILE_REQUEST":
      return { ...state, loading: true, error: "" };
    case "PROFILE_SUCCESS":
      return {
        ...state,
        loading: false,
        profile: action.payload,
        error: "",
      };
    case "PROFILE_ERROR":
      return { ...state, loading: false, error: action.payload };
    case "PROFILE_UPDATE_SUCCESS":
      console.log("Updating profile state with:", action.payload);
      return { ...state, profile: { ...state.profile, ...action.payload } }; // Merge updated fields

    default:
      return state;
  }
}

export function photosReducer(state, action) {
  switch (action.type) {
    case "PHOTOS_REQUEST":
      return { ...state, loading: true, error: "" };
    case "PHOTOS_SUCCESS":
      return {
        ...state,
        loading: false,
        photos: action.payload,
        error: "",
      };
    case "PHOTOS_ERROR":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
}
